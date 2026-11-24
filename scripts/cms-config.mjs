/**
 * Writes .pages.yml, the settings for Pages CMS (https://app.pagescms.org): the phone- and
 * computer-friendly screen the team uses to add Gallery / Results before-and-after photos.
 *
 * The Treatment drop-down lists every treatment in src/data/treatment-menu.json, so this runs
 * automatically at the end of `npm run build:treatments`. To run it on its own:
 *   node scripts/cms-config.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const menu = JSON.parse(readFileSync(join(root, "src/data/treatment-menu.json"), "utf8"));
const names = [...new Set(menu.treatments.map((t) => t.name))].sort((a, b) => a.localeCompare(b));
const q = (s) => JSON.stringify(s); // a quoted YAML string

const yml = `# Pages CMS settings (https://app.pagescms.org). Lets the team add Gallery / Results
# before-and-after photos from a phone or computer, without touching code.
# MADE BY scripts/cms-config.mjs: don't edit by hand. The Treatment list refreshes
# every time \`npm run build:treatments\` runs.

media:
  input: src/assets/results
  output: src/assets/results
  extensions: [jpg, jpeg, png, webp]

content:
  - name: results
    label: Gallery results
    type: collection
    path: src/data/results
    format: json
    filename: "{year}-{month}-{day}-{primary}.json"
    view:
      primary: treatment
      sort: date
      order: desc
    fields:
      - name: treatment
        label: Treatment
        type: select
        required: true
        options:
          values:
${names.map((n) => `            - ${q(n)}`).join("\n")}
      - name: date
        label: Date added
        description: Newest results show first.
        type: date
        required: true
        options:
          format: yyyy-MM-dd
      - name: note
        label: Note
        description: "One short, factual line, e.g. After 6 sessions over 8 weeks. No kg or cm lost, no 'permanent', no medical claims, no 'guaranteed'."
        type: string
      - name: before
        label: Before photo
        description: Portrait works best. Same framing and lighting as the after photo. Not retouched.
        type: image
        options:
          rename: random
      - name: after
        label: After photo
        type: image
        options:
          rename: random
      - name: image
        label: Combined photo (optional)
        description: Only if you have ONE picture showing both, instead of separate before and after photos. Landscape works best.
        type: image
        options:
          rename: random
      - name: alt
        label: Photo description (optional)
        description: For screen readers, e.g. Client's jawline before and after. Leave empty to use "Client before and after" plus the treatment name.
        type: string
      - name: consent
        label: Client has signed written consent
        description: Turn on ONLY once marketing has the client's signed consent form. While it's off, the photos stay hidden on the website.
        type: boolean
        default: false
`;

writeFileSync(join(root, ".pages.yml"), yml);
console.log(`Wrote .pages.yml (Pages CMS) with ${names.length} treatments in the drop-down.`);
