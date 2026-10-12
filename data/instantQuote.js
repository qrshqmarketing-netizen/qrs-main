// Instant Quote drawer (the "Instant Quote" tab on the right edge of the screen on tablets and desktops; on phones
// the tab is hidden and the "Get an Instant Quote" button in the hero and closing CTA opens it instead).

// The Instant Quote switch. false hides everything that opens it (the side tab, the phone buttons in the hero and closing
// CTA, "See Example Payments" on the financing page) and leaves the drawer out of the page. It needs the Google key
// below (NEXT_PUBLIC_GOOGLE_MAPS_KEY, set in Vercel); without one the drawer runs in demo mode with sample measurements.
export const INSTANT_QUOTE_ENABLED = true;

// Pages where phones don't get that button: the quote only prices home roof replacements, so commercial, emergency,
// partner and job pages skip it.
export const QUOTE_EXCLUDE = ['/commercial-roofing/', '/roof-repair/emergency/', '/residential-roofing/hoa-multi-family/', '/service-areas/la-county/vernon/', '/contractors/', '/careers/', '/thank-you/'];

// Google Maps Platform key with the Solar API and Geocoding API enabled. Set it as
// NEXT_PUBLIC_GOOGLE_MAPS_KEY in .env.local, never in this file (the GitHub repo is public).
// Visitors' browsers can see it, so in Google Cloud Console restrict it to those two APIs and cap their daily quotas. Don't
// add a website (HTTP referrer) restriction: the Geocoding web service refuses referrer-restricted keys, so every address
// would come back "not found".
// Left empty, the drawer runs in demo mode with sample measurements.
export const GOOGLE_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '';

// ----- Pricing (the owner's installed rates, October 2026) -----
// Price per square foot of roof, low and high. A roofing "square" is 100 sq ft, so tile lift & relay at $800–$1,100 per square is $8–$11 per sq ft.
// The key is the name on the drawer's material choice and in the lead; `label` is the price line's heading.
export const PRICING = {
  Shingle: { label: 'Shingle roof replacement', low: 6.5, high: 8 },
  Tile: { label: 'Tile roof replacement', low: 12, high: 16 },
  'Lift & Relay': { label: 'Tile lift & relay', low: 8, high: 11 },
  Flat: { label: 'Flat roof replacement', low: 7.5, high: 10 },
};
export const WASTE = 1.1; // +10% for cuts, starter and ridge
export const PITCH_ADJ = { Flat: 1, Low: 1, Conventional: 1.08, Steep: 1.25, 'Not sure': 1.08 };
export const STORY_ADJ = { '1 story': 1, '2 stories': 1.06, '3+ stories': 1.12, '': 1 };
export const MIN_JOB = 3500; // smallest job you quote

// ----- Financing (the owner's terms, October 2026) -----
// apr: the example loan's APR %; terms: loan terms in years. promo: the 0% offer shown beside the example payment (on approved credit, "OAC").
export const FINANCE = { apr: 9.99, terms: [5, 10, 15], defaultTerm: 10, promo: { apr: 0, months: 18, label: '0% APR for 18 months', note: 'OAC' } };
export const FINANCING_URL = ''; // your lender's application link; empty = call button
