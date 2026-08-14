export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-4xl items-center gap-3 px-4">
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
        <span className="hidden text-xs text-muted-foreground sm:inline">
          いろいろなAIについて調べたことをカテゴリ別に記録
        </span>
      </div>
    </header>
  )
}
