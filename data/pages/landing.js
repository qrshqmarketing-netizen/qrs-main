// Paid-ad landing pages (Facebook and Google Ads; owner, October 19 2026): /lp/residential/, /lp/commercial/ and the El Niño page
// (/el-nino-roof-check/), all on one template (components/landing/LandingPage.jsx). Each page is a hero with the request form in it, then proof,
// the three steps, reviews, recent work, a few FAQs and a closing call. No menu, chat, quote tab or pop-up on these pages (lib/landing.js).
//
// Message match: the ad's tags pick the headline and the form's service from the `variants` below, matched against utm_term (the Google Ads
// keyword, {keyword}), then utm_content, then utm_campaign (lower case). Only text written here is ever shown, never words from the address.
// Recommended tags:
//   Google Ads (final URL suffix): utm_source=google&utm_medium=cpc&utm_campaign={campaignname}&utm_term={keyword}&utm_content={creative}
//   Facebook (URL parameters):     utm_source=facebook&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}
// e.g. /lp/residential/?utm_source=google&utm_medium=cpc&utm_campaign=roof-repair&utm_term=roof+leak+repair
//
// Copy rules (AGENTS.md): only claims the site already makes. Homes: a free roofer-led drone evaluation, written scope and price before any work,
// 10-year workmanship warranty (call for details), licensed, bonded and insured, CSLB number, Google review count. Commercial: a roofer-led roof
// survey (never called free), written scope and price, permits pulled. No prices, no response times, no guarantees.
import { BUSINESS, GOOGLE_REVIEWS } from '@/data/site';
import { PROMO_LANDING_PATH } from '@/data/promo';

const license = `CSLB #${BUSINESS.license}`;
const reviews = `${GOOGLE_REVIEWS.count} Google reviews`;

