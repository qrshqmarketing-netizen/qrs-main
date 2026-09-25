// Pieces the page templates share

import { PHONE, TEL } from '@/data/site';

// Closing "find your location" call to action (over the truck photo)
export const LOCATION_CTA = {
  heading: 'Find Your Nearest QRS Service Area',
  text: 'We serve homeowners and property owners across Los Angeles and Orange County. Find your city and check your ZIP code.',
  cta: { label: 'Find Your Location', href: '/service-areas/' },
};

// Red is kept for "call now" actions (see --red in app/globals.css).
// Repair pages: the gold Roof Check button, plus a red call button for a roof that's leaking now
export const REPAIR_ACTIONS = [
  { label: 'Get Pro Advice', href: '#roof-check', style: 'gold' },
  { label: `Leaking Now? Call ${PHONE}`, href: TEL, style: 'red' },
];
export const isRepair = (service) => ['repair', 'repairs'].includes(service.slug);

// Emergency & Storm Damage page: calling comes first
export const EMERGENCY_ACTIONS = [
  { label: `Call ${PHONE}`, href: TEL, style: 'red' },
  { label: 'Request an Estimate', href: '#roof-check', style: 'line' },
];
export const EMERGENCY_CTA = {
  heading: 'Storm Damage or a Sudden Leak?',
  text: 'Call and tell us what happened. A roofer assesses and photographs the damage, adds temporary protection if it’s needed and prices the permanent repair in writing.',
  cta: { label: `Call ${PHONE}`, href: TEL, style: 'red' },
};
