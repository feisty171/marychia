# Mary Chia website — editing guide

Static site built with [Astro](https://astro.build). No CMS, no database. The marketing team edits it mostly by asking Claude for changes, so **keep words in content/data files and design in templates/CSS**. A copy change should touch only a content or data file.

## Commands (run inside `marychia-site/`)

- `npm install` — first time only
- `npm run dev` — local preview at http://localhost:8091 (`[[CONFIRM: ...]]` placeholders show highlighted in yellow)
- `npm run build:treatments` — rebuilds the treatment list from `data/treatment-menu.xlsx` (see "Rituals page (treatment list)")
- `npm run build` — builds the finished site into `dist/`. Upload the contents of `dist/` to the web host.
- **Preview site:** the repo is `feisty171/marychia`. Pushing to `main` publishes automatically to https://feisty171.github.io/marychia/ via GitHub Actions (`.github/workflows/deploy.yml`).
  - Because GitHub serves it from the `/marychia/` folder, `astro.config.mjs` sets `BASE = "/marychia"` and, after each build, adds `/marychia` in front of every root link (`/images/…`, `/about/`). **Keep writing links from the root (`/images/…`) in content and data files**; don't add `/marychia` yourself. `npm run dev` stays at the root (http://localhost:8091/). To check the real build, run `npm run build` then `npx astro preview --port 8092` and open http://localhost:8092/marychia/.
  - At launch on `www.marychia.com`: in `astro.config.mjs` set `SITE` to `https://www.marychia.com` and `BASE` to `""`, and change `url` in `src/data/site.json` to `https://www.marychia.com`.

## Where things live

| What | File |
|---|---|
| Home page words and photos (hero eyebrow, headline, paragraph, buttons and its photo; the drifting word ribbon (`ribbon:`); numbers band; signature treatments; ad banner below them (`banner:`, placeholder until an image is set); products below the banner (`products:`, a "shelf" design via `src/components/ProductCard.astro`, styles `.shop-*`; the nav "Shop" link jumps here); experience, reviews, first-visit offer, visit info, final CTA) | `src/content/home.md` |
| About Us page words (heritage opening, timeline milestones + photos, vision & mission, SEO title/description) | `src/content/about.md` |
| Contact Us page words (Our Location, Feedback/Enquiry form topics) | `src/content/contact.md` |
| Career page words (/careers/: intro, roles, how to apply) | `src/content/careers.md` |
| Gallery / Results page (/gallery/: heading, filters, client results with before/after photos, disclaimer, closing button) | `src/content/gallery.md` (photos in `public/images/results/`) |
| Treatments and Rituals: the treatment list, prices, concerns and collections (`data/treatment-menu.xlsx` → `npm run build:treatments` → `src/data/treatment-menu.json`) | see "Rituals page (treatment list)" below |
| Treatments (`/treatments/`: hero + Face/Body/Wellness tiles) and Rituals page settings: hero, tiles, banners, time pills, treatment photos, full-menu PDF settings | `src/data/treatments.json` |
| Full treatment menu PDF, and its page images for the `/menu/` page (remake with `sh scripts/menu-images.sh`) | `public/menu/full-spa-menu.pdf`, `public/menu/pages/` |
| Treatments tiles + Rituals list behaviour (search, filter sidebar / Filters sheet, WhatsApp booking sheet) | `public/js/treatments.js` |
| Investor Relations page words and the annual report list | `src/content/investors.md` |
| Annual report PDFs (and optional cover images in `covers/`) | `public/reports/` |
| Outlets (used by Home "Visit us", the Contact page map + studio cards, WhatsApp booking, the footer on every page, and schema.org data) | `src/data/outlets.json` |
| Site-wide settings: brand name, tagline, booking link, WhatsApp link, enquiry email (Contact page form), share image, footer quick links, social media links | `src/data/site.json` |
| Header / nav, including the Treatments, About Us and Contact Us dropdowns: edit `treatments` and `dropdowns`; the dropdown markup is `src/components/NavDropdown.astro` (each link should appear in only one dropdown) | `src/components/Header.astro` |
| Footer | `src/components/Footer.astro` |
| Shared `<head>`, SEO + Open Graph tags | `src/layouts/Base.astro` |
| Page templates | `src/pages/index.astro` (Home), `src/pages/about.astro`, `src/pages/treatments.astro`, `src/pages/rituals.astro` (treatment list), `src/pages/gallery.astro` (Gallery / Results), `src/pages/menu.astro` (Full menu fallback page), `src/pages/investors.astro`, `src/pages/contact.astro`, `src/pages/careers.astro` |
| Styles | `public/css/style.css` (shared), `public/css/home.css`, `public/css/about.css`, `public/css/treatments.css`, `public/css/gallery.css`, `public/css/menu.css`, `public/css/menu-viewer.css`, `public/css/investors.css`, `public/css/contact.css`, `public/css/careers.css` |
| Gallery / Results filter buttons | `public/js/gallery.js` |
| About page behaviour (scrolling timeline) | `public/js/about.js` |
| Contact page behaviour (studio map highlights, count-up stats, enquiry form) | `public/js/contact.js` |
| Home page motion (hero parallax, scroll reveal, signature list photo) | `public/js/home.js` |
| Link helpers (phone, WhatsApp, placeholder checks) | `src/lib/links.ts` |
| Images | `public/images/` |


## Design system: fonts, colours and sizes

All fonts, colours and type sizes are **tokens** at the top of `public/css/style.css`. Every page stylesheet uses them. Never hard-code a new hex colour, font or pixel font size in page CSS; use a token, or add one to `style.css` if nothing fits.

- **Fonts:** Cormorant Garamond (`--font-serif`) for headings, numbers and prices; Figtree (`--font-sans`) for body text, buttons and labels. No other fonts. Both load once in `src/layouts/Base.astro`.
- **Colours:** `--ink` (headings, text, primary buttons), `--ink-soft` (secondary text), `--ink-faint` (hints, struck-through prices), `--rose` (accent: eyebrows, numbers, prices, icons), `--rose-deep`, `--rose-lt` (accent on dark backgrounds), `--rose-line`, `--line` (hairlines), `--blush` (page background), `--tint` (alternate sections), `--white`, `--dark`.
- **Type scale:**
  - Sans: `--fs-label` 11px · `--fs-caption` 12px · `--fs-ui` 13px · `--fs-small` 14px · `--fs-text` 15px · `--fs-body` 16–19px
  - Serif: `--fs-h5` 18px · `--fs-h4` 22px · `--fs-h3` 28px (card titles) · `--fs-h3-lg` 30–40px · `--fs-h2` 34–56px (section titles) · `--fs-display` 44–76px (page titles) · `--fs-hero` 48–112px (Home hero headline) · `--fs-stat` 36–56px (big numbers)
- **Page width (every page):** `--max` (1680px) in `public/css/style.css` sets the width of the header, every page container (`.a-container`, `.h-container`, `.ir-container`, the Treatments/Rituals `.tp .wrap`, `.mn-wrap`) and the footer, with `--gutter` as the side margin (16px on phones). They all share the same left and right edges. New page sections should use one of these containers, not a fixed `max-width`. Keep reading text narrow inside them (e.g. `.a-head` 640px, `62ch` paragraphs).
- **Conventions:** headings are Cormorant 500 in sentence case (not all caps), with an optional italic rose `<em>`. Small uppercase labels use `--tracking-label`; buttons and nav use `--tracking-ui`. Primary buttons are ink; prices are rose Cormorant.
- **Treatments page:** keeps its own layout from the zip design, but `public/css/treatments.css` now uses only these tokens. The few remaining raw sizes are decorative: the About 40+ ring and the report cover mock-up.

## Brand and compliance rules — follow on every page

- **Tone:** warm, confident, personal, plain English, short sentences. The voice is a trusted, long-time friend in beauty — not a hard sell.
- **Tagline (keep it):** "Embrace beauty and be truly you."
- **No guaranteed results.** Don't state kg or cm lost, "permanent" results, or medical claims. Singapore advertising codes (ASAS, plus HSA rules on health products) restrict these. Write "helps", "designed to", "personalised" — never "guaranteed".
- **No before-and-after images** unless marketing confirms written client consent.
- **Never mention** company finances, share price, listing status or legal matters on customer pages (Home, About, Treatments, Shop, Contact).
  - **Home numbers band exception (approved by the owner):** the key figures under the Home hero (`stats:` in `src/content/home.md`) may show the single factual milestone "2009 – Listed on SGX Catalist". Keep that wording. Don't add share price, financial figures or other listing details there, and don't repeat it elsewhere on customer pages (the About timeline still leaves 2009 out).
  - **Investor Relations exception:** the Investor Relations page (`/investors/`) may hold annual reports and links to official SGX announcements. Keep it factual: no share-price commentary, no promotional claims about financial performance. Only link to it from the footer and the small line on the About page — never from the main nav or customer-facing copy.
- **`[[CONFIRM: ...]]` placeholders** stay visible in the build until management approves the fact. They're highlighted yellow in dev mode only. **Never invent facts to fill them** — ask marketing.

## Common edits

### Change a sentence on About Us
Edit the text inside the quotes in `src/content/about.md`.

### Add, edit or remove an outlet
Edit `src/data/outlets.json`. Each outlet is one `{ ... }` block:

```json
{
  "name": "Goldhill, Novena",
  "address": "183 Thomson Road, Goldhill Centre",
  "postalCode": "307628",
  "hours": "Mon–Sat 11am–9pm, Sun 11am–8pm",
  "phone": "6250 7949",
  "mobile": "8688 6298",
  "whatsapp": "8688 6298",
  "mapsUrl": "https://www.google.com/maps/search/?api=1&query=...",
  "confirmed": true
}
```

- **Add:** copy a block, paste it after the last one, put a comma between blocks, and change the values.
- **Remove:** delete the whole block, plus the comma before it. Never leave a closed outlet in the list.
- Once a real number replaces the `[[CONFIRM...]]` in `whatsapp`, the page links it to WhatsApp automatically.
- The About page, footer and schema.org data all update from this one file.

### Add, edit or remove a milestone (About timeline)
In `src/content/about.md`, under `milestones:`. Each milestone is:

```yaml
  - year: "2010"
    title: "Short chapter title"
    text: "Two or three sentences about what happened."
    image: ""
    imageAlt: "What the photo shows"
```

Keep the 2-space indent and the `- `. Keep them in date order. The sticky year, progress bar and swapping photo update automatically. Never add a milestone about company finances, share price or listing status (the 2009 SGX listing is deliberately left out).

### About Us hero photo and scroll fade
The photo behind "Our Heritage" is `hero: image:` (and `imageAlt:`) in `src/content/about.md`; files go in `public/images/about/` (landscape, at least 1920 wide). It fills the whole opening, with a soft shade on the left behind the text (deeper on phones). As you scroll down, the photo fades into the page while drifting down and zooming slightly, the same way as the Home hero (`.hero::before` in `style.css`), the words fade up and away, and "Our history" fades up as it arrives (`public/js/about.js` sets `--hp` from 0 to 1; styles under "Heritage opening" and "Scroll fade" in `public/css/about.css`). Visitors with "reduce motion" turned on see no movement.

### About Us: transition from "Our history" to "What drives us"
On wide screens, the last milestone (its words, the pinned year column and the circle photo) fades out as you scroll past it ("Last chapter fade" in `public/css/about.css`, `--out` set in `public/js/about.js`; phones skip it because the chapter is taller than the screen). After the last milestone, a rose line draws down to a small dot over the closing line `storyClose` in `src/content/about.md` ("Today, the story continues with you."). "What drives us" (Vision & Mission) then opens on the tint background with a curved top edge. Styles: "Transition" in `public/css/about.css`; the draw-in is in `public/js/about.js`.

### Add a timeline photo
Put the image in `public/images/heritage/` (square works best, at least 700×700), then set that milestone's `image: "/images/heritage/your-file.webp"` and update `imageAlt`. While `image` is empty, a placeholder shows. On desktop the photo shows as a floating circle; on phones as a circle above the text (placeholders keep the arch shape). Photos are square, 900×900, and named by year, e.g. `2001-2004.webp`.

### Studio map position (Contact Us → Our Location)
Each outlet in `src/data/outlets.json` has `mapX` / `mapY`: where its pin sits on the Singapore map (roughly x 60 = far west, 660 = far east; y 130 = north, 290 = south). Adjust when adding a studio.

### Booking link or WhatsApp number (site-wide)
Edit `bookingUrl` or `whatsappUrl` in `src/data/site.json`. For WhatsApp, put the number (e.g. `"8688 6298"`). Set `email` to the enquiry address to switch on the Contact page's "Write to us" form (it opens the visitor's email app with their message filled in).

