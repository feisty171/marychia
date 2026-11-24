/* Mary Chia — shared by two pages (from mary-chia-treatments-page.zip):
   - (the /treatments/ page was removed; the Face / Body / Wellness tiles are built by src/components/CategoryTiles.astro)
   - /rituals/     the treatment list: search, filters, session picker and WhatsApp booking sheet
   Each part only runs when its elements are on the page. */

/* Data comes from the page: treatments, concerns and collections from the menu workbook
   (src/data/treatment-menu.json, made by `npm run build:treatments`), page settings from
   src/data/treatments.json, studios from outlets.json. Edit those, not this script. */
const DATA = JSON.parse(document.getElementById("tp-data").textContent);
const CONFIG = DATA.config;
const SITE_IMAGES = DATA.siteImages;
const STUDIOS = DATA.studios;
const TREATMENTS = DATA.treatments;

/* ==========================================================================
   App logic (no edits needed below)
   ========================================================================== */
const CATEGORIES = ["All", "Face", "Body", "Wellness"];
const SUGGESTIONS = ["hydration", "lift", "acne", "cellulite", "aches", "detox"];
const FILTERS = DATA.filters || { concerns: [], durations: [] };
const PAGE_SIZE = 12; // cards shown before "Show more"
// Rituals page filters. area = "All" | "Face" | "Body" | "Wellness" (kept in the URL as ?area=face)
// trial: Budget is on "First trial". lo / hi: the price slider's handles, as steps in PRICE_STEPS (hi null = the top).
const state = { q: "", area: "All", concerns: new Set(), trial: false, lo: 0, hi: null, times: new Set(), colls: new Set() };

const $ = s => document.querySelector(s);
const grid = $("#grid"), empty = $("#empty"), status = $("#status"), search = $("#search");
const fmt = n => CONFIG.currency + n.toLocaleString("en-SG");
const fmtMins = m => m >= 60 ? `${Math.floor(m/60)} hr${m%60 ? " " + (m%60) + " min" : ""}` : `${m} min`;
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9&+ ]+/g, " ").replace(/\s+/g, " ").trim();

// Pre-build a search index per treatment: its name, plus each concern's label and search words
const CONCERN_BY_ID = Object.fromEntries(FILTERS.concerns.map(c => [c.id, c]));
TREATMENTS.forEach(t => {
  const cs = (t.concerns || []).map(id => CONCERN_BY_ID[id]).filter(Boolean);
  t._hay = norm([t.name, ...cs.map(c => c.label + " " + (c.search || ""))].join(" "));
});

// ---------- Filter matching ----------
const inRange = (n, r) => n != null && n >= r.min && (r.max == null || n <= r.max);
const collectionsOf = t => t.collection ? [t.collection] : [];
// Budget: the price on the card ("from"), or the first-trial price when Budget is on "First trial".
// The slider's steps are every price on the site, cheapest to most expensive, so the handles
// move evenly through real prices instead of bunching up at the cheap end.
const priceOf = (t, trial) => trial ? t.trialPrice : t.from;
const stepsFor = trial => [...new Set(TREATMENTS.map(t => priceOf(t, trial)).filter(n => n != null))].sort((a, b) => a - b);
const PRICE_STEPS = { all: stepsFor(false), trial: stepsFor(true) };
const stepsOf = s => PRICE_STEPS[s.trial ? "trial" : "all"];
const hiOf = s => s.hi == null ? stepsOf(s).length - 1 : s.hi;
const priceNarrowed = s => s.lo > 0 || hiOf(s) < stepsOf(s).length - 1;
// First trial: has a first-trial price. Time: any of its session lengths.
// While the slider is at full width every treatment fits, including "Quoted per case" ones.
function sessionFits(t, s) {
  const times = FILTERS.durations.filter(d => s.times.has(d.id));
  if (s.trial && t.trialPrice == null) return false;
  if (priceNarrowed(s)) {
    const p = priceOf(t, s.trial), steps = stepsOf(s);
    if (p == null || p < steps[s.lo] || p > steps[hiOf(s)]) return false;
  }
  return !times.length || times.some(d => t.minutes.some(m => inRange(m, d)));
}
function textMatch(t, q) {
  q = norm(q);
  if (!q) return true;
  if (t._hay.includes(q)) return true;                          // phrase match, e.g. "deep tissue"
  return q.split(" ").every(w => t._hay.includes(w) || (w.length > 4 && t._hay.includes(w.slice(0, -1)))); // every word, forgiving plurals
}
// `s` lets the counts ask "what if" (e.g. another area) without changing the real state.
function matches(t, s = state) {
  if (s.area !== "All" && t.category !== s.area) return false;
  if (s.concerns.size && !(t.concerns || []).some(c => s.concerns.has(c))) return false;
  if (s.colls.size && !collectionsOf(t).some(c => s.colls.has(c))) return false;
  if (!sessionFits(t, s)) return false;
  return textMatch(t, s.q);
}

