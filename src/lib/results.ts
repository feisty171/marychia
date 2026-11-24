/**
 * Gallery results: reads each result (one JSON file per result in src/data/results/, usually
 * added through Pages CMS, see .pages.yml), matches it to its treatment and gets its photos ready.
 * Used by the Gallery / Results page and the Home "Real results" row. Newest `date` first.
 *
 * Treatment: write the name as it appears on the Treatments page (e.g. "JUVE Face Lift Therapy")
 *   or its ID from the menu workbook (e.g. "juve-face-lift"). Capitals and spacing don't matter.
 *
 * Photos: in src/assets/results/. A result can give just the file name ("juve-jan-before.jpg") or
 *   the path Pages CMS writes ("src/assets/results/juve-jan-before.jpg"); both work. Straight from the phone or camera is fine: any size of
 *   JPG, PNG or WebP. The build makes a light, web-sized WebP copy (800 px wide for a before/after
 *   photo, 1600 px for one combined picture), so nobody has to resize or convert anything.
 *   A full path like "/images/results/x.webp" (a file in public/) is still used as it is.
 *
 * A typo in a treatment name or file name stops the build with a message that says what's wrong,
 * so a broken card never goes live. (`npm run dev` shows the same message on the page.)
 */
import { getImage } from "astro:assets";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { treatmentData } from "./treatmentData";

const FOLDER = "src/assets/results";

export type RawResult = {
  treatment: string;
  date?: string;
  note?: string;
  before?: string;
  after?: string;
  image?: string;
  alt?: string;
  consent?: boolean;
};

// Every result file in src/data/results/, newest first.
const resultFiles = import.meta.glob<{ default: RawResult }>("/src/data/results/*.json", { eager: true });

export function loadResults(): RawResult[] {
  return Object.entries(resultFiles)
    .map(([path, mod]) => {
      const r: any = { ...mod.default, file: path.split("/").pop() };
      // Pages CMS may save an empty field as null: treat it as not given.
      for (const k of Object.keys(r)) if (r[k] === null) delete r[k];
      return r as RawResult & { file: string };
    })
    .sort((a, b) => String(b.date ?? "").localeCompare(String(a.date ?? "")) || b.file.localeCompare(a.file));
}

// Every photo in src/assets/results/, found by file name (with or without the extension).
const files = import.meta.glob<{ default: any }>(
  "/src/assets/results/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true },
);
const byName = new Map<string, any>();
const byStem = new Map<string, any>();
for (const [path, mod] of Object.entries(files)) {
  const file = path.split("/").pop()!.toLowerCase();
  byName.set(file, mod.default);
  byStem.set(file.replace(/\.[^.]+$/, ""), mod.default);
}

const folderFiles = () => {
  try {
    return readdirSync(join(process.cwd(), FOLDER)).filter((n) => !n.startsWith("."));
  } catch {
    return [];
  }
};

// Treatments, found by ID or by name.
const simple = (s: string) => (s || "").toLowerCase().normalize("NFKD").replace(/[^a-z0-9]/g, "");
const treatments = treatmentData.treatments as any[];
const byKey = new Map<string, any>();
for (const t of treatments) {
  byKey.set(simple(t.id), t);
  byKey.set(simple(t.name), t);
}

function findTreatment(value: string) {
  const t = byKey.get(simple(value));
  if (t) return t;
  const words = (value || "").toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2);
  const close = treatments
    .filter((x) => words.some((w) => x.name.toLowerCase().includes(w)))
    .map((x) => `"${x.name}"`)
    .slice(0, 8);
  throw new Error(
    `Gallery results (src/data/results/): there's no treatment called "${value}". ` +
      (close.length
        ? `Did you mean ${close.join(", ")}?`
        : "Write the name exactly as it appears on the Treatments page."),
  );
}

async function photo(fileName: string | undefined, width: number): Promise<string> {
  let v = String(fileName || "").trim();
  if (!v) return "";
  const inFolder = v.match(/(?:^|\/)assets\/results\/(.+)$/); // path written by Pages CMS
  if (inFolder) v = inFolder[1];
  if (v.startsWith("/") || /^https?:\/\//.test(v)) return v; // older entries: a file in public/
  const meta = byName.get(v.toLowerCase()) ?? (!/\.[a-z0-9]+$/i.test(v) ? byStem.get(v.toLowerCase()) : undefined);
  if (!meta) {
    const here = folderFiles();
    const hint = /\.(heic|heif)$/i.test(v)
      ? " iPhone HEIC photos can't be shown on websites: export or save it as a JPG first."
      : here.length
        ? ` The photos in that folder are: ${here.join(", ")}.`
        : " That folder is empty.";
    throw new Error(`Gallery results (src/data/results/): can't find the photo "${v}" in ${FOLDER}/.${hint}`);
  }
  const img = await getImage({ src: meta, width: Math.min(width, meta.width), format: "webp" });
  return img.src;
}

export async function resolveResults(raw: RawResult[] = []) {
  return Promise.all(
    raw.map(async (r) => {
      const t = findTreatment(r.treatment);
      const category: string = t.category ?? "Face";
      // One combined picture when `image` is given instead of before/after.
      const single = r.image
        ? !r.before && !r.after
        : r.image !== undefined && r.before === undefined && r.after === undefined;
      // Photos are used only once marketing has the client's signed consent.
      const show = r.consent === true;
      return {
        ...r,
        id: t.id as string,
        name: t.name as string,
        category,
        alt: r.alt?.trim() || `Client before and after ${t.name}`,
        single,
        beforeSrc: show && !single ? await photo(r.before, 800) : "",
        afterSrc: show && !single ? await photo(r.after, 800) : "",
        imageSrc: show && single ? await photo(r.image, 1600) : "",
        // Photos were added but consent isn't confirmed yet: the placeholder says so.
        awaiting: !show && !!(r.before || r.after || r.image),
      };
    }),
  );
}
