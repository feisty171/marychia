// Minimal .xlsx reader with no dependencies: unzips the workbook with Node's zlib and
// reads each sheet's cells. Returns { "Sheet name": [ [row1 cells…], [row2 cells…] ] }.
// Used by scripts/build-treatments.mjs.
import { readFileSync } from "node:fs";
import { inflateRawSync } from "node:zlib";

function unzip(buf) {
  // Find the "end of central directory" record, then walk the central directory.
  let eocd = buf.length - 22;
  while (eocd >= 0 && buf.readUInt32LE(eocd) !== 0x06054b50) eocd--;
  if (eocd < 0) throw new Error("Not a valid .xlsx (zip) file");
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  const files = {};
  for (let i = 0; i < count; i++) {
    const method = buf.readUInt16LE(p + 10);
    const size = buf.readUInt32LE(p + 20);
    const nameLen = buf.readUInt16LE(p + 28);
    const extraLen = buf.readUInt16LE(p + 30);
    const commentLen = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const name = buf.toString("utf8", p + 46, p + 46 + nameLen);
    const lNameLen = buf.readUInt16LE(local + 26);
    const lExtraLen = buf.readUInt16LE(local + 28);
    const start = local + 30 + lNameLen + lExtraLen;
    const raw = buf.subarray(start, start + size);
    files[name.replace(/^\//, "")] = method === 8 ? inflateRawSync(raw) : raw;
    p += 46 + nameLen + extraLen + commentLen;
  }
  return files;
}

const decode = (s) =>
  s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, "&");

// All the text inside <t> tags (handles rich text runs).
const textOf = (xml) => [...xml.matchAll(/<t(?:\s[^>]*)?>([\s\S]*?)<\/t>/g)].map((m) => decode(m[1])).join("");

const colIndex = (ref) => {
  const letters = ref.match(/^[A-Z]+/)[0];
  let n = 0;
  for (const c of letters) n = n * 26 + (c.charCodeAt(0) - 64);
  return n - 1;
};

export function readXlsx(path) {
  const files = unzip(readFileSync(path));
  const str = (name) => (files[name] ? files[name].toString("utf8") : "");

  const shared = [...str("xl/sharedStrings.xml").matchAll(/<si>([\s\S]*?)<\/si>/g)].map((m) => textOf(m[1]));

  const rels = {};
  for (const m of str("xl/_rels/workbook.xml.rels").matchAll(/<Relationship\b[^>]*>/g)) {
    const id = m[0].match(/Id="([^"]+)"/)[1];
    const target = m[0].match(/Target="([^"]+)"/)[1];
    rels[id] = target.startsWith("/") ? target.slice(1) : "xl/" + target;
  }

  const sheets = {};
  for (const m of str("xl/workbook.xml").matchAll(/<sheet\b[^>]*>/g)) {
    const name = decode(m[0].match(/name="([^"]*)"/)[1]);
    const rid = m[0].match(/r:id="([^"]+)"/)[1];
    const xml = str(rels[rid]);
    const rows = [];
    for (const r of xml.matchAll(/<row\b[^>]*?(?:\/>|>([\s\S]*?)<\/row>)/g)) {
      const rowNum = +r[0].match(/\br="(\d+)"/)[1];
      const cells = [];
      for (const c of (r[1] || "").matchAll(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
        const attrs = c[1];
        const body = c[2] || "";
        const ref = attrs.match(/\br="([A-Z]+\d+)"/)[1];
        const type = (attrs.match(/\bt="([^"]+)"/) || [])[1];
        const v = (body.match(/<v>([\s\S]*?)<\/v>/) || [])[1];
        let val = "";
        if (type === "s") val = shared[+v] ?? "";
        else if (type === "inlineStr") val = textOf(body);
        else if (type === "str" || type === "e") val = v != null ? decode(v) : "";
        else if (type === "b") val = v === "1";
        else if (v != null) val = Number(v);
        cells[colIndex(ref)] = val;
      }
      rows[rowNum - 1] = Array.from(cells, (x) => (x === undefined ? "" : x));
    }
    sheets[name] = Array.from(rows, (x) => x || []);
  }
  return sheets;
}
