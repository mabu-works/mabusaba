// 🌐 サイト全体で共有する URL と名称の定義
// ページ・コンポーネント・テストはここを参照し、URL の二重管理を避ける。

/** 本番サイトの URL */
export const SITE_URL = "https://mabusaba.vercel.app";

/** コミュニティ名 */
export const SITE_NAME = "まぶ鯖";

/** Discord 招待リンク */
export const INVITE_URL = "https://discord.gg/GKkW4wCAVp";

/** 招待リンクの表示用ラベル（ドメイン＋コード） */
export const INVITE_LABEL = "discord.gg/GKkW4wCAVp";

/** 公式 X アカウントの URL */
export const X_URL = "https://x.com/mabu_saba";

/** 公式 X のハンドル */
export const X_HANDLE = "@mabu_saba";

/** 公式 note の URL（開設準備中だが短縮リンクの飛び先として定義） */
export const NOTE_URL = "https://note.com/mabu_saba";

/**
 * 短縮リンクの一覧。
 * 実際の転送は vercel.json の redirects が担う。ここはテストが
 * vercel.json と突き合わせて不整合を検出するための正本リスト。
 */
export const SHORT_LINKS = [
  { source: "/discord", destination: INVITE_URL, statusCode: 301 },
  { source: "/x", destination: X_URL, statusCode: 301 },
  { source: "/note", destination: NOTE_URL, statusCode: 301 },
];
