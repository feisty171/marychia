/* Mary Chia — Treatments page "Spotlight" (New & trending).
   Content comes from "trending" in src/data/treatments.json; no edits needed here.

   - Click/tap a name or use the arrow keys to switch treatments.
   - Auto-advances every few seconds with a progress line; pauses while the
     pointer is over the section, while it has keyboard focus, or when it's off screen.
     Desktop layout only; on phones visitors tap to switch.
   - No auto-advance or tilt for visitors who prefer reduced motion. */
(function () {
  "use strict";
  var root = document.getElementById("trending");
  if (!root) return;

  var items = Array.prototype.slice.call(root.querySelectorAll(".trend-item"));
  var tabs = items.map(function (it) { return it.querySelector(".trend-tab"); });
  var panels = items.map(function (it) { return it.querySelector(".trend-panel"); });
  var slides = Array.prototype.slice.call(root.querySelectorAll(".trend-slide"));
  var ghost = root.querySelector(".trend-ghost");
  var countNow = root.querySelector(".trend-count__now");
  var stage = root.querySelector(".trend-stage");
  if (items.length < 2) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Auto-advance only in the side-by-side desktop layout; on phones the list sits below the photo,
  // so opening/closing panels by itself would make the page jump while people scroll.
  var wide = window.matchMedia("(min-width: 861px)");
  var auto = function () { return !reduce && wide.matches; };
  var canHover = window.matchMedia("(hover: hover) and (min-width: 861px)").matches;
  var seconds = parseFloat(root.getAttribute("data-autoplay")) || 6;
  root.style.setProperty("--trend-dur", seconds + "s");

  var current = 0, leaveTimer = null, hovering = false, focused = false, visible = true;
  var pad = function (n) { return (n < 10 ? "0" : "") + n; };

  function show(i, opts) {
    opts = opts || {};
    i = (i + items.length) % items.length;
    if (i === current) { if (opts.focus) tabs[i].focus(); return; }
    var prev = current;
    current = i;

    items.forEach(function (it, k) {
      var on = k === i;
      it.classList.toggle("is-active", on);
      tabs[k].setAttribute("aria-selected", on ? "true" : "false");
      tabs[k].tabIndex = on ? 0 : -1;
      if (on) panels[k].removeAttribute("inert"); else panels[k].setAttribute("inert", "");
    });

    // Photo: the new one wipes up over the old one
    clearTimeout(leaveTimer);
    slides.forEach(function (s) { s.classList.remove("is-leaving"); });
    slides[prev].classList.add("is-leaving");
    slides[prev].classList.remove("is-active");
    slides[i].classList.add("is-active");
    leaveTimer = setTimeout(function () { slides[prev].classList.remove("is-leaving"); }, 950);

    // Big number + counter
    var label = pad(i + 1);
    countNow.textContent = label;
    ghost.classList.add("is-swapping");
    setTimeout(function () { ghost.textContent = label; ghost.classList.remove("is-swapping"); }, 220);

    if (opts.focus) tabs[i].focus();
    restartProgress();
  }

  // ---- Auto-advance (driven by the progress line's CSS animation) ----
  function playing() { return auto() && visible && !hovering && !focused; }
  function syncPlayState() {
    root.classList.toggle("is-playing", auto());
    root.classList.toggle("is-paused", !playing());
  }
  function restartProgress() {
    if (!auto()) return;
    var bar = items[current].querySelector(".trend-progress i");
    root.classList.remove("is-playing");
    void bar.offsetWidth; // restart the animation
    syncPlayState();
  }
  items.forEach(function (it, k) {
    it.querySelector(".trend-progress i").addEventListener("animationend", function () {
      if (k === current && playing()) show(current + 1);
    });
  });

  // ---- Interaction ----
  tabs.forEach(function (tab, k) {
    // Click/tap only: switching on hover would make the rows jump under the pointer as panels open and close
    tab.addEventListener("click", function () { show(k); });
    tab.addEventListener("keydown", function (e) {
      var next = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (next) { e.preventDefault(); show(current + next, { focus: true }); }
      else if (e.key === "Home") { e.preventDefault(); show(0, { focus: true }); }
      else if (e.key === "End") { e.preventDefault(); show(items.length - 1, { focus: true }); }
    });
  });

  root.addEventListener("mouseenter", function () { hovering = true; syncPlayState(); });
  root.addEventListener("mouseleave", function () { hovering = false; syncPlayState(); });
  root.addEventListener("focusin", function () { focused = true; syncPlayState(); });
  root.addEventListener("focusout", function (e) {
    if (!root.contains(e.relatedTarget)) { focused = false; syncPlayState(); }
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      syncPlayState();
    }, { threshold: 0.35 }).observe(root);
  }

  // ---- Gentle 3D tilt on the photo (desktop pointer only) ----
  if (!reduce && canHover && stage) {
    stage.addEventListener("mousemove", function (e) {
      var r = stage.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      stage.style.setProperty("--rx", (x * 8).toFixed(2) + "deg");
      stage.style.setProperty("--ry", (-y * 8).toFixed(2) + "deg");
    });
    stage.addEventListener("mouseleave", function () {
      stage.style.setProperty("--rx", "0deg");
      stage.style.setProperty("--ry", "0deg");
    });
  }

  if (wide.addEventListener) wide.addEventListener("change", syncPlayState);
  syncPlayState();
})();
