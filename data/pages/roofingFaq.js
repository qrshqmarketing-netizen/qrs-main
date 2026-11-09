// The roofing FAQ (/roofing-faq/, app/roofing-faq/page.js): its words, and which pages' FAQs it gathers. The answers themselves stay on their pages.

export const FAQ_PAGE = {
  path: '/roofing-faq/',
  keyword: 'roofing FAQ',
  // No place names (owner, November 9 2026: city names only on the location pages)
  metaTitle: 'Roofing FAQ | Quality Roofing Specialists',
  metaDescription:
    'Roofing FAQ from Quality Roofing Specialists: straight answers on roof repair, replacement, inspections, tile, shingle and flat roofs, and financing.',
  heading: 'Roofing FAQ',
  intro:
    'This roofing FAQ answers the questions homeowners and property managers ask our roofers most, because most roof decisions come down to the same few: repair or replace, what drives the price, how long it takes and who to trust. Repairs, replacements, inspections, each roof type, maintenance, financing and our license, with every answer linked to the page that covers it in full.',
  image: '/images/contractors-hero-roofer-tablet.webp',
  imageAlt: 'A QRS roofer on a roof holding a tablet, reviewing findings',
};
// [group title, source page]: the FAQ of each page, in this order
export const FAQ_GROUPS = [
  ['General questions', '/'],
  ['Roof repair', '/roof-repair/'],
  ['Emergency and storm damage', '/roof-repair/emergency/'],
  ['Roof replacement', '/roof-replacement/'],
  ['Roof inspections', '/roof-inspection/'],
  ['Tile roofs', '/residential-roofing/tile-roofing/'],
  ['Tile lift and relay', '/residential-roofing/tile-roofing/lift-and-relay/'],
  ['Shingle roofs', '/residential-roofing/shingle-roofing/'],
  ['Flat roofs', '/residential-roofing/flat-roofing/'],
  ['Attic ventilation', '/residential-roofing/attic-ventilation/'],
  ['Commercial roofing', '/commercial-roofing/'],
  ['Maintenance plans', '/roof-maintenance-plans/'],
  ['Financing', '/roof-financing/'],
  ['License and credentials', '/credentials/'],
];
