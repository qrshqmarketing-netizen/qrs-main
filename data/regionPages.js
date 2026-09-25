// Region pages (/service-areas/<region>/): the county-level page above each region's city pages.
// keyword: the page's main search phrase; it appears in metaTitle, metaDescription, hero.heading (the H1) and the intro.
// Text fields can link with [words](/path/) and bold with **words**. Add an entry here when you add a region in data/locations.js.

export const REGION_PAGES = {
  'la-county': {
    keyword: 'los angeles county roofing',
    metaTitle: 'Los Angeles County Roofing',
    metaDescription: 'Los Angeles County roofing from our Los Angeles and Valley offices: tile, shingle, flat and metal roof repair and replacement. Book a $199 Roof Check.',
    hero: {
      heading: 'Los Angeles County Roofing Services',
      intro: 'From the beach cities to the San Fernando Valley, Los Angeles County roofing takes local know-how. Our Los Angeles and Valley offices serve homes and businesses across the county, starting with a roofer-led [$199 Roof Check](#roof-check).',
    },
    intro: {
      heading: 'One County, Many Roofing Climates',
      paragraphs: [
        'Los Angeles County covers a lot of ground, and roofs age differently across it. Near the coast in [Santa Monica](/service-areas/la-county/santa-monica/) and Long Beach, salt air and the marine layer work on flashings and fasteners. In the Valley and foothill cities like Burbank, Glendale and Pasadena, long hot summers bake underlayment and shingles, and dry Santa Ana winds test every loose tile and edge. Older neighborhoods mix clay tile, shingle and flat roofs, often on the same house.',
        'Our Los Angeles office in the Fairfax area and our Valley office in [Woodland Hills](/service-areas/la-county/woodland-hills/) keep roofers close to every city we serve here. Whether your roof needs a [tile lift & relay](/tile-roofing/lift-and-relay/) or a full replacement, the process stays the same: photos of what we find, a written scope and price before work starts, and a final walkthrough when the job is done.',
      ],
    },
    considerations: [
      { title: 'Coastal salt air', text: 'From Santa Monica to Long Beach, moist, salty air speeds up corrosion on flashings, vents and gutters.' },
      { title: 'Valley and foothill heat', text: 'Hot summers inland dry out underlayment and sealants, and poorly vented attics age shingles from below.' },
      { title: 'Wind and fire season', text: 'Santa Ana winds loosen tiles and lift shingle edges, and homes near the hills benefit from ember-resistant details.' },
    ],
    faqs: [
      { q: 'Which Los Angeles County cities do you serve?', a: 'Our city pages cover Los Angeles, Santa Monica, Pasadena, Glendale, Burbank, Woodland Hills, Torrance and Long Beach, and we work in many nearby communities as well. Enter your ZIP code on the map to check your address.' },
      { q: 'Where are your Los Angeles County offices?', a: 'We have two: our Los Angeles office at 1444 N Poinsettia Pl, Unit 308, and our Valley office at 22900 Ventura Blvd, Suite 124, in Woodland Hills. Both answer at (310) 340-1643.' },
      { q: 'Do you work on commercial buildings in LA County?', a: 'Yes. We roof offices, retail, warehouses, churches and other buildings across the county, and we plan the work so the building stays open. See our [commercial roofing](/commercial-roofing/) services.' },
      { q: 'What should I do if a storm damages my roof?', a: 'Stay safe, move belongings away from any leak and take photos if you can. Then call us or see our [emergency roof repair](/emergency-roof-repair/) page for what happens next.' },
    ],
  },

  'orange-county': {
    keyword: 'orange county roofing',
    metaTitle: 'Orange County Roofing Services',
    metaDescription: 'Orange County roofing for homes, HOAs and businesses from Anaheim to Newport Beach: tile, shingle, flat and metal roofs. Book a $199 Roof Check today.',
    hero: {
      heading: 'Orange County Roofing Services',
      intro: 'Orange County roofing means coastal homes, master-planned communities and busy commercial centers. We serve homes, HOAs and businesses across the county, and every project starts with a roofer-led [$199 Roof Check](#roof-check).',
    },
    intro: {
      heading: 'Roofing Across Orange County',
      paragraphs: [
        'Many Orange County neighborhoods were built with concrete tile roofs, and plenty of those roofs are now old enough that the underlayment beneath the tiles has worn out. In master-planned communities like those in [Irvine](/service-areas/orange-county/irvine/), similar homes tend to reach that point around the same time. Along the coast in Huntington Beach and Newport Beach, salt air and ocean wind add wear to flashings, vents and ridge details, while inland cities like Anaheim and Santa Ana see more heat.',
        'We start with photos and a plain-English explanation of what we find, then give you a written scope and price before any work begins. That might mean a [tile roof repair](/tile-roofing/repairs/), a [tile roof replacement](/tile-roofing/replacement/) or a [roof maintenance plan](/roof-maintenance-plans/) for a whole community. Boards and property managers get one point of contact through our [HOA & multi-family roofing](/hoa-multi-family/) work.',
      ],
    },
    considerations: [
      { title: 'Aging concrete tile', text: 'Tiles often outlast the underlayment beneath them, so older tile roofs can leak even when they look fine from the street.' },
      { title: 'Coastal exposure', text: 'Near the harbor and the beaches, salt air and steady wind wear on metal flashings, fasteners and ridge details.' },
      { title: 'HOA communities', text: 'Shared roofs and similar homes call for board-ready reports, phased schedules and clear communication with residents.' },
    ],
    faqs: [
      { q: 'Which Orange County cities do you serve?', a: 'Our city pages cover Anaheim, Santa Ana, Huntington Beach, Irvine and Newport Beach, and we work in many nearby communities as well. Check your address with the ZIP code map on this page.' },
      { q: 'Do you work with Orange County HOAs?', a: 'Yes. Boards get photo-documented findings, written scopes they can review together and one point of contact from the first survey to the final walkthrough.' },
      { q: 'Do you roof commercial buildings in Orange County?', a: 'Yes. From retail centers to offices and warehouses, we plan commercial projects around the people who use the building, so it stays open while we work.' },
      { q: 'How does a project start?', a: 'With a roofer-led Roof Check. You get photos of your roof’s condition, a plain-English explanation and a written scope and price for anything it needs.' },
    ],
  },
};
