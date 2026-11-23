# Mary Chia website — editing guide

Static site built with [Astro](https://astro.build). No CMS, no database. The marketing team edits it mostly by asking Claude for changes, so **keep words in content/data files and design in templates/CSS**. A copy change should touch only a content or data file.

## Commands (run inside `marychia-site/`)

- `npm install` — first time only
- `npm run dev` — local preview at http://localhost:8091 (`[[CONFIRM: ...]]` placeholders show highlighted in yellow)
- `npm run build` — builds the finished site into `dist/`. Upload the contents of `dist/` to the web host.
- **Preview site:** the repo is `feisty171/marychia`. Pushing to `main` publishes automatically to https://feisty171.github.io/marychia/ via GitHub Actions (`.github/workflows/deploy.yml`).
  - Because GitHub serves it from the `/marychia/` folder, `astro.config.mjs` sets `BASE = "/marychia"` and, after each build, adds `/marychia` in front of every root link (`/images/…`, `/about/`). **Keep writing links from the root (`/images/…`) in content and data files**; don't add `/marychia` yourself. `npm run dev` stays at the root (http://localhost:8091/). To check the real build, run `npm run build` then `npx astro preview --port 8092` and open http://localhost:8092/marychia/.
  - At launch on `www.marychia.com`: in `astro.config.mjs` set `SITE` to `https://www.marychia.com` and `BASE` to `""`, and change `url` in `src/data/site.json` to `https://www.marychia.com`.

## Where things live

| What | File |
|---|---|
| Home page words (hero eyebrow, headline, paragraph and buttons; numbers band; signature treatments; ad banner below them (`banner:`, placeholder until an image is set); products below the banner (`products:`, a "shelf" design via `src/components/ProductCard.astro`, styles `.shop-*`; the nav "Shop" link jumps here); experience, reviews, first-visit offer, visit info, final CTA) | `src/content/home.md` |
| About Us page words (heritage opening, timeline milestones + photos, vision & mission, SEO title/description) | `src/content/about.md` |
| Contact Us page words (Our Location, Feedback/Enquiry form topics) | `src/content/contact.md` |
| Career page words (/careers/: intro, roles, how to apply) | `src/content/careers.md` |
| Gallery / Results page (/gallery/: heading, filters, client results with before/after photos, disclaimer, closing button) | `src/content/gallery.md` (photos in `public/images/results/`) |
| Treatments (`/treatments/`: hero + Face/Body/Wellness tiles) and Rituals (`/rituals/`: the full treatment list) — treatments, prices, session options, search keywords, images, full-menu PDF settings | `src/data/treatments.json` |
| Full treatment menu PDF | `public/menu/full-spa-menu.pdf` |
| Treatments tiles + Rituals list behaviour (search, filter sidebar / Filters sheet, WhatsApp booking sheet) | `public/js/treatments.js` |
| Investor Relations page words and the annual report list | `src/content/investors.md` |
| Annual report PDFs (and optional cover images in `covers/`) | `public/reports/` |
| Outlets (used by Home "Visit us", the Contact page map + studio cards, WhatsApp booking, the footer on every page, and schema.org data) | `src/data/outlets.json` |
| Site-wide settings: brand name, tagline, booking link, WhatsApp link, enquiry email (Contact page form), share image, footer quick links, social media links | `src/data/site.json` |
| Header / nav, including the Treatments, About Us and Contact Us dropdowns: edit `treatments` and `dropdowns`; the dropdown markup is `src/components/NavDropdown.astro` (each link should appear in only one dropdown) | `src/components/Header.astro` |
| Footer | `src/components/Footer.astro` |
| Shared `<head>`, SEO + Open Graph tags | `src/layouts/Base.astro` |
| Page templates | `src/pages/index.astro` (Home), `src/pages/about.astro`, `src/pages/treatments.astro`, `src/pages/rituals.astro` (treatment list), `src/pages/gallery.astro` (Gallery / Results), `src/pages/investors.astro`, `src/pages/contact.astro`, `src/pages/careers.astro` |
| Styles | `public/css/style.css` (shared), `public/css/home.css`, `public/css/about.css`, `public/css/treatments.css`, `public/css/gallery.css`, `public/css/investors.css`, `public/css/contact.css`, `public/css/careers.css` |
| Gallery / Results filter buttons | `public/js/gallery.js` |
| About page behaviour (scrolling timeline) | `public/js/about.js` |
| Contact page behaviour (studio map highlights, count-up stats, enquiry form) | `public/js/contact.js` |
| Link helpers (phone, WhatsApp, placeholder checks) | `src/lib/links.ts` |
| Images | `public/images/` |


## Design system: fonts, colours and sizes

All fonts, colours and type sizes are **tokens** at the top of `public/css/style.css`. Every page stylesheet uses them. Never hard-code a new hex colour, font or pixel font size in page CSS; use a token, or add one to `style.css` if nothing fits.

- **Fonts:** Cormorant Garamond (`--font-serif`) for headings, numbers and prices; Figtree (`--font-sans`) for body text, buttons and labels. No other fonts. Both load once in `src/layouts/Base.astro`.
- **Colours:** `--ink` (headings, text, primary buttons), `--ink-soft` (secondary text), `--ink-faint` (hints, struck-through prices), `--rose` (accent: eyebrows, numbers, prices, icons), `--rose-deep`, `--rose-lt` (accent on dark backgrounds), `--rose-line`, `--line` (hairlines), `--blush` (page background), `--tint` (alternate sections), `--white`, `--dark`.
- **Type scale:**
  - Sans: `--fs-label` 11px · `--fs-caption` 12px · `--fs-ui` 13px · `--fs-small` 14px · `--fs-text` 15px · `--fs-body` 16–19px
  - Serif: `--fs-h5` 18px · `--fs-h4` 22px · `--fs-h3` 28px (card titles) · `--fs-h3-lg` 30–40px · `--fs-h2` 34–56px (section titles) · `--fs-display` 44–76px (page titles) · `--fs-stat` 36–56px (big numbers)
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

### Add a timeline photo
Put the image in `public/images/heritage/` (square works best, at least 700×700), then set that milestone's `image: "/images/heritage/your-file.webp"` and update `imageAlt`. While `image` is empty, a placeholder shows. On desktop it's shown as a floating circle; on phones as an arched photo above the text.

### Studio map position (Contact Us → Our Location)
Each outlet in `src/data/outlets.json` has `mapX` / `mapY`: where its pin sits on the Singapore map (roughly x 60 = far west, 660 = far east; y 130 = north, 290 = south). Adjust when adding a studio.

### Booking link or WhatsApp number (site-wide)
Edit `bookingUrl` or `whatsappUrl` in `src/data/site.json`. For WhatsApp, put the number (e.g. `"8688 6298"`). Set `email` to the enquiry address to switch on the Contact page's "Write to us" form (it opens the visitor's email app with their message filled in).

