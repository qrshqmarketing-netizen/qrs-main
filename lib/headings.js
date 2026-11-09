// Page H1s that lead with the plain words homeowners search (owner, October 15 2026): "Shingle Roof Repair in Los Angeles & Orange County".
// - the product name after " · " (TotalShield, LeakRescue, FlatGuard...) is left out of the H1; it stays in the page's `title` (menus, cards)
//   and in the hero intro and copy
// - "OC" is spelled out
// - a heading that doesn't name a place gets "in Los Angeles & Orange County" (a trailing "Services" is dropped first:
//   "Shingle Roofing Services" → "Shingle Roofing in Los Angeles & Orange County")
const PLACE = 'Los Angeles & Orange County';

// The product name after " · " now follows the H1 as "with *Brand*" (owner, November 9 2026: "Roof Repair with LeakRescue"), in the brand's serif
// italic wherever the heading goes through Rich; "the" before a plan's name reads better ("Roof Maintenance Plans with the RoofCare Plan").
// `brand: false` leaves it out, as before.
export const brandOf = (text) => (typeof text === 'string' ? text.match(/·[\s\u00a0]*\*([^*·]+)\*\s*$/)?.[1]?.trim() : undefined);
const withBrand = (h, b) => (b ? `${h} with ${/\bPlan$/.test(b) ? 'the ' : ''}*${b}*` : h);

export function searchHeading(text, { place = true, brand = true } = {}) {
  if (typeof text !== 'string') return text;
  const b = brand ? brandOf(text) : undefined;
  let h = text.replace(/[\s ]*·[\s ]*\*?[^*·]+\*?\s*$/, '').replace(/&\s*OC\b/g, '& Orange County').trim();
  if (!place) return withBrand(noPlace(h), b);
  if (place && !/los angeles|orange county|riverside|san bernardino/i.test(h)) h = `${h.replace(/\s+Services$/, '')} in ${PLACE}`;
  return withBrand(h, b);
}

// The heading without the place it ends with (owner, November 6 2026: city names in hero headings only on the location pages):
// "Roof Repair in Los Angeles & Orange County" → "Roof Repair"
export const noPlace = (text) =>
  typeof text === 'string' ? text.replace(/\s+(in|across|for)\s+(Los Angeles|LA\b|Orange County|Southern California).*$/i, '').trim() : text;
