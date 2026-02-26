import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { getArticle, type Article } from '@/lib/articles'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import siteConfig from '@/config/site.json'
import 'highlight.js/styles/atom-one-dark.css' // Import syntax highlighting style

// Helper to resolve image paths
const images = import.meta.glob('/src/articles/**/*.{png,jpg,jpeg,gif,webp,svg}', { eager: true, import: 'default' })

export function ArticleDetail() {
  const { category, slug } = useParams<{ category: string; slug: string }>()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (category && slug) {
      getArticle(category, slug).then(data => {
        setArticle(data)
        setLoading(false)
      })
    }
  }, [category, slug])

  useEffect(() => {
    if (article) {
      document.title = siteConfig.title.articleDetail.replace('{title}', article.title)
    }
  }, [article])

  if (loading) {
    return <div className="text-primary animate-pulse">Loading data stream...</div>
  }

  if (!article) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-red-500">404: DATA_NOT_FOUND</h1>
        <p className="text-muted-foreground mt-4">The requested archive could not be located in the memory banks.</p>
        <Link to="/articles" className="text-primary hover:underline mt-4 inline-block">
          &lt; RETURN_TO_BASE
        </Link>
      </div>
    )
  }

  // Custom image renderer to handle relative paths
  const transformImageUri = (uri: string) => {
    if (uri.startsWith('http')) return uri;
    
    // Construct the expected path key
    // The uri in markdown is likely "./image.png" or "image.png"
    const cleanUri = uri.replace(/^\.\//, '');
    const pathKey = `/src/articles/${category}/${slug}/${cleanUri}`;
    
    // Check if we have this image in our glob result
    if (images[pathKey]) {
      return images[pathKey] as string;
    }
    
    return uri;
  };

  return (
    <article className="prose prose-invert prose-green max-w-none">
      <div className="mb-2">
        <Button variant="ghost" size="sm" asChild className="-ml-2 pl-2 text-muted-foreground hover:text-foreground">
          <Link to={`/articles?category=${article.category}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </Button>
      </div>

      <div className="mb-6 border-b border-border pb-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-foreground">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground font-mono">
          <div className="flex items-center gap-1">
            <span className="text-primary/50">#</span>
            <Link 
              to={`/articles?category=${article.category}`} 
              className="text-primary hover:underline transition-colors uppercase font-bold"
            >
              {article.category}
            </Link>
          </div>
          <span className="text-muted-foreground/30">|</span>
          <time dateTime={article.date}>
            {format(new Date(article.date), 'MMMM d, yyyy')}
          </time>
          {article.tags && article.tags.length > 0 && (
            <>
              <span className="text-muted-foreground/30">|</span>
              <div className="flex gap-2 font-mono">
                {[...article.tags]
                  .sort((a, b) => (a === 'Archive' ? 1 : b === 'Archive' ? -1 : 0))
                  .map(tag => (
                    <span 
                      key={tag} 
                      className={cn(
                        "text-xs transition-colors",
                        tag === 'Archive' 
                          ? "text-muted-foreground/50" 
                          : "text-primary/70"
                      )}
                    >
                      [{tag}]
                    </span>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="markdown-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            img: ({node: _node, ...props}) => (
              <img 
                {...props} 
                src={transformImageUri(props.src || '')} 
                className="rounded-lg border border-border shadow-lg my-6 max-h-[500px] object-contain mx-auto bg-black/20"
              />
            ),
            code: ({node: _node, className, children, ...props}) => {
              const match = /language-(\w+)/.exec(className || '')
              return match ? (
                <code className={className} {...props}>
                  {children}
                </code>
              ) : (
                <code className="bg-secondary/50 px-1 py-0.5 rounded text-primary font-mono text-sm" {...props}>
                  {children}
                </code>
              )
            },
            pre: ({node: _node, children, ...props}) => (
              <pre className="bg-secondary/20 border border-border/50 rounded-lg p-4 overflow-x-auto my-6" {...props}>
                {children}
              </pre>
            ),
            h1: ({node: _node, ...props}) => <h1 className="text-2xl font-bold mt-8 mb-4 text-primary border-l-4 border-primary pl-4" {...props} />,
            h2: ({node: _node, ...props}) => <h2 className="text-xl font-bold mt-8 mb-4 text-foreground border-b border-border/30 pb-2" {...props} />,
            h3: ({node: _node, ...props}) => <h3 className="text-lg font-bold mt-6 mb-3 text-foreground" {...props} />,
            p: ({node: _node, ...props}) => <p className="leading-7 mb-4 text-muted-foreground" {...props} />,
            ul: ({node: _node, ...props}) => <ul className="list-disc list-outside ml-6 mb-4 space-y-1 text-muted-foreground" {...props} />,
            ol: ({node: _node, ...props}) => <ol className="list-decimal list-outside ml-6 mb-4 space-y-1 text-muted-foreground" {...props} />,
            blockquote: ({node: _node, ...props}) => (
              <blockquote className="border-l-4 border-primary/50 pl-4 italic my-4 text-muted-foreground bg-secondary/10 py-2 pr-2 rounded-r" {...props} />
            ),
            a: ({node: _node, ...props}) => <a className="text-primary hover:underline underline-offset-4" {...props} />,
            table: ({node: _node, ...props}) => <div className="overflow-x-auto my-6"><table className="w-full border-collapse text-sm" {...props} /></div>,
            th: ({node: _node, ...props}) => <th className="border border-border p-2 bg-secondary/30 text-left font-bold text-foreground" {...props} />,
            td: ({node: _node, ...props}) => <td className="border border-border p-2 text-muted-foreground" {...props} />,
          }}
        >
          {article.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}