### Home page signature treatments
In `src/content/home.md`, under `services:` → `items:`. Keep it to 5. Each item has `category`, optional `tag`, `for`, `description`, `options`, `image`; the comments in that file show the format. Prices must match the Y27/28 menu PDF and the menu workbook.

These are an **editorial numbered list** (`src/components/SignatureCard.astro`, styles `.sig-*` in `public/css/home.css`): each row shows the number, category, name, the short `for` line, the price and a "Book now" link. On wide screens a large arched photo beside the list changes to the row you're on or hovering (`public/js/home.js`); on phones and tablets each row shows its own small photo. Below the list, a "View All Treatments →" link goes to the Treatments page (`menuButton` / `menuLink`). The rows show `name`, `category`, `tag`, `for`, `options` (price) and `image`. The price shows as "from S$xx" (the lowest option price) with that option's `compareAt` crossed out. "Book now" opens the WhatsApp studio picker (`src/components/BookingSheet.astro` + `public/js/treatment-cards.js`).

To add a photo: put it in `public/images/treatments/` (square-ish works best for these cards, about 900×900) and set `image: "/images/treatments/your-file.webp"`. Only use photos marketing has the rights to; no before-and-after photos without written client consent.

### Home page design and motion
The Home page is an editorial layout. Words and photos are in `src/content/home.md`; styles in `public/css/home.css`; motion in `public/js/home.js`.
- **Hero:** the photo `hero: image` (a wide 1366×768 picture with a plain, light left side) is always shown whole, never cropped. On screens 1100px and wider the hero takes the photo's exact shape, the words sit on its left side and the menu is transparent on top of it (`clearHeader` on `<Base>` in `src/pages/index.astro`: white words, logo and Book Now with a soft glow behind them and a light shade along the top of the photo; dark words on narrower screens; solid once you scroll. Styles: `.site-header--clear` in `style.css`, `.ed-hero::before` in `home.css`). On narrower screens the photo sits full width under the menu with the words below. The headline's words slide up as the page opens (`*asterisks*` = italic rose); as you scroll, the photo fades and drifts.
- **Ribbon:** the words drifting across under the hero are `ribbon:` in `home.md`.
- **Story section:** a big photo (`experience: image`) with a small "polaroid" photo overlapping it (`image2`, `image2Caption`; leave `image2` empty to hide it).
- **Guided scroll (wide screens, 1100px+):** one scroll down (mouse, trackpad or arrow / Page Down / space keys) from the hero glides the page so the Signature treatments heading lands just under the menu, with the section in view; one scroll up from there glides back to the top. Phones, tablets and "reduce motion" keep normal scrolling. Settings (`HEADER`, `GAP`) under "Guided scroll" in `public/js/home.js`.
- **Scroll reveal:** add `data-reveal` to an element to fade it up as it reaches the screen (`data-reveal="stagger"` brings its children in one by one, `"wipe"` opens the banner like a curtain); `data-speed="0.1"` makes a photo drift. Visitors with "reduce motion" on see everything still.

