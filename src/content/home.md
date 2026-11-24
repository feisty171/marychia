---
# =====================================================================
#  HOME PAGE — words for the hero and every section below it.
#  Edit the text between the quotes. Keep the quotes and the indentation.
#  Leave any [[CONFIRM: ...]] in place until management has approved it.
#  Brand rules (no guaranteed results, no invented reviews) are in CLAUDE.md.
# =====================================================================

# Hero (over the reception photo). The *word in asterisks* in the headline
# shows in italic rose. The booking button uses bookingUrl in src/data/site.json.
hero:
  eyebrow: "Since 1984 · Singapore's Beauty & Slimming Pioneer"
  headline: "Every transformation is a *story* worth telling."
  text: "Tailored facials, body treatments and wellness rituals. Your therapist starts with a consultation, then builds a plan around your skin, body and goals."
  exploreButton: "Explore treatments"
  exploreLink: "/treatments/"
  bookButton: "Book your first visit"
  # Photo behind the hero. It is always shown whole, never cropped: behind the words on
  # wide screens (the transparent menu sits on top of it), above the words on phones.
  # Use a wide 1366 x 768 (16:9) image with a plain, light area on the left for the words.
  image: "/images/hero-home-portrait.webp"
  imageAlt: "A woman with soft, glowing skin resting her chin on her hands"

# Key figures: a band of four facts right under the hero (two by two on phones).
# "count: true" makes that number count up when it comes into view.
# The SGX line is an owner-approved exception with fixed wording: "2009 – Listed on SGX Catalist"
# (see CLAUDE.md, "Brand and compliance rules"). Don't add share price or financial figures here.
stats:
  show: true   # set to false to hide the band
  eyebrow: "Key figures"   # read out to screen readers only
  items:
    - value: "Since 1984"
      label: "Four decades of beauty & slimming"
    - value: "300,000"
      suffix: "+"
      count: true
      label: "Clients who trusted us"
    - value: "3 studios"
      label: "Goldhill · Eastpoint · Jurong"
    - value: "2009"
      label: "Listed on SGX Catalist"

