---
# =====================================================================
#  HOME PAGE — words for the hero and every section below it.
#  Edit the text between the quotes. Keep the quotes and the indentation.
#  Leave any [[CONFIRM: ...]] in place until management has approved it.
#  Brand rules (no guaranteed results, no invented reviews) are in CLAUDE.md.
# =====================================================================

# Hero: one line of words, centred in white on the photo (all lowercase on purpose).
hero:
  headline: "the slimming and beauty specialist."
  # Photo in the framed banner (rounded corners, like the Shop and Treatments banners).
  # It fills the frame and is cropped to fit each screen from the centre; the white words sit
  # centred on it over a soft shade. Wide, about 2400 x 1100.
  image: "/images/hero-home-reception.webp"
  imageAlt: "The Mary Chia reception, with a glowing Embracing Beauty sign, a marble counter and a curved sofa"

# Key figures: a band of four facts right under the hero (two by two on phones).
# "count: true" makes that number count up when it comes into view.
# The SGX line is an owner-approved exception with fixed wording: "2009 – Listed on SGX Catalist"
# (see CLAUDE.md, "Brand and compliance rules"). Don't add share price or financial figures here.
stats:
  show: false  # set to false to hide the band
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
  title: "What we offer"   # the small red label above the Face / Body / Wellness cards (shows in capitals; "" hides it)
  showHeading: false   # the "Find a treatment / What would you like to work on today?" heading, line and button; true shows them again
  eyebrow: "Find a treatment"
  # Bold uppercase heading; the *words in asterisks* show as a large italic line in the brand red
  heading: "What would you like to *work on today?*"
  intro: "Face, body and wellness treatments, each one shaped around you."   # small line on the right
  button: "All Treatments"      # button on the right ("" to hide)
  buttonLink: "/treatments/"       # where it goes (the full treatment list)
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

# Ad banner carousel, just below the Face / Body / Wellness tiles (full width, same edges as the cards).
# The slides turn every 6 seconds (they stop while hovered or tapped; "reduce motion" turns that off);
# arrows and dots let visitors pick one. Each picture always shows whole, never cropped.
# Each slide:
#   image:  e.g. "/images/banners/your-banner.webp" (wide, 1600 x 450 or larger at the same shape;
#           put any words into the picture itself, on phones it shows small)
#   alt:    what the banner says and shows, for screen readers
#   link:   where it goes when clicked, e.g. "/shop/#lucent" (leave "" for no link)
# Add or remove slides by copying or deleting a "- image:" block. Slides show in this order.
# No before-and-after images or guaranteed results (see CLAUDE.md).
banner:
  label: "Our skincare"
  button: "Shop now"     # fades in on the bottom right of a banner when hovered (only on slides with a link)
  slides:
    - image: "/images/banners/lucent-banner.webp"
      alt: "Lucent skincare: advanced formulation made for all. Five Lucent products on white pedestals."
      link: "/shop/#lucent"
    - image: "/images/banners/juve-series-banner.webp"
      alt: "The Juve Series anti-ageing skincare: Probio Prepe mousse, Juve serum and a perfume-style bottle on white pedestals."
      link: "/shop/#the-juve-series"
    - image: "/images/banners/skin-prep-banner.webp"
      alt: "The Skin Prep Series: The Reset Ritual. Bright+ silk mask and Repair+, beside a smiling woman."
      link: "/shop/#the-prep-series"

# Products, below the ad banner. "Shelf" design: tinted photo panels with the
# details underneath (deliberately different from the Signature treatment cards).
# The nav's "Shop" link jumps here. Up to 5 products.
# Each product:
#   brand (small label above the name), name, for (one short line, here the pack size), price (a number, e.g. 48), optional compareAt (usual price, crossed out)
#   image: e.g. "/images/products/photo.webp" (product on a plain or transparent background,
#          portrait about 800 x 1000), or "" for a placeholder
#   link: the product page. Until it's a real URL, the card says "Coming soon".
# Only real products and prices from marketing. No medical claims or guaranteed results (see CLAUDE.md).
# "Our clients' favourites": treatment cards below the ad banner, identical to the cards on the
# old treatment list (data/treatment-menu.xlsx; the Treatments page itself now uses src/content/treatments.md). Name, photo, description, duration and prices come from the menu
# workbook, so they always match. List the treatments by their ID from the workbook
# (see src/data/treatment-menu.json). Four works best (four across on wide screens).
# The *word in asterisks* in the heading shows in italic rose.
favourites:
  show: false   # the "Our clients' favourites" cards on Home; true shows them again
  eyebrow: "Signature treatments"
  heading: "Our clients' *favourites*"
  allLink: "View all {count} treatments"   # {count} = how many treatments are on the site
  bookButton: "Book Now"
  items:
    - "hydration-booster-facial"
    - "lemongrass-lymphatic"
    - "classic-coffee-drainage"
    - "five-element-body-wellness"

