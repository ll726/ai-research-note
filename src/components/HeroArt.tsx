import { CATEGORIES } from "@/data/articles"

// ヒーローの作図。写真は使わず、サイト自身の「罫線で並ぶ索引」を幾何学図案にしたもの。
// 色は本文と同じトークン(紙・罫線・カテゴリ色)だけを使う。
export function HeroArt({ className }: { className?: string }) {
  // 索引の行。w は行の長さ、dot はカテゴリ色を置く行
  const rows = [
    { w: 168, dot: 5 },
    { w: 132, dot: 1 },
    { w: 186, dot: null },
    { w: 150, dot: 8 },
    { w: 108, dot: null },
    { w: 174, dot: 2 },
    { w: 126, dot: null },
  ]

  return (
    <svg
      viewBox="0 0 420 340"
      className={className}
      role="img"
      aria-label="カテゴリ別に整理された記事の索引を表した図"
    >
      {/* 背景の大きな円。奥行きだけを担う */}
      <circle cx="286" cy="150" r="132" fill="none" stroke="#e4e1db" strokeWidth="1" />
      <circle cx="286" cy="150" r="86" fill="none" stroke="#eceae5" strokeWidth="1" />

      {/* 索引の枠 */}
      <rect x="40.5" y="52.5" width="286" height="238" rx="6" fill="#fbfaf8" stroke="#cfcbc3" strokeWidth="1" />

      {/* 見出しを受ける濃い罫線 */}
      <path d="M40.5 88.5h286" stroke="#16161a" strokeWidth="1" />
      <rect x="64" y="68" width="52" height="7" rx="3.5" fill="#16161a" />
      <rect x="286" y="68.5" width="18" height="6" rx="3" fill="#cfcbc3" />

      {/* 行 */}
      {rows.map((r, i) => {
        const y = 116 + i * 24
        const cat = r.dot !== null ? CATEGORIES[r.dot] : null
        return (
          <g key={i}>
            {cat && <circle cx="68" cy={y} r="3.5" fill={cat.color} />}
            <rect x={cat ? 80 : 64} y={y - 3} width={r.w} height="6" rx="3" fill={i === 0 ? "#40404a" : "#e4e1db"} />
            {i < rows.length - 1 && (
              <path d={`M64 ${y + 12}h238`} stroke="#f1eee9" strokeWidth="1" />
            )}
          </g>
        )
      })}

      {/* 円に沿って散る点。カテゴリの広がりを示す */}
      <circle cx="286" cy="18" r="4" fill={CATEGORIES[7].color} />
      <circle cx="380" cy="96" r="3.5" fill={CATEGORIES[3].color} />
      <circle cx="404" cy="188" r="3" fill={CATEGORIES[4].color} />
      <circle cx="352" cy="264" r="4" fill={CATEGORIES[6].color} />
      <circle cx="252" cy="288" r="3" fill={CATEGORIES[0].color} />
    </svg>
  )
}
