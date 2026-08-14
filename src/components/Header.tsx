export function Header() {
  return (
    <header className="border-b bg-card">
      <div className="mx-auto max-w-4xl px-4 py-6">
        <a href="#/" className="text-2xl font-bold tracking-tight hover:opacity-80">
          AI調査ノート
        </a>
        <p className="mt-1 text-sm text-muted-foreground">
          いろいろなAIについて調べたことをカテゴリ別にまとめていくサイト
        </p>
      </div>
    </header>
  )
}