# "Find a treatment": heading over the Face / Body / Wellness tiles (the same tiles as the
# Treatments page: src/components/CategoryTiles.astro). intro is optional (leave "" for none).
services:
  eyebrow: "Find a treatment"
  heading: "What would you like to work on today?"
  intro: ""
  menuButton: "View All Treatments"   # shown under the tiles only while showList is true
  menuLink: "/treatments/"
  # The signature treatments list below the tiles. Hidden for now: set to true to show it again.
  showList: false
  # Editorial list: numbered rows (name, the short "for" line, "from S$xx" price, Book now).
  # On wide screens a large photo beside the list changes to the treatment you're on;
  # on phones and tablets each row shows its own small photo. Keep it to 5.
  # Price shows as "from S$xx" (lowest option price) with that option's compareAt crossed out.
  # Each treatment:
  #   category: "Face", "Body" or "Wellness"   tag: optional small label, e.g. "New" or "Signature"
  #   for: the short italic line                description: one or two sentences
  #   options: one or more sessions. compareAt shows the usual price crossed out.
  #   image: e.g. "/images/treatments/photo.webp" (square-ish works best, about 900 x 900), or "" for a placeholder
  # Prices must match the Y27/28 menu PDF.
  items:
    - id: "hydration-booster"
      name: "Hydration Booster Facial"
      category: "Face"
      tag: "Signature"
      for: "For skin that feels dry, tight or tired"
      description: "Deep hydration designed to leave your skin feeling soft, fresh and comfortable again."
      image: "/images/treatments/hydration-booster-facial-square.webp"
      imageAlt: "A therapist applying a hydrating mask during a facial"
      options:
        - { label: "First Trial", minutes: 75, price: 69, compareAt: 189 }
        - { label: "Usual", minutes: 75, price: 189 }
    - id: "radiance-revival"
      name: "MC Classic Radiance Revival"
      category: "Face"
      for: "For skin that looks dull or uneven"
      description: "Plant actives and hyaluronic acid help your complexion look calmer, clearer and more radiant."
      image: "/images/treatments/classic-radiance-revival-square.webp"
      imageAlt: "Close-up of glowing, freshly treated skin"
      options:
        - { label: "First Trial", minutes: 60, price: 69, compareAt: 280 }
        - { label: "Usual", minutes: 60, price: 280 }
    - id: "coffee-detox"
      name: "MC Classic Coffee Detox"
      category: "Body"
      for: "For a tired, sluggish body"
      description: "A warm Brazilian coffee scrub and drainage massage. You leave feeling lighter, brighter and properly looked after."
      image: "/images/treatments/classic-coffee-drainage-square.webp"
      imageAlt: "Warm coffee scrub being applied during a body treatment"
      options:
        - { label: "First Trial", minutes: 60, price: 89, compareAt: 280 }
        - { label: "Usual", minutes: 60, price: 280 }
    - id: "lemongrass-lymphatic-home"
      name: "Lemongrass Lymphatic Drainage"
      category: "Body"
      tag: "Signature"
      for: "For a tired, sluggish body"
      description: "A zesty lemongrass scrub and flowing drainage strokes that awaken sleepy cells and leave you feeling light, lifted and refreshed."
      image: "/images/treatments/lemongrass-lymphatic-square.webp"
      imageAlt: "A Mary Chia therapist giving a client a lymphatic drainage massage"
      options:
        - { label: "First Trial", minutes: 60, price: 89, compareAt: 280 }
        - { label: "Usual", minutes: 60, price: 280 }
    - id: "five-elements-home"
      name: "Five Elements Body Wellness"
      category: "Wellness"
      tag: "New"
      for: "For everyday aches, stiffness and tension"
      description: "Warming moxibustion, cupping and gua sha with our 15-ingredient fermented blend. Designed to ease everyday stiffness and help you truly unwind."
      image: "/images/treatments/five-elements.webp"
      imageAlt: "Moxibustion cup warming on a client's back during a Five Elements treatment"
      options:
        - { label: "First Trial", minutes: 60, price: 99, compareAt: 380 }
        - { label: "Usual", minutes: 60, price: 380 }

# Ad banner, just below Signature treatments (full width, same edges as the cards).
# While "image" is empty, a placeholder shows the recommended size.
#   image:   e.g. "/images/banners/your-banner.webp" (wide, about 1920 x 480; phones crop the sides)
#   alt:     what the banner says or shows, for screen readers
#   link:    where it goes when clicked, e.g. "/treatments/" (leave "" for no link)
#   phoneFocus: which side to keep when phones crop the sides: "left", "center" or "right"
#            (use the side the person or main message is on)
# No before-and-after images or guaranteed results (see CLAUDE.md).
banner:
  image: "/images/banners/hydration-banner.webp"
  alt: "A woman resting her face on rippling water, her skin dewy with water droplets"
  link: ""            # only used when there is no button: makes the whole banner a link
  phoneFocus: "right"
  # Words on the banner (left side on wide screens, under the picture on phones).
  # Leave heading "" for a picture-only banner. *asterisks* = italic rose.
  # {count} = how many treatments are on the site. No guaranteed results (see CLAUDE.md).
  eyebrow: "Face · Body · Wellness"
  heading: "A little time, *just for you*."
  text: "Explore {count} treatments, each one shaped around your skin, your body and how you want to feel."
  button: "View all treatments"
  buttonLink: "/rituals/"

