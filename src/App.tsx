import { useEffect, useState } from "react"
import { Header, SiteMark } from "@/components/Header"
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

      <footer className="mt-24 border-t border-rule">
        <div className="mx-auto flex max-w-5xl flex-col justify-between gap-10 px-6 py-11 sm:flex-row sm:px-14">
          <div className="max-w-[23em]">
            <div className="flex items-center gap-2.5 text-foreground">
              <SiteMark size={16} />
              <span className="text-[13px] font-medium">AI調査ノート</span>
            </div>
            <p className="mt-3.5 text-xs leading-[1.9] text-ink-3">
              AIについて調べた知見をカテゴリ別に整理し、毎日すこしずつ蓄積していくナレッジベース。
            </p>
          </div>
          <div className="flex gap-14 sm:gap-20">
            <nav aria-label="サイト">
              <h2 className="font-mono text-[10.5px] tracking-[0.14em] text-ink-3">SITE</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li>
                  <a href="#/" className="inline-block text-[12.5px] text-ink-2 transition-colors pointer-coarse:py-[13px] hover:text-foreground">
                    ホーム
                  </a>
                </li>
                <li>
                  <a href="#/articles" className="inline-block text-[12.5px] text-ink-2 transition-colors pointer-coarse:py-[13px] hover:text-foreground">
                    記事一覧
                  </a>
                </li>
              </ul>
            </nav>
            <nav aria-label="主なカテゴリ">
              <h2 className="font-mono text-[10.5px] tracking-[0.14em] text-ink-3">CATEGORIES</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {CATEGORIES.slice(0, 4).map((cat) => (
                  <li key={cat.id}>
                    <a
                      href={`#/cat/${cat.id}`}
                      className="inline-flex items-center gap-2 text-[12.5px] text-ink-2 transition-colors pointer-coarse:py-[13px] hover:text-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className="size-[5px] rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      {cat.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className="border-t border-rule">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5 sm:px-14">
            <span className="text-[11.5px] text-ink-3">AI調査ノート — 調べたことを、毎日すこしずつ。</span>
            <span className="font-mono text-[11.5px] text-ink-3">2026</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
