/** @type {import('next').NextConfig} */
const nextConfig = {
  // 📦 Vercel へ静的サイトとして配信するため、静的書き出しを使う
  output: "export",
  images: {
    // 静的書き出しでは画像最適化 API が使えないので無効化する
    unoptimized: true,
  },
};

export default nextConfig;
