"use client";

import { useEffect, useState } from "react";
import { INVITE_LABEL, INVITE_URL } from "@/lib/site.mjs";
import { nextTheme, resolveInitialTheme, THEME_STORAGE_KEY } from "@/lib/theme.mjs";

// ==========================================
// 🔗 招待リンクのコピーボタン
// ==========================================
export function CopyInviteButton() {
  const [feedback, setFeedback] = useState("");

  // フィードバック表示は数秒で自動的に消す
  useEffect(() => {
    if (!feedback) return;
    const timer = window.setTimeout(() => setFeedback(""), 3200);
    return () => window.clearTimeout(timer);
  }, [feedback]);

  async function copyInvite() {
    try {
      await navigator.clipboard.writeText(INVITE_URL);
      setFeedback("招待リンクをコピーしました");
      return;
    } catch {
      // 📋 Clipboard API が使えない環境向けのフォールバックへ進む
    }
    const textarea = document.createElement("textarea");
    textarea.value = INVITE_URL;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      setFeedback("招待リンクをコピーしました");
    } catch {
      setFeedback(
        "コピーできませんでした。リンクを長押し／右クリックでコピーしてください",
      );
    }
    document.body.removeChild(textarea);
  }

  return (
    <>
      <div className="invite-box">
        <span className="invite-url">{INVITE_LABEL}</span>
        <button className="btn btn-copy" type="button" onClick={copyInvite}>
          招待リンクをコピー
        </button>
      </div>
      <p className="copy-feedback" role="status" aria-live="polite">
        {feedback}
      </p>
    </>
  );
}

// ==========================================
// ✨ スクロールでセクションをふわりと表示
// ==========================================
export function ScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll(".reveal");
    // IntersectionObserver が無い環境では全て表示済みにする
    if (!("IntersectionObserver" in window) || targets.length === 0) {
      targets.forEach((el) => el.classList.add("in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}

// ==========================================
// 🎨 テーマ切り替え（ダーク / ライト）
// ==========================================
export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // 初期化スクリプトが決めた現在のテーマをボタン表示へ反映する
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(resolveInitialTheme(current));
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const next = nextTheme(root.getAttribute("data-theme"));
    root.setAttribute("data-theme", next);
    setTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // 💾 保存に失敗しても、今回の切り替え自体は有効
    }
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="テーマ切り替え"
    >
      {theme === "light" ? "☀️" : "🌙"}
    </button>
  );
}

// ==========================================
// 📅 フッターの年表示
// ==========================================
export function CurrentYear() {
  const [year, setYear] = useState(2026);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return <span>{year}</span>;
}
