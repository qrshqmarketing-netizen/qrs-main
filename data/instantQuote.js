// Instant Quote drawer (the "Instant Quote" tab on the right edge of the screen).

// Google Maps Platform key with the Solar API and Geocoding API enabled. Set it as
// NEXT_PUBLIC_GOOGLE_MAPS_KEY in .env.local, never in this file (the GitHub repo is public).
// Visitors' browsers can see it, so restrict it to your domain (HTTP referrers) in Google Cloud Console.
// Left empty, the drawer runs in demo mode with sample measurements.
export const GOOGLE_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '';

// Optional: URL that receives the lead as JSON (CRM webhook, form service, etc.). Set in .env.local.
export const LEAD_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT || '';

// ----- Pricing (EXAMPLE numbers: replace with your real installed rates) -----
// Price per square foot of roof, low and high, for a full replacement
export const PRICING = {
  Shingle: { label: 'Shingle roof replacement', low: 5.5, high: 8.5 },
  Tile: { label: 'Tile roof replacement', low: 12, high: 18 },
  Flat: { label: 'Flat roof replacement', low: 7, high: 11 },
  Metal: { label: 'Metal roof replacement', low: 11, high: 16 },
};
export const WASTE = 1.1; // +10% for cuts, starter and ridge
export const PITCH_ADJ = { Flat: 1, Low: 1, Conventional: 1.08, Steep: 1.25, 'Not sure': 1.08 };
export const STORY_ADJ = { '1 story': 1, '2 stories': 1.06, '3+ stories': 1.12, '': 1 };
export const MIN_JOB = 6000; // smallest job you quote

// ----- Financing (EXAMPLE terms: match your lender's real offer) -----
export const FINANCE = { apr: 9.99, terms: [5, 10, 15], defaultTerm: 10 }; // APR %, loan terms in years
export const FINANCING_URL = ''; // your lender's application link; empty = call button
