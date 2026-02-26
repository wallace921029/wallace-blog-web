import fm from 'front-matter';

export interface Article {
  slug: string;
  category: string;
  title: string;
  date: string;
  description: string;
  content: string;
  cover?: string;
  tags?: string[];
}

interface ArticleAttributes {
  title?: string;
  date?: string;
  description?: string;
  cover?: string;
  tags?: string[];
}

// Helper to get all articles
export async function getArticles(): Promise<Article[]> {
  // In production (Docker), fetch articles from the mounted volume via HTTP
  if (import.meta.env.PROD) {
    return getArticlesFromPublic();
  }
  
  // In development, use Vite's glob import from src/articles
  return getArticlesFromSource();
}

// Development: Load from src/articles using Vite glob
async function getArticlesFromSource(): Promise<Article[]> {
  const modules = import.meta.glob('/src/articles/**/*.md', { 
    query: '?raw', 
    import: 'default' 
  });
  
  const articles: Article[] = [];

  for (const path in modules) {
    const content = await modules[path]() as string;
    const { attributes, body } = fm<ArticleAttributes>(content);
    
    // Path format: /src/articles/<Category>/<Slug>/index.md
    const parts = path.split('/');
    const articlesIndex = parts.indexOf('articles');
    if (articlesIndex === -1 || parts.length < articlesIndex + 3) continue;

    const category = parts[articlesIndex + 1];
    const slug = parts[articlesIndex + 2];

    articles.push({
      slug,
      category,
      title: attributes.title || slug,
      date: attributes.date ? new Date(attributes.date).toISOString() : new Date().toISOString(),
      description: attributes.description || '',
      cover: attributes.cover,
      tags: attributes.tags || [],
      content: body
    });
  }

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Production: Fetch articles from API (dynamic scanning)
async function getArticlesFromPublic(): Promise<Article[]> {
  try {
    // Fetch the articles index from API (dynamically scanned)
    const response = await fetch('/api/articles');
    if (!response.ok) {
      console.error('Failed to fetch articles index from API');
      return [];
    }
    
    const index: { category: string; slug: string; path: string }[] = await response.json();
    const articles: Article[] = [];

    // Fetch each article
    for (const item of index) {
      try {
        const articleResponse = await fetch(item.path);
        if (!articleResponse.ok) continue;
        
        const content = await articleResponse.text();
        const { attributes, body } = fm<ArticleAttributes>(content);

        articles.push({
          slug: item.slug,
          category: item.category,
          title: attributes.title || item.slug,
          date: attributes.date ? new Date(attributes.date).toISOString() : new Date().toISOString(),
          description: attributes.description || '',
          cover: attributes.cover,
          tags: attributes.tags || [],
          content: body
        });
      } catch (error) {
        console.error(`Failed to load article: ${item.path}`, error);
      }
    }

    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Failed to load articles:', error);
    return [];
  }
}

export async function getArticle(category: string, slug: string): Promise<Article | null> {
  const articles = await getArticles();
  return articles.find(a => a.category === category && a.slug === slug) || null;
}
