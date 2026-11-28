// Static site generator — `npm run build` (node scripts/build.mjs) → dist/{en,ar}/…
import fs from "node:fs"; import path from "node:path";
import { DIST, ASSETS, PUBLIC } from "../src/lib/paths.mjs";
import { JS, JS_URL } from "../src/lib/bundle.mjs";
import { PRODUCTS } from "../src/content/content.mjs";
import { R } from "../src/lib/routes.mjs";
import { pages, productPage, notFound } from "../src/pages/index.mjs";

// ---------- write ----------
// Arabic percentages, Arabic convention with Western digits: every "60%" in visible text (and in the JSON the page
// scripts read) becomes RLI 60 RLM ٪ PDI — the Arabic percent sign (U+066A) on the Arabic side of the number («٪60»),
// identical wherever it appears (و62٪، line ends, «مسحوق سمك 65٪»). Logical order stays "60 ٪" for screen readers.
// A lone "%" (the small sign after big figures, e.g. 65<small>%</small>) becomes RLM ٪. CSS, other scripts, attributes untouched.
const PCT = /(\d+(?:[.,]\d+)?)\s?%/g;
const isolatePct = (html) => html.replace(/(<style[\s\S]*?<\/style>)|(<script(?![^>]*application\/json)[\s\S]*?<\/script>)|(<[^>]+>)|([^<]+)/g,
  (m, style, script, tag, text) => (text ? (text === "%" ? "‏٪" : text.replace(PCT, "⁧$1‏٪⁩")) : m));
function write(rel, html) { const f = path.join(DIST, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); if (/^ar[\\/]/.test(rel) && /\.html$/.test(rel)) html = isolatePct(html); fs.writeFileSync(f, html); }
function copy(src, dst) { fs.mkdirSync(path.dirname(dst), { recursive: true }); fs.copyFileSync(src, dst); }
const keys = ["home", "about", "products", "raw", "mfg", "quality", "intl", "contact", "privacy", "credits"];
let n = 0;
for (const lang of ["en", "ar"]) {
  for (const k of keys) { write(path.join(lang, R[k], "index.html"), pages[k](lang)); n++; }
  for (const p of PRODUCTS) { write(path.join(lang, "products", p.slug, "index.html"), productPage(p)(lang)); n++; }
}
write("index.html", `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Alkhaleej Fish Manufacturing</title><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0; url=/en/"><link rel="canonical" href="/en/"><script>location.replace((navigator.language||"").startsWith("ar")?"/ar/":"/en/")</script></head><body><a href="/en/">English</a> · <a href="/ar/">العربية</a></body></html>`);
write("404.html", notFound());
write("robots.txt", "User-agent: *\nAllow: /\n");
for (const f of fs.existsSync(path.join(DIST, "assets")) ? fs.readdirSync(path.join(DIST, "assets")) : []) if (/^main(\.[0-9a-f]+)?\.js$/.test(f)) fs.rmSync(path.join(DIST, "assets", f));
write(JS_URL.slice(1), JS);
for (const f of ["montserrat-latin.woff2", "cairo-arabic.woff2"]) copy(path.join(ASSETS, "fonts", f), path.join(DIST, "assets", "fonts", f));
for (const f of fs.readdirSync(path.join(ASSETS, "scene"))) copy(path.join(ASSETS, "scene", f), path.join(DIST, "assets", "scene", f));
for (const f of fs.readdirSync(path.join(ASSETS, "spec"))) copy(path.join(ASSETS, "spec", f), path.join(DIST, "assets", "spec", f));
for (const f of ["logo-primary.png", "logo-reversed.png", "icon-orange.png", "pattern.webp"]) copy(path.join(ASSETS, "brand", f), path.join(DIST, "assets", "brand", f));
fs.cpSync(PUBLIC, DIST, { recursive: true });   // public/ (generated responsive images) → dist/
console.log(`built ${n} pages + index, 404 → ${DIST}`);