export const LANDING_PAGES = {
  residential: {
    path: '/lp/residential/',
    name: 'residential',
    metaTitle: 'Free Roof Evaluation in Los Angeles & Orange County',
    metaDescription: 'Book a free roofer-led roof evaluation in Los Angeles and Orange County: drone footage, photos and a written scope and price before any work.',
    image: '/images/home-services-residential-shingle-drone-view.webp',
    imageAlt: 'Drone view of a finished shingle roof on a Los Angeles home',
    eyebrow: 'For Los Angeles & Orange County homeowners',
    heading: 'Get an honest look at your roof, free.',
    sub: 'A licensed roofer inspects your roof with drone footage, shows you photos of what we find and gives you a written scope and price before any work. No pressure.',
    service: 'Roof inspection / roof check',
    variants: [
      { match: /leak|repair|fix|damage|storm|wind|emergency|drip/, heading: 'Roof leak? Get it found and fixed at the source.', sub: 'A roofer traces where the water is really getting in, shows you photos of the problem and gives you a written scope and price before any repair.', service: 'Roof repair', tag: 'repair' },
      { match: /replac|new.?roof|re.?roof|install|tear.?off/, heading: 'Planning a new roof? Get a written price first.', sub: 'A roofer looks at your roof first, then you get a written scope and price for the whole job before any work, from a licensed, bonded and insured contractor.', service: 'Roof replacement', tag: 'replacement' },
      { match: /lift|relay|re-?lay|underlay/, heading: 'Keep your tiles. Replace what’s underneath.', sub: 'A tile lift & relay keeps your sound roof tiles and replaces the worn underlayment below. A roofer looks first and you get a written price before any work.', service: 'Tile lift & relay', tag: 'tile-relay' },
      { match: /tile|clay|spanish/, heading: 'Tile roof problems? Talk to a roofer first.', sub: 'A roofer inspects your tile roof with drone footage, shows you photos of cracked tiles and worn underlayment, and gives you a written scope and price.', service: 'Roof repair', tag: 'tile' },
      { match: /flat|torch|membrane|tpo|low.?slope/, heading: 'Flat roof trouble? Get a roofer’s honest look.', sub: 'A roofer checks the drainage, seams and flashing, shows you photos of what we find and gives you a written scope and price before any work.', service: 'Flat roofing', tag: 'flat' },
      { match: /shingle|asphalt/, heading: 'Shingle roof repair and replacement, done right.', sub: 'A roofer inspects your shingles, flashing and vents with drone footage, then you get a written scope and price before any work.', service: 'Shingle roofing', tag: 'shingle' },
      { match: /inspect|check|evaluat|estimate|quote/, heading: 'Book your free roof evaluation.', sub: 'A licensed roofer inspects your roof with drone footage, shows you photos of what we find and gives you a written scope and price before any work.', service: 'Roof inspection / roof check', tag: 'inspection' },
    ],
    points: ['Free roofer-led drone evaluation', 'Written price before any work', '10-year workmanship warranty (call for details)', license],
    proof: [reviews, 'Licensed, bonded & insured', 'Family-owned, local crews'],
    form: { title: 'Book your free roof evaluation', text: 'Leave your details and a roofer will call you to schedule it.', button: 'Book My Free Evaluation', fine: 'Free and no obligation. A roofer calls you to schedule.' },
    // "What we do": plain cards, no links (nothing on the page leads away from the form); wording from the service pages and home cards
    services: [
      { title: 'Roof repair', text: 'Leaks traced to the source and repaired, with clear photos and a written scope.' },
      { title: 'Roof replacement', text: 'Complete shingle and tile replacements, built from the deck up.' },
      { title: 'Tile lift & relay', text: 'Keep your sound roof tiles while the worn underlayment below is replaced.' },
      { title: 'Flat roofing', text: 'Flat roof systems planned around drainage, seams and lasting protection.' },
      { title: 'Roof inspections', text: 'A roofer-led inspection with photos, plain-English findings and a clear next step.' },
      { title: 'Roof maintenance plans', text: 'Scheduled roof care with seasonal visits and a photo report each time.' },
    ],
    steps: [
      { title: 'A roofer looks first', text: 'A trained in-house roofer inspects your roof, with drone footage of the areas of concern, and shows you photos of what we find.' },
      { title: 'You get it in writing', text: 'A written scope and price before any work starts: repair, monitor, maintain or replace. No pressure and no mystery pricing.' },
      { title: 'Clean work that’s backed', text: 'We pull the permits, protect your landscaping and sweep for nails every day. Installs carry a 10-year workmanship warranty (call for details).' },
    ],
    faqs: { from: 'home', questions: ['Is the roof evaluation free', 'Will I know the price', 'Do you offer financing', 'What kind of warranty', 'Do you work with insurance', 'How soon can someone'] },
    reviewsHeading: 'What homeowners say after the job',
    closing: { heading: 'Know where your roof stands.', text: 'A roofer looks first, the price is in writing, and the work is backed.' },
  },

  commercial: {
    path: '/lp/commercial/',
    name: 'commercial',
    metaTitle: 'Commercial Roofing in Los Angeles & Orange County',
    metaDescription: 'Commercial roofing in Los Angeles and Orange County: a roofer-led roof survey, a written scope and price, permits pulled and work planned around your building.',
    image: '/images/home-services-commercial-flat-roof-drone-view.webp',
    imageAlt: 'Drone view of a commercial flat roof in Los Angeles',
    eyebrow: 'For property managers, owners & HOA boards',
    heading: 'Commercial roofing that keeps your building running.',
    sub: 'A roofer surveys your roof, documents it with photos and gives you a written scope and price, with the work planned around your tenants and operations.',
    service: 'Commercial or HOA roofing',
    variants: [
      { match: /leak|repair|fix|damage|storm|emergency/, heading: 'Commercial roof leak? Find it and fix it at the source.', sub: 'A roofer traces the leak, documents it with photos and gives you a written scope and price, so your property manager or building engineer knows exactly what’s being fixed.', tag: 'repair' },
      { match: /replac|re.?roof|new.?roof|install|tear.?off/, heading: 'Commercial roof replacement, planned around your building.', sub: 'A roofer-led roof survey, a written scope and price, permits pulled and the work scheduled around your tenants and operations.', tag: 'replacement' },
      { match: /tpo|single.?ply|membrane|flat|torch|built.?up/, heading: 'Flat and TPO roofing for commercial buildings.', sub: 'A roofer surveys the membrane, seams, drains and flashing, documents it with photos and gives you a written scope and price.', tag: 'flat' },
      { match: /hoa|multi.?family|apartment|condo|property.?manag|association/, heading: 'Roofing for HOAs and multi-family buildings.', sub: 'Roof inspections, clear written scopes and planning support for community boards, with photo-documented reports boards and managers can review.', tag: 'hoa' },
      { match: /maint|inspect|survey|check/, heading: 'Know the condition of your commercial roof.', sub: 'A roofer-led roof survey with photos and a written scope, so you can plan repairs and budgets with the facts in front of you.', tag: 'survey' },
    ],
    points: ['Roofer-led roof survey', 'Written scope and price before any work', 'Permits pulled', license],
    proof: [reviews, 'Licensed, bonded & insured', '12 crews, 3 offices'],
    form: { title: 'Request a roof survey', text: 'Leave your details and a roofer will call you to plan the survey.', button: 'Request My Roof Survey', fine: 'No obligation. A roofer calls you to schedule.', askCompany: true },
    services: [
      { title: 'Commercial roof repair', text: 'A roofer traces the leak to its source; you get a written scope and price, and photos of the problem and the finished repair.' },
      { title: 'Commercial roof replacement', text: 'A survey of the whole roof first, a system matched to the building, and the work done section by section so your doors stay open.' },
      { title: 'TPO roofing', text: 'A white single-ply membrane with hot-air welded seams, recommended only when it fits the roof.' },
      { title: 'Flat & low-slope roofing', text: 'Flat roof systems planned around drainage, seams and rooftop equipment.' },
      { title: 'Maintenance & inspections', text: 'A photo-documented baseline, visits that catch problems while they’re small, and a photo report every visit.' },
      { title: 'HOA & multi-family roofing', text: 'Roof inspections, clear written scopes and planning support for community boards and managers.' },
    ],
    steps: [
      { title: 'A roof survey first', text: 'A roofer walks the roof, documents what we find with photos and talks it through with your property manager or building engineer.' },
      { title: 'A written scope and price', text: 'You get the scope and price in writing before any work, so owners and boards can review and approve it.' },
      { title: 'Work planned around you', text: 'We pull the permits, schedule the work around your tenants and operations, and keep the site clean every day.' },
    ],
    faqs: { from: '/commercial-roofing/', count: 5 },
    reviewsHeading: 'What clients say after the job',
    closing: { heading: 'Get the facts about your roof.', text: 'A roofer-led survey, a written scope and price, and work planned around your building.' },
  },

  'el-nino': {
    path: PROMO_LANDING_PATH,
    name: 'el-nino',
    metaTitle: 'Free El Niño Roof Inspection in Los Angeles & Orange County',
    metaDescription: 'Book a free El Niño roof inspection in Los Angeles and Orange County: a roofer-led drone evaluation, photos and a written scope before any work.',
    image: '/images/season-promo-storm-over-los-angeles.webp',
    imageAlt: 'Storm clouds rolling over the Los Angeles skyline',
    storm: true,
    eyebrow: 'Get your roof ready before the rain',
    heading: 'Is your roof ready for a super El Niño?',
    sub: 'Forecasters expect a very strong El Niño this winter. Book your free drone roof evaluation now and find the weak spots before the storms do.',
    service: 'Roof inspection / roof check',
    variants: [
      { match: /leak|repair|fix|damage|storm/, heading: 'Fix the weak spots before El Niño does.', sub: 'A roofer finds where water could get in, shows you photos and gives you a written scope and price for any repair, before the first big storm.', service: 'Roof repair', tag: 'repair' },
      { match: /replac|new.?roof|re.?roof/, heading: 'Will your old roof make it through El Niño?', sub: 'A roofer looks at your whole roof with drone footage and tells you plainly whether it needs repair, maintenance or replacement, with a written price.', service: 'Roof replacement', tag: 'replacement' },
    ],
    points: ['Free roofer-led drone evaluation', 'Photos of what we find', 'Written scope and price before any work', license],
    proof: [reviews, 'Licensed, bonded & insured', 'Family-owned, local crews'],
    form: { title: 'Book your free El Niño roof evaluation', text: 'Leave your details and a roofer will call you to schedule it.', button: 'Claim My Free Evaluation', fine: 'Free and no obligation. A roofer calls you to schedule.' },
    steps: [
      { title: 'A roofer looks first', text: 'A trained in-house roofer checks your whole roof with drone footage, before the storms arrive.' },
      { title: 'Photos and plain English', text: 'You see what we find, explained plainly, with a clear next step: repair, monitor, maintain or replace.' },
      { title: 'A written price, no pressure', text: 'Any work comes with a written scope and price first. You decide with the facts in front of you.' },
    ],
    faqs: { from: 'home', questions: ['Is the roof evaluation free', 'How soon can someone', 'Will I know the price', 'Do you work with insurance', 'What kind of warranty'] },
    reviewsHeading: 'What homeowners say after the job',
    closing: { heading: 'Don’t wait for the first big storm.', text: 'Book your free drone roof evaluation and know where your roof stands.' },
  },
};

// The variant for the ad that sent the visitor (or the page's default): { heading, sub, service, tag }
export function pickVariant(page, params = {}) {
  const base = { heading: page.heading, sub: page.sub, service: page.service, tag: 'default' };
  for (const key of ['utm_term', 'utm_content', 'utm_campaign']) {
    const value = String(Array.isArray(params[key]) ? params[key][0] : params[key] || '').toLowerCase().replace(/[+_]/g, ' ');
    if (!value) continue;
    const hit = page.variants.find((v) => v.match.test(value));
    if (hit) return { ...base, ...hit, service: hit.service || page.service };
  }
  return base;
}
