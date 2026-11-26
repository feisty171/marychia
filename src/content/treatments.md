---
# =====================================================================
#  TREATMENTS PAGE (/treatments/, the menu's "Treatments" item)
#  Every word and treatment on the page lives in this file.
#  Edit the text between the quotes. Keep the quotes and the indentation.
#  Page: src/pages/treatments.astro · styles: public/css/treatments-page.css
#  · tabs and "Read more": public/js/treatments-page.js
# =====================================================================

seo:
  title: "Treatments | Facials, Advanced Skin, Body & Wellness | Mary Chia"
  description: "Facials, advanced skin treatments and traditional body therapies at Mary Chia, with first-trial pricing for new guests."

# The rounded strip at the very top of the page ("" hides it)
promo: "First trial pricing for new guests"

# The photo banner. image: a wide photo in public/images/ (landscape, about 2400 × 1100)
hero:
  heading: "Treatments, done really well."
  image: "/images/site/hero-treatments.webp"
  imageAlt: "A calm Mary Chia treatment room"

# Labels on cards and buttons
readMore: "Read more"
readLess: "Show less"

# The tab buttons, in order. "all" shows every section except "featured";
# any other tab shows only the section with the same id.
tabs:
  - id: "featured"
    label: "Featured"
  - id: "all"
    label: "All"
  - id: "facials"
    label: "Facials"
  - id: "advanced"
    label: "Advanced Skin"
  - id: "body"
    label: "Body & Wellness"
defaultTab: "all"

# The sections. items: treatment ids from the list below, in the order to show them.
# A treatment can sit in more than one section.
sections:
  - id: "featured"
    heading: "New Treatments"
    text: "The latest additions to our menu."
    items: ["superglow", "xoskin", "pdrn"]
  - id: "facials"
    heading: "Facials"
    text: "Gentle, needle-free treatments to cleanse, hydrate and brighten."
    items: ["essential", "fairness", "juve", "lumiglow"]
  - id: "advanced"
    heading: "Advanced Skin Treatments"
    text: "Targeted care for pigmentation, sensitive skin and signs of ageing."
    items: ["porcelain", "superglow", "pigment", "xoskin", "pdrn"]
  - id: "body"
    heading: "Body & Wellness"
    text: "Traditional therapies to ease everyday aches and help you unwind."
    items: ["fe-back", "fe-lower", "fe-upper", "fe-tummy", "mud"]