### Testimonials
In `src/content/home.md`, under `testimonials:` → `items:`. **Only real client reviews with the client's written permission.** Never write or paraphrase a review. Replace every `[[CONFIRM...]]` in a review together (quote, name, treatment).

### Footer links and social media
Edit `footerLinks` and `socials` in `src/data/site.json`. A link or icon only becomes clickable once its `[[CONFIRM...]]` is replaced with a real URL.

### Add an annual report (Investor Relations)
1. Put the PDF in `public/reports/`, named like `annual-report-2025.pdf` (lowercase, no spaces).
2. Optional: put a cover image in `public/reports/covers/` (portrait, about 600×800).
3. In `src/content/investors.md`, add a block at the **top** of `reports:` (newest first):

```yaml
  - year: "2025"
    title: "Annual Report 2025"
    file: "annual-report-2025.pdf"
    cover: "/reports/covers/2025.webp"
```

The newest report is featured at the top of the page; the rest list below it. The file size is filled in automatically. If `file` is empty or the PDF isn't in the folder yet, the row shows "PDF coming soon" instead of a broken link. Only publish reports management has released publicly.

### Rituals page (treatment list): add, edit or remove a treatment
All à la carte treatments come from the **menu workbook**, `data/treatment-menu.xlsx` (its "How to use" tab explains every column). It is kept out of git because it holds internal notes; keep the master copy safe.