// ---------- Images & placeholders ----------
const ICONS = {
  // simple line icons used inside placeholders
  Face: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1"><path d="M12 3c-3.6 0-6 2.9-6 6.8 0 4.6 2.8 8.7 6 10.2 3.2-1.5 6-5.6 6-10.2C18 5.9 15.6 3 12 3Z"/><path d="M9.3 10.2h.01M14.7 10.2h.01M10 14.6c1.2.8 2.8.8 4 0"/></svg>',
  Body: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1"><path d="M3 15c3-1 4.5-3.5 9-3.5S18 14 21 15"/><path d="M5 18.5c2.4-.7 3.8-2 7-2s4.6 1.3 7 2"/><circle cx="12" cy="6.5" r="2.5"/></svg>',
  Wellness: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1"><path d="M12 21c-4-2.5-7-5.6-7-9.5C5 8 7.2 6 9.6 6c1 0 1.8.4 2.4 1 .6-.6 1.4-1 2.4-1C16.8 6 19 8 19 11.5c0 3.9-3 7-7 9.5Z"/><path d="M12 3v3M8.5 12.5c1 1.2 2.2 1.8 3.5 1.8s2.5-.6 3.5-1.8"/></svg>',
};
const treatmentSrc = t => !t.image ? "" : /^(https?:)?\/\//.test(t.image) || t.image.startsWith("/") ? t.image : CONFIG.treatmentImageBase + t.image;
function placeholderHTML(cat, hint) {
  return `<div class="ph" data-cat="${cat}" aria-hidden="true"><div class="ph-inner"><span class="ph-icon">${ICONS[cat] || ICONS.Wellness}</span>${hint ? `<span class="ph-hint">${esc(hint)}</span>` : ""}</div></div>`;
}
function mediaHTML(src, cat, alt, hint) {
  if (!src) return placeholderHTML(cat, hint);
  // if the file is missing, fall back to the placeholder automatically
  return `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async" data-cat="${cat}" data-hint="${esc(hint)}" onerror="this.outerHTML=placeholderHTML(this.dataset.cat,this.dataset.hint);this.closest('.tile')&&this.closest('.tile').classList.add('is-ph')">`;
}
if (CONFIG.showPlaceholderHints) document.getElementById("tp").classList.add("show-hints");

// Category tiles: built in src/components/CategoryTiles.astro (Treatments + Home pages)

// Ribbon flourish above the tiles: draw it in once it scrolls into view
const ribbon = document.querySelector(".svc-ribbon");
if (ribbon) {
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) ribbon.classList.add("is-drawn");
  else new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) { ribbon.classList.add("is-drawn"); obs.disconnect(); }
  }, { threshold: 0.4 }).observe(ribbon);
}

// ---------- PDF links ----------
document.querySelectorAll(".js-pdf").forEach(a => a.href = CONFIG.pdfPath);
document.querySelectorAll(".js-pdf-dl").forEach(a => { a.href = CONFIG.pdfPath; a.setAttribute("download", CONFIG.pdfDownloadName); });

