// Who issues the reroofing permit for each city page (owner, November 24 2026, from the competitor analysis: city pages with real local
// substance, "local projects, photos and permit details"). Shown in the "Roof replacement in <city>" block on city pages
// (LocReplacement in components/loc/LocSections.jsx). Neighborhoods inside the City of Los Angeles are permitted by LADBS; an
// unincorporated area by LA County Public Works. `guide`: our permit guide covers that office (data/blog/posts.js roofing-permits-los-angeles).
// A new city page needs its row here, or the block leaves the permit sentence out.
const LADBS = { name: 'the Los Angeles Department of Building and Safety (LADBS)', guide: true };

export const PERMIT_OFFICES = {
  'los-angeles': LADBS,
  'woodland-hills': LADBS,
  venice: LADBS,
  'hollywood-hills': LADBS,
  'san-pedro': LADBS,
  'panorama-city': LADBS,
  'granada-hills': LADBS,
  'mid-wilshire': LADBS,
  westlake: LADBS,
  'west-hollywood': { name: 'the City of West Hollywood’s Building and Safety Division', guide: true },
  vernon: { name: 'the City of Vernon’s Building Division', guide: true },
  'santa-monica': { name: 'the City of Santa Monica’s Building and Safety Division' },
  pasadena: { name: 'the City of Pasadena’s building department' },
  burbank: { name: 'the City of Burbank’s Building and Safety Division' },
  'long-beach': { name: 'the City of Long Beach’s building department' },
  'huntington-beach': { name: 'the City of Huntington Beach’s Building and Safety Department' },
  'newport-beach': { name: 'the City of Newport Beach’s building division' },
  'pico-rivera': { name: 'the City of Pico Rivera’s building department' },
  'hacienda-heights': { name: 'LA County Public Works, since Hacienda Heights is unincorporated' },
  'san-jose': { name: 'the City of San José’s building division' },
};

export const permitOfficeFor = (slug) => PERMIT_OFFICES[slug] || null;
