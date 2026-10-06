// City pages (/service-areas/<region>/<slug>/): the local part of each page. The rest of the page reuses the home page sections.
// keyword: the page's main search phrase; it appears in metaTitle, metaDescription, hero.heading (the H1) and the intro.
// blurb: the short line on this city’s card (Service Areas and region pages). hero.sub, the opening under the H1, answers the search.
// Text fields can link with [words](/path/) and bold with **words**. nearby: slugs from data/locations.js.

export const LOCATION_PAGES = {
  'los-angeles': {
    keyword: 'los angeles roofing',
    image: '/images/los-angeles-drone-view.webp',
    imagePosition: 'center 40%',
    metaTitle: 'Los Angeles Roofing & Roof Repair',
    metaDescription: 'Los Angeles roofing from a detail-first local team: tile, shingle and flat roof repair and replacement with written scopes. Book a free roof evaluation.',
    blurb: 'Roofer-led inspections, written scopes and clean installs for homes across the city, from the Hollywood Hills to the Valley.',
    hero: {
      // The keyword line; the result line under it is in data/heroOutcomes.js
      heading: 'Los Angeles roofing',
      sub: 'For Los Angeles roofing, Quality Roofing Specialists repairs and replaces tile, shingle and flat roofs on homes from the Hollywood Hills to the Valley, with offices in the Fairfax area and Woodland Hills. Every job starts with a free roof evaluation.',
    },
    intro: {
      heading: 'Roofing for Every Kind of Los Angeles Home',
      paragraphs: [
        'Los Angeles roofing covers more ground than most cities: Spanish Revival homes with clay tile in Los Feliz, mid-century houses with low-slope roofs in the hills, Craftsman bungalows with shingles in Highland Park and Eagle Rock. Our Los Angeles office is in the Fairfax area, with a second office in Woodland Hills for the Valley, and our crews bring the same detail-first process to every roof across the city.',
        'It starts with a roofer-led [free roof evaluation](#roof-check), not a sales pitch. We photo-document what we find, explain it in plain English and give you a written scope and price before any work begins. Whether your roof needs a [tile lift & relay](/residential-roofing/tile-roofing/lift-and-relay/), a [flat roof repair](/residential-roofing/flat-roofing/repair/) or a full replacement, you’ll know exactly what you’re paying for.',
      ],
    },
    neighborhoods: ['Hollywood Hills', 'Los Feliz', 'Silver Lake', 'Hancock Park', 'Mid-Wilshire', 'Fairfax', 'Eagle Rock', 'Highland Park', 'Sherman Oaks', 'Encino'],
    considerations: [
      { title: 'Sun and heat on every slope', text: 'Strong sun dries out underlayment and ages shingles and sealants, especially on south- and west-facing slopes.' },
      { title: 'Hillside homes and tight streets', text: 'Steep lots and narrow roads in the hills mean planning access, deliveries and safety before the first day of work.' },
      { title: 'Mixed roofs on one house', text: 'Many LA homes pair a tile or shingle main roof with flat sections over additions, garages or patios, and each needs its own details.' },
    ],
    faqs: [
      { q: 'Do you serve my Los Angeles neighborhood?', a: 'We work across the city, from the Hollywood Hills and Silver Lake to Sherman Oaks and Encino, with offices in the Fairfax area and in Woodland Hills. Check your ZIP code on the map on this page, or give us a call.' },
      { q: 'What roof types do you work on in Los Angeles?', a: 'All of the common ones: [tile](/residential-roofing/tile-roofing/), [shingle](/residential-roofing/shingle-roofing/) and [flat](/residential-roofing/flat-roofing/) roofs. Plenty of homes here have more than one type, and one roof evaluation covers them all.' },
      { q: 'Can you work on hillside homes?', a: 'Yes. Steep lots and narrow streets take extra planning for access, material deliveries and safety, and we build that into the written scope before work starts.' },
      { q: 'How do I get started?', a: 'Book a free roof evaluation. A roofer inspects your roof, photo-documents its condition and gives you a clear next step: repair, monitor, maintain or replace.' },
    ],
    nearby: ['woodland-hills', 'glendale', 'burbank', 'santa-monica'],
    final: { heading: 'Let’s Take a Look at Your Los Angeles Roof', text: 'No pressure, no mystery scope and no surprises. Start with a free roof evaluation for your Los Angeles home.' },
  },

  'santa-monica': {
    keyword: 'santa monica roofing',
    image: '/images/santa-monica-drone-view.webp',
    imagePosition: 'center 35%',
    metaTitle: 'Santa Monica Roofing & Roof Repair',
    metaDescription: 'Santa Monica roofing built for coastal conditions: tile, shingle and flat roof repair and replacement from a detail-first team. Book a free roof evaluation.',
    blurb: 'Clear inspections, written scopes and clean workmanship for homes from Ocean Park to North of Montana.',
    hero: {
      heading: 'Santa Monica roofing',
      sub: 'Santa Monica roofing from Quality Roofing Specialists means repairing and replacing clay tile, shingle and flat roofs on homes from Ocean Park to North of Montana, including modern homes with roof decks. Photos from a free roof evaluation show how your roof is holding up.',
    },
    intro: {
      heading: 'Built for Santa Monica’s Coastal Homes',
      paragraphs: [
        'Santa Monica roofing has to hold up to what the ocean sends inland every day: marine layer mornings, salt in the air and winter storms that come straight off the water. Homes here range from Spanish-style bungalows in Ocean Park to modern houses with flat roofs and roof decks, and many have been added onto over the decades.',
        'We start every project with a roofer-led [free roof evaluation](#roof-check) and photos of what we find, so you can see how your roof is holding up. From a [flat roof replacement](/residential-roofing/flat-roofing/replacement/) on a modern home to a [tile roof repair](/residential-roofing/tile-roofing/repair/) on an older bungalow, you get a written scope and price before any work begins.',
      ],
    },
    neighborhoods: ['Ocean Park', 'Sunset Park', 'North of Montana', 'Wilshire Montana', 'Mid-City', 'Pico', 'Downtown Santa Monica'],
    considerations: [
      { title: 'Salt air and marine layer', text: 'Moist, salty air is hard on metal flashings, fasteners and gutters, so we look closely at them during every roof evaluation.' },
      { title: 'Flat roofs and roof decks', text: 'Modern homes and additions often rely on low-slope roofs, where drainage and clean flashing details matter most. See our [flat roofing](/residential-roofing/flat-roofing/) work.' },
      { title: 'Older homes, newer additions', text: 'Where an addition meets the original house, roof lines and materials change, and those transitions are a common place for leaks to start.' },
    ],
    faqs: [
      { q: 'Do you work in every Santa Monica neighborhood?', a: 'Yes. We serve homes across Santa Monica, including Ocean Park, Sunset Park, Pico, Mid-City, Wilshire Montana and North of Montana. If you’re just outside the city, check your ZIP code on the map on this page.' },
      { q: 'How does coastal air affect my roof?', a: 'Salt and moisture speed up corrosion on metal flashings, vents and fasteners, and shaded slopes can hold onto dampness. A roofer-led inspection shows you where your roof is wearing, with photos.' },
      { q: 'Can you repair a flat roof with a roof deck on it?', a: 'In many cases, yes. We look at how the deck, drains and wall flashings tie into the roof, then give you a written scope that explains the repair or replacement options.' },
      { q: 'Do you also work on Spanish-style tile roofs?', a: 'Yes. Clay tile is common on older Santa Monica homes, and a [tile lift & relay](/residential-roofing/tile-roofing/lift-and-relay/) can replace worn underlayment while keeping the original tiles.' },
    ],
    nearby: ['los-angeles', 'torrance'],
    final: { heading: 'Coastal-Ready Roofing for Santa Monica', text: 'Start with a free roof evaluation and get photos, plain-English answers and a written scope for your Santa Monica home.' },
  },

  pasadena: {
    keyword: 'pasadena roofing',
    image: '/images/pasadena-drone-view.webp',
    imagePosition: 'center 40%',
    metaTitle: 'Pasadena Roofing: Repair & Replacement',
    metaDescription: 'Pasadena roofing for Craftsman, Spanish Revival and mid-century homes: tile, shingle and flat roof repair and replacement. Book a free roof evaluation.',
    blurb: 'Detail-first roof repair and replacement for homes across Pasadena, from Bungalow Heaven to Linda Vista.',
    hero: {
      heading: 'Pasadena roofing',
      sub: 'Quality Roofing Specialists handles Pasadena roofing for Craftsman, Spanish Revival and mid-century homes from Bungalow Heaven to Linda Vista, repairing and replacing tile, shingle and flat roofs without losing a home’s character. Every project starts with a free roof evaluation.',
    },
    intro: {
      heading: 'Roofing for Pasadena’s Historic and Modern Homes',
      paragraphs: [
        'Pasadena roofing often means working on homes with real architectural character: Craftsman bungalows in Bungalow Heaven, Spanish Revival houses with clay tile, and mid-century homes tucked into the hills. The right roof protects the house without changing what makes it special, which is why details like trim, eaves and tile profiles matter to us as much as the waterproofing underneath.',
        'Every project starts with a roofer-led [free roof evaluation](#roof-check), photo documentation and a plain-English explanation. If your clay tiles are sound but the underlayment is worn, a [tile lift & relay](/residential-roofing/tile-roofing/lift-and-relay/) may keep the original roof in place. If a shingle roof has reached the end of its life, a [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/) comes with a written scope before any work starts.',
      ],
    },
    neighborhoods: ['Old Pasadena', 'Bungalow Heaven', 'Madison Heights', 'Oak Knoll', 'San Rafael', 'Linda Vista', 'Hastings Ranch', 'Playhouse Village'],
    considerations: [
      { title: 'Protecting historic character', text: 'Craftsman and Spanish Revival homes deserve materials and details that fit, from tile profiles to eave and trim work.' },
      { title: 'Summer heat in the San Gabriel Valley', text: 'Hot, dry summers bake roof coverings and underlayment, and attic ventilation plays a big part in how long shingles last.' },
      { title: 'Mature trees and falling debris', text: 'Pasadena’s tall trees shade roofs and fill valleys and gutters with leaves that hold water against the roof.' },
    ],
    faqs: [
      { q: 'Do you work on Craftsman homes in Pasadena?', a: 'Yes. We work on Craftsman bungalows across Pasadena and pay close attention to the exposed rafter tails, trim and eave details that give these homes their look.' },
      { q: 'Can you match the clay tile on an older Spanish Revival home?', a: 'We reuse sound tiles wherever we can and find the closest available match for broken ones. A roof evaluation tells you how much of your original tile can stay.' },
      { q: 'Which Pasadena neighborhoods do you serve?', a: 'All of them, including Old Pasadena, Bungalow Heaven, Madison Heights, Oak Knoll, San Rafael, Linda Vista and Hastings Ranch.' },
      { q: 'Do you handle flat roofs on mid-century homes?', a: 'Yes. Mid-century homes often have low-slope sections, and we plan [flat roofing](/residential-roofing/flat-roofing/) around drainage and how water actually moves across the roof.' },
    ],
    nearby: ['glendale', 'los-angeles', 'burbank'],
    final: { heading: 'Protect Your Pasadena Home’s Character', text: 'From Craftsman bungalows to mid-century homes, start with a free roof evaluation and a written scope for your Pasadena roof.' },
  },

  glendale: {
    keyword: 'glendale roofing',
    image: '/images/glendale-drone-view.webp',
    imagePosition: 'center 45%',
    metaTitle: 'Glendale Roofing & Roof Replacement',
    metaDescription: 'Glendale roofing for foothill, canyon and downtown homes: tile, shingle and flat roof repair and replacement with written scopes. Book a free roof evaluation.',
    blurb: 'Roofer-led inspections and clean workmanship for Glendale homes, including hillside and canyon properties.',
    hero: {
      heading: 'Glendale roofing',
      sub: 'Quality Roofing Specialists offers Glendale roofing for homes from Adams Hill to the foothills and canyons, repairing and replacing tile, shingle and flat roofs. A free roof evaluation comes first and shows whether Santa Ana winds have lifted shingles or shifted tiles.',
    },
    intro: {
      heading: 'Roofing Across Glendale’s Hills and Canyons',
      paragraphs: [
        'Glendale roofing covers a lot of different terrain. Homes in Verdugo Woodlands, Chevy Chase Canyon and Glenoaks Canyon sit close to open hillsides, while neighborhoods like Adams Hill and Rossmoyne are full of Spanish Revival and traditional homes with tile and shingle roofs. Each setting brings its own mix of wind, heat and access to plan around.',
        'We start with a roofer-led [free roof evaluation](#roof-check) and photos of every problem area, then explain your options in plain English. That might be a [tile roof tune-up](/roof-maintenance-plans/#tune-up) to secure tiles shifted by wind, a [shingle roof repair](/residential-roofing/shingle-roofing/repair/) after a storm, or a full replacement with a written scope and price.',
      ],
    },
    neighborhoods: ['Adams Hill', 'Rossmoyne', 'Verdugo Woodlands', 'Chevy Chase Canyon', 'Sparr Heights', 'Glenoaks Canyon', 'Montrose', 'Downtown Glendale'],
    considerations: [
      { title: 'Santa Ana winds', text: 'Strong, dry winds off the mountains can lift shingles and shift tiles, especially on exposed foothill and canyon homes.' },
      { title: 'Hillside and canyon access', text: 'Steep driveways and winding streets take planning for deliveries, equipment and a safe, clean job site.' },
      { title: 'Wildfire embers near open space', text: 'Near the hills, ember-resistant details like closed eaves, bird stops and well-sealed vents are worth a close look during an inspection.' },
    ],
    faqs: [
      { q: 'Do you serve hillside homes in Glendale?', a: 'Yes. We work on homes in the Glendale foothills and canyons, and we plan access, deliveries and safety into the written scope before work begins.' },
      { q: 'What should I check after a Santa Ana wind event?', a: 'Look for shingles or tiles in the yard, lifted edges and debris piled in valleys and gutters. If you see any of those, a roofer-led inspection will show whether anything needs attention before the next rain.' },
      { q: 'Which Glendale neighborhoods do you work in?', a: 'All of Glendale, including Adams Hill, Rossmoyne, Verdugo Woodlands, Chevy Chase Canyon, Sparr Heights, Glenoaks Canyon and Montrose.' },
    ],
    nearby: ['burbank', 'pasadena', 'los-angeles'],
    final: { heading: 'Roofing Glendale Homes Can Count On', text: 'Start with a free roof evaluation, photos of what we find and a written scope for your Glendale home.' },
  },

  burbank: {
    keyword: 'burbank roofing',
    image: '/images/burbank-drone-view.webp',
    imagePosition: 'center 45%',
    metaTitle: 'Burbank Roofing & Roof Repairs',
    metaDescription: 'Burbank roofing for Valley heat and mid-century homes: shingle, tile and flat roof repair and replacement with written scopes. Book a free roof evaluation.',
    blurb: 'Detail-first roof repair and replacement for Burbank homes, from Magnolia Park to the Burbank Hills.',
    hero: {
      heading: 'Burbank roofing',
      sub: 'Burbank roofing from Quality Roofing Specialists serves post-war and mid-century homes from Magnolia Park to the Burbank Hills, with repairs and replacements for shingle, tile and flat roofs. It starts with a free roof evaluation, often with a close look at attic ventilation.',
    },
    intro: {
      heading: 'Roofing for Burbank’s Mid-Century Homes',
      paragraphs: [
        'Burbank roofing has to stand up to long, hot Valley summers. Many homes here are post-war and mid-century houses in neighborhoods like Magnolia Park and the Media District, often with shingle roofs, low-slope additions and attics that run hot. Up in the Burbank Hills and the Rancho, homes also face dry winds coming off the mountains.',
        'Our process starts with a roofer-led [free roof evaluation](#roof-check): photos, plain-English answers and a clear next step. For many Burbank homes that means looking closely at attic ventilation, which affects how long shingles last. When it’s time for a [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/) or a [flat roof repair](/residential-roofing/flat-roofing/repair/), you get a written scope and price first.',
      ],
    },
    neighborhoods: ['Magnolia Park', 'Media District', 'Downtown Burbank', 'Rancho Equestrian District', 'Burbank Hills'],
    considerations: [
      { title: 'Valley heat and UV', text: 'Hot summers age shingles and underlayment faster, and poorly ventilated attics make the problem worse.' },
      { title: 'Mid-century roof lines', text: 'Low-slope additions, patio covers and garage roofs are common, and they need proper drainage and flashing where they meet the house.' },
      { title: 'Wind near the hills', text: 'Homes near the Verdugo Mountains can see strong, dry winds that lift loose shingles and push debris into valleys.' },
    ],
    faqs: [
      { q: 'Why does attic ventilation matter for my Burbank roof?', a: 'Heat that builds up in the attic cooks shingles from below. Balanced intake and exhaust ventilation helps shingles last, and it’s one of the things we look at during a [shingle roof inspection](/roof-inspection/#shingle-roofs).' },
      { q: 'Do you work on mid-century homes with flat sections?', a: 'Yes. We handle the low-slope additions and patio covers common on Burbank homes, and we plan them around drainage so water actually leaves the roof.' },
      { q: 'Which parts of Burbank do you serve?', a: 'All of Burbank, including Magnolia Park, the Media District, Downtown Burbank, the Rancho Equestrian District and the Burbank Hills.' },
    ],
    nearby: ['glendale', 'los-angeles', 'pasadena', 'woodland-hills'],
    final: { heading: 'Clear, Careful Roofing for Burbank', text: 'Get photos, plain-English answers and a written scope for your Burbank roof, starting with a free roof evaluation.' },
  },

  'woodland-hills': {
    keyword: 'woodland hills roofing',
    image: '/images/woodland-hills-office.webp', // hero photo: our Valley office building
    imagePosition: 'center 60%',
    metaTitle: 'Woodland Hills Roofing & Roof Repair',
    metaDescription: 'Woodland Hills roofing from our Valley office on Ventura Blvd: tile, shingle and flat roof repair and replacement. Book a free roof evaluation.',
    blurb: 'Roofer-led inspections, written scopes and clean installs for homes across Woodland Hills and the West Valley.',
    hero: {
      heading: 'Woodland Hills roofing',
      sub: 'Quality Roofing Specialists provides Woodland Hills roofing from its Valley office on Ventura Boulevard, repairing and replacing tile, shingle and flat roofs on homes from Corbin Palms to the hills south of the Boulevard. Crews are close by for a free roof evaluation.',
    },
    intro: {
      heading: 'Local Roofing From Our Woodland Hills Office',
      paragraphs: [
        'Woodland Hills roofing has to stand up to some of the hottest summers in Los Angeles. Homes here sit at the west end of the San Fernando Valley, from mid-century tracts like Corbin Palms to hillside houses south of Ventura Boulevard near the Santa Monica Mountains. Our Valley office is right on Ventura Boulevard, so our crews are close by for a [free roof evaluation](#roof-check), whether you live near Warner Center or up in the hills.',
        'Every visit ends with photos of what we found, a plain-English explanation, and a written scope and price before any work begins. Many Valley homes need attention where heat does the most damage: aging [shingle roofs](/residential-roofing/shingle-roofing/), dried-out underlayment under [tile](/residential-roofing/tile-roofing/) and low-slope sections that call for a [flat roof repair](/residential-roofing/flat-roofing/repair/). From the same office we also serve Tarzana, Encino, Canoga Park, West Hills and Calabasas.',
      ],
    },
    neighborhoods: ['Warner Center', 'Walnut Acres', 'Corbin Palms', 'Forest Hills', 'Serrania', 'South of the Boulevard'],
    considerations: [
      { title: 'Valley heat and sun', text: 'Long, hot summers dry out underlayment and sealants and age shingles faster, especially on south- and west-facing slopes.' },
      { title: 'Attic heat and ventilation', text: 'A hot attic cooks shingles from below, so balanced intake and exhaust ventilation is one of the first things we check.' },
      { title: 'Fire season near the hills', text: 'Homes near the Santa Monica Mountains benefit from ember-resistant details like closed eaves, bird stops and well-sealed vents.' },
    ],
    faqs: [
      { q: 'Where is your Woodland Hills office?', a: 'Our Valley office is at 22900 Ventura Blvd, Suite 124, Woodland Hills, CA 91364. Call (310) 340-1643 to book a free roof evaluation or ask a question.' },
      { q: 'Which parts of the Valley do you serve from Woodland Hills?', a: 'All of Woodland Hills, including Warner Center, Walnut Acres and the hills south of Ventura Boulevard, plus nearby Tarzana, Encino, Canoga Park, West Hills and Calabasas. Check your ZIP code on the map on this page.' },
      { q: 'How does Valley heat affect my roof?', a: 'Heat breaks down underlayment, sealants and shingles faster, and a hot attic makes it worse. A [shingle roof inspection](/roof-inspection/#shingle-roofs) shows how your roof is holding up, with photos.' },
      { q: 'Do you work on hillside homes near the Santa Monica Mountains?', a: 'Yes. Steep lots and narrow roads take extra planning for access, deliveries and safety, and we build that into the written scope before work starts.' },
    ],
    nearby: ['los-angeles', 'burbank', 'santa-monica'],
    final: { heading: 'Roofing Help From Our Valley Office', text: 'Start with a free roof evaluation, photos of what we find and a written scope for your Woodland Hills home.' },
  },

  torrance: {
    keyword: 'torrance roofing',
    image: '/images/torrance-drone-view.webp',
    imagePosition: 'center 45%',
    metaTitle: 'Torrance Roofing & Roof Replacement',
    metaDescription: 'Torrance roofing for South Bay homes: shingle, tile and flat roof repair and replacement with clear, written scopes. Book a roofer-led free roof evaluation.',
    blurb: 'Roofer-led inspections and detail-first installs for Torrance homes, from Old Torrance to the Hollywood Riviera.',
    hero: {
      heading: 'Torrance roofing',
      sub: 'Quality Roofing Specialists brings detail-first Torrance roofing to homes from the coastal Hollywood Riviera to warmer North Torrance, repairing and replacing shingle, tile and flat roofs and patio covers. A free roof evaluation photo-documents the roof, including past repairs, before we recommend anything.',
    },
    intro: {
      heading: 'Roofing for Torrance and the South Bay',
      paragraphs: [
        'Torrance roofing spans two different climates in one city. Homes near the Hollywood Riviera and Seaside get cool, damp ocean air, while neighborhoods farther inland like North Torrance run warmer. Much of the housing dates from the post-war and mid-century decades, so it’s common to find roofs that have been redone before, sometimes with details worth a careful look.',
        'We start with a roofer-led [free roof evaluation](#roof-check), photograph what we find and explain it in plain English. Whether you need a [shingle roof repair](/residential-roofing/shingle-roofing/repair/), a [flat roof replacement](/residential-roofing/flat-roofing/replacement/) on a patio cover or addition, or a full new roof, the written scope and price come before any work.',
      ],
    },
    neighborhoods: ['Old Torrance', 'Hollywood Riviera', 'Walteria', 'Seaside', 'Southwood', 'West Torrance', 'North Torrance'],
    considerations: [
      { title: 'Ocean air on the west side', text: 'Homes closer to the coast see more moisture and salt, which wears on flashings, vents and fasteners.' },
      { title: 'Roofs that have been redone before', text: 'Older roofs sometimes hide past repairs or extra layers, which is why we photo-document what we find before recommending anything.' },
      { title: 'Patio covers and additions', text: 'Low-slope patio covers and room additions are common, and the joint where they meet the main roof is a frequent leak point.' },
    ],
    faqs: [
      { q: 'Do you serve all of Torrance?', a: 'Yes, including Old Torrance, the Hollywood Riviera, Walteria, Seaside, Southwood, West Torrance and North Torrance.' },
      { q: 'My roof has been patched many times. Should I replace it?', a: 'Not necessarily. A roofer-led inspection shows whether the patches are holding and what the rest of the roof looks like, so you can weigh a repair against a [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/) with real information.' },
      { q: 'Can you fix a leaking patio cover roof?', a: 'Yes. Many patio cover leaks start at the connection to the house or where water ponds, and a [flat roof repair](/residential-roofing/flat-roofing/repair/) addresses the cause, not just the stain.' },
      { q: 'Do you install tile roofs in the South Bay?', a: 'Yes. We install and repair [tile roofing](/residential-roofing/tile-roofing/), and we can talk through clay and concrete options during your roof evaluation.' },
    ],
    nearby: ['long-beach', 'los-angeles', 'santa-monica'],
    final: { heading: 'A Straight Answer for Your Torrance Roof', text: 'No pressure and no surprises: start with a free roof evaluation and a written scope for your Torrance home.' },
  },

  'long-beach': {
    keyword: 'long beach roofing',
    metaTitle: 'Long Beach Roofing & Roof Repair',
    metaDescription: 'Long Beach roofing for coastal and historic homes: tile, shingle and flat roof repair and replacement from a detail-first team. Book a free roof evaluation.',
    blurb: 'Clear inspections and clean workmanship for Long Beach homes near the water and farther inland.',
    hero: {
      heading: 'Long Beach roofing',
      sub: 'Quality Roofing Specialists delivers Long Beach roofing for beach cottages in Naples and historic homes in California Heights, repairing and replacing tile, shingle and flat roofs. A free roof evaluation shows whether older clay tile needs a lift & relay or just a repair.',
    },
    intro: {
      heading: 'Roofing for Long Beach’s Coastal and Historic Homes',
      paragraphs: [
        'Long Beach roofing ranges from beach cottages in Belmont Shore and Naples to the Spanish Revival and Craftsman homes of California Heights and Bixby Knolls. Near the water, salt air and the marine layer are part of daily life for a roof; inland, older homes often have original details and roof lines that call for a careful, experienced hand.',
        'We begin with a roofer-led [free roof evaluation](#roof-check) and share photos of what we find. For many older Long Beach homes, the key question is whether a clay tile roof needs a [tile lift & relay](/residential-roofing/tile-roofing/lift-and-relay/) or just a [tile roof repair](/residential-roofing/tile-roofing/repair/). Whatever the answer, the written scope and price come first.',
      ],
    },
    neighborhoods: ['Belmont Shore', 'Naples', 'Belmont Heights', 'Alamitos Beach', 'Bixby Knolls', 'California Heights', 'Wrigley', 'Los Altos', 'Park Estates'],
    considerations: [
      { title: 'Salt air near the water', text: 'Coastal neighborhoods see faster corrosion on metal flashings and fasteners, and damp mornings can keep shaded slopes wet.' },
      { title: 'Historic homes and original details', text: 'California Heights and Bixby Knolls are known for homes from the 1920s and 1930s, where tile profiles and trim details are worth preserving.' },
      { title: 'Tight lots and close neighbors', text: 'Narrow lots in neighborhoods like Belmont Heights and Naples mean careful staging so debris stays out of neighbors’ yards.' },
    ],
    faqs: [
      { q: 'Which Long Beach neighborhoods do you serve?', a: 'All of Long Beach, including Belmont Shore, Naples, Belmont Heights, Alamitos Beach, Bixby Knolls, California Heights, Wrigley, Los Altos and Park Estates.' },
      { q: 'Do you work on older and historic homes?', a: 'Yes. On older homes we plan around original details like decorative tile, trim and eaves, and we photo-document the roof before and during the work so nothing is a surprise.' },
      { q: 'Can you replace a flat roof on a beach cottage?', a: 'Yes. Many coastal cottages and additions have low-slope roofs, and a [flat roof replacement](/residential-roofing/flat-roofing/replacement/) starts with a close look at drainage and at the edges, where salt air does the most damage.' },
      { q: 'How do I book a free roof evaluation in Long Beach?', a: 'Use the form on this page or call us. A roofer will inspect your roof, photograph what they find and walk you through a clear next step.' },
    ],
    nearby: ['torrance', 'huntington-beach', 'anaheim'],
    final: { heading: 'From the Shore to the Knolls', text: 'Start with a free roof evaluation and a written scope for your Long Beach home, wherever it sits in the city.' },
  },

  anaheim: {
    keyword: 'anaheim roofing',
    image: '/images/anaheim-drone-view.webp',
    imagePosition: 'center 40%',
    metaTitle: 'Anaheim Roofing & Roof Repair',
    metaDescription: 'Anaheim roofing from Anaheim Hills to the Colony: shingle, tile and flat roof repair and replacement with written scopes. Book a free roof evaluation today.',
    blurb: 'Roofer-led inspections and detail-first installs for Anaheim homes, from the Colony to Anaheim Hills.',
    hero: {
      heading: 'Anaheim roofing',
      sub: 'Anaheim roofing at Quality Roofing Specialists spans concrete tile, shingle and low-slope roofs on historic homes in the Anaheim Colony and hillside houses in Anaheim Hills, from targeted repairs to full replacements. Every project starts with a free roof evaluation.',
    },
    intro: {
      heading: 'Roofing for Historic and Hillside Anaheim Homes',
      paragraphs: [
        'Anaheim roofing covers everything from historic homes in the Anaheim Colony to newer hillside houses in Anaheim Hills. Inland heat is hard on roof coverings across the city, and homes near the hills also deal with dry Santa Ana winds. Many neighborhoods mix concrete tile, shingle and low-slope roofs on the same street.',
        'Every project starts with a roofer-led [free roof evaluation](#roof-check) and photos you can see for yourself. From a [tile roof replacement](/residential-roofing/tile-roofing/replacement/) in Anaheim Hills to a [shingle roof tune-up](/roof-maintenance-plans/#tune-up) on an older home, you get a written scope and price before any work begins, with no pressure and no mystery pricing.',
      ],
    },
    neighborhoods: ['Anaheim Hills', 'Anaheim Colony', 'Downtown Anaheim', 'West Anaheim', 'Platinum Triangle'],
    considerations: [
      { title: 'Inland heat', text: 'Hot summers dry out underlayment and sealants, so aging roofs here often show wear on the sunniest slopes first.' },
      { title: 'Santa Ana winds in Anaheim Hills', text: 'Hillside homes are more exposed to strong, dry winds that can loosen tiles and lift shingle edges.' },
      { title: 'Historic homes in the Colony', text: 'Older homes in the Anaheim Colony have roof lines and details worth preserving, which calls for careful material choices.' },
    ],
    faqs: [
      { q: 'Do you serve Anaheim Hills?', a: 'Yes. We work in Anaheim Hills and across the rest of Anaheim, including the Anaheim Colony, Downtown Anaheim, West Anaheim and the Platinum Triangle.' },
      { q: 'My concrete tile roof is leaking. Does it need replacing?', a: 'Not always. Concrete tiles often outlast the underlayment beneath them, so the fix may be a [tile lift & relay](/residential-roofing/tile-roofing/lift-and-relay/) rather than a new roof. A roofer-led inspection tells you which.' },
      { q: 'Can wind damage be repaired without a new roof?', a: 'Often, yes. Lifted shingles, slipped tiles and bent flashing can usually be fixed with a targeted repair, and we photograph the damage so you can see what we see.' },
      { q: 'Do you work on low-slope roofs in Anaheim?', a: 'Yes. We repair and replace [flat roofing](/residential-roofing/flat-roofing/) on additions, garages and patio covers, with drainage planned in from the start.' },
    ],
    nearby: ['santa-ana', 'irvine', 'long-beach'],
    final: { heading: 'Roofing Done Right for Anaheim Homes', text: 'Start with a free roof evaluation, photos of what we find and a clear written scope for your Anaheim roof.' },
  },

  'santa-ana': {
    keyword: 'santa ana roofing',
    image: '/images/santa-ana-drone-view.webp',
    imagePosition: 'center 50%',
    metaTitle: 'Santa Ana Roofing & Roof Replacement',
    metaDescription: 'Santa Ana roofing for historic and modern homes: tile, shingle and flat roof repair and replacement with written scopes. Book a free roof evaluation today.',
    blurb: 'Clear inspections and clean workmanship for Santa Ana homes, from Floral Park to Park Santiago.',
    hero: {
      heading: 'Santa Ana roofing',
      sub: 'Santa Ana roofing from Quality Roofing Specialists covers historic Spanish Revival and Craftsman homes in Floral Park and French Park as well as ranch homes and newer houses, with tile, shingle and flat roof repair and replacement. Original tile and trim get careful matching.',
    },
    intro: {
      heading: 'Roofing for Santa Ana’s Historic Neighborhoods',
      paragraphs: [
        'Santa Ana roofing often starts with history. Neighborhoods like Floral Park, French Park and Washington Square are full of homes from the early twentieth century, many with Spanish Revival tile or Craftsman details. Elsewhere in the city, ranch homes and newer houses bring shingle and low-slope roofs into the mix, all under the same strong inland sun.',
        'We begin every project with a roofer-led [free roof evaluation](#roof-check), photos of what we find and a plain-English explanation. That might point to a [tile roof repair](/residential-roofing/tile-roofing/repair/) on a historic home, a [flat roof tune-up](/roof-maintenance-plans/#tune-up) on an addition, or a full replacement with a written scope and price.',
      ],
    },
    neighborhoods: ['Floral Park', 'French Park', 'Washington Square', 'Wilshire Square', 'Morrison Park', 'Park Santiago', 'Downtown Santa Ana'],
    considerations: [
      { title: 'Historic neighborhoods', text: 'Older homes in Floral Park and French Park often have original tile and trim details that deserve careful matching.' },
      { title: 'Strong inland sun', text: 'Sun and heat break down underlayment and sealants over time, even when the tiles on top still look fine.' },
      { title: 'Additions and flat sections', text: 'Many older homes have later additions with low-slope roofs, where the joint with the original roof needs watching.' },
    ],
    faqs: [
      { q: 'Which Santa Ana neighborhoods do you serve?', a: 'All of Santa Ana, including Floral Park, French Park, Washington Square, Wilshire Square, Morrison Park, Park Santiago and Downtown Santa Ana.' },
      { q: 'Can you repair the roof on an older home without replacing it?', a: 'Often, yes. On older homes we start by finding the real cause of a leak, and many problems can be fixed with a targeted repair. The roof evaluation tells you what applies.' },
      { q: 'Do tile roofs need maintenance?', a: 'Yes. Tiles last a long time, but the underlayment, flashings and valleys need attention. [Tile roof care](/roof-maintenance-plans/#roof-types) keeps small problems from becoming leaks.' },
      { q: 'Do you replace shingle roofs in Santa Ana?', a: 'Yes. A [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/) includes a written scope and price up front and ends with a final walkthrough of the finished roof.' },
    ],
    nearby: ['anaheim', 'irvine', 'huntington-beach'],
    final: { heading: 'Start Your Santa Ana Roof Project Right', text: 'No pressure and no mystery pricing. Book a free roof evaluation for your Santa Ana home today.' },
  },

  'huntington-beach': {
    keyword: 'huntington beach roofing',
    image: '/images/huntington-beach-drone-view.webp',
    imagePosition: 'center 55%',
    metaTitle: 'Huntington Beach Roofing & Repairs',
    metaDescription: 'Huntington Beach roofing built for salt air and ocean wind: tile, shingle and flat roof repair and replacement. Book a roofer-led free roof evaluation today.',
    blurb: 'Roofer-led inspections and clean installs for homes from Huntington Harbour to Seacliff.',
    hero: {
      heading: 'Huntington Beach roofing',
      sub: 'For Huntington Beach roofing, Quality Roofing Specialists repairs and replaces concrete tile, shingle and low-slope roofs on homes from Huntington Harbour to Seacliff. Every free roof evaluation includes photos of the flashings, vents and fasteners that coastal air affects most.',
    },
    intro: {
      heading: 'Roofing for Huntington Beach’s Coastal Homes',
      paragraphs: [
        'Huntington Beach roofing lives with the ocean. Fog, salt and onshore wind reach well inland, and homes in Huntington Harbour, Sunset Beach and Seacliff take the brunt of it. Across the city you’ll find concrete tile, shingle and low-slope roofs, and each one handles coastal conditions differently, especially at metal flashings, vents and fasteners.',
        'We start every project with a roofer-led [free roof evaluation](#roof-check) and photos of the areas coastal air affects most. Depending on what we find, the next step could be a [shingle roof tune-up](/roof-maintenance-plans/#tune-up), a [tile roof replacement](/residential-roofing/tile-roofing/replacement/) or simply keeping an eye on things, and you get a written scope and price before any work.',
      ],
    },
    neighborhoods: ['Huntington Harbour', 'Sunset Beach', 'Seacliff', 'Edwards Hill', 'Downtown Huntington Beach'],
    considerations: [
      { title: 'Fog and salt air', text: 'Coastal moisture and salt speed up corrosion on flashings, vents and gutters, so those details get extra attention.' },
      { title: 'Onshore wind', text: 'Steady ocean breezes and winter storms test loose shingles, tiles and ridge caps along the coast.' },
      { title: 'Waterfront exposure', text: 'Homes near the harbour and the beach face the most moisture, which makes ongoing [roof care](/roof-maintenance-plans/#roof-types) worth considering.' },
    ],
    faqs: [
      { q: 'Which Huntington Beach neighborhoods do you serve?', a: 'All of Huntington Beach, including Huntington Harbour, Sunset Beach, Seacliff, Edwards Hill and the downtown area.' },
      { q: 'How often should a coastal roof be checked?', a: 'A look once a year and after major storms is a sensible rhythm, since salt air works on metal parts steadily. Ongoing roof care keeps a photo record, so you can see changes over time.' },
      { q: 'Do you work on concrete tile roofs?', a: 'Yes. Concrete tile is common across Huntington Beach, and we repair it, re-lay it over new underlayment and replace it when the time comes.' },
      { q: 'Can you replace rusted flashings?', a: 'Yes. We replace worn flashings as part of roof work, since salt air near the water is hard on metal flashings.' },
    ],
    nearby: ['newport-beach', 'long-beach', 'santa-ana'],
    final: { heading: 'Salt-Air-Ready Roofing for Huntington Beach', text: 'Start with a free roof evaluation and see exactly how the coast is treating your Huntington Beach roof.' },
  },

  irvine: {
    keyword: 'irvine roofing',
    image: '/images/irvine-drone-view.webp',
    imagePosition: 'center 40%',
    metaTitle: 'Irvine Roofing & Roof Replacement',
    metaDescription: 'Irvine roofing for concrete tile, shingle and flat roofs across the villages: repair, lift & relay and replacement. Book a roofer-led free roof evaluation.',
    blurb: 'Clear inspections, written scopes and clean workmanship for homes across Irvine’s villages.',
    hero: {
      heading: 'Irvine roofing',
      sub: 'Quality Roofing Specialists handles Irvine roofing from Woodbridge to Turtle Rock, repairing and replacing concrete tile, shingle and flat roofs. On older tile roofs the underlayment is usually what wears out, and a lift & relay can replace it while keeping your tiles.',
    },
    intro: {
      heading: 'Irvine Roofs Start With What’s Under the Tile',
      paragraphs: [
        'Irvine roofing means a lot of concrete tile. Across villages like Woodbridge, Northwood, Turtle Rock and University Park, many homes were built with tile roofs, and some of those roofs have been in place for decades. The tiles themselves usually hold up well; the underlayment beneath them is what wears out, and that’s where many leaks begin.',
        'We start with a roofer-led [free roof evaluation](#roof-check) that looks beneath the surface where we can and documents it with photos. Often the answer is a [tile lift & relay](/residential-roofing/tile-roofing/lift-and-relay/) that keeps your existing tiles; sometimes it’s a [tile roof replacement](/residential-roofing/tile-roofing/replacement/). Either way, you get a written scope and price before any work begins.',
      ],
    },
    neighborhoods: ['Woodbridge', 'Northwood', 'Turtle Rock', 'University Park', 'Westpark', 'Quail Hill', 'Orchard Hills', 'Portola Springs'],
    considerations: [
      { title: 'Aging underlayment under tile', text: 'On older tile roofs the underlayment is often the weak point, even when the tiles on top look fine from the street.' },
      { title: 'Inland sun and heat', text: 'Irvine’s sunny climate is hard on underlayment, sealants and the flat sections found on some newer homes.' },
      { title: 'Similar homes, similar timing', text: 'Homes in the same village were often built around the same time, so neighbors tend to see similar roof issues at a similar age.' },
    ],
    faqs: [
      { q: 'Which Irvine villages do you serve?', a: 'All of Irvine, including Woodbridge, Northwood, Turtle Rock, University Park, Westpark, Quail Hill, Orchard Hills and Portola Springs.' },
      { q: 'What does a tile lift & relay involve?', a: 'We remove your tiles, install new underlayment and flashings, then reset the same tiles and replace any that are broken. It’s often the most practical fix for a leaking concrete tile roof.' },
      { q: 'Do you work on shingle and flat roofs in Irvine too?', a: 'Yes. We handle [shingle roofing](/residential-roofing/shingle-roofing/) and [flat roofing](/residential-roofing/flat-roofing/) as well, including the low-slope sections on some newer homes.' },
      { q: 'How do I know if my tile roof needs attention?', a: 'Stains on ceilings after rain, cracked or slipped tiles and debris-filled valleys are common signs. A roofer-led inspection will show you what’s going on underneath, with photos.' },
    ],
    nearby: ['santa-ana', 'newport-beach', 'anaheim'],
    final: { heading: 'Detail-First Roofing for Irvine Homes', text: 'Find out what’s really going on under your tiles with a free roof evaluation for your Irvine home.' },
  },

  'newport-beach': {
    keyword: 'newport beach roofing',
    image: '/images/newport-beach-drone-view.webp',
    imagePosition: 'center 55%',
    metaTitle: 'Newport Beach Roofing & Roof Repair',
    metaDescription: 'Newport Beach roofing for coastal homes: tile, shingle and flat roof repair and replacement. Book a roofer-led free roof evaluation.',
    blurb: 'Roofer-led inspections and detail-first installs for homes from Corona del Mar to Newport Coast.',
    hero: {
      heading: 'Newport Beach roofing',
      sub: 'Quality Roofing Specialists provides Newport Beach roofing from Balboa Island and Lido Isle to Corona del Mar and Newport Coast, repairing and replacing tile, shingle and flat roofs. A free roof evaluation shows how salt air and ocean wind are treating your roof.',
    },
    intro: {
      heading: 'Roofing for Newport Beach, From the Islands to the Bluffs',
      paragraphs: [
        'Newport Beach roofing has to handle constant coastal exposure. Homes on Balboa Island, Lido Isle and the Balboa Peninsula sit right in the salt air, while Corona del Mar, Newport Heights and Newport Coast see ocean wind and marine layer from the bluffs above. Roof styles range from tile and shingle to flat roofs on homes of every age and style.',
        'We start with a roofer-led [free roof evaluation](#roof-check), photograph the areas coastal conditions affect most and explain what we find in plain English. That could lead to a [flat roof repair](/residential-roofing/flat-roofing/repair/) or a tile or shingle replacement, always with a written scope and price first.',
      ],
    },
    neighborhoods: ['Corona del Mar', 'Balboa Island', 'Balboa Peninsula', 'Lido Isle', 'Newport Heights', 'Eastbluff', 'Dover Shores', 'Newport Coast'],
    considerations: [
      { title: 'Constant salt exposure', text: 'On the islands and the peninsula, salt air never lets up, so flashings, fasteners and gutters need corrosion-resistant choices and regular checks.' },
      { title: 'Ocean wind on the bluffs', text: 'Homes on the bluffs and hillsides see steady wind that can loosen tiles and ridge details over time.' },
      { title: 'Modern designs with flat roofs', text: 'Contemporary homes often combine flat roofs, roof decks and metal accents, where every transition has to be detailed carefully.' },
    ],
    faqs: [
      { q: 'Which Newport Beach neighborhoods do you serve?', a: 'All of Newport Beach, including Corona del Mar, Balboa Island, the Balboa Peninsula, Lido Isle, Newport Heights, Eastbluff, Dover Shores and Newport Coast.' },
      { q: 'Do you work on homes on Balboa Island and the peninsula?', a: 'Yes. Tight lots and close neighbors there take careful planning for staging and cleanup, and we build that into the written scope.' },
      { q: 'Do you offer ongoing roof care for coastal homes?', a: 'Yes. Scheduled [roof care](/roof-maintenance-plans/#roof-types) helps catch salt-air wear early, with photo records from each visit.' },
    ],
    nearby: ['irvine', 'huntington-beach', 'santa-ana'],
    final: { heading: 'Coastal Roofing for Newport Beach Homes', text: 'See exactly how salt air and wind are treating your roof with a free roof evaluation for your Newport Beach home.' },
  },

  vernon: {
    keyword: 'vernon roofing',
    image: '/images/vernon-industrial.webp',
    imagePosition: 'center 55%',
    offer: 'commercial',
    metaTitle: 'Vernon Roofing & Commercial Roof Repair',
    metaDescription: 'Vernon roofing for the city’s warehouses, plants and commercial buildings: repair, replacement and inspection with written scopes. Request a roof survey.',
    blurb: 'Roofer-led inspections and clean installs for the warehouses, manufacturing plants and commercial buildings across Vernon.',
    hero: {
      heading: 'Vernon roofing',
      sub: 'Quality Roofing Specialists offers Vernon roofing from its local office, repairing, replacing and maintaining the large low-slope roofs on the city’s warehouses, manufacturing plants and food-processing facilities. It starts with a roofer-led roof survey, and we plan the work to keep the building operating.',
    },
    intro: {
      heading: 'Roofing Built for Vernon’s Industrial Buildings',
      paragraphs: [
        'Vernon calls itself “exclusively industrial,” and the roofs here show it: wide, low-slope roofs over warehouses, manufacturing plants and food-processing facilities, built to cover large open floor plans rather than a typical house roof. Our Vernon office keeps us close to these buildings and to the surrounding industrial areas near Downtown Los Angeles.',
        'It starts with a roofer-led [roof survey](#roof-check), not a sales pitch. We photo-document the roof, explain what we find in plain English and give you a written scope and price before any work begins — the same process whether the job is a [flat roof repair](/residential-roofing/flat-roofing/repair/), a full [commercial roof replacement](/commercial-roofing/replacement/) or ongoing [commercial roof maintenance](/commercial-roofing/maintenance/).',
      ],
    },
    neighborhoods: [],
    considerations: [
      { title: 'Large, low-slope roofs', text: 'Warehouses and plants rely on wide flat and low-slope roof systems, where drainage and seam detail matter more than they do on a typical house roof.' },
      { title: 'Heavy rooftop equipment', text: 'HVAC units, exhaust systems and other rooftop equipment need flashing and curbs that are sealed and maintained, especially around food-processing and manufacturing exhaust.' },
      { title: 'Roofs that can’t shut down', text: 'Plants and warehouses often run around the clock, so we plan the work to keep the building operating while the roof gets done.' },
    ],
    faqs: [
      { q: 'Do you work on warehouse and plant roofs in Vernon?', a: 'Yes. Vernon is almost entirely industrial and commercial buildings, and that’s exactly the kind of large, low-slope roof we work on — [commercial roofing](/commercial-roofing/) repair, replacement and maintenance.' },
      { q: 'Can you work on a roof without shutting down the building?', a: 'In most cases, yes. Vernon’s plants and warehouses often run continuously, so we plan the work, staging and access around keeping the building open.' },
      { q: 'Do you handle food-processing and manufacturing facilities?', a: 'Yes. We work with the rooftop equipment, exhaust systems and drainage details common on manufacturing and food-processing buildings, and document everything with photos.' },
      { q: 'Where is your Vernon office?', a: 'Our Vernon office is at 2850 E 46th St, Unit B, Vernon, CA 90058. Call (310) 340-1643 to book a roof survey or ask a question.' },
    ],
    nearby: ['los-angeles'],
    final: { heading: 'A Clear Scope for Your Vernon Building', text: 'Start with a roofer-led roof survey and get a written scope and price for your Vernon warehouse, plant or commercial building.' },
  },
};
