

// ---------- html helpers ----------
export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export const L = (o, lang) => (o && typeof o === "object" && "en" in o ? o[lang] : o);
export const arr = '<i class="ic ic-arr" aria-hidden="true"></i>';
export const lines = (txt, tag = "span") => txt.split("\n").map((l) => `<span class="ln"><${tag}>${l}</${tag}></span>`).join(" ");
