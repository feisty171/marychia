/* Pop-up full menu viewer (src/components/MenuViewer.astro).
   Opens from any link with data-menu-viewer; pages load as you scroll. */
(function () {
  var dlg = document.getElementById("menuViewer");
  if (!dlg || typeof dlg.showModal !== "function") return; // no <dialog> support: links go to /menu/
  var scroller = document.getElementById("mvScroll");
  var nowEl = document.getElementById("mvNow");
  var pages = Array.prototype.slice.call(dlg.querySelectorAll(".mv-page"));
  var current = 1, lastTrigger = null;

  // Load a page image (and the next one) when it's close to view
  function load(li) {
    if (!li) return;
    var img = li.querySelector("img");
    if (img && img.dataset.src) { img.src = img.dataset.src; delete img.dataset.src; }
  }
  var loader = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { load(e.target); load(e.target.nextElementSibling); }
    });
  }, { root: scroller, rootMargin: "800px 0px" }) : null;

  // Page counter follows the page nearest the top of the viewer
  function updateCount() {
    var top = scroller.getBoundingClientRect().top + 80, best = 1;
    pages.forEach(function (li, i) { if (li.getBoundingClientRect().top <= top) best = i + 1; });
    if (best !== current) { current = best; nowEl.textContent = current; }
  }
  var ticking = false;
  scroller.addEventListener("scroll", function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { ticking = false; updateCount(); });
  });

  function go(n) {
    n = Math.max(1, Math.min(pages.length, n));
    load(pages[n - 1]); load(pages[n]);
    // Jump straight to the page (like turning a page). Smooth scrolling inside a dialog
    // doesn't run in some browsers, so the arrows would do nothing there.
    scroller.scrollTop = pages[n - 1].offsetTop - 12;
    current = n; nowEl.textContent = n;
  }

  function open(e) {
    if (e) e.preventDefault();
    lastTrigger = e && e.currentTarget;
    load(pages[0]); load(pages[1]);
    if (loader) pages.forEach(function (li) { loader.observe(li); });
    else pages.forEach(load);
    dlg.showModal();
    document.documentElement.classList.add("mv-open");
    scroller.scrollTop = 0; current = 1; nowEl.textContent = "1";
    scroller.focus({ preventScroll: true });
  }
  function close() { dlg.close(); }
  dlg.addEventListener("close", function () {
    document.documentElement.classList.remove("mv-open");
    if (lastTrigger) lastTrigger.focus();
  });

  dlg.addEventListener("click", function (e) {
    if (e.target === dlg) { close(); return; } // click on the dimmed backdrop
    var b = e.target.closest("[data-mv]"); if (!b) return;
    if (b.dataset.mv === "close") close();
    if (b.dataset.mv === "prev") go(current - 1);
    if (b.dataset.mv === "next") go(current + 1);
  });
  dlg.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); go(current + 1); }
    if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(current - 1); }
  });

  document.querySelectorAll("[data-menu-viewer]").forEach(function (a) { a.addEventListener("click", open); });
})();
