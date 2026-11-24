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

  /* ---- Guided scroll: hero → Signature treatments ----
     On wide screens (1100px+, where the hero fits one screen), one scroll down from the hero
     fades the page out and back in on Signature treatments, with its heading just under the
     menu and the whole section in view. One scroll up from that point fades back to the top.
     Phones and tablets, and "reduce motion", keep normal scrolling. */
  var services = document.getElementById("services");
  var servicesHead = services && services.querySelector(".h-split-head");
  var wideMq = window.matchMedia("(min-width: 1100px)");
  if (hero && servicesHead && !still) {
    var HEADER = 76;          // menu height once scrolled (style.css)
    var GAP = 40;             // space between the menu and the heading
    var busy = false, quietUntil = 0;
    // where the heading sits: measured from the section itself, so the heading's own
    // fade-in movement doesn't shift the landing spot
    var target = function () {
      var pad = parseFloat(getComputedStyle(services).paddingTop) || 0;
      return Math.round(services.getBoundingClientRect().top + window.scrollY + pad - HEADER - GAP);
    };
    // A soft cream veil fades in over the page, the page moves while it's covered,
    // then the veil fades away to reveal the new spot (styles: .page-fade in home.css).
    var veil = document.createElement("div");
    veil.className = "page-fade";
    veil.setAttribute("aria-hidden", "true");
    document.body.appendChild(veil);
    var FADE_OUT = 420, FADE_IN = 650;   // ms; keep in step with .page-fade in home.css
    var glide = function (to) {
      if (Math.abs(to - window.scrollY) < 4) return;
      busy = true;
      veil.classList.add("is-on");
      setTimeout(function () {
        root.style.scrollBehavior = "auto";
        window.scrollTo(0, to);
        root.style.scrollBehavior = "";
        requestAnimationFrame(function () {
          veil.classList.remove("is-on");
          setTimeout(function () { busy = false; quietUntil = Date.now() + 300; }, FADE_IN);
        });
      }, FADE_OUT);
    };
    // which way a scroll should glide from here: "down", "up" or null (normal scrolling)
    var glideFor = function (down) {
      if (!wideMq.matches || hero.offsetHeight > window.innerHeight + 40) return null;
      var y = window.scrollY, end = target();
      if (down && y < end - 4) return "down";
      if (!down && y > 0 && y <= end + 4) return "up";
      return null;
    };
    window.addEventListener("wheel", function (e) {
      if (busy || Date.now() < quietUntil) {
        // let the glide finish, and swallow the trackpad's leftover momentum
        if (window.scrollY <= target() + 4) e.preventDefault();
        if (!busy) quietUntil = Date.now() + 200;
        return;
      }
      if (Math.abs(e.deltaY) < 2 || e.ctrlKey) return;
      var dir = glideFor(e.deltaY > 0);
      if (!dir) return;
      e.preventDefault();
      glide(dir === "down" ? target() : 0);
    }, { passive: false });
    window.addEventListener("keydown", function (e) {
      if (e.target.closest && e.target.closest("input, textarea, select, [contenteditable]")) return;
      var down = e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey);
      var up = e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey);
      if (!down && !up) return;
      if (busy) { e.preventDefault(); return; }
      var dir = glideFor(down);
      if (!dir) return;
      e.preventDefault();
      glide(dir === "down" ? target() : 0);
    });
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
