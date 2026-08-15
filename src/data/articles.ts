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
    id: "20260815-03",
    title: "【検証編】Cloudflare WebMCPを公式情報で確かめた ― 何が本当で何が未確定か",
    category: "coding",
    date: "2026-08-15",
    summary:
      "前回の調査メモ(動画ベース)をCloudflare公式ブログとW3C仕様で裏取り。ワンスイッチ有効化は本当。ただし「開発者プレビュー」であり、対応ブラウザや料金など未確定な点も多い。",
    content: `
      <p>前回の記事「WebMCP × Cloudflare」は解説動画をもとにした調査メモでした。今回はその内容を<strong>Cloudflare公式ブログとW3C仕様書で裏取り</strong>し、何が事実で何が未確定かを整理します(2026年8月15日調査)。</p>

      <h2>結論サマリー</h2>
      <table>
        <tr><th>動画の主張</th><th>検証結果</th></tr>
        <tr><td>スイッチONだけでMCP対応</td><td><strong>ほぼ事実</strong>。ダッシュボードのトグルで有効化、デプロイ不要(公式ブログに明記)</td></tr>
        <tr><td>コード変更なし</td><td><strong>条件付きで事実</strong>。Cloudflareがエッジでスクリプトを自動注入する。ただし自作機能を公開するには追加の仕組みが必要</td></tr>
        <tr><td>Google・Microsoftが標準化を推進</td><td><strong>事実</strong>。ただし現時点ではW3Cの「正式標準」ではなくドラフト段階</td></tr>
        <tr><td>約8割高速化・精度1〜2割向上</td><td><strong>公式記載を確認できず</strong>。Cloudflare公式ブログにこの数値はない</td></tr>
        <tr><td>Claude Desktopのコネクターに登録して使う</td><td><strong>公式記事には記載なし</strong>。公式が説明するのはブラウザ経由の利用。別方式(Workersのリモート MCP)なら従来から可能</td></tr>
        <tr><td>料金</td><td><strong>記載なし</strong>。開発者プレビューであり料金体系は不明</td></tr>
      </table>

      <h2>WebMCPという「標準」の現在地</h2>
      <ul>
        <li>WebMCPは、Webサイトが構造化されたツールをAIエージェントに公開するためのブラウザAPI(<code>navigator.modelContext</code>)の提案仕様</li>
        <li>仕様の編集者はGoogle(Chrome)とMicrosoft(Edge)のメンバー。W3CのWeb Machine Learningコミュニティグループの<strong>ドラフトレポート</strong>であり、W3C正式標準でも標準化トラックでもない(2026年前半時点)</li>
        <li>実装は<strong>Chrome 146 Canaryの早期プレビュー</strong>(2026年2月)が最初。Firefox・Safari・Edgeは議論に参加しているが未実装</li>
      </ul>
      <p>つまり「今後の本命」ではあるものの、<strong>現時点で一般ユーザーのブラウザで広く動く技術ではまだない</strong>、というのが正確なところです。</p>

      <h2>Cloudflare側の実装(公式ブログより)</h2>
      <p>Cloudflareは2026年8月6日にWebMCPサポートを<strong>開発者プレビュー</strong>として公開しました。仕組みは2段構えです。</p>
      <ol>
        <li><strong>エッジでの注入</strong>:HTMLRewriterで各HTMLレスポンスに1行、ブリッジスクリプトへの参照を自動追加(same originから配信)</li>
        <li><strong>ブリッジ</strong>:ページ内でWebMCP対応を検出し、対応ブラウザなら <code>registerTool</code> でツールを登録。非対応ブラウザでは何もしない(=サイトの動作は変わらない)</li>
      </ol>
      <p>有効化は「Agent Readiness」設定からトグルON、追加するTool Packを選ぶだけ。確認は次のコマンドでできます。</p>
      <pre><code>curl -s https://あなたのサイト | grep webmcp</code></pre>
      <p>プレビュー版のTool Packは2種類:</p>
      <ul>
        <li><strong>Content Credentials Pack</strong>:画像のC2PA(来歴)情報をスキャン・検査するツール</li>
        <li><strong>Site MCP Server Pack</strong>:サイト独自のMCPサーバーと通信する動的パック</li>
      </ul>
      <p>重要な点として、プレビューでは<strong>ツールはすべて訪問者のブラウザ内で実行</strong>されます(Cloudflareサーバーとの往復なし)。AIエージェント側からは、エージェント用ブラウザ(公式例ではBrowserRun)でサイトを開いてツールを呼び出す形になります。</p>

      <h2>「Skill配信」の応用はWebMCPとは別の話</h2>
      <p>前回紹介した「SkillをCloudflareに置いて全PCへ配信する」使い方は、正確には<strong>Cloudflare Workers上のリモートMCPサーバー</strong>(こちらは2025年から確立済みの仕組み)で実現するものです。リモートMCPサーバーならURLをClaude Desktopのカスタムコネクターに登録して使えるので、動画のデモ後半はこちらの仕組みと理解するのが正確です。「WebMCP=サイトの画面内ツール化(ブラウザ経由)」「リモートMCP=機能のAPI公開(直接接続)」と区別しておくと混乱しません。</p>

      <h2>Agent Readinessスコアについて</h2>
      <p>Cloudflareはサイトの「AIエージェント対応度」を発見可能性・コンテンツアクセス性・ボットアクセス制御・機能の4軸で採点する<strong>Agent Readinessスコア</strong>も公開しており、isitagentready.com で自サイトをスキャンできます。WebMCPはこの「機能」カテゴリのチェック項目の1つです。</p>

      <h2>まとめ:今どう向き合うか</h2>
      <ul>
        <li>方向性は本物(Google・Microsoft・Cloudflareが揃って推進)だが、<strong>標準・実装・料金すべてが流動的なプレビュー段階</strong></li>
        <li>「サイトをAI対応にする」実験は、Cloudflare配下のサイトならトグル1つで低リスクに試せる</li>
        <li>いま実務で確実に使えるのは、Workersの<strong>リモートMCPサーバー</strong>によるツール/Skill公開の方</li>
      </ul>
      <p>出典:Cloudflare公式ブログ「WebMCP: making the web agent-ready」「Introducing the Agent Readiness score」、W3C Web Machine Learning CGのWebMCPドラフト仕様、ブラウザ対応状況の各種調査記事(2026年8月時点)。</p>
    `,
  },
  {
    id: "20260815-02",
    title: "WebMCP × Cloudflare ― WebサイトをAIが直接操作できるようにする",
    category: "coding",
    date: "2026-08-15",
    summary:
      "AIが画面を見てクリックする代わりに、サイト側がAI用の機能(ツール)を直接提供するWebMCPという考え方と、Cloudflareを「AI向け機能の公開基盤」として使う構成を調査メモとして整理。",
    content: `
      <p><strong>WebMCPは、WebサイトがAIエージェント向けに「操作可能な機能(ツール)」を直接提供するための仕組みです。</strong>この記事は、解説動画を視聴して得た知識をもとに、概念と構成を自分なりに整理した調査メモです(動画の内容そのものの転載ではありません。未検証の点は末尾に明記)。</p>

      <h2>背景:AIによるWeb操作は「画面越し」だと非効率</h2>
      <p>AIエージェントにWebサイトを操作させる従来の方法は、スクリーンショットやHTMLを読み、人間のようにボタンを探してクリックするというものでした。この方式は動作が遅く、誤操作が起きやすく、画面を読むたびに大量のトークンを消費するためコストも高くつきます。</p>
      <p>WebMCPの発想はこれを逆転させます。サイト側があらかじめ「検索」「カート追加」「在庫確認」といった機能をAI向けのツール一覧として公開しておき、AIは画面を介さずに必要な機能を直接呼び出します。</p>
      <table>
        <tr><th>方式</th><th>AIの動き</th></tr>
        <tr><td>画面操作型</td><td>画面を読む → 操作対象を推測 → クリック → 結果をまた画面から読む</td></tr>
        <tr><td>WebMCP型</td><td>ツール一覧を取得 → 必要な機能を直接実行</td></tr>
      </table>
      <p>ECサイトなら、商品検索・商品詳細取得・在庫確認のような読み取り系と、カート追加・注文のような書き込み系の機能をAPIのように公開するイメージです。AIはHTMLを解析する代わりに <code>search_products</code> や <code>add_to_cart</code> といった機能名で直接操作します。</p>

      <h2>CloudflareをAI向けの公開基盤にする</h2>
      <p>この仕組みを個人でも試しやすくしているのがCloudflareです。CloudflareはDNS・ドメイン・サイト公開(Workers)を担うWebインフラですが、管理画面にWebMCP(ベータ)の設定が追加されており、大まかに次の3ステップでサイトをMCP対応にできるとされています。</p>
      <ol>
        <li>サイトをCloudflare配下に置く(他社サーバーの場合はDNSをCloudflare経由にする方法が考えられる)</li>
        <li>WebMCPの設定を有効にする</li>
        <li>AIに公開する機能(ツール)の範囲を設定する</li>
      </ol>
      <p>できあがったMCPのURLをClaude Desktopの「設定 → コネクター → カスタムコネクター追加」に登録すれば、自然文の指示でAIがそのサイトの機能を直接使えるようになります。Claude CodeからCloudflare Workersへデプロイする運用と組み合わせれば、「作る→公開→AIから使う」までを一気通貫にできます。</p>
      <pre><code>Claude Code(開発)
  → Cloudflare Workers(公開)
  → WebMCP(AI向けツール化)
  → MCP URL
  → Claude Desktop / 各種AIエージェント(利用)</code></pre>

      <h2>応用:Skillの「配布」を「配信」に変える</h2>
      <p>個人的に最も重要だと感じたのは、この仕組みを<strong>Claude CodeのSkill共有</strong>に応用する考え方です。</p>
      <p>SkillはふつうSKILL.mdやスクリプト一式を各PCにコピーして使うため、配布後に作成者が更新しても、利用者側には反映されません。SkillをCloudflare上に置きMCP経由で使う形にすれば、サーバー側を1回更新するだけで全員が次回から最新版を使えます。さらに、接続にURL+認証キーを使えば、<strong>Skillの中身(ファイル)を渡さずに機能だけを使ってもらう</strong>提供形態も可能になります。</p>
      <p>組織なら、見積書・報告書・記録・教育資料といった定型業務のSkillを1か所で管理して全員に配信する使い方が考えられます。個人でも、複数PCのClaude CodeやClaude Desktopから同じSkill群を使う「自分専用のAI機能サーバー」として応用できそうです(複数PCでSkillを共通化したい、という当サイトの課題とも相性が良い)。</p>

      <h2>注意点:未検証の情報を含む</h2>
      <p>本記事は動画視聴に基づく整理であり、一次情報での裏取りをまだしていません。特に、性能向上の程度、設定だけでコード変更なしに対応できる範囲、標準化の動向、Cloudflare WebMCPベータ版の正式仕様・制限・料金などは、Cloudflare公式ドキュメントでの確認が必要です。→ 公式情報での裏取り結果を<a href="#/article/20260815-03">検証編</a>にまとめました。</p>
    `,
  },
  {
    id: "20260815-01",
    title: "Claude Codeとは何か ― AIエージェント型コーディングツール入門",
    category: "claude",
    date: "2026-08-15",
    summary:
      "Anthropic製のエージェント型コーディングツールClaude Codeを調査。使える形態、主な機能、料金プラン、類似ツールとの違い、初心者の始め方まで。",
    content: `
      <p><strong>Claude Codeは、Anthropicが開発したAIエージェント型コーディングツールです。</strong>チャットでコードの断片をもらうのではなく、AIが自分でコードベースを読み、ファイルを編集し、コマンドを実行し、テストを回して結果から学ぶ――という一連の作業を任せられるのが特徴です。2025年2月に研究プレビュー、同年5月に一般提供が始まり、いまではプログラマー以外の利用者も増えています。</p>

      <h2>どこで使えるか</h2>
      <ul>
        <li><strong>CLI(ターミナル)</strong>:公式の中心的な形態。macOS / Linux / WSL / Windows対応</li>
        <li><strong>デスクトップアプリ</strong>:複数セッションの同時表示やスケジュール機能つき(Mac / Windows)</li>
        <li><strong>IDE拡張</strong>:VS Code、JetBrains(IntelliJ・PyCharmなど)</li>
        <li><strong>Web版・モバイル</strong>:ブラウザやClaudeアプリ(iOS/Android)からクラウド実行</li>
        <li><strong>Chrome拡張</strong>:ブラウザ操作と組み合わせて利用</li>
      </ul>

      <h2>インストール</h2>
      <p>Windowsなら PowerShell で次の1行です。</p>
      <pre><code>irm https://claude.ai/install.ps1 | iex</code></pre>
      <p>macOS / Linux / WSL の場合:</p>
      <pre><code>curl -fsSL https://claude.ai/install.sh | bash</code></pre>
      <p>あとはプロジェクトのフォルダで <code>claude</code> と打てば起動し、初回はブラウザでログインします。</p>

      <h2>主な機能</h2>
      <table>
        <tr><th>機能</th><th>説明</th></tr>
        <tr><td>エージェントループ</td><td>指示→ツール選択→実行→結果から学習→繰り返し。複数ファイル変更・テスト・デバッグを自律的に進める</td></tr>
        <tr><td>CLAUDE.md</td><td>プロジェクトの規約・構成・注意点を書いておくと、セッションをまたいで記憶される「プロジェクトメモ」</td></tr>
        <tr><td>Skills(スキル)</td><td>再利用できる手順書。チームで共有でき、スラッシュコマンドとして呼び出せる</td></tr>
        <tr><td>Hooks(フック)</td><td>ファイル編集後に自動フォーマット、完了時に通知など、決まったタイミングで自動実行</td></tr>
        <tr><td>MCP対応</td><td>Slack・Jira・Google Driveや自作ツールなど外部サービスを接続する共通規格</td></tr>
        <tr><td>サブエージェント</td><td>複数のAIを並行実行してタスクを分担。「作る役」と「検証する役」を分けられる</td></tr>
        <tr><td>プランモード</td><td>実行前に計画をレビューして承認する安全運転モード</td></tr>
        <tr><td>ループ系機能</td><td><code>/goal</code>(目標達成まで自律実行)、<code>/loop</code>(定期実行)、Routines(クラウド定期実行)。ループエンジニアリングの土台</td></tr>
        <tr><td>Git連携</td><td>コミットメッセージ生成、ブランチ作成、Pull Request作成まで自動化</td></tr>
      </table>
      <p>ループ系機能の考え方は、当サイトの「ループエンジニアリング完全ガイド」も参照してください。</p>

      <h2>料金(2026年8月時点)</h2>
      <ul>
        <li><strong>Pro($20/月)</strong>:Claude Codeが使える最小プラン。Claudeチャットと利用枠を共有</li>
        <li><strong>Max($100/月・$200/月)</strong>:Proの5倍/20倍の利用枠。長時間の開発向け</li>
        <li><strong>API従量課金</strong>:サブスクリプションなしでAPIキーでも利用可能</li>
        <li>無料プランでは利用不可。上限到達後に追加課金できるオプションもあり</li>
      </ul>

      <h2>対応モデル</h2>
      <p>Claude 5ファミリー(最上位の<strong>Fable 5</strong>、<strong>Opus</strong>、バランス型の<strong>Sonnet 5</strong>)と高速・低価格の<strong>Haiku 4.5</strong>を切り替えて使えます。目安は「複雑な設計・デバッグ=Fable/Opus、日常の開発=Sonnet、軽い処理=Haiku」。検証だけ上位モデルに任せる、といった使い分けもできます。</p>

      <h2>類似ツールとの違い</h2>
      <ul>
        <li><strong>GitHub Copilot($10/月)</strong>:エディタ内の補完が中心で、対応IDEの広さと安さが強み</li>
        <li><strong>Cursor($20/月)</strong>:AI統合の専用IDE。IDE内での操作性が洗練されている</li>
        <li><strong>Claude Code</strong>:自律的なマルチファイル編集と自動化(ループ・スケジュール実行)が最大の強み。コーディングベンチマークSWE-benchで業界最高クラスのスコアが報告されている(二次情報)</li>
      </ul>
      <p>実務では「重い作業や自動化はClaude Code、書きながらの補完はCopilot/Cursor」という併用が主流になりつつあります。</p>

      <h2>初心者が最初にやること</h2>
      <ol>
        <li>インストールして、プロジェクトフォルダで <code>claude</code> を起動</li>
        <li>「このファイルの機能を説明して」など<strong>読むだけのタスク</strong>から試す</li>
        <li>プロジェクト直下に <code>CLAUDE.md</code> を作り、規約や構成を書いておく</li>
        <li>権限モード(都度確認/プランモード/自動承認)の違いを理解する</li>
        <li>慣れたらHooksで自動フォーマット、<code>/goal</code>で自律実行を試す</li>
      </ol>

      <h2>注意点</h2>
      <p>料金・モデル・機能はいずれも変化が速い分野です(この記事は2026年8月時点の調査)。ベンチマークスコアや他ツール比較は二次情報を含むため、導入前に<a href="https://code.claude.com/docs/en/">公式ドキュメント</a>で最新情報を確認してください。</p>
    `,
  },
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
