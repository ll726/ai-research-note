// ============================================================
// AI調査ノート データファイル
// 記事を追加するときはこのファイルだけを編集すればOK
// ============================================================

export type Category = {
  id: string
  name: string
  color: string
  description: string
}

export type Article = {
  id: string
  title: string
  category: string // CATEGORIES の id のどれか
  date: string // YYYY-MM-DD
  summary: string
  content: string // 本文(HTML)
}

// ---- カテゴリ定義 ----
// 新しいカテゴリを増やしたいときはここに追加する
export const CATEGORIES: Category[] = [
  { id: "chatgpt", name: "ChatGPT / OpenAI", color: "#10a37f", description: "ChatGPT・GPTシリーズなどOpenAI関連の情報" },
  { id: "claude", name: "Claude / Anthropic", color: "#d97757", description: "Claude・Claude CodeなどAnthropic関連の情報" },
  { id: "gemini", name: "Gemini / Google", color: "#4285f4", description: "Gemini・NotebookLMなどGoogle関連の情報" },
  { id: "image", name: "画像生成AI", color: "#a855f7", description: "Midjourney・Stable Diffusionなど画像生成AI" },
  { id: "video", name: "動画・音声AI", color: "#ec4899", description: "動画生成・音声合成・音楽生成などのAI" },
  { id: "coding", name: "AIコーディング", color: "#f59e0b", description: "Claude Code・Copilot・CursorなどAI開発ツール" },
  { id: "local", name: "ローカルLLM", color: "#64748b", description: "Ollama・ローカル環境で動かすAIモデル" },
  { id: "news", name: "ニュース・動向", color: "#0ea5e9", description: "AI業界の最新ニュースやトレンド" },
  { id: "howto", name: "活用ノウハウ", color: "#22c55e", description: "プロンプトの書き方・便利な使い方など" },
]

