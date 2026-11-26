// Filesystem locations used by the build (all absolute).
import path from "node:path"; import url from "node:url";

export const SRC = path.join(path.dirname(url.fileURLToPath(import.meta.url)), "..");   // src
export const ROOT = path.join(SRC, "..");                                                 // project root
export const DIST = path.join(ROOT, "dist");                                              // dist (build output)
export const PUBLIC = path.join(ROOT, "public");                                          // static files copied as-is into dist (incl. generated img/)
export const ASSETS = path.join(SRC, "assets");                                           // src/assets
