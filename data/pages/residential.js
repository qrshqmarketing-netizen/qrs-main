// Residential hub page (/residential-roofing/): links to every residential roof type and service.
// Text fields can link with [words](/path/) and bold with **words**.

export const RESIDENTIAL_PAGE = {
  keyword: 'residential roofing',
  metaTitle: 'Residential Roofing in Los Angeles',
  metaDescription:
    'Residential roofing in Los Angeles & Orange County: shingle, tile and flat roofs, plus HOA and multi-family roofing. Start with a free roof evaluation.',
  hero: {
    heading: 'Residential Roofing in Los Angeles & Orange County',
    intro:
      'Quality Roofing Specialists provides residential roofing for homes across Los Angeles and Orange County: repair, replacement and ongoing care for shingle, tile and flat roofs. From a leak on a tile roof to a full tear-off on a shingle home, every job starts with a free roof evaluation, not a sales pitch.',
    highlights: ['Shingle, tile and flat roofs', 'Written scope and price before work', '10-Year workmanship warranty'],
  },
  overview: {
    heading: 'One Team for Every Roof on Your Home',
    paragraphs: [
      'Many Southern California homes have more than one kind of roof: a tile main roof with a flat section behind the parapet, a shingle house with a low-slope patio cover, a garage or ADU with a system of its own. Our crews work on all of them, so one roofer-led assessment covers the whole house and one written scope explains what each part needs.',
      'Start with your roof type below, or jump straight to the service you’re after. Not sure where to begin? A [free roof evaluation](#roof-check) gives you photos of your roof’s condition and a clear next step: repair, monitor, maintain or replace.',
    ],
  },
  cards: {
    heading: 'Roofing by Roof Type',
    intro: 'Choose your roof type to see the replacement, repair and care services we offer for it.',
  },
  finder: {
    heading: 'Find the Right Service',
    intro: 'The same detail-first process applies to every service. Pick what you need, then your roof type.',
    rows: [
      {
        id: 'roof-replacement',
        title: 'Roof Replacement',
        text: 'A full tear-off and a new roof system, installed to spec with a written scope and a 10-year workmanship warranty.',
        links: [
          { label: 'Shingle', href: '/residential-roofing/shingle-roofing/replacement/' },
          { label: 'Tile', href: '/residential-roofing/tile-roofing/replacement/' },
          { label: 'Flat', href: '/residential-roofing/flat-roofing/replacement/' },
        ],
      },
      {
        id: 'roof-repairs',
        title: 'Roof Repairs',
        text: 'Leaks, storm damage and worn details fixed at the source, with photos of what was wrong and what we did.',
        links: [
          { label: 'Shingle', href: '/residential-roofing/shingle-roofing/repair/' },
          { label: 'Tile', href: '/residential-roofing/tile-roofing/repair/' },
          { label: 'Flat', href: '/residential-roofing/flat-roofing/repair/' },
        ],
      },
      {
        id: 'lift-and-relay',
        title: 'Tile Lift & Relay',
        text: 'New underlayment beneath your existing tiles, so a tile roof keeps its look and stops leaking.',
        links: [{ label: 'Tile lift & relay', href: '/residential-roofing/tile-roofing/lift-and-relay/' }],
      },
      {
        id: 'new-installations',
        title: 'New Installations',
        text: 'Roofs for new construction, additions, ADUs and homes changing to a different roof type.',
        links: [
          { label: 'Shingle', href: '/residential-roofing/shingle-roofing/installation/' },
          { label: 'Flat', href: '/residential-roofing/flat-roofing/installation/' },
        ],
      },
      {
        id: 'inspections',
        title: 'Inspections',
        text: 'Roofer-led, photo-documented inspections when you’re buying or selling, after a storm, or before deciding between repair and replacement.',
        links: [
          { label: 'Shingle', href: '/roof-inspection/#shingle-roofs' },
          { label: 'Tile', href: '/roof-inspection/#tile-roofs' },
          { label: 'Flat', href: '/roof-inspection/#flat-roofs' },
        ],
      },
      {
        id: 'tune-ups',
        title: 'Tune-Ups',
        text: 'A focused visit that fixes the small things, like loose pieces, tired sealant and cluttered valleys, before they turn into leaks.',
        links: [{ label: 'Roof tune-ups', href: '/roof-maintenance-plans/#tune-up' }],
      },
      {
        id: 'roof-care',
        title: 'Roof Care',
        text: 'Scheduled maintenance that keeps an eye on wear over time, with photo records from every visit.',
        links: [{ label: 'Roof maintenance plans', href: '/roof-maintenance-plans/' }],
      },
      {
        id: 'attic-ventilation',
        title: 'Attic Ventilation',
        text: 'Vents checked, repaired or added so your attic can breathe, with photos of every vent.',
        links: [{ label: 'Attic ventilation', href: '/residential-roofing/attic-ventilation/' }],
      },
      {
        id: 'hoa',
        title: 'HOA & Multi-Family Roofing',
        text: 'Roofing for HOA and multi-family properties, with one point of contact for the board or manager.',
        links: [{ label: 'HOA & multi-family', href: '/residential-roofing/hoa-multi-family/' }],
      },
    ],
  },
  faqs: [
    {
      q: 'What kinds of homes do you work on?',
      a: 'Single-family homes, townhomes, ADUs and garages, plus HOA and multi-family properties across Los Angeles and Orange County. We work on [shingle](/residential-roofing/shingle-roofing/), [tile](/residential-roofing/tile-roofing/) and [flat](/residential-roofing/flat-roofing/) roofs.',
    },
    {
      q: 'How do I know whether I need a repair or a new roof?',
      a: 'Start with a free roof evaluation. A roofer inspects the roof, photo-documents what they find and explains your options in plain English, including when a repair or a tile lift & relay is enough.',
    },
    {
      q: 'Will I get a written price before work starts?',
      a: 'Yes. Every project gets a written scope and price before any work begins, so you know exactly what’s included. No pressure and no mystery pricing.',
    },
    {
      q: 'Which areas do you serve?',
      a: 'Homes across Los Angeles and Orange County, including Los Angeles, Santa Monica, Pasadena, Long Beach, Irvine and Newport Beach. See every city on our [service areas](/service-areas/) page.',
    },
  ],
};