# "beauty begins with wellness": a banner between the banner carousel and the first-visit banner,
# the same size and frame as the hero. Words centred on the photo's plain middle, in dark text.
# The heading is lowercase on purpose. No guaranteed results (see CLAUDE.md).
wellness:
  image: "/images/site/wellness-banner.webp"
  imageAlt: "Skincare bottles, a rose quartz gua sha and sage leaves on a soft blush background"
  heading: "beauty begins with wellness."
  text: "At Mary Chia, we believe real beauty starts with good health. For over 30 years we've brought face, body and wellness together, pairing advanced skin science with time-honoured therapies, to create care that's made for you. Results you can see. Care you can feel."
  button: "Explore treatments"
  buttonLink: "/treatments/"

# First-visit banner, under the "beauty begins with wellness" banner. No guaranteed results (see CLAUDE.md).
trial:
  # A framed banner the same size as the hero: brand-red panel with the words on the left,
  # the photo on the right (phones: photo on top, words below). Words are lowercase on purpose.
  image: "/images/hero-home-reception.webp"
  imageAlt: "The Mary Chia reception, with a glowing Embracing Beauty sign and a marble counter"
  heading: "begin your story with us."
  text: "Enjoy an exclusive trial price on selected facials, body and wellness treatments."
  exploreButton: "Browse treatments"
  exploreLink: "/treatments/"

# "Real results / Stories from our clients": right under the first-visit band.
# Top row: the newest results from the Gallery page (src/content/gallery.md). Photos show
# ONLY when that result has consent: true; otherwise a "Before / After" placeholder shows.
# Bottom row: the client reviews from testimonials: below (only real reviews, with permission).
results:
  eyebrow: "Real results"
  heading: "Stories from *our clients*"   # *asterisks* = italic rose
  show: 4                                  # how many result cards (one row as wide as the hero banner)
  reviewSource: "Read more"                # opens that studio's Google reviews page

# Products ("Take the care home"). Hidden for now: set show to true to bring the Shop section back.
products:
  show: false
  eyebrow: "Shop"
  heading: "Take the care home."
  intro: "Studio favourites to keep your skin and body feeling cared for between visits."
  linkLabel: "Shop now"
  menuButton: "Shop All Products"
  menuLink: "/shop/"
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

# "Our story": archive photo on the left; on the right the story and a link to the About page.
# *asterisks* in the heading = italic rose. An optional row of milestones can be added as
# milestones: (year, label); never add finances, share price or listing status (CLAUDE.md).
experience:
  # "Our story" banner: the same size and frame as the first-visit banner, mirrored: the archive
  # photo on the left, the brand-red panel with the words on the right (phones: photo on top).
  # The heading is lowercase on purpose. Never add finances, share price or listing status.
  heading: "it began with one beauty kit."
  paragraphs:
    - "Long before there was a Mary Chia shop, there was Mary. She sewed wedding gowns until brides began asking her to do their make-up too. She had no shop and no savings, so she carried her kit from home to home, one facial at a time. In 1984 she opened a 300 sq ft shop in Tanjong Katong, and soon women were queuing from 7am."
  link: "Read our story"
  linkHref: "/about/"
  image: "/images/heritage/tanjong-katong-1984.webp"
  imageAlt: "Six Mary Chia beauticians in white uniforms outside the Tanjong Katong shop on its opening day, with flowers and an Opening Now banner"

