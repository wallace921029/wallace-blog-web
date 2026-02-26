# Wallace Blog Web

> **System Status**: ONLINE  
> **Theme**: Hacker / Terminal / Cyberpunk  
> **Version**: 2.0.0

A personal blog application built with a modern tech stack but designed with a retro-futuristic "Hacker" aesthetic. This project serves as a personal portfolio and blog platform.

---

## 🛠 Tech Stack

This project is built using the following core technologies:

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [React 19](https://react.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/) (Data API)
- **Build Tool**: [Vite 7](https://vitejs.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: 
  - [Tailwind CSS v4](https://tailwindcss.com/) (using `@theme` and `oklch` colors)
  - [shadcn/ui](https://ui.shadcn.com/) (Component Primitives)
  - `lucide-react` (Icons)
  - `tw-animate-css` (Animations)
- **Content**:
  - `react-markdown` (Rendering)
  - `rehype-highlight` (Syntax Highlighting)
  - `front-matter` (Metadata Parsing)
  - `date-fns` (Date Formatting)
- **Animation**: CSS Keyframes + `tw-animate-css`

## 📝 Content Management

The blog uses a file-based CMS system. Articles are stored in `src/articles/`.

### Directory Structure
```bash
src/articles/
├── <Category>/           # e.g. "Notes", "Projects"
│   └── <ArticleSlug>/    # e.g. "my-first-post"
│       ├── index.md      # Article content with frontmatter
│       └── image.png     # Images referenced in markdown
```

### Frontmatter Format
Each `index.md` must start with YAML frontmatter:
```yaml
---
title: "Article Title"
date: "2023-10-27"
description: "Short summary for the list view."
tags: ["react", "frontend"]
cover: "./cover.png" # Optional
---
```

## 🎨 Design System & Style Guide

**CRITICAL FOR AI ASSISTANTS**: All new UI components and pages MUST adhere to this design system. Do not introduce "Clean Corporate" or "Material Design" styles unless explicitly requested.

### 1. Theme Philosophy
- **Vibe**: Hacker, Terminal, Matrix, Cyberpunk, OLED-friendly.
- **Visuals**: High contrast, glowing text, scanlines (optional), monospaced typography.
- **Interaction**: Snappy, keyboard-centric feel, "technological" sound effects (implied visual feedback).

### 2. Color Palette (Tailwind Variables)

The project uses modern `oklch` color space in CSS variables for better gamut on supported displays.

| Role | CSS Variable | Hex Fallback (Approx) | Description |
|------|--------------|-----------------------|-------------|
| **Background** | `--background` | `#0D0D0D` | Deep black (OLED) |
| **Primary** | `--primary` | `#4ADE80` | Terminal Green |
| **Foreground** | `--foreground` | `#4ADE80` | Terminal Green (Monochrome) |
| **Muted** | `--muted` | `#1E293B` | Dark blue-grey |
| **Muted FG** | `--muted-foreground` | `#225533` | Dimmed Green |
| **Border** | `--border` | `#4ADE80` (30% opacity) | Dim green borders |

### 3. Typography
- **Primary Font**: `JetBrains Mono` (Google Fonts)
- **Usage**: Used for **ALL** text to maintain the terminal aesthetic.
- **Tailwind Class**: `font-mono`

### 4. UI Patterns
- **Buttons**:
  - Default: Green background, black text, sharp or slightly rounded corners.
  - Ghost/Outline: Transparent background, green border, green text.
  - Hover Effects: Glow/Shadow `shadow-[0_0_15px_rgba(34,197,94,0.5)]`.
- **Containers**:
  - Thin borders (often 1px).
  - Subtle semi-transparent backgrounds (`bg-secondary/50`).
  - "System Status" style widgets.
- **Tags & Labels (TUI Style)**:
  - Use bracket notation `[xxx]` for tags, labels, and skill indicators.
  - Examples: `[React]`, `[TypeScript]`, `[ONLINE]`, `[LEVEL_99]`.
  - Styling: Plain text with brackets, no background boxes or rounded pills.
  - Colors: Use `text-primary` for active/important tags, `text-muted-foreground` for secondary tags.
  - Hover: Subtle color transition (`hover:text-foreground` or `hover:text-primary/80`).
  - This creates a clean, terminal-like aesthetic consistent with TUI (Text User Interface) design.

---

## 📂 Project Structure

```bash
d:\Repos\wallace-blog-web\
├── src\
│   ├── assets\          # Static assets (images, svgs)
│   ├── components\      # React components
│   │   ├── ui\          # shadcn/ui primitives (Button, etc.)
│   │   └── Layout.tsx   # Main Layout (Header/Footer)
│   ├── lib\             # Utilities (articles.ts, cn helper)
│   ├── pages\           # Page components (Home, ArticleList, ArticleDetail)
│   ├── articles\        # Blog Content (Markdown files)
│   ├── index.css        # Global Styles (Tailwind imports + Theme variables)
│   └── main.tsx         # Entry point & Router Config
├── public\              # Public static files
├── components.json      # shadcn/ui configuration
├── eslint.config.js     # ESLint configuration
├── index.html           # HTML template (includes Google Fonts)
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start local dev server
npm run dev
```

### Build

```bash
# Build for production
npm run build
```

---

## 🤖 AI Assistant Guidelines

If you are an AI (Copilot, Cursor, Trae, etc.) working on this codebase, please follow these rules:

1.  **Style Consistency**: Always apply the "Hacker" theme. Use `font-mono` for text. Use `border-border` and `bg-background`.
2.  **Tailwind First**: Use Tailwind utility classes for styling. Avoid inline styles unless for dynamic values (like coordinates).
3.  **Component Library**: Use existing `shadcn/ui` components from `@/components/ui` whenever possible.
4.  **Icons**: Use `lucide-react` icons.
5.  **Code Quality**:
    - Use functional React components with Hooks.
    - Ensure TypeScript types are defined (avoid `any`).
    - Keep `App.tsx` clean; refactor large sections into separate components in `src/components`.

---

_System ID: W-BLOG-v2.0 // EOF_
