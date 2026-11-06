// Page H1s that lead with the plain words homeowners search (owner, October 15 2026): "Shingle Roof Repair in Los Angeles & Orange County".
// - the product name after " · " (TotalShield, LeakRescue, FlatGuard...) is left out of the H1; it stays in the page's `title` (menus, cards)
//   and in the hero intro and copy
// - "OC" is spelled out
// - a heading that doesn't name a place gets "in Los Angeles & Orange County" (a trailing "Services" is dropped first:
//   "Shingle Roofing Services" → "Shingle Roofing in Los Angeles & Orange County")
const PLACE = 'Los Angeles & Orange County';

export function searchHeading(text, { place = true } = {}) {
  if (typeof text !== 'string') return text;
  let h = text.replace(/[\s ]*·[\s ]*\*?[^*·]+\*?\s*$/, '').replace(/&\s*OC\b/g, '& Orange County').trim();
  if (!place) return noPlace(h);
  if (place && !/los angeles|orange county|riverside|san bernardino/i.test(h)) h = `${h.replace(/\s+Services$/, '')} in ${PLACE}`;
  return h;
}

// The heading without the place it ends with (owner, November 6 2026: city names in hero headings only on the location pages):
// "Roof Repair in Los Angeles & Orange County" → "Roof Repair"
export const noPlace = (text) =>
  typeof text === 'string' ? text.replace(/\s+(in|across|for)\s+(Los Angeles|LA\b|Orange County|Southern California).*$/i, '').trim() : text;
