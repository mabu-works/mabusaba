import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { SHORT_LINKS } from "../lib/site.mjs";

// vercel.json の読み込み（テスト対象は本番の転送・ヘッダー設定そのもの）
const vercelJson = JSON.parse(
  await readFile(new URL("../vercel.json", import.meta.url), "utf8"),
);

test("short links in vercel.json match the canonical list", () => {
  const actual = vercelJson.redirects.map(({ source, destination, statusCode }) => ({
    source,
    destination,
    statusCode,
  }));
  assert.deepEqual(actual, SHORT_LINKS);
});

test("every short link is a permanent HTTPS redirect", () => {
  for (const redirect of vercelJson.redirects) {
    assert.equal(redirect.statusCode, 301);
    assert.ok(
      redirect.destination.startsWith("https://"),
      `${redirect.source} must redirect to an HTTPS URL`,
    );
  }
});

test("short link sources are unique", () => {
  const sources = vercelJson.redirects.map((r) => r.source);
  assert.equal(new Set(sources).size, sources.length);
});

test("security headers are applied to all paths", () => {
  const rule = vercelJson.headers.find((h) => h.source === "/(.*)");
  assert.ok(rule, "a catch-all header rule must exist");
  const byKey = Object.fromEntries(rule.headers.map((h) => [h.key, h.value]));
  assert.equal(byKey["X-Content-Type-Options"], "nosniff");
  assert.equal(byKey["Referrer-Policy"], "strict-origin-when-cross-origin");
  assert.equal(byKey["X-Frame-Options"], "SAMEORIGIN");
});

test("static assets get a one-week cache header", () => {
  for (const source of ["/assets/(.*)", "/favicon.svg"]) {
    const rule = vercelJson.headers.find((h) => h.source === source);
    assert.ok(rule, `a cache rule for ${source} must exist`);
    const cache = rule.headers.find((h) => h.key === "Cache-Control");
    assert.equal(cache?.value, "public, max-age=604800");
  }
});