# Client reviews, shown in the "Real results" section above as a row that scrolls by on its
# own (it pauses when a visitor hovers or taps). The trust line sits under it.
# These are real 5-star Google reviews, copied word for word from each studio's Google page
# (November 2026). Never write, edit or paraphrase a review; each card shows the first 4 lines,
# and "Read more" opens the full review on Google. Names are shortened to first name + initial.
#   quote: the review text, exactly as on Google
#   name, studio (must match a name in src/data/outlets.json, for the "Read on Google" link)
#   rating: 1-5 stars from Google
testimonials:
  items:
    - quote: "Visited Mary Chia for a facial and was genuinely impressed. From the moment I walked in, the staff were welcoming and attentive. The therapist explained each step clearly, checked in with me often, and was extremely gentle. The facial itself was so relaxing that I almost fell asleep, and my skin looked brighter and calmer right after. Best part was that there was no pushy upselling at all. Just great service, a peaceful environment, and results you can actually feel. Highly recommend this place!"
      name: "lexguas H."
      studio: "Goldhill, Novena"
      rating: 5
    - quote: "I’ve been seeing Candy for my treatments and she’s honestly amazing. She’s super friendly, very patient, and knows exactly how to read your skin and recommend what’s suitable. Best part—no hard selling, just genuine advice. Every visit feels comfortable and well taken care of. Highly recommend her!"
      name: "Shu Jun"
      studio: "Jurong Gateway"
      rating: 5
    - quote: "Had my first visit yesterday for a consultation to explore suitable treatments for my skin. The staff was incredibly professional and knowledgeable—Irene, my Consultant, and Eileen, who handled my treatment, made me feel completely at ease. They carefully selected treatments tailored to my skin’s needs (hydration and deep moisture), rather than just suggesting random procedures. My skin felt noticeably refreshed afterward! I would highly recommend this place, as the team clearly knows what they’re doing."
      name: "Genevieve W."
      studio: "Goldhill, Novena"
      rating: 5
    - quote: "June Lim has been doing my facial  4 years ….she is very good and efficient. Indeed a good facial consultant and professional!!! Super satisfied with her service."
      name: "Jonas T."
      studio: "Eastpoint Mall"
      rating: 5
    - quote: "Enjoyed every session of my facial with Candy, Zhi Hui and Jessie. They were attentive, professional, and made the whole experience so relaxing. Truly felt well taken care of—highly recommend! They are very detailed, patient and able to explain every equipment and process very clearly. 👍🏼😊 Has been visiting them for quite sometime for my facial sessions, enjoyed each session with Candy."
      name: "Michelle S."
      studio: "Jurong Gateway"
      rating: 5
    - quote: "Went for my first facial in a long time here at Novena and would definitely come back~ the facial service was great, where the therapist explained each step clearly (loved the cooling mask!) and even managed to extract the little dots that I couldn’t do so myself at home🤣 + the relaxing neck massage at the end was a great touch to the entire facial service. Very clean and relaxing environment as well, would recommend!"
      name: "Lee L."
      studio: "Goldhill, Novena"
      rating: 5
    - quote: "Our family had an outstanding experience at this facial outlet, thanks to the impeccable service provided. We would like to extend our gratitude to Ms Valerie, the receptionist, for her exceptional performance and warm hospitality. Furthermore, the facial therapists, Ms Miao Miao and Ms Taozi, exhibited excellent personalities. Well done."
      name: "Stephen L."
      studio: "Jurong Gateway"
      rating: 5
  showTrust: false   # the line of facts under the reviews (40+ years …); true shows it again
  trust:
    - "40+ years in Singapore"
    - "Specialists trained in-house"
    - "[[CONFIRM: Google rating, e.g. 4.9★]]"
    - "[[CONFIRM: hygiene standards wording]]"

visit:
  eyebrow: "Visit us"
  heading: "Find your nearest studio."

finalCta:
  show: false   # the "Take a moment for yourself" band at the bottom of Home; true shows it again
  heading: "Take a moment for yourself."
  text: "Your skin. Your body. Your time to feel cared for. Book your visit and let us take care of the rest."
  button: "Book your escape"
  secondary: "Call a studio"
---
