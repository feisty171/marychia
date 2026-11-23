---
# =====================================================================
#  GALLERY / RESULTS PAGE — all the words and results on /gallery/ live in this file.
#  Edit the text between the quotes. Keep the quotes and the indentation.
#  Leave any [[CONFIRM: ...]] in place until management has approved it.
#
#  BEFORE YOU ADD A RESULT (brand and advertising rules):
#   - Only use photos of real clients who have given WRITTEN permission for them
#     to be shown on the website. Marketing keeps the signed consent form.
#   - Don't edit, filter or retouch the before or after photo.
#   - Notes must stay factual: no kg or cm lost, no "permanent", no medical claims,
#     no "guaranteed".
# =====================================================================

seo:
  title: "Gallery & Results | Mary Chia"
  description: "See results our clients have shared after their Mary Chia face, body and wellness treatments, shown with their written permission."

eyebrow: "Gallery / Results"
heading: "Results our clients *love*"   # *asterisks* = italic rose
lede: "A look at what some of our clients have experienced, shared with their permission. Every skin and body is different, so your therapist will tailor your plan to you."

# Filter buttons above the results. "All" is added automatically.
filters: ["Face", "Body", "Wellness"]

# Shown under the results.
disclaimer: "All photos are of real Mary Chia clients and are shown with their written permission. Photos are not retouched. Results vary from person to person."

cta:
  heading: "Find the ritual for *you*"
  text: "Not sure where to start? Browse our treatments, or book a first visit and our therapists will build a plan around your skin and goals."
  button: "Explore treatments"
  link: "/rituals/"

# ---------------------------------------------------------------------
#  RESULTS — one block per client result. Newest first.
#
#  treatment: the treatment's id from src/data/treatments.json (e.g. "juve-face-lift").
#             Its name, category (Face / Body / Wellness) and link fill in automatically.
#  note:      one short, factual line, e.g. "After 4 sessions over 8 weeks".
#  before / after: photo paths in public/images/results/
#             (portrait, about 800 x 1000, same framing and lighting in both).
#  image:     use INSTEAD of before/after when you have one combined picture
#             (landscape, about 1600 x 1200).
#  alt:       a short description of the photos, for screen readers.
#  consent:   set to true ONLY once marketing has the client's signed consent.
#             While it's false, the photos stay hidden and a placeholder shows.
#
#  The blocks below are EXAMPLES with empty photos. Replace or delete them.
# ---------------------------------------------------------------------
results:
  - treatment: "clario-porcelain"
    note: "[[CONFIRM: e.g. After 3 sessions over 6 weeks]]"
    before: ""
    after: ""
    alt: "Client's cheek before and after CLARIO Porcelain Skin Therapy"
    consent: false

  - treatment: "juve-face-lift"
    note: "[[CONFIRM: e.g. After 6 sessions over 8 weeks]]"
    before: ""
    after: ""
    alt: "Client's jawline before and after JUVE Face Lift Therapy"
    consent: false

  - treatment: "mc-signature-face"
    note: "[[CONFIRM: e.g. After 4 sessions]]"
    before: ""
    after: ""
    alt: "Client's skin before and after MC Signature Face Therapy"
    consent: false

  - treatment: "lpg-cellu-m6-body"
    note: "[[CONFIRM: e.g. After 10 sessions over 5 weeks]]"
    before: ""
    after: ""
    alt: "Client's thigh before and after LPG Cellu M6 Alliance"
    consent: false

  - treatment: "venus-freeze-body"
    note: "[[CONFIRM: e.g. After 6 sessions]]"
    before: ""
    after: ""
    alt: "Client's tummy before and after Venus Freeze Body Toning"
    consent: false

  - treatment: "five-elements"
    note: "[[CONFIRM: e.g. After 4 sessions]]"
    image: ""
    alt: "Client after Five Elements Signature Wellness"
    consent: false
---
