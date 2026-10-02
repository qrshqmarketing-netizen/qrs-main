// Single service pages: /roof-repair/emergency/, /roof-inspection/, /roof-maintenance-plans/ (with one-time tune-ups) and /roof-financing/.

export const EMERGENCY_ROOF_REPAIR = {
  slug: 'emergency-roof-repair',
  keyword: 'emergency roof repair',
  title: 'Emergency Roof Repair & Storm Damage',
  navLabel: 'Emergency & Storm Damage',
  card: 'Storm damage or a sudden leak? A roofer assesses and photographs the damage, adds temporary protection when it’s needed and follows with a permanent repair.',
  metaTitle: 'Emergency Roof Repair & Storm Damage in LA & OC',
  metaDescription:
    'Emergency roof repair in Los Angeles & Orange County for active leaks and storm damage: after-hours calls, tarps when needed and photos for insurance.',
  image: '/images/emergency-roof-repair-hero.webp',
  imageAlt: 'Roofer reviewing storm damage with homeowners beside a blue roof tarp',
  hero: {
    intro:
      'For emergency roof repair in Los Angeles and Orange County, stay off the roof, move belongings away from the leak and call QRS, even after hours or on a weekend. A roofer assesses and photographs the storm damage or sudden leak, puts temporary protection such as a tarp in place when it’s needed, then makes the permanent repair, priced in writing first.',
    highlights: ['Damage assessed and photo-documented', 'Temporary protection, like a tarp, if needed', 'Permanent repair with a written scope'],
  },
  overview: {
    paragraphs: [
      'Southern California roofs can go months without a real test, then face Santa Ana gusts that lift shingles and loosen tiles, or a winter storm that drops heavy rain in a few hours. When water starts coming in, put safety first. Stay off the roof, keep away from water near light fixtures and outlets, and don’t stand under a sagging ceiling. If a tree has come through the roof or a power line is down, keep everyone clear and call 911. Then move furniture, rugs and electronics away from the leak, set out buckets and take photos of the damage.',
      'Next, call us. A roofer assesses the damage, traces where water is getting in and **photo-documents** what we find, including the spots you can’t see from the ground. If the permanent fix can’t happen right away, we can put temporary protection in place, such as a tarp over the damaged area, to limit further water damage. The permanent [roof repair](/roof-repair/) follows, with a written scope and price you approve before work starts. Not sure whether what you’re seeing is urgent? [Request an estimate](#roof-check) and tell us about it.',
    ],
  },
  process: {
    subheading: 'From your call to the finished repair',
    image: '/images/homeowners-looking-at-leak-in-ceiling.webp',
    imageAlt: 'Homeowners looking up at a ceiling leak dripping into a bucket',
    steps: [
      {
        title: 'You call and tell us what happened',
        text: 'Describe what the storm did and what you’re seeing inside and out, and we’ll let you know when a roofer can come out to assess the damage.',
      },
      {
        title: 'Assessment and photos',
        text: 'A roofer inspects the damaged area and the roof around it, follows the water’s path and photographs everything we find.',
        bullets: ['Missing, lifted or broken shingles and tiles', 'Torn flashings and damaged roof edges', 'Where water is getting inside', 'Branches and debris on the roof'],
      },
      {
        title: 'Temporary protection if needed',
        text: 'When the permanent repair has to wait, we can cover the damaged area, for example with a tarp, to limit further water damage in the meantime.',
      },
      {
        title: 'Written scope and price',
        text: 'Before the permanent repair starts, you get a written scope and price along with the photos, so you know exactly what you’re approving.',
        bullets: ['Photos of the damage we found', 'What the permanent repair includes', 'Photos and scope you can share with your insurance company'],
      },
      {
        title: 'Permanent repair and clean-up',
        text: 'We make the repair as scoped, finish with a nail sweep and a tidy clean-up, and show you photos of the completed work.',
      },
    ],
  },
  why: {
    heading: 'Why Choose QRS for Emergency Roof Repair?',
    intro: 'After a storm, you need to know what happened to your roof and what it will take to fix it, explained in plain English.',
    points: [
      {
        title: 'A roofer on your roof',
        text: 'A roofer, not a salesperson, assesses the damage and tells you plainly what needs attention now and what can wait.',
      },
      {
        title: 'Photos of every stage',
        text: 'You get photos of the damage, any temporary protection and the finished repair, so you know exactly what was done up there.',
      },
      {
        title: 'Fixes sized to the damage',
        text: 'Storm damage is often limited to one part of the roof, and when a repair will fix it, that’s what we recommend. If the roof was already failing, our photos show why and we’ll explain your [roof replacement](/roof-replacement/) options.',
      },
      {
        title: 'Every roof type, one team',
        text: 'As a licensed California contractor since 2020, we work on tile, shingle and flat roofs, and storm damage shows up differently on each one.',
      },
    ],
  },
  faqs: [
    {
      q: 'Can you come out after hours or on a weekend?',
      a: 'Yes. Our field techs take emergency calls on weekdays and weekends outside regular office hours. Call [(310) 340-1643](tel:+13103401643) and we’ll let you know the next available time.',
    },
    {
      q: 'Should I climb up and look at the damage myself?',
      a: 'Please don’t. Wet roofing is slippery, storm-damaged areas can give way underfoot and tiles crack easily when walked on. Take photos from the ground or a window instead, and leave the roof to a roofer.',
    },
    {
      q: 'Do you tarp roofs after storm damage?',
      a: 'When it’s needed, yes. If the permanent repair can’t happen right away, a tarp or other temporary protection over the damaged area helps limit further water damage until it can. A tarp isn’t a repair, though: sun and wind wear it down, so the permanent fix should follow.',
    },
    {
      q: 'Do you work with my insurance company or adjuster?',
      a: 'Yes, as our schedule allows. Our team is small, so we can’t always be there when the adjuster visits, but we’ll help you where we can. Our photos and written scope can be shared with your insurance company, and they show what we found on your roof and exactly what the permanent repair includes, in plain English.',
    },
    {
      q: 'What if a leak starts without a storm?',
      a: 'We handle those too. Sudden leaks often come from a split pipe boot, a flashing that has let go or a valley packed with leaves, and they tend to show up in the first real rain of the season. We trace the leak to its source and fix it the way we handle storm damage, with photos and a written scope.',
    },
    {
      q: 'What if the damage is too much for a repair?',
      a: 'Sometimes a storm spreads damage across the whole roof, or exposes a roof that was already near the end of its life. We’ll show you that in photos and walk you through your options. For a full replacement, [roof financing](/roof-financing/) through Momnt Financing or Service Financing is available, subject to credit approval.',
    },
  ],
  related: ['/roof-repair/', '/roof-inspection/', '/roof-replacement/'],
};

