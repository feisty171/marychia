/* Mary Chia — Home page motion (editorial design)
   - Hero: --hp on .ed-hero goes 0 → 1 as it scrolls away (parallax on the photos).
   - [data-reveal]: sections fade and rise in as they reach the screen
     ("wipe" opens like a curtain, "stagger" brings the children in one by one).
   - [data-speed]: photos drift at their own pace while on screen (e.g. -0.06 or 0.1).
   - Signature list: the big photo beside the list follows the row you're on / hovering.
   Styles: public/css/home.css. Visitors with "reduce motion" on see everything still. */
(function () {
  "use strict";
  var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.documentElement;

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll("[data-reveal]");
  if (!still && "IntersectionObserver" in window) {
    root.classList.add("motion");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---- Scroll-linked: hero parallax + drifting photos ---- */
  var hero = document.querySelector(".ed-hero");
  var drifters = Array.prototype.slice.call(document.querySelectorAll("[data-speed]"));
  var ticking = false;
  function onScroll() {
    ticking = false;
    var vh = window.innerHeight || 1;
    if (hero) {
      var p = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight || 1)));
      hero.style.setProperty("--hp", p.toFixed(3));
    }
    drifters.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      // 0 when the photo's centre is mid-screen
      var off = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.speed || 0);
      el.style.setProperty("--drift", off.toFixed(1) + "px");
    });
  }
  if (!still) {
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
    }, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  }

  /* ---- Signature list: big photo follows the active row ---- */
  var rows = Array.prototype.slice.call(document.querySelectorAll(".sig-row"));
  var imgs = document.querySelectorAll(".sig-stage__img");
  var now = document.querySelector(".sig-stage__now");
  if (rows.length && imgs.length) {
    var active = -1, hovering = false;
    var setActive = function (i) {
      if (i === active) return;
      active = i;
      imgs.forEach(function (im, k) { im.classList.toggle("is-on", k === i); });
      rows.forEach(function (r, k) { r.classList.toggle("is-on", k === i); });
      if (now) now.textContent = String(i + 1).padStart(2, "0");
    };
    rows.forEach(function (r, i) {
      r.addEventListener("mouseenter", function () { hovering = true; setActive(i); });
      r.addEventListener("mouseleave", function () { hovering = false; });
      r.addEventListener("focusin", function () { setActive(i); });
    });
    // While scrolling (and not hovering), the row nearest the middle of the screen is active
    var wide = window.matchMedia("(min-width: 961px)");
    var pick = function () {
      if (hovering || !wide.matches) return;
      var mid = window.innerHeight * 0.5, best = 0, bestD = Infinity;
      rows.forEach(function (r, i) {
        var b = r.getBoundingClientRect();
        var d = Math.abs((b.top + b.bottom) / 2 - mid);
        if (d < bestD) { bestD = d; best = i; }
      });
      setActive(best);
    };
    var pt = false;
    window.addEventListener("scroll", function () {
      if (!pt) { pt = true; requestAnimationFrame(function () { pt = false; pick(); }); }
    }, { passive: true });
    setActive(0);
  }
})();
