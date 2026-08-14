import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArticleCard } from "@/components/ArticleCard"
import { ARTICLES, CATEGORIES, categoryMap, sortedArticles } from "@/data/articles"

export function Home({ activeCat }: { activeCat: string }) {
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

  const activeCatName = activeCat ? categoryMap[activeCat]?.name : null

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      {/* カテゴリ */}
      <h2 className="mb-3 text-lg font-bold">カテゴリ</h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {CATEGORIES.map((cat) => {
          const count = ARTICLES.filter((a) => a.category === cat.id).length
          const isActive = cat.id === activeCat
          return (
            <a key={cat.id} href={isActive ? "#/" : `#/cat/${cat.id}`} className="block group">
              <Card
                className={`h-full py-3 transition-all group-hover:-translate-y-0.5 group-hover:shadow-md ${
                  isActive ? "ring-2 ring-ring" : ""
                }`}
              >
                <CardContent className="px-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-sm font-semibold">{cat.name}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{count}</span>
                  </div>
                  <p className="mt-1 hidden text-xs text-muted-foreground sm:block">
                    {cat.description}
                  </p>
                </CardContent>
              </Card>
            </a>
          )
        })}
      </div>

      {/* 記事一覧 */}
      <div className="mt-10 mb-3 flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-bold">記事一覧</h2>
        {activeCatName && (
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            カテゴリ: {activeCatName}
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" asChild>
              <a href="#/">解除</a>
            </Button>
          </span>
        )}
        <span className="ml-auto text-sm text-muted-foreground">{articles.length} 件</span>
      </div>

      <Input
        type="search"
        placeholder="記事を検索..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="mb-4"
      />

      <div className="flex flex-col gap-3">
        {articles.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-10 text-center text-sm text-muted-foreground">
              該当する記事がありません
            </CardContent>
          </Card>
        ) : (
          articles.map((a) => <ArticleCard key={a.id} article={a} />)
        )}
      </div>
    </main>
  )
}
