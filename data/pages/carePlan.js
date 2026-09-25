// The Roof Care Plan (/roof-maintenance-plans/): a maintenance membership with three priced tiers.
// Source: the printed "Roof Care Plan" leave-behind. Update prices, bands or copy here — nothing else
// in the codebase needs to change to match (see components/sections/CarePlanPricing.jsx and PlanScope.jsx).

import { PHONE } from '../site';

export const CARE_PLAN = {
  keyword: 'roof maintenance plans',
  metaTitle: 'Roof Maintenance Plans & Pricing | The Roof Care Plan',
  metaDescription:
    'Roof maintenance plans for Los Angeles & Orange County homes: three priced tiers, seasonal visits and a photo report every time. See Roof Care Plan pricing.',
  hero: {
    heading: 'The Roof Care Plan',
    intro:
      'Your roof is failing right now. Just slowly. Los Angeles gets twelve inches of rain a year — and three hundred days of sun. Roofs here don’t wear out from water; they wear out from heat, light and time, every single day, whether it rains or not. We come out twice a year and stay ahead of it.',
    highlights: ['Scheduled visits, before and after the rains', 'A written photo report every time', 'Pay after each visit — nothing up front'],
  },
  whatGoesWrong: {
    heading: 'What Actually Goes Wrong on a Los Angeles Roof',
    items: [
      {
        title: 'The sun, not the storm',
        text: 'Your roof heats and cools every day of the year. Sealant dries and cracks; shingles go brittle and shed granules. Nothing about that waits for rain — by the time water finds the gap, the damage is already years old.',
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
      visits: 'Two visits, plus an aerial survey',
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
  schedule: {
    heading: 'Two Visits, Timed to the Season',
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
      a: 'Yes. A plan can cover the buildings across a community, including carports and common-area roofs, with one point of contact for the board or manager. The photo reports are easy to share at board meetings, so decisions rest on what the roofs actually look like.',
    },
  ],
  final: {
    heading: 'Get on the Calendar Before the First Rain',
    text: `We’ll walk your roof and show you what’s up there — no pressure, no obligation. Call ${PHONE} or send us a request below.`,
  },
};
