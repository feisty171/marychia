// The full treatment menu as page images (public/menu/pages/page-01.webp …),
// made from public/menu/full-spa-menu.pdf by `sh scripts/menu-images.sh`.
// Used by the pop-up viewer (src/components/MenuViewer.astro) and the /menu/ page.
import fs from "node:fs";
import path from "node:path";

export const MENU_PAGE_W = 1240; // A4 portrait at 150 dpi
export const MENU_PAGE_H = 1754;

export function menuPages(): string[] {
  const dir = path.join(process.cwd(), "public", "menu", "pages");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /^page-\d+\.webp$/.test(f))
    .sort()
    .map((f) => `/menu/pages/${f}`);
}
