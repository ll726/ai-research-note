import { useEffect } from "react"
import { ArticleRow } from "@/components/ArticleCard"
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
      <main className="mx-auto max-w-5xl px-6 py-24 text-center sm:px-14">
        <p className="text-sm text-ink-3">記事が見つかりませんでした。</p>
        <a
          href="#/articles"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-md border border-rule-strong px-[22px] text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          記事一覧へ戻る
        </a>
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
    <main className="mx-auto w-full max-w-[680px] px-6 pb-4 pt-12 sm:px-0 sm:pt-14">
      <a
        href="#/articles"
        className="inline-flex items-center gap-1.5 text-[12.5px] text-ink-3 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M8.4 3.2L4.6 7l3.8 3.8"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        記事一覧へ戻る
      </a>

      <article>
        <div className="mt-9 flex flex-wrap items-center gap-x-3.5 gap-y-2">
          {cat && (
            <a
              href={`#/cat/${cat.id}`}
              className="inline-flex items-center gap-[7px] text-[12.5px] text-ink-2 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              {cat.name}
            </a>
          )}
          <span aria-hidden="true" className="h-3 w-px bg-input" />
          <time dateTime={article.date} className="font-mono text-[11.5px] text-ink-3">
            {article.date}
          </time>
          <span aria-hidden="true" className="h-3 w-px bg-input" />
          <span className="text-xs text-ink-3">約{readMinutes}分で読めます</span>
        </div>

        <h1 className="mt-5 font-serif text-[27px] font-semibold leading-[1.45] tracking-[0.005em] sm:text-[36px]">
          {article.title}
        </h1>

        {article.summary && (
          <p className="mt-6 text-[16px] leading-[2] text-ink-2 sm:text-[16.5px]">{article.summary}</p>
        )}

        <div
          className="article-body mt-11 border-t border-rule pt-11"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      {related.length > 0 && (
        <section aria-label="同じカテゴリの記事" className="mt-16">
          <h2 className="border-b border-foreground pb-[14px] font-serif text-[17px] tracking-[0.01em]">
            同じカテゴリの記事
          </h2>
          {related.map((a) => (
            <ArticleRow key={a.id} article={a} showCategory={false} compact />
          ))}
        </section>
      )}
    </main>
  )
}
