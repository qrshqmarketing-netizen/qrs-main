// The "dream outcome" line under each page's hero heading (components/sections/Hero.jsx shows it in gold, inside the H1, right after the
// keyword line, so the page's H1 holds both the keyword and the result the visitor wants). Keyed by page address.
//
// How to write one: the end state the visitor is after (a dry home, a roof they can stop thinking about, a business that keeps running),
// short enough for two lines, in plain words. Never a guarantee or a number (no "leak-free", "forever", "guaranteed", years or prices) and
// nothing the page doesn't already say. Homeowners and clients stay "homeowners" and "clients" (data/pages terminology rule).
//
// The underlined word in each page's H1 is in HERO_UNDERLINES below (a hand-drawn gold line that draws itself).
//
// The home page's big headline ("Come home to a roof you can trust.") is in app/page.js: there the keyword line above it is the H1.

import { LOCATION_PAGES } from './locationPages';
import { cityPath, LOCATIONS } from './locations';

export const HERO_OUTCOMES = {
  // Residential hubs and programs
  '/residential-roofing/': 'A home that stays dry, comfortable and protected.',
  '/roof-repair/': 'Stop the leak. Get your home dry again.',
  '/roof-replacement/': 'Come home to a roof you can stop worrying about.',
  '/roof-repair/emergency/': 'Get the water stopped and the damage contained.',
  '/roof-inspection/': 'Know your roof’s real condition and your next step.',
  '/roof-financing/': 'Spread the cost of the roof you need.',
  '/roof-maintenance-plans/': 'Catch small problems before they become leaks.',

  // Shingle
  '/residential-roofing/shingle-roofing/': 'A roof that finishes the look of your home.',
  '/residential-roofing/shingle-roofing/replacement/': 'A fresh new roof, built right from the deck up.',
  '/residential-roofing/shingle-roofing/repair/': 'Back to a dry ceiling and a quiet night’s sleep.',
  '/residential-roofing/shingle-roofing/installation/': 'A brand-new roof for your new home or addition.',

  // Tile
  '/residential-roofing/tile-roofing/': 'Keep the tile roof you love, and keep it dry.',
  '/residential-roofing/tile-roofing/replacement/': 'Keep the tile look on a roof built fresh underneath.',
  '/residential-roofing/tile-roofing/repair/': 'Fix the real source of the leak, not just the stain.',
  '/residential-roofing/tile-roofing/lift-and-relay/': 'Keep the roof you love, with fresh protection beneath.',
  '/residential-roofing/tile-roofing/slate/': 'The natural beauty of stone, planned from the frame up.',
  '/residential-roofing/tile-roofing/concrete/': 'The color and profile you love, built as a complete roof.',

  // Flat
  '/residential-roofing/flat-roofing/': 'A flat roof that drains well and keeps you dry.',
  '/residential-roofing/flat-roofing/replacement/': 'A flat roof that drains well and keeps water out.',
  '/residential-roofing/flat-roofing/repair/': 'Trace the leak to its source and get back to dry.',
  '/residential-roofing/flat-roofing/installation/': 'A new flat roof for your ADU, addition or garage.',

  // Metal
  '/residential-roofing/metal-roofing/': 'Clean lines and a roof built for the sun.',
  '/residential-roofing/metal-roofing/standing-seam/': 'Sleek, clean lines and a roof built for the sun.',
  '/residential-roofing/metal-roofing/repair/': 'Get your metal roof back to quiet and dry.',

  // HOA and ventilation
  '/residential-roofing/hoa-multi-family/': 'A roof plan your board can approve with confidence.',
  '/residential-roofing/attic-ventilation/': 'An attic that breathes and a more comfortable home.',

  // Commercial
  '/commercial-roofing/': 'Protect your building. Keep your business running.',
  '/commercial-roofing/repair/': 'Stop the leak and keep your building running.',
  '/commercial-roofing/replacement/': 'A new roof without closing your doors.',
  '/commercial-roofing/tpo-roofing/': 'A bright white roof that reflects the sun.',
  '/commercial-roofing/maintenance/': 'Catch small problems before they reach the ceiling.',
  '/commercial-roofing/office-buildings/': 'Protect your tenants and keep your office running.',
  '/commercial-roofing/retail/': 'Keep the sales floor dry and your doors open.',
  '/commercial-roofing/churches/': 'Protect the place your community gathers.',
  '/commercial-roofing/industrial/': 'Protect your people, equipment and production.',
  '/commercial-roofing/shops/': 'A simple roof fix, so you can get back to business.',
  '/commercial-roofing/warehouses/': 'Protect your inventory without shutting down.',
  '/commercial-roofing/malls/': 'Protect every tenant space and keep the center open.',
  '/contractors/': 'A roofing crew you can count on, job after job.',

  // Service areas
  '/service-areas/': 'Roofing help close to home, across LA and OC.',
  '/service-areas/la-county/': 'A dry, protected home from the coast to the Valley.',
  '/service-areas/orange-county/': 'Protected homes from Anaheim to Newport Beach.',
  '/service-areas/riverside-county/': 'A roof built for the Inland Empire sun.',
  '/service-areas/san-bernardino-county/': 'A roof ready for the heat and the Santa Ana winds.',
  '/service-areas/la-county/los-angeles/': 'A roof you can trust, done the detail-first way.',
  '/service-areas/la-county/santa-monica/': 'A roof that’s ready for the coast.',
  '/service-areas/la-county/pasadena/': 'Protect your home without losing its character.',
  '/service-areas/la-county/glendale/': 'A roof ready for the foothills and the Santa Ana winds.',
  '/service-areas/la-county/burbank/': 'A roof ready for the Valley heat.',
  '/service-areas/la-county/woodland-hills/': 'A roof you can trust, from our own Valley office.',
  '/service-areas/la-county/torrance/': 'A roof done right, with clear scopes and clean work.',
  '/service-areas/la-county/long-beach/': 'Protect your home from Belmont Shore to Bixby Knolls.',
  '/service-areas/la-county/vernon/': 'Industrial roofs that keep your operation running.',
  '/service-areas/orange-county/anaheim/': 'A roof done right, from the Colony to Anaheim Hills.',
  '/service-areas/orange-county/santa-ana/': 'No pressure, no surprises, just a roof you can count on.',
  '/service-areas/orange-county/huntington-beach/': 'A roof that’s ready for the salt air.',
  '/service-areas/orange-county/irvine/': 'Keep your home protected, from Woodbridge to Turtle Rock.',
  '/service-areas/orange-county/newport-beach/': 'A roof as polished as your coastal home.',

  // Company pages
  '/projects/': 'See what your finished roof could look like.',
  '/reviews/': 'Hear it from the people we’ve helped.',
  '/about-us/': 'A family-owned roofing team that treats your roof like our own.',
  '/careers/': 'Build a career you’re proud of with a team that backs you.',
  '/contact-us/': 'Talk to a real roofer and get a clear next step.',
  '/blog/': 'Know your roof before the next storm.',
};