1. Edit the workbook (Treatments, Session Options, Concerns, Collections tabs). To hide a treatment, set "Show on website" to No.
2. Run `npm run build:treatments` (or `npm run build:treatments -- path/to/file.xlsx`). It writes `src/data/treatment-menu.json`, which the Treatments, Rituals and Gallery pages read. Never edit that JSON by hand. Script: `scripts/build-treatments.mjs` (reads the workbook with `scripts/read-xlsx.mjs`, no extra packages).
3. Commit `src/data/treatment-menu.json`.

If a row is missing a name, Concern 1, collection, or both a price and a price text (or names a concern or collection that isn't in its tab), the script stops, lists the rows and changes nothing.

How the columns become a card:
- **Area tag** (Face / Body / Wellness) = the Area of Concern 1 in the Concerns tab. **Badge** = Badge. **Italic line** = Tagline, or Concern 1's "For you if…" when empty. **Description** = Description, or "Helps with …" built from the treatment's concerns when empty.
- **Price:** Price text if filled (shown as is, e.g. "Quoted per case"); otherwise "from" the first-trial price, else the lowest Session Options price, else the usual price. Trial notes, price units and crossed-out prices aren't shown on cards.
- **Photo:** the "Image file" column (a file in `public/images/treatments/`, landscape about 1200×900). If empty, the photo listed for that treatment name under `"photos"` in `src/data/treatments.json`. Otherwise the placeholder. Rerun the command after adding a photo.
- **Internal note** columns are never read.

The list shows 12 cards, then a "Show more" button adds 12 at a time (`PAGE_SIZE` in `public/js/treatments.js`). Prices must match the Y27/28 menu PDF and the Home page signature cards (`src/content/home.md`).

### Rituals page: filter sidebar
On `/rituals/` the filters sit in a sidebar on the left (desktop). On phones and tablets (1024px and narrower) the same filters open as a "Filters" sheet from the button next to search. Behaviour is in `public/js/treatments.js`; styles are the `.fl-*`, `.seg`, `.pill` and `.switch` rules in `public/css/treatments.css`.
- **Area:** All / Face / Body / Wellness (a segmented control with counts). It's kept in the link as `?area=face`, so `/rituals/?area=body` opens the Body list. Older `/rituals/#body` links still work. Area also limits which concerns are listed.
- **Concern:** checkboxes with the labels and order of the workbook's Concerns tab. "Order in its area shortlist" decides which show before "+ N more concerns" (blank = under that link); on "All", "Order in All shortlist" does. Ticked ones always stay visible. A concern only appears where at least one treatment has it.
- **Budget:** a two-handle slider that runs from the cheapest to the most expensive price on the site. Each step is a real price from the list, so the handles move evenly through our prices; the little bars above show how many treatments sit at each price (with the other filters applied). The label shows the chosen range, or "Any". Above the slider, **All prices / First trial** (with counts) replaces the old First-trial switch: "First trial" keeps only treatments with a first-trial price and the slider then uses those trial prices. With the slider at full width, every treatment shows, including "Quoted per case" ones; once narrowed, those drop out. Styles: `.fl-budget`, `.range*` in `public/css/treatments.css`.
- **Time:** pill buttons from `durations` under `"filters"` in `src/data/treatments.json` (`min` / `max`; `null` = no upper limit). Matches any of the treatment's durations.
- **Collection:** collapsed under "Collection +"; options are the workbook's Collections tab.
- **Search** matches treatment names plus each of their concerns' label and "Search words".

### Treatments page: "Explore our services" heading and tiles
The heading above the Face / Body / Wellness tiles is `"services"` in `src/data/treatments.json`: `eyebrow`, `heading` (`*asterisks*` = italic rose) and `lede` (the short line on the right). Each tile's treatment count and "from S$xx" price are worked out from the treatment list (`src/data/treatment-menu.json`), so they update on their own. The ribbon line that draws in above the heading is in `src/pages/treatments.astro` (styles: `.svc-ribbon` in `public/css/treatments.css`).

### Treatments page: "New & trending" banners
Below the Face / Body / Wellness tiles on `/treatments/`: a heading, then three banners: one wide banner on top and two half-width banners side by side under it, edge to edge. Edit `"trending"` in `src/data/treatments.json`:
- `eyebrow`, `heading` (put `*asterisks*` around words to show them in italic rose), `lede`.
- `banners`: three `{ "image": "", "alt": "", "link": "" }` blocks, in order. **First** = the wide one (1920×480, 4:1). **Second and third** = the half-width ones (960×480 each, 2:1).
  - `image`: e.g. `"/images/banners/prestige-series.webp"` (files in `public/images/banners/`), or `""` for a placeholder showing the size. Any words (titles, "Book First Trial") go in the artwork itself.
  - `alt`: what the banner says or shows, for screen readers.
  - `link`: where it goes when clicked, e.g. `"/rituals/?area=face"`, or `""` for no link.
- On phones the three banners stack, each keeping its own shape, so words in the artwork aren't cropped. Export them at exactly 4:1 and 2:1.
- No before-and-after images or guaranteed results in banners. Styles: `.trend-*` at the end of `public/css/treatments.css`.

### Treatments and Rituals pages: photos, full menu and booking
- `/treatments/` shows the hero and the Face / Body / Wellness tiles. The hero is just the heading and a line under it (`"hero"` → `heading`, `text` in `src/data/treatments.json`). Each tile, the nav's Face / Body / Wellness links and the Home page "View all treatments" button open `/rituals/` (the full list), filtered with `?area=face`, `?area=body` or `?area=wellness` where relevant.
- Hero and category tile images are under `"siteImages"` in `src/data/treatments.json` (files in `public/images/site/`). `"rituals"` is the photo behind the Rituals page heading ("Our most-loved rituals"); it currently uses the same spa-room photo as the Treatments hero.
- While `"showPlaceholderHints"` is `true`, empty photo slots show their recommended size. Set it to `false` before launch.
- **Full menu (pop-up viewer):** the Rituals "View Full Menu" button opens the menu in a pop-up window over the page (page arrows with "3 / 20", Esc or ✕ to close; full screen on phones). It shows the menu as one image per page (`public/menu/pages/page-01.webp` …), so it works in every browser, including Instagram / WhatsApp in-app browsers that would otherwise download a PDF, and loads about 1.8 MB instead of a 16 MB PDF. Component: `src/components/MenuViewer.astro` (add `<MenuViewer />` to a page, plus `"menu-viewer.css"` in `styles` and `"menu-viewer.js"` in `scripts`); any link with `data-menu-viewer` opens it. Styles: `public/css/menu-viewer.css`; behaviour: `public/js/menu-viewer.js`. Those links point to `/menu/` (`src/pages/menu.astro`), a plain page with the same images, used only if JavaScript is off or when sharing a direct link.
- **To replace the full menu:** overwrite `public/menu/full-spa-menu.pdf`, then run `sh scripts/menu-images.sh` (needs Ghostscript and ImageMagick) to remake the page images, and update `"pdfDownloadName"`. The `/menu/` page picks up however many pages there are. The Rituals page's small "Download" button still downloads the PDF itself.
- "Book Now" opens WhatsApp to the studio the visitor picks, using the `whatsapp` numbers in `src/data/outlets.json`. A studio without a confirmed number is left out of the list.

### Gallery / Results page: add a client result
The page is `/gallery/`, linked from the Treatments dropdown ("Gallery / Results"). Everything on it is in `src/content/gallery.md`.

1. **Get written consent first.** Only real clients who have signed permission for their photos to go on the website. Marketing keeps the signed form. No retouching.
2. Put the photos in `public/images/results/`, named like `clario-2026-01-before.webp` and `clario-2026-01-after.webp` (lowercase, no spaces). Before and after should be portrait (about 800×1000) with the same framing and lighting. For one combined picture instead, use landscape, about 1600×1200.
3. In `src/content/gallery.md`, add a block at the **top** of `results:` (newest first):

```yaml
  - treatment: "clario-porcelain"
    note: "After 3 sessions over 6 weeks"
    before: "/images/results/clario-2026-01-before.webp"
    after: "/images/results/clario-2026-01-after.webp"
    alt: "Client's cheek before and after CLARIO Porcelain Skin Therapy"
    consent: true
```

- `treatment` is the treatment's ID from the menu workbook (see `src/data/treatment-menu.json`); its name, Face/Body/Wellness filter and link fill in automatically.
- For one combined picture, use `image: "/images/results/….webp"` instead of `before` and `after`.
- **Photos only show when `consent: true`.** While it's `false`, the slot shows "Awaiting consent" instead of the photo. Never set it to `true` until marketing confirms the signed consent.
- `note` must be factual: no kg or cm lost, no "permanent", no medical claims, no "guaranteed".
- The example blocks (empty photos, `[[CONFIRM: ...]]` notes) are placeholders: replace or delete them.

### Contact Us page
- **Our Location:** the map pins and stats are in `src/content/contact.md` (`locations:`); addresses, phones, WhatsApp and hours come from `src/data/outlets.json`.
- The page starts with Our Location, then Feedback / Enquiry.
- **Career** has its own page at `/careers/` (linked from the Contact Us dropdown). Edit `src/content/careers.md`. Set `apply` to the careers email or application link to turn on the "Apply now" button.
- **Feedback / Enquiry:** the topics in the drop-down are under `enquiry: topics:`. The form opens the visitor's email app addressed to `email` in `src/data/site.json`, with the topic in the subject line.
