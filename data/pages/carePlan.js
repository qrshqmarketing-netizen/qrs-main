// The Roof Care Plan (/roof-maintenance-plans/): a maintenance membership with three priced tiers.
// Source: the printed "Roof Care Plan" leave-behind. Update prices, bands or copy here — nothing else
// in the codebase needs to change to match (see components/sections/CarePlanPricing.jsx and PlanScope.jsx).

import { PHONE } from '../site';

export const CARE_PLAN = {
  keyword: 'roof maintenance plans',
  metaTitle: 'Roof Maintenance Plans & Pricing | The Roof Care Plan',
  metaDescription:
    'Roof maintenance plans and one-time tune-ups for Los Angeles & Orange County homes: three priced tiers, seasonal visits and a photo report every time.',
  image: '/images/shingle-roof-inspection-overhead.webp',
  imageAlt: 'Aerial overhead view of a finished shingle roof inspected for ongoing care',
  hero: {
    heading: 'Roof Maintenance Plans · *RoofCare Plan*',
    intro:
      'Roof maintenance plans from QRS schedule one or two roofer visits a year, timed to the rains, so small wear on Los Angeles and Orange County homes is caught before it turns into a surprise leak. Visits include a full inspection, a written photo report, debris clearing and sealant top-offs, with three *RoofCare Plan* tiers priced by roof size.',
    highlights: ['Scheduled visits, before and after the rains', 'A written photo report every time', 'Pay after each visit — nothing up front'],
  },
  whatGoesWrong: {
    heading: 'What Actually Goes Wrong on a Los Angeles Roof',
    items: [
      {
        title: 'The sun, not the storm',
        text: 'Los Angeles gets twelve inches of rain a year — and three hundred days of sun. Your roof heats and cools every day of the year. Sealant dries and cracks; shingles go brittle and shed granules. Nothing about that waits for rain — by the time water finds the gap, the damage is already years old.',
      },
      {
        title: 'Tile lasts. The felt underneath doesn’t.',
        text: 'Clay and concrete tile can last a century. The underlayment beneath it — the layer actually keeping water out — lasts twenty to twenty-five years, and burns through faster anywhere a slipped tile lets sunlight reach it.',
      },
      {
        title: 'Embers land in the gutters',
        text: 'In a fire hazard zone, attic and soffit vents have to be fire-rated and State Fire Marshal listed. Those screens clog and tear, and debris collects in valleys and gutters — that’s where embers land.',
      },
    ],
  },
  bands: [
    { key: 'small', label: 'Up to 2,000 sq ft' },
    { key: 'mid', label: '2,001–3,500 sq ft' },
    { key: 'large', label: '3,501–5,000 sq ft' },
  ],
  plans: [
    {
      key: 'essential',
      name: 'Essential',
      tagline: 'Inspection, report, clear & seal',
      visits: 'One visit a year — before the rains',
      popular: false,
      prices: { small: 349, mid: 419, large: 489 },
    },
    {
      key: 'complete',
      name: 'Complete',
      tagline: 'Most popular. Adds storm response',
      visits: 'Two visits a year — before and after',
      popular: true,
      prices: { small: 699, mid: 799, large: 949 },
    },
    {
      key: 'plus',
      name: 'Complete Plus',
      tagline: 'For tile and hillside homes',
      visits: 'Two visits, plus a drone aerial survey',
      popular: false,
      prices: { small: 849, mid: 999, large: 1149 },
    },
  ],
  billingNote: 'Priced per year. Month to month — cancel any time. Homes over 5,000 sq ft are quoted individually.',
  disclaimer:
    'The Roof Care Plan is a maintenance agreement. It is not insurance, not a warranty, and not a guarantee against leaks. Repairs found during a visit are quoted separately at a member discount. Full terms are in the service agreement.',
  scope: {
    intro:
      'This is a maintenance plan, not a repair plan. If we find something that needs fixing, we’ll quote it, you decide, and you get the member discount with the service call waived.',
    included: [
      { title: 'Full inspection', text: 'The roof covering, valleys, flashings, penetrations, vent boots, ridge, skylights and accessible attic ventilation.' },
      { title: 'Written photo report', text: 'A condition rating and an estimate of remaining roof life — yours to keep.' },
      { title: 'Debris cleared', text: 'From the roof surface, valleys, gutters and downspouts.' },
      { title: 'Sealant topped off', text: 'At penetrations and flashings; exposed fasteners sealed.' },
      { title: 'Tile resets', text: 'Slipped tiles reset, and any tile we break replaced at no charge.' },
      { title: 'Fire-code vent check', text: 'Attic and soffit vent screens and eave closures checked and photographed.' },
      { title: 'A priced list', text: 'Anything we recommend beyond the plan, with no obligation.' },
    ],
    excluded: [
      'Roof replacement, re-roofing, underlayment replacement or tile lift-and-relay',
      'Repairs beyond the resets and sealant work above',
      'Structural, decking or sheathing work',
      'Interior repairs, and storm or fire damage restoration',
      'Skylight, solar, chimney and gutter repair or replacement',
      'Coatings, tree trimming, permits and code upgrades',
    ],
  },
  // What visits focus on for each roof type (this page replaced the separate shingle, tile and flat roof care pages)
  byRoof: {
    heading: 'What Each Visit Checks on Your Roof',
    intro: 'Every visit follows the same routine, matched to your roof type, and each one adds to a photo record you can compare year to year.',
    items: [
      {
        title: 'Shingle roofs',
        text: 'We clear the valleys and roof surface, check pipe boots, vents and flashing sealant, and look for lifted tabs and nail pops. We also watch for dark streaks and moss on shaded or coastal slopes, and point out overhanging branches that scrape granules off and fill valleys with leaves.',
      },
      {
        title: 'Tile roofs',
        text: 'We clear valleys, eaves, gutters and drains, flag slipped or cracked tiles, and check ridge mortar and bird stops. Over the years, the photo record shows when the underlayment may be nearing the end, so you can plan a [tile lift & relay](/residential-roofing/tile-roofing/lift-and-relay/) on your own timeline.',
      },
      {
        title: 'Flat roofs',
        text: 'We clear drains, scuppers and downspouts, check seams, laps and blisters, and look over parapet caps, wall flashings, HVAC curbs, vents and skylights. Small garage and ADU roofs clog just as easily, so they’re worth including.',
      },
    ],
  },
  // One-time tune-ups live on this page too (they replaced the separate /roof-tune-up/ page): shown as a band with id #tune-up
  tuneUp: {
    id: 'tune-up',
    eyebrow: 'One-time visit',
    heading: 'Need a One-Time Roof Tune-Up?',
    paragraphs: [
      'A roof tune-up is one focused visit for a roof that’s basically sound but showing its age in small ways. You get a written list of fixes and one price before we start, and photos of every fix when we’re done. It often makes sense to start with a tune-up, then move into a plan.',
      'If the list is longer than a tune-up should handle, or the problem is an active leak, a [roof repair](/roof-repair/) is the better fit, and we’ll tell you so.',
    ],
    points: [
      { title: 'Shingle roofs', text: 'Lifted tabs hand-sealed, nail pops reset, flashing sealant renewed, split pipe boots and broken shingles replaced, and valleys cleared.' },
      { title: 'Tile roofs', text: 'Slipped and loose tiles reset, a few cracked tiles replaced with the closest available match, vents and flashings resealed, and valleys and eaves cleared.' },
      { title: 'Flat roofs', text: 'Flashings resealed, loose edge metal secured, small blisters and splits patched, and drains, scuppers and downspouts cleared.' },
      { title: 'One written price', text: 'A written list of fixes and one price before any work, and before-and-after photos of each fix.' },
    ],
    cta: { label: 'Get Pro Advice', href: '#roof-check' },
  },
  schedule: {
    heading: 'Two Visits, Timed to the Season',
    image: '/images/contractors-process-roofer-tablet.webp',
    imageAlt: 'Roofer reviewing seasonal roof maintenance work on a tablet',
    steps: [
      {
        title: 'September & October — before the rains',
        text: 'Clear the valleys, roof surface and gutters. Top off sealant at every penetration and flashing. Reset any tile that’s slipped. Check and photograph the fire vents. Then you have a written record of the roof going into winter.',
      },
      {
        title: 'May & June — after the rains',
        text: 'Find out what the winter actually did — and what the Santa Anas moved. Same scope, plus anything that shifted. This is the visit that catches the small failure before it spends a summer baking in the sun.',
      },
    ],
  },
  memberBenefits: {
    eyebrow: 'Member Benefits',
    heading: 'What Being a Member Gets You',
    paragraphs: ['Benefits apply from your first visit and carry over for as long as you’re on a plan.'],
    points: [
      { title: '10–20% off every repair', text: 'The discount depends on your plan, and the service call fee is waived.' },
      { title: '24-hour storm response', text: 'When everyone else is booked out two weeks, members get seen first.' },
      { title: 'Credit toward a new roof', text: 'Up to 30% of what you’ve paid builds up as credit toward your roof when you do replace it.' },
      { title: 'Transfers free to a buyer', text: 'Sell the house and the plan — with its inspection history — transfers to the new owner at no charge.' },
    ],
  },
  faqs: [
    {
      q: 'My roof is almost new. Why start a plan now?',
      a: 'Most manufacturer warranties have maintenance conditions in them, and claims get denied for missing records. Starting now builds the paper trail that protects the warranty you already paid for.',
    },
    {
      q: 'Can’t I just call when it leaks?',
      a: 'You can, and we’ll come. But water on the ceiling usually means it’s been in the assembly a while, so you’re paying for the roof and whatever it got into. And when it really rains here, every roofer in the city is booked out two weeks.',
    },
    { q: 'Am I locked in?', a: 'No. It’s month to month, you can cancel any time online or by phone, and you only ever owe for visits already done.' },
    {
      q: 'What if you break my tile?',
      a: 'We replace it, at no charge to you. Tile breaks — anyone who tells you otherwise hasn’t walked enough of it. We minimize foot traffic, photograph what was already cracked before we start, and own what we break.',
    },
    {
      q: 'Can an HOA board or property manager set up a plan?',
      a: 'Yes. A plan can cover the buildings across a community, including carports and common-area roofs — as long as it’s roofing material, not patio covers — with one point of contact for the board or manager. The photo reports are easy to share at board meetings, so decisions rest on what the roofs actually look like.',
    },
    {
      q: 'Is a maintenance plan the same as a tune-up?',
      a: 'Not quite. A [roof tune-up](#tune-up) is a one-time visit to fix a list of small issues, while a plan is ongoing, with scheduled visits and a running photo record. It often makes sense to start with a tune-up, then move into regular care.',
    },
    {
      q: 'What does a roof tune-up include?',
      a: 'It depends on the roof. On shingles, it usually means resealing lifted tabs, fixing nail pops, renewing flashing sealant and replacing cracked pipe boots. On tile, it means resetting slipped tiles, replacing a few cracked ones, resealing vents and clearing valleys. On a flat roof, we reseal flashings, patch small blisters and splits, secure edge metal and clear drains and scuppers. Your written scope spells out exactly what we’ll do.',
    },
    {
      q: 'Will a tune-up fix an active leak?',
      a: 'Sometimes, if the leak comes from a small, obvious source like a split pipe boot, a slipped tile or a clogged drain. Leaks that need tracing, or that come from worn underlayment or a failed flashing, need a proper [roof repair](/roof-repair/), and the roof evaluation tells you which one you’re dealing with.',
    },
    {
      q: 'When is the right time for a tune-up?',
      a: 'Late summer and fall work well, after the hottest months and before the winter storms. A tune-up also makes sense after strong winds or a noticeable earthquake, after other trades have been on the roof, and before you sell your home or soon after you buy one.',
    },
    {
      q: 'Can I clean my roof myself?',
      a: 'We’d advise against it. Shingles scuff easily, especially when they’re warm, tile cracks underfoot, and pressure washing strips the granules that protect shingles and can drive water under tiles. Clearing gutters from a ladder is one thing, but walking the roof is a job for a roofer.',
    },
    {
      q: 'What causes the dark streaks on my shingles?',
      a: 'Those streaks are usually algae, which grows on shaded, damp slopes and often shows up where the marine layer lingers. The streaks are mostly cosmetic, but moss is different: it holds moisture against the shingles and can lift their edges.',
    },
    {
      q: 'What can I keep an eye on between visits?',
      a: 'From the ground or a window, watch for slipped tiles, water still standing on a flat roof long after rain, scuppers or downspouts that overflow, and new stains on ceilings or walls. Leave climbing onto the roof to a roofer.',
    },
    {
      q: 'Who actually does the maintenance visit?',
      a: 'An experienced roofer on our own team, every time — never a call-center technician or a subcontractor.',
    },
  ],
  final: {
    heading: 'Get on the Calendar Before the First Rain',
    text: `We’ll walk your roof and show you what’s up there — no pressure, no obligation. Call ${PHONE} or send us a request below.`,
  },
};
