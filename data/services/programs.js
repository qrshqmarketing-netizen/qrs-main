// Single service pages: /emergency-roof-repair/, /roof-maintenance-plans/ and /financing/.

export const EMERGENCY_ROOF_REPAIR = {
  slug: 'emergency-roof-repair',
  keyword: 'emergency roof repair',
  title: 'Emergency Roof Repair & Storm Damage',
  navLabel: 'Emergency & Storm Damage',
  card: 'Storm damage or a sudden leak? A roofer assesses and photographs the damage, adds temporary protection when it’s needed and follows with a permanent repair.',
  metaTitle: 'Emergency Roof Repair in LA & OC',
  metaDescription:
    'Emergency roof repair in Los Angeles & Orange County: storm damage and sudden leaks assessed, photo-documented and repaired. Call us at (310) 340-1643.',
  hero: {
    intro:
      'Wind, heavy rain and sudden leaks never pick a good time. Emergency roof repair with QRS starts with a roofer’s assessment and photos, adds temporary protection if it’s needed, and finishes with a permanent repair priced in writing first.',
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
        text: 'We bring 30+ years of roofing experience to tile, shingle, flat and metal roofs, and storm damage shows up differently on each one.',
      },
    ],
  },
  faqs: [
    {
      q: 'Should I climb up and look at the damage myself?',
      a: 'Please don’t. Wet roofing is slippery, storm-damaged areas can give way underfoot and tiles crack easily when walked on. Take photos from the ground or a window instead, and leave the roof to a roofer.',
    },
    {
      q: 'Do you tarp roofs after storm damage?',
      a: 'When it’s needed, yes. If the permanent repair can’t happen right away, a tarp or other temporary protection over the damaged area helps limit further water damage until it can. A tarp isn’t a repair, though: sun and wind wear it down, so the permanent fix should follow.',
    },
    {
      q: 'Can I share your photos and scope with my insurance company?',
      a: 'Yes. Our photos and written scope can be shared with your insurance company. They show what we found on your roof and exactly what the permanent repair includes, in plain English.',
    },
    {
      q: 'What if a leak starts without a storm?',
      a: 'We handle those too. Sudden leaks often come from a split pipe boot, a flashing that has let go or a valley packed with leaves, and they tend to show up in the first real rain of the season. We trace the leak to its source and fix it the way we handle storm damage, with photos and a written scope.',
    },
    {
      q: 'What if the damage is too much for a repair?',
      a: 'Sometimes a storm spreads damage across the whole roof, or exposes a roof that was already near the end of its life. We’ll show you that in photos and walk you through your options. For a replacement or a larger repair, [financing](/financing/) options are available, subject to credit approval.',
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

export const ROOF_FINANCING = {
  slug: 'financing',
  keyword: 'roof financing',
  title: 'Roof Financing',
  navLabel: 'Financing',
  card: 'Spread the cost of a roof replacement or larger repair into monthly payments, subject to credit approval, once your written scope and price are in hand.',
  metaTitle: 'Roof Financing in Los Angeles & OC',
  metaDescription:
    'Roof financing in LA & Orange County: spread the cost of a replacement or larger repair into monthly payments, subject to credit approval. Book a Roof Check.',
  hero: {
    intro:
      'A new roof is a big expense, and it rarely comes at a convenient time. Roof financing can spread the cost into monthly payments, subject to credit approval, and it starts only after you have a written scope and price.',
    highlights: ['For replacements and larger repairs', 'Written scope and price come first', 'Example payments in our Instant Quote'],
  },
  overview: {
    paragraphs: [
      'Roofs don’t wait for a good moment to wear out. A leak turns out to be worn underlayment across the whole roof, a storm finishes off shingles that were already tired, or an inspection for a home sale shows the roof is near the end of its life. Financing options are available to help spread the cost of a [roof replacement](/roof-replacement/) or a larger repair into monthly payments, subject to credit approval. To get a feel for the numbers, the **Instant Quote** on this site gives a ballpark replacement price for your roof and shows example monthly payments alongside it.',
      'Your actual price starts with a [$199 Roof Check](#roof-check), where a roofer inspects and photo-documents the roof and tells you plainly whether it needs a repair or a replacement. Then you get a written scope and price, so you know exactly what you’re financing before you apply. However you choose to pay, qualified crews do the work cleanly and to spec, and installs are backed by our lifetime workmanship warranty.',
    ],
  },
  process: {
    subheading: 'How roof financing works with QRS',
    steps: [
      {
        title: 'Roof Check',
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
        text: 'Qualified crews complete the work in your written scope, then we walk the finished roof with you and go over your lifetime workmanship warranty.',
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
        text: 'What we recommend comes from the Roof Check photos, not from how you plan to pay. If a [roof repair](/roof-repair/) will do, we say so.',
      },
      {
        title: 'No pressure to finance',
        text: 'Financing is an option, not a sales tactic. Whether you finance or pay another way is entirely up to you.',
      },
      {
        title: 'The same detail-first install',
        text: 'Every install gets the same clean, to-spec work and the same lifetime workmanship warranty, however it’s paid for.',
      },
    ],
  },
  faqs: [
    {
      q: 'What kind of roof work can be financed?',
      a: 'Financing options are meant for bigger projects: a roof replacement or a larger repair. Once you have your written scope and price, ask us whether financing is available for your project.',
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
      q: 'Can I get a Roof Check before deciding about financing?',
      a: 'Of course. The Roof Check is about your roof, not how you’ll pay for it. There’s no deposit: you pay the $199 after the visit, and you can think about financing once you have your written scope and price.',
    },
    {
      q: 'Can financing help with storm damage?',
      a: 'If storm damage calls for a replacement or a larger repair, financing options may help spread the cost, subject to credit approval. The permanent repair still starts with photos and a written scope, and our [emergency roof repair](/emergency-roof-repair/) page explains those steps.',
    },
  ],
  related: ['/roof-replacement/', '/roof-repair/', '/roof-inspection/'],
};
