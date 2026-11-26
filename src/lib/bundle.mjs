// CSS + JS bundling: the stylesheets are concatenated in cascade order, minified and inlined into every page;
// the browser script is written once to /assets/main.<hash>.js.
import fs from "node:fs"; import path from "node:path"; import crypto from "node:crypto";
import { SRC } from "./paths.mjs";

// Order matters — later files override earlier ones.
const STYLES = ["styles.css", "cinema.css", "system.css", "signature.css", "hero.css", "refine.css"];

export const CSS = STYLES.map((f) => fs.readFileSync(path.join(SRC, "styles", f), "utf8")).join(" ").replace(/\.\.\/assets\/fonts\//g, "/assets/fonts/")
  .replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s*\n\s*/g, "").replace(/\s*([{};:,>])\s*/g, "$1").replace(/;}/g, "}");
export const JS = fs.readFileSync(path.join(SRC, "scripts", "main.js"), "utf8").replace(/^\s*\/\/.*$/gm, "");
export const JS_URL = `/assets/main.${crypto.createHash("sha1").update(JS).digest("hex").slice(0, 10)}.js`;
