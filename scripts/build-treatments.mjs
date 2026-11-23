// Turns the treatment menu workbook into src/data/treatment-menu.json, which the
// Treatments, Rituals and Gallery pages read.
//
//   npm run build:treatments                      (reads data/treatment-menu.xlsx)
//   npm run build:treatments -- path/to/file.xlsx (reads another copy)
//
// Rules (from the workbook's "How to use" tab and the website brief):
// - Rows with "Show on website" = No are skipped. "Internal note" columns are never read.
// - Concern labels become concern ids via the Concerns tab. Concern 1 sets the Area.
// - Tagline empty → the "For you if…" line of Concern 1.
// - Description empty → "Helps with …" built from the treatment's concerns.
// - "From" price: Price text if filled, else the first-trial price, else the lowest
//   Session Options price, else the usual price.
// - Image: the "Image file" column, else the photo listed for that treatment name under
//   "photos" in src/data/treatments.json, else "" (the page shows its placeholder).
// - Any row missing a name, Concern 1, collection, or both a price and a price text stops
//   the build and lists the problem rows. Nothing is written until every row is fine.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";
import { readXlsx } from "./read-xlsx.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const input = process.argv[2] || join(root, "data/treatment-menu.xlsx");
const output = join(root, "src/data/treatment-menu.json");
const settings = JSON.parse(readFileSync(join(root, "src/data/treatments.json"), "utf8"));

if (!existsSync(input)) {
  console.error(`Can't find the workbook at ${input}\nPut it at data/treatment-menu.xlsx, or pass its path: npm run build:treatments -- path/to/file.xlsx`);
  process.exit(1);
}

const book = readXlsx(input);
const problems = [];

// Read a tab as objects keyed by header. Headers are matched by how they start, so
// small wording changes like "Usual price (SGD)" → "Usual price" keep working.
function tab(name) {
  const rows = book[name];
  if (!rows) { problems.push(`The workbook has no "${name}" tab.`); return { rows: [] }; }
  const head = rows[0].map((h) => String(h).trim());
  const col = (start) => head.findIndex((h) => h.toLowerCase().startsWith(start.toLowerCase()));
  const out = rows.slice(1).map((r, i) => ({ row: i + 2, cells: r }))
    .filter(({ cells }) => cells.some((c) => String(c).trim() !== ""));
  return { rows: out, col, get: (r, start) => { const i = col(start); return i < 0 ? "" : r.cells[i] ?? ""; } };
}
const text = (v) => String(v ?? "").trim();
const num = (v) => { const s = text(v).replace(/[$,\s]|S\$/g, ""); return s === "" || isNaN(+s) ? null : +s; };

// ---------- Concerns ----------
const C = tab("Concerns");
const concerns = C.rows.map((r) => ({
  id: text(C.get(r, "Concern ID")),
  label: text(C.get(r, "Concern label")),
  area: text(C.get(r, "Area")),
  forYou: text(C.get(r, "For you if")),
  search: text(C.get(r, "Search words")),
  orderAll: num(C.get(r, 'Order in "All"')),
  orderArea: num(C.get(r, "Order in its area")),
}));
const concernByLabel = new Map(concerns.map((c) => [c.label.toLowerCase(), c]));

// ---------- Collections ----------
const K = tab("Collections");
const collections = K.rows.map((r) => text(K.get(r, "Collection label"))).filter(Boolean);

// ---------- Session options ----------
const S = tab("Session Options");
const sessions = new Map();
for (const r of S.rows) {
  const id = text(S.get(r, "Treatment ID"));
  const minutes = num(S.get(r, "Duration"));
  const price = num(S.get(r, "Price"));
  if (!id || price == null) { problems.push(`Session Options row ${r.row}: needs a Treatment ID and a price.`); continue; }
  if (!sessions.has(id)) sessions.set(id, []);
  sessions.get(id).push({ minutes, price });
}

// ---------- Treatments ----------
const T = tab("Treatments");
const photos = Object.fromEntries(Object.entries(settings.photos || {}).filter(([k]) => !k.startsWith("_")).map(([k, v]) => [k.toLowerCase(), v]));
const seen = new Set();
const treatments = [];
const lower = (s) => s.charAt(0).toLowerCase() + s.slice(1);
const listWords = (a) => (a.length < 2 ? a.join("") : a.slice(0, -1).join(", ") + " and " + a.at(-1));

