import { useEffect, useState } from "react"
import { Header } from "@/components/Header"
import { Home } from "@/pages/Home"
import { ArticlePage } from "@/pages/ArticlePage"

// ハッシュベースの簡易ルーター
//   #/            → トップページ
//   #/cat/<id>    → カテゴリで絞り込んだトップページ
//   #/article/<id>→ 記事詳細
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
  const articleMatch = hash.match(/^#\/article\/(.+)$/)
  const catMatch = hash.match(/^#\/cat\/(.+)$/)
  if (articleMatch) {
    page = <ArticlePage id={decodeURIComponent(articleMatch[1])} />
  } else if (catMatch) {
    page = <Home activeCat={decodeURIComponent(catMatch[1])} />
  } else {
    page = <Home activeCat="" />
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {page}
      <footer className="mt-4 border-t border-border/60">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/80">AI調査ノート</span>
          <span>調べたことを、カテゴリ別に毎日すこしずつ。</span>
        </div>
      </footer>
    </div>
  )
}
