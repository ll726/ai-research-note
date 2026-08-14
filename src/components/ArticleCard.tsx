import { categoryMap, type Article } from "@/data/articles"

// Linear風の高密度リスト行。<Card> で囲んだリストの中で使う想定
export function ArticleRow({ article, showCategory = true }: { article: Article; showCategory?: boolean }) {
  const cat = categoryMap[article.category]
  return (
    <a
      href={`#/article/${article.id}`}
      className="group flex items-baseline gap-3 px-4 py-3 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:bg-accent focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:px-5"
    >
      <time className="hidden w-24 shrink-0 font-mono text-xs text-muted-foreground sm:block">
        {article.date}
      </time>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {showCategory && cat && (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-2 py-0.5 text-[11px] text-muted-foreground">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              {cat.name}
            </span>
          )}
          <h3 className="text-sm font-medium leading-snug text-foreground group-hover:text-primary-foreground">
            {article.title}
          </h3>
        </div>
        {article.summary && (
          <p className="mt-1 truncate text-[13px] text-muted-foreground">{article.summary}</p>
        )}
        <time className="mt-1 block font-mono text-[11px] text-muted-foreground sm:hidden">
          {article.date}
        </time>
      </div>
      <span
        aria-hidden="true"
        className="hidden self-center text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:text-muted-foreground sm:block"
      >
        →
      </span>
    </a>
  )
}
