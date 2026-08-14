import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ArticleRow } from "@/components/ArticleCard"
import { ARTICLES, CATEGORIES, categoryMap, sortedArticles } from "@/data/articles"

export function Articles({ activeCat }: { activeCat: string }) {
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
    <main className="mx-auto max-w-4xl px-4 pb-16">
      {/* ページヘッダー */}
      <section className="pb-8 pt-10 sm:pt-14">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#a7b0f5]">
          Articles
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {activeCategory ? activeCategory.name : "記事一覧"}
        </h1>
        <p className="mt-2 text-[13px] leading-6 text-muted-foreground">
          {activeCategory
            ? activeCategory.description
            : "調べたことを新しい順に。カテゴリと検索で絞り込めます。"}
        </p>
      </section>

      {/* カテゴリフィルタ */}
      <section aria-label="カテゴリで絞り込み">
        <div className="flex flex-wrap gap-1.5">
          <a
            href="#/articles"
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
                href={isActive ? "#/articles" : `#/cat/${cat.id}`}
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
      </section>

      {/* 記事一覧 */}
      <section aria-label="記事一覧" className="mt-8">
        <div className="mb-3 flex flex-wrap items-center gap-3">
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
