/* Mary Chia — Contact Us page: enquiry form */
(function () {
  "use strict";

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
