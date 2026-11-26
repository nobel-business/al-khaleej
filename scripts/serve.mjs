// Local preview server for dist/ — gzip, cache headers, clean URLs, 404 page.
// Usage: npm run serve [-- port]   (node scripts/serve.mjs [port], default 8080)
import http from "node:http"; import fs from "node:fs"; import path from "node:path"; import zlib from "node:zlib"; import url from "node:url";
const ROOT = path.join(path.dirname(url.fileURLToPath(import.meta.url)), "..", "dist");
const PORT = +process.argv[2] || 8080;
const T = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".txt": "text/plain", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif", ".woff2": "font/woff2" };
http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let f = path.join(ROOT, p); if (!f.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) { if (!p.endsWith("/")) { res.writeHead(301, { Location: p + "/" }); return res.end(); } f = path.join(f, "index.html"); }
  let code = 200; if (!fs.existsSync(f)) { f = path.join(ROOT, "404.html"); code = 404; }
  let buf = fs.readFileSync(f); const ext = path.extname(f), type = T[ext] || "application/octet-stream";
  const h = { "Content-Type": type, "Cache-Control": /\.[0-9a-f]{10}\.js$/.test(f) || /[\\/](img|fonts)[\\/]/.test(f) ? "public, max-age=31536000, immutable" : "no-cache", "X-Content-Type-Options": "nosniff" };
  if (/text|json|svg/.test(type) && /gzip/.test(req.headers["accept-encoding"] || "")) { h["Content-Encoding"] = "gzip"; buf = zlib.gzipSync(buf, { level: 9 }); }
  res.writeHead(code, h); res.end(buf);
}).listen(PORT, "127.0.0.1", () => console.log(`Alkhaleej preview → http://127.0.0.1:${PORT}/en/`));
