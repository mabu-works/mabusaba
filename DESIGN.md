# 設計書

まぶ鯖公式サイトの設計と、作り直し（2026-11-28）における同等性棚卸し・判断記録。

## 構成

- Next.js 15（App Router）+ React 19 + TypeScript で構築し、`output: "export"` で静的サイトとして書き出して Vercel へ配信する。
- ページはトップページ1枚と 404 のみ。外部リンクと短縮リンクの URL は `lib/site.mjs` に集約し、ページ側はそこだけを参照する。
- 短縮リンクの実転送は `vercel.json` の `redirects` が担う（静的書き出しでは Next.js の `redirects()` が使えないため）。`lib/site.mjs` の正本リストと一致していることをテストで担保する。
- テーマ（ダーク / ライト）は `data-theme` 属性 + CSS 変数で切り替える。初期値は描画前の初期化スクリプトが localStorage（キー `mabusaba-theme`）から決め、保存が無ければダーク。解釈規則は `lib/theme.mjs` の純粋関数に切り出し、初期化スクリプト文字列も同モジュールが生成する。

## 同等性棚卸し（旧実装 → 新実装）

### 維持したもの

| 対象 | 内容 |
|---|---|
| トップページ | ヒーロー（タグライン・リード文・バッジ4件・ヒーロー画像） |
| セクション | できること（カード7件、うち横長1件）/ 公式メディア（Discord・X はリンク、note は「開設準備中」で非リンク）/ 専用Bot「mabubot」（カード6件）/ 安心の取り組み（カード3件＋OKリスト3件）/ 他サーバー連携（文章＋連絡先リスト＋画像）/ FAQ（4件）/ 参加パネル（招待リンクコピー付き）/ フッター |
| ヘッダー | ロゴ、アンカーナビ5件、テーマ切り替え、参加ボタン。760px 以下でナビを隠す |
| 404 ページ | 文案・導線（トップへ戻る / Discord に参加する）、noindex |
| メタデータ | タイトル・説明文・OG（画像はヒーロー画像）・Twitter カード・theme-color `#0d1026`・canonical・JSON-LD（Organization、sameAs に X / note / Discord） |
| フォント | Google Fonts の Zen Maru Gothic / Zen Kaku Gothic New |
| テーマ | ダーク既定、ライト切り替え、localStorage 保存（キー `mabusaba-theme`）、初期化スクリプトによるちらつき防止 |
| ふるまい | スクロール連動の出現アニメーション（`.reveal`、IntersectionObserver、しきい値 0.12）、招待リンクコピー（Clipboard API＋フォールバック、フィードバックは 3.2 秒で消去）、フッターの年表示、`prefers-reduced-motion` 対応 |
| 短縮リンク | `/discord` → Discord 招待、`/x` → 公式 X、`/note` → 公式 note（いずれも 301、vercel.json） |
| ヘッダー | 全パスへのセキュリティヘッダー3件（nosniff / Referrer-Policy / X-Frame-Options SAMEORIGIN）、`/assets/*` と `/favicon.svg` への1週間キャッシュ（vercel.json） |
| 静的ファイル | robots.txt（sitemap 参照付き）、sitemap.xml（トップのみ、weekly、priority 1.0） |
| デザイン | 配色・タイポグラフィ・カード配置・ブレークポイント（760px / 480px）など視覚仕様一式 |

### 意図的に変えたもの

| 対象 | 変更と理由 |
|---|---|
| URL の管理 | ページ内に散らばっていた URL を `lib/site.mjs` に集約。二重管理をやめ、短縮リンクはテストで vercel.json と突き合わせる |
| テーマロジック | 初期化スクリプトと切り替え規則を `lib/theme.mjs` の純粋関数として切り出し、テスト対象にした（挙動は同一） |
| カード描画 | セクションごとの直書き JSX を、データ配列＋共通コンポーネント（`CardList`）に整理（表示は同一） |
| アイコン | ページ内定義だった SVG を `components/icons.tsx` に分離（表示は同一） |
| テスト | 旧実装には無かった単体テストを追加（短縮リンク・ヘッダー設定・テーマ規則、計13件、node:test） |
| CI | 手動実行（workflow_dispatch）を追加し、ビルド前にテストを実行する構成にした |
| バージョン | v1.0.0 にリセット（作り直しに伴う全リポジトリ共通の方針） |

### 引き継いだアセット

バイナリ・画像は再生成できないため、そのまま引き継いだ（コードファイルの引き継ぎはなし）。

| ファイル | MD5 |
|---|---|
| public/assets/images/hero-night.webp | e47c0a620848f1499bcfb3195d045a32 |
| public/assets/images/collab-bridge.webp | ff818578f82ab51a00e38b4c5553995c |
| public/favicon.svg | 700667bafdc783a5236397da6ccdca65 |

### 旧実装になく、追加しなかったもの

- PWA（manifest / Service Worker）: 旧実装にも存在しないため追加しない。
- アクセス解析・広告などの外部スクリプト: 旧実装にも存在しないため追加しない。

## 判断記録

1. **静的書き出しを維持する**（2026-11-28）: 旧実装と同じく `output: "export"` とし、配信は Vercel の静的ホスティングに任せる。サーバー機能は不要なサイトであり、構成を変える理由がない。
2. **短縮リンクは vercel.json で定義する**（2026-11-28）: 静的書き出しでは Next.js の `redirects()` が機能しないため、旧実装と同じ方式を採る。代わりに `lib/site.mjs` の正本リストとの一致をテストで担保し、片方だけ変える事故を防ぐ。
3. **純粋ロジックは `.mjs` に切り出す**（2026-11-28）: テーマ規則などテストしたいロジックを `lib/*.mjs` に置き、追加依存なしで `node --test` から直接読めるようにした。テストランナーの導入はしない。
4. **postcss の overrides を引き継ぐ**（2026-11-28）: 旧実装のセキュリティ対応（postcss の脆弱性への overrides 指定）を維持する。静的サイトの実行時には含まれないが、ビルド環境の安全性のため残す。
5. **アセットは引き継ぎ、コードは全て新規に書く**（2026-11-28）: イラスト2点とファビコンは再生成できないバイナリのため引き継ぎ、DESIGN に MD5 を記録した。それ以外のファイルは旧実装を参照しつつ全て新規に記述した。
6. **開発手順を統一した**（2026-11-28）: aegis-bot で確立した手順（Issue → ブランチ → PR → CI → Rebase and merge、Conventional Commits＋英語件名）を採用する。CONTRIBUTING.md とテンプレート一式を配置した。
7. **デプロイは CLI のみ**（2026-11-20 の決定を継続）: GitHub 連携は解除済みで、`vercel deploy --prod` で配信する。push ではデプロイされない。
