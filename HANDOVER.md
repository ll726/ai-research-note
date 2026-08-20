# HANDOVER.md

- 最終更新: 2026-08-20(デザイン全面刷新。記事は計13件)

## 今回やったこと(追記: 公開)

- GitHub Pagesで公開: **https://ll726.github.io/ai-research-note/**(リポジトリ: https://github.com/ll726/ai-research-note、公開リポジトリ)
- `master` へ push すると GitHub Actions(`.github/workflows/deploy.yml`)が自動ビルド&デプロイ(数分で反映)
- `vite.config.ts` の base は GitHub Actions 上でのみ `/ai-research-note/` になる(ローカルは `/` のまま)
- ローカル起動用に `サイトを開く.bat` を作成(ダブルクリックでサーバー起動+ブラウザが開く)
- **記事を追加したら `git push` を忘れずに**(pushしないと公開サイトに反映されない)

## 今回やったこと(追記: ブログ型→HP型への再構成)

- トップページをランディングページ化(`src/pages/Landing.tsx`): ヒーロー(キャッチコピー+CTA+統計)、カテゴリ紹介グリッド(3列カード)、最新記事3枚
- 記事の時系列リストは `#/articles`(`src/pages/Articles.tsx`)へ分離。カテゴリ絞り込み(`#/cat/xx`)もこのページで表示
- ヘッダーにナビゲーション(ホーム/記事一覧、アクティブ表示付き)
- フッターを3カラム(サイト説明/サイトナビ/主なカテゴリ)に刷新
- 旧 `Home.tsx` は削除。ルーティングは `#/` → Landing、`#/articles` → 一覧、`#/article/id` → 詳細

## プロジェクト概要

AIについて調べた記事をカテゴリ別に載せていくサイト「AI調査ノート」。Vite + React + TypeScript + Tailwind CSS v4 構成。閲覧は公開URL(https://ll726.github.io/ai-research-note/)、ローカルは `npm run dev`(ポート5310)。

## 今回やったこと(2026-08-20: デザイン全面刷新)

- Claude Design でデザイン案を作成(トップ / 記事一覧 / 記事詳細 / デザイン基礎の4アートボード)
  → https://claude.ai/code/artifact/cbf9bce7-261e-4ecd-abaa-f9fe00cf1ca9
- 方向性を Linear風ダーク紫 → **Apple / Linear / Notion 系のライトテーマ**に変更
  - 紙色 `#fbfaf8` / インク `#16161a` / 罫線 `#e4e1db` / アクセントは藍 `#2a4e8f` 1色のみ
  - 紫グラデーション・背景グロー・カード・大きな角丸を全廃(角丸は最大6px、影なし)
  - 書体を3種に:見出し=Zen Old Mincho(明朝)、本文=Zen Kaku Gothic New、日付=IBM Plex Mono
  - カテゴリ色9種を彩度・明度の揃った落ち着いた色に差し替え(`articles.ts`)
  - 記事本文は680px幅に固定(一行40文字前後)
- 不要になった shadcn/ui コンポーネント(button/card/badge/input/separator)、CategoryIcon.tsx、globals.css を削除
- 機能(検索・絞り込み・関連記事・読了時間・ルーティング)は一切変更なし
- アクセシビリティ実測: 全テキスト 4.85:1 以上、タッチ時44px以上、320px幅で横スクロールなし
- 画像を追加: `src/components/HeroArt.tsx`(トップのヒーロー作図・SVG)と `public/favicon.svg`(サイトマーク。従来は紫のVite既定アイコンだった)
- 未使用アセット(hero.png / react.svg / vite.svg / icons.svg)を削除
- 記事内に画像を入れたい場合は本文HTMLに `<img src="...">` を書けばよい(罫線・角丸つきで整形される)

## 今回やったこと

- 旧静的サイト(HTML/CSS/JS)を React 構成に移行
  - 移行前の状態は git の最初のコミットと `old-site/` フォルダに保存済み
  - Vite (react-ts) でスキャフォールド、Tailwind v4 (`@tailwindcss/vite`) 導入
  - shadcn/ui を初期化(`-b radix -p nova` プリセット、Geistフォント+日本語フォールバック追加)
  - button / card / badge / input / separator を導入済み
- 記事データを `src/data/articles.ts` に移植(型付き。追加運用は旧 `js/data.js` と同じ)
- ハッシュルーター自作(`#/`、`#/cat/カテゴリid`、`#/article/記事id`)
- shadcn公式MCPサーバー設定(`.mcp.json`、npx shadcn@latest mcp)
- `npm run build` 成功、ブラウザで表示確認済み(コンソールエラーなし)

## 過去の作業(追記: Linearデザイン適用 ※2026-08-20の刷新で置き換え済み)

- Better Design の公開レジストリから Linear テーマを適用(APIキー不要)
  - `npx shadcn@latest add https://www.better-design.com/registry/linear/globals.json` でテーマトークン導入(ダーク紫基調)
  - button / card / badge / input / separator を Linear 版で上書き
- UIをLinear風に全面再設計(ロジック変更なし): sticky ヘッダー、カテゴリはフィルタピル、記事一覧は高密度リスト行
- Better Design のレビュールール(https://better-design.com/ai-guardrails/download/claude-code)で再評価し修正:
  - コントラスト実測(oklch→sRGB換算スクリプト)で全テキスト WCAG AA 4.5:1 以上を確認(ピル内件数の opacity-70 が 3.68:1 だったため撤廃 → 6.02:1)
  - タッチ端末でピル・検索欄を44px化(`pointer-coarse:h-11`)
  - `prefers-reduced-motion` 対応を index.css に追加
  - 320px幅で横スクロールなしを確認、記事ページは行長制限のため max-w-3xl に
  - カテゴリ色はドット+テキスト併記(色だけに依存しない)

## 未完了・途中の作業

- Better Design(marvkr/better-design)のMCP接続は未設定(APIキーをユーザー自身が better-design.com/settings で取得する必要がある)。APIキーなしでも `npx shadcn@latest add https://www.better-design.com/registry/<theme>/<component>.json` でテーマ付きコンポーネントを取得可能

## 次にやること(優先順)

1. 実際のAI調査記事を `src/data/articles.ts` の `ARTICLES` 先頭に追加していく
2. 記事が増えたらページネーション検討
3. 必要ならダークテーマの追加(現在はライトのみ)

## ハマりポイント・注意点

- 書体はGoogle Fonts。`src/index.css` の `@import` ではなく **`index.html` の `<link>`** で読み込む(CSSの@importは他ルールより後になり警告が出るため)
- 二次テキストの色は `--ink-3: #6e6e76` が下限(これより薄いとコントラスト4.5:1を割る)。`--ink-4` は装飾専用で文字色に使わない
- shadcn CLI 4.x は `init` に `-b(ライブラリ) -p(プリセット)` が必要。対話プロンプトはCLI環境で使えないのでフラグ指定必須
- TypeScript 6 で `baseUrl` が非推奨 → tsconfig は `paths` のみで設定している(`baseUrl` を足すとビルドが落ちる)
- 記事の `id` は日付+連番で重複禁止。`category` は `CATEGORIES` の id と一致させる
- 本文 `content` はバッククォート囲みのHTML。本文中にバッククォートを書くとエラー
- 開発サーバーのポートは **5310番に固定**(`vite.config.ts` の `server.port`、`strictPort: true`)。5173は別プロジェクトが使用中で衝突したため変更した。`npm run preview` は5311番
