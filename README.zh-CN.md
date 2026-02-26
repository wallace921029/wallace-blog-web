# Wallace Blog Web

[English](./README.md) | [中文](#)

---

## 🚀 关于项目

一个具有复古未来主义黑客美学的现代个人博客平台。使用 React 19 构建，采用终端风格设计，配备 OLED 友好的深色主题、等宽字体和赛博朋克视觉元素。

## ✨ 特性

- 🎨 **黑客/终端主题** - 赛博朋克美学，发光绿色文字和高对比度
- 📝 **基于 Markdown 的 CMS** - 文件系统内容管理，支持 frontmatter
- 🎯 **分类系统** - 按类别组织文章（技术、生活、创意等）
- 🔍 **语法高亮** - 使用 highlight.js 的代码块高亮
- 📱 **响应式设计** - 移动优先的 Tailwind CSS 设计
- ⚡ **快速性能** - 使用 Vite 实现闪电般的开发和构建速度
- 🎭 **现代技术栈** - React 19、TypeScript 5、React Router 7

## 🛠 技术栈

- **前端**: React 19 + TypeScript 5
- **路由**: React Router 7 (Data API)
- **构建工具**: Vite 7
- **样式**: Tailwind CSS v4 (使用 `oklch` 颜色)
- **UI 组件**: shadcn/ui + Radix UI
- **图标**: Lucide React
- **Markdown**: react-markdown + rehype-highlight
- **日期处理**: date-fns

## 📦 安装

### 本地开发

```bash
# 克隆仓库
git clone <repository-url>
cd wallace-blog-web

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview
```

### Docker 部署

#### 🏗 第一步：本地构建镜像

```bash
# 构建镜像
docker build -t wallace-blog-web:latest .

# 导出镜像到文件
docker save -o wallace-blog-web.tar wallace-blog-web:latest
```

#### 📤 第二步：传输到服务器

```bash
scp wallace-blog-web.tar user@your-server:/path/to/deploy/
scp docker-compose.yml user@your-server:/path/to/deploy/
```

#### 🚀 第三步：在服务器上部署

**方式 1: 使用 Docker Compose（推荐）**

```bash
# 载入镜像
docker load -i wallace-blog-web.tar

# 编辑 docker-compose.yml 修改 volumes 路径后启动
docker-compose up -d

# 访问: http://localhost:3000
```

**方式 2: 使用 Docker CLI**

```bash
# 载入镜像
docker load -i wallace-blog-web.tar

# 运行容器（替换路径为你的文章目录）
docker run -d \
  --name wallace-blog \
  -p 3000:80 \
  -v /path/to/your/articles:/usr/share/nginx/html/articles:ro \
  wallace-blog-web:latest

# Linux/Mac 示例
docker run -d \
  --name wallace-blog \
  -p 3000:80 \
  -v /home/user/articles:/usr/share/nginx/html/articles:ro \
  wallace-blog-web:latest
```

#### 📋 常用命令

```bash
# 查看日志
docker logs -f wallace-blog
# 或
docker-compose logs -f

# 停止容器
docker stop wallace-blog
# 或
docker-compose down

# 重启容器
docker restart wallace-blog
# 或
docker-compose restart

# 删除容器
docker rm wallace-blog
```

#### 📁 文章目录结构

挂载的文章目录必须遵循以下结构：

```
articles/
├── Tech/
│   ├── article-slug-1/
│   │   ├── index.md
│   │   └── cover.jpg (可选)
│   └── article-slug-2/
│       └── index.md
├── Life/
│   └── article-slug-3/
│       └── index.md
└── Ideas/
    └── article-slug-4/
        └── index.md
```

每篇文章的 `index.md` 应包含 frontmatter：

```markdown
---
title: "文章标题"
date: "2024-01-01"
description: "文章描述"
tags: ["tag1", "tag2"]
cover: "./cover.jpg"
---

文章内容...
```

#### 🔄 更新文章

**修改现有文章**
1. 直接编辑挂载目录中的文章文件
2. 刷新浏览器即可看到更新（无需重启容器）

**添加新文章**
1. 在挂载目录中创建新的文章文件夹
2. 添加 `index.md` 文件
3. 重启容器以重新生成索引：
   ```bash
   docker-compose restart
   # 或
   docker restart wallace-blog
   ```

#### 🔍 故障排查

**文章不显示**

```bash
# 1. 检查 volume 是否正确挂载
docker exec wallace-blog ls -la /usr/share/nginx/html/articles

# 2. 检查索引文件是否生成
docker exec wallace-blog cat /usr/share/nginx/html/articles/index.json

# 3. 查看容器日志
docker logs wallace-blog

# 4. 重启容器
docker restart wallace-blog
```

**权限问题**

```bash
# Linux/Mac: 确保目录可读
chmod -R 755 /path/to/articles
```

**端口冲突**

```bash
# 使用不同端口
docker run -d -p 8080:80 ...

# 或修改 docker-compose.yml
ports:
  - "8080:80"
```

#### 🔐 安全建议

- ✅ 使用只读挂载：始终使用 `:ro` 标志
- ✅ 限制网络访问：使用防火墙规则
- ✅ 定期更新镜像：保持基础镜像最新
- ✅ 定期备份文章内容

#### 💾 备份

```bash
# 备份文章
tar -czf articles-backup-$(date +%Y%m%d).tar.gz /path/to/articles

# 恢复文章
tar -xzf articles-backup-20240101.tar.gz -C /path/to/restore/
docker-compose restart
```

#### 🌐 访问地址

- **本地访问**: http://localhost:3000
- **局域网访问**: http://YOUR_IP:3000
- **文章索引**: http://localhost:3000/articles/index.json

## 📝 内容管理

### 添加新文章

1. 在 `src/articles/<分类>/<文章标识>/` 下创建新文件夹
2. 添加带有 frontmatter 的 `index.md` 文件：

```markdown
---
title: "文章标题"
date: "2024-01-01"
description: "文章简短描述"
tags: ["标签1", "标签2"]
cover: "./cover.png"
---

文章内容...
```

3. 将图片添加到同一文件夹并在 markdown 中引用

### 目录结构

```
src/articles/
├── Tech/           # 技术文章
├── Life/           # 生活文章
├── Ideas/          # 创意想法
├── Notes/          # 快速笔记
├── Products/       # 产品评测
└── Archive/        # 归档内容
```

## 🎨 设计系统

项目遵循严格的"黑客终端"设计系统：

- **颜色**: OLED 黑色背景配终端绿色 (`#4ADE80`)
- **字体**: JetBrains Mono（等宽字体）用于所有文本
- **UI 风格**: TUI 风格，使用方括号标记 `[标签]`
- **效果**: 发光文字、微妙扫描线、高对比度

详细设计指南请参见 [tech_spec.md](./tech_spec.md)。

## 📂 项目结构

```
wallace-blog-web/
├── src/
│   ├── articles/       # Markdown 内容
│   ├── assets/         # 静态资源
│   ├── components/     # React 组件
│   │   └── ui/         # shadcn/ui 组件
│   ├── config/         # 配置文件
│   ├── lib/            # 工具函数
│   ├── pages/          # 页面组件
│   └── main.tsx        # 入口文件
├── public/             # 公共资源
├── tech_spec.md        # 技术规范
└── package.json
```

## 🤝 贡献

欢迎贡献！请确保您的代码遵循现有的设计系统和编码标准。

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](./LICENSE) 文件。
