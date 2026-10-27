// Page H1s that lead with the plain words homeowners search (owner, October 15 2026). Since October 27 2026 (owner: "city names only on
// location pages") a service or hub H1 names no place: "Shingle Roof Repair". `place: true` still adds "in Los Angeles & Orange County".
// - the product name after " · " (TotalShield, LeakRescue, FlatGuard...) is left out of the H1; it stays in the page's `title` (menus, cards)
//   and in the hero intro and copy
// - "OC" is spelled out
// - a place at the end of the heading ("… in Los Angeles & Orange County", "… in Los Angeles") is taken off
const PLACE = 'Los Angeles & Orange County';

export function searchHeading(text, { place = false } = {}) {
  if (typeof text !== 'string') return text;
  let h = text.replace(/[\s ]*·[\s ]*\*?[^*·]+\*?\s*$/, '').replace(/&\s*OC\b/g, '& Orange County').trim();
  if (!place) return h.replace(/\s+in Los Angeles(\s*(&|and)\s*Orange County)?$/i, '').trim();
  if (!/los angeles|orange county|riverside|san bernardino/i.test(h)) h = `${h.replace(/\s+Services$/, '')} in ${PLACE}`;
  return h;
}
