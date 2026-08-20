import { useMemo, useState } from "react"
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

  // 絞り込みは下地を敷かず、文字色と太さだけで選択状態を示す
  const filterClass = (active: boolean) =>
    `inline-flex items-center gap-[7px] text-[13px] transition-colors pointer-coarse:py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
      active ? "font-medium text-foreground" : "text-ink-3 hover:text-foreground"
    }`

  return (
    <main className="mx-auto max-w-5xl px-6 pb-4 sm:px-14">
      <section className="pt-14 sm:pt-[72px]">
        <p className="font-mono text-[11px] tracking-[0.16em] text-ink-3">ARTICLES</p>
        <h1 className="mt-5 font-serif text-[28px] leading-[1.4] tracking-[0.005em] sm:text-[34px]">
          {activeCategory ? activeCategory.name : "記事一覧"}
        </h1>
        <p className="mt-3.5 text-[13.5px] leading-[1.9] text-ink-3 sm:text-sm">
          {activeCategory
            ? activeCategory.description
            : "調べたことを新しい順に。カテゴリと検索で絞り込めます。"}
        </p>
      </section>

      <section aria-label="検索と絞り込み" className="pt-10 sm:pt-11">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <label className="flex h-10 w-full items-center gap-2.5 rounded-md border border-input bg-white px-3.5 pointer-coarse:h-11 transition-shadow focus-within:border-ring focus-within:shadow-[0_0_0_3px_rgba(42,78,143,0.12)] sm:w-80">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="7.2" cy="7.2" r="4.7" stroke="#6e6e76" strokeWidth="1.35" />
              <path d="M10.7 10.7L13.5 13.5" stroke="#6e6e76" strokeWidth="1.35" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              aria-label="記事を検索"
              placeholder="記事を検索"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full bg-transparent text-[13.5px] text-foreground placeholder:text-ink-3 focus:outline-none"
            />
          </label>
          <span className="font-mono text-[11.5px] tracking-[0.04em] text-ink-3">
            {articles.length} 件
          </span>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-foreground pb-4">
          <a href="#/articles" aria-current={!activeCat ? "page" : undefined} className={filterClass(!activeCat)}>
            すべて
            <span className="font-mono text-[10.5px] text-ink-3">{ARTICLES.length}</span>
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
                className={filterClass(isActive)}
              >
                <span
                  aria-hidden="true"
                  className={`size-1.5 rounded-full ${count > 0 ? "" : "opacity-40"}`}
                  style={{ backgroundColor: cat.color }}
                />
                {cat.name}
                <span className="font-mono text-[10.5px] text-ink-3">{count}</span>
              </a>
            )
          })}
        </div>
      </section>

      <section aria-label="記事一覧">
        {articles.length === 0 ? (
          <p className="border-b border-rule py-16 text-center text-sm text-ink-3">
            該当する記事がありません
          </p>
        ) : (
          articles.map((a) => <ArticleRow key={a.id} article={a} />)
        )}
      </section>
    </main>
  )
}
