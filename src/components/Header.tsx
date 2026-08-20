// サイト共通のロゴマーク(ノートを表すストロークアイコン)
export function SiteMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="1.75" y="1.75" width="14.5" height="14.5" rx="3.25" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5.5 6.6h7M5.5 9h7M5.5 11.4h4.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export function Header({ route }: { route: "home" | "articles" | "article" }) {
  const navLink = (href: string, label: string, active: boolean) => (
    <a
      href={href}
      aria-current={active ? "page" : undefined}
      className={`text-[13px] transition-colors pointer-coarse:py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        active ? "font-medium text-foreground" : "text-ink-3 hover:text-foreground"
      }`}
    >
      {label}
    </a>
  )

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-[61px] max-w-5xl items-center justify-between px-6 sm:px-14">
        <a
          href="#/"
          className="flex items-center gap-2.5 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <SiteMark />
          <span className="text-[15px] font-medium tracking-[0.01em]">AI調査ノート</span>
        </a>
        <nav aria-label="メインナビゲーション" className="flex items-center gap-7">
          {navLink("#/", "ホーム", route === "home")}
          {navLink("#/articles", "記事一覧", route === "articles" || route === "article")}
        </nav>
      </div>
    </header>
  )
}
