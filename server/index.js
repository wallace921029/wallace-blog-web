import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const ARTICLES_DIR = process.env.ARTICLES_DIR || '/usr/share/nginx/html/articles';

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Scan articles directory and return index
function scanArticles() {
  const articles = [];
  
  try {
    if (!fs.existsSync(ARTICLES_DIR)) {
      console.warn(`Articles directory not found: ${ARTICLES_DIR}`);
      return articles;
    }

    const categories = fs.readdirSync(ARTICLES_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const category of categories) {
      const categoryPath = path.join(ARTICLES_DIR, category);
      const slugs = fs.readdirSync(categoryPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      for (const slug of slugs) {
        const articlePath = path.join(categoryPath, slug, 'index.md');
        if (fs.existsSync(articlePath)) {
          articles.push({
            category,
            slug,
            path: `/articles/${category}/${slug}/index.md`
          });
        }
      }
    }

    return articles;
  } catch (error) {
    console.error('Error scanning articles:', error);
    return [];
  }
}

// API endpoint to get articles index
app.get('/api/articles', (req, res) => {
  try {
    const articles = scanArticles();
    res.json(articles);
  } catch (error) {
    console.error('Error in /api/articles:', error);
    res.status(500).json({ error: 'Failed to scan articles' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', articlesDir: ARTICLES_DIR });
});

app.listen(PORT, () => {
  console.log(`Articles API server running on port ${PORT}`);
  console.log(`Articles directory: ${ARTICLES_DIR}`);
});
