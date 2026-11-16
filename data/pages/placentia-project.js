// Project page: single-family home in Placentia 92870 re-roofed in new gray architectural shingles (from the owner's drone photos, November 16 2026;
// all show the finished roof: the whole roof from the air, then close-ups of a valley, a hip, the ridge, the vents and the chimney flashing).
// Photos in public/images/projects/shingle-roof-replacement-placentia-92870/ (WebP, 1500-1800px long side). The map pin is the center of the ZIP code.
// The owner named no shingle brand for this job, so the page doesn't either.
import { mediaUrl } from '@/lib/media';

const DIR = 'projects/shingle-roof-replacement-placentia-92870/shingle-placentia-92870-';
const photo = (n, alt) => ({ src: mediaUrl(`${DIR}${String(n).padStart(2, '0')}.webp`), alt });

export const PLACENTIA_PROJECT = {
  path: '/projects/shingle-roof-replacement-placentia-92870/',
  keyword: 'shingle roof replacement in Placentia',
  title: 'Residential Shingle Roof Replacement in Placentia 92870',
  metaTitle: 'Shingle Roof Replacement in Placentia 92870',
  description:
    'Residential shingle roof replacement in Placentia 92870: a single-family home re-roofed in gray architectural shingles with new valley metal, vents, pipe flashings and chimney flashing.',
  image: mediaUrl(`${DIR}01.webp`), // the whole roof from above at an angle, with the chimney and the patio cover; also the first photo in `photos`
  imageAlt: 'Angled aerial view of a single-family home in Placentia with a new gray architectural shingle roof, a brick chimney and a patio cover beside it',
  // Short name for the "Recent projects" links on the pages this project is listed under (`related`)
  label: 'Shingle roof replacement, Placentia 92870',
  related: [
    '/residential-roofing/shingle-roofing/replacement/',
    '/residential-roofing/shingle-roofing/',
    '/residential-roofing/attic-ventilation/',
    '/service-areas/orange-county/',
  ], // shown as "Related services" here, and this project is linked back from them
  // An H2 above the paragraph at each position below (they describe the paragraphs, nothing is added to the story)
  headings: {
    1: 'New shingles across every slope',
    2: 'Valleys, hips and ridges',
    3: 'Vents, pipes and the chimney, flashed',
    4: 'Roofing in Placentia and north Orange County',
  },
  // The photo after each chapter (index in `photos`)
  chapterPhotos: { 1: 6, 2: 10, 3: 13, 4: 4 },
  place: 'Placentia, CA 92870',
  // Map pin on /projects/: the center of the ZIP code, not the home's address, so the client's address stays private
  geo: [33.8808, -117.8553],
  // Photo slider and gallery, in the order shown
  photos: [
    photo(1, 'Angled aerial view of a single-family home in Placentia with a new gray architectural shingle roof, a brick chimney and a patio cover beside it'),
    photo(14, 'High aerial view of the finished roof: the long main ridge, the hip at the back, the valley at the front wing, box vents and flashed pipes on new gray shingles'),
    photo(3, 'The new shingle roof seen from the street side, with the front wing meeting the main roof at a valley and the pipe flashings in a row'),
    photo(4, 'The finished roof from above the driveway, with the pickup truck parked beside the house and the new shingles running cleanly to the eaves'),
    photo(5, 'The whole roof from a high angle, with the hip at the back, the valley at the front wing and the neighbor’s yard around it'),
    photo(15, 'The new roof from above the back yard, showing the main ridge, the hip at the rear and the chimney flashed into the new shingles'),
    photo(2, 'Straight-on aerial view from the back of the house: new shingles on the main roof and the rear wing, with the patio cover and the chimney in front'),
    photo(6, 'Straight-down view of the whole property: the L-shaped roof in new gray shingles, the box vents and pipe flashings, and the truck in the driveway'),
    photo(7, 'Straight-down view of the roof from the other side, with the valley, the hip ridge and the chimney at the eave'),
    photo(8, 'Straight-down view of the finished roof with the driveway, the front lawn and the patio cover at the back'),
    photo(10, 'Close view of a valley with new metal valley flashing between two slopes of gray shingles, and a pipe vent on a flashed base beside it'),
    photo(11, 'A valley from above, with the metal valley flashing running straight between the shingles and vents and pipe flashings on both sides'),
    photo(12, 'A box vent and a flashed pipe near the ridge, with the new ridge caps running along the top of the slope'),
    photo(9, 'Close view of a box vent and a pipe flashing set into the new shingles, each on its own metal base'),
    photo(13, 'The brick chimney with new metal flashing at its base, set into the new shingles on both sides'),
  ],
  paragraphs: [
    'This residential shingle roof replacement in Placentia 92870 gave a single-family home an L-shaped roof with a new, even finish from end to end. Our roofers tore off the old roof and installed new gray architectural shingles on every slope, with new valley metal, vents, pipe flashings and chimney flashing.',
    'The home’s roof has a long main ridge, a hip at the back and a front wing that meets the main roof in a valley. Every slope is finished in the same shingles, the courses run in straight lines from the eave up, and the ridges and hips are capped in matching shingles.',
    'The valleys are where two slopes send their water into one channel, so each one got new metal valley flashing before the shingles went on, and the shingles were cut cleanly to it. The hip and ridge caps are laid in line, so the roof reads as one piece from the air.',
    'The roof has box vents, several plumbing pipes and a brick chimney. Each vent and pipe sits on its own metal flashing, set into the shingle courses so water runs over it, and the chimney got new metal flashing at its base on both sides. Read more about [attic ventilation](/residential-roofing/attic-ventilation/) and how we flash around it.',
    'Own a home in Placentia, Fullerton, Brea, Yorba Linda or elsewhere in north Orange County? Our roofers handle [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/) and [shingle roof repair](/residential-roofing/shingle-roofing/repair/) across [Orange County](/service-areas/orange-county/). Homeowners can request a [free roof evaluation](/contact-us/) to start.',
  ],
};