// ---- 記事データ ----
// 新しい記事は配列の【先頭】に追加する
//
// 記事のテンプレート(コピーして使う):
// {
//   id: "20260815-01",            // 日付+連番。他の記事と重複しないこと
//   title: "記事タイトル",
//   category: "chatgpt",          // 上のCATEGORIESのidのどれか
//   date: "2026-08-15",           // YYYY-MM-DD形式
//   summary: "一覧に表示される短い説明文(1〜2文)",
//   content: `
//     <p>本文はHTMLで書く。</p>
//     <h2>見出し</h2>
//     <p>段落テキスト。<strong>太字</strong>や<a href="https://example.com">リンク</a>も使える。</p>
//     <ul><li>箇条書き</li><li>その2</li></ul>
//   `,
// },
export const ARTICLES: Article[] = [
  {
    id: "20260814-04",
    title: "ループエンジニアリング完全ガイド【統合版】",
    category: "coding",
    date: "2026-08-14",
    summary:
      "「AIに指示する人」をやめ「指示する仕組み」を設計する。Web調査+安野貴博氏・にゃんた氏の動画内容を統合した実践ガイド。",
    content: `
      <p><strong>ループエンジニアリングとは、AIに一手ずつプロンプトを打つ代わりに、「AIが自分で作業を見つけ→実行し→検証し→修正する」反復サイクル(ループ)そのものを設計する実践手法です。</strong></p>
      <p>2026年6月、Google ChromeのAddy Osmani氏がブログで命名。Anthropic Claude Code責任者Boris Cherny氏の「私はもうClaudeにプロンプトを書かない。私の仕事はループを書くことだ」という発言とともに一気に広まりました。本質は <strong>Human-in-the-Loop(ループの中で人間がレビュー)→ Human-on-the-Loop(ループの外から人間が監督)</strong> への移行です。</p>

      <h2>1. 全体像 ― 4段階の系譜</h2>
      <p>AIとの関わり方は4段階で外へ外へと広がってきました。新しい段階が古い段階を否定するのではなく、積み重なる関係です(Osmani「プロンプトエンジニアリングは死んでいない。土台になっただけだ」)。</p>
      <table>
        <tr><th>段階</th><th>何を設計するか</th><th>人間に例えると</th></tr>
        <tr><td>① プロンプトエンジニアリング</td><td>AIへの頼み方(指示文)</td><td>仕事の頼み方・伝え方</td></tr>
        <tr><td>② コンテキストエンジニアリング</td><td>AIに何を・いつ・どれだけ読ませるか</td><td>渡す資料・情報の選定</td></tr>
        <tr><td>③ ハーネスエンジニアリング</td><td>AIが安全に作業できる環境全体(テスト、Lint、権限管理)</td><td>作業環境・職場の整備</td></tr>
        <tr><td>④ ループエンジニアリング</td><td>「AIを動かし始める」ことも自動化し、人間はループの外へ</td><td>仕事の任せ方・監督の仕組み</td></tr>
      </table>
      <p><strong>重要な前提</strong>:①〜③がしっかりできていないままループを回すと暴走します。特にハーネス(テスト・Lint・ルールファイル・「判断に迷ったら人間に聞く」仕組み)はループの前提条件です。</p>
      <p><strong>Cronとの違い</strong>:Cronは毎回同じスクリプトを状態判断なしに実行しますが、ループではAIが状態を判断し、次のアクションを動的に決め、失敗を観察して修正します。</p>
      <p><strong>ループとグラフの軸の違い</strong>(にゃんた氏):ループ=時間軸の設計(いつ・何回・どう回すか)、グラフ=構造軸の設計(どこにどのAIを配置するか)。</p>

      <h2>2. 仕組み ― ループの解剖学</h2>
      <p>基本サイクルは4つ:①<strong>目標</strong>(検証可能な停止条件を持つこと。「コードをきれいに」は不可、「全テストが通ったら停止」は可)→②<strong>行動</strong>(コード生成・テスト実行・修正)→③<strong>観察</strong>(CIの合否など結果の評価)→④<strong>調整</strong>(方針修正して再始動)。</p>
      <p>技術的な源流:<strong>ReAct</strong>(2022、推論と行動の交互反復)、<strong>Reflexion / Self-Refine</strong>(2023、作成・評価・失敗の言語化の3役構造)、<strong>Ralph Wiggumループ</strong>(2025、<code>while :; do cat PROMPT.md | claude-code ; done</code> の1行。毎周コンテキストをリセットし状態はファイルシステムに持たせる。「1周につき1つのことだけ」が鉄則)。</p>
      <h3>Andrew Ngの「3つの入れ子ループ」</h3>
      <ul>
        <li><strong>エージェント実装ループ(分単位)</strong>:AIが「実装→テスト→修正」を数分おきに反復</li>
        <li><strong>人間の監督ループ(数十分〜数時間)</strong>:出来上がりを見て方向修正。人間はここに集中</li>
        <li><strong>外部フィードバックループ(数時間〜数週間)</strong>:実ユーザーの反応→仕様更新→最速ループへ戻す</li>
      </ul>
      <p>人間がループに残る理由(Ng氏の仮説):センスが貴重だからではなく、<strong>ユーザーや利用状況についてAIが知らないことを人間が知っているから</strong>。ループ設計とは「3つのループのどこに人間を置くか」の線引きです。</p>

      <h2>3. なぜ「検証を分ける」のか ― 実証データ</h2>
      <p>ループの核心は<strong>作成者と検証者の分離(maker/checker構造)</strong>。LLMは自分の作ったものを甘く採点するためです。</p>
      <ul>
        <li>フィードバックなしの自己修正は、多くのモデルで5回反復してもほぼ精度が上がらない(KAIST・CMU・NVIDIAの論文)</li>
        <li>別AIによる評価基準付きフィードバックは5回反復で劇的に改善(Opus 4.1で98.4%到達の例)</li>
        <li>評価基準を自分に持たせると75.8止まり、他AI採点なら94.7。<strong>自分で基準を持つより外からダメ出しされる方が伸びる</strong></li>
        <li>にゃんた氏の実験(マニュアル自動作成)でも、検証サブエージェント+最大3回ループで図の品質が明確に向上。「AIも人間と同じで、作るより批判する方が簡単」</li>
      </ul>
      <p>弱点は<strong>コスト増</strong>(モデルを複数回使う)と<strong>局所最適化</strong>(そこそこの所で止まる)。</p>

      <h2>4. 使い方 ― Claude Code公式4類型</h2>
      <table>
        <tr><th>ループ型</th><th>手放すもの</th><th>使う場面</th><th>プリミティブ</th></tr>
        <tr><td>ターンベース</td><td>チェック</td><td>探索・意思決定中</td><td>カスタム検証スキル</td></tr>
        <tr><td>ゴールベース</td><td>停止条件</td><td>「完了」が明確</td><td><code>/goal</code></td></tr>
        <tr><td>時間ベース</td><td>トリガー</td><td>定期的な外部作業</td><td><code>/loop</code>, <code>/schedule</code></td></tr>
        <tr><td>プロアクティブ</td><td>プロンプト</td><td>反復的で定義明確な作業</td><td>全部+dynamic workflows</td></tr>
      </table>
      <p><strong>注意</strong>:<code>/loop</code>は単なる定期実行。「実行→検証→改善」の真のループをやりたいなら<code>/goal</code>が正解です(例:<code>/goal ホームページのLighthouseスコアを90以上に。5回試行で停止</code>)。サブエージェント自作なら自由度はさらに高く、検証側だけ高性能モデル(Opus/Fable)、実行側はSonnetにするとコスト節約になります。</p>
      <p>実務例:Sentryのエラー記録からエージェントが調査してPRを開く/フレーキーテスト修正/障害トリアージ/PostHogでは一晩AIをClickHouseクエリエンジンに走らせ、約3年間存在したバグを発見・修正(全体で11%の性能改善)。</p>

      <h2>5. 構築の仕方 ― 自分でループを組む</h2>
      <p>Osmaniの「5+1の構成要素」:①Automations(心拍)②Worktrees(並列の分離)③Skills(プロジェクト知識)④Plugins/Connectors(MCP経由の実世界接続)⑤<strong>Sub-agents(作成者と検証者の分離。最重要)</strong>+⑥外部状態=spine(「エージェントは忘れるが、リポジトリは忘れない」)。</p>
      <h3>必須のガードレール(多層防御)</h3>
      <ol>
        <li>検証器(目標達成を確認する)</li>
        <li>反復回数のハード上限(例:20回)</li>
        <li>トークン/ドル建て予算上限(例:日次50ドルで警告)</li>
        <li>進捗停滞検知(同じエラー・空diffがN回続いたら中断)</li>
      </ol>
      <p>「明示的な停止ロジックのないループは、最も一般的で最も高コストなミス」。実際に、未定義の成功条件で14時間・48,000ドル消費した事例、週末放置で4,200ドルの請求事例があります。エージェントは通常チャットの約4倍、マルチエージェントは約15倍のトークンを消費します(Anthropic実測)。</p>
      <h3>段階的導入(L1→L3)</h3>
      <ol>
        <li><strong>L1</strong>:検証可能なタスクを1つ選び、手動の<code>/goal</code>から。gitで退避線を張り、出力は人間がレビュー</li>
        <li><strong>L2</strong>:検証手順をSKILL.md化し、別の検証エージェントを導入。状態を外部ファイルに永続化</li>
        <li><strong>L3</strong>:<code>/schedule</code>やcronで定期実行。3つのガードレールを実装してから</li>
      </ol>
      <p><strong>やってはいけないこと</strong>:停止条件・予算上限なしの一晩放置/曖昧な目標をループに渡す/自己改善ループの無検証運用/レビューの完全自動化(Osmani「自分でコードをレビューしなければ製品品質は低下し、下降スパイラルに陥る」)。</p>

      <h2>6. 非エンジニアへの展開(安野氏の秘書業務の例)</h2>
      <p>「この人は17時以降は仕事をしない」というルールを勤怠システムと連携したテスト(ハーネス)として実装すれば、ルール違反の日程調整は自動的に弾かれ、AIの自動日程調整を信頼できるようになります。会議終了→AIがタスクを洗い出し→カレンダーAPIで関係者に招待→人間は承諾するだけ、も既存技術で実現可能。ポイントは「AIが働ける環境(ハーネス)を組織の中にいかに作るか」です。</p>

      <h2>7. 批判・限界・展望</h2>
      <ul>
        <li>検証ループには賛成でも、エージェントが自分の指示を書き換える「自己改善ループ」には強い不信(Matt Pocock氏)</li>
        <li>3つの負債:理解負債・意図負債・認知的降伏(批判的思考の丸投げ)</li>
        <li>Gartner予測:エージェント型AIプロジェクトの40%超が2027年末までに中止される</li>
        <li>展望:ループの次は「グラフ」。「ループはエージェントに考えさせ、グラフはエージェントに記憶させる」</li>
      </ul>
      <p><strong>結論</strong>:「同じループを2人が作っても正反対の結果になりうる。1人は深く理解している作業を速く進めるために使い、もう1人は作業を理解しないために使う。ループはその違いを知らない。あなたは知っている」(Osmani)。ループは能力を増幅しますが、目標定義・検証・意図という人間の役割は残ります。</p>

      <h2>付録:出典と注意事項</h2>
      <p>主要出典:Addy Osmani「Loop Engineering」(2026/6)、Anthropic公式「Getting started with loops」(2026/6/30)、Pragmatic Engineer、安野貴博氏YouTube動画、にゃんた氏YouTube動画、KAIST/CMU/NVIDIA自己修正論文。一部数値は自己申告・二次情報。ツール仕様・価格は2026年8月時点のもので変化が速いため、本番採用前に最新ドキュメントを確認してください。</p>
    `,
  },
  {
    id: "20260814-03",
    title: "サイトをReact + shadcn/uiにリニューアルしました",
    category: "news",
    date: "2026-08-14",
    summary: "Vite + React + Tailwind CSS + shadcn/ui 構成に移行し、デザインを一新しました。",
    content: `
      <p>プレーンなHTML/CSS/JSで作っていたこのサイトを、<strong>Vite + React + TypeScript + Tailwind CSS + shadcn/ui</strong> の構成に移行しました。</p>
      <h2>変わったこと</h2>
      <ul>
        <li>UIコンポーネントに shadcn/ui を採用し、デザインを一新</li>
        <li>shadcn公式MCPサーバー経由でコンポーネントを追加できる開発環境に</li>
        <li>記事データは <code>src/data/articles.ts</code> に一元化(追加方法は今までとほぼ同じ)</li>
      </ul>
      <p>閲覧するには <code>npm run dev</code> で開発サーバーを起動します。</p>
    `,
  },
  {
    id: "20260814-02",
    title: "このサイトの使い方・記事の追加方法",
    category: "howto",
    date: "2026-08-14",
    summary: "このサイトの構成と、新しい記事・カテゴリを追加する手順のメモ。",
    content: `
      <p>このサイトは <code>src/data/articles.ts</code> というファイルに記事データをまとめて持っています。記事を追加するときはそのファイルだけを編集すればOKです。</p>
      <h2>記事を追加する手順</h2>
      <ul>
        <li><code>src/data/articles.ts</code> を開く</li>
        <li><code>ARTICLES</code> 配列の先頭に、テンプレートをコピーして新しい記事を追加する</li>
        <li><code>id</code> は「日付+連番」(例: 20260815-01)にして重複させない</li>
        <li><code>category</code> は <code>CATEGORIES</code> にあるidから選ぶ</li>
        <li>保存すると開発サーバーが自動で再読み込みして反映される</li>
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
]

// ---- 便利関数 ----
export const categoryMap: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c])
)

export function sortedArticles(): Article[] {
  return [...ARTICLES].sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1
    return a.id < b.id ? 1 : -1
  })
}