for (const r of T.rows) {
  const g = (h) => T.get(r, h);
  const show = text(g("Show on website")).toLowerCase();
  if (show === "no" || show === "n") continue;

  const id = text(g("ID"));
  const name = text(g("Treatment name"));
  const label = name || id || "(no name)";
  const missing = [];
  if (!name) missing.push("name");

  const concernLabels = ["Concern 1", "Concern 2", "Concern 3"].map((h) => text(g(h)));
  if (!concernLabels[0]) missing.push("Concern 1");
  const ids = [];
  concernLabels.forEach((l, i) => {
    if (!l) return;
    const c = concernByLabel.get(l.toLowerCase());
    if (!c) problems.push(`Treatments row ${r.row} (${label}): Concern ${i + 1} "${l}" isn't in the Concerns tab.`);
    else if (!ids.includes(c.id)) ids.push(c.id);
  });

  const collection = text(g("Collection"));
  if (!collection) missing.push("collection");
  else if (collections.length && !collections.includes(collection)) problems.push(`Treatments row ${r.row} (${label}): collection "${collection}" isn't in the Collections tab.`);

  const usual = num(g("Usual price"));
  const priceText = text(g("Price text"));
  if (usual == null && !priceText) missing.push("a price or a price text");

  if (!id) missing.push("ID");
  else if (seen.has(id)) problems.push(`Treatments row ${r.row} (${label}): the ID "${id}" is used twice.`);
  seen.add(id);

  if (missing.length) { problems.push(`Treatments row ${r.row} (${label}): missing ${listWords(missing)}.`); continue; }

  const c1 = concernByLabel.get(concernLabels[0].toLowerCase());
  if (!c1) continue; // already reported
  const trialPrice = num(g("First trial price"));
  const opts = sessions.get(id) || [];
  const duration = num(g("Duration"));
  const minutes = opts.length ? [...new Set(opts.map((o) => o.minutes).filter((m) => m != null))] : duration != null ? [duration] : [];
  const from = priceText ? null : trialPrice != null ? trialPrice : opts.length ? Math.min(...opts.map((o) => o.price)) : usual;

  // "Helps with …" when the Description is empty ("Just a good facial" isn't something a treatment helps with)
  const helps = ids.filter((x) => x !== "facial").map((x) => lower(concerns.find((c) => c.id === x).label));

  treatments.push({
    id,
    name,
    category: c1.area,
    tag: text(g("Badge")),
    collection,
    for: text(g("Tagline")) || c1.forYou,
    description: text(g("Description")) || (helps.length ? `Helps with ${listWords(helps)}.` : ""),
    image: text(g("Image file")) || photos[name.toLowerCase()] || "",
    concerns: ids,
    from,
    priceText,
    trialPrice,
    minutes,
  });
}
for (const id of sessions.keys()) if (!seen.has(id)) problems.push(`Session Options: "${id}" doesn't match any treatment ID.`);

if (problems.length) {
  const where = relative(root, input).startsWith("..") ? input : relative(root, input);
  console.error(`Stopped: ${problems.length} problem${problems.length === 1 ? "" : "s"} in ${where}. Nothing was changed.\n`);
  problems.forEach((p) => console.error("  • " + p));
  process.exit(1);
}

const out = {
  _note: "Made by `npm run build:treatments` from data/treatment-menu.xlsx. Don't edit this file by hand: change the workbook and run the command again.",
  concerns: concerns.map(({ forYou, ...c }) => c),
  collections,
  treatments,
};
writeFileSync(output, JSON.stringify(out, null, 2) + "\n");

const count = (a) => treatments.filter((t) => t.category === a).length;
console.log(`Wrote ${relative(root, output)}: ${treatments.length} treatments (Face ${count("Face")}, Body ${count("Body")}, Wellness ${count("Wellness")}).`);
const withPhoto = treatments.filter((t) => t.image).map((t) => t.name);
console.log(`Photos: ${withPhoto.length ? withPhoto.join(", ") : "none"}. The rest show the placeholder.`);
