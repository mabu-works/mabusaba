import type { Metadata } from "next";
import { MoonIcon } from "@/components/icons";
import { INVITE_URL } from "@/lib/site.mjs";

export const metadata: Metadata = {
  title: "ページが見つかりません | まぶ鯖",
  robots: { index: false },
};

// 🚫 404 ページ
export default function NotFound() {
  return (
    <main className="wrap notfound">
      <MoonIcon className="notfound-moon" />
      <h1>404 - ページが見つかりません</h1>
      <p style={{ color: "var(--muted)" }}>
        お探しのページは、夜空のどこかへ行ってしまったようです。
      </p>
      <div className="cta-row">
        <a className="btn btn-discord" href="/">
          トップへ戻る
        </a>
        <a
          className="btn btn-ghost"
          href={INVITE_URL}
          target="_blank"
          rel="noopener"
        >
          Discordに参加する
        </a>
      </div>
    </main>
  );
}