# Products, below the ad banner. "Shelf" design: tinted photo panels with the
# details underneath (deliberately different from the Signature treatment cards).
# The nav's "Shop" link jumps here. Up to 5 products.
# Each product:
#   brand (small label above the name), name, for (one short line, here the pack size), price (a number, e.g. 48), optional compareAt (usual price, crossed out)
#   image: e.g. "/images/products/photo.webp" (product on a plain or transparent background,
#          portrait about 800 x 1000), or "" for a placeholder
#   link: the product page. Until it's a real URL, the card says "Coming soon".
# Only real products and prices from marketing. No medical claims or guaranteed results (see CLAUDE.md).
# "Our clients' favourites": treatment cards below the ad banner. Each card's name, photo,
# one-line description, time and "from" price come from the treatment list (the menu workbook),
# so they always match the Rituals page. List the treatments by their ID from the workbook
# (see src/data/treatment-menu.json). Four works best (four across on wide screens).
# The *word in asterisks* in the heading shows in italic rose.
favourites:
  eyebrow: "Signature treatments"
  heading: "Our clients' *favourites*"
  allLink: "View all {count} treatments"   # {count} = how many treatments are on the site
  bookButton: "Book"
  detailsButton: "Details"
  items:
    - "hydration-booster-facial"
    - "lemongrass-lymphatic"
    - "classic-coffee-drainage"
    - "five-element-body-wellness"

# First-visit band, right under "Our clients' favourites": words over the studio photo
# (shown as it is, no tint). The photo is 1280 x 560 and the band keeps that shape on wide screens.
# "Book my trial" uses bookingUrl in src/data/site.json. "Explore trial offers" opens the
# treatment list on First trial prices. termsLink: the trial terms page; until it's a real
# link, "Terms apply" shows as plain text. No guaranteed results (see CLAUDE.md).
trial:
  image: "/images/site/trial-bg.webp"
  eyebrow: "For first-time guests"
  heading: "Begin your *story* with us"
  text: "Enjoy an exclusive trial price on selected facials, body and wellness treatments. Every first visit begins with a personal consultation."
  note: "One trial per new guest."
  termsLabel: "Terms apply"
  termsLink: "[[CONFIRM: trial terms page link]]"
  bookButton: "Book my trial"
  exploreButton: "Explore trial offers"
  exploreLink: "/rituals/?trial=1"

# "Real results / Stories from our clients": right under the first-visit band.
# Top row: the newest results from the Gallery page (src/content/gallery.md). Photos show
# ONLY when that result has consent: true; otherwise a "Before / After" placeholder shows.
# Bottom row: the client reviews from testimonials: below (only real reviews, with permission).
results:
  eyebrow: "Real results"
  heading: "Stories from *our clients*"   # *asterisks* = italic rose
  allLink: "See all results"
  allHref: "/gallery/"
  show: 3                                  # how many Gallery results to show
  reviewSource: "Google review"            # shown after each reviewer's name

# Products ("Take the care home"). Hidden for now: set show to true to bring the Shop section back.
products:
  show: false
  eyebrow: "Shop"
  heading: "Take the care home."
  intro: "Studio favourites to keep your skin and body feeling cared for between visits."
  linkLabel: "Shop now"
  menuButton: "Shop All Products"
  menuLink: "[[CONFIRM: shop page link]]"
  items:
    - brand: "Dr Scinn"
      name: "Eye Renewal Ampoule"
      for: "7 bottles × 3 ml"
      price: 499
      image: ""
      imageAlt: "Dr Scinn Eye Renewal Ampoule box"
      link: "[[CONFIRM: product page link]]"
    - brand: "Dr Scinn"
      name: "Ultra V-Lift Ampoule"
      for: "7 bottles × 3 ml"
      price: 499
      image: ""
      imageAlt: "Dr Scinn Ultra V-Lift Ampoule box"
      link: "[[CONFIRM: product page link]]"
    - brand: "Dr Scinn"
      name: "Glow Brightening Ampoule"
      for: "7 bottles × 3 ml"
      price: 499
      image: ""
      imageAlt: "Dr Scinn Glow Brightening Ampoule box"
      link: "[[CONFIRM: product page link]]"
    - brand: "Dr Scinn"
      name: "Intensive Clarity Booster"
      for: "7 bottles × 3 ml"
      price: 499
      image: ""
      imageAlt: "Dr Scinn Intensive Clarity Booster box"
      link: "[[CONFIRM: product page link]]"
    - brand: "Organica"
      name: "Repair+ Skin Rescue Concentrate"
      for: "20 ml"
      price: 399
      image: ""
      imageAlt: "Organica Repair+ Skin Rescue Concentrate box"
      link: "[[CONFIRM: product page link]]"

