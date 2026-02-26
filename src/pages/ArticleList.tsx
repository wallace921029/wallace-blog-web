import { useState, useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getArticles, type Article } from '@/lib/articles'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import siteConfig from '@/config/site.json'

export function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    document.title = siteConfig.title.articles

    getArticles().then(data => {
      setArticles(data)
      setLoading(false)
    })
  }, [])

  // Calculate categories from articles
  const categories = useMemo(() => {
    const cats = Array.from(new Set(articles.map(a => a.category)))
      .sort((a, b) => {
        if (a === 'Archive') return 1;
        if (b === 'Archive') return -1;
        return a.localeCompare(b);
      })
    return cats
  }, [articles])

  // Get selected category from URL or default to first one
  const selectedCategory = useMemo(() => {
    const paramCategory = searchParams.get('category')
    if (paramCategory && categories.includes(paramCategory)) {
      return paramCategory
    }
    return categories.length > 0 ? categories[0] : null
  }, [searchParams, categories])

  // Ensure URL reflects default category if not set
  useEffect(() => {
    if (!searchParams.get('category') && categories.length > 0) {
      setSearchParams({ category: categories[0] }, { replace: true })
    }
  }, [categories, searchParams, setSearchParams])

  const filteredArticles = useMemo(() => {
    if (!selectedCategory) return []
    return articles.filter(a => a.category === selectedCategory)
  }, [articles, selectedCategory])

  const handleCategoryClick = (category: string) => {
    setSearchParams({ category })
  }

  if (loading) {
    return <div className="text-primary animate-pulse">Loading modules...</div>
  }

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-4 mb-6 border-b border-primary/30 pb-4 font-mono text-sm">
        {categories.map(category => {
          const isSelected = selectedCategory === category
          return (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={cn(
                "cursor-pointer hover:text-primary transition-colors focus:outline-none",
                isSelected ? "text-primary font-bold" : "text-muted-foreground",
                category === 'Archive' && !isSelected && "text-muted-foreground/50"
              )}
            >
              [{category.toUpperCase()}]
            </button>
          )
        })}
      </div>

      <div className="space-y-4">
        {filteredArticles.length === 0 ? (
          <p className="text-muted-foreground">No data found in the sector.</p>
        ) : (
          <div className="grid gap-4 pl-4 border-l-2 border-border/30">
            {filteredArticles.map((article) => (
              <Link 
                key={article.slug} 
                to={`/articles/${article.category}/${article.slug}`}
                className="block group p-3 hover:bg-secondary/30 rounded border border-transparent hover:border-primary/20 transition-all"
              >
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <span className="text-xs text-muted-foreground font-mono">
                    {format(new Date(article.date), 'yyyy-MM-dd')}
                  </span>
                </div>
                {article.description && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {article.description}
                  </p>
                )}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[...article.tags]
                      .sort((a, b) => (a === 'Archive' ? 1 : b === 'Archive' ? -1 : 0))
                      .map(tag => (
                        <span 
                          key={tag} 
                          className={cn(
                            "text-xs font-mono transition-colors",
                            tag === 'Archive' 
                              ? "text-muted-foreground/50" 
                              : "text-primary/70 group-hover:text-primary"
                          )}
                        >
                          [{tag}]
                        </span>
                      ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
