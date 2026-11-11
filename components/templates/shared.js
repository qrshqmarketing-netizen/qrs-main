// Pieces the page templates share

import { LOCATIONS, REGIONS } from '@/data/locations';
import { OFFICES, PHONE, TEL } from '@/data/site';

// Closing call to action on service and hub pages, worded around the page's keyword (e.g. 'tile roof repair').
// It sends visitors to the estimate form, not away from the page; commercial pages talk about the building.
const properCase = (keyword) => keyword.replace(/\bhoa\b/gi, 'HOA');

// Section headings that name the page's work (owner, November 10 2026, from the services search review: 28 to 38 pages shared the
// same generic headings). The keyword's first letter is capitalized; headings are shown in capitals anyway.
const sentence = (keyword) => { const k = properCase(keyword); return k.charAt(0).toUpperCase() + k.slice(1); };
export const faqHeading = (keyword) => `${sentence(keyword)} __questions__, answered`;
export const REVIEWS_HEADING = 'Roofing reviews from the people we work for';
// Projects: "… on real roofs" only when the projects list this very page (projectsShownOn's `exact`)
export const projectsHeading = (keyword, exact) => (exact ? `${sentence(keyword)} on real roofs` : 'Recent roofing projects');

// "… near you": one paragraph that links a service or hub page to the county pages and the office city pages (those pages had no link
// to a location page at all). Names and addresses come from data/locations.js and data/site.js, so a new county or office shows up here.
const list = (items) => (items.length > 1 ? `${items.slice(0, -1).join(', ')} and ${items.at(-1)}` : items[0] || '');
export const nearYou = (keyword, offer = 'home') => {
  const topic = properCase(keyword);
  const counties = REGIONS.map((r) => `[${r.name}](/service-areas/${r.slug}/)`);
  const offices = OFFICES.map((o) => LOCATIONS.find((l) => l.slug === o.citySlug)).filter(Boolean).map((l) => `[${l.city}](/service-areas/${l.region}/${l.slug}/)`);
  return {
    heading: `${sentence(keyword)} __near you__`,
    paragraphs: [
      `QRS offers ${topic} across ${list(counties)}, from our offices in ${list(offices)}. Not sure we reach you? Check your ZIP code on our [service areas](/service-areas/) page, or call [${PHONE}](${TEL}).`,
      offer === 'commercial'
        ? 'Wherever the building is, it starts the same way: a roofer walks the roof, you get photos of what we find, and a written scope and price comes before any work.'
        : 'Wherever you are, it starts the same way: a roofer looks at the roof, you get photos of what we find, and a written scope and price comes before any work.',
    ],
  };
};

// FAQ section subtitle on service and hub pages
export const faqSub = (keyword) => `Straight answers about ${properCase(keyword)}.`;
export const closingCta = (keyword, offer = 'home') => {
  const topic = properCase(keyword);
  return {
    heading: `Get a Straight Answer on ${topic}`,
    text:
      offer === 'commercial'
        ? `Tell us about the building. A roofer, not a salesperson, walks the roof and gives you a clear next step on ${topic}, with a written scope and price.`
        : `Tell us what’s going on with your roof. A roofer, not a salesperson, looks at it and gives you a clear next step on ${topic}, with a written scope and price.`,
    cta: { label: 'Get Pro Advice', href: '#roof-check' },
  };
};

// Plum is kept for "call now" actions (see --plum in app/globals.css).
// Repair pages: the gold Roof Check button, plus a plum call button for a roof that's leaking now
export const REPAIR_ACTIONS = [
  { label: 'Get Pro Advice', href: '#roof-check', style: 'gold' },
  { label: `Leaking Now? Call ${PHONE}`, href: TEL, style: 'plum' },
];
export const isRepair = (service) => ['repair', 'repairs'].includes(service.slug);

// Emergency & Storm Damage page: calling comes first
export const EMERGENCY_ACTIONS = [
  { label: `Call ${PHONE}`, href: TEL, style: 'plum' },
  { label: 'Request an Estimate', href: '#roof-check', style: 'line' },
];
export const EMERGENCY_CTA = {
  heading: 'Storm Damage or a Sudden Leak?',
  text: 'Call and tell us what happened. A roofer assesses and photographs the damage, adds temporary protection if it’s needed and prices the permanent repair in writing.',
  cta: { label: `Call ${PHONE}`, href: TEL, style: 'plum' },
};
