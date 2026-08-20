import { ArticleRow } from "@/components/ArticleCard"
import { HeroArt } from "@/components/HeroArt"
import { ARTICLES, CATEGORIES, sortedArticles } from "@/data/articles"

// 見出しと右肩の補足を、濃い罫線で受ける共通の見出し行
function SectionHead({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between border-b border-foreground pb-[18px]">
      <h2 className="font-serif text-[19px] tracking-[0.01em] sm:text-[21px]">{title}</h2>
      {right}
    </div>
  )
}

export function Landing() {
  const latest = sortedArticles().slice(0, 3)
  const latestDate = sortedArticles()[0]?.date ?? "-"

  return (
    <main className="mx-auto max-w-5xl px-6 sm:px-14">
      {/* ヒーロー */}
      <section className="flex items-center gap-16 pt-16 sm:pt-[104px]">
        <div className="min-w-0 flex-1">
        <p className="font-mono text-[11px] tracking-[0.16em] text-ink-3">AI RESEARCH NOTE</p>
        <h1 className="mt-6 max-w-[16em] font-serif text-[34px] font-semibold leading-[1.32] tracking-[-0.01em] sm:text-[54px] sm:leading-[1.3]">
          AIの「いま」を、
          <br />
          体系的に整理する。
        </h1>
        <p className="mt-7 max-w-[33em] text-[15px] leading-[1.95] text-ink-2 sm:text-[16px]">
          対話AI・画像生成・AIコーディングツールからローカルLLMまで。調べた知見をカテゴリ別に整理し、毎日すこしずつ蓄積していくナレッジベースです。
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#/articles"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            記事一覧を見る
          </a>
          <a
            href="#categories"
            className="inline-flex h-11 items-center justify-center rounded-md border border-rule-strong px-[22px] text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            カテゴリから探す
          </a>
        </div>
        <p className="mt-11 font-mono text-[11.5px] tracking-[0.04em] text-ink-3">
          {ARTICLES.length} 記事 &nbsp;·&nbsp; {CATEGORIES.length} カテゴリ &nbsp;·&nbsp; 最終更新 {latestDate}
        </p>
        </div>
        <HeroArt className="hidden w-[360px] shrink-0 lg:block" />
      </section>

      {/* カテゴリ */}
      <section id="categories" aria-label="カテゴリ" className="scroll-mt-20 pt-[72px] sm:pt-[92px]">
        <SectionHead
          title="カテゴリ"
          right={
            <span className="font-mono text-[11px] tracking-[0.12em] text-ink-3">
              {String(CATEGORIES.length).padStart(2, "0")}
            </span>
          }
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-16">
          {CATEGORIES.map((cat) => {
            const count = ARTICLES.filter((a) => a.category === cat.id).length
            return (
              <a
                key={cat.id}
                href={`#/cat/${cat.id}`}
                className="group flex items-start gap-3.5 border-b border-rule py-[19px] pr-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span
                  aria-hidden="true"
                  className={`mt-[7px] size-[7px] shrink-0 rounded-full ${count > 0 ? "" : "opacity-40"}`}
                  style={{ backgroundColor: cat.color }}
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium transition-colors group-hover:text-[#2a4e8f]">
                    {cat.name}
                  </span>
                  <span className="mt-1.5 block text-[12.5px] leading-[1.7] text-ink-3">
                    {cat.description}
                  </span>
                </span>
                <span className="mt-1 font-mono text-[11px] text-ink-3">{count}</span>
              </a>
            )
          })}
        </div>
      </section>

      {/* 最新の記事 */}
      <section aria-label="最新の記事" className="pt-[72px] sm:pt-[92px]">
        <SectionHead
          title="最新の記事"
          right={
            <a
              href="#/articles"
              className="text-[12.5px] text-[#2a4e8f] transition-colors hover:text-[#1b3a70] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              すべて見る →
            </a>
          }
        />
        {latest.map((a) => (
          <ArticleRow key={a.id} article={a} />
        ))}
      </section>
    </main>
  )
}
