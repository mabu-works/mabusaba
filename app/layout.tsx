import type { Metadata } from "next";
import type { ReactNode } from "react";
import { INVITE_URL, NOTE_URL, SITE_NAME, SITE_URL, X_HANDLE, X_URL } from "@/lib/site.mjs";
import { buildThemeInitScript } from "@/lib/theme.mjs";
import "./globals.css";

// 📝 検索結果や SNS 共有で使われる説明文
const DESCRIPTION =
  "まぶ鯖は、自分のペースで楽しめる公開Discordコミュニティです。雑談・ゲーム・音楽・画像動画・スレッド自由。ROM専・覗くだけ・初見さん大歓迎。公式X @mabu_saba で発信中、公式noteは開設準備中です。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "まぶ鯖 | ゆるく集まれる公開Discordコミュニティ",
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "まぶ鯖 | ゆるく集まれる公開Discordコミュニティ",
    description:
      "「なんか暇だな…」と思ったそこのあなたへ。自分のペースで楽しめる公開Discordコミュニティです。",
    url: "/",
    images: ["/assets/images/hero-night.webp"],
  },
  twitter: {
    card: "summary_large_image",
    site: X_HANDLE,
  },
  icons: {
    icon: "/favicon.svg",
  },
  other: {
    "theme-color": "#0d1026",
  },
};

// 🔎 検索エンジン向けの構造化データ（Organization）
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  sameAs: [X_URL, NOTE_URL, INVITE_URL],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* 🎨 描画前にテーマを確定させ、ちらつきを防ぐ */}
        <script
          dangerouslySetInnerHTML={{ __html: buildThemeInitScript() }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@500;700;900&family=Zen+Kaku+Gothic+New:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
