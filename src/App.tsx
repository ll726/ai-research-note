import { useEffect, useState } from "react"
import { Header } from "@/components/Header"
import { Landing } from "@/pages/Landing"
import { Articles } from "@/pages/Articles"
import { ArticlePage } from "@/pages/ArticlePage"
import { CATEGORIES } from "@/data/articles"

// ハッシュベースの簡易ルーター
//   #/             → トップ(ランディング)
//   #/articles     → 記事一覧
//   #/cat/<id>     → カテゴリで絞り込んだ記事一覧
//   #/article/<id> → 記事詳細
function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onChange = () => {
      setHash(window.location.hash)
      window.scrollTo(0, 0)
    }
    window.addEventListener("hashchange", onChange)
    return () => window.removeEventListener("hashchange", onChange)
  }, [])
  return hash
}

export default function App() {
  const hash = useHashRoute()

  let page
  let route: "home" | "articles" | "article" = "home"
  const articleMatch = hash.match(/^#\/article\/(.+)$/)
  const catMatch = hash.match(/^#\/cat\/(.+)$/)
  if (articleMatch) {
    page = <ArticlePage id={decodeURIComponent(articleMatch[1])} />
    route = "article"
  } else if (catMatch) {
    page = <Articles activeCat={decodeURIComponent(catMatch[1])} />
    route = "articles"
  } else if (hash.startsWith("#/articles")) {
    page = <Articles activeCat="" />
    route = "articles"
  } else {
    page = <Landing />
    route = "home"
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header route={route} />
      <div className="flex-1">{page}</div>
      <footer className="border-t border-border/60">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="flex size-5 items-center justify-center rounded bg-gradient-to-br from-primary to-primary/60 text-[9px] font-bold text-primary-foreground"
              >
                AI
              </span>
              <span className="text-sm font-semibold">AI調査ノート</span>
            </div>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              AIについて調べた知見をカテゴリ別に整理し、毎日すこしずつ蓄積していくナレッジベース。
            </p>
          </div>
          <nav aria-label="フッターナビゲーション">
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              サイト
            </h2>
            <ul className="mt-3 space-y-2 text-[13px]">
              <li><a className="text-muted-foreground transition-colors hover:text-foreground" href="#/">ホーム</a></li>
              <li><a className="text-muted-foreground transition-colors hover:text-foreground" href="#/articles">記事一覧</a></li>
            </ul>
          </nav>
          <nav aria-label="カテゴリ">
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              主なカテゴリ
            </h2>
            <ul className="mt-3 space-y-2 text-[13px]">
              {CATEGORIES.slice(0, 4).map((cat) => (
                <li key={cat.id}>
                  <a
                    className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                    href={`#/cat/${cat.id}`}
                  >
                    <span aria-hidden="true" className="size-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="border-t border-border/60">
          <p className="mx-auto max-w-5xl px-4 py-4 text-xs text-muted-foreground">
            AI調査ノート — 調べたことを、毎日すこしずつ。
          </p>
        </div>
      </footer>
    </div>
  )
}
