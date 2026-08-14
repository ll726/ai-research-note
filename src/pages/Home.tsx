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
  const isFiltered = Boolean(activeCat || keyword.trim())
  // 絞り込みなしのときだけ、最新記事をフィーチャーカードで見せる
  const featured = !isFiltered && articles.length > 0 ? articles[0] : null
  const listItems = featured ? articles.slice(1) : articles
  const featuredCat = featured ? categoryMap[featured.category] : null
  const latestDate = sortedArticles()[0]?.date ?? "-"

  return (
    <main className="mx-auto max-w-4xl px-4 pb-12">
      {/* ヒーロー */}
      <section className="pb-8 pt-10 sm:pt-14">
        <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          <span className="bg-gradient-to-br from-white via-white to-[#a7b0f5] bg-clip-text text-transparent">
            いろいろなAIを、
            <br className="sm:hidden" />
            毎日すこしずつ調べていく。
          </span>
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
          対話AI・画像生成・AIコーディングツールまで、調べたことをカテゴリ別に整理して記録するノートです。
        </p>
        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
          <div className="flex items-baseline gap-2">
            <dd className="font-mono text-xl font-semibold text-foreground">{ARTICLES.length}</dd>
            <dt className="text-xs text-muted-foreground">記事</dt>
          </div>
          <div className="flex items-baseline gap-2">
            <dd className="font-mono text-xl font-semibold text-foreground">{CATEGORIES.length}</dd>
            <dt className="text-xs text-muted-foreground">カテゴリ</dt>
          </div>
          <div className="flex items-baseline gap-2">
            <dd className="font-mono text-xl font-semibold text-foreground">{latestDate}</dd>
            <dt className="text-xs text-muted-foreground">最終更新</dt>
          </div>
        </dl>
      </section>

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

      {/* 最新記事(フィーチャー) */}
      {featured && (
        <section aria-label="最新の記事" className="mt-9">
          <a href={`#/article/${featured.id}`} className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <div className="rounded-xl bg-gradient-to-b from-primary/50 via-border to-border p-px transition-shadow group-hover:shadow-[0_8px_30px_color-mix(in_oklch,var(--primary)_18%,transparent)]">
              <div className="rounded-[calc(0.75rem-1px)] bg-card px-6 py-6 sm:px-8">
                <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground">
                  <span className="inline-flex items-center rounded-full bg-primary/20 px-2.5 py-0.5 text-[11px] font-semibold text-[#b4bcf8]">
                    最新
                  </span>
                  {featuredCat && (
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        aria-hidden="true"
                        className="size-1.5 rounded-full"
                        style={{ backgroundColor: featuredCat.color }}
                      />
                      {featuredCat.name}
                    </span>
                  )}
                  <time className="font-mono">{featured.date}</time>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight sm:text-xl">
                  {featured.title}
                </h3>
                {featured.summary && (
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                    {featured.summary}
                  </p>
                )}
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#a7b0f5]">
                  読む
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </div>
          </a>
        </section>
      )}

      {/* 記事一覧 */}
      <section aria-label="記事一覧" className="mt-9">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <h2 className="text-[13px] font-semibold uppercase tracking-wider text-muted-foreground">
            {featured ? "これまでの記事" : "記事一覧"}
          </h2>
          <span className="font-mono text-xs text-muted-foreground">
            {(featured ? listItems.length : articles.length)} 件
          </span>
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

        {articles.length === 0 ? (
          <Card className="p-0">
            <p className="px-5 py-12 text-center text-sm text-muted-foreground">
              該当する記事がありません
            </p>
          </Card>
        ) : listItems.length > 0 ? (
          <Card className="overflow-hidden p-0">
            <div className="divide-y divide-border/60">
              {listItems.map((a) => (
                <ArticleRow key={a.id} article={a} />
              ))}
            </div>
          </Card>
        ) : (
          <p className="px-1 text-[13px] text-muted-foreground">
            最新の記事が上に表示されています。
          </p>
        )}
      </section>
    </main>
  )
}
