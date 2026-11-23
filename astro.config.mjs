// Astro config. Builds a fully static site into dist/ — upload that folder to the web host.
import { defineConfig } from "astro/config";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

// Preview address on GitHub Pages: https://feisty171.github.io/marychia/
// The repo is called "marychia", so GitHub serves the site from the /marychia/ folder.
// At launch on www.marychia.com: set SITE to "https://www.marychia.com", BASE to "",
// and change "url" in src/data/site.json to match.
const SITE = "https://feisty171.github.io";
const BASE = "/marychia";

// Only the finished build lives under BASE. `npm run dev` stays at http://localhost:8091/.
const isBuild = process.argv.includes("build") || process.argv.includes("preview");

/**
 * Pages, data files and scripts write links from the site root ("/images/…", "/about/").
 * After the build, this adds BASE in front of every such link in dist/ (HTML, CSS, JS, JSON),
 * so nobody has to remember the folder name when editing content.
 */
const BUILD_ID = Date.now().toString(36);

function addBaseToLinks() {
  return {
    name: "add-base-to-links",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        if (!BASE) return;
        const root = fileURLToPath(dir);
        const b = BASE.slice(1);
        // Top-level names in dist/ (about, images, css, …) are the only root links we rewrite.
        const tops = (await readdir(root)).filter((n) => n !== b && n !== "index.html");
        const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const seg = tops.map(esc).join("|");
        // Also matches after an HTML-encoded quote (&#34; or &quot;), as in style="--x:url(&#34;/images/…&#34;)".
        const rootLink = new RegExp(`(^|["'\`(=,\\s]|&#34;|&quot;|&#39;)/(${seg})(?=[/"'\`?#)\\s,&]|$)`, "gm");
        const homeLink = /(href=|"url":\s*)"\/"/g;
        // Any other root link in an HTML attribute, e.g. href="/#shop" or a page not built yet.
        const attrLink = new RegExp(`((?:href|src|action|poster)=["'])/(?!/|${esc(b)}(?:/|["'#?]))`, "g");
        const absolute = new RegExp(`${esc(SITE)}/(?!${esc(b)}(/|$|["'#?]))`, "g");
        const absoluteBare = new RegExp(`${esc(SITE)}(?=["'#?])`, "g");

        const walk = async (d) => {
          for (const e of await readdir(d, { withFileTypes: true })) {
            const p = join(d, e.name);
            if (e.isDirectory()) await walk(p);
            else if (/\.(html|css|js|json|xml|webmanifest)$/.test(e.name)) {
              const before = await readFile(p, "utf8");
              const after = before
                .replace(absolute, `${SITE}${BASE}/`)
                .replace(absoluteBare, `${SITE}${BASE}`)
                .replace(rootLink, `$1${BASE}/$2`)
                .replace(homeLink, `$1"${BASE}/"`)
                .replace(attrLink, `$1${BASE}/`)
                // Cache-busting: stamp our own stylesheets and scripts with this build's number, so
                // browsers fetch the new versions right after an update instead of a 10-minute-old copy.
                .replace(/((?:href|src)=")([^"?#]*\/(?:css|js)\/[^"?#]+\.(?:css|js))"/g, `$1$2?v=${BUILD_ID}"`);
              if (after !== before) await writeFile(p, after);
            }
          }
        };
        await walk(root);
      },
    },
  };
}

export default defineConfig({
  site: SITE,
  base: isBuild && BASE ? BASE : undefined,
  server: { port: 8091 },
  integrations: [addBaseToLinks()],
});
