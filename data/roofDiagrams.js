// The interactive roof illustrations from the blog (components/blog/CommercialHotspots.jsx, LayerDiagram.jsx) on the service pages they explain
// (owner, October 16 2026). The items are the articles' own words (commercial-roof-leak-repair, "Where Commercial Roofs Leak"; tile-roof-underlayment,
// "Why Tile Roofs Can Leak Even When Tiles Look Fine"), so no new claims; each section links back to its article. Shown by
// components/sections/RoofDiagram.jsx from ServicePage.jsx and HubPage.jsx for the addresses in DIAGRAM_PAGES.

const FLAT_LEAKS = [
  { title: 'Drains and scuppers', text: 'Debris blocks them, water ponds and finds the weak points' },
  { title: 'Seams and laps', text: 'Seams open, split or lose their bond over time' },
  { title: 'Flashing at walls and parapets', text: 'Flashing pulls away, cracks or loses its sealant' },
  { title: 'Rooftop equipment and curbs', text: 'Flashing around HVAC units and curbs fails, or the curb itself moves' },
  { title: 'Penetrations', text: 'Pipes, vents and conduits lose their seals' },
  { title: 'Skylights', text: 'Flashing and seals around them wear out' },
  { title: 'The membrane surface', text: 'Punctures, blisters and splits, often from foot traffic or debris' },
  { title: 'Roof edges', text: 'Edge metal loosens and lets water in' },
];

// A home's shingle roof (ResidentialHotspots): worded from the site's own shingle repair copy and FAQs
const HOME_LEAKS = [
  { title: 'Pipe boots and vent collars', text: 'The rubber collar around a plumbing vent splits in the sun, and water follows the pipe in' },
  { title: 'Step flashing at walls', text: 'Flashing pulls away where the roof meets a wall, often a stucco wall' },
  { title: 'Valleys', text: 'A valley packed with leaves holds water right where two slopes meet' },
  { title: 'Chimney flashing', text: 'Counter and chimney flashing loosens or cracks where the chimney passes through' },
  { title: 'Skylights', text: 'Flashing and seals around them wear out' },
  { title: 'Lifted or creased shingles', text: 'Santa Ana winds lift and crease tabs, and a creased shingle tears loose in the next strong gust' },
  { title: 'Nail pops', text: 'A nail that backs out pushes up the shingle above it and leaves a path into the deck' },
  { title: 'Roof edges', text: 'Wind gets under loose shingles and edge metal at the eaves, and water follows' },
];

const TILE_LEAKS = [
  '**Underlayment deterioration:** Aging or damaged material may no longer provide adequate secondary water protection.',
  '**Flashing failure:** Poorly integrated or deteriorated flashing can allow water into roof intersections.',
  '**Broken or displaced tiles:** Openings in the tile covering can expose the layers beneath.',
  '**Valley problems:** Debris, damaged components, or defective installation can interfere with drainage.',
  '**Roof penetrations:** Plumbing vents, skylights, and other openings require appropriate waterproofing details.',
  '**Roof deck damage:** Prolonged moisture exposure can compromise the surface supporting the roofing system.',
];

const COMMERCIAL = {
  kind: 'flat',
  items: FLAT_LEAKS,
  label: 'Where leaks start',
  heading: 'Where commercial roofs __leak__',
  text: 'Most leaks begin at details, not in the middle of an intact membrane. Condensate from an air conditioner or a plumbing leak can look the same, so a roofer checks those too.',
  article: { label: 'Read: commercial roof leak repair', href: '/blog/commercial-roof-leak-repair/' },
};
const FLAT = {
  ...COMMERCIAL,
  heading: 'Where flat roofs __leak__',
  text: 'Most leaks begin at details, not in the middle of an intact membrane: the drains, seams, flashings and everything that passes through the roof.',
};
const TILE = {
  kind: 'tile',
  items: TILE_LEAKS,
  label: 'Where leaks start',
  heading: 'Why tile roofs leak when the tiles look __fine__',
  text: 'Tile is designed to shed water, but wind-driven rain and water moving beneath the tiles can still reach the details below. The underlayment, flashing and drainage have to work together.',
  article: { label: 'Read: tile roof underlayment', href: '/blog/tile-roof-underlayment/' },
};

const HOME = {
  kind: 'home',
  items: HOME_LEAKS,
  label: 'Where leaks start',
  heading: 'Where a home’s roof __leaks__',
  text: 'Water rarely comes in where the ceiling stain shows. It starts at a detail like these, then runs along the underlayment or a rafter before it drips.',
};

export const DIAGRAM_PAGES = {
  '/roof-repair/': HOME,
  '/roof-inspection/': HOME,
  '/residential-roofing/shingle-roofing/': HOME,
  '/residential-roofing/shingle-roofing/repair/': HOME,
  '/commercial-roofing/': COMMERCIAL,
  '/commercial-roofing/repair/': COMMERCIAL,
  '/commercial-roofing/maintenance/': COMMERCIAL,
  '/commercial-roofing/tpo-roofing/': COMMERCIAL,
  '/residential-roofing/flat-roofing/': FLAT,
  '/residential-roofing/flat-roofing/repair/': FLAT,
  '/residential-roofing/tile-roofing/': TILE,
  '/residential-roofing/tile-roofing/repair/': TILE,
  '/residential-roofing/tile-roofing/replacement/': TILE,
  '/residential-roofing/tile-roofing/lift-and-relay/': TILE,
};

export const diagramFor = (path) => DIAGRAM_PAGES[path] || null;