// Full content for this page now lives in data/pages/carePlan.js (CARE_PLAN) — app/roof-maintenance-plans/page.js
// is a bespoke composition, not the generic ServicePage template. This entry keeps only what's still read
// by data/content.js's SINGLE_PAGES (sitemap, and the card blurb shown wherever this page is linked as a card).
export const ROOF_MAINTENANCE_PLANS = {
  slug: 'roof-maintenance-plans',
  keyword: 'roof maintenance plans',
  title: 'The Roof Care Plan',
  navLabel: 'Maintenance Plans',
  card: 'Three priced plans, scheduled before and after the rains, with a written photo report every visit — see pricing for your roof size.',
  metaTitle: 'Roof Maintenance Plans & Pricing | The Roof Care Plan',
  metaDescription:
    'Roof maintenance plans for Los Angeles & Orange County homes: three priced tiers, seasonal visits and a photo report every time. See Roof Care Plan pricing.',
};

// One inspection page for every roof type (it replaced the separate shingle, tile and flat inspection pages).
// `sections`: one band per roof type, shown after the overview (ServicePage).
export const ROOF_INSPECTION = {
  slug: 'roof-inspection',
  keyword: 'roof inspection',
  title: 'Roof Inspection Services · *RoofScan 360*',
  navLabel: 'Roof Inspection',
  card: 'Our free, roofer-led roof evaluation for shingle, tile and flat roofs: every finding photographed and explained, with one clear next step.',
  metaTitle: 'Roof Inspection in Los Angeles & OC',
  metaDescription: 'Roof inspection in Los Angeles & Orange County: a free, photo-documented roof evaluation with a clear next step, not a sales pitch. Book yours today.',
  image: '/images/shingle-roof-inspection-overhead.webp',
  imageAlt: 'Aerial overhead view of a finished dark grey shingle roof',
  hero: {
    intro: 'A roof inspection from QRS is a free, roofer-led roof evaluation for homes across Los Angeles and Orange County, checking the roofing, flashings, edges and gutters on shingle, tile and flat roofs. Our *RoofScan 360* evaluation uses drone footage to show what matters, explains every finding in plain English and ends with one clear next step.',
    highlights: ['A roofer on the roof, not a salesperson', 'Every finding photographed and explained', 'Free, with no obligation'],
  },
  overview: {
    paragraphs: [
      'Every roof type has its own weak points, so the roofer adapts the inspection to what’s on your house; the sections below show what we check on shingle, tile and flat roofs. Every roof also gets a close look at the flashings where it meets walls, chimneys, skylights and vents, and at the edges and any gutters that carry water away. We photograph each finding, which lets you judge the roof’s condition with your own eyes.',
      'It’s worth booking one when you’re **buying or selling a home**, after a storm, strong Santa Ana winds or a noticeable earthquake, when an older roof leaves you unsure of its condition, or before choosing between a [roof repair](/roof-repair/) and a [roof replacement](/roof-replacement/). The visit ends with one recommendation: repair, monitor, maintain or replace. Sometimes the honest answer is that your roof is fine for now, and we’ll say so. There’s no deposit, you pay after the visit, and you’re under no obligation to hire us for any work.',
    ],
  },
  sections: [
    {
      id: 'shingle-roofs',
      eyebrow: 'Shingle roofs',
      heading: 'Shingle Roof Inspection',
      paragraphs: [
        'Shingles show their age in ways a trained eye can read. We look for granule loss, blistering, curling and cracked or brittle tabs, then check the places shingle roofs tend to leak. We also note the intake and exhaust vents, because a poorly ventilated attic ages shingles from underneath.',
        'If a few shingles or a flashing need work, a targeted [shingle roof repair](/residential-roofing/shingle-roofing/repair/) is usually the answer. If a [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/) is the honest call, you’ll see the photos behind that advice.',
      ],
      points: [
        { title: 'Shingle wear', text: 'Granule loss, blisters, curling and brittle tabs, especially on the sunniest slopes.' },
        { title: 'Lifted and missing tabs', text: 'Lifted, creased or missing tabs, broken seal strips and nail pops.' },
        { title: 'Pipe boots, vents and flashings', text: 'Step and counter flashing, vent collars and pipe boots, where shingle roofs most often leak.' },
        { title: 'Valleys and edges', text: 'Valleys, hip and ridge caps and the drip edge.' },
      ],
    },
    {
      id: 'tile-roofs',
      eyebrow: 'Tile roofs',
      heading: 'Tile Roof Inspection',
      paragraphs: [
        'Inspecting a tile roof takes more care than most. Tiles crack underfoot, so we step only where tiles overlap and are supported, and the part that matters most, the underlayment, is mostly hidden. On clay tile, we look closely for hairline cracks and shifted pieces; on concrete, for surfaces worn thin and porous.',
        'A tile roof can look sound from the street even when its underlayment is near the end. If the evidence points that way, a [tile lift & relay](/residential-roofing/tile-roofing/lift-and-relay/) is usually the fix, and smaller problems are a [tile roof repair](/residential-roofing/tile-roofing/repair/).',
      ],
      points: [
        { title: 'Tiles', text: 'Cracks, slips and gaps, including loose ridge and hip tiles.' },
        { title: 'Ridge mortar and bird stops', text: 'Crumbling mortar, missing bird stops and open eave closures.' },
        { title: 'Valleys, flashings and vents', text: 'Valley metal, wall and chimney flashings and vent penetrations.' },
        { title: 'Visible underlayment', text: 'The underlayment wherever it can be seen, plus stains and leak history.' },
      ],
    },
    {
      id: 'flat-roofs',
      eyebrow: 'Flat roofs',
      heading: 'Flat Roof Inspection',
      paragraphs: [
        'A flat roof keeps its problems out of sight. From the ground you can’t see the blister that’s about to crack, the lap lifting at a parapet or the dirt ring where water sat for days after the last storm. Water that sits long after rain points to low spots, clogged drains or not enough slope, so we note where it collects and why.',
        'If you’ve noticed a ceiling stain, point it out, because it helps us trace water back to its source. When work is needed, you’ll know whether a [flat roof repair](/residential-roofing/flat-roofing/repair/) will do or it’s time to plan a [flat roof replacement](/residential-roofing/flat-roofing/replacement/).',
      ],
      points: [
        { title: 'Membrane and seams', text: 'Blisters, splits and worn areas, and the seams and laps across the whole surface.' },
        { title: 'Ponding', text: 'Ponding marks and low spots where water sits after rain.' },
        { title: 'Parapets and flashings', text: 'Parapet walls and caps, wall flashings, HVAC curbs, vents and skylights.' },
        { title: 'Drains', text: 'Drains, scuppers and downspouts, checked to make sure they’re clear.' },
      ],
    },
  ],
  process: {
    subheading: 'What happens during a roof inspection',
    image: '/images/contractors-hero-roofer-tablet.webp',
    imageAlt: 'Roofer on a rooftop reviewing the inspection on a tablet',
    steps: [
      { title: 'Tell us what you’ve noticed', text: 'A stain, a slipped tile, missing shingles, a recent storm or a home sale: knowing why you called helps the roofer focus on the right areas first.' },
      { title: 'A roofer checks the whole roof', text: 'The roofer looks at the roof covering, flashings, penetrations, edges and gutters, with drone footage from our *RoofScan 360* evaluation. On tile, we step only where tiles are supported, so the inspection doesn’t leave new cracks behind.' },
      { title: 'Photos explained in plain English', text: 'We go through the photos with you and sort normal wear from real problems and from things that can safely wait.' },
      { title: 'One clear next step', text: 'Repair, monitor, maintain or replace. If you want us to do the work, a written scope and price follow.' },
    ],
  },
  why: {
    heading: 'Why Choose QRS for a Roof Inspection?',
    intro: 'An inspection is only useful if you can trust it, so ours is built to inform you, not to sell to you.',
    points: [
      { title: 'A roofer’s read on your roof', text: 'The inspection is done by a roofer who knows how shingle, tile and flat roofs are built and how each one tends to fail, backed by our standing as a licensed California contractor since 2020.' },
      { title: 'Photos you can keep and share', text: 'The photos let you review the findings later, show them to family or a buyer, and compare your options without relying on memory.' },
      { title: 'One clear next step', text: 'If work makes sense, a written scope and price follow. If the roof only needs watching, that’s what we’ll recommend, with no push toward a bigger job.' },
      { title: 'Checks made for your roof type', text: 'We look at the details each roof depends on, from seal strips and nail pops to bird stops, ridge mortar and roof drains.' },
    ],
  },
  faqs: [
    { q: 'Is the roof inspection really free?', a: 'Yes. For homes, our roofer-led roof evaluation is free, with no obligation and nothing to pay up front. We use drone footage to see the roof’s condition, explain what we find in plain English and give you a clear next step. The optional $199 Roof Check is a separate tune-up visit, and the $199 is credited toward a repair or replacement if you move forward.' },
    { q: 'What do I get after the roof evaluation?', a: 'Photos of what we found, a plain-English explanation of what they show and one clear recommendation: repair, monitor, maintain or replace. If work is needed, you get a written scope and price before anything starts, with no pressure to decide on the spot.' },
    { q: 'I’m buying a home. Is a general home inspection enough for the roof?', a: 'A general home inspection looks at the whole house, and the roof is one item on a long list. A roofer’s evaluation focuses on the roof alone, with photos of the roofing, flashings and vents. That matters most on tile, which can look sound from the street even when its underlayment is near the end, and on homes with flat sections that are easy to miss from the ground.' },
    { q: 'Can you tell how much life my roof has left?', a: 'We can tell you what condition it’s in and what kind of wear to expect next, but nobody can promise an exact number of years. On tile, most of the underlayment is hidden, so we judge it from the areas we can see, the roof’s history and signs like leaks or stains. The photos help you plan ahead instead of reacting to a leak.' },
    { q: 'Is a free roof evaluation worth it after a storm if nothing is leaking?', a: 'Often, yes. High winds and heavy rain can loosen flashings, shift tiles and break shingle seals without an immediate leak, and a noticeable earthquake can crack ridge mortar and nudge tiles out of place. Those weak spots tend to give way in the next storm. If water is already coming in, our [emergency roof repair](/roof-repair/emergency/) page explains how we handle it.' },
    { q: 'Do I have to hire you for the work after the roof evaluation?', a: 'No. The roof evaluation is free: you see the photos and decide what’s next, with no pressure either way. If you’d like us to do the work, you’ll get a written scope and price first.' },
    { q: 'What should I tell you before the roof evaluation?', a: 'Anything you’ve noticed: stains, drips, roofing pieces in the yard, past repairs, the roof’s age if you know it, a recent storm or an upcoming sale. That context points the roofer to likely trouble spots, and the rest of the roof still gets checked.' },
    { q: 'I’m selling my home. Should I have the roof inspected first?', a: 'It can help. Knowing the roof’s condition before you list gives you time to handle small repairs on your own schedule, plus photos you can share with buyers. That makes the roof less likely to become a surprise late in the sale.' },
    { q: 'How is a free roof evaluation different from a maintenance plan?', a: 'A roof evaluation is one visit that shows where your roof stands today. A [roof maintenance plan](/roof-maintenance-plans/) is set up after a free roof evaluation, around your roof’s type, age and condition, with visits on the schedule in your plan and a photo report after each one. Anything beyond the plan gets a written price before work.' },
    { q: 'Do you inspect roofs on commercial buildings?', a: 'Yes. Offices, retail centers, warehouses, churches and other commercial buildings get a roofer-led, photo-documented roof survey of the membrane, drains, flashings and equipment curbs. Ongoing care is covered on our [commercial inspection & maintenance](/commercial-roofing/maintenance/) page.' },
  ],
};