### Home page signature treatments
In `src/content/home.md`, under `services:` → `items:`. Keep it to 5. Each item has `category`, optional `tag`, `for`, `description`, `options`, `image`; the comments in that file show the format. Prices must match the Y27/28 menu PDF and `src/data/treatments.json`.

These are **simple cards** (`src/components/SignatureCard.astro`, styles `.sig-*` in `public/css/home.css`): square photo on top, then the name, the short `for` line as a description, the price and a slim "Book now →" row. Five across on wide screens, three across on small laptops, two across on tablets and phones. Below the cards, a "View All Treatments →" text link goes to the Treatments page (`menuButton` / `menuLink`). The cards show `name`, `for`, `options` (price) and `image`; the other fields are kept for reference. The price shows as "from S$xx" (the lowest option price) with that option's `compareAt` crossed out. They are deliberately different from the Rituals page cards (`cardHTML()` in `public/js/treatments.js`). "Book now" opens the WhatsApp studio picker (`src/components/BookingSheet.astro` + `public/js/treatment-cards.js`).

To add a photo: put it in `public/images/treatments/` (square-ish works best for these cards, about 900×900) and set `image: "/images/treatments/your-file.webp"`. Only use photos marketing has the rights to; no before-and-after photos without written client consent.

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
Edit `src/data/treatments.json`, under `"treatments"`. Each treatment has:

- `name`, `category` (`"Face"`, `"Body"` or `"Wellness"`), optional `tag` (e.g. `"New"`, `"Signature"`)
- `for` (the short italic line) and `description` (one or two sentences; follow the no-guaranteed-results rule)
- `keywords`: extra words people might search for, e.g. `"aches"`, `"hydration"`
- `concerns`: concern ids for the filter sidebar, e.g. `["dry", "acne"]` (ids are listed under `"filters"` → `"concerns"`). Only tick concerns the treatment's own `for` line or description supports.
- optional `collections`: extra collection names, e.g. `["Prestige Series"]`. The treatment's `tag` (Signature, New) already counts as a collection.
- `options`: one or more sessions, each `{ "label": "First Trial", "minutes": 60, "price": 69, "compareAt": 189 }`. The site shows only the lowest price, as "from S$xx", on cards and category tiles. Session names (First Trial / Usual), durations and crossed-out prices are not shown, and the WhatsApp booking message names only the treatment.
- `image`: a file name in `public/images/treatments/` (landscape, about 1200×900), or `""` for a placeholder

Prices must match the Y27/28 menu PDF and the Home page signature cards (`src/content/home.md`).

### Rituals page: filter sidebar
On `/rituals/` the filters sit in a sidebar on the left (desktop). On phones and tablets (1024px and narrower) the same filters open as a "Filters" sheet from the button next to search. Settings are under `"filters"` in `src/data/treatments.json`; behaviour is in `public/js/treatments.js`; styles are the `.fl-*`, `.seg`, `.pill` and `.switch` rules in `public/css/treatments.css`.
- **Area:** All / Face / Body / Wellness (a segmented control with counts). It's kept in the link as `?area=face`, so `/rituals/?area=body` opens the Body list. Older `/rituals/#body` links still work. Area also limits which concerns are listed.
- **Concern:** checkboxes. Each area shows its first 6 concerns, the rest behind "+ N more concerns", and ticked ones always stay visible. With Area on "All", the 6 in `concernsOnAll` show. A concern only appears where at least one treatment has it. To add one: add `{ "id": "…", "label": "…" }` to `concerns` (its position sets its order), then add the id to the right treatments' `concerns`.
- **First trial:** an on/off switch. Its subtitle (e.g. "6 treatments, from S$69") updates as other filters change. A session counts as a first trial when its `label` contains `firstTrialLabel` ("First Trial").
- **Budget / Time:** pill buttons from `budgets` and `durations` (`min` / `max`; `null` = no upper limit). A treatment matches when one of its sessions fits the First trial switch, a chosen budget and a chosen time together.
- **Collection:** collapsed under "Collection +"; its label shows how many are ticked. Options come from each treatment's `tag` plus `collections`.
- There is no pigmentation concern: no treatment's description covers it yet. Add one only when marketing confirms a treatment for it.

### Treatments page: "Explore our services" heading and tiles
The heading above the Face / Body / Wellness tiles is `"services"` in `src/data/treatments.json`: `eyebrow`, `heading` (`*asterisks*` = italic rose) and `lede` (the short line on the right). Each tile's treatment count and "from S$xx" price are worked out from the treatments in the same file, so they update on their own. The ribbon line that draws in above the heading is in `src/pages/treatments.astro` (styles: `.svc-ribbon` in `public/css/treatments.css`).

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
- `/treatments/` shows the hero and the Face / Body / Wellness tiles. Each tile, the hero "Explore" button, the nav's Face / Body / Wellness links and the Home page "View all treatments" button open `/rituals/` (the full list), filtered with `?area=face`, `?area=body` or `?area=wellness` where relevant.
- Hero and category tile images are under `"siteImages"` in `src/data/treatments.json` (files in `public/images/site/`).
- While `"showPlaceholderHints"` is `true`, empty photo slots show their recommended size. Set it to `false` before launch.
- To replace the full menu, overwrite `public/menu/full-spa-menu.pdf` and update `"pdfDownloadName"`.
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

- `treatment` is the treatment's `id` from `src/data/treatments.json`; its name, Face/Body/Wellness filter and link fill in automatically.
- For one combined picture, use `image: "/images/results/….webp"` instead of `before` and `after`.
- **Photos only show when `consent: true`.** While it's `false`, the slot shows "Awaiting consent" instead of the photo. Never set it to `true` until marketing confirms the signed consent.
- `note` must be factual: no kg or cm lost, no "permanent", no medical claims, no "guaranteed".
- The example blocks (empty photos, `[[CONFIRM: ...]]` notes) are placeholders: replace or delete them.

### Contact Us page
- **Our Location:** the map pins and stats are in `src/content/contact.md` (`locations:`); addresses, phones, WhatsApp and hours come from `src/data/outlets.json`.
- The page starts with Our Location, then Feedback / Enquiry.
- **Career** has its own page at `/careers/` (linked from the Contact Us dropdown). Edit `src/content/careers.md`. Set `apply` to the careers email or application link to turn on the "Apply now" button.
- **Feedback / Enquiry:** the topics in the drop-down are under `enquiry: topics:`. The form opens the visitor's email app addressed to `email` in `src/data/site.json`, with the topic in the subject line.
