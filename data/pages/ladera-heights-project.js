// Project page: a two-story home in Ladera Heights 90056 re-roofed in light gray architectural shingles, with a white membrane cricket behind
// the chimney and every vent and pipe flashed (from the owner's drone photos, November 17 2026; all show the finished roof). The owner filed it
// under the Vernon office, so it is related to the Vernon city page. Some photos show the walls in house wrap: other work on the house, which
// the page doesn't describe. 17 of the 20 photos are used (three near-repeats of the house-wrap close-ups left out). No house number or plate
// is readable. Photos in public/images/projects/shingle-roof-replacement-ladera-heights-90056/ (WebP, 1500-1800px long side). The map pin is
// the center of the ZIP code. No brand was named, so the page names none.
import { mediaUrl } from '@/lib/media';

const DIR = 'projects/shingle-roof-replacement-ladera-heights-90056/shingle-ladera-heights-90056-';
const photo = (n, alt) => ({ src: mediaUrl(`${DIR}${String(n).padStart(2, '0')}.webp`), alt });

export const LADERA_HEIGHTS_PROJECT = {
  path: '/projects/shingle-roof-replacement-ladera-heights-90056/',
  keyword: 'shingle roof replacement in Ladera Heights',
  title: 'Shingle Roof Replacement in Ladera Heights 90056',
  metaTitle: 'Shingle Roof Replacement in Ladera Heights 90056',
  description:
    'Shingle roof replacement in Ladera Heights 90056: a two-story home re-roofed in light gray architectural shingles, with a white cricket behind the chimney and every vent flashed.',
  image: mediaUrl(`${DIR}01.webp`), // the house from above the back yard, with the chimney and its white cricket; also the first photo in `photos`
  imageAlt: 'Aerial view of a two-story home in Ladera Heights with a new light gray architectural shingle roof and a white cricket behind the chimney',
  // Short name for the "Recent projects" links on the pages this project is listed under (`related`)
  label: 'Shingle roof replacement, Ladera Heights 90056',
  related: [
    '/residential-roofing/shingle-roofing/replacement/',
    '/residential-roofing/shingle-roofing/',
    '/residential-roofing/attic-ventilation/',
    '/service-areas/la-county/vernon/',
  ], // shown as "Related services" here, and this project is linked back from them
  // An H2 above the paragraph at each position below (they describe the paragraphs, nothing is added to the story)
  headings: {
    1: 'New shingles on every roof',
    2: 'A cricket behind the chimney',
    3: 'Walls, vents and pipes',
    4: 'Roofing in Ladera Heights',
  },
  // The photo after each chapter (index in `photos`)
  chapterPhotos: { 1: 4, 2: 9, 3: 15, 4: 2 },
  place: 'Ladera Heights, CA 90056',
  // Map pin on /projects/: the center of the ZIP code, not the home's address, so the client's address stays private
  geo: [33.9886, -118.3647],
  // Photo slider and gallery, in the order shown
  photos: [
    photo(1, 'Aerial view of a two-story home in Ladera Heights with a new light gray architectural shingle roof and a white cricket behind the chimney'),
    photo(2, 'Straight-down view of the property: the main roof with its hips and valleys, the chimney and the detached garage in the same shingles'),
    photo(3, 'Straight-down view from the other side, with the garage roof, the main roof and the cricket behind the chimney'),
    photo(4, 'Capped hips and ridges meeting over the main roof, with box vents and vent pipes on each slope'),
    photo(5, 'The front slope with a capped hip, a box vent and a flashed vent pipe'),
    photo(6, 'Vent caps, a box vent and a plumbing vent on the new shingles, each on its own flashing'),
    photo(7, 'A row of plumbing vents down the side slope, each set on its own flashing, beside a capped hip'),
    photo(8, 'The chimney with the white cricket behind it, shaped to split the water around both sides'),
    photo(9, 'The white cricket from the side, with a seam along its peak and the new shingles lapped onto it'),
    photo(10, 'The cricket and the chimney from above, with the shingles carried cleanly up to its edges'),
    photo(11, 'The new shingles on a lower roof running up to the wall, with flashing where the roof meets it'),
    photo(12, 'A lower roof meeting the second-story wall, with the flashing carried along the wall line'),
    photo(13, 'Two roof planes meeting in a valley below the second story, the shingles cut cleanly along it'),
    photo(14, 'A lower roof over the front window, in the same light gray shingles as the main roof'),
    photo(15, 'A small gable roof over the side of the house, with its ridge capped and its vent flashed'),
    photo(16, 'A low roof along the side wall, with flashing where the shingles meet the stucco and a flashed vent'),
    photo(17, 'The low side roof from above, laid in even courses to the gutter'),
  ],
  paragraphs: [
    'This shingle roof replacement in Ladera Heights 90056 covered a two-story home with several lower roofs around it and a detached garage. Our roofers re-roofed all of them in new light gray architectural shingles, so every roof on the property matches.',
    'The main roof is a hip roof with valleys where the wings meet it. Every slope is laid in even courses from the eave up, and the hips and ridges are capped in matching shingles. The garage got the same shingles and the same capped hips.',
    'The chimney sits on the slope with roof above it, so water running down the roof hits its back side. Behind it there is now a cricket: a small peaked section, covered in a white membrane, that splits the water and sends it around both sides of the chimney instead of letting it pool there.',
    'Several of the lower roofs end against the walls of the second story, and each one has flashing where the shingles meet the wall. The box vents, vent caps and plumbing vents each sit on their own flashing, set into the shingle courses. Read more about [attic ventilation](/residential-roofing/attic-ventilation/).',
    'Own a home in Ladera Heights or nearby in Los Angeles? Our roofers handle [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/) and [shingle roof repair](/residential-roofing/shingle-roofing/repair/) from our [Vernon office](/service-areas/la-county/vernon/) and across Los Angeles County. Homeowners can request a [free roof evaluation](/contact-us/) to start.',
  ],
};
