/* Gallery / Results page (/gallery/): Face / Body / Wellness filter buttons.
   Links like /gallery/#face open it filtered. */
(function () {
  var grid = document.getElementById("gGrid");
  if (!grid) return;
  var chips = Array.prototype.slice.call(document.querySelectorAll(".g-chip"));
  var cards = Array.prototype.slice.call(grid.querySelectorAll(".g-card"));
  var count = document.getElementById("gCount");
  var empty = document.getElementById("gEmpty");

  function apply(filter) {
    var shown = 0;
    cards.forEach(function (c) {
      var on = filter === "all" || c.dataset.cat === filter;
      c.hidden = !on;
      if (on) shown++;
    });
    chips.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.filter === filter)); });
    var label = filter === "all" ? "" : " in " + filter.charAt(0).toUpperCase() + filter.slice(1);
    if (count) count.textContent = "Showing " + shown + (shown === 1 ? " result" : " results") + label;
    if (empty) empty.hidden = shown > 0;
  }

  chips.forEach(function (b) {
    b.addEventListener("click", function () {
      apply(b.dataset.filter);
      history.replaceState(null, "", b.dataset.filter === "all" ? location.pathname : "#" + b.dataset.filter);
    });
  });

  var start = location.hash.slice(1).toLowerCase();
  if (chips.some(function (b) { return b.dataset.filter === start; })) apply(start);
})();
