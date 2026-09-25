// Residential hub page (/residential-roofing/): links to every residential roof type and service.
// Text fields can link with [words](/path/) and bold with **words**.

export const RESIDENTIAL_PAGE = {
  keyword: 'residential roofing',
  metaTitle: 'Residential Roofing in Los Angeles',
  metaDescription:
    'Residential roofing in Los Angeles & Orange County: shingle, tile, flat and metal roofs, rain gutters and HOA roofing. Start with a $199 Roof Check.',
  hero: {
    heading: 'Residential Roofing Services',
    intro:
      'Detail-first residential roofing for homes across Los Angeles and Orange County, from a leak on a tile roof to a full tear-off on a shingle home. Every job starts with a roofer-led Roof Check, not a sales pitch.',
    highlights: ['Shingle, tile, flat and metal roofs', 'Written scope and price before work', 'Lifetime workmanship warranty'],
  },
  overview: {
    heading: 'One Team for Every Roof on Your Home',
    paragraphs: [
      'Many Southern California homes have more than one kind of roof: a tile main roof with a flat section behind the parapet, a shingle house with a low-slope patio cover, a garage or ADU with a system of its own. Our crews work on all of them, so one roofer-led assessment covers the whole house and one written scope explains what each part needs.',
      'Start with your roof type below, or jump straight to the service you’re after. Not sure where to begin? A [$199 Roof Check](#roof-check) gives you photos of your roof’s condition and a clear next step: repair, monitor, maintain or replace.',
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
        text: 'A full tear-off and a new roof system, installed to spec with a written scope and a lifetime workmanship warranty.',
        links: [
          { label: 'Shingle', href: '/shingle-roofing/replacement/' },
          { label: 'Tile', href: '/tile-roofing/replacement/' },
          { label: 'Flat', href: '/flat-roofing/replacement/' },
          { label: 'Standing seam metal', href: '/metal-roofing/standing-seam/' },
        ],
      },
      {
        id: 'roof-repairs',
        title: 'Roof Repairs',
        text: 'Leaks, storm damage and worn details fixed at the source, with photos of what was wrong and what we did.',
        links: [
          { label: 'Shingle', href: '/shingle-roofing/repairs/' },
          { label: 'Tile', href: '/tile-roofing/repairs/' },
          { label: 'Flat', href: '/flat-roofing/repairs/' },
        ],
      },
      {
        id: 'lift-and-relay',
        title: 'Tile Lift & Relay',
        text: 'New underlayment beneath your existing tiles, so a tile roof keeps its look and stops leaking.',
        links: [{ label: 'Tile lift & relay', href: '/tile-roofing/lift-and-relay/' }],
      },
      {
        id: 'new-installations',
        title: 'New Installations',
        text: 'Roofs for new construction, additions, ADUs and homes changing to a different roof type.',
        links: [
          { label: 'Shingle', href: '/shingle-roofing/installation/' },
          { label: 'Flat', href: '/flat-roofing/installation/' },
          { label: 'Standing seam metal', href: '/metal-roofing/standing-seam/' },
        ],
      },
      {
        id: 'inspections',
        title: 'Inspections',
        text: 'Roofer-led, photo-documented inspections when you’re buying or selling, after a storm, or before deciding between repair and replacement.',
        links: [
          { label: 'Shingle', href: '/shingle-roofing/inspection/' },
          { label: 'Tile', href: '/tile-roofing/inspection/' },
          { label: 'Flat', href: '/flat-roofing/inspection/' },
        ],
      },
      {
        id: 'tune-ups',
        title: 'Tune-Ups',
        text: 'A focused visit that fixes the small things, like loose pieces, tired sealant and cluttered valleys, before they turn into leaks.',
        links: [
          { label: 'Shingle', href: '/shingle-roofing/tune-up/' },
          { label: 'Tile', href: '/tile-roofing/tune-up/' },
          { label: 'Flat', href: '/flat-roofing/tune-up/' },
        ],
      },
      {
        id: 'roof-care',
        title: 'Roof Care',
        text: 'Scheduled maintenance that keeps an eye on wear over time, with photo records from every visit.',
        links: [
          { label: 'Shingle', href: '/shingle-roofing/roof-care/' },
          { label: 'Tile', href: '/tile-roofing/roof-care/' },
          { label: 'Flat', href: '/flat-roofing/roof-care/' },
        ],
      },
      {
        id: 'gutters-and-hoa',
        title: 'Gutters & HOA Roofing',
        text: 'Rain gutters planned with your roof, and roofing for HOA and multi-family properties.',
        links: [
          { label: 'Rain gutters', href: '/rain-gutters/' },
          { label: 'HOA & multi-family', href: '/hoa-multi-family/' },
        ],
      },
    ],
  },
  faqs: [
    {
      q: 'What kinds of homes do you work on?',
      a: 'Single-family homes, townhomes, ADUs and garages, plus HOA and multi-family properties across Los Angeles and Orange County. We work on [shingle](/shingle-roofing/), [tile](/tile-roofing/), [flat](/flat-roofing/) and [metal](/metal-roofing/) roofs.',
    },
    {
      q: 'How do I know whether I need a repair or a new roof?',
      a: 'Start with a $199 Roof Check. A roofer inspects the roof, photo-documents what they find and explains your options in plain English, including when a repair or a tile lift & relay is enough.',
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