# The treatments. Each one:
#   id          – a short name the sections above use
#   label       – the small red line above the name
#   name, price – price as it should show, e.g. "$148" or "By consult"
#   badge       – optional pill on the photo, e.g. "new" or "add-on"
#   description – "" hides the text and its Read more
#   duration    – the small grey line at the bottom ("" hides it)
#   image       – a photo in public/images/treatments/ (portrait 4:5 shows best; "" = placeholder)
# Keep to the compliance rules: no guaranteed or numbered results, no medical claims.
treatments:
  - id: "superglow"
    label: "Glass skin"
    name: "CLARIO Super-Glow 360"
    price: "$980"
    badge: "new"
    description: "Your fresh, dewy, glass-skin reset. Precision Dermapen microchannels infuse soluble ECM, non-crosslinked hyaluronic acid and skin-conditioning actives for a fresh, dewy glow."
    duration: "60 mins"
    image: "/images/treatments/clario-super-glow-360.webp"
  - id: "xoskin"
    label: "Anti-ageing & repair"
    name: "XO-Skin Exosomes"
    price: "$4,000"
    badge: "new"
    description: "Next-generation cellular messaging for your skin. 8 billion exosomes designed to support collagen renewal, help calm the look of irritation and strengthen the skin barrier."
    duration: ""
    image: "/images/treatments/xo-skin-exosomes.webp"
  - id: "pdrn"
    label: "Anti-ageing & repair"
    name: "PDRN Skin Therapy"
    price: "$980"
    badge: "new"
    description: "A regenerative serum of purified salmon DNA with hyaluronic acid. Helps support the skin's natural renewal and soften the look of fine lines, for skin that looks firmer and more radiant."
    duration: ""
    image: "/images/treatments/pdrn-skin-therapy.webp"
  - id: "essential"
    label: "Everyday care"
    name: "Essential Face Therapy"
    price: "$148"
    description: ""
    duration: "45 mins"
    image: ""
  - id: "fairness"
    label: "Brightening"
    name: "Customised Fairness Radiance Facial"
    price: "$148"
    description: ""
    duration: "45 mins"
    image: "/images/treatments/fairness-radiance-facial.webp"
  - id: "juve"
    label: "Firming & hydration"
    name: "JUVE Face Lift"
    price: "$280"
    description: "Intense, deep hydration that refreshes tired-looking skin. Ideal for skin that looks less firm or has facial contour concerns."
    duration: "60 mins"
    image: "/images/treatments/juve-face-lift.webp"
  - id: "lumiglow"
    label: "Glow & hydration"
    name: "CLARIO Lumiglow Booster"
    price: "$980"
    description: "A customised treatment for your skin. Choose from three boosters — deep cleansing, anti-ageing or intensive hydration — delivered needle-free to help refine texture and bring back radiance."
    duration: "60 mins"
    image: "/images/treatments/clario-lumiglow.webp"
  - id: "porcelain"
    label: "Sensitive & acne-prone skin"
    name: "CLARIO Porcelain Micro Infusion"
    price: "$980"
    description: "An advanced microneedling facial for sensitive, redness-prone and acne-prone skin. Helps soothe the look of redness, refine texture and pores, and strengthen the skin barrier for a calmer, smoother complexion."
    duration: "60 mins · No downtime"
    image: "/images/treatments/clario-porcelain-full.webp"
  - id: "pigment"
    label: "Pigmentation"
    name: "CLARIO Pigment Spot Removal"
    price: "By consult"
    description: "Designed to target pigmentation spots, with a plan personalised at your consultation. For freckles, melasma, age spots, hormonal and dermal pigmentation, and acne marks."
    duration: "Trial: 2–3 spots + one skin booster"
    image: "/images/treatments/clario-pigment-clear.webp"
  - id: "fe-back"
    label: "Aches & tension"
    name: "Five Elements Body Wellness – Back & Shoulder"
    price: "$380"
    description: "A signature vinegar blend of 15 fermented ingredients paired with warming moxibustion, cupping and guasha to ease everyday stiffness and tension, leaving skin soft and nourished."
    duration: "60 mins"
    image: "/images/treatments/five-element-body-wellness.webp"
  - id: "fe-lower"
    label: "Aches & tension"
    name: "Five Elements Body Wellness – Lower Legs"
    price: "$380"
    description: "A signature vinegar blend of 15 fermented ingredients paired with warming moxibustion, cupping and guasha to ease everyday stiffness and tension, leaving skin soft and nourished."
    duration: "60 mins"
    image: ""
  - id: "fe-upper"
    label: "Aches & tension"
    name: "Five Elements Body Wellness – Upper Legs"
    price: "$380"
    description: "A signature vinegar blend of 15 fermented ingredients paired with warming moxibustion, cupping and guasha to ease everyday stiffness and tension, leaving skin soft and nourished."
    duration: "60 mins"
    image: ""
  - id: "fe-tummy"
    label: "Aches & tension"
    name: "Five Elements Body Wellness – Tummy Slimming"
    price: "$380"
    description: "A signature vinegar blend of 15 fermented ingredients paired with warming moxibustion, cupping and guasha to ease everyday stiffness and tension, leaving skin soft and nourished."
    duration: "60 mins"
    image: ""
  - id: "mud"
    label: "Body add-on"
    name: "Mud Therapy with Thermal Blanket"
    price: "$128"
    badge: "add-on"
    description: ""
    duration: "15 mins"
    image: ""
---
