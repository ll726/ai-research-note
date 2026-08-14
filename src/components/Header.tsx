export function Header({ route }: { route: "home" | "articles" | "article" }) {
  const navLink = (href: string, label: string, active: boolean) => (
    <a
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        active ? "bg-secondary/70 text-foreground" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
      }`}
    >
      {label}
    </a>
  )

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-4">
        <a
          href="#/"
          className="flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span
            aria-hidden="true"
            className="flex size-6 items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary/60 text-[11px] font-bold text-primary-foreground shadow-[0_0_0_1px_color-mix(in_oklch,var(--primary)_55%,transparent),0_1px_3px_rgba(0,0,0,0.4)]"
          >
            AI
          </span>
          <span className="text-[15px] font-semibold tracking-tight">AI調査ノート</span>
        </a>
        <nav aria-label="メインナビゲーション" className="ml-auto flex items-center gap-1">
          {navLink("#/", "ホーム", route === "home")}
          {navLink("#/articles", "記事一覧", route === "articles" || route === "article")}
        </nav>
      </div>
    </header>
  )
}
