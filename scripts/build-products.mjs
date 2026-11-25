// Builds src/data/products.json (the Shop page list) from the KrisShop product sheet.
//   npm run build:products -- "path/to/product-sheet.xlsx"
// Reads the "Material Creation Form (MCF)" tab. Only customer-facing columns are copied
// (brand, name, size, type, price, short and long description, how to use, ingredients, country
// of manufacture, product size and weight, barcode). Cost, margin, vendor, order and shipping
// columns are never read, so the sheet itself stays out of git.
// Photos and the card's short title / line: set "image", "cardTitle" and "cardLine" in
// src/data/products.json by hand; rerunning keeps them (matched by id).
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { readXlsx } from "./read-xlsx.mjs";

const src = process.argv[2];
if (!src || !existsSync(src)) {
  console.error('Give the product sheet: npm run build:products -- "path/to/sheet.xlsx"');
  process.exit(1);
}
const OUT = new URL("../src/data/products.json", import.meta.url);
const book = readXlsx(src);
const rows = book["Material Creation Form (MCF)"];
// "SGP" → "Singapore", from the sheet's Country Origin tab
const countries = Object.fromEntries((book["Country Origin"] || []).slice(1).map((r) => [String(r[0]).trim(), String(r[1]).trim()]));
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
  long: col(/^Product Story/i),
  made: col(/^Country of Manufacture/i),
  barcode: col(/^BARCODE$/i),
  weight: col(/^Unit Weight/i),
  length: col(/^Unit Length/i),
  width: col(/^Unit Width/i),
  height: col(/^Unit Height/i),
  usage: col(/^Usage$/i),
  ingredients: col(/^Ingredients$/i),
  type: col(/^Item Sub Category/i),
  price: col(/^KRISSHOP RSP/i),
};

const old = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : { products: [] };
const oldById = Object.fromEntries((old.products || []).map((p) => [p.id, p]));
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// The long description, as blocks: { h } heading, { p } paragraph, { ul: [...] } list.
// Drops the title line (the product name) and the "MADE IN …", "Net weight …" and
// "For all skin type" lines, which show under Product information instead.
const strip = (l) => l.replace(/^[\p{Extended_Pictographic}\uFE0F\s]+/u, "").trim();
const BULLET = /^[•\-–✔✓]\s*/;
function storyBlocks(text) {
  const lines = String(text ?? "").replace(/\r/g, "").split("\n")
    .map((l) => l.trim().replace(/^[✔✓]\uFE0F?\s*/, "• "))   // ticks are list items, not emoji
    .map(strip);
  const out = [];
  let allSkin = false;
  let i = 0;
  while (i < lines.length && !lines[i]) i++;
  if (lines[i] && !/[.!]$/.test(lines[i]) && lines[i].length < 90) i++;   // title line
  for (; i < lines.length; i++) {
    const l = lines[i];
    if (!l) continue;
    if (/^made in /i.test(l) || /^net (weight|volume)/i.test(l)) continue;
    if (/^for all skin types?$/i.test(l)) { allSkin = true; continue; }
    if (BULLET.test(l)) {
      const item = l.replace(BULLET, "").trim();
      const last = out[out.length - 1];
      if (last && last.ul) last.ul.push(item); else out.push({ ul: [item] });
      continue;
    }
    const next = lines[i + 1] || "";
    if (!/[.!]$/.test(l) && l.length < 80 && next) out.push({ h: l.replace(/:$/, "") });
    else out.push({ p: l });
  }
  return { blocks: out, allSkin };
}
const num = (v) => (typeof v === "number" ? v : parseFloat(v)) || null;

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
    story: storyBlocks(r[C.long]).blocks,
    skinType: storyBlocks(r[C.long]).allSkin ? "All skin types" : "",
    madeIn: countries[clean(r[C.made])] || clean(r[C.made]),
    dimensions: [r[C.length], r[C.width], r[C.height]].every(num) ? [r[C.length], r[C.width], r[C.height]].map(num).join(" × ") + " cm" : "",
    weight: num(r[C.weight]) ? Math.round(num(r[C.weight]) * 1000) + " g" : "",
    barcode: clean(r[C.barcode]),
    image: oldById[id]?.image || "",
    // the Shop card's short title and line under it (set by hand; kept when rerunning)
    ...(oldById[id]?.cardTitle ? { cardTitle: oldById[id].cardTitle } : {}),
    ...(oldById[id]?.cardLine ? { cardLine: oldById[id].cardLine } : {}),
  });
}
if (!products.length) { console.error("No products found under the header row."); process.exit(1); }

writeFileSync(OUT, JSON.stringify({ _note: "Made by scripts/build-products.mjs from the product sheet. Edit the sheet and rerun; only 'image', 'cardTitle' and 'cardLine' are kept from this file.", products }, null, 2) + "\n");
console.log(`Wrote ${products.length} products to src/data/products.json`);
