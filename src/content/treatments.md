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
readMore: "read more"
readLess: "show less"

# Treatment pages (/treatments/<id>/, opened by tapping a card): buttons and section titles
backLabel: "Treatments"
bookButton: "Book on WhatsApp"
aboutLabel: "About this treatment"
benefitsLabel: "Key benefits"
infoLabel: "Treatment information"
moreLabel: "You may also like"
# The WhatsApp pop-up (pick a studio)
sheetEyebrow: "Book on WhatsApp"
sheetNote: "We'll open WhatsApp with the treatment filled in. Our team will confirm your appointment."

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
    items: ["superglow", "xoskin", "pdrn", "fe-back"]
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
    items: ["fe-back", "fe-lower", "fe-upper", "fe-tummy"]

# The treatments. Each one:
#   id          – a short name the sections above use; also the page address (/treatments/<id>/)
#   label       – the small red line above the name
#   name, price – price as it should show, e.g. "$148" or "By consult"
#   badge       – optional pill on the photo, e.g. "new" or "add-on"
#   description – the short text on the card ("" hides it and its Read more)
#   duration    – the small grey line at the bottom: only the time (e.g. "60 mins"), or "session/s" when there is none
#   image       – a photo in public/images/treatments/ (portrait 4:5 shows best; "" = placeholder)
#   category    – shown under Treatment information on its page
#   about       – the longer text on its page (a blank line starts a new paragraph; "" = uses description)
#   benefits    – the list on its page; benefitsLabel overrides the list's title (e.g. "Suitable for")
# Keep to the compliance rules: no guaranteed or numbered results, no medical claims.
treatments:
  - id: "superglow"
    label: "Glass skin"
    name: "CLARIO Super-Glow 360 Face Therapy"
    price: "$980"
    description: "Your fresh, dewy, glass-skin reset. Precision Dermapen microchannels infuse soluble ECM, non-crosslinked hyaluronic acid and skin-conditioning actives for a fresh, dewy glow."
    duration: "60 mins"
    image: "/images/treatments/clario-super-glow-360.webp"
    category: "Facial – Intense Face Therapy"
    about: |
      SUPERGLOW 360 is an advanced microchannel infusion treatment that combines precision Dermapen technology with highly active soluble ECM, non-crosslinked hyaluronic acid and skin-conditioning actives.

      New. Precision microchannel infusion for a fresh, dewy, glass-skin glow.
    benefits: []
  - id: "xoskin"
    label: "Anti-ageing & repair"
    name: "XO-Skin Exosomes"
    price: "$4,000"
    description: "Next-generation cellular messaging for your skin. 8 billion exosomes designed to support collagen renewal, help calm the look of irritation and strengthen the skin barrier."
    duration: "session/s"
    image: "/images/treatments/xo-skin-exosomes.webp"
    category: "New Collection – Prestige Series"
    about: |
      XO-SKIN is an advanced dual-vial exosome rejuvenation concentrate formulated with 8 billion lyophilised exosomes derived from adipose-derived mesenchymal stem cells (AD-MSCs). Made through pharmaceutical-grade lyophilisation and ISO-certified manufacturing, it delivers concentrated cellular signals designed to support the skin's natural renewal.

      It's designed for weakened, stressed or ageing-looking skin, with bioactive messengers that help support collagen renewal, calm the look of irritation and strengthen the skin barrier.

      Vial 1 (lyophilised powder): stem-cell derived exosomes, ASC-Media, polynucleotide, peptide complex.
      Vial 2 (diluent): hyaluronic acid, EGFs, amino acids.
    benefits:
      - "Helps boost the look of firmness and elasticity"
      - "Supports stressed, tired-looking skin"
      - "Helps calm the look of redness and sensitivity"
      - "Brightens dull-looking skin"
      - "Helps fade the look of acne marks"
      - "Helps strengthen the skin barrier"
  - id: "pdrn"
    label: "Anti-ageing & repair"
    name: "PDRN Skin Therapy"
    price: "$980"
    description: "A regenerative serum of purified salmon DNA with hyaluronic acid. Helps support the skin's natural renewal and soften the look of fine lines, for skin that looks firmer and more radiant."
    duration: "session/s"
    image: "/images/treatments/pdrn-skin-therapy.webp"
    category: "New Collection – Prestige Series"
    about: |
      PDRN is a skin-renewing ingredient that supports the skin's natural renewal and overall vitality. This serum helps smooth the look of fine lines, boost radiance and restore a firmer feel, while strengthening the skin's resilience against daily stress.

      5000 ppm PDRN (polydeoxyribonucleotide): a purified marine DNA extracted from salmon. Its DNA fragments are broken down to an ideal molecular size and are highly compatible with human skin, so they're gentle yet effective.

      + HA (hyaluronic acid): a moisture-binding ingredient that naturally exists in our skin, added to hold water and keep the skin soft, smooth and plump.
    benefits:
      - "Supports natural skin renewal"
      - "Helps improve firmness and elasticity"
      - "Helps smooth the look of fine lines"
      - "Deeply hydrates and plumps"
      - "Boosts skin radiance"
      - "Strengthens and replenishes tired-looking skin"
  - id: "essential"
    label: "Everyday care"
    name: "Essential Face Therapy"
    price: "$148"
    description: ""
    duration: "45 mins"
    image: ""
    category: "Facial – Basic Face Therapy"
    about: ""
    benefits: []
  - id: "fairness"
    label: "Brightening"
    name: "Customised Fairness Radiance Facial"
    price: "$148"
    description: ""
    duration: "45 mins"
    image: "/images/treatments/fairness-radiance-facial.webp"
    category: "Facial – Basic Face Therapy"
    about: ""
    benefits: []
  - id: "juve"
    label: "Firming & hydration"
    name: "JUVE Face Lift"
    price: "$280"
    description: "Intense, deep hydration that refreshes tired-looking skin. Ideal for skin that looks less firm or has facial contour concerns."
    duration: "60 mins"
    image: "/images/treatments/juve-face-lift.webp"
    category: "Facial – Intense Face Therapy"
    about: ""
    benefits: []
  - id: "lumiglow"
    label: "Glow & hydration"
    name: "CLARIO Lumiglow Booster Therapy"
    price: "$980"
    description: "A customised treatment for your skin. Choose from three boosters — deep cleansing, anti-ageing or intensive hydration — delivered needle-free to help refine texture and bring back radiance."
    duration: "60 mins"
    image: "/images/treatments/clario-lumiglow.webp"
    category: "Facial – Intense Face Therapy"
    about: |
      A customised treatment designed around your skin. Based on your skin's condition, one of three boosters — deep cleansing, anti-ageing or intensive hydration — is chosen for you, helping restore balance, refine texture and bring back radiance.

      Needle-free transdermal delivery (DEP): very short electrical pulses, lasting microseconds to milliseconds, open temporary channels in the skin so active ingredients can be absorbed quickly. The channels close again once the nutrients are locked in or the machine is switched off.
    benefits:
      - "Targets the look of fine lines, dehydrated and dull skin"
      - "Needle-free transdermal delivery"
      - "3 customised booster options: deep cleansing, anti-ageing or intensive hydration"
  - id: "porcelain"
    label: "Sensitive & acne-prone skin"
    name: "CLARIO Porcelain Micro Infusion Therapy"
    price: "$980"
    description: "An advanced microneedling facial for sensitive, redness-prone and acne-prone skin. Helps soothe the look of redness, refine texture and pores, and strengthen the skin barrier for a calmer, smoother complexion."
    duration: "60 mins"
    image: "/images/treatments/clario-porcelain-full.webp"
    category: "Facial – Intense Face Therapy"
    about: |
      Porcelain Skin Therapy is an advanced microneedling facial designed for sensitive, redness-prone and acne-prone skin. This gentle skin-renewal treatment helps soothe visible redness, improve uneven texture and minimise the appearance of enlarged pores, while supporting the skin's natural renewal. It also promotes hydration and helps strengthen the skin's natural barrier, for a calmer, smoother, healthier-looking complexion.

      Microneedling channel infusion: microneedling creates tiny channels in the skin, designed to support natural collagen production and help active ingredients absorb better, for skin that looks smoother, brighter and more hydrated, with refined pores.

      Recovery: skin usually looks smoother, more hydrated and radiant within a few days. No downtime, non-invasive.
    benefits:
      - "Helps soothe visible redness"
      - "Helps improve uneven skin texture"
      - "Minimises the appearance of enlarged pores"
      - "Supports the skin's natural renewal"
      - "Promotes hydration"
      - "Helps strengthen the skin's natural barrier"
      - "No downtime, non-invasive"
  - id: "pigment"
    label: "Pigmentation"
    name: "CLARIO Pigment Spot Removal"
    price: "By consult"
    description: "Designed to target pigmentation spots, with a plan personalised at your consultation. For freckles, melasma, age spots, hormonal and dermal pigmentation, and acne marks."
    duration: "session/s"
    image: "/images/treatments/clario-pigment-clear.webp"
    category: "Facial – Intense Face Therapy"
    about: |
      Designed to target pigmentation spots, with a plan personalised at your consultation. For freckles, melasma, age spots, hormonal and dermal pigmentation, and acne marks.

      First trial: 2–3 spots plus one skin booster.
    benefitsLabel: "Suitable for"
    benefits:
      - "Freckles"
      - "Melasma"
      - "Dermal pigmentation"
      - "Age spots"
      - "Hormonal pigmentation"
      - "Lead / metal pigmentation"
      - "Acne marks"
  - id: "fe-back"
    label: "Aches & tension"
    name: "Five Elements Wellness – Back and Shoulder"
    price: "$380"
    description: "A signature vinegar blend of 15 fermented ingredients paired with warming moxibustion, cupping and guasha to ease everyday stiffness and tension, leaving skin soft and nourished."
    duration: "60 mins"
    image: "/images/treatments/five-element-body-wellness.webp"
    category: "Wellness – Five Elements Wellness Therapy"
    about: |
      A body treatment that pairs a signature vinegar blend, made from 15 fermented ingredients, with traditional moxibustion and cupping. Soothing warmth from the moxibustion, combined with cupping and guasha, helps ease everyday stiffness and tension, leaving your body relaxed and your skin soft and nourished.

      Five Elements Signature Wellness: ease everyday aches and tension, soft and nourished skin, and a moment of calm.

      Key elements: 15 Botanical Essence Oil · Warming Moxibustion · 15-Ingredient Fermented Blend.
    benefits:
      - "Supports lymphatic flow"
      - "Keeps you warm and dispels cold"
      - "Helps balance qi and blood flow"
      - "Helps you relax for better sleep"
  - id: "fe-lower"
    label: "Aches & tension"
    name: "Five Elements Wellness – Lower Legs"
    price: "$380"
    description: "A signature vinegar blend of 15 fermented ingredients paired with warming moxibustion, cupping and guasha to ease everyday stiffness and tension, leaving skin soft and nourished."
    duration: "60 mins"
    image: ""
    category: "Wellness – Five Elements Wellness Therapy"
    about: |
      A body treatment that pairs a signature vinegar blend, made from 15 fermented ingredients, with traditional moxibustion and cupping. Soothing warmth from the moxibustion, combined with cupping and guasha, helps ease everyday stiffness and tension, leaving your body relaxed and your skin soft and nourished.

      Five Elements Signature Wellness: ease everyday aches and tension, soft and nourished skin, and a moment of calm.

      Key elements: 15 Botanical Essence Oil · Warming Moxibustion · 15-Ingredient Fermented Blend.
    benefits:
      - "Supports lymphatic flow"
      - "Keeps you warm and dispels cold"
      - "Helps balance qi and blood flow"
      - "Helps you relax for better sleep"
  - id: "fe-upper"
    label: "Aches & tension"
    name: "Five Elements Wellness – Upper Legs"
    price: "$380"
    description: "A signature vinegar blend of 15 fermented ingredients paired with warming moxibustion, cupping and guasha to ease everyday stiffness and tension, leaving skin soft and nourished."
    duration: "60 mins"
    image: ""
    category: "Wellness – Five Elements Wellness Therapy"
    about: |
      A body treatment that pairs a signature vinegar blend, made from 15 fermented ingredients, with traditional moxibustion and cupping. Soothing warmth from the moxibustion, combined with cupping and guasha, helps ease everyday stiffness and tension, leaving your body relaxed and your skin soft and nourished.

      Five Elements Signature Wellness: ease everyday aches and tension, soft and nourished skin, and a moment of calm.

      Key elements: 15 Botanical Essence Oil · Warming Moxibustion · 15-Ingredient Fermented Blend.
    benefits:
      - "Supports lymphatic flow"
      - "Keeps you warm and dispels cold"
      - "Helps balance qi and blood flow"
      - "Helps you relax for better sleep"
  - id: "fe-tummy"
    label: "Aches & tension"
    name: "Five Elements Wellness – Tummy Slimming"
    price: "$380"
    description: "A signature vinegar blend of 15 fermented ingredients paired with warming moxibustion, cupping and guasha to ease everyday stiffness and tension, leaving skin soft and nourished."
    duration: "60 mins"
    image: ""
    category: "Wellness – Five Elements Wellness Therapy"
    about: |
      A body treatment that pairs a signature vinegar blend, made from 15 fermented ingredients, with traditional moxibustion and cupping. Soothing warmth from the moxibustion, combined with cupping and guasha, helps ease everyday stiffness and tension, leaving your body relaxed and your skin soft and nourished.

      Five Elements Signature Wellness: ease everyday aches and tension, soft and nourished skin, and a moment of calm.

      Key elements: 15 Botanical Essence Oil · Warming Moxibustion · 15-Ingredient Fermented Blend.
    benefits:
      - "Supports lymphatic flow"
      - "Keeps you warm and dispels cold"
      - "Helps balance qi and blood flow"
      - "Helps you relax for better sleep"
---
