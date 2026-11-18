// Project page: a hillside home in East Los Angeles 90063 re-roofed in charcoal architectural shingles (from the owner's drone photos, sent
// November 18 2026 as a San Dimas job; the GPS of DJI_0620-0648, flown September 22 2026, puts it in the City Terrace area of East Los Angeles,
// ZIP 90063, so it has its own page, the owner's choice). 22 photos in the order taken: the 17 the owner pasted plus five from the end of the
// same flight (two straight-down overviews and three close-ups); DJI_0631, a tile roof from another job, is left out. The real estate sign
// across the street is blurred in photo 1; no house number or plate is readable. The flat roof over the back of the house is only described as
// what the shingles meet (the owner didn't say it was part of the job), and the corrugated awning and copper bay roof are not described.
// No brand was named, so the page names none. Filed under the Vernon office, the closest. The map pin is the center of the ZIP code.
import { mediaUrl } from '@/lib/media';

const DIR = 'projects/shingle-roof-replacement-east-los-angeles-90063/shingle-east-los-angeles-90063-';
const photo = (n, alt) => ({ src: mediaUrl(`${DIR}${String(n).padStart(2, '0')}.webp`), alt });

export const EAST_LOS_ANGELES_PROJECT = {
  path: '/projects/shingle-roof-replacement-east-los-angeles-90063/',
  keyword: 'shingle roof replacement in East Los Angeles',
  title: 'Shingle Roof Replacement in East Los Angeles 90063',
  metaTitle: 'Shingle Roof Replacement in East Los Angeles 90063',
  description:
    'Shingle roof replacement in East Los Angeles 90063: a hillside home with a many-hipped roof re-roofed in charcoal architectural shingles, its porch roof and vents flashed.',
  image: mediaUrl(`${DIR}01.webp`), // the whole roof from above the back, with the flat roof beside it and the street; also the first photo
  imageAlt: 'Aerial view of a hillside home in East Los Angeles with a new charcoal architectural shingle roof of many hips',
  // Short name for the "Recent projects" links on the pages this project is listed under (`related`)
  label: 'Shingle roof replacement, East Los Angeles 90063',
  related: [
    '/residential-roofing/shingle-roofing/replacement/',
    '/residential-roofing/shingle-roofing/',
    '/residential-roofing/attic-ventilation/',
    '/service-areas/la-county/vernon/',
  ], // shown as "Related services" here, and this project is linked back from them
  // An H2 above the paragraph at each position below (they describe the paragraphs, nothing is added to the story)
  headings: {
    1: 'A roof of many hips',
    2: 'The low spot between the hips',
    3: 'Vents, pipes and the porch roof',
    4: 'Roofing in East Los Angeles',
  },
  // The photo after each chapter (index in `photos`)
  chapterPhotos: { 1: 11, 2: 13, 3: 6 },
  place: 'East Los Angeles, CA 90063',
  // Map pin on /projects/: the center of the ZIP code, not the home's address, so the client's address stays private
  geo: [34.0445, -118.1858],
  // Photo slider and gallery, in the order taken
  photos: [
    photo(1, 'Aerial view of a hillside home in East Los Angeles with a new charcoal architectural shingle roof of many hips'),
    photo(2, 'The roof from above the back yard, the shingled hips beside the flat roof over the back of the house'),
    photo(3, 'The side of the house, with the new shingles running down to the eave above the windows'),
    photo(4, 'The back corner, where the shingle roof meets the flat roof with its skylight'),
    photo(5, 'The front of the house above the stairs, with capped hips over the bay window'),
    photo(6, 'A small hip roof over the front entry, flashed where it meets the wall of the house'),
    photo(7, 'The entry roof straight down, its hips capped and its edges laid out to the eave'),
    photo(8, 'The main roof from above the front of the house, with its hips, valleys and vents'),
    photo(9, 'The flat roof over the back of the house, with its skylight beside the new shingles'),
    photo(10, 'The skylight on the flat roof, sealed around its base'),
    photo(11, 'Where the shingle roof meets the flat roof, with two vent pipes sealed on the flat side'),
    photo(12, 'Hips and a valley on the back of the roof, the shingles cut cleanly along each line'),
    photo(13, 'Capped hips meeting around the low pocket between them, with flashed vent pipes beside it'),
    photo(14, 'The low pocket between the hips, covered in a granulated sheet instead of shingles'),
    photo(15, 'Vent caps on their own flashings beside the low pocket'),
    photo(16, 'Hips and a valley meeting over the middle of the roof'),
    photo(17, 'A dome vent and a box vent among the capped hips'),
    photo(18, 'A capped hip running down past the dome vent'),
    photo(19, 'Vent pipes and a box vent set into the shingle courses on a capped hip'),
    photo(20, 'A side slope with a box vent and two flashed pipes'),
    photo(21, 'Straight-down view of the whole roof from above the street, beside the flat roof at the back'),
    photo(22, 'Straight-down view from the other side, with the flat roof, the hips and the street'),
  ],
  paragraphs: [
    'This shingle roof replacement in East Los Angeles 90063 covered a hillside home whose roof is a cluster of hips, with a flat roof over the back of the house. Our roofers re-roofed every sloped section in new charcoal architectural shingles, from the main roof down to the small roof over the front entry.',
    'A roof with this many hips and valleys has a lot of lines for water to follow. Every slope is laid in even courses from the eave up, the hips are capped in matching shingles, and the shingles are cut cleanly along each valley where two slopes meet.',
    'In the middle of the roof, several hips come together around a shallow pocket that is too flat for shingles to shed water. That spot is covered in a granulated roofing sheet instead, lapped under the shingles around it. Where the shingles end at the back, they meet the flat roof over the rear of the house, with its skylight and two vent pipes.',
    'The dome vent, box vents and plumbing pipes each sit on their own flashing, set into the shingle courses. Over the front door, the small entry roof is flashed where it meets the wall of the house, so water runs off its edges instead of behind it. Read more about [attic ventilation](/residential-roofing/attic-ventilation/).',
    'Own a home in East Los Angeles or nearby? Our roofers handle [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/) and [shingle roof repair](/residential-roofing/shingle-roofing/repair/) from our [Vernon office](/service-areas/la-county/vernon/) and across [Los Angeles County](/service-areas/la-county/). Homeowners can request a [free roof evaluation](/contact-us/) to start.',
  ],
};
