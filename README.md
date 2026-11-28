# まぶ鯖 公式サイト

Discordコミュニティ「まぶ鯖」の公式サイトです。Next.js で構築し、Vercel で公開します。

| 項目 | 内容 |
|---|---|
| バージョン | v1.0.0 |
| 状態 | 公開中 |
| 稼働先 | https://mabusaba.vercel.app/ |
| 実装 | Next.js 15（React 19、TypeScript、静的書き出し） |
| 更新履歴 | [CHANGELOG.md](CHANGELOG.md) |

## 📖 概要

セクション: ヒーロー / できること / 公式メディア（Discord・X・note）/ mabubot紹介 / 安心の取り組み / 他サーバー連携 / FAQ / 参加

## 📝 使い方

### 公開（Vercel）

- プロジェクト: Vercel（個人アカウント i-mabu、Hobby プラン）の `mabusaba`
- 本番 URL: [mabusaba.vercel.app](https://mabusaba.vercel.app/)
- デプロイは CLI のみです（2026-11-20 の決定で、全プロジェクトで GitHub 連携を解除済み）

#### 通常の更新

リポジトリのルートで `vercel deploy --prod` を実行してデプロイします。`main` への push では自動デプロイされません。

独自ドメインは当面使いません。将来使う場合は、Vercel プロジェクトの **Domains** から追加し、`lib/site.mjs` の `SITE_URL` と `public/sitemap.xml`、`public/robots.txt` の URL もドメイン側へ差し替えてください。

### ローカル確認

```bash
npm install
npm run dev
# http://localhost:3000 を開く
```

### テスト

```bash
npm test        # 短縮リンク設定とテーマロジックの単体テスト
npm run build   # 本番ビルド（out/ へ静的書き出し）
```

## 📁 ファイル構成

```
app/layout.tsx            メタデータ / フォント / 共通レイアウト
app/page.tsx              トップページ（全セクション）
app/not-found.tsx         404ページ
app/globals.css           スタイル（ダーク / ライトの2テーマ）
components/ClientParts.tsx  招待リンクコピー / スクロール表示 / テーマ切替 / 年表示
components/icons.tsx      SVGアイコン（三日月 / Discord）
lib/site.mjs              サイト共通の URL・名称と短縮リンクの正本リスト
lib/theme.mjs             テーマ初期化・切り替えの純粋ロジック
public/assets/images/     ヒーロー・連携セクションのイラスト（WebP）
public/favicon.svg        三日月ファビコン
public/robots.txt / public/sitemap.xml
tests/                    node:test による単体テスト
vercel.json               短縮リンク（/discord /x /note）+ セキュリティヘッダー + キャッシュ
next.config.mjs           静的書き出し（output: "export"）
```

## 🔗 関連

- 公式サイト: [mabusaba.vercel.app](https://mabusaba.vercel.app/)
- Discord招待: [discord.gg/GKkW4wCAVp](https://discord.gg/GKkW4wCAVp)（短縮: [mabusaba.vercel.app/discord](https://mabusaba.vercel.app/discord)）
- 公式X: [@mabu_saba](https://x.com/mabu_saba)（短縮: [mabusaba.vercel.app/x](https://mabusaba.vercel.app/x)）
- 公式note: [note.com/mabu_saba](https://note.com/mabu_saba)（短縮: [mabusaba.vercel.app/note](https://mabusaba.vercel.app/note)、開設後に有効）
