// Commercial service pages: /commercial-roofing/repair/, /commercial-roofing/replacement/ and /commercial-roofing/maintenance/.
import { BUSINESS, GOOGLE_REVIEWS } from '../site';

export const COMMERCIAL_SERVICES = [
  {
    slug: 'repair',
    keyword: 'commercial roof repair',
    title: 'Commercial Roof Repair',
    h1: 'Commercial Roof Repair in Los Angeles & Orange County',
    navLabel: 'Roof Repair',
    card: 'Leaks traced to where the water gets in, then repaired at drains, parapets, seams and rooftop equipment, with before-and-after photos.',
    // Meta for the searches the owner picked (October 30 2026: commercial roof repair (services, experts), commercial roof repair los angeles,
    // commercial roofing repair(s) orange county, commercial roof leak repair los angeles, commercial roofing replacement orange county).
    // 58 / 160 characters; the survey is never called free.
    metaTitle: 'Commercial Roof Repair Los Angeles & Orange County Experts',
    metaDescription: 'Commercial roof repair services in Los Angeles & Orange County: commercial roof leak repair, roofing repairs and replacement by local experts. Request a survey.',
    image: '/images/cta-flat-roof-install-drone-view.webp',
    imageAlt: 'Roofers working on a white low-slope roof with rooftop units, seen from above',
    hero: {
      intro: 'Commercial roof repair starts where the water gets in. A drain, a parapet, a seam or the flashing at rooftop equipment: we trace the leak and fix what failed. Your building stays open, and every repair gets before-and-after photos, across Los Angeles and Orange County.',
      highlights: ['Leaks traced to where water enters', 'Drains, parapets and penetrations', 'Photo records for owners and tenants'],
    },
    // Told the home page's way (owner, October 16 2026; ServiceStory): one statement, one paragraph, then the principles, each fact said once
    story: {
      label: 'Commercial roof repair',
      lead: 'On a low-slope roof, water rarely drips where it gets __in__.',
      text: 'It slips under a lap, travels along the deck and shows up over a different office, aisle or bay, which is why a patch above the stain so often fails. A repair is only as good as the diagnosis behind it.',
      heading: 'How we repair a commercial roof',
      principles: [
        { title: 'Start with what you know.', text: 'Where water shows up inside, when it happens and what has been patched before tell the roofer where to start looking.', bullets: ['Interior stains and drip locations', 'Leaks tied to heavy rain or wind', 'Past repairs and patches'] },
        { title: 'Trace it on the roof.', text: 'A roofer works back from the leak area, checking every detail that could feed it, from seams and laps to the flashing at rooftop units, drain bowls, scuppers and the base of parapet walls, and photographs what they find.' },
        { title: 'Fixed to match the roof, with the building open.', text: 'You get a written scope and price, plus a note on anything else worth watching. The repair ties into the existing modified bitumen or other low-slope system, and timing, access and noise are agreed with your building contact so the building stays open while we work.' },
        { title: 'One record for owners, managers and tenants.', text: 'Photos of the problem and the finished repair give everyone the same picture. If the roof is worn across the whole surface, we’ll say so plainly, and those photos become the starting point for planning a [commercial roof replacement](/commercial-roofing/replacement/).' },
      ],
    },
    faqs: [
      { q: 'Can you repair storm damage on a commercial roof?', a: 'Yes. When Santa Ana winds or a winter storm damage the roof or start a leak, call us: a roofer assesses and photo-documents the damage and adds temporary protection if it’s needed to limit further water damage. The permanent repair follows with a written scope and price, and our photos and scope can be shared with your insurance company. Learn more about [emergency and storm-damage roof repair](/roof-repair/emergency/).' },
      { q: 'Our roof drain keeps backing up. Is that a roofing problem?', a: 'Often, yes. Debris can clog the strainer, the flashing around the drain bowl can fail, or low spots can keep water from reaching the drain at all. We check all three and repair the roofing side, and if the blockage is deeper in the drain line, we’ll tell you so a plumber can clear it.' },
      { q: 'Will you need access inside the building?', a: 'Sometimes. Seeing where water shows up inside helps us trace a leak, so we may ask to look at a ceiling or the area under a drain. Most repair work happens on the roof, and we’ll arrange any interior visit with you ahead of time.' },
      { q: 'Can you send the repair details to our owner or tenants?', a: 'Yes. Along with the written scope, you get before-and-after photos and a plain-English note on what failed and what we did. It’s easy to forward to ownership, file with your building records or share with the tenant who reported the leak.' },
      { q: 'How can we keep the next leak from happening?', a: 'Most commercial leaks start at details that wear gradually, like a drain that collects debris or sealant that dries out in the sun. Scheduled [commercial roof maintenance](/commercial-roofing/maintenance/) catches those early and ends each visit with a photo report. If a repair is due, you’ll see a written price first.' },
    ],
    related: ['/commercial-roofing/replacement/', '/commercial-roofing/maintenance/', '/roof-repair/emergency/'],
  },

  {
    slug: 'replacement',
    keyword: 'commercial roof replacement',
    title: 'Commercial Roof Replacement',
    h1: 'Commercial Roof Replacement in Los Angeles & Orange County',
    navLabel: 'Roof Replacement',
    card: 'When repairs stop adding up: a roofer-led survey, the right low-slope system for your building and phased work that keeps you open.',
    // Broader title for the general "commercial roofing Los Angeles" searches (owner, October 22 2026; the keyword stays in it, the H1 is unchanged)
    metaTitle: 'Commercial Roof Replacement in Los Angeles',
    metaDescription: 'Commercial roof replacement in LA & Orange County: a roofer-led survey, the right low-slope system and phased work that keeps you open. Request an estimate.',
    image: '/images/flat-roof-replacement-tear-off-drone-view.webp',
    imageAlt: 'Commercial roof replacement in Los Angeles: flat roof aerial view, with the old roofing stripped back',
    heroNotes: [`Los Angeles commercial roofing contractor · CSLB #${BUSINESS.license}`, 'Serving LA, Orange County & Southern California', 'Roofer-led roof survey', 'Written scope and price before any work'],
    // A short section after "How we replace a commercial roof" (ServicePage `about`)
    about: {
      heading: 'Commercial roofing company in Los __Angeles__',
      paragraphs: [
        `QRS is a Los Angeles commercial roofing company with ${GOOGLE_REVIEWS.count} Google reviews from the people we roof for. Our commercial roofing contractors handle replacement, installation and [commercial roofing repair](/commercial-roofing/repair/) in Los Angeles, CA, from small retail buildings to [warehouses](/commercial-roofing/warehouses/) and other large flat roofs, with [roof maintenance](/commercial-roofing/maintenance/) once the work is done. If you’re comparing commercial roofers in Los Angeles, start with a roofer-led roof survey and a written price, then read [how to choose a commercial roofing contractor in Los Angeles](/blog/how-to-choose-a-commercial-roofing-contractor/).`,
      ],
    },
    reviewsHeading: 'What people in Los Angeles say after the __job__',
    hero: {
      intro: 'Commercial roof replacement in phases, so your doors stay open. Section by section, the worn roof comes off and a new low-slope system chosen for your building goes on. It starts with a roofer-led survey that shows whether replacement is due now or can wait, across Los Angeles and Orange County.',
      highlights: ['Survey before any recommendation', 'System chosen for drainage and use', 'Phased so your building stays open'],
    },
    // Told the home page's way (owner, October 16 2026; ServiceStory): one statement, one paragraph, then the principles, each fact said once
    story: {
      label: 'Commercial roof replacement',
      lead: 'A new roof should rest on photos and facts, not a __pitch__.',
      text: 'Leaks in new places every rainy season, seams opening across the field, surfacing worn thin by the sun and soft spots underfoot are signs that [commercial roof repair](/commercial-roofing/repair/) in Los Angeles has run its course. As commercial roofers serving Los Angeles and Orange County, we start with a roofer-led survey that shows whether replacement is due now, belongs in next year’s budget or can wait.',
      heading: 'How we replace a commercial roof',
      principles: [
        { title: 'Survey the whole roof first.', text: 'A roofer walks the entire roof, photographs it area by area and notes how water drains, where equipment sits and how the roof has held up.', bullets: ['Seams, surfacing and past patches', 'Soft or wet areas underfoot', 'Drains, curbs and parapet details'] },
        { title: 'A system matched to the building.', text: 'Drainage, rooftop equipment and foot traffic shape what we recommend, from [modified bitumen and other low-slope systems](/residential-roofing/flat-roofing/) to [TPO roofing](/commercial-roofing/tpo-roofing/), for commercial roof installation in Los Angeles, CA. The scope, price and phasing plan are in writing before work starts.' },
        { title: 'Section by section, so your doors stay open.', text: 'Whether your commercial roof is replaced in Los Angeles or elsewhere in Southern California, our crews, from a local Los Angeles roofing company, take one section at a time down to the deck, photograph the deck while it’s exposed and install the new system with new flashings at curbs, drains and edges before moving on. Staging, hoisting and debris removal are planned around your hours, deliveries, entrances and customer paths.' },
        { title: 'A clean site and closeout photos.', text: 'Tarps protect landscaping and nail sweeps keep walkways and parking clear. When the last section is done, we walk the roof with your team, hand over closeout photos and go over our 10-year workmanship warranty (call for details).' },
      ],
    },
    faqs: [
      { q: 'Do you do commercial roof repair in Los Angeles?', a: 'Yes. [Commercial roof repair](/commercial-roofing/repair/) in Los Angeles and Orange County makes sense when the problems are local: a leak at a curb or drain, an open seam, storm damage to one area, on a roof that is otherwise sound. When leaks keep moving, large areas are worn or soft, or repair bills keep adding up, replacement is usually the better use of the budget. The roof survey photos show which one your building needs.' },
      { q: 'How do I choose a commercial roofing contractor in Los Angeles?', a: 'Check the contractor’s California license, ask who will survey the roof (a roofer or a salesperson), expect a written scope and price that names the roof system, and ask how the work will be phased around your tenants and customers. Our article on [how to choose a commercial roofing contractor in Los Angeles](/blog/how-to-choose-a-commercial-roofing-contractor/) walks through each question, and our [credentials](/credentials/) page shows our license.' },
      { q: 'Do you pull the permits?', a: 'Yes. When the project needs a building permit, we pull it for you.' },
      { q: 'How do we know it’s time to replace and not repair again?', a: 'Look at the pattern rather than the latest leak. If repair bills keep adding up, leaks appear in new places each season, or large areas of the roof are worn, soft or holding water, replacement is usually the sounder investment. Our survey photos show which situation you’re in.' },
      { q: 'Which roof system will you recommend?', a: 'That depends on your building. We install modified bitumen and other low-slope systems, and we weigh drainage, rooftop equipment, foot traffic and the structure underneath before recommending one. Your written scope names the system and explains why it fits.' },
      { q: 'Will tenants and customers be affected during the replacement?', a: 'Your building stays open during the work. We phase the replacement by roof section and settle noise, access, staging and delivery times with you in advance, so you can give tenants and staff dates for each phase.' },
      { q: 'Can a large roof be replaced in stages?', a: 'Yes. Big roofs are divided into sections and replaced in a planned order, and phases can be spread across budget cycles when that fits your plans. Our [warehouse roofing](/commercial-roofing/warehouses/) page shows how we approach long, flat spans.' },
      { q: 'How do we look after the new roof?', a: 'Keep drains clear and have the roof checked on a schedule, especially ahead of the rainy season and after other trades work up there. Our [commercial roof maintenance](/commercial-roofing/maintenance/) service handles both, with a photo report after each visit.' },
    ],
    related: ['/commercial-roofing/repair/', '/commercial-roofing/maintenance/', '/residential-roofing/flat-roofing/replacement/'],
  },

  {
    slug: 'tpo-roofing',
    keyword: 'tpo roofing',
    title: 'TPO Roofing',
    h1: 'TPO Roofing in Los Angeles & Orange County',
    navLabel: 'TPO Roofing',
    card: 'A white, heat-welded single-ply membrane for flat and low-slope commercial roofs, installed over a roof surface prepared for it.',
    metaTitle: 'TPO Roofing in Los Angeles & Orange County',
    metaDescription: 'TPO roofing in Los Angeles & Orange County: a reflective single-ply membrane for commercial flat roofs, seams welded, work phased so you stay open. Roof survey.',
    image: '/images/home-services-commercial-flat-roof-drone-view.webp',
    imageAlt: 'Aerial view of a white low-slope commercial roof',
    hero: {
      intro:
        'TPO roofing: a white, reflective single-ply membrane for flat and low-slope commercial roofs. A roofer surveys and photographs the roof first and recommends TPO only if it suits the building. A written scope and price before any work. Planned in phases, so your building stays open, across Los Angeles and Orange County.',
      highlights: ['White membrane that reflects sunlight', 'Seams welded with hot air', 'Planned in phases so the building stays open'],
    },
    // Told the home page's way (owner, October 16 2026; ServiceStory): one statement, one paragraph, then the principles, each fact said once
    story: {
      label: 'TPO roofing',
      lead: 'A TPO roof is only as good as its __seams__ and its details.',
      text: 'TPO (thermoplastic polyolefin) is a white single-ply membrane laid in wide rolls and joined with hot air, so the seams fuse into one continuous surface. In Southern California the appeal is the sun: a white membrane reflects much of its energy instead of absorbing it, which can keep the roof surface cooler.',
      heading: 'How we install a TPO roof',
      image: '/images/recent-work-commercial-flat-roof-drone-view.webp',
      imageAlt: 'Aerial view of a large white commercial flat roof with its rooftop units, above a parking lot',
      principles: [
        { title: 'Recommended only when it fits.', text: 'A roofer surveys and photographs the roof section by section and checks the deck, insulation, drainage and what sits on the roof now. TPO is recommended when it suits the building, and we tell you plainly when another system would serve it better.', bullets: ['Slope, drains and scuppers', 'Rooftop units, curbs and penetrations', 'Parapets and wall flashing', 'Deck and insulation where they can be seen'] },
        { title: 'Title 24, checked in your scope.', text: 'California’s Title 24 energy code includes cool roof requirements for many low-slope commercial roofs, and a reflective membrane is one way to meet them. The exact requirement depends on the building and the product, so the written scope covers it, along with the membrane, how it’s attached, any insulation or cover board, the flashings, phasing, schedule and price.' },
        { title: 'Opened and dried in the same day.', text: 'Where the scope calls for it, the old roofing comes off section by section, the deck is repaired as needed and the surface prepared, so each section is dried in the day it’s opened and your building stays open. We photograph it before the membrane goes on.' },
        { title: 'Welded seams, detailed edges.', text: 'The membrane is attached as specified and every seam is welded with hot air. Walls, curbs, penetrations and drains are flashed and detailed, because that’s where most flat roof leaks begin. Closeout photos and our 10-year workmanship warranty (call for details) finish the job; the membrane carries the manufacturer’s warranty, which depends on the product.' },
      ],
    },
    faqs: [
      {
        q: 'What is TPO roofing?',
        a: 'TPO is a single-ply roofing membrane made of thermoplastic polyolefin. It is usually white, comes in wide rolls and is joined at the seams with hot air. It is widely used on flat and low-slope commercial roofs.',
      },
      {
        q: 'Is TPO a good choice for Southern California?',
        a: 'It often is, because a white membrane reflects sunlight and can keep the roof surface cooler, and California’s Title 24 energy code has cool roof requirements for many low-slope commercial roofs. Whether it fits your building depends on the roof, so a roofer should survey it first.',
      },
      {
        q: 'How long does a TPO roof last?',
        a: 'We won’t promise a number of years. How long a TPO roof lasts depends on the membrane, the installation, the details at walls and penetrations, and how the roof is maintained. We focus on the part we control: the installation, backed by our 10-year workmanship warranty (call for details).',
      },
      {
        q: 'How is TPO different from modified bitumen?',
        a: 'TPO is a single-ply membrane with welded seams. Modified bitumen is a layered, asphalt-based system. The right choice depends on your roof, so we compare them with you from the survey.',
      },
      {
        q: 'Can TPO go over my existing roof?',
        a: 'Sometimes, if the existing roof is dry and sound and the code allows it. Often a tear-off is the better route, so you start from a clean, solid deck. The survey tells us which applies to your building.',
      },
      {
        q: 'Do you repair TPO roofs?',
        a: 'Yes. A leak on a TPO roof usually traces to a seam, a flashing or a penetration. See our [commercial roof repair](/commercial-roofing/repair/) page for how we find and fix the source.',
      },
    ],
    related: ['/commercial-roofing/replacement/', '/commercial-roofing/repair/', '/commercial-roofing/maintenance/', '/commercial-roofing/warehouses/'],
  },

  {
    slug: 'maintenance',
    keyword: 'commercial roof maintenance',
    title: 'Commercial Roof Maintenance & Inspections',
    navLabel: 'Inspection & Maintenance',
    card: 'Scheduled inspections and upkeep for commercial roofs, with photo reports for owners, managers and boards, and drain and flashing issues caught early.',
    metaTitle: 'Commercial Roof Maintenance in Los Angeles',
    metaDescription: 'Commercial roof maintenance in LA & Orange County: scheduled inspections, photo reports and drains and flashings kept in check. Ask about a maintenance plan.',
    image: '/images/flat-roof-torch-down-drone-view-services.webp',
    imageAlt: 'Aerial view of a flat roof surface used for commercial roof maintenance',
    hero: {
      intro: 'Commercial roof maintenance catches early wear before it becomes interior damage. Scheduled roofer visits clear drains and gutters and reseal flashings where needed. It starts with a baseline roof survey, and every visit ends with a photo report for owners, managers or boards, across Los Angeles and Orange County.',
      highlights: ['Scheduled visits with photo reports', 'Drains and flashings checked early', 'Reports owners and boards can follow'],
    },
    // Told the home page's way (owner, October 16 2026; ServiceStory): one statement, one paragraph, then the principles, each fact said once
    story: {
      label: 'Commercial roof maintenance',
      lead: 'A low-slope roof wears gradually, then seems to fail all at __once__.',
      text: 'Leaves and grit build up at drains and scuppers, sealant around penetrations dries out in the sun, and near the coast, from Santa Monica to Huntington Beach, salt air works on metal flashing and fasteners. A small split at a parapet can let water in for months before anyone sees a stain.',
      heading: 'How we maintain a commercial roof',
      principles: [
        { title: 'A baseline to compare against.', text: 'A roofer inspects the whole roof and photo-documents its condition, the starting point every later visit is compared with.', bullets: ['Drains, scuppers and gutters', 'Flashings, seams and penetrations', 'Parapets, coping and roof hatches'] },
        { title: 'A plan that fits the roof.', text: 'If ongoing care makes sense, a [roof maintenance plan](/roof-maintenance-plans/) is set up around the roof’s type, age and condition, with the visit schedule agreed with you.' },
        { title: 'Visits that catch it small.', text: 'Each visit is coordinated with your building contact for roof access. We clear debris from drains and gutters, check and reseal flashings and penetrations as needed and look for early wear, because a clogged drain or a loose flashing is simpler to deal with before water reaches the insulation.' },
        { title: 'A photo report, every visit.', text: 'Photos and plain-English notes go to owners, managers and boards, building a record of how the roof is aging, so a [commercial roof replacement](/commercial-roofing/replacement/) can be budgeted ahead of time. Anything beyond the plan is priced in writing first, and nothing happens until you approve it.' },
      ],
    },
    faqs: [
      { q: 'How often should a commercial roof be inspected?', a: 'It depends on the roof’s age, its condition and how much equipment and foot traffic it sees. Good times for a check include before the rainy season, after a major storm and after other trades have worked on the roof. With a maintenance plan, the visit schedule is set around your roof rather than a fixed formula.' },
      { q: 'Who gets the photo reports?', a: 'You decide. Reports can go to the owner, the property manager, a facilities lead or a board contact, and the photos are easy to forward to tenants or keep with your building records.' },
      { q: 'Can other contractors’ rooftop work cause leaks?', a: 'It can. HVAC service, sign installs and new equipment can leave behind damaged flashing, open penetrations or dropped screws that end up in the drains. A check after that work catches the damage before the next rain finds it.' },
      { q: 'Can you inspect a commercial roof before we buy or lease the building?', a: 'Yes. A roofer-led survey shows the roof’s condition in photos, so any repair or replacement needs are part of your decision instead of a surprise later. Learn more about our [roof inspections](/roof-inspection/).' },
      { q: 'What happens if an inspection finds a leak or damage?', a: 'We show you the photos, explain what we found and give you a written scope and price for the fix. You decide whether and when to go ahead, and the work gets the same before-and-after photos as any [commercial roof repair](/commercial-roofing/repair/).' },
    ],
    related: ['/roof-maintenance-plans/', '/commercial-roofing/repair/', '/commercial-roofing/replacement/'],
  },
];
