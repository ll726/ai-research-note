# AI調査ノート

いろいろなAIについて調べたことをカテゴリ別にまとめていくサイト。
**Vite + React + TypeScript + Tailwind CSS** 構成。
デザインは Apple / Linear / Notion 系のライトテーマ(暖色の紙色・近黒インク・藍アクセント1色、カードを使わず罫線と余白で構成)。

## 公開URL(どこからでも開ける)

**https://ll726.github.io/ai-research-note/**

スマホ・他のPCからもこのURLで閲覧できる。`git push` すると GitHub Actions が自動でビルドして数分で公開に反映される。

## サイトを表示する方法(ローカル)

`サイトを開く.bat` をダブルクリック(サーバー起動+ブラウザが自動で開く)。または:

```bash
npm run dev
```

を実行して http://localhost:5310 をブラウザで開く。

ポートは他プロジェクトと衝突しないよう `vite.config.ts` で **5310番に固定**している(ビルド結果のプレビュー `npm run preview` は5311番)。もし5310が埋まっていた場合は黙って別ポートに移らずエラーになるので、`vite.config.ts` の `server.port` を変更する。

## 記事を追加する方法

1. `src/data/articles.ts` を開く
2. `ARTICLES` 配列の**先頭**に、ファイル内のテンプレートをコピーして記事を追加
3. `id` は「日付+連番」(例: `20260815-01`)で重複しないようにする
4. `category` は `CATEGORIES` にある id から選ぶ
5. 保存すると開発サーバーが自動リロードして反映される

本文(`content`)はHTMLで記述。`<p>` 段落・`<h2>` 見出し・`<ul><li>` 箇条書き・`<pre><code>` コードブロック・`<table>` 表などが使える。

## カテゴリを追加する方法

`src/data/articles.ts` の `CATEGORIES` 配列に1行追加するだけで自動反映。

```ts
{ id: "robot", name: "ロボティクスAI", color: "#8b5cf6", description: "説明文" },
```

## ファイル構成

```
src/
  data/articles.ts      … ★記事とカテゴリのデータ(普段編集するのはここだけ)
  App.tsx               … ルーティングとフッター
  pages/Landing.tsx     … トップ(ヒーロー・カテゴリ・最新記事)
  pages/Articles.tsx    … 記事一覧(検索・カテゴリ絞り込み)
  pages/ArticlePage.tsx … 記事詳細
  components/           … ヘッダー・記事行
  index.css             … テーマ変数・記事本文スタイル
old-site/               … 移行前の旧静的サイト(参考用)
```

## UIコンポーネントの追加

shadcn公式MCPサーバー設定済み(`.mcp.json`)。必要になったら Claude Code に頼むか、手動なら:

```bash
npx shadcn@latest add dialog
```

## 公開用ビルド

```bash
npm run build
```

`dist/` フォルダに静的ファイルが生成される(サーバーに置けば公開可能)。
