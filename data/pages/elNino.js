// The El Niño landing page (/el-nino-roof-check/, app/el-nino-roof-check/page.js): where the El Niño popup and the home page's El Niño card lead.
// The top of the page is the promo card itself (components/widgets/PromoCard.jsx, copy in data/promo.js). Everything below uses only what the
// site already says: a free roofer-led drone evaluation, photos, plain-English findings, a written scope and price before any work, permits,
// insurance help within limits. No price, no response time, no guarantee. Leave out rain gutters and coatings (not offered).
// The page is noindex (a campaign page, not something to find in search) and left out of the sitemap and the AI files.
import { PROMO_LANDING_PATH } from '../promo';

export const EL_NINO_PAGE = {
  path: PROMO_LANDING_PATH,
  keyword: 'El Niño roof inspection',
  metaTitle: 'Free El Niño Roof Inspection in Los Angeles & OC',
  metaDescription:
    'Book a free El Niño roof inspection in Los Angeles and Orange County: a roofer-led drone evaluation, photos and a written scope before any work.',
  hero: {
    text: 'Book your free El Niño roof inspection: a roofer looks at your whole roof with drone footage and shows you what we find, in plain English, before the storms arrive.',
    points: ['Free roofer-led drone evaluation', 'Photos of what we find', 'Written scope and price before any work'],
  },
  covers: {
    heading: 'What Your Free Evaluation Covers',
    intro: 'The evaluation is free and there’s no obligation. Here is what you get from it.',
    items: [
      { title: 'A roofer, not a sales pitch', text: 'A roofer looks at your roof with drone footage and tells you its real condition, whether that is fine, worth watching or needs work.' },
      { title: 'Photos of what we find', text: 'You see what we see. We photograph the problem spots and explain them in plain English.' },
      { title: 'A clear next step', text: 'Repair, monitor, maintain or replace. If work is needed, you get a written scope and price before anything starts, and we pull the building permits.' },
    ],
  },
  weak: {
    heading: 'Where a Storm Finds a Weak Roof',
    intro: 'Heavy rain goes straight to the weak points. These are the places a roofer checks first.',
    items: [
      { title: 'Flashings and chimneys', text: 'Water gets in where metal meets the roof: around chimneys, skylights, walls and vents.' },
      { title: 'Valleys and roof edges', text: 'Valleys carry the most water and edges take the most wind, so leaks often begin there.' },
      { title: 'Vents and pipe boots', text: 'Cracked rubber boots and loose vent flashings are common leak points that are easy to miss from the ground.' },
      { title: 'Shingles and tiles', text: 'Lifted shingle tabs, cracked or slipped tiles and loose ridge mortar are what the first heavy rain finds.' },
      { title: 'Underlayment', text: 'On a tile roof the layer under the tiles wears out first. When it has, rain can find the gaps even if the tiles look fine.' },
      { title: 'Flat roofs and drains', text: 'Blisters, open seams and clogged drains let water sit on a flat roof instead of leaving it.' },
    ],
  },
  process: {
    heading: 'How the Free Evaluation Works',
    subheading: 'Three steps, and no pressure at any of them.',
    steps: [
      { title: 'Tell us about your roof', text: 'A few quick questions about your property and roof. Pick a day and time that suits you if you like.' },
      { title: 'A roofer evaluates it', text: 'A roofer looks at the whole roof with drone footage and documents what they find with photos.' },
      { title: 'You get a clear next step', text: 'We explain the findings in plain English. If work is needed, the written scope and price come before anything starts.' },
    ],
    image: '/images/shingle-roof-inspection-overhead.webp',
    imageAlt: 'Overhead view of a shingle roof during an inspection',
  },
  faqs: [
    { q: 'Is the El Niño roof evaluation really free?', a: 'Yes. The roof evaluation is free, with no obligation. A roofer reviews your roof, we show you photos and explain what we find in plain English, and you decide what to do next. If work is needed, you get a written scope and price before anything starts.' },
    { q: 'What is a drone roof evaluation?', a: 'A drone lets a roofer see your whole roof up close, including areas that are hard to reach, and photograph what they find. You get the photos along with the findings.' },
    { q: 'Will the evaluation tell me whether I need a new roof?', a: 'It tells you the real condition of your roof. Not every leak means a new roof: when the roof is sound overall and the problem is local, a targeted repair is the sensible fix. When wear is spread across the whole roof, we say so and show you the photos so you can weigh a [roof replacement](/roof-replacement/) on the evidence.' },
    { q: 'How do I book?', a: 'Tap any “Book My Free Evaluation” button, answer a few quick questions about your roof and pick a day and time if you like. A roofer follows up with a clear next step.' },
    { q: 'What if my roof is already leaking?', a: 'If water is coming in right now, call us at (310) 340-1643 or start a request and answer yes to “Is water coming in right now?” so we treat it as urgent. You can also read about [emergency roof repair](/roof-repair/emergency/).' },
    { q: 'Can you help with an insurance claim after a storm?', a: 'We work with insurance adjusters. Our staff is limited, so we help where we can, with photos and a written scope you can share with your insurer.' },
  ],
};
