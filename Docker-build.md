```shell
# 1. 构建新镜像
docker-compose -f docker-compose-prod.yml build
# 2. 停止旧容器（如果在运行）
docker-compose -f docker-compose-prod.yml down
# 3. 启动新容器
docker-compose -f docker-compose-prod.yml up -d
# 4. 查看启动日志（确认软链接创建成功）
docker-compose -f docker-compose-prod.yml logs -f
```