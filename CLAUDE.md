# Mary Chia website — editing guide

Static site built with [Astro](https://astro.build). No CMS, no database. The marketing team edits it mostly by asking Claude for changes, so **keep words in content/data files and design in templates/CSS**. A copy change should touch only a content or data file.

## Commands (run inside `marychia-site/`)

- `npm install` — first time only
- `npm run dev` — local preview at http://localhost:8091 (`[[CONFIRM: ...]]` placeholders show highlighted in yellow)
- `npm run build:products -- "path/to/sheet.xlsx"` — rebuilds the Shop product list from the KrisShop product sheet (see "Shop page")
- `npm run build:treatments` — rebuilds the treatment list from `data/treatment-menu.xlsx` (see "Rituals page (treatment list)")
- `npm run build` — builds the finished site into `dist/`. Upload the contents of `dist/` to the web host.
- **Preview site:** the repo is `feisty171/marychia`. Pushing to `main` publishes automatically to https://feisty171.github.io/marychia/ via GitHub Actions (`.github/workflows/deploy.yml`).
  - Because GitHub serves it from the `/marychia/` folder, `astro.config.mjs` sets `BASE = "/marychia"` and, after each build, adds `/marychia` in front of every root link (`/images/…`, `/about/`). **Keep writing links from the root (`/images/…`) in content and data files**; don't add `/marychia` yourself. `npm run dev` stays at the root (http://localhost:8091/). To check the real build, run `npm run build` then `npx astro preview --port 8092` and open http://localhost:8092/marychia/.
  - At launch on `www.marychia.com`: in `astro.config.mjs` set `SITE` to `https://www.marychia.com` and `BASE` to `""`, and change `url` in `src/data/site.json` to `https://www.marychia.com`.

## Where things live

| What | File |
|---|---|
| Home page words and photos (hero eyebrow, headline, paragraph, buttons and its photo; the Key figures band right under the hero (`stats:`); "Find a treatment" heading over the Face/Body/Wellness tiles, plus the hidden signature list (`services:`); banner carousel below them (`banner:` → `slides:`); "Our clients' favourites" cards below the banner (`favourites:`, `src/components/FavouriteCard.astro`, styles `.fav-*`); the Shop section (`products:`, hidden with `show: false`; a "shelf" design via `src/components/ProductCard.astro`, styles `.shop-*`; the nav "Shop" link points to it); first-visit band (`trial:`), "Real results" (`results:`, with the reviews and trust line from `testimonials:`), experience, visit info, final CTA) | `src/content/home.md` |
| About Us page words (heritage opening, timeline milestones + photos, vision & mission, SEO title/description) | `src/content/about.md` |
| Contact Us page words (Our Location, Feedback/Enquiry form topics) | `src/content/contact.md` |
| Career page words (/careers/: intro, roles, how to apply) | `src/content/careers.md` |
| Shop page (/shop/, the nav "Shop" link) and product pages (/shop/<product>/): page words, labels, brand order | `src/content/shop.md` (words); products: `src/data/products.json`, made from the product sheet (see "Shop page" below) |
| Gallery / Results page (/gallery/: heading, filters, client results with before/after photos, disclaimer, closing button) | `src/content/gallery.md` (words); results: one file each in `src/data/results/`, photos in `src/assets/results/` (resized automatically); add them with Pages CMS, settings in `.pages.yml` |
| Treatments and Rituals: the treatment list, prices, concerns and collections (`data/treatment-menu.xlsx` → `npm run build:treatments` → `src/data/treatment-menu.json`) | see "Rituals page (treatment list)" below |
| Treatment list page (`/rituals/`, the "Treatments" menu item) settings: hero words (`ritualsHero`), photos, time pills, treatment photos, full-menu PDF settings. (`hero`, `services` and `trending` belonged to the removed /treatments/ page and are not shown.) | `src/data/treatments.json` |
| Full treatment menu PDF, and its page images for the `/menu/` page (remake with `sh scripts/menu-images.sh`) | `public/menu/full-spa-menu.pdf`, `public/menu/pages/` |
| Face / Body / Wellness tiles (Home "Find a treatment") | `src/components/CategoryTiles.astro` |
| Rituals list behaviour (search, filter sidebar / Filters sheet, WhatsApp booking sheet) | `public/js/treatments.js` |
| Investor Relations page words and the annual report list | `src/content/investors.md` |
| Annual report PDFs (and optional cover images in `covers/`) | `public/reports/` |
| Outlets (used by Home "Visit us", the Contact page studio cards, WhatsApp booking, the footer on every page, and schema.org data) | `src/data/outlets.json` |
| Site-wide settings: brand name, tagline, booking link, WhatsApp link, enquiry email (Contact page form), share image, footer quick links, social media links | `src/data/site.json` |
| Header / nav, including the Treatments, About Us and Contact Us dropdowns: edit `treatments` and `dropdowns`; the dropdown markup is `src/components/NavDropdown.astro` (each link should appear in only one dropdown) | `src/components/Header.astro` |
| Footer | `src/components/Footer.astro` |
| Shared `<head>`, SEO + Open Graph tags | `src/layouts/Base.astro` |
| Page templates | `src/pages/index.astro` (Home), `src/pages/about.astro`, `src/pages/treatments.astro`, `src/pages/rituals.astro` (treatment list), `src/pages/gallery.astro` (Gallery / Results), `src/pages/menu.astro` (Full menu fallback page), `src/pages/investors.astro`, `src/pages/contact.astro`, `src/pages/careers.astro` |
| Styles | `public/css/style.css` (shared), `public/css/home.css`, `public/css/about.css`, `public/css/treatments.css`, `public/css/gallery.css`, `public/css/menu.css`, `public/css/menu-viewer.css`, `public/css/investors.css`, `public/css/contact.css`, `public/css/careers.css` |
| Gallery / Results filter buttons | `public/js/gallery.js` |
| About page behaviour (scrolling timeline) | `public/js/about.js` |
| Contact page behaviour (enquiry form) | `public/js/contact.js` |
| Home page motion (hero parallax, scroll reveal, signature list photo) | `public/js/home.js` |
| Link helpers (phone, WhatsApp, placeholder checks) | `src/lib/links.ts` |
| Images | `public/images/` |


## Design system: fonts, colours and sizes

All fonts, colours and type sizes are **tokens** at the top of `public/css/style.css`. Every page stylesheet uses them. Never hard-code a new hex colour, font or pixel font size in page CSS; use a token, or add one to `style.css` if nothing fits.

- **Font:** one typeface, Inter (`--font-sans`: "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif), a clean Swiss / Helvetica look inspired by rhode skin. It loads once in `src/layouts/Base.astro`. No other fonts; never set a `font-family` other than `var(--font-sans)`.
- **Colours:** `--ink` (near-black: headings, prices, primary buttons), `--text-color` / `--ink-soft` (#5f5f5a soft dark grey: body and secondary text; `p` uses it by default), `--ink-faint` (hints, struck-through prices), `--rose` (the brand red, a premium maroon #A43E4B: eyebrows, series labels, accent words, icons, filled rose buttons), `--rose-deep` (hover), `--rose-lt` (red on dark backgrounds), `--rose-line`, `--line` (hairlines). For see-through reds use `rgba(var(--rose-rgb), .x)` or `rgba(var(--rose-lt-rgb), .x)`; never type a red or pink value directly. Others: `--blush` (page background, white; `--blush-rgb` for see-through versions), `--tint` (alternate sections, a soft neutral grey, no pink), `--white`, `--dark`, `--wine` (rgb, burgundy tint over photos).
- **Type scale:** `--text-xs` 12px (labels, eyebrows, buttons, nav) · `--text-sm` 14px · `--text-base` 16px (body) · `--text-lg` 18px · `--text-xl` 22px (card titles) · `--text-2xl` 24–32px · `--text-3xl` 28–44px (section titles) · `--text-display` 36–60px (page titles) · `--text-hero` 40–72px (Home hero; `--text-hero-phone`, `--text-hero-mid` for phones and 961–1199px) · `--text-poster` / `--text-poster-lg` (big uppercase titles: Home "Find a treatment", Shop brand names) · `--text-stat` (big numbers). The older `--fs-*` names still work; they point at this scale. Never type a pixel or rem font size in page CSS (relative `em` sizes like `sup` are fine).
- **Page width (every page):** `--max` (1680px) in `public/css/style.css` sets the width of the header, every page container (`.a-container`, `.h-container`, `.ir-container`, the Treatments/Rituals `.tp .wrap`, `.mn-wrap`) and the footer, with `--gutter` as the side margin (16px on phones). They all share the same left and right edges. New page sections should use one of these containers, not a fixed `max-width`. Keep reading text narrow inside them (e.g. `.a-head` 640px, `62ch` paragraphs).
- **Conventions (rhode-style):** headings are bold Inter (`--fw-heading` 700), tight spacing (`--tracking-heading` -0.02em), line height `--lh-heading` 1.1, sentence case; the `*asterisk*` accent words are upright and rose (no italics anywhere). Body text is regular, line height `--lh-body` 1.5, `--text-color`. **Every small uppercase label** (eyebrows, series names like "LUCENT", sizes like "SERUM · 30ML", section headers like "ABOUT THIS PRODUCT", breadcrumbs) uses one style: `--text-xs`, `--fw-label` 600, `--tracking-label` 0.08em; in templates add `class="label"` (style.css). Buttons and nav use `--tracking-ui` (0.08em). Prices are ink, `--fw-price` 500. Numbers always use lining figures (`font-variant-numeric: lining-nums` on `body`), so "SPF60" never reads "SPF6o". Primary buttons (Book Now, Order on WhatsApp) are filled ink (`.btn--solid`, or `.btn-primary` inside `.tp`).
- **Treatments page:** keeps its own layout from the zip design, but `public/css/treatments.css` now uses only these tokens. The few remaining raw sizes are decorative: the report cover mock-up.

## Responsive rules (fitting phones, tablets and desktops)
- **No sideways scrolling:** sections use the shared containers (`--max`, `--gutter`). Don't put `aspect-ratio` together with `max-height` on a full-width block: Safari keeps the shape by making it narrower. Set a `height: min(...)` instead (see `.trial` in `home.css`).
- **Hero fits the first screen:** on phones the "Book your first visit" button sits on the first screen; from 961px the words sit on the photo, with smaller words between 961 and 1199px so they stay clear of the model.
- **Touch targets:** on phones, tablets and touch screens, small text links get a 44px-tall tap area ("Touch targets" at the end of `style.css`). Add new small links there.
- **Reading width:** intro paragraphs stop at about 60 characters (`.h-intro`). Body text is 16px with 1.6 line height.
- **Cards:** inner padding scales between 1.25rem and 2rem (`clamp`).
- Brand type, button style and page width stay as described in "Design system" above.

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
The photo behind "Our Heritage" is `hero: image:` (and `imageAlt:`) in `src/content/about.md`; files go in `public/images/about/` (landscape, at least 1920 wide). It fills the whole opening under a deep maroon tint (`--wine`) and an even shade, so the words read clearly; accents on it are ivory and white, never light pink. The words sit centred: "About Us" label, the heading (`heading`, `*asterisks*` = rose accent), tagline, paragraph, then a row of three facts (`facts:` → `value`, `label`, e.g. 1982 / 40+ / Singapore). Below, "Explore our history · 1982 — Today" and a round arrow sit centred in one row over a soft line (`explore`, `range`). As you scroll down, the photo fades into the page while drifting down and zooming slightly, the same way as the Home hero (`.hero::before` in `style.css`), the words fade up and away, and "Our history" fades up as it arrives (`public/js/about.js` sets `--hp` from 0 to 1; styles under "Heritage opening" and "Scroll fade" in `public/css/about.css`). Visitors with "reduce motion" turned on see no movement.

### About Us: transition from "Our history" to "What drives us"
On wide screens, the last milestone (its words, the pinned year column and the circle photo) fades out as you scroll past it ("Last chapter fade" in `public/css/about.css`, `--out` set in `public/js/about.js`; phones skip it because the chapter is taller than the screen). After the last milestone, a rose line draws down to a small dot over the closing line `storyClose` in `src/content/about.md` ("Today, the story continues with you."). "What drives us" (Vision & Mission) then opens on the tint background with a curved top edge. Styles: "Transition" in `public/css/about.css`; the draw-in is in `public/js/about.js`.

### Add a timeline photo
Put the image in `public/images/heritage/` (square works best, at least 700×700), then set that milestone's `image: "/images/heritage/your-file.webp"` and update `imageAlt`. While `image` is empty, a placeholder shows. On desktop the photo shows as a floating circle; on phones as a circle above the text (placeholders keep the arch shape). Photos are square, 900×900, and named by year, e.g. `2001-2004.webp`.

### Booking link or WhatsApp number (site-wide)
Edit `bookingUrl` or `whatsappUrl` in `src/data/site.json`. For WhatsApp, put the number (e.g. `"8688 6298"`). Set `email` to the enquiry address to switch on the Contact page's "Write to us" form (it opens the visitor's email app with their message filled in).

### Home page "Find a treatment" (and the hidden signature list)
Under the Key figures band, Home shows "Find a treatment" with a poster-style heading: bold uppercase words, with the `*asterisk*` words on their own line in the brand red (`services:` → `heading`), and on the right a short uppercase line (`intro`) and a square "All Treatments" button (`button`, linking to `buttonLink`, the treatment list `/rituals/`). Styles: "Find a treatment (Home)" in `home.css`. Below it are the Face / Body / Wellness tiles in a **compact** form (`<CategoryTiles compact />`): shorter 3:2 landscape tiles with rounded corners, title in capitals and a short sentence (no count, price or arrow); the photos never zoom; stacked on phones. The Treatments page keeps the tall tiles. The tiles are one shared component, `src/components/CategoryTiles.astro` (counts and "from" prices come from the treatment list; photos from `"siteImages"` in `src/data/treatments.json`; styles `.tp .tile*` in `public/css/treatments.css`). A "View All Treatments →" link sits below (`menuButton` / `menuLink`).

The signature treatments list (`services:` → `items:`) is kept but **hidden** (`showList: false`). Set `showList: true` to show it again below the tiles. Keep it to 5. Each item has `category`, optional `tag`, `for`, `description`, `options`, `image`; the comments in that file show the format. Prices must match the Y27/28 menu PDF and the menu workbook. When shown, it's an **editorial numbered list** (`src/components/SignatureCard.astro`, styles `.sig-*` in `public/css/home.css`): number, category, name, the `for` line, "from S$xx" (lowest option price, its `compareAt` crossed out) and "Book now" (WhatsApp studio picker: `src/components/BookingSheet.astro` + `public/js/treatment-cards.js`). On wide screens a large arched photo beside the list follows the row you're on (`public/js/home.js`); on phones each row shows its own small photo.

To add a photo: put it in `public/images/treatments/` (square-ish works best for these cards, about 900×900) and set `image: "/images/treatments/your-file.webp"`. Only use photos marketing has the rights to; no before-and-after photos without written client consent.

### Home page design and motion
The Home page is an editorial layout. Words and photos are in `src/content/home.md`; styles in `public/css/home.css`; motion in `public/js/home.js`.
- **Hero:** the photo `hero: image` (a wide 1366×768 picture with a plain, light left side) is always shown whole, never cropped. On screens 961px and wider (where the full menu shows) the hero takes the photo's exact shape, the words sit on its left side and the menu is transparent on top of it (`clearHeader` on `<Base>` in `src/pages/index.astro`: white words, logo and Book Now with a soft glow behind them and a light shade along the top of the photo; dark words on narrower screens; solid once you scroll. Styles: `.site-header--clear` in `style.css`, `.ed-hero::before` in `home.css`). On narrower screens the photo sits full width under the menu with the words below. The headline's words slide up as the page opens (`*asterisks*` = rose accent); as you scroll, the photo fades and drifts.
- **Key figures band:** a rounded card right under the hero, four facts in a row (two by two on phones). On wide screens it overlaps the bottom of the hero photo, which fades softly into the page behind it (`.ed-hero::after`), so hero and card fit one screen. Content: `stats:` in `home.md` (`value`, `label`, optional `suffix`; `count: true` counts up). `show: false` hides it. Styles: "Key figures" in `home.css`.
- **"Our story" section:** `experience:` in `src/content/home.md`: archive photo (`image`, `caption`) with an optional smaller photo overlapping its corner (add `image2`, `image2Alt`, `image2Caption`), eyebrow, heading (all lowercase; `*asterisks*` = rose accent), the story, an optional row of `milestones` (`year`, `label`; take facts from the About timeline, and never add finances, share price or listing status) and "Read our story" (`link`, `linkHref`). Styles: "Our story" in `public/css/home.css`.
- **Guided scroll (wide screens, 961px+):** one scroll down (mouse, trackpad or arrow / Page Down / space keys) from the hero fades the page out and back in with the Key figures band just under the menu and Signature treatments below it (or, if the band is hidden, the Signature heading just under the menu); one scroll up from there fades back to the top (veil: `.page-fade` in `home.css`). Phones, tablets and "reduce motion" keep normal scrolling. Settings (`HEADER`, `GAP`) under "Guided scroll" in `public/js/home.js`.
- **Scroll reveal:** add `data-reveal` to an element to fade it up as it reaches the screen (`data-reveal="stagger"` brings its children in one by one, `"wipe"` opens the banner like a curtain); `data-speed="0.1"` makes a photo drift. Visitors with "reduce motion" on see everything still.

### Home banner carousel (below the Face / Body / Wellness tiles)
`banner:` → `slides:` in `src/content/home.md`: three brand banners (Lucent, The Juve Series, The Skin Prep Series), one at a time. Each slide has `image` (in `public/images/banners/`, wide 1600×450 or larger at that shape, with any words built into the picture), `alt` (what it says and shows) and `link` (each now opens its brand on `/shop/`, e.g. `/shop/#lucent`; `""` = no link). Copy or delete a `- image:` block to add or remove a slide. Pictures always show whole, never cropped. The slides turn every 6 seconds, pausing while hovered, focused or touched. Hovering a banner fades in a "Shop now" button on its bottom right (`button`; always shown on touch screens; only on slides with a link). Small, soft dots on the bottom of the picture pick a slide (no arrows; phones can also swipe); "reduce motion" stops the turning. No guaranteed results or before-and-after images in banner pictures. Styles: "Ad banner carousel" in `public/css/home.css`; behaviour: "Ad banner carousel" in `public/js/home.js`.

### Home page "Our clients' favourites"
Below the ad banner (where the Shop section was): "Signature treatments / Our clients' *favourites*" with a "View all N treatments →" link to `/rituals/` (N is counted automatically), then four cards. Edit `favourites:` in `src/content/home.md`: `eyebrow`, `heading` (`*asterisks*` = rose accent), `allLink` (`{count}` = number of treatments), `bookButton`, and `items:`, a list of treatment IDs from the menu workbook (see `src/data/treatment-menu.json`). The cards are **identical to the treatment list cards** (same markup and the same ".tp .card" styles in `treatments.css`): photo, title, 3-line description, price block, Book Now. On Home only, the card titles are in capitals (`.fav .card h3` in `home.css`). Data comes from the treatment list, so they always match. Cards: `src/components/FavouriteCard.astro`, which mirrors `cardHTML()` in `public/js/treatments.js`; if you change one, change the other.

The Shop section ("Take the care home", `products:`) is hidden (`show: false`); set `show: true` to bring it back.

### Home first-visit band ("Begin your story with us")
Right under "Our clients' favourites": words over the studio photo (`public/images/site/trial-bg.webp`, 1280×560) shown as it is, with no tint (the words get a soft shadow; `--wine` in `style.css` is only the fallback colour when there's no photo). On wide screens the band keeps the photo's 1280 : 560 shape; on phones it grows to fit. Edit `trial:` in `src/content/home.md`: `eyebrow`, `heading` (`*asterisks*` = accent), `text`, `note`, `termsLabel` + `termsLink` ("Terms apply" stays plain text until `termsLink` is a real link), `bookButton` (uses `bookingUrl` in `site.json`), `exploreButton` + `exploreLink` (`/rituals/?trial=1` opens the list on First trial prices). Styles: "First-visit band" in `public/css/home.css`.

### Home "Real results / Stories from our clients"
Right under the first-visit band. Edit `results:` in `src/content/home.md` (`eyebrow`, `heading`, `allLink` / `allHref` → `/gallery/`, `show` = how many results, `reviewSource`). The top row shows the newest results from `src/content/gallery.md`; **photos only show when that result has `consent: true`**, otherwise a "Before / After" placeholder shows. Each caption ("Treatment · note →") opens that treatment in the list. Below that, the reviews from `testimonials:` scroll by on their own as Google-style cards (coloured initial, name and studio, the Google "G", yellow stars, the first 4 lines, and "Read more" opening that studio's Google page from `mapsUrl` in `outlets.json`); hover or focus pauses them, "reduce motion" turns them into a swipeable row. Then the trust line (`testimonials:` → `trust:`). Stars show only when a review has a `rating`. Colours: `--google-star`, `--google-blue` in `style.css`. (This section replaced the older "Kind words" reviews section.) Styles: "Real results" in `public/css/home.css`.

### Testimonials
In `src/content/home.md`, under `testimonials:` → `items:` (shown in the Home "Real results" section; each has `quote`, `name` (first name + initial), `studio` (a name from `outlets.json`) and `rating`; the `trust:` list is the line under them). The current ones are real 5-star Google reviews copied word for word; marketing approved showing public Google reviews. **Only real client reviews with the client's written permission.** Never write or paraphrase a review. Replace every `[[CONFIRM...]]` in a review together (quote, name, treatment).

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
- **Card layout (every card, one template: `cardHTML()` in `public/js/treatments.js`, styles ".tp .card" in `treatments.css`):** photo · title · description (exactly 3 lines kept, clamped) · divider · price block · Book Now. No area tag, badge or italic line on the cards (Area still drives the filters). **Description** = the workbook Description only; nothing is generated, so an empty one leaves the 3 lines blank.
- **Price block** (two fixed rows): row 1 "FROM · [shortest duration] MIN" (just "FROM" with no duration) and a "FIRST TRIAL" pill when there is a first-trial price (its space is kept otherwise); row 2 the first-trial price with the regular price crossed out (`usualPrice`: the usual price, else the cheapest session option), or the regular "from" price, or the Price text (e.g. "Quoted per case") as is. The WhatsApp booking message carries the same line, e.g. "Hi Mary Chia, I would like to book Hydration Booster Facial (first trial, from 75 min · S$69) at Goldhill, Novena." (also used by the Home "favourites" cards).
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

### The Treatments page (/treatments/) was removed (the address now forwards to /rituals/)
`src/pages/treatments.astro` is now only a forwarding page: old links and bookmarks to `/treatments/` open `/rituals/`, keeping any filter (e.g. `?area=face`). Don't put content there.
The menu's "Treatments" item, the footer's "Services" link and the Home "Explore treatments" / "View all treatments" links all open the treatment list at `/rituals/`. Its hero uses the same layout as the old Treatments page hero (`.tp-hero` in `treatments.css`): heading and line centred over the photo (`"ritualsHero"` and `siteImages.rituals` in `src/data/treatments.json`). The old page's "Explore our services" tiles and "New & trending" banners are gone; their settings (`services`, `trending`, `hero`) are still in `treatments.json` but not shown.

### Treatments and Rituals pages: photos, full menu and booking
- The nav's Face / Body / Wellness links and the Home tiles open `/rituals/` (the full list), filtered with `?area=face`, `?area=body` or `?area=wellness`.
- Hero and category tile images are under `"siteImages"` in `src/data/treatments.json` (files in `public/images/site/`). `"rituals"` is the photo behind the Rituals page heading; it currently uses the same spa-room photo as the Treatments hero. The Rituals heading and the line beside it are `"ritualsHero"` (`eyebrow`, `heading`, `text`) in `src/data/treatments.json`.
- While `"showPlaceholderHints"` is `true`, empty photo slots show their recommended size. Set it to `false` before launch.
- **Full menu (pop-up viewer):** the Rituals "View Full Menu" button opens the menu in a pop-up window over the page (page arrows with "3 / 20", Esc or ✕ to close; full screen on phones). It shows the menu as one image per page (`public/menu/pages/page-01.webp` …), so it works in every browser, including Instagram / WhatsApp in-app browsers that would otherwise download a PDF, and loads about 1.8 MB instead of a 16 MB PDF. Component: `src/components/MenuViewer.astro` (add `<MenuViewer />` to a page, plus `"menu-viewer.css"` in `styles` and `"menu-viewer.js"` in `scripts`); any link with `data-menu-viewer` opens it. Styles: `public/css/menu-viewer.css`; behaviour: `public/js/menu-viewer.js`. Those links point to `/menu/` (`src/pages/menu.astro`), a plain page with the same images, used only if JavaScript is off or when sharing a direct link.
- **To replace the full menu:** overwrite `public/menu/full-spa-menu.pdf`, then run `sh scripts/menu-images.sh` (needs Ghostscript and ImageMagick) to remake the page images, and update `"pdfDownloadName"`. The `/menu/` page picks up however many pages there are. The Rituals page's small "Download" button still downloads the PDF itself.
- "Book Now" opens WhatsApp to the studio the visitor picks, using the `whatsapp` numbers in `src/data/outlets.json`. A studio without a confirmed number is left out of the list.

### Gallery / Results page: add a client result
The page is `/gallery/`, linked from the Treatments dropdown ("Gallery / Results"). Its words (heading, filters, disclaimer, closing button) are in `src/content/gallery.md`. **Each result is its own small file in `src/data/results/`** (one JSON file per result) and its photos are in `src/assets/results/`. The newest 3 also show in the Home "Real results" row. Code: `src/lib/results.ts`.

**Get written consent first.** Only real clients who have signed permission for their photos to go on the website. Marketing keeps the signed form. No retouching.

**Easiest way, from a phone or computer: Pages CMS.** Go to https://app.pagescms.org, sign in with GitHub, open this repo, then **Gallery results → Add an entry**: pick the treatment from the drop-down, set the date, write the note, upload the before and after photos (straight from the camera roll), switch on "Client has signed written consent" only when marketing has the form, and save. Pages CMS saves to GitHub, and the site republishes in a minute or two. Its settings are `.pages.yml`, which is made by `scripts/cms-config.mjs` (it runs at the end of `npm run build:treatments`, so the treatment drop-down stays in step with the menu workbook). Don't edit `.pages.yml` by hand.
- First time only: Pages CMS asks to install its GitHub app on the `feisty171/marychia` repo; allow it.

**Photo folders (optional):** to keep things tidy, put each result's before and after photos together in their own folder inside `src/assets/results/`, e.g. `src/assets/results/five-element-2026-11/before.jpg` and `after.jpg`. Make a folder only when there's a result for it.

**By hand (on a computer):**
1. Make a folder for the result in `src/assets/results/` (e.g. `five-element-2026-11`) and drop the before and after photos in as they are: JPG, PNG or WebP, any size, any file name.
2. Copy a file in `src/data/results/`, rename it (e.g. `2026-11-24-five-element.json`) and fill it in, with the folder name in front of each photo:

```json
{
  "treatment": "Five Element Body Wellness Therapy",
  "date": "2026-11-24",
  "note": "After 4 sessions",
  "before": "five-element-2026-11/before.jpg",
  "after": "five-element-2026-11/after.jpg",
  "consent": true
}
```

Rules for both ways:
- `treatment` is the name as it appears on the Treatments page (or its ID from `src/data/treatment-menu.json`; capitals and spacing don't matter). Its Face/Body/Wellness filter and link fill in automatically.
- `date` sets the order: newest first.
- Photos: the build makes web-sized WebP copies automatically (800 px wide for before/after, 1600 px for one combined picture), so nothing needs resizing or converting. iPhone HEIC files must be JPG (uploading through a phone browser usually converts them). Portrait before/after photos with the same framing and lighting look best; the cards crop them to 4:5. `before` / `after` can be a path inside `src/assets/results/` like `five-element-2026-11/before.jpg`, just the file name if no other photo has that name, or the `src/assets/results/…` path Pages CMS writes. A full path like `/images/results/x.webp` still means a file in `public/` and is used as it is.
- For one combined picture, use `image` instead of `before` and `after`.
- `alt` is optional; without it the photos are described as "Client before and after <treatment>".
- **Photos only show when `consent` is true.** While it's false, the slot shows "Awaiting consent" instead of the photo. Never set it to true until marketing confirms the signed consent.
- `note` must be factual: no kg or cm lost, no "permanent", no medical claims, no "guaranteed".
- A treatment name that doesn't match, or a photo that isn't in the folder, **stops the build** with a message naming the problem (suggesting the right treatment names or listing the photos in the folder). On GitHub the live site simply stays as it was until it's fixed.
- The six example results (empty photos, `[[CONFIRM: ...]]` notes, dated January 2026) are placeholders: replace or delete them.

### Shop page (/shop/) and product pages (/shop/<product>/)
The nav's "Shop" link opens `/shop/` (`src/pages/shop.astro`), laid out like a magazine: one full-width "spread" per brand, with a big bold uppercase brand title (the same poster type as the Home "Find a treatment" heading), a "01 / 03" index and the product count. `brands:` in `src/content/shop.md` sets the order, an optional `line` under the title, and each brand's `layout`: `left` (title left, products right), `right` (products left, title right, on a grey band), `center` (title above, centred) or `corner` (Lucent: a 4-column grid, three cards then two, with a big two-line title, e.g. "LUCENT" in rose over "COLLECTION", filling the bottom-right corner; `heading` sets the words, `*asterisks*` = the rose line). `order` lists product IDs to set the card order. In `corner`, phones and tablets show the title above the cards. Phones and tablets always show the title above. Styles: "Brand spreads" in `public/css/shop.css`. Each card shows the photo, series label (rose), product name (bold uppercase), one line of the short description and the price (Shop prices show as "$399", without the "S"; the WhatsApp order message keeps "S$") (`src/components/ShopCard.astro`). Tapping a card opens its product page, `/shop/<id>/` (`src/pages/shop/[id].astro`, one page per product, made automatically): photo on the left; breadcrumb, brand, name, price, type · size, short description and "Order on WhatsApp" (the studio picker, message e.g. "Hi Mary Chia, I would like to order Lucent Eye Complex (30ml · S$269) at Goldhill, Novena.") on the right; then tap-to-open sections: About this product (the long description, open by default), How to use, Ingredients, Product information (brand, type, size, skin type, made in, dimensions, weight, barcode). Below: "More from <brand>". Labels are in `src/content/shop.md`; styles in `public/css/shop.css`.
- **Products come from the KrisShop product sheet** ("Material Creation Form (MCF)" tab). Run `npm run build:products -- "path/to/sheet.xlsx"`; it writes `src/data/products.json` and copies only customer-facing columns: brand, full product name, size (from the 60-character name), Item Sub Category, KRISSHOP RSP (price), Short Product Description, Product Story / Long Description (split into headings, paragraphs and lists; its "MADE IN", "Net weight" and "For all skin type" lines move to Product information), Usage, Ingredients, Country of Manufacture, Unit size and weight, Barcode. Cost, margin, vendor, order and shipping columns are never read. Keep the sheet itself out of git. The example row (SN 0) is skipped.
- **New "panel" card (JUVE Stem Cell Activator and the five Lucent products so far):** a product with `"cardTitle"` (short name, shown in capitals) and `"cardLine"` (a few words) in `src/data/products.json` gets the new card: the 1080×1280 photo is the whole card (rounded corners, soft shadow), with the title and price in one row and the short line under it, on the plain bottom of the photo. On small cards (phones) the price drops under the title and the photo shrinks a little. Hovering the card (mouse) or tabbing to it fades the words out and a white "BUY NOW - $399" pill in (`buyLabel` in `src/content/shop.md`); touch screens keep the words. The photo needs a plain, light background with empty space in its bottom fifth. Styles: "Panel card" in `public/css/shop.css`; the rerun script keeps `cardTitle` and `cardLine`. Until its photo arrives, a placeholder fills the panel. Other products keep the older card until they get these fields.
- **Photos:** put them in `public/images/shop/` (portrait, 1080×1280; the cards and product pages show that shape with rounded corners) and set `"image"` for that product in `src/data/products.json`; rerunning the script keeps it. Until then a placeholder shows.
- The product descriptions are the brand's own copy. Check them against the compliance rules (no guaranteed results, no medical claims) before launch.

### Contact Us page
- **Our Location:** the label ("Our Location") and title ("Visit a studio") are in `src/content/contact.md` (`locations:` → `eyebrow`, `heading`, optional `lede`); the studio cards (map, address, phones, WhatsApp, hours, directions) come from `src/data/outlets.json`.
- The page starts with Our Location, then Feedback / Enquiry.
- **Career** has its own page at `/careers/` (linked from the Contact Us dropdown). Edit `src/content/careers.md`. Set `apply` to the careers email or application link to turn on the "Apply now" button.
- **Feedback / Enquiry:** the topics in the drop-down are under `enquiry: topics:`. The form opens the visitor's email app addressed to `email` in `src/data/site.json`, with the topic in the subject line.