// ---------- Everything below is the treatment list (Rituals page only) ----------
if (grid) {

// ---------- Filter sidebar (desktop) / Filters sheet (phones) ----------
const fl = $("#filters"), flBody = fl.querySelector(".fl-body");
const areaEl = $("#flArea"), concernsEl = $("#flConcerns"), moreBtn = $("#flMore");
const modeEl = $("#flPriceMode"), priceVal = $("#flPriceVal"), barsEl = $("#flBars"), fillEl = $("#flFill");
const loIn = $("#flPriceMin"), hiIn = $("#flPriceMax");
const timeEl = $("#flTime");
const collBtn = $("#flCollBtn"), collEl = $("#flColl"), collText = $("#flCollText");
const clearBtn = $("#flClear"), applyBtn = $("#flApply"), openBtn = $("#flOpen"), openN = $("#flOpenN");
let moreOpen = false;
let shownCount = PAGE_SIZE;

const concernById = CONCERN_BY_ID;
const ALL_COLLECTIONS = [...new Set([...(DATA.collections || []), ...TREATMENTS.flatMap(collectionsOf)])]
  .filter(c => TREATMENTS.some(t => collectionsOf(t).includes(c)));
const copyState = (over = {}) => ({ ...state, concerns: new Set(state.concerns), times: new Set(state.times), colls: new Set(state.colls), ...over });

// Concerns listed for an area: only ones with at least one treatment there, in the order of the
// workbook's Concerns tab. The shortlist (shown before "+ N more") is the concerns with an
// "Order in its area shortlist" number (on "All": "Order in All shortlist"), in that order.
const shortOrder = (c, area) => area === "All" ? c.orderAll : (c.area === area ? c.orderArea : null);
function concernsFor(area) {
  const pool = TREATMENTS.filter(t => area === "All" || t.category === area);
  const has = id => pool.some(t => (t.concerns || []).includes(id));
  const list = FILTERS.concerns.filter(c => has(c.id));
  const short = list.filter(c => shortOrder(c, area) != null).sort((a, b) => shortOrder(a, area) - shortOrder(b, area));
  return { all: [...short, ...list.filter(c => !short.includes(c))].map(c => c.id), short: short.map(c => c.id) };
}

// Area: segmented control
CATEGORIES.forEach(c => {
  const b = document.createElement("button");
  b.type = "button"; b.className = "seg-btn"; b.dataset.area = c;
  b.innerHTML = `${c}<span class="seg-n"></span>`;
  b.addEventListener("click", () => setArea(c));
  areaEl.appendChild(b);
});
function setArea(a, opts = {}) {
  state.area = a;
  // Drop ticked concerns that this area doesn't list, so no hidden filter stays on
  const allowed = new Set(concernsFor(a).all);
  [...state.concerns].forEach(id => { if (!allowed.has(id)) state.concerns.delete(id); });
  moreOpen = false;
  if (!opts.silent) writeUrl();
  update(true);
}

// Concerns: checkboxes, the shortlist + "+ N more concerns". Ticked ones always stay visible.
function drawConcerns() {
  const { all: list, short } = concernsFor(state.area);
  const shown = moreOpen ? list : list.filter(id => short.includes(id) || state.concerns.has(id));
  concernsEl.innerHTML = shown.map(id => `
    <label class="check"><input type="checkbox" value="${id}"${state.concerns.has(id) ? " checked" : ""}><span>${esc(concernById[id].label)}</span></label>`).join("");
  const hidden = list.length - shown.length;
  moreBtn.hidden = list.length === short.length;
  moreBtn.setAttribute("aria-expanded", String(moreOpen));
  moreBtn.textContent = moreOpen ? "− Fewer concerns" : `+ ${hidden} more concern${hidden === 1 ? "" : "s"}`;
  if (!moreOpen && hidden === 0) moreBtn.hidden = true;
}
concernsEl.addEventListener("change", e => {
  const cb = e.target.closest("input[type=checkbox]"); if (!cb) return;
  cb.checked ? state.concerns.add(cb.value) : state.concerns.delete(cb.value);
  update(true, { keepConcerns: true });
});
moreBtn.addEventListener("click", () => { moreOpen = !moreOpen; drawConcerns(); });

// Budget: "All prices / First trial" switch. Switching resets the slider to the full range.
modeEl.addEventListener("click", e => {
  const b = e.target.closest(".seg-btn"); if (!b) return;
  const trial = b.dataset.mode === "trial";
  if (trial === state.trial) return;
  state.trial = trial; state.lo = 0; state.hi = null;
  update(true);
});
// Budget: two-handle slider. The handles can't cross; the list updates as you drag.
let dragTimer;
function onSlide(e) {
  let lo = +loIn.value, hi = +hiIn.value;
  if (lo > hi) { if (e.target === loIn) lo = hi; else hi = lo; }
  loIn.value = lo; hiIn.value = hi;
  state.lo = lo; state.hi = hi === stepsOf(state).length - 1 ? null : hi;
  drawPrice();
  clearTimeout(dragTimer);
  dragTimer = setTimeout(() => update(false, { keepConcerns: true }), 60);
}
loIn.addEventListener("input", onSlide); hiIn.addEventListener("input", onSlide);
// The handle nearest the pointer goes on top, so either one can be grabbed when they meet
$("#flRange").addEventListener("pointerdown", e => {
  const r = loIn.getBoundingClientRect(), max = +loIn.max || 1;
  const at = (e.clientX - r.left) / r.width * max;
  const nearLo = Math.abs(at - loIn.value) <= Math.abs(at - hiIn.value);
  loIn.style.zIndex = nearLo ? 3 : 2; hiIn.style.zIndex = nearLo ? 2 : 3;
});
// Draw the slider, its fill, the price label and the bars (how many treatments at each price,
// counting the other filters but not the budget itself)
function drawPrice() {
  const steps = stepsOf(state), last = steps.length - 1, hi = hiOf(state);
  loIn.max = hiIn.max = last; loIn.value = state.lo; hiIn.value = hi;
  loIn.setAttribute("aria-valuetext", fmt(steps[state.lo])); hiIn.setAttribute("aria-valuetext", fmt(steps[hi]));
  const pct = i => last ? i / last * 100 : 0;
  fillEl.style.left = pct(state.lo) + "%"; fillEl.style.right = (100 - pct(hi)) + "%";
  priceVal.textContent = !priceNarrowed(state) ? "Any" : state.lo === hi ? fmt(steps[hi]) : `${fmt(steps[state.lo])} – ${fmt(steps[hi])}`;
  $("#flPriceLo").textContent = fmt(steps[0]); $("#flPriceHi").textContent = fmt(steps[last]);
  const pool = TREATMENTS.filter(t => matches(t, copyState({ lo: 0, hi: null })));
  const counts = steps.map(p => pool.filter(t => priceOf(t, state.trial) === p).length);
  const top = Math.max(1, ...counts);
  barsEl.style.setProperty("--n", steps.length);
  barsEl.innerHTML = counts.map((c, i) =>
    `<span class="range__bar${i >= state.lo && i <= hi ? " is-in" : ""}" style="--h:${c ? Math.max(12, c / top * 100) : 4}%"></span>`).join("");
}

// Time: pill toggles
function drawPills(el, items, set) {
  el.innerHTML = items.map(x => `<button type="button" class="pill" data-id="${x.id}" aria-pressed="${set.has(x.id)}">${esc(x.label)}</button>`).join("");
}
function wirePills(el, set) {
  el.addEventListener("click", e => {
    const b = e.target.closest(".pill"); if (!b) return;
    set.has(b.dataset.id) ? set.delete(b.dataset.id) : set.add(b.dataset.id);
    b.setAttribute("aria-pressed", String(set.has(b.dataset.id)));
    update(true, { keepPills: true });
  });
}
drawPills(timeEl, FILTERS.durations, state.times); wirePills(timeEl, state.times);

// Collection: collapsed under a "Collection +" button
collEl.innerHTML = ALL_COLLECTIONS.map(c => `
  <label class="check"><input type="checkbox" value="${esc(c)}"><span>${esc(c)}</span></label>`).join("");
if (!ALL_COLLECTIONS.length) collBtn.closest(".fl-group").hidden = true;
collBtn.addEventListener("click", () => {
  const open = collBtn.getAttribute("aria-expanded") !== "true";
  collBtn.setAttribute("aria-expanded", String(open));
  collEl.hidden = !open;
});
collEl.addEventListener("change", e => {
  const cb = e.target.closest("input[type=checkbox]"); if (!cb) return;
  cb.checked ? state.colls.add(cb.value) : state.colls.delete(cb.value);
  update(true);
});

function activeCount() {
  return (state.area !== "All" ? 1 : 0) + state.concerns.size + (state.trial ? 1 : 0) + (priceNarrowed(state) ? 1 : 0) + state.times.size + state.colls.size;
}
function clearFilters() {
  state.area = "All"; state.concerns.clear(); state.trial = false; state.lo = 0; state.hi = null;
  state.times.clear(); state.colls.clear(); moreOpen = false;
  collEl.querySelectorAll("input").forEach(cb => cb.checked = false);
  drawPills(timeEl, FILTERS.durations, state.times);
  writeUrl();
  update(true);
}
clearBtn.addEventListener("click", clearFilters);

// Redraw the sidebar to match the state
function drawSidebar(opts = {}) {
  areaEl.querySelectorAll(".seg-btn").forEach(b => {
    b.setAttribute("aria-pressed", String(b.dataset.area === state.area));
    b.querySelector(".seg-n").textContent = TREATMENTS.filter(t => matches(t, copyState({ area: b.dataset.area }))).length;
  });
  if (!opts.keepConcerns) drawConcerns();

  // Budget: each side of the switch shows how many treatments it would give with the other filters
  const modeN = trial => TREATMENTS.filter(t => matches(t, copyState({ trial, lo: 0, hi: null }))).length;
  modeEl.querySelectorAll(".seg-btn").forEach(b => {
    const trial = b.dataset.mode === "trial";
    b.setAttribute("aria-pressed", String(trial === state.trial));
    b.querySelector(".seg-n").textContent = modeN(trial);
  });
  drawPrice();

  const nColl = state.colls.size;
  collText.textContent = nColl ? `Collection (${nColl})` : "Collection";

  const n = activeCount();
  clearBtn.hidden = n === 0;
  openN.hidden = n === 0; openN.textContent = n;
  openBtn.setAttribute("aria-label", n ? `Filters, ${n} on` : "Filters");
}

// ---------- URL: ?area=face (older #face links still work) ----------
function areaFromUrl() {
  const q = (new URLSearchParams(location.search).get("area") || location.hash.replace("#", "")).toLowerCase();
  return CATEGORIES.find(c => c.toLowerCase() === q) || "All";
}
function writeUrl() {
  const p = new URLSearchParams(location.search);
  state.area === "All" ? p.delete("area") : p.set("area", state.area.toLowerCase());
  const qs = p.toString();
  try { history.replaceState(null, "", location.pathname + (qs ? "?" + qs : "")); } catch (e) {}
}

// ---------- Cards ----------
// One standard card for every treatment (all filters, all screen sizes):
//   photo · title · description (3 lines, space kept even when empty) · divider ·
//   price block (row 1 "FROM · 60 MIN" + "FIRST TRIAL" pill; row 2 the price) · Book Now.
// The price block always shows the shortest duration with the cheapest price:
// the first-trial price if there is one (regular price crossed out next to it), otherwise
// the regular "from" price; a price text (e.g. "Quoted per case") replaces the number.
// Styles: ".tp .card" in public/css/treatments.css.
const shortestMins = t => (t.minutes || []).length ? Math.min(...t.minutes) : null;
const hasTrial = t => !t.priceText && t.trialPrice != null;
function fromLine(t) {             // "From · 75 min", or just "From"
  const m = shortestMins(t);
  return m != null ? `From · ${m} min` : "From";
}
function priceBlockHTML(t) {
  const trial = hasTrial(t);
  let amount;
  if (t.priceText) amount = `<span class="card-price__text">${esc(t.priceText)}</span>`;
  else if (trial) amount = `<b>${fmt(t.trialPrice)}</b>${t.usualPrice != null && t.usualPrice > t.trialPrice ? ` <s aria-label="usual price ${fmt(t.usualPrice)}">${fmt(t.usualPrice)}</s>` : ""}`;
  else amount = t.from != null ? `<b>${fmt(t.from)}</b>` : "";
  return `
    <div class="card-price">
      <p class="card-price__top"><span>${esc(fromLine(t))}</span><span class="trial-pill"${trial ? "" : ' aria-hidden="true" data-empty'}>First trial</span></p>
      <p class="card-price__amt">${amount}</p>
    </div>`;
}
// The line used in the WhatsApp booking message, e.g. "first trial, from 75 min · S$69"
function bookingLine(t) {
  const m = shortestMins(t);
  if (t.priceText) return m != null ? `from ${m} min · ${t.priceText}` : t.priceText;
  const price = hasTrial(t) ? t.trialPrice : t.from;
  const parts = [m != null ? `from ${m} min` : "from", price != null ? fmt(price) : ""].filter(Boolean);
  return (hasTrial(t) ? "first trial, " : "") + (m != null ? parts.join(" · ") : parts.join(" "));
}
function cardHTML(t, i) {
  return `
  <article class="card" style="--i:${i}" data-id="${t.id}">
    <div class="media card-media">${mediaHTML(treatmentSrc(t), t.category, t.name, "Photo · 1200 × 900")}</div>
    <div class="card-body">
      <h3>${esc(t.name)}</h3>
      <p class="desc">${esc(t.description || "")}</p>
      ${priceBlockHTML(t)}
      <button type="button" class="btn btn-primary js-book" data-id="${t.id}">Book Now</button>
    </div>
  </article>`;
}

// "Show more": the list shows PAGE_SIZE cards, then the next PAGE_SIZE on each click.
const moreWrap = $("#moreWrap"), moreCards = $("#moreCards");
let currentList = [];
function drawMoreButton() {
  const left = currentList.length - shownCount;
  moreWrap.hidden = left <= 0;
  moreCards.setAttribute("aria-label", `Show more treatments (${left} more)`);
}
moreCards.addEventListener("click", () => {
  const from = shownCount;
  shownCount += PAGE_SIZE;
  grid.insertAdjacentHTML("beforeend", currentList.slice(from, shownCount).map((t, i) => cardHTML(t, i)).join(""));
  drawMoreButton();
  // Move keyboard focus to the first new card's Book button, so the list continues from there
  const next = grid.children[from] && grid.children[from].querySelector(".js-book");
  if (next && moreWrap.hidden) next.focus({ preventScroll: true });
});

let fadeTimer;
function update(animate, opts = {}) {
  const list = TREATMENTS.filter(t => matches(t));
  drawSidebar(opts);
  const word = n => `${n} ${n === 1 ? "treatment" : "treatments"}`;
  applyBtn.textContent = list.length ? `Show ${word(list.length)}` : "No treatments match";
  const draw = () => {
    currentList = list; shownCount = PAGE_SIZE;
    grid.innerHTML = list.slice(0, shownCount).map(cardHTML).join("");
    drawMoreButton();
    grid.classList.remove("fading");
    const none = list.length === 0;
    empty.classList.toggle("show", none);
    if (none) {
      $("#emptyMsg").innerHTML = state.q
        ? `We couldn't find anything for “<strong>${esc(state.q)}</strong>” with these filters. Try one of these:`
        : "Try removing a filter, or search for one of these:";
    }
    const where = state.area !== "All" ? ` in ${state.area}` : "";
    const more = activeCount() - (state.area !== "All" ? 1 : 0);
    status.textContent = none ? "" :
      `Showing ${word(list.length)}${where}${state.q ? ` for “${state.q}”` : ""}${more ? ` · ${more} filter${more === 1 ? "" : "s"} on` : ""}`;
  };
  clearTimeout(fadeTimer);
  if (animate && grid.children.length) { grid.classList.add("fading"); fadeTimer = setTimeout(draw, 160); }
  else draw();
}

// Book Now (event delegation)
grid.addEventListener("click", e => {
  const book = e.target.closest(".js-book");
  if (book) openSheet(book.dataset.id, book);
});

// ---------- Search ----------
let searchTimer;
search.addEventListener("input", () => {
  $("#clearSearch").classList.toggle("show", !!search.value);
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => { state.q = search.value.trim(); update(true); }, 120);
});
search.addEventListener("keydown", e => { if (e.key === "Escape" && search.value) { e.preventDefault(); clearSearch(); } });
function clearSearch() { search.value = ""; state.q = ""; $("#clearSearch").classList.remove("show"); update(true); search.focus(); }
$("#clearSearch").addEventListener("click", clearSearch);
$("#resetBtn").addEventListener("click", () => { search.value = ""; state.q = ""; $("#clearSearch").classList.remove("show"); clearFilters(); search.focus(); });
$("#suggest").innerHTML = SUGGESTIONS.map(s => `<button type="button" data-s="${s}">${s}</button>`).join("");
$("#suggest").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  search.value = b.dataset.s; $("#clearSearch").classList.add("show");
  clearFilters();
  state.q = b.dataset.s; update(true);
});

