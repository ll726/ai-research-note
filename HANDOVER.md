# HANDOVER.md

- 最終更新: 2026-08-14

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
- 開発サーバーは `.claude/launch.json`(npm run dev, port 5173)で起動できる
