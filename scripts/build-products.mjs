// Builds src/data/products.json (the Shop page list) from the KrisShop product sheet.
//   npm run build:products -- "path/to/product-sheet.xlsx"
// Reads the "Material Creation Form (MCF)" tab. Only customer-facing columns are copied
// (brand, name, size, type, price, description, how to use, ingredients). Cost, margin,
// vendor and other internal columns are never read, so the sheet itself stays out of git.
// Photos: set "image" in src/data/products.json by hand; rerunning keeps it (matched by id).
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { readXlsx } from "./read-xlsx.mjs";

const src = process.argv[2];
if (!src || !existsSync(src)) {
  console.error('Give the product sheet: npm run build:products -- "path/to/sheet.xlsx"');
  process.exit(1);
}
const OUT = new URL("../src/data/products.json", import.meta.url);
const rows = readXlsx(src)["Material Creation Form (MCF)"];
if (!rows) { console.error('No "Material Creation Form (MCF)" tab in that file.'); process.exit(1); }

const clean = (s) => String(s ?? "").replace(/\s+/g, " ").trim();
const hi = rows.findIndex((r) => r.some((c) => /^Short Product Description/i.test(clean(c))));
if (hi < 0) { console.error("Couldn't find the header row (Short Product Description)."); process.exit(1); }
const head = rows[hi].map(clean);
const col = (re) => {
  const i = head.findIndex((h) => re.test(h));
  if (i < 0) throw new Error("Missing column: " + re);
  return i;
};
const C = {
  sn: 0,
  brand: col(/^Brand$/i),
  full: col(/No Character Limit/i),
  short60: col(/limited to 60/i),
  desc: col(/^Short Product Description/i),
  usage: col(/^Usage$/i),
  ingredients: col(/^Ingredients$/i),
  type: col(/^Item Sub Category/i),
  price: col(/^KRISSHOP RSP/i),
};

const old = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : { products: [] };
const oldById = Object.fromEntries((old.products || []).map((p) => [p.id, p]));
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const products = [];
for (const r of rows.slice(hi + 1)) {
  const brand = clean(r[C.brand]), name = clean(r[C.full]);
  if (!brand || !name || r[C.sn] === 0) continue;          // SN 0 = the sheet's example row
  const short = clean(r[C.short60]);
  // size = what the 60-character name adds after the full name, e.g. "30ml", "25gm * 5pcs"
  const size = short.toLowerCase().startsWith(name.toLowerCase()) ? short.slice(name.length).trim().replace(/\s*\*\s*/g, " × ") : "";
  const id = slug(name);
  const price = typeof r[C.price] === "number" ? Math.round(r[C.price]) : null;
  products.push({
    id,
    brand,
    name,
    size,
    type: clean(r[C.type]),
    price,
    description: clean(r[C.desc]),
    usage: clean(r[C.usage]),
    ingredients: clean(r[C.ingredients]),
    image: oldById[id]?.image || "",
  });
}
if (!products.length) { console.error("No products found under the header row."); process.exit(1); }

writeFileSync(OUT, JSON.stringify({ _note: "Made by scripts/build-products.mjs from the product sheet. Edit the sheet and rerun; only 'image' is kept from this file.", products }, null, 2) + "\n");
console.log(`Wrote ${products.length} products to src/data/products.json`);