// ---------- Filters sheet (phones and tablets) ----------
// Shorter search hint on small phones, so it isn't cut off next to the Filters button
const smallMQ = matchMedia("(max-width: 480px)");
const longHint = search.placeholder;
const setHint = () => { search.placeholder = smallMQ.matches && search.dataset.shortPlaceholder ? search.dataset.shortPlaceholder : longHint; };
smallMQ.addEventListener("change", setHint); setHint();
const sheetMQ = matchMedia("(max-width: 1024px)");
const flBackdrop = $("#flBackdrop");
let flLastFocus = null;
function openFilters() {
  flLastFocus = openBtn; // return focus to the Filters button (Safari does not focus buttons on tap)
  fl.classList.add("open"); flBackdrop.classList.add("open");
  fl.setAttribute("role", "dialog"); fl.setAttribute("aria-modal", "true");
  openBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
  setTimeout(() => $("#flClose").focus(), 60);
}
function closeFilters() {
  if (!fl.classList.contains("open")) return;
  fl.classList.remove("open"); flBackdrop.classList.remove("open");
  fl.removeAttribute("role"); fl.removeAttribute("aria-modal");
  openBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
  if (flLastFocus) flLastFocus.focus();
}
openBtn.addEventListener("click", openFilters);
$("#flClose").addEventListener("click", closeFilters);
applyBtn.addEventListener("click", () => { closeFilters(); document.getElementById("menu").scrollIntoView({ behavior: "smooth" }); });
flBackdrop.addEventListener("click", closeFilters);
sheetMQ.addEventListener("change", e => { if (!e.matches) closeFilters(); });
document.addEventListener("keydown", e => {
  if (!fl.classList.contains("open")) return;
  if (e.key === "Escape") closeFilters();
  if (e.key === "Tab") { // keep focus inside the sheet
    const f = [...fl.querySelectorAll("button, input, a[href]")].filter(x => !x.hidden && x.offsetParent !== null);
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

// ---------- Booking sheet (WhatsApp) ----------
const sheet = $("#sheet");
let lastFocus = null;
function openSheet(id, trigger) {
  const t = TREATMENTS.find(x => x.id === id);
  lastFocus = trigger;
  $("#sheetTitle").textContent = t.name;
  // e.g. "Hi Mary Chia, I would like to book Hydration Booster Facial (first trial, from 75 min · S$69) at Goldhill, Novena."
  const msg = (studio) => `Hi Mary Chia, I would like to book ${t.name} (${bookingLine(t)}) at ${studio.name}.`;
  $("#studioList").innerHTML = STUDIOS.map(s => `
    <a class="studio" href="https://wa.me/${s.whatsapp}?text=${encodeURIComponent(msg(s))}" target="_blank" rel="noopener">
      <div><b>${esc(s.name)}</b><span>${esc(s.address)}</span></div>
      <svg viewBox="0 0 24 24" fill="currentColor" aria-label="WhatsApp"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.5-.3Z"/></svg>
    </a>`).join("");
  sheet.classList.add("open"); sheet.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => $("#sheetClose").focus(), 60);
}
function closeSheet() {
  sheet.classList.remove("open"); sheet.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lastFocus) lastFocus.focus();
}
$("#sheetClose").addEventListener("click", closeSheet);
sheet.addEventListener("click", e => { if (e.target === sheet) closeSheet(); });
document.addEventListener("keydown", e => {
  if (!sheet.classList.contains("open")) return;
  if (e.key === "Escape") closeSheet();
  if (e.key === "Tab") { // keep focus inside the dialog
    const f = sheet.querySelectorAll("button, a[href]"), first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

// ---------- Init (supports links like /rituals/?area=face and older /rituals/#face) ----------
addEventListener("hashchange", () => {
  const a = areaFromUrl();
  if (a !== state.area) setArea(a);
});
const startArea = areaFromUrl();
setArea(startArea, { silent: !location.hash });
if (location.hash && startArea !== "All") writeUrl(); // turn an old #face link into ?area=face
// ?q=… opens the list already searched (used by the Home "Details" buttons)
// ?trial=1 opens the list on "First trial" prices (used by the Home first-visit section)
if (new URLSearchParams(location.search).get("trial") === "1" && !state.trial) { state.trial = true; state.lo = 0; state.hi = null; update(true); }
const startQ = new URLSearchParams(location.search).get("q");
if (startQ) { search.value = startQ; $("#clearSearch").classList.add("show"); state.q = startQ.trim(); update(true); }

} // end: treatment list
