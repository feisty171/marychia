/* Mary Chia — Contact Us page: studio map highlights, count-up stats, enquiry form */
(function () {
  "use strict";

  /* ---- Map: hovering a studio highlights it on the map and in the list ---- */
  function hi(key, on) {
    document.querySelectorAll('[data-m="' + key + '"]').forEach(function (el) { el.classList.toggle("hi", on); });
  }
  var nodes = document.querySelectorAll(".nd, .mlist li");
  var home = nodes.length ? nodes[0].dataset.m : null;
  nodes.forEach(function (el) {
    el.addEventListener("mouseenter", function () { if (home) hi(home, false); hi(el.dataset.m, true); });
    el.addEventListener("mouseleave", function () { hi(el.dataset.m, false); if (home) hi(home, true); });
  });
  // Clicking a map pin jumps to that studio's contact card
  document.querySelectorAll(".nd").forEach(function (el) {
    function go() {
      var card = document.getElementById("studio-" + el.dataset.m);
      if (card) card.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    el.addEventListener("click", go);
    el.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
  });

  /* ---- Count-up stats ---- */
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".st__v[data-count]").forEach(function (el) {
      new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          obs.unobserve(e.target);
          var end = +e.target.dataset.count, suf = e.target.dataset.suffix || "", t0 = null;
          function tick(t) {
            t0 = t0 || t;
            var k = Math.min((t - t0) / 900, 1);
            e.target.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))) + suf;
            if (k < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
      }, { threshold: 0.6 }).observe(el);
    });
  }

  /* ---- Contact form: opens the visitor's email app with the message filled in ---- */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var to = form.dataset.email;
      if (!to || !form.reportValidity()) return;
      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var msg = form.elements.message.value.trim();
      var topic = form.elements.topic ? form.elements.topic.value : "Website enquiry";
      var subject = encodeURIComponent(topic + " from " + name);
      var body = encodeURIComponent("Topic: " + topic + "\nName: " + name + "\nEmail: " + email + "\n\nMessage:\n" + msg);
      window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + body;
    });
  }
})();
