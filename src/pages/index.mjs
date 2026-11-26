// Page registry: route key (see lib/routes.mjs) → (lang) => html
import { home } from "./home.mjs";
import { about } from "./about.mjs";
import { products } from "./products.mjs";
import { raw } from "./raw-materials.mjs";
import { mfg } from "./manufacturing.mjs";
import { quality } from "./quality.mjs";
import { intl } from "./international-markets.mjs";
import { contact } from "./contact.mjs";
import { privacy } from "./privacy.mjs";
import { credits } from "./credits.mjs";

export const pages = { home, about, products, raw, mfg, quality, intl, contact, privacy, credits };
export { productPage } from "./product.mjs";
export { notFound } from "./not-found.mjs";