export const ROOF_FINANCING = {
  slug: 'roof-financing',
  keyword: 'roof financing',
  title: 'Roof Financing',
  navLabel: 'Roof Financing',
  card: 'Spread the cost of a home roof replacement into monthly payments through Momnt Financing or Service Financing, subject to credit approval, once your written scope and price are in hand.',
  // Closing call to action above the footer (FinalCta); other service pages word theirs from `keyword`
  final: {
    heading: 'Get Your Price, Then Your Payment Options',
    text: 'A roofer gives you a written scope and price for your roof replacement, then we walk you through monthly payments with Momnt Financing or Service Financing.',
  },
  metaTitle: 'Roof Financing in Los Angeles & Orange County',
  metaDescription:
    'Roof financing in LA & Orange County: spread the cost of a home roof replacement into monthly payments through Momnt Financing or Service Financing. Book a free roof evaluation.',
  image: '/images/financing-hero-background.webp',
  imageAlt: 'A roofer reviewing a project with homeowners',
  showReviews: false,
  partners: {
    heading: 'Our Financing Partners',
    intro: 'Financing options are available through these providers for qualifying home roof replacements. Approval is subject to credit review.',
    items: [
      { name: 'Momnt Financing', image: '/images/momnt-logo.webp', imageAlt: 'Momnt logo', width: 864, height: 156 },
      { name: 'Service Financing', image: '/images/service-finance-mark.webp', imageAlt: 'Service Finance logo', width: 2668, height: 900 },
    ],
  },
  hero: {
    intro:
      'Roof financing with QRS lets you spread the cost of a home roof replacement in Los Angeles and Orange County into monthly payments through Momnt Financing or Service Financing, subject to credit approval. You get a written scope and price before you apply, so you know exactly what you’re financing. Start with a free roof evaluation.',
    highlights: ['For home roof replacements', 'Through Momnt Financing or Service Financing', 'Written scope and price come first', 'Example payments in our Instant Quote'],
  },
  overview: {
    paragraphs: [
      'Roofs don’t wait for a good moment to wear out. A leak turns out to be worn underlayment across the whole roof, a storm finishes off shingles that were already tired, or an inspection for a home sale shows the roof is near the end of its life. Financing is available through **Momnt Financing** and **Service Financing** to help spread the cost of a [home roof replacement](/roof-replacement/) into monthly payments, subject to credit approval. To get a feel for the numbers, the **Instant Quote** on this site gives a ballpark replacement price for your roof and shows example monthly payments alongside it.',
      'Your actual price starts with a [free roof evaluation](#roof-check), where a roofer inspects and photo-documents the roof and tells you plainly whether it needs a repair or a replacement. Then you get a written scope and price, so you know exactly what you’re financing before you apply. Financing is available for home roof replacements — repairs and commercial projects are paid another way. However you choose to pay, qualified crews do the work cleanly and to spec, and installs are backed by our 10-year workmanship warranty.',
    ],
  },
  process: {
    subheading: 'How roof financing works with QRS',
    steps: [
      {
        title: 'Roof Evaluation',
        text: 'A roofer inspects and photo-documents your roof, then explains in plain English whether a repair will do or a replacement makes more sense.',
      },
      {
        title: 'Written scope and price',
        text: 'You get a written scope and price for the recommended work, so you know exactly what you’d be financing before anything else happens.',
      },
      {
        title: 'Financing application',
        text: 'If you’d like to spread the cost into monthly payments, let us know and we’ll point you to the financing application. Financing is subject to credit approval.',
      },
      {
        title: 'Choose a plan',
        text: 'If you’re approved, you review the payment plans offered to you and pick the one that fits your budget, or pay another way if you prefer.',
      },
      {
        title: 'Install and final walkthrough',
        text: 'Qualified crews complete the work in your written scope, then we walk the finished roof with you and go over your 10-year workmanship warranty.',
      },
    ],
  },
  why: {
    heading: 'Why Choose QRS When You Finance Your Roof?',
    intro: 'Financing is a way to pay for the work. It shouldn’t change what gets recommended or how carefully it’s done.',
    points: [
      {
        title: 'The price before the paperwork',
        text: 'You see the written scope and price before any financing application, so you know exactly what work is included.',
      },
      {
        title: 'Advice based on your roof',
        text: 'What we recommend comes from the roof evaluation photos, not from how you plan to pay. If a [roof repair](/roof-repair/) will do, we say so.',
      },
      {
        title: 'No pressure to finance',
        text: 'Financing is an option, not a sales tactic. Whether you finance or pay another way is entirely up to you.',
      },
      {
        title: 'The same detail-first install',
        text: 'Every install gets the same clean, to-spec work and the same 10-year workmanship warranty, however it’s paid for.',
      },
    ],
  },
  faqs: [
    {
      q: 'What kind of roof work can be financed?',
      a: 'Financing through Momnt Financing or Service Financing is available for home roof replacements. It doesn’t cover repairs or commercial projects. Once you have your written scope and price, ask us whether financing fits your project.',
    },
    {
      q: 'Do I need a written scope and price before applying?',
      a: 'Yes. Your written scope and price come first, so you know exactly what you’re financing. It also means you’re comparing payment options against a real price for your roof, not a rough guess.',
    },
    {
      q: 'How can I see example monthly payments?',
      a: 'Open the Instant Quote on this site and enter your address, a few details about your roof and where to send your estimate. It shows a ballpark replacement price with example monthly payments. Those examples are for illustration only, not an offer of credit, and your actual price comes from your written scope.',
    },
    {
      q: 'Can I get a free roof evaluation before deciding about financing?',
      a: 'Of course. The roof evaluation is about your roof, not how you’ll pay for it. The evaluation is free, and you can think about financing once you have your written scope and price.',
    },
    {
      q: 'Can financing help with storm damage?',
      a: 'If storm damage calls for a full home roof replacement, financing through Momnt Financing or Service Financing may help spread the cost, subject to credit approval. Repairs, including storm repairs, aren’t financed. The permanent fix still starts with photos and a written scope, and our [emergency roof repair](/roof-repair/emergency/) page explains those steps.',
    },
  ],
  related: ['/roof-replacement/', '/roof-repair/', '/roof-inspection/'],
};
