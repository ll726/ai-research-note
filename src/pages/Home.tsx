import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ArticleRow } from "@/components/ArticleCard"
import { ARTICLES, CATEGORIES, categoryMap, sortedArticles } from "@/data/articles"

export function Home({ activeCat }: { activeCat: string }) {
  const [keyword, setKeyword] = useState("")

  const articles = useMemo(() => {
    let items = sortedArticles()
    if (activeCat) items = items.filter((a) => a.category === activeCat)
    const kw = keyword.trim().toLowerCase()
    if (kw) {
      items = items.filter(
        (a) =>
          a.title.toLowerCase().includes(kw) ||
          a.summary.toLowerCase().includes(kw) ||
          a.content.toLowerCase().includes(kw)
      )
    }
    return items
  }, [activeCat, keyword])

  const activeCategory = activeCat ? categoryMap[activeCat] : null

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      {/* カテゴリフィルタ */}
      <section aria-label="カテゴリで絞り込み">
        <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-muted-foreground">
          カテゴリ
        </h2>
        <div className="flex flex-wrap gap-1.5">
          <a
            href="#/"
            aria-current={!activeCat ? "page" : undefined}
            className={`inline-flex h-7 pointer-coarse:h-11 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              !activeCat
                ? "border-primary/60 bg-primary/15 text-foreground"
                : "border-border bg-secondary/40 text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            すべて
            <span className="font-mono text-[11px]">{ARTICLES.length}</span>
          </a>
          {CATEGORIES.map((cat) => {
            const count = ARTICLES.filter((a) => a.category === cat.id).length
            const isActive = cat.id === activeCat
            return (
              <a
                key={cat.id}
                href={isActive ? "#/" : `#/cat/${cat.id}`}
                aria-current={isActive ? "page" : undefined}
                title={cat.description}
                className={`inline-flex h-7 pointer-coarse:h-11 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  isActive
                    ? "border-primary/60 bg-primary/15 text-foreground"
                    : "border-border bg-secondary/40 text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                {cat.name}
                <span className="font-mono text-[11px]">{count}</span>
              </a>
            )
          })}
        </div>
        {activeCategory && (
          <p className="mt-2.5 text-[13px] text-muted-foreground">{activeCategory.description}</p>
        )}
      </section>

      {/* 記事一覧 */}
      <section aria-label="記事一覧" className="mt-9">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <h2 className="text-[13px] font-semibold uppercase tracking-wider text-muted-foreground">
            記事一覧
          </h2>
          <span className="font-mono text-xs text-muted-foreground">{articles.length} 件</span>
          <div className="ml-auto w-full sm:w-64">
            <Input
              type="search"
              aria-label="記事を検索"
              placeholder="記事を検索..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="h-8 pointer-coarse:h-11 text-sm"
            />
          </div>
        </div>

        <Card className="overflow-hidden p-0">
          {articles.length === 0 ? (
            <p className="px-5 py-12 text-center text-sm text-muted-foreground">
              該当する記事がありません
            </p>
          ) : (
            <div className="divide-y divide-border/60">
              {articles.map((a) => (
                <ArticleRow key={a.id} article={a} />
              ))}
            </div>
          )}
        </Card>
      </section>
    </main>
  )
}
