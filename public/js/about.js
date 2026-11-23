/* Mary Chia — About Us page: scroll-driven heritage storyline */
(function () {
  "use strict";

  /* ---- Storyline: track the chapter nearest the middle of the screen ---- */
  var items = Array.prototype.slice.call(document.querySelectorAll(".sl-item"));
  var yr = document.getElementById("sl-year");
  var lb = document.getElementById("sl-label");
  var pg = document.getElementById("sl-progress");
  var media = {};
  document.querySelectorAll(".sl-media-item").forEach(function (m) { media[m.dataset.year] = m; });

  var current = null;
  var ticking = false;

  function activeIndex() {
    var ref = window.innerHeight * 0.5, best = 0, bestDist = Infinity;
    items.forEach(function (it, i) {
      var r = it.getBoundingClientRect();
      var d = Math.abs((r.top + r.bottom) / 2 - ref);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    return best;
  }

  function setActive(idx) {
    var it = items[idx];
    var year = it.dataset.year;
    if (year === current) return;
    items.forEach(function (el, i) {
      el.classList.toggle("on", i === idx);
      el.classList.toggle("past", i < idx);
    });
    if (yr) yr.textContent = year;
    if (lb) { var h3 = it.querySelector("h3"); lb.textContent = h3 ? h3.textContent : ""; }
    if (pg) pg.style.height = ((idx + 1) / items.length) * 100 + "%";
    Object.keys(media).forEach(function (k) { media[k].classList.toggle("on", k === year); });
    current = year;
  }

  if (items.length) {
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { ticking = false; setActive(activeIndex()); });
    }, { passive: true });
    setActive(activeIndex());
  }

  /* ---- Scroll fade: the opening dissolves into the page, "Our history" rises in ----
     --hp on .heritage-opening goes from 0 (top of page) to 1 (opening scrolled away).
     Styles: "Heritage opening" and "Scroll fade" in public/css/about.css. */
  var opening = document.querySelector(".heritage-opening");
  var story = document.querySelector(".storyline");
  var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (opening && !still) {
    var fadeTicking = false;
    var setFade = function () {
      fadeTicking = false;
      var h = opening.offsetHeight || 1;
      var p = Math.min(1, Math.max(0, window.scrollY / (h * 0.85)));
      opening.style.setProperty("--hp", p.toFixed(3));
    };
    window.addEventListener("scroll", function () {
      if (fadeTicking) return;
      fadeTicking = true;
      requestAnimationFrame(setFade);
    }, { passive: true });
    window.addEventListener("resize", setFade);
    setFade();
  }
  if (story && !still && "IntersectionObserver" in window) {
    story.classList.add("fade-in");
    new IntersectionObserver(function (entries, obs) {
      if (entries[0].isIntersecting) { story.classList.add("is-in"); obs.disconnect(); }
    }, { threshold: 0, rootMargin: "0px 0px -12% 0px" }).observe(story);
  }

})();
