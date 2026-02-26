import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getArticles, type Article } from '@/lib/articles'
import { format } from 'date-fns'
import homeConfig from '@/config/home.json'
import siteConfig from '@/config/site.json'

export function Home() {
  const [text, setText] = useState('')
  const fullText = homeConfig.terminal.text
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    document.title = siteConfig.title.home

    let index = 0
    const interval = setInterval(() => {
      setText(fullText.slice(0, index))
      index++
      if (index > fullText.length) {
        clearInterval(interval)
      }
    }, homeConfig.terminal.typingSpeed)

    getArticles().then(allArticles => {
      // Filter out excluded categories and take max posts
      const latestArticles = allArticles
        .filter(article => !homeConfig.latestPosts.excludeCategories.includes(article.category))
        .slice(0, homeConfig.latestPosts.maxPosts)
      setArticles(latestArticles)
    })

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-8">
      <div className="bg-secondary/50 p-4 rounded border border-border/50 font-mono text-sm min-h-[120px]">
        <pre className="whitespace-pre-wrap text-muted-foreground">
          {text}
          <span className="animate-pulse">_</span>
        </pre>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-primary flex items-center border-b border-primary/30 pb-2">
          <span className="mr-2">&gt;</span> {homeConfig.latestPosts.title}
        </h2>
        <div className="grid gap-6">
          {articles.length > 0 ? (
            articles.map((article) => (
              <div key={article.slug} className="group relative pl-4 border-l-2 border-border/50 hover:border-primary transition-colors flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1 space-y-2">
                  <Link 
                    to={`/articles/${article.category}/${article.slug}`} 
                    className="block text-xl font-bold group-hover:text-primary transition-colors"
                  >
                    {article.title}
                  </Link>
                  {article.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {article.description}
                    </p>
                  )}
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1 font-mono">
                      {article.tags.map(tag => (
                        <span key={tag} className="text-xs text-primary/70 group-hover:text-primary transition-colors">
                          [{tag}]
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex w-full md:w-auto items-center justify-between md:flex-col md:items-end md:justify-end gap-2 text-xs text-muted-foreground font-mono shrink-0 md:text-right min-w-[160px]">
                  <span className="text-primary text-sm md:text-base font-bold">
                    {format(new Date(article.date), "yyyy-MM-dd")}
                  </span>
                  <span className="uppercase font-bold tracking-wider border-b border-primary/30 pb-0.5">
                    {article.category}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-muted-foreground">{homeConfig.latestPosts.emptyMessage}</div>
          )}
        </div>
        <div className="pt-2">
          <Link to={homeConfig.latestPosts.viewAllLink} className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono">
            {homeConfig.latestPosts.viewAllText}
          </Link>
        </div>
      </div>
    </div>
  )
}
