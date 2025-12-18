#!/bin/bash

# VitePress 缓存清理脚本
# 用于手动清除 VitePress 缓存，强制重新生成侧边栏和索引

echo "🧹 正在清除 VitePress 缓存..."

CACHE_DIR="docs/.vitepress/cache"

if [ -d "$CACHE_DIR" ]; then
    rm -rf "$CACHE_DIR"
    echo "✅ 缓存已清除: $CACHE_DIR"
else
    echo "ℹ️  缓存目录不存在，无需清除"
fi

echo "✨ 完成！VitePress 将在下次启动时重新生成缓存"
