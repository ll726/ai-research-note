import { Button } from "@/components/ui/button"
import { CategoryIcon } from "@/components/CategoryIcon"
import { ARTICLES, CATEGORIES, categoryMap, sortedArticles } from "@/data/articles"
import heroImage from "@/assets/hero.png"

export function Landing() {
  const latest = sortedArticles().slice(0, 3)
  const latestDate = sortedArticles()[0]?.date ?? "-"

  return (
    <main>
      {/* ヒーロー */}
      <section className="border-b border-border/60">
        <div className="mx-auto flex max-w-5xl items-center gap-10 px-4 pb-16 pt-16 sm:pb-24 sm:pt-24">
          <div className="min-w-0 flex-1">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#a7b0f5]">
            AI Research Note
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.15] tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-br from-white via-white to-[#a7b0f5] bg-clip-text text-transparent">
              AIの「いま」を、
              <br />
              体系的に整理する。
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-7 text-muted-foreground">
            対話AI・画像生成・AIコーディングツールからローカルLLMまで。
            調べた知見をカテゴリ別に整理し、毎日すこしずつ蓄積していくナレッジベースです。
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href="#/articles">記事一覧を見る</a>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            >
              カテゴリから探す
            </Button>
          </div>
          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-3 border-t border-border/60 pt-6">
            <div className="flex items-baseline gap-2">
              <dd className="font-mono text-2xl font-semibold text-foreground">{ARTICLES.length}</dd>
              <dt className="text-xs text-muted-foreground">記事</dt>
            </div>
            <div className="flex items-baseline gap-2">
              <dd className="font-mono text-2xl font-semibold text-foreground">{CATEGORIES.length}</dd>
              <dt className="text-xs text-muted-foreground">カテゴリ</dt>
            </div>
            <div className="flex items-baseline gap-2">
              <dd className="font-mono text-2xl font-semibold text-foreground">{latestDate}</dd>
              <dt className="text-xs text-muted-foreground">最終更新</dt>
            </div>
          </dl>
          </div>
          {/* ヒーローイラスト */}
          <div className="relative hidden shrink-0 lg:block" aria-hidden="true">
            <div className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-3xl" />
            <img
              src={heroImage}
              alt=""
              width={300}
              className="w-[300px] select-none drop-shadow-[0_20px_60px_color-mix(in_oklch,var(--primary)_45%,transparent)]"
            />
          </div>
        </div>
      </section>

      {/* カテゴリ */}
      <section id="categories" aria-label="カテゴリ" className="scroll-mt-16 border-b border-border/60">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#a7b0f5]">
                Categories
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                カテゴリから探す
              </h2>
            </div>
            <p className="max-w-sm text-[13px] leading-6 text-muted-foreground">
              分野ごとに整理された {CATEGORIES.length} のカテゴリ。気になる分野から知見をたどれます。
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => {
              const count = ARTICLES.filter((a) => a.category === cat.id).length
              return (
                <a
                  key={cat.id}
                  href={`#/cat/${cat.id}`}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_8px_30px_color-mix(in_oklch,var(--primary)_12%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="flex items-center justify-between">
                    <span
                      aria-hidden="true"
                      className="flex size-10 items-center justify-center rounded-lg border border-border"
                      style={{ background: `color-mix(in srgb, ${cat.color} 14%, transparent)` }}
                    >
                      <CategoryIcon id={cat.id} className="size-[18px]" style={{ color: cat.color }} />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">{count} 記事</span>
                  </div>
                  <h3 className="mt-4 text-[15px] font-semibold tracking-tight">{cat.name}</h3>
                  <p className="mt-1.5 text-[13px] leading-6 text-muted-foreground">{cat.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-[#a7b0f5]">
                    見る
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* 最新記事 */}
      <section aria-label="最新の記事">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#a7b0f5]">
                Latest
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">最新の記事</h2>
            </div>
            <Button asChild variant="ghost" size="sm">
              <a href="#/articles">すべての記事を見る →</a>
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((a) => {
              const cat = categoryMap[a.category]
              return (
                <a
                  key={a.id}
                  href={`#/article/${a.id}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_8px_30px_color-mix(in_oklch,var(--primary)_12%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {/* カテゴリ色のビジュアルバナー */}
                  <div
                    aria-hidden="true"
                    className="relative h-24 overflow-hidden border-b border-border/60"
                    style={{
                      background: cat
                        ? `linear-gradient(135deg, color-mix(in srgb, ${cat.color} 26%, var(--card)), var(--card) 70%)`
                        : "var(--secondary)",
                    }}
                  >
                    {cat && (
                      <CategoryIcon
                        id={cat.id}
                        className="absolute -bottom-5 -right-4 size-24 opacity-25 transition-transform duration-300 group-hover:scale-105"
                        style={{ color: cat.color }}
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {cat && (
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          aria-hidden="true"
                          className="size-1.5 rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                        {cat.name}
                      </span>
                    )}
                    <time className="ml-auto font-mono">{a.date}</time>
                  </div>
                  <h3 className="mt-3 text-[15px] font-semibold leading-snug tracking-tight group-hover:text-primary-foreground">
                    {a.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-[13px] leading-6 text-muted-foreground">
                    {a.summary}
                  </p>
                  <span className="mt-auto pt-4 inline-flex items-center gap-1 text-[13px] font-medium text-[#a7b0f5]">
                    読む
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                  </span>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
