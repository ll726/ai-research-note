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
      <footer className="py-8 text-center text-xs text-muted-foreground">AI調査ノート</footer>
    </div>
  )
}
