/* Mary Chia — shared by two pages (from mary-chia-treatments-page.zip):
   - /treatments/  Face / Body / Wellness tiles that link to the list, plus the PDF menu links
   - /rituals/     the treatment list: search, filters, session picker and WhatsApp booking sheet
   Each part only runs when its elements are on the page. */

/* Data comes from the page (built from src/data/treatments.json + outlets.json).
   Edit those files, not this script. */
const DATA = JSON.parse(document.getElementById("tp-data").textContent);
const CONFIG = DATA.config;
const SITE_IMAGES = DATA.siteImages;
const STUDIOS = DATA.studios;
const TREATMENTS = DATA.treatments;

/* ==========================================================================
   App logic (no edits needed below)
   ========================================================================== */
const CATEGORIES = ["All", "Face", "Body", "Wellness"];
const SUGGESTIONS = ["hydration", "lifting", "cellulite", "aches", "stress", "detox"];
const state = { q: "", cat: "All", selected: {} };

const $ = s => document.querySelector(s);
const grid = $("#grid"), empty = $("#empty"), status = $("#status"), search = $("#search");
const fmt = n => CONFIG.currency + n.toLocaleString("en-SG");
const fmtMins = m => m >= 60 ? `${Math.floor(m/60)} hr${m%60 ? " " + (m%60) + " min" : ""}` : `${m} min`;
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9&+ ]+/g, " ").replace(/\s+/g, " ").trim();

// Pre-build a search index per treatment
TREATMENTS.forEach(t => {
  t._hay = norm([t.name, t.category, t.for, t.description, t.tag || "", ...t.keywords, ...t.options.map(o => o.label)].join(" "));
});

