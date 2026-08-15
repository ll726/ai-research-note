# HANDOVER.md

- 最終更新: 2026-08-15(GitHub Pages公開。記事は計5件)

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

AIについて調べた記事をカテゴリ別に載せていくサイト「AI調査ノート」。Vite + React + TypeScript + Tailwind CSS v4 + shadcn/ui 構成。閲覧は `npm run dev`。

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

## 今回やったこと(追記: Linearデザイン適用)

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
2. Better Design のテーマ適用を試す(例: linear テーマ)
3. 記事が増えたらページネーション検討

## ハマりポイント・注意点

- shadcn CLI 4.x は `init` に `-b(ライブラリ) -p(プリセット)` が必要。対話プロンプトはCLI環境で使えないのでフラグ指定必須
- TypeScript 6 で `baseUrl` が非推奨 → tsconfig は `paths` のみで設定している(`baseUrl` を足すとビルドが落ちる)
- 記事の `id` は日付+連番で重複禁止。`category` は `CATEGORIES` の id と一致させる
- 本文 `content` はバッククォート囲みのHTML。本文中にバッククォートを書くとエラー
- 開発サーバーのポートは **5310番に固定**(`vite.config.ts` の `server.port`、`strictPort: true`)。5173は別プロジェクトが使用中で衝突したため変更した。`npm run preview` は5311番
