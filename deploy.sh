#!/bin/bash
set -e

IMAGE_NAME="wallace-blog-web:latest"
TAR_FILE="wallace-blog-web_latest.tar"
CONTAINER_NAME="wallace-blog-web"

echo "===== 开始部署 ====="

# 0️⃣ 检查 tar 包是否存在
if [ ! -f "$TAR_FILE" ]; then
  echo "❌ 找不到镜像文件: $TAR_FILE"
  exit 1
fi

# 1️⃣ 加载镜像
echo "1️⃣ docker load -i $TAR_FILE"
docker load -i "$TAR_FILE"

# 2️⃣ 校验镜像是否存在
echo "2️⃣ 校验镜像: $IMAGE_NAME"
docker image inspect "$IMAGE_NAME" > /dev/null 2>&1 || {
  echo "❌ 镜像 $IMAGE_NAME 不存在（请确认 tar 内 tag 是否为 latest）"
  echo "   你可以先执行: docker load -i $TAR_FILE 然后 docker images | head"
  exit 1
}

# 3️⃣ 重建容器（使用新镜像）
echo "3️⃣ 重建容器"
docker compose up -d --force-recreate --remove-orphans

# 4️⃣ 显示当前容器状态
echo "4️⃣ 当前容器状态:"
docker ps --filter "name=$CONTAINER_NAME" --format "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}"

# 5️⃣ 清理悬空镜像（可选）
echo "5️⃣ 清理悬空镜像"
docker image prune -f

echo "===== 部署完成 ====="
