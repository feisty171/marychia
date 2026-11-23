/* Mary Chia — landing page interactions */
(function () {
  "use strict";

  /* ---- Header: solid background once the page scrolls ---- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Home hero: photo fades into the page and drifts as you scroll ----
     Sets --hero-p from 0 (top) to 1 (hero scrolled out); the look is in style.css (.hero::before). */
  var hero = document.querySelector(".hero");
  if (hero && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var ticking = false;
    var updateHero = function () {
      ticking = false;
      var h = hero.offsetHeight || 1;
      var p = Math.min(Math.max(window.scrollY / h, 0), 1);
      hero.style.setProperty("--hero-p", p.toFixed(3));
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(updateHero); }
    }, { passive: true });
    window.addEventListener("resize", updateHero);
    updateHero();
  }

  /* ---- Mobile menu toggle ---- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.hidden = !open;
  }
  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 960) setMenu(false);
  });

  /* ---- About Us dropdown (desktop) ----
     Opens on hover (via CSS) and on click/tap of the caret; closes on
     Escape, outside click, or when focus leaves it. */
  document.querySelectorAll("[data-dropdown]").forEach(function (item) {
    var btn = item.querySelector(".nav__caret");
    function setOpen(open) {
      item.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
    }
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      setOpen(!item.classList.contains("is-open"));
      if (item.classList.contains("is-open")) {
        var first = item.querySelector(".nav__drop-link");
        if (first) first.focus();
      }
    });
    item.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && item.classList.contains("is-open")) { setOpen(false); btn.focus(); }
      if (e.key === "ArrowDown" && document.activeElement === btn) { e.preventDefault(); btn.click(); }
    });
    item.addEventListener("focusout", function (e) {
      if (!item.contains(e.relatedTarget)) setOpen(false);
    });
    document.addEventListener("click", function (e) {
      if (!item.contains(e.target)) setOpen(false);
    });
    item.querySelectorAll(".nav__drop-link").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
  });

  /* ---- About Us group in the mobile menu ---- */
  document.querySelectorAll("[data-mobile-group]").forEach(function (group) {
    var btn = group.querySelector(".mobile-menu__toggle");
    var sub = group.querySelector(".mobile-menu__sub");
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", String(open));
      sub.hidden = !open;
    });
  });

  /* ---- Nav buttons: mark the clicked one active ----
     (Pages/sections don't exist yet; links point at #anchors for now.) */
  var links = document.querySelectorAll(".nav__link");
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      links.forEach(function (l) { l.classList.remove("is-active"); });
      link.classList.add("is-active");
    });
  });

  /* ---- Stats: count up when they scroll into view ---- */
  var nums = document.querySelectorAll(".stat__num[data-count]");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function animate(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1600;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    nums.forEach(function (n) { io.observe(n); });
  }

  /* ---- Home key figures: the "count: true" number counts up when seen ----
     Look is in home.css (.ledger). Words are in src/content/home.md → stats. */
  var ledger = document.querySelector(".ledger");
  if (ledger && !reduce && "IntersectionObserver" in window) {
    var counters = ledger.querySelectorAll("[data-count]");
    var lio = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      lio.disconnect();
      counters.forEach(function (el) {
        var target = parseInt(el.getAttribute("data-count"), 10), t0 = null;
        el.textContent = "0";
        setTimeout(function () {
          requestAnimationFrame(function step(ts) {
            if (!t0) t0 = ts;
            var p = Math.min((ts - t0) / 1800, 1);
            el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString("en-SG");
            if (p < 1) requestAnimationFrame(step);
          });
        }, 150);
      });
    }, { threshold: 0.35 });
    lio.observe(ledger);
  }
})();
