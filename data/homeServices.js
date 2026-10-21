// The home page's services explorer (components/home/HomeServices.jsx; owner, October 21 2026, after the product tabs on digitalocean.com):
// a tab per kind of work, each with a photo, one line and the pages that cover it. The words are the home page's own service lines; every link is
// a page that exists. `title` may name a product (*LeakRescue*), rendered by Rich. Add, remove or reorder a tab here.
import { SERVICE_CATEGORIES } from './serviceCategories';

const category = (title) => SERVICE_CATEGORIES.find((c) => c.title === title);

export const HOME_SERVICE_TABS = [
  {
    label: 'Roof Repair',
    title: '*LeakRescue* Roof Repairs',
    text: 'Leaks traced to the source and repaired with clear photos and a written scope.',
    image: '/images/shingle-roof-repair-ridge-finish.webp',
    href: '/roof-repair/',
    links: [
      { label: 'Shingle roof repair', href: '/residential-roofing/shingle-roofing/repair/' },
      { label: 'Tile roof repair', href: '/residential-roofing/tile-roofing/repair/' },
      { label: 'Flat roof repair', href: '/residential-roofing/flat-roofing/repair/' },
      { label: 'Metal roof repair', href: '/residential-roofing/metal-roofing/repair/' },
      { label: 'Emergency roof repair', href: '/roof-repair/emergency/' },
    ],
  },
  {
    label: 'Roof Replacement',
    title: 'Roof Replacement',
    text: 'Complete replacements and new installations, built from the deck up.',
    image: '/images/shingle-roof-completed-drone-view.webp',
    href: '/roof-replacement/',
    links: [
      { label: 'Shingle roof replacement', href: '/residential-roofing/shingle-roofing/replacement/' },
      { label: 'Tile roof replacement', href: '/residential-roofing/tile-roofing/replacement/' },
      { label: 'Flat roof replacement', href: '/residential-roofing/flat-roofing/replacement/' },
      { label: 'Standing seam metal roofs', href: '/residential-roofing/metal-roofing/standing-seam/' },
    ],
  },
  {
    label: 'Tile Roofing',
    title: '*SecondLife* Tile Reset',
    text: 'Keep sound roof tiles while replacing the worn underlayment below.',
    image: '/images/tile-lift-off-and-reset-drone-view.webp',
    href: '/residential-roofing/tile-roofing/',
    links: [
      { label: 'Tile lift & relay', href: '/residential-roofing/tile-roofing/lift-and-relay/' },
      { label: 'Tile roof replacement', href: '/residential-roofing/tile-roofing/replacement/' },
      { label: 'Tile roof repair', href: '/residential-roofing/tile-roofing/repair/' },
      { label: 'Concrete tile roofing', href: '/residential-roofing/tile-roofing/concrete/' },
      { label: 'Slate tile roofing', href: '/residential-roofing/tile-roofing/slate/' },
    ],
  },
  {
    label: 'Flat Roofing',
    title: '*FlatGuard* Flat Roofing',
    text: 'Flat roof systems planned around drainage, seams and lasting protection.',
    image: '/images/flat-roof-torch-down-drone-view-services.webp',
    href: '/residential-roofing/flat-roofing/',
    links: [
      { label: 'Flat roof replacement', href: '/residential-roofing/flat-roofing/replacement/' },
      { label: 'Flat roof installation', href: '/residential-roofing/flat-roofing/installation/' },
      { label: 'Flat roof repair', href: '/residential-roofing/flat-roofing/repair/' },
    ],
  },
  {
    label: 'Inspections & Care',
    title: '*RoofScan 360* Inspections',
    text: 'A roofer-led inspection with photos, plain-English findings and a clear next step. The *RoofCare Plan* adds seasonal visits with a photo report each time.',
    image: '/images/roofscan-360-roofer-chimney-flashing.webp',
    href: '/roof-inspection/',
    links: [
      { label: 'Roof inspection', href: '/roof-inspection/' },
      { label: 'Roof maintenance plans', href: '/roof-maintenance-plans/' },
      { label: 'Attic ventilation', href: '/residential-roofing/attic-ventilation/' },
    ],
  },
  {
    label: 'HOA & Multi-Family',
    title: '*ReserveReady* HOA Roofing',
    text: category('HOA & Multi-Family Roofing').text,
    image: category('HOA & Multi-Family Roofing').image,
    href: category('HOA & Multi-Family Roofing').href,
    links: [
      { label: 'HOA & multi-family roofing', href: category('HOA & Multi-Family Roofing').href },
      { label: 'Roof maintenance plans', href: '/roof-maintenance-plans/' },
    ],
  },
  {
    label: 'Commercial',
    title: 'Commercial Roofing',
    text: category('Commercial Roofing').text,
    image: category('Commercial Roofing').image,
    href: category('Commercial Roofing').href,
    links: [
      { label: 'Commercial roof repair', href: '/commercial-roofing/repair/' },
      { label: 'Commercial roof replacement', href: '/commercial-roofing/replacement/' },
      { label: 'TPO roofing', href: '/commercial-roofing/tpo-roofing/' },
      { label: 'Inspection & maintenance', href: '/commercial-roofing/maintenance/' },
    ],
  },
];
