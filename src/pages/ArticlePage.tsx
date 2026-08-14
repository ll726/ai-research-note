import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArticleRow } from "@/components/ArticleCard"
import { CategoryIcon } from "@/components/CategoryIcon"
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
        <Card className="p-10 text-center">
          <p className="text-sm text-muted-foreground">記事が見つかりませんでした。</p>
          <div className="mt-5">
            <Button asChild variant="secondary" size="sm">
              <a href="#/">トップページへ戻る</a>
            </Button>
          </div>
        </Card>
      </main>
    )
  }

  const cat = categoryMap[article.category]
  // 本文テキスト量から読了時間の目安(日本語 約500字/分)
  const plainLength = article.content.replace(/<[^>]*>/g, "").replace(/\s/g, "").length
  const readMinutes = Math.max(1, Math.round(plainLength / 500))
  const related = ARTICLES.filter((a) => a.category === article.category && a.id !== article.id)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 5)

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Button asChild variant="ghost" size="sm" className="-ml-2 mb-4">
        <a href="#/articles">← 記事一覧へ戻る</a>
      </Button>

      <Card className="overflow-hidden p-6 pt-0 sm:p-8 sm:pt-0">
        {/* カテゴリ色のカバーバナー */}
        <div
          aria-hidden="true"
          className="relative -mx-6 mb-6 h-28 overflow-hidden border-b border-border/60 sm:-mx-8 sm:mb-8"
          style={{
            background: cat
              ? `linear-gradient(135deg, color-mix(in srgb, ${cat.color} 24%, var(--card)), var(--card) 75%)`
              : "var(--secondary)",
          }}
        >
          {cat && (
            <CategoryIcon
              id={cat.id}
              className="absolute -bottom-6 right-6 size-28 opacity-20"
              style={{ color: cat.color }}
            />
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground">
          {cat && (
            <a
              href={`#/cat/${cat.id}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              {cat.name}
            </a>
          )}
          <time className="font-mono">{article.date}</time>
          <span aria-hidden="true" className="text-border">|</span>
          <span>約{readMinutes}分で読めます</span>
        </div>
        <h1 className="mt-4 text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
          {article.title}
        </h1>
        <Separator className="my-6" />
        <div
          className="article-body text-[15px] leading-7 text-card-foreground"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </Card>

      {related.length > 0 && (
        <section aria-label="同じカテゴリの記事" className="mt-10">
          <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-muted-foreground">
            同じカテゴリの記事
          </h2>
          <Card className="overflow-hidden p-0">
            <div className="divide-y divide-border/60">
              {related.map((a) => (
                <ArticleRow key={a.id} article={a} showCategory={false} />
              ))}
            </div>
          </Card>
        </section>
      )}
    </main>
  )
}
