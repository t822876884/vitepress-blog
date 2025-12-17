#!/usr/bin/env node

/**
 * VitePress 文件监听脚本
 * 监听 docs 目录下的 Markdown 文件变化，并触发 VitePress 重新加载
 */

const chokidar = require('chokidar');
const path = require('path');
const { exec } = require('child_process');

// 配置
const DOCS_DIR = path.join(__dirname, 'docs');
const WATCH_PATTERNS = [
    '**/*.md',
    '!**/node_modules/**',
    '!**/.vitepress/cache/**',
    '!**/.vitepress/dist/**',
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

// 触发 VitePress 重新加载
function triggerReload(filePath) {
    const relativePath = path.relative(DOCS_DIR, filePath);
    log(`检测到文件变化: ${relativePath}`, 'blue');

    // 这里可以添加额外的处理逻辑
    // 例如：自动生成 frontmatter、更新索引等
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
        awaitWriteFinish: {
            stabilityThreshold: 300,
            pollInterval: 100,
        },
    });

    // 监听文件添加
    watcher.on('add', (filePath) => {
        const fullPath = path.join(DOCS_DIR, filePath);
        log(`新增文件: ${filePath}`, 'green');
        debouncedReload(fullPath);
    });

    // 监听文件修改
    watcher.on('change', (filePath) => {
        const fullPath = path.join(DOCS_DIR, filePath);
        log(`修改文件: ${filePath}`, 'yellow');
        debouncedReload(fullPath);
    });

    // 监听文件删除
    watcher.on('unlink', (filePath) => {
        log(`删除文件: ${filePath}`, 'red');
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
