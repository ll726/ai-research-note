import { categoryMap, type Article } from "@/data/articles"

// 記事一覧の1行。カードで囲まず、罫線と余白だけで区切る
export function ArticleRow({
  article,
  showCategory = true,
  compact = false,
}: {
  article: Article
  showCategory?: boolean
  compact?: boolean
}) {
  const cat = categoryMap[article.category]
  return (
    <a
      href={`#/article/${article.id}`}
      className="group flex items-start gap-5 border-b border-rule py-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:gap-9"
    >
      <time
        dateTime={article.date}
        className="hidden w-[84px] shrink-0 pt-1.5 font-mono text-[11.5px] text-ink-3 sm:block"
      >
        {article.date}
      </time>
      <div className="min-w-0 flex-1">
        <h3
          className={`font-serif font-semibold leading-[1.55] text-foreground transition-colors group-hover:text-[#2a4e8f] ${
            compact ? "text-[16px]" : "text-[17px] sm:text-[19px]"
          }`}
        >
          {article.title}
        </h3>
        {article.summary && (
          <p className="mt-2 max-w-[48em] text-[12.5px] leading-[1.8] text-ink-3 sm:text-[13px]">
            {article.summary}
          </p>
        )}
        <div className="mt-2 flex items-center gap-3 sm:hidden">
          <time dateTime={article.date} className="font-mono text-[11px] text-ink-3">
            {article.date}
          </time>
          {showCategory && cat && (
            <span className="inline-flex items-center gap-1.5 text-[11.5px] text-ink-3">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              {cat.name}
            </span>
          )}
        </div>
      </div>
      {showCategory && cat && (
        <span className="hidden shrink-0 items-center gap-[7px] pt-[7px] text-[12px] text-ink-3 sm:inline-flex">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full"
            style={{ backgroundColor: cat.color }}
          />
          {cat.name}
        </span>
      )}
    </a>
  )
}