# "Our story": archive photo on the left; on the right the story, a row of milestones and a
# link to the About page. *asterisks* in the heading = italic rose.
# Milestones come from the About timeline (src/content/about.md). Never add finances, share
# price or listing status here: the SGX line is only allowed in the Key figures band (CLAUDE.md).
experience:
  eyebrow: "Our story"
  heading: "It began with *one beauty kit*."
  paragraphs:
    - "Long before there was a Mary Chia shop, there was Mary. She sewed wedding gowns until brides began asking her to do their make-up too. She had no shop and no savings, so she carried her kit from home to home, one facial at a time. In 1984 she opened a 300 sq ft shop in Tanjong Katong, and soon women were queuing from 7am. More than 300,000 clients later, everyone who walks through our doors is still treated as a friend."
  milestones:
    - year: "1984"
      label: "First shop, Tanjong Katong"
    - year: "1989"
      label: "First beauty & slimming centre"
    - year: "2007"
      label: "Singapore Prestige Brand Award"
    - year: "Today"
      label: "3 studios"
  link: "Read our story"
  linkHref: "/about/"
  image: "/images/heritage/tanjong-katong-1984.webp"
  imageAlt: "Six Mary Chia beauticians in white uniforms outside the Tanjong Katong outlet on its opening day, with flowers and an Opening Now banner"
  caption: "Tanjong Katong outlet, 1984"
  # Small photo overlapping the big one, bottom right. Leave image2 "" until the photo is
  # ready: a labelled placeholder shows while showPlaceholderHints is on (treatments.json).
  image2: ""
  image2Alt: "The first Mary Chia Goldhill outlet"
  image2Caption: "First Goldhill outlet"

testimonials:
  eyebrow: "Kind words"
  heading: "From our guests."
  note: "[[CONFIRM: use only real client reviews, each with the client's written permission. Do not invent quotes.]]"
  # rating: the review's star rating (1-5) from Google. Stars only show once it's filled in.
  items:
    - quote: "[[CONFIRM: real testimonial about feeling relaxed and cared for]]"
      name: "[[CONFIRM: client first name]]"
      treatment: "[[CONFIRM: treatment]]"
      rating: ""
    - quote: "[[CONFIRM: real testimonial about cleanliness and the studio]]"
      name: "[[CONFIRM: client first name]]"
      treatment: "[[CONFIRM: treatment]]"
      rating: ""
    - quote: "[[CONFIRM: real testimonial about how their skin or body felt]]"
      name: "[[CONFIRM: client first name]]"
      treatment: "[[CONFIRM: treatment]]"
      rating: ""
  trust:
    - "40+ years in Singapore"
    - "Specialists trained in-house"
    - "[[CONFIRM: Google rating, e.g. 4.9★]]"
    - "[[CONFIRM: hygiene standards wording]]"

visit:
  eyebrow: "Visit us"
  heading: "Find your nearest studio."
  directions: "Get directions"
  mapPlaceholder: "[[CONFIRM: Google Maps embed for each studio]]"
  beforeHeading: "Before you arrive"
  notes:
    - "Please arrive 10–15 minutes early so we can settle you in. [[CONFIRM]]"
    - "Enjoy a cup of complimentary tea before your treatment. [[CONFIRM]]"
    - "Need to reschedule? Let us know at least 24 hours ahead. [[CONFIRM: cancellation policy]]"

finalCta:
  heading: "Take a moment for yourself."
  text: "Your skin. Your body. Your time to feel cared for. Book your visit and let us take care of the rest."
  button: "Book your escape"
  secondary: "Call a studio"
---
