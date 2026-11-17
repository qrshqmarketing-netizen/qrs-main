// Project page: a single-family home in Encino re-roofed in architectural shingles, with white cap-sheet flat roofs on the rear additions and the
// patio cover, and rows of flashed mounting points ready for the home's solar array to go back up (from the owner's drone photos, November 17
// 2026, titled "Encino / Balboa"; all show the finished roof). "Balboa" is read as the street and left off the page; no ZIP was given, so the
// address has none and the map pin is Encino's center (add the ZIP to the path, `place` and `geo` if the owner sends it, with a redirect).
// 15 of the 19 photos are used (near-duplicates left out); a pickup's plates and a neighbor's house number are blurred in photos 01 and 06.
// Photos in public/images/projects/shingle-flat-roof-replacement-encino/ (WebP, 1500-1800px long side). No brand was named, so the page names none.
// The page doesn't say who takes the solar panels down or puts them back (to confirm with the owner, as on the Pico Rivera page).
import { mediaUrl } from '@/lib/media';

const DIR = 'projects/shingle-flat-roof-replacement-encino/shingle-flat-encino-';
const photo = (n, alt) => ({ src: mediaUrl(`${DIR}${String(n).padStart(2, '0')}.webp`), alt });

export const ENCINO_PROJECT = {
  path: '/projects/shingle-flat-roof-replacement-encino/',
  keyword: 'roof replacement in Encino',
  title: 'Shingle & Flat Roof Replacement in Encino, Ready for Solar',
  metaTitle: 'Shingle & Flat Roof Replacement in Encino',
  description:
    'Roof replacement in Encino: a single-family home re-roofed in architectural shingles, white cap-sheet flat roofs on the additions and patio cover, and flashed solar mounts.',
  image: mediaUrl(`${DIR}01.webp`), // the house from above the front yard, with the flat roofs behind it; also the first photo in `photos`
  imageAlt: 'Aerial view of a single-family home in Encino with a new architectural shingle roof and white flat roofs on the additions behind it',
  // Short name for the "Recent projects" links on the pages this project is listed under (`related`)
  label: 'Shingle and flat roof, Encino',
  related: [
    '/residential-roofing/shingle-roofing/replacement/',
    '/residential-roofing/flat-roofing/replacement/',
    '/residential-roofing/shingle-roofing/',
    '/service-areas/la-county/woodland-hills/',
  ], // shown as "Related services" here, and this project is linked back from them
  // An H2 above the paragraph at each position below (they describe the paragraphs, nothing is added to the story)
  headings: {
    1: 'New shingles on the main house',
    2: 'Mounting points for the solar array',
    3: 'White flat roofs on the additions',
    4: 'Roofing in Encino and the San Fernando Valley',
  },
  // The photo after each chapter (index in `photos`)
  chapterPhotos: { 1: 7, 2: 10, 3: 13, 4: 1 },
  place: 'Encino, CA',
  // Map pin on /projects/: the center of Encino, not the home's address, so the client's address stays private
  geo: [34.1592, -118.5019],
  // Photo slider and gallery, in the order shown
  photos: [
    photo(1, 'Aerial view of a single-family home in Encino with a new architectural shingle roof and white flat roofs on the additions behind it'),
    photo(2, 'The home from above the back yard: the shingle roof on the main house, the white flat roof on the rear addition and the patio cover'),
    photo(3, 'The finished roof from the side, with the hips of the main house, the rows of solar mounts and the two white flat roofs'),
    photo(4, 'Straight-down view of the property, with the hip-and-valley shingle roof at the front and the white flat roofs behind'),
    photo(5, 'Straight-down view of the back of the house: the solar mounts on the rear slope between the two white flat roofs'),
    photo(6, 'The rear addition and patio cover from above, their white cap sheets laid in long rows with sealed laps'),
    photo(7, 'The front porch roof and a valley in new shingles, with a box vent and the gutter along the eave'),
    photo(8, 'Close view of the capped hips meeting the ridge, with a flashed vent pipe and a box vent'),
    photo(9, 'A plumbing vent and a box vent set into the new shingles, each on its own flashing, beside a capped hip'),
    photo(10, 'The rear slope with rows of solar mounting points, each on its own flashing in the shingle courses'),
    photo(11, 'Straight-down view of the solar mounts in even rows across the slope, with a vent between them'),
    photo(12, 'The white cap-sheet flat roof on the rear addition, with a flashed duct and sealed laps between the rows'),
    photo(13, 'The flat roof of the addition with the duct and two plumbing pipes, each sealed where it comes through'),
    photo(14, 'The white flat roof over the patio, laid in rows to the edge'),
    photo(15, 'Where the white flat roof meets the new shingles, with solar mounts on the slope beside it'),
  ],
  paragraphs: [
    'This roof replacement in Encino covered every roof on a single-family home: new architectural shingles on the main house and white cap-sheet flat roofs on the rear addition and the patio cover. The rear slope also got rows of new mounting points for the home’s solar array, each flashed into the shingles.',
    'The main house has a hip-and-valley roof with a small front porch roof. Every slope is laid in even courses from the eave up, the hips and the ridge are capped in matching shingles, and the box vents and plumbing vents each sit on their own flashing.',
    'A solar array is held up by bolts that go through the roof, so every one of them is a place a leak can start. On this roof the mounting points were set in rows and flashed into the shingle courses as the roof went on, so the panels can go back up on a roof that is ready for them. Our [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/) page explains how we build a roof from the deck up.',
    'Behind the house, the addition and the patio cover are nearly flat, which is no place for shingles. Both got a white cap sheet laid in long rows with sealed laps, and the duct and the plumbing pipes on the addition are sealed where they come through. Read more about [flat roof replacement](/residential-roofing/flat-roofing/replacement/).',
    'Own a home in Encino, Sherman Oaks, Tarzana or elsewhere in the San Fernando Valley? Our roofers work from our office in [Woodland Hills](/service-areas/la-county/woodland-hills/), with [shingle roofing](/residential-roofing/shingle-roofing/) and flat roofing for homes across the Valley. Homeowners can request a [free roof evaluation](/contact-us/) to start.',
  ],
};
