// Project page: single-family home in Garden Grove 92840 re-roofed in Owens Corning shingles with a Polyglass flat roof (from the owner's drone photos,
// November 13 2026; all show the finished roof). A separate job from the brown shingle roof in garden-grove-project.js (same ZIP, switched off).
// Photos in public/images/projects/single-family-shingle-flat-roof-garden-grove-92840/ (WebP, 1800px long side). The map pin is the center of the ZIP code.
import { mediaUrl } from '@/lib/media';

const DIR = 'projects/single-family-shingle-flat-roof-garden-grove-92840/single-family-garden-grove-92840-';
const photo = (n, alt) => ({ src: mediaUrl(`${DIR}${String(n).padStart(2, '0')}.webp`), alt });

export const GARDEN_GROVE_FLAT_PROJECT = {
  path: '/projects/single-family-shingle-flat-roof-garden-grove-92840/',
  keyword: 'shingle roof replacement in Garden Grove',
  title: 'Single-Family Shingle & Flat Roof Replacement in Garden Grove 92840',
  metaTitle: 'Shingle & Flat Roof Replacement in Garden Grove 92840',
  description:
    'Single-family roof replacement in Garden Grove 92840: new Owens Corning shingles on every pitched roof and a Polyglass flat roof where the roofs meet.',
  image: mediaUrl(`${DIR}09.webp`), // the whole house from above at an angle; also the first photo in `photos`
  imageAlt: 'Angled aerial view of a single-family home in Garden Grove with a new gray shingle roof, two skylights and white flat roof sections between the roof planes',
  // Short name for the "Recent projects" links on the pages this project is listed under (`related`)
  label: 'Shingle and flat roof, Garden Grove 92840',
  related: [
    '/residential-roofing/shingle-roofing/replacement/',
    '/residential-roofing/flat-roofing/replacement/',
    '/residential-roofing/attic-ventilation/',
    '/service-areas/orange-county/',
  ], // shown as "Related services" here, and this project is linked back from them
  // An H2 above the paragraph at each position below (they describe the paragraphs, nothing is added to the story)
  headings: {
    1: 'New shingles on every pitched roof',
    2: 'A white flat roof where the roofs meet',
    3: 'Skylights, vents and pipes flashed',
    4: 'Roofing in Garden Grove and north Orange County',
  },
  // The photo after each chapter (index in `photos`)
  chapterPhotos: { 1: 6, 2: 10, 3: 8, 4: 3 },
  place: 'Garden Grove, CA 92840',
  // Map pin on /projects/: the center of the ZIP code, not the home's address, so the client's address stays private
  geo: [33.7803, -117.94],
  // Photo slider and gallery, in the order shown
  photos: [
    photo(9, 'Angled aerial view of a single-family home in Garden Grove with a new gray shingle roof, two skylights and white flat roof sections between the roof planes'),
    photo(12, 'Straight-on aerial view of the finished roof, with its skylights, box vents and pipe flashings spread evenly across the new shingles'),
    photo(1, 'Straight-down view of the whole property: the new shingle roof on the house, white flat sections between the roof planes and the rear building under its own new roof'),
    photo(2, 'The same roofs from the opposite side, with the house, the skylights and the rear building in new shingles and white membrane'),
    photo(10, 'The rear building from above, with new shingles on its hip roof and a white flat section on one side'),
    photo(11, 'The rear building and the house from a higher angle, with a white flat roof along one side of the hip roof'),
    photo(4, 'Close view of the new shingles meeting at a hip ridge, with a skylight and a white flat section behind them'),
    photo(7, 'A hip ridge capped in matching shingles beside a box vent, with a white flat roof section at the left'),
    photo(5, 'A white flat roof section between two pitched roofs, with a skylight, box vents and flashed pipes around it'),
    photo(6, 'A white flat section in the roof valley, with a box vent, a skylight and the new shingles on each side'),
    photo(3, 'Close view of the white flat roof with sealed laps, plumbing pipes on flashed bases, a skylight and box vents'),
    photo(8, 'The white flat roof on the rear building, in long rows with sealed laps and a flashed edge against the shingle roof'),
  ],
  paragraphs: [
    'This single-family roof replacement in Garden Grove 92840 gave a home with several roof planes one clean, consistent finish. Our roofers re-roofed the pitched roofs in new Owens Corning shingles and covered the flat sections, where the roofs meet and on the rear building, with a Polyglass flat roof.',
    'The home has a roof with many hips, ridges and valleys, and every one is finished in matching shingles. The courses run in even rows from the eave up, the ridge and hip caps are straight, and the rear building has the same new shingle roof as the house.',
    'Where two roof planes meet in a low spot, or where a roof is nearly flat, shingles are the wrong tool. Those sections got a white Polyglass flat roof in rows with sealed laps, carried up to the shingles and the walls, so water that collects there has a roof built for it. Our [flat roof replacement](/residential-roofing/flat-roofing/replacement/) page explains how we build these.',
    'The roof has two skylights, box vents and plumbing pipes. Each was flashed into the new roof, so the roof drains clear of all of them and the attic can still breathe. Read more about [attic ventilation](/residential-roofing/attic-ventilation/).',
    'Own a home in Garden Grove, Anaheim, Santa Ana or elsewhere in north Orange County? Our roofers handle [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/) and [flat roof replacement](/residential-roofing/flat-roofing/replacement/) across [Orange County](/service-areas/orange-county/). Homeowners can request a [free roof evaluation](/contact-us/) to start.',
  ],
};
