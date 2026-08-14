import type { CSSProperties } from "react"
import {
  MessageSquare,
  Sparkles,
  Orbit,
  Image,
  Clapperboard,
  Code2,
  Cpu,
  Newspaper,
  Lightbulb,
  Tag,
  type LucideIcon,
} from "lucide-react"

// カテゴリid → アイコンの対応表。新カテゴリを追加したらここにも足す(無ければTagアイコン)
const ICONS: Record<string, LucideIcon> = {
  chatgpt: MessageSquare,
  claude: Sparkles,
  gemini: Orbit,
  image: Image,
  video: Clapperboard,
  coding: Code2,
  local: Cpu,
  news: Newspaper,
  howto: Lightbulb,
}

export function CategoryIcon({
  id,
  className,
  style,
}: {
  id: string
  className?: string
  style?: CSSProperties
}) {
  const Icon = ICONS[id] ?? Tag
  return <Icon aria-hidden="true" className={className} style={style} />
}
