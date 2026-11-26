/* Treatments page (/treatments/): tabs and "Read more".
   Words and treatments: src/content/treatments.md. Styles: public/css/treatments-page.css.
   - Tabs: "all" shows every section except "featured"; any other tab shows only its own section.
     The tab is kept in the link (?tab=facials). Older /rituals/?area=face links land here as
     ?area=face and open the matching tab (face → Facials, body and wellness → Body & Wellness).
   - Read more: descriptions show 2 lines; the button appears only when there's more to read. */
(function () {
  var root = document.querySelector(".tx");
  if (!root) return;
  document.documentElement.classList.add("tx-js");

  var buttons = Array.prototype.slice.call(root.querySelectorAll(".tx-card__more"));

  // ---- Tabs ----
  var tabs = Array.prototype.slice.call(root.querySelectorAll(".tx-tab"));
  var secs = Array.prototype.slice.call(root.querySelectorAll(".tx-sec"));
  var ids = tabs.map(function (t) { return t.getAttribute("data-tab"); });
  var AREA = { face: "facials", body: "body", wellness: "body" };

  function show(id, push) {
    if (ids.indexOf(id) < 0) id = root.getAttribute("data-default-tab");
    tabs.forEach(function (t) { t.setAttribute("aria-pressed", t.getAttribute("data-tab") === id ? "true" : "false"); });
    secs.forEach(function (s) {
      var sid = s.getAttribute("data-sec");
      s.hidden = id === "all" ? sid === "featured" : sid !== id;
    });
    root.setAttribute("data-tab", id);
    if (push) {
      var url = new URL(location.href);
      url.searchParams.delete("area");
      url.searchParams.set("tab", id);
      url.hash = "";
      history.replaceState(null, "", url);
    }
    fit();
  }

  tabs.forEach(function (t) {
    t.addEventListener("click", function (e) {
      e.preventDefault();
      show(t.getAttribute("data-tab"), true);
    });
  });

  var q = new URLSearchParams(location.search);
  var start = q.get("tab") || AREA[(q.get("area") || "").toLowerCase()] || (location.hash || "").slice(1);
  show(start, false);

  // ---- Read more ----
  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      var p = document.getElementById(b.getAttribute("aria-controls"));
      var open = b.getAttribute("aria-expanded") !== "true";
      p.classList.toggle("is-open", open);
      b.setAttribute("aria-expanded", open ? "true" : "false");
      b.textContent = open ? b.getAttribute("data-less") : b.getAttribute("data-more");
    });
  });
  // show the button only when the text runs past 2 lines
  function fit() {
    buttons.forEach(function (b) {
      var p = document.getElementById(b.getAttribute("aria-controls"));
      if (!p || p.offsetParent === null) return;   // in a hidden tab: checked when shown
      if (p.classList.contains("is-open")) { b.hidden = false; return; }
      b.hidden = p.scrollHeight <= p.clientHeight + 1;
    });
  }
  var t;
  window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(fit, 150); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  fit();
})();
