# VitePress 缓存管理指南

## 概述

当您在 VitePress 项目中新增或删除 `.md` 文件时，VitePress 需要重新生成缓存以更新侧边栏和索引。本项目提供了自动和手动两种方式来管理缓存。

## 🚀 自动缓存管理（推荐）

### 工作原理

项目中的 `watch-files.js` 脚本会自动监听 `docs` 目录下的 Markdown 文件变化：

- **文件新增**：自动清除缓存并触发 VitePress 重新加载
- **文件删除**：自动清除缓存并触发 VitePress 重新加载
- **文件修改**：VitePress 自带的热重载机制会自动处理

### 使用方法

在开发环境中，VitePress 的 `vite.config` 已经配置了文件监听功能，无需额外操作。只需正常运行开发服务器：

```bash
npm run docs:dev
```

当您新增或删除 `.md` 文件时，系统会自动：
1. 检测文件变化
2. 清除 `.vitepress/cache` 目录
3. 触发 VitePress 重新加载
4. 重新生成侧边栏和索引

### 监听日志

您会在控制台看到类似以下的日志输出：

```
[10:40:00] 新增文件: 00.bigdata/001.flink/新文章.md
[10:40:00] 正在清除缓存...
[10:40:00] 缓存已清除
[10:40:00] 已触发 VitePress 重新加载
```

## 🛠️ 手动缓存管理

### 方法 1：使用 npm 脚本（推荐）

```bash
npm run cache:clear
```

### 方法 2：使用 Shell 脚本

```bash
./clear-cache.sh
```

### 方法 3：使用 npm clean 脚本（清除所有）

此命令会同时清除缓存和构建产物：

```bash
npm run docs:clean
```

### 方法 4：手动删除

直接删除缓存目录：

```bash
rm -rf docs/.vitepress/cache
```

## 📁 忽略的文件和文件夹

为了避免 NAS 和系统生成的隐藏文件影响构建，以下文件/文件夹会被自动忽略：

- `@eaDir/` - Synology NAS 生成的缩略图文件夹
- `.DS_Store` - macOS 系统文件
- `Thumbs.db` - Windows 缩略图文件

这些配置已在以下文件中设置：
- `docs/.vitepress/config.mts` - VitePress 侧边栏配置
- `watch-files.js` - 文件监听器配置
- `.dockerignore` - Docker 构建忽略
- `.gitignore` - Git 版本控制忽略

## 🐳 Docker 环境

在 Docker 环境中，缓存管理同样有效。当您挂载外部存储（如 NAS）到容器时：

```yaml
# docker-compose.yml 示例
services:
  vitepress:
    volumes:
      - /path/to/nas/00.bigdata:/app/docs/00.bigdata
      - /path/to/nas/01.ai:/app/docs/01.ai
      # ... 其他挂载
```

容器内的 VitePress 会自动监听这些挂载目录的文件变化，并在检测到新增或删除时自动清除缓存。

### 在 Docker 容器中手动清除缓存

```bash
# 进入容器
docker exec -it vitepress-blog sh

# 清除缓存
npm run cache:clear

# 或直接执行
./clear-cache.sh
```

## ⚡ 性能优化建议

1. **使用自动监听**：在开发环境中，让 `watch-files.js` 自动处理缓存更新
2. **定期清理**：如果遇到侧边栏不更新的问题，手动运行 `npm run cache:clear`
3. **重启服务**：如果缓存清除后仍有问题，重启 VitePress 开发服务器

## 🔧 故障排除

### 问题：新增文件后侧边栏没有更新

**解决方案**：
1. 检查文件是否在被忽略的目录中（如 `@eaDir`）
2. 手动清除缓存：`npm run cache:clear`
3. 重启开发服务器

### 问题：删除文件后仍然显示在侧边栏

**解决方案**：
1. 确认文件已完全删除
2. 清除缓存：`npm run cache:clear`
3. 刷新浏览器页面

### 问题：Docker 环境中文件变化未被检测

**解决方案**：
1. 检查文件挂载是否正确
2. 确认文件权限设置
3. 查看容器日志：`docker logs vitepress-blog`

## 📝 相关文件

- `watch-files.js` - 文件监听和缓存管理脚本
- `clear-cache.sh` - 手动清除缓存脚本
- `docs/.vitepress/config.mts` - VitePress 配置文件
- `package.json` - npm 脚本配置

## 🤝 贡献

如果您发现任何问题或有改进建议，欢迎提交 Issue 或 Pull Request。
