// 🎨 テーマ（ダーク / ライト）に関する純粋ロジック
// 初期化スクリプトと切り替えボタンの両方が、この規則に従う。

/** テーマを保存する localStorage のキー */
export const THEME_STORAGE_KEY = "mabusaba-theme";

/** 保存値が無い・不正な場合のデフォルトテーマ */
export const DEFAULT_THEME = "dark";

/**
 * 保存済みの値から初期テーマを決める。
 * "light" / "dark" のどちらでもなければデフォルト（dark）を返す。
 *
 * @param {string | null | undefined} saved localStorage の保存値
 * @returns {"dark" | "light"}
 */
export function resolveInitialTheme(saved) {
  return saved === "light" || saved === "dark" ? saved : DEFAULT_THEME;
}

/**
 * 現在のテーマから切り替え先のテーマを返す。
 *
 * @param {string | null | undefined} current 現在の data-theme 属性値
 * @returns {"dark" | "light"}
 */
export function nextTheme(current) {
  return current === "light" ? "dark" : "light";
}

/**
 * ハイドレーション前にテーマを確定させる初期化スクリプト文字列を返す。
 * 保存値の解釈は resolveInitialTheme と同じ規則。
 *
 * @returns {string} そのまま <script> に埋め込める JavaScript
 */
export function buildThemeInitScript() {
  return (
    "(function(){try{" +
    `var saved=localStorage.getItem("${THEME_STORAGE_KEY}");` +
    'var theme=(saved==="light"||saved==="dark")?saved:"dark";' +
    'document.documentElement.setAttribute("data-theme",theme);' +
    '}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();'
  );
}
