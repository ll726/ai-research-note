import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages(https://ll726.github.io/ai-research-note/)ではサブパス配信になるため、
  // GitHub Actions上でのビルドのみ base を変更する。ローカルは従来どおり /
  base: process.env.GITHUB_ACTIONS ? "/ai-research-note/" : "/",
  plugins: [react(), tailwindcss()],
  // 他プロジェクトの開発サーバー(5173など)と衝突しないよう専用ポートを固定。
  // strictPort: 使用中なら黙って別ポートに移らずエラーで知らせる
  server: {
    port: 5310,
    strictPort: true,
  },
  preview: {
    port: 5311,
    strictPort: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
})
