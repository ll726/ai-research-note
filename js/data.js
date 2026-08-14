// ============================================================
// AI調査サイト データファイル
// 記事を追加するときはこのファイルだけを編集すればOK
// ============================================================

// ---- カテゴリ定義 ----
// 新しいカテゴリを増やしたいときはここに追加する
// id: 半角英数(記事側の category と一致させる)
// name: 画面に表示される名前
// color: カテゴリバッジの色
const CATEGORIES = [
  { id: "chatgpt",  name: "ChatGPT / OpenAI",   color: "#10a37f", description: "ChatGPT・GPTシリーズなどOpenAI関連の情報" },
  { id: "claude",   name: "Claude / Anthropic", color: "#d97757", description: "Claude・Claude CodeなどAnthropic関連の情報" },
  { id: "gemini",   name: "Gemini / Google",    color: "#4285f4", description: "Gemini・NotebookLMなどGoogle関連の情報" },
  { id: "image",    name: "画像生成AI",          color: "#a855f7", description: "Midjourney・Stable Diffusionなど画像生成AI" },
  { id: "video",    name: "動画・音声AI",        color: "#ec4899", description: "動画生成・音声合成・音楽生成などのAI" },
  { id: "coding",   name: "AIコーディング",      color: "#f59e0b", description: "Claude Code・Copilot・CursorなどAI開発ツール" },
  { id: "local",    name: "ローカルLLM",         color: "#64748b", description: "Ollama・ローカル環境で動かすAIモデル" },
  { id: "news",     name: "ニュース・動向",      color: "#0ea5e9", description: "AI業界の最新ニュースやトレンド" },
  { id: "howto",    name: "活用ノウハウ",        color: "#22c55e", description: "プロンプトの書き方・便利な使い方など" },
];

// ---- 記事データ ----
// 新しい記事は配列の【先頭】に追加する(上にあるほど新しい記事として扱われる)
//
// 記事のテンプレート(コピーして使う):
// {
//   id: "20260814-01",            // 日付+連番。他の記事と重複しないこと
//   title: "記事タイトル",
//   category: "chatgpt",          // 上のCATEGORIESのidのどれか
//   date: "2026-08-14",           // YYYY-MM-DD形式
//   summary: "一覧に表示される短い説明文(1〜2文)",
//   content: `
//     <p>本文はHTMLで書く。&lt;p&gt;で段落、&lt;h2&gt;で見出し。</p>
//     <h2>見出し</h2>
//     <p>段落テキスト。<strong>太字</strong>や<a href="https://example.com">リンク</a>も使える。</p>
//     <ul><li>箇条書き</li><li>その2</li></ul>
//   `,
// },
const ARTICLES = [
  {
    id: "20260814-02",
    title: "このサイトの使い方・記事の追加方法",
    category: "howto",
    date: "2026-08-14",
    summary: "このサイトの構成と、新しい記事・カテゴリを追加する手順のメモ。",
    content: `
      <p>このサイトは <code>js/data.js</code> というファイルに記事データをまとめて持っています。記事を追加するときはそのファイルだけを編集すればOKです。</p>
      <h2>記事を追加する手順</h2>
      <ul>
        <li><code>js/data.js</code> を開く</li>
        <li><code>ARTICLES</code> 配列の先頭に、テンプレートをコピーして新しい記事を追加する</li>
        <li><code>id</code> は「日付+連番」(例: 20260815-01)にして重複させない</li>
        <li><code>category</code> は <code>CATEGORIES</code> にあるidから選ぶ</li>
        <li>保存してブラウザを再読み込みすれば反映される</li>
      </ul>
      <h2>カテゴリを増やしたいとき</h2>
      <p><code>CATEGORIES</code> 配列に1行追加するだけで、トップページのカテゴリ一覧と絞り込みに自動で反映されます。</p>
    `,
  },
  {
    id: "20260814-01",
    title: "サイト開設:AIについて調べたことをまとめていきます",
    category: "news",
    date: "2026-08-14",
    summary: "いろいろなAIについて調べた内容を、カテゴリ別に日々追加していくサイトです。",
    content: `
      <p>ChatGPT・Claude・Geminiといった対話AIから、画像生成・動画生成・AIコーディングツールまで、調べたことをカテゴリ別に整理して記録していきます。</p>
      <p>記事は毎日少しずつ追加していく予定です。カテゴリも必要に応じて増やしていきます。</p>
    `,
  },
];
