/* Shop page (/shop/) motion. Styles: "Scroll motion" in public/css/shop.css.
   1. Opening banner: as you scroll away, the photo drifts down and zooms in slightly and the
      words fade up and away (sets --sp from 0 to 1 on .shop-hero; wide screens only).
   2. Brand sections: each big title rises in word by word and each card fades up as it reaches
      the screen (adds .sr, then .is-in).
   Visitors with "reduce motion" turned on see everything still. */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.documentElement.classList.add("shop-motion");

  // 1. Banner
  var hero = document.querySelector(".shop-hero");
  var wide = window.matchMedia("(min-width: 961px)");
  if (hero) {
    var ticking = false;
    var update = function () {
      ticking = false;
      if (!wide.matches) { hero.style.removeProperty("--sp"); return; }
      var h = hero.offsetHeight || 1;
      var p = Math.min(Math.max(window.scrollY / h, 0), 1);
      hero.style.setProperty("--sp", p.toFixed(3));
    };
    var onScroll = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  // 2. Brand sections: each title and each card arrives on its own as it reaches the screen.
  //    Title words rise one by one; cards that arrive together fade up one after another.
  var items = [];
  document.querySelectorAll(".shop-spread").forEach(function (s) {
    s.querySelectorAll(".shop-corner__h, .shop-spread__head").forEach(function (h) {
      h.querySelectorAll(".shop-corner__w, .shop-corner__kicker:not(.shop-corner__kicker--inline)").forEach(function (w, i) {
        w.style.setProperty("--i", i);
      });
      h.classList.add("sr"); items.push(h);
    });
    s.querySelectorAll(".shop-card").forEach(function (c) { c.classList.add("sr"); items.push(c); });
  });
  var show = function (el, k) {
    el.style.setProperty("--d", (k * 0.09).toFixed(2) + "s");
    el.classList.add("is-in");
    // once it has arrived, drop the delay so hover effects respond at once
    clearTimeout(el._done);
    el._done = setTimeout(function () { el.classList.add("is-done"); }, 1600);
  };
  if (!("IntersectionObserver" in window)) { items.forEach(function (el) { show(el, 0); }); return; }
  // Plays every time you scroll down to it: once a title or card is fully below the screen
  // again (you scrolled up past it), it resets, so scrolling down brings it in again.
  var io = new IntersectionObserver(function (entries) {
    var k = 0;
    entries.forEach(function (e) {
      if (e.isIntersecting && !e.target.classList.contains("is-in")) show(e.target, k++);
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.15 });
  var reset = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting && e.boundingClientRect.top >= e.rootBounds.bottom) {
        clearTimeout(e.target._done);
        e.target.classList.remove("is-in", "is-done");
      }
    });
  }, { threshold: 0 });
  items.forEach(function (el) { io.observe(el); reset.observe(el); });
})();
