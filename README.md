# Wallace Blog Web

[English](#) | [中文](./README.zh-CN.md)

---

## 🚀 About

A modern personal blog platform with a retro-futuristic hacker aesthetic. Built with React 19 and featuring a terminal-inspired design with OLED-friendly dark theme, monospaced typography, and cyberpunk visual elements.

## ✨ Features

- 🎨 **Hacker/Terminal Theme** - Cyberpunk aesthetic with glowing green text and high contrast
- 📝 **Markdown-Based CMS** - File-based content management with frontmatter support
- 🎯 **Category System** - Organize articles by categories (Tech, Life, Ideas, etc.)
- 🔍 **Syntax Highlighting** - Code blocks with highlight.js
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds
- 🎭 **Modern Stack** - React 19, TypeScript 5, React Router 7

## 🛠 Tech Stack

- **Frontend**: React 19 + TypeScript 5
- **Routing**: React Router 7 (Data API)
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS v4 (with `oklch` colors)
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Markdown**: react-markdown + rehype-highlight
- **Date Handling**: date-fns

## 📦 Installation

### Local Development

```bash
# Clone the repository
git clone <repository-url>
cd wallace-blog-web

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Docker Deployment

#### 🏗 Step 1: Build Image Locally

```bash
# Build image
docker build -t wallace-blog-web:latest .

# Export image to file
docker save -o wallace-blog-web.tar wallace-blog-web:latest
```

#### 📤 Step 2: Transfer to Server

```bash
scp wallace-blog-web.tar user@your-server:/path/to/deploy/
scp docker-compose.yml user@your-server:/path/to/deploy/
```

#### 🚀 Step 3: Deploy on Server

**Method 1: Docker Compose (Recommended)**

```bash
# Load image
docker load -i wallace-blog-web.tar

# Edit docker-compose.yml to update volumes path, then start
docker-compose up -d

# Access: http://localhost:3000
```

**Method 2: Docker CLI**

```bash
# Load image
docker load -i wallace-blog-web.tar

# Run container (replace path with your articles directory)
docker run -d \
  --name wallace-blog \
  -p 3000:80 \
  -v /path/to/your/articles:/usr/share/nginx/html/articles:ro \
  wallace-blog-web:latest

# Linux/Mac example
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
│   │   └── cover.jpg (optional)
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

## 📝 Content Management

### Adding New Articles

1. Create a new folder under `src/articles/<Category>/<article-slug>/`
2. Add an `index.md` file with frontmatter:

```markdown
---
title: "Your Article Title"
date: "2024-01-01"
description: "Brief description of your article"
tags: ["tag1", "tag2"]
cover: "./cover.png"
---

Your article content here...
```

3. Add any images to the same folder and reference them in markdown

### Directory Structure

```
src/articles/
├── Tech/           # Technical articles
├── Life/           # Lifestyle posts
├── Ideas/          # Creative ideas
├── Notes/          # Quick notes
├── Products/       # Product reviews
└── Archive/        # Archived content
```

## 🎨 Design System

The project follows a strict "Hacker Terminal" design system:

- **Colors**: OLED black background with terminal green (`#4ADE80`)
- **Typography**: JetBrains Mono (monospace) for all text
- **UI Style**: TUI-inspired with bracket notation `[TAG]`
- **Effects**: Glowing text, subtle scanlines, high contrast

For detailed design guidelines, see [tech_spec.md](./tech_spec.md).

## 📂 Project Structure

```
wallace-blog-web/
├── src/
│   ├── articles/       # Markdown content
│   ├── assets/         # Static assets
│   ├── components/     # React components
│   │   └── ui/         # shadcn/ui components
│   ├── config/         # Configuration files
│   ├── lib/            # Utilities
│   ├── pages/          # Page components
│   └── main.tsx        # Entry point
├── public/             # Public assets
├── tech_spec.md        # Technical specification
└── package.json
```

## 🤝 Contributing

Contributions are welcome! Please ensure your code follows the existing design system and coding standards.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
