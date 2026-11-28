

// ---------- routes ----------
export const R = { home: "", about: "about/", products: "products/", raw: "raw-materials/", mfg: "manufacturing/", quality: "quality/", intl: "international-markets/", contact: "contact/", privacy: "privacy/", credits: "credits/" };
export const href = (lang, key) => `/${lang}/${R[key] ?? key}`;
export const prodHref = (lang, p) => `/${lang}/products/#${p.slug}`;   // detail pages removed: every product link opens it on the shelf
export const quoteHref = (lang, p) => `/${lang}/contact/?product=${encodeURIComponent(p.name.en)}#inquiry`;
