import { useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArticleCard } from "@/components/ArticleCard"
import { ARTICLES, categoryMap } from "@/data/articles"

export function ArticlePage({ id }: { id: string }) {
  const article = ARTICLES.find((a) => a.id === id)

  useEffect(() => {
    document.title = article ? `${article.title} | AI調査ノート` : "AI調査ノート"
    return () => {
      document.title = "AI調査ノート"
    }
  }, [article])

  if (!article) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Card className="border-dashed">
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            記事が見つかりませんでした。
            <div className="mt-4">
              <Button asChild variant="outline">
                <a href="#/">トップページへ戻る</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    )
  }

  const cat = categoryMap[article.category]
  const related = ARTICLES.filter((a) => a.category === article.category && a.id !== article.id)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 5)

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2 text-muted-foreground">
        <a href="#/">← 記事一覧へ戻る</a>
      </Button>

      <Card>
        <CardContent className="px-6 py-2 sm:px-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {cat && (
              <a href={`#/cat/${cat.id}`}>
                <Badge style={{ backgroundColor: cat.color, color: "#fff" }}>{cat.name}</Badge>
              </a>
            )}
            <time>{article.date}</time>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-snug">{article.title}</h1>
          <Separator className="my-5" />
          <div
            className="article-body text-[15px] leading-7"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </CardContent>
      </Card>

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 text-lg font-bold">同じカテゴリの記事</h2>
          <div className="flex flex-col gap-3">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} showCategory={false} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
