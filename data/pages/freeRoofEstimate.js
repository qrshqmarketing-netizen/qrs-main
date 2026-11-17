// Free Online Roof Estimate (owner, November 17 2026): a stand-alone landing page for the Instant Quote (components/widgets/InstantQuote.jsx,
// shown here `inline` instead of in the side drawer) at /free-roof-estimate/ (app/free-roof-estimate/page.js). It is a "focus" page like /start/
// (lib/landing.js): the header keeps the logo, theme switch and phone, the footer only its small print, and the side tab, El Niño pop-up and phone
// action bar stay away. Unlike /start/ it is indexed (sitemap, AI files): keyword "free online roof estimate", with "online roofing estimator" and
// "roof estimate calculator" in the copy. Every claim is one the Instant Quote and the site already make: no prices here (the tool shows its own
// ranges from data/instantQuote.js), the evaluation on site is free for homes, financing subject to credit approval.
export const QUOTE_PAGE_PATH = '/free-roof-estimate/';

export const QUOTE_PAGE = {
  path: QUOTE_PAGE_PATH,
  keyword: 'free online roof estimate',
  metaTitle: 'Free Online Roof Estimate | Instant Roofing Estimator',
  metaDescription:
    'Get a free online roof estimate in about 30 seconds: our online roofing estimator measures your roof from satellite imagery and shows a price range.',
  label: 'Free Online Roof Estimate',
  eyebrow: 'Online roofing estimator',
  heading: 'Free Online Roof __Estimate__',
  outcome: 'Your roof measured from satellite imagery, with a price range in about 30 seconds.',
  intro:
    'Get a free online roof estimate for your home in Los Angeles or Orange County. Our online roofing estimator measures your roof from Google satellite imagery, then shows a replacement price range for shingle, tile or flat roofing and an example monthly payment. No ladder and no visit needed to start.',
  points: [
    'Measured from satellite imagery',
    'Shingle, tile, lift & relay and flat roofs',
    'Example monthly payments',
    'Exact price in writing after a free roof evaluation',
  ],
  toolTitle: 'Online roof estimate',
  toolKicker: 'Free roof measurement · 30 seconds',

  steps: {
    heading: 'How the online roof estimator works',
    lead: 'Four short steps, the same ones you see at the top of the estimator.',
    items: [
      { title: 'Enter the address', text: 'Type the property address, or use your location if you are standing at the house. The estimator finds the building on Google satellite imagery.' },
      { title: 'Check your roof', text: 'It measures the roof area and pitch from the imagery and shows each roof section. Wrong building? Tap your roof on the map. You can also drag the size, pick the pitch and stories, and say what is on the roof now.' },
      { title: 'Tell us where to send it', text: 'Your name and phone number, and an email if you want a copy. The estimate shows on the next screen right away.' },
      { title: 'See your price range', text: 'A roof replacement price range for each material you compare, with an example monthly payment over 5, 10 or 15 years.' },
    ],
  },

  factors: {
    heading: 'What goes into a roof estimate',
    lead: 'A roof estimate calculator is only as good as what it measures. Ours looks at the same things a roofer does:',
    items: [
      { title: 'Roof size', text: 'The measured area of every roof section, plus an allowance for the cuts, starter and ridge every roof needs.' },
      { title: 'Pitch', text: 'A steeper roof takes more care and more safety setup than a low one, so pitch moves the price.' },
      { title: 'Stories', text: 'A two- or three-story house means more work getting materials up and debris down.' },
      { title: 'Material', text: 'Shingle, a new tile roof, tile lift & relay (keeping your tiles and replacing what is under them) or a flat roof. Compare more than one on the estimate screen.' },
    ],
  },

  written: {
    heading: 'An online estimate, then a written price',
    paragraphs: [
      'The online estimate is a ballpark from satellite imagery and your answers, not a final quote. Trees or shade can hide part of a roof, and no satellite can see the decking, flashing or underlayment.',
      'So the next step is a [free roof evaluation](/roof-inspection/) on site. A roofer looks at the roof first, confirms every measurement and gives you a written scope and price before any work. See how a [roof replacement](/roof-replacement/) runs from there.',
    ],
  },

  materials: {
    heading: 'Roofs the estimator prices',
    items: [
      { title: 'Shingle roof replacement', text: 'Architectural shingles, installed from the deck up.', href: '/residential-roofing/shingle-roofing/replacement/' },
      { title: 'Tile roof replacement', text: 'A new clay or concrete tile roof.', href: '/residential-roofing/tile-roofing/replacement/' },
      { title: 'Tile lift & relay', text: 'Your tiles kept, new underlayment beneath them.', href: '/residential-roofing/tile-roofing/lift-and-relay/' },
      { title: 'Flat roof replacement', text: 'A new low-slope roof built to drain.', href: '/residential-roofing/flat-roofing/replacement/' },
    ],
  },

  financing:
    'The estimate shows an example monthly payment. Financing is through Momnt Financing or Service Financing, subject to credit approval. Read more about [roof financing](/roof-financing/).',

  faqs: [
    {
      q: 'Is the online roof estimate really free?',
      a: 'Yes. The online estimate costs nothing, and so does the roof evaluation on site for homes. You get a written scope and price before any work.',
    },
    {
      q: 'How accurate is a free online roof estimate?',
      a: 'It is a ballpark. The roof size and pitch come from Google satellite imagery, and trees or shade can hide part of a roof, so you can adjust the size yourself. We confirm every measurement on site before we give you a written price.',
    },
    {
      q: 'Does the online roofing estimator work for tile and flat roofs?',
      a: 'Yes. It prices shingle, a new tile roof, tile lift & relay and flat roofs, and you can compare more than one on the same screen. A tile roof is compared with lift & relay, which keeps your tiles and replaces the underlayment beneath them.',
    },
    {
      q: 'What if the estimator can’t find my roof?',
      a: 'Some addresses don’t have roof data yet. Choose “Enter roof details yourself” and give the size, pitch and stories; a typical home roof here is 1,500 to 2,500 square feet. You can also [request an estimate](/start/) or call us.',
    },
    {
      q: 'Will someone call me after I get my estimate?',
      a: 'The estimate shows on screen right away. A roofer may call or text you about your roof to set up the free roof evaluation, and you can book it yourself by calling us.',
    },
    {
      q: 'Can I use it for a commercial building?',
      a: 'The online estimator is made for homes. For an office, retail, industrial or multi-family building, request a roof survey on our [commercial roofing](/commercial-roofing/) page instead.',
    },
    {
      q: 'Where do you work?',
      a: 'Homes across Los Angeles, Orange, Riverside and San Bernardino Counties, and around our San Jose office, from our local offices. See every city on our [service areas](/service-areas/) page.',
    },
  ],
};
