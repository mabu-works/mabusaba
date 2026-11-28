import assert from "node:assert/strict";
import test from "node:test";
import vm from "node:vm";
import {
  buildThemeInitScript,
  nextTheme,
  resolveInitialTheme,
  THEME_STORAGE_KEY,
} from "../lib/theme.mjs";
import { INVITE_LABEL, INVITE_URL, SHORT_LINKS } from "../lib/site.mjs";

test("resolveInitialTheme keeps a valid saved theme", () => {
  assert.equal(resolveInitialTheme("light"), "light");
  assert.equal(resolveInitialTheme("dark"), "dark");
});

test("resolveInitialTheme falls back to dark", () => {
  assert.equal(resolveInitialTheme(null), "dark");
  assert.equal(resolveInitialTheme(undefined), "dark");
  assert.equal(resolveInitialTheme(""), "dark");
  assert.equal(resolveInitialTheme("solarized"), "dark");
});

test("nextTheme toggles between dark and light", () => {
  assert.equal(nextTheme("dark"), "light");
  assert.equal(nextTheme("light"), "dark");
  assert.equal(nextTheme(null), "light");
});

// 初期化スクリプトを疑似 DOM で実行し、resolveInitialTheme と同じ結果になるか確認する
function runInitScript(saved, { throws = false } = {}) {
  const attrs = {};
  const sandbox = {
    localStorage: {
      getItem(key) {
        if (throws) throw new Error("storage unavailable");
        return key === THEME_STORAGE_KEY ? saved : null;
      },
    },
    document: {
      documentElement: {
        setAttribute(name, value) {
          attrs[name] = value;
        },
      },
    },
  };
  vm.runInNewContext(buildThemeInitScript(), sandbox);
  return attrs["data-theme"];
}

test("the init script applies the same rule as resolveInitialTheme", () => {
  for (const saved of ["light", "dark", null, "solarized"]) {
    assert.equal(runInitScript(saved), resolveInitialTheme(saved));
  }
});

test("the init script falls back to dark when storage throws", () => {
  assert.equal(runInitScript("light", { throws: true }), "dark");
});

test("the init script reads the shared storage key", () => {
  assert.ok(buildThemeInitScript().includes(THEME_STORAGE_KEY));
});

test("the invite label is the invite URL without the scheme", () => {
  assert.equal(INVITE_URL, `https://${INVITE_LABEL}`);
});

test("short links point at the community accounts", () => {
  const bySource = Object.fromEntries(
    SHORT_LINKS.map((link) => [link.source, link.destination]),
  );
  assert.equal(bySource["/discord"], INVITE_URL);
  assert.equal(bySource["/x"], "https://x.com/mabu_saba");
  assert.equal(bySource["/note"], "https://note.com/mabu_saba");
});
