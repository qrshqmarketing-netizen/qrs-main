// Project page: a single-story home in north San Bernardino re-roofed in brown-blend architectural shingles, with metal valleys, a flashed
// chimney and a rooftop package air conditioner set back on its curb (from the owner's drone photos, November 17 2026, sent as "Northern San
// Bernardino", ZIP 92346 sent afterwards; all show the finished roof). 18 of the 20 photos are used: one was an exact copy of a photo from the Encino project and one a
// duplicate. The house number is blurred in photos 01, 06 and 07. The first address without the ZIP
// (/projects/shingle-roof-replacement-north-san-bernardino/) redirects here. 92346's postal city is Highland; the owner calls the place north San
// Bernardino, so the page does too. The white flat roof along the
// back shows in some photos; the owner didn't say it was part of the job, so the page only says the shingles finish against it.
// Photos in public/images/projects/shingle-roof-replacement-san-bernardino-92346/ (WebP, 1500-1800px long side). No brand was named.
import { mediaUrl } from '@/lib/media';

const DIR = 'projects/shingle-roof-replacement-san-bernardino-92346/shingle-san-bernardino-';
const photo = (n, alt) => ({ src: mediaUrl(`${DIR}${String(n).padStart(2, '0')}.webp`), alt });

export const SAN_BERNARDINO_PROJECT = {
  path: '/projects/shingle-roof-replacement-san-bernardino-92346/',
  keyword: 'shingle roof replacement in San Bernardino',
  title: 'Shingle Roof Replacement in North San Bernardino 92346',
  metaTitle: 'Shingle Roof Replacement in San Bernardino 92346',
  description:
    'Shingle roof replacement in north San Bernardino 92346: a single-story home re-roofed in brown architectural shingles, with metal valleys, chimney flashing and the rooftop AC unit flashed in.',
  image: mediaUrl(`${DIR}01.webp`), // the front of the house from above the lawn; also the first photo in `photos`
  imageAlt: 'Aerial view of a single-story home in north San Bernardino with a new brown architectural shingle roof, a brick chimney and a rooftop AC unit',
  // Short name for the "Recent projects" links on the pages this project is listed under (`related`)
  label: 'Shingle roof replacement, San Bernardino 92346',
  related: [
    '/residential-roofing/shingle-roofing/replacement/',
    '/residential-roofing/shingle-roofing/',
    '/residential-roofing/attic-ventilation/',
    '/service-areas/san-bernardino-county/',
  ], // shown as "Related services" here, and this project is linked back from them
  // An H2 above the paragraph at each position below (they describe the paragraphs, nothing is added to the story)
  headings: {
    1: 'New shingles on a long ranch roof',
    2: 'Metal valleys and the chimney',
    3: 'The rooftop air conditioner and the vents',
    4: 'Roofing in San Bernardino County',
  },
  // The photo after each chapter (index in `photos`)
  chapterPhotos: { 1: 7, 2: 12, 3: 15, 4: 1 },
  place: 'San Bernardino, CA 92346',
  // Map pin on /projects/: the center of the ZIP code, not the home's address, so the client's address stays private
  geo: [34.1306, -117.2045],
  // Photo slider and gallery, in the order shown
  photos: [
    photo(1, 'Aerial view of a single-story home in north San Bernardino with a new brown architectural shingle roof, a brick chimney and a rooftop AC unit'),
    photo(2, 'Straight-down view of the whole roof: the long main roof, the front wing with its valleys, the chimney and the AC unit'),
    photo(3, 'Straight-down view from the other side, with the hips at each end, the vents in a row and the white flat roof along the back'),
    photo(4, 'The long roof over the garage from above the driveway, with the hip at the end and the vents along the ridge'),
    photo(5, 'The roof from the side yard, with the hips and capped ridges and the rooftop AC unit behind the chimney'),
    photo(6, 'The front of the house from above, with the new shingles running from the porch to the garage'),
    photo(7, 'The front wing and the main roof from above, with the metal valleys, the chimney and the vents'),
    photo(8, 'Close view of two capped hips meeting a valley, with a box vent on the slope'),
    photo(9, 'Capped hips coming together over the back of the house, with a box vent and the metal valley running beside them'),
    photo(10, 'The back corner of the roof with capped hips, a box vent and a flashed vent pipe'),
    photo(11, 'The metal valley running past the brick chimney, with the new shingles cut cleanly along it'),
    photo(12, 'The porch roof where the front wing meets the main roof, with a metal valley carried down to the eave'),
    photo(13, 'The brick chimney with new metal flashing at its base, beside the metal valley'),
    photo(14, 'The chimney from above, with its flashing set into the new shingles and the metal valleys on either side'),
    photo(15, 'The rooftop package air conditioner on its curb, with metal flashing around its base and a flashed vent beside it'),
    photo(16, 'The AC unit from the ridge side, with its curb flashed into the shingles and the capped ridge beside it'),
    photo(17, 'Vent pipes and a vent cap set into the new shingles below a capped ridge'),
    photo(18, 'The new shingles finishing cleanly against the white flat roof along the back of the house'),
  ],
  paragraphs: [
    'This shingle roof replacement in north San Bernardino 92346 covered a long single-story home with a front wing, a garage at one end and a hip at each end. Our roofers re-roofed it in new brown-blend architectural shingles, from the porch to the garage.',
    'The roof is one long ranch roof with a wing crossing it at the front. Every slope is laid in even courses from the eave up, and the ridge and all the hips are capped in matching shingles, so the roof reads as one piece from the street.',
    'Where two slopes meet, the water from both runs down one valley. Each valley here is lined with metal, and the shingles are cut cleanly along it. The brick chimney sits next to one of those valleys, and it has new metal flashing at its base, set into the new shingles.',
    'A rooftop air conditioner is one of the hardest things on a roof to keep dry, because it sits on a curb and has lines and drains running from it. Here the unit sits on its curb with metal flashing around its base, and the vents, vent caps and plumbing pipes each have their own flashing. Read more about [attic ventilation](/residential-roofing/attic-ventilation/).',
    'Own a home in San Bernardino or elsewhere in [San Bernardino County](/service-areas/san-bernardino-county/)? Our roofers handle [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/) and [shingle roof repair](/residential-roofing/shingle-roofing/repair/) across the Inland Empire. Homeowners can request a [free roof evaluation](/contact-us/) to start.',
  ],
};
