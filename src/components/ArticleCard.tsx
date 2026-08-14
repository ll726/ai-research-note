import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { categoryMap, type Article } from "@/data/articles"

export function ArticleCard({ article, showCategory = true }: { article: Article; showCategory?: boolean }) {
  const cat = categoryMap[article.category]
  return (
    <a href={`#/article/${article.id}`} className="block group">
      <Card className="transition-all group-hover:-translate-y-0.5 group-hover:shadow-md">
        <CardContent className="px-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {showCategory && cat && (
              <Badge style={{ backgroundColor: cat.color, color: "#fff" }}>{cat.name}</Badge>
            )}
            <time>{article.date}</time>
          </div>
          <h3 className="mt-2 font-semibold leading-snug group-hover:underline">{article.title}</h3>
          {article.summary && (
            <p className="mt-1 text-sm text-muted-foreground">{article.summary}</p>
          )}
        </CardContent>
      </Card>
    </a>
  )
}