// The word or phrase underlined (by hand, animated) in each page's H1 (components/sections/Hero.jsx). It must appear in the H1's text exactly; one short
// distinguishing word, not the whole keyword. A page with no entry has no underline.
export const HERO_UNDERLINES = {
  '/residential-roofing/': 'Residential',
  '/roof-repair/': 'Repair',
  '/roof-replacement/': 'Replacement',
  '/roof-repair/emergency/': 'Emergency',
  '/roof-inspection/': 'Inspection',
  '/roof-financing/': 'Financing',
  '/roof-maintenance-plans/': 'Maintenance',
  '/residential-roofing/shingle-roofing/': 'Shingle',
  '/residential-roofing/shingle-roofing/replacement/': 'Replacement',
  '/residential-roofing/shingle-roofing/repair/': 'Repair',
  '/residential-roofing/shingle-roofing/installation/': 'Installation',
  '/residential-roofing/tile-roofing/': 'Tile',
  '/residential-roofing/tile-roofing/replacement/': 'Replacement',
  '/residential-roofing/tile-roofing/repair/': 'Repair',
  '/residential-roofing/tile-roofing/lift-and-relay/': 'Lift & Relay',
  '/residential-roofing/tile-roofing/slate/': 'Slate',
  '/residential-roofing/tile-roofing/concrete/': 'Concrete',
  '/residential-roofing/flat-roofing/': 'Flat',
  '/residential-roofing/flat-roofing/replacement/': 'Replacement',
  '/residential-roofing/flat-roofing/repair/': 'Repair',
  '/residential-roofing/flat-roofing/installation/': 'Installation',
  '/residential-roofing/metal-roofing/': 'Metal',
  '/residential-roofing/metal-roofing/standing-seam/': 'Standing Seam',
  '/residential-roofing/metal-roofing/repair/': 'Repair',
  '/residential-roofing/hoa-multi-family/': 'HOA',
  '/residential-roofing/attic-ventilation/': 'Attic',
  '/commercial-roofing/': 'Commercial',
  '/commercial-roofing/repair/': 'Repair',
  '/commercial-roofing/replacement/': 'Replacement',
  '/commercial-roofing/tpo-roofing/': 'TPO',
  '/commercial-roofing/maintenance/': 'Maintenance',
  '/commercial-roofing/office-buildings/': 'Office Building',
  '/commercial-roofing/retail/': 'Retail',
  '/commercial-roofing/churches/': 'Church',
  '/commercial-roofing/industrial/': 'Industrial',
  '/commercial-roofing/shops/': 'Shop',
  '/commercial-roofing/warehouses/': 'Warehouse',
  '/commercial-roofing/malls/': 'Mall',
  '/contractors/': 'Partner',
  '/service-areas/': 'Service Areas',
  '/service-areas/la-county/': 'Los Angeles',
  '/service-areas/orange-county/': 'Orange County',
  '/service-areas/riverside-county/': 'Riverside',
  '/service-areas/san-bernardino-county/': 'San Bernardino',
  '/service-areas/la-county/los-angeles/': 'Los Angeles',
  '/service-areas/la-county/santa-monica/': 'Santa Monica',
  '/service-areas/la-county/pasadena/': 'Pasadena',
  '/service-areas/la-county/glendale/': 'Glendale',
  '/service-areas/la-county/burbank/': 'Burbank',
  '/service-areas/la-county/woodland-hills/': 'Woodland Hills',
  '/service-areas/la-county/torrance/': 'Torrance',
  '/service-areas/la-county/long-beach/': 'Long Beach',
  '/service-areas/la-county/vernon/': 'Vernon',
  '/service-areas/orange-county/anaheim/': 'Anaheim',
  '/service-areas/orange-county/santa-ana/': 'Santa Ana',
  '/service-areas/orange-county/huntington-beach/': 'Huntington Beach',
  '/service-areas/orange-county/irvine/': 'Irvine',
  '/service-areas/orange-county/newport-beach/': 'Newport Beach',
  '/projects/': 'Projects',
  '/reviews/': 'Reviews',
  '/about-us/': 'Specialists',
  '/careers/': 'Careers',
  '/contact-us/': 'Contact',
  '/blog/': 'Tips',
};

// City pages added with their copy (data/locationPages.js): the result line is the page's `outcome`, the underlined word is the city's name
for (const l of LOCATIONS) {
  const path = cityPath(l.slug);
  const outcome = LOCATION_PAGES[l.slug]?.outcome;
  if (outcome && !HERO_OUTCOMES[path]) HERO_OUTCOMES[path] = outcome;
  if (!HERO_UNDERLINES[path]) HERO_UNDERLINES[path] = l.city;
}

export const heroUnderline = (path) => HERO_UNDERLINES[path];

export const heroOutcome = (path) => HERO_OUTCOMES[path];
