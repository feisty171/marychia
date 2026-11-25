---
# =====================================================================
#  SHOP PAGE (/shop/) — the words on the page live in this file.
#  The products themselves (names, sizes, prices, descriptions, how to use,
#  ingredients) come from src/data/products.json, which is made from the
#  product sheet: npm run build:products -- "path/to/sheet.xlsx"
#  Edit the text between the quotes. Keep the quotes and the indentation.
# =====================================================================

seo:
  title: "Shop Skincare | Mary Chia"
  description: "Skincare from Lucent, The Juve Series and The Prep Series, chosen by Mary Chia to care for your skin between visits. Order on WhatsApp."

eyebrow: "Shop skincare"
heading: "Professional skincare to take *home*."
intro: "Your facial shouldn’t end when you leave the studio. The peptide serums, hyaluronic acid boosters and SPF60 mineral sunscreen our therapists use on you are now ready for your daily routine, so your skin keeps its glow between visits."

# Shop card: the button that replaces the title and price when a card is hovered ("- S$399" is added)
buyLabel: "Buy now"

# Product page (/shop/<product>/): buttons and section titles
backLabel: "Shop"
orderButton: "Order on WhatsApp"
storyLabel: "About this product"
usageLabel: "How to use"
ingredientsLabel: "Ingredients"
infoLabel: "Product information"
moreLabel: "More from"

# The WhatsApp pop-up (pick a studio)
sheetEyebrow: "Order on WhatsApp"
sheetNote: "We'll open WhatsApp with the product filled in. Our team will confirm your order."

# The brand sections, magazine style, in this order. Each has:
#   name    – must match the Brand column in the product sheet
#   line    – optional short line under the big brand title
#   layout  – where the big title sits: "left" (title left, products right),
#             "right" (products left, title right, on a grey band), "center" (title above, centred)
#             or "corner" (a 4-column grid: three cards, then two, with the big two-line title
#             filling the bottom-right corner; made for 5 products)
#             or "side" (the big title on the left, sitting at the bottom, the cards on the right)
#   kicker  – optional, for "corner" / "side": a small word above the big title (e.g. "The");
#             add kickerInline: true to put it on the same line as the first big word
#   heading – optional, for "corner" / "side": the title words, one word per line; *asterisk* words show in rose
#   order   – optional: the product IDs (from src/data/products.json) in the order to show them
# A brand in the product list but not here is added at the end (layout "center").
brands:
  - name: "The Juve Series"
    line: ""
    layout: "side"
    kicker: "The"
    kickerInline: true      # "THE" sits on the same line as "JUVE"
    heading: "*Juve Series*"
  - name: "Lucent"
    line: ""
    layout: "corner"
    heading: "*Lucent* Collection"
    order:
      - "lucent-supercharged-miracle-drop"
      - "lucent-radiance-restore"
      - "lucent-eye-complex"
      - "lucent-luminocrystal-daily-skin-protector-spf60-pa"
      - "lucent-illuminor-primer"
  - name: "The Prep Series"
    line: ""
    layout: "side"
    kicker: "The"
    heading: "*Prep Series*"
    order:
      - "repair-skin-rescue-concentrate"
      - "bright-illuminating-power-concentrate-fibre-silk-mask"
---
