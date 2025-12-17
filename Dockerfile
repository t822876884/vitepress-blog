FROM node:20-alpine

WORKDIR /app

# 安装 git (VitePress 需要用于获取文件历史信息)
RUN apk add --no-cache git

# 复制依赖文件
COPY package.json ./

# 安装依赖
# 如果有 package-lock.json，也应该复制并使用 ci 安装
# COPY package-lock.json ./
RUN npm install

# 复制项目文件
COPY . .

# 暴露端口
EXPOSE 8848

# 启动开发服务器（支持热更新和自动重建侧边栏）
# --host 0.0.0.0 允许外部访问
CMD ["npm", "run", "docs:dev", "--", "--host", "0.0.0.0", "--port", "8848"]