#!/usr/bin/env node

/**
 * VitePress 文件监听脚本
 * 监听 docs 目录下的 Markdown 文件变化，并触发 VitePress 重新加载
 */

const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

// 配置
const DOCS_DIR = path.join(__dirname, 'docs');
const WATCH_PATTERNS = [
    '**/*.md',
    '!**/node_modules/**',
    '!**/.vitepress/cache/**',
    '!**/.vitepress/dist/**',
    '!**/@eaDir/**',        // 忽略 Synology NAS 生成的缩略图文件夹
    '!**/.DS_Store',        // 忽略 macOS 系统文件
    '!**/Thumbs.db',        // 忽略 Windows 缩略图文件
];

// 颜色输出
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    red: '\x1b[31m',
};

function log(message, color = 'reset') {
    const timestamp = new Date().toLocaleTimeString('zh-CN');
    console.log(`${colors[color]}[${timestamp}] ${message}${colors.reset}`);
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 清除 VitePress 缓存
function clearCache() {
    const cacheDir = path.join(DOCS_DIR, '.vitepress', 'cache');

    try {
        if (fs.existsSync(cacheDir)) {
            log('正在清除缓存...', 'yellow');
            fs.rmSync(cacheDir, { recursive: true, force: true });
            log('缓存已清除', 'green');
            return true;
        }
    } catch (error) {
        log(`清除缓存失败: ${error.message}`, 'red');
        return false;
    }
    return false;
}

// 触发 VitePress 重新加载
function triggerReload(filePath, action = 'change') {
    const relativePath = path.relative(DOCS_DIR, filePath);

    if (action === 'add') {
        log(`新增文件: ${relativePath}`, 'green');
        clearCache();
    } else if (action === 'unlink') {
        log(`删除文件: ${relativePath}`, 'red');
        clearCache();
    } else {
        log(`修改文件: ${relativePath}`, 'yellow');
    }

    // 触发一个虚拟的配置文件修改，让 VitePress 重新加载
    const configFile = path.join(DOCS_DIR, '.vitepress', 'config.mts');
    if (fs.existsSync(configFile) && (action === 'add' || action === 'unlink')) {
        try {
            const now = new Date();
            fs.utimesSync(configFile, now, now);
            log('已触发 VitePress 重新加载', 'blue');
        } catch (error) {
            log(`触发重新加载失败: ${error.message}`, 'red');
        }
    }
}

// 创建防抖的重载函数
const debouncedReload = debounce(triggerReload, 500);

// 初始化监听器
function initWatcher() {
    log('启动文件监听器...', 'green');
    log(`监听目录: ${DOCS_DIR}`, 'blue');

    const watcher = chokidar.watch(WATCH_PATTERNS, {
        cwd: DOCS_DIR,
        persistent: true,
        ignoreInitial: true,
        usePolling: true,
        interval: 1000,
        binaryInterval: 3000,
        awaitWriteFinish: {
            stabilityThreshold: 500,
            pollInterval: 100,
        },
    });

    // 监听文件添加
    watcher.on('add', (filePath) => {
        const fullPath = path.join(DOCS_DIR, filePath);
        debouncedReload(fullPath, 'add');
    });

    // 监听文件修改
    watcher.on('change', (filePath) => {
        const fullPath = path.join(DOCS_DIR, filePath);
        debouncedReload(fullPath, 'change');
    });

    // 监听文件删除
    watcher.on('unlink', (filePath) => {
        const fullPath = path.join(DOCS_DIR, filePath);
        debouncedReload(fullPath, 'unlink');
    });

    // 错误处理
    watcher.on('error', (error) => {
        log(`监听错误: ${error}`, 'red');
    });

    // 就绪提示
    watcher.on('ready', () => {
        log('文件监听器已就绪，等待文件变化...', 'green');
    });

    return watcher;
}

// 主函数
function main() {
    console.log('');
    log('========================================', 'blue');
    log('VitePress 文件监听器', 'blue');
    log('========================================', 'blue');
    console.log('');

    try {
        const watcher = initWatcher();

        // 优雅退出
        process.on('SIGINT', () => {
            console.log('');
            log('正在关闭监听器...', 'yellow');
            watcher.close().then(() => {
                log('监听器已关闭', 'green');
                process.exit(0);
            });
        });
    } catch (error) {
        log(`启动失败: ${error.message}`, 'red');
        process.exit(1);
    }
}

// 运行
if (require.main === module) {
    main();
}

module.exports = { initWatcher };
