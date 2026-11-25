/* Mary Chia — "Book now" on the Home signature rows (src/components/SignatureCard.astro) and Treatments cards,
   and "Order on WhatsApp" on Shop product pages (with data-verb, e.g. "order").
   Handles the "Book on WhatsApp" sheet (cards show no sessions or prices).
   Markup: src/components/SignatureCard.astro + BookingSheet.astro. */
(function () {
  "use strict";
  var sheet = document.getElementById("bookSheet");
  var cards = document.querySelectorAll(".sig-row[data-name], .fav-card[data-name], .tp .card[data-name], .shop-product[data-name]");
  if (!cards.length) return;

  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };

  cards.forEach(function (card) {
    card.addEventListener("click", function (e) {
      var book = e.target.closest(".js-book");
      if (book) openSheet(card, book);
    });
  });

  /* ---- Booking sheet ---- */
  if (!sheet) return;
  var studios = JSON.parse(sheet.dataset.studios || "[]");
  var lastFocus = null;

  function openSheet(card, trigger) {
    var name = card.dataset.name;
    lastFocus = trigger;
    sheet.querySelector("h3").textContent = name;
    sheet.querySelector(".studios").innerHTML = studios.map(function (s) {
      // e.g. "Hi Mary Chia, I would like to book Hydration Booster Facial (first trial, from 75 min · S$69) at Goldhill, Novena."
      var line = card.dataset.line;
      var msg = "Hi Mary Chia, I would like to " + (card.dataset.verb || "book") + " " + name + (line ? " (" + line + ")" : "") + " at " + s.name + ".";
      return '<a class="studio" href="https://wa.me/' + s.whatsapp + "?text=" + encodeURIComponent(msg) + '" target="_blank" rel="noopener">' +
        "<div><b>" + esc(s.name) + "</b><span>" + esc(s.address) + "</span></div>" +
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-label="WhatsApp"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.5-.3Z"/></svg></a>';
    }).join("");
    sheet.classList.add("open");
    sheet.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setTimeout(function () { sheet.querySelector(".sheet-close").focus(); }, 60);
  }
  function closeSheet() {
    sheet.classList.remove("open");
    sheet.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  sheet.querySelector(".sheet-close").addEventListener("click", closeSheet);
  sheet.addEventListener("click", function (e) { if (e.target === sheet) closeSheet(); });
  document.addEventListener("keydown", function (e) {
    if (!sheet.classList.contains("open")) return;
    if (e.key === "Escape") closeSheet();
    if (e.key === "Tab") {
      var f = sheet.querySelectorAll("button, a[href]"), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();