function matches(t) {
  if (state.cat !== "All" && t.category !== state.cat) return false;
  const q = norm(state.q);
  if (!q) return true;
  if (t._hay.includes(q)) return true;                          // phrase match, e.g. "deep tissue"
  return q.split(" ").every(w => t._hay.includes(w) || (w.length > 4 && t._hay.includes(w.slice(0, -1)))); // every word, forgiving plurals
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

// Category tiles (Treatments page): each opens the list on /rituals/, filtered to that category
const TILE_COPY = { Face: "Glow, lift & clarity", Body: "Sculpt, tone & detox", Wellness: "Restore & unwind" };
// Each tile also shows how many treatments it holds and "from S$xx" (lowest price)
const inCat = c => TREATMENTS.filter(t => t.category === c);
const catFrom = list => fmt(Math.min(...list.flatMap(t => t.options.map(o => o.price))));
if ($("#tiles")) $("#tiles").innerHTML = ["Face", "Body", "Wellness"].map(c => {
  const list = inCat(c);
  return `
  <a class="tile${SITE_IMAGES[c] ? "" : " is-ph"}" href="/rituals/#${c.toLowerCase()}" data-cat="${c}" aria-label="Show ${c} treatments: ${list.length} treatments, from ${catFrom(list)}">
    <div class="media">${mediaHTML(SITE_IMAGES[c], c, c + " treatments", "Tile · 700 × 840")}</div>
    <div class="tile-label">
      <div class="tile-text">
        <h3>${c}</h3><small>${TILE_COPY[c]}</small>
        ${list.length ? `<p class="tile-meta">${list.length} treatments <span aria-hidden="true">·</span> from ${catFrom(list)}</p>` : ""}
      </div>
      <span class="tile-arrow" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12h14m-5-5 5 5-5 5"/></svg></span>
    </div>
  </a>`;
}).join("");

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

// ---------- Tabs ----------
const tabsEl = $("#tabs"), pill = $("#tabPill");
CATEGORIES.forEach(c => {
  const b = document.createElement("button");
  b.className = "tab"; b.type = "button"; b.dataset.cat = c;
  b.innerHTML = `${c}<span class="count"></span>`;
  b.addEventListener("click", () => setCategory(c, true));
  tabsEl.appendChild(b);
});
function movePill() {
  const active = tabsEl.querySelector('[aria-pressed="true"]');
  if (!active) return;
  pill.style.width = active.offsetWidth + "px";
  pill.style.transform = `translateX(${active.offsetLeft}px)`;
}
function updateCounts() {
  const q = state.q, cat = state.cat;
  tabsEl.querySelectorAll(".tab").forEach(b => {
    state.cat = b.dataset.cat;
    const n = TREATMENTS.filter(matches).length;
    b.querySelector(".count").textContent = n;
  });
  state.cat = cat; state.q = q;
}
function setCategory(c, fromClick) {
  state.cat = c;
  tabsEl.querySelectorAll(".tab").forEach(b => b.setAttribute("aria-pressed", b.dataset.cat === c));
  movePill();
  if (fromClick) {
    const h = c === "All" ? "" : "#" + c.toLowerCase();
    try { history.replaceState(null, "", h || location.pathname + location.search); } catch (e) {}
  }
  render(true);
}

// ---------- Cards ----------
// Cards show no sessions or durations; the price is shown as "from S$xx" (lowest option price).
const fromPrice = t => fmt(Math.min(...t.options.map(o => o.price)));
function cardHTML(t, i) {
  return `
  <article class="card" style="--i:${i}" data-id="${t.id}">
    <div class="card-top">
      <span class="badge" data-cat="${t.category}">${t.category}</span>
      ${t.tag ? `<span class="tag">${esc(t.tag)}</span>` : ""}
    </div>
    <div class="media card-media">${mediaHTML(treatmentSrc(t), t.category, t.name, "Photo · 1200 × 900")}</div>
    <div class="card-body">
    <h3>${esc(t.name)}</h3>
    <p class="for">${esc(t.for)}</p>
    <p class="desc">${esc(t.description)}</p>
    <div class="card-bottom price-row">
      <p class="from">from <b>${fromPrice(t)}</b></p>
      <button type="button" class="btn btn-primary js-book" data-id="${t.id}">Book Now</button>
    </div>
    </div>
  </article>`;
}

let fadeTimer;
function render(animate) {
  const list = TREATMENTS.filter(matches);
  updateCounts();
  const draw = () => {
    grid.innerHTML = list.map(cardHTML).join("");
    grid.classList.remove("fading");
    const none = list.length === 0;
    empty.classList.toggle("show", none);
    if (none) {
      $("#emptyMsg").innerHTML = state.q
        ? `We couldn't find anything for “<strong>${esc(state.q)}</strong>”${state.cat !== "All" ? " in " + state.cat : ""}. Try one of these:`
        : "Try one of these:";
    }
    status.textContent = none ? "" :
      `Showing ${list.length} ${list.length === 1 ? "treatment" : "treatments"}${state.cat !== "All" ? " in " + state.cat : ""}${state.q ? ` for “${state.q}”` : ""}`;
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
  searchTimer = setTimeout(() => { state.q = search.value.trim(); render(true); }, 120);
});
search.addEventListener("keydown", e => { if (e.key === "Escape" && search.value) { e.preventDefault(); clearSearch(); } });
function clearSearch() { search.value = ""; state.q = ""; $("#clearSearch").classList.remove("show"); render(true); search.focus(); }
$("#clearSearch").addEventListener("click", clearSearch);
$("#resetBtn").addEventListener("click", () => { search.value = ""; state.q = ""; $("#clearSearch").classList.remove("show"); setCategory("All", true); search.focus(); });
$("#suggest").innerHTML = SUGGESTIONS.map(s => `<button type="button" data-s="${s}">${s}</button>`).join("");
$("#suggest").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  search.value = b.dataset.s; state.q = b.dataset.s; $("#clearSearch").classList.add("show");
  state.cat = "All"; tabsEl.querySelectorAll(".tab").forEach(x => x.setAttribute("aria-pressed", x.dataset.cat === "All")); movePill();
  render(true);
});

// ---------- Booking sheet (WhatsApp) ----------
const sheet = $("#sheet");
let lastFocus = null;
function openSheet(id, trigger) {
  const t = TREATMENTS.find(x => x.id === id);
  lastFocus = trigger;
  $("#sheetTitle").textContent = t.name;
  const msg = (studio) =>
`Hi Mary Chia ${studio.name}! I'd like to book:
• Treatment: ${t.name}
Could you share your available slots? Thank you!`;
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

addEventListener("resize", movePill);

// ---------- Init (supports links like /rituals/#face) ----------
function fromHash() {
  const h = location.hash.replace("#", "").toLowerCase();
  const c = CATEGORIES.find(x => x.toLowerCase() === h);
  return c || "All";
}
addEventListener("hashchange", () => {
  const h = location.hash.replace("#", "").toLowerCase();
  const c = CATEGORIES.find(x => x.toLowerCase() === h);
  if (c && c !== state.cat) setCategory(c, false);
  // Links like /rituals/#body: jump to the list once the filter is set
  if (c) document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
});
setCategory(fromHash(), false);
if (fromHash() !== "All") requestAnimationFrame(() => document.getElementById("menu").scrollIntoView());
if (document.fonts) document.fonts.ready.then(movePill);

} // end: treatment list
