// Pieces the page templates share

import { PHONE, TEL } from '@/data/site';

// Closing call to action on service and hub pages, worded around the page's keyword (e.g. 'tile roof repair').
// It sends visitors to the estimate form, not away from the page; commercial pages talk about the building.
const properCase = (keyword) => keyword.replace(/\bhoa\b/gi, 'HOA');

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
