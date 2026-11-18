// Project page: a single-story home in Huntington Beach 92649 whose large flat roof, wrapped around a clay tile hip roof in the middle, was torn
// off and replaced with a white cap sheet (from the owner's drone photos, November 17 2026, sent over WhatsApp, so they carry no date or location).
// The owner asked for few "before" photos and as many "after" photos as possible: 4 of the 21 tear-off photos are used (an overview, the two
// rotted edges, the straight-down view used for the before-and-after wipe), then all 10 photos of the finished roof, in the order they were sent.
// Photos in public/images/projects/flat-roof-replacement-huntington-beach-92649/ (WebP; tear-off photos 1600px, the rest 1800px). No plate or
// house number is readable. The map pin is the center of the ZIP code. The material rolls on the finished roof are too small to read, so no brand.
// The rebuilt deck is inferred from the photos (rotted through at the edges in the tear-off, a finished roof over it after): owner to confirm.
import { mediaUrl } from '@/lib/media';

const DIR = 'projects/flat-roof-replacement-huntington-beach-92649/flat-huntington-beach-92649-';
const photo = (n, alt) => ({ src: mediaUrl(`${DIR}${String(n).padStart(2, '0')}.webp`), alt });

export const HUNTINGTON_BEACH_FLAT_PROJECT = {
  path: '/projects/flat-roof-replacement-huntington-beach-92649/',
  keyword: 'flat roof replacement in Huntington Beach',
  title: 'Flat Roof Replacement in Huntington Beach 92649',
  metaTitle: 'Flat Roof Replacement in Huntington Beach 92649',
  description:
    'Flat roof replacement in Huntington Beach 92649: the old flat roof around a clay tile hip roof torn off to the deck, the rotted edges rebuilt and a new white cap sheet installed.',
  image: mediaUrl(`${DIR}05.webp`), // the finished white roof at an angle around the tile hip roof (photo 5 in `photos`)
  imageAlt: 'Aerial view of a home in Huntington Beach with a new white flat roof around a clay tile hip roof in the middle',
  // Short name for the "Recent projects" links on the pages this project is listed under (`related`)
  label: 'Flat roof replacement, Huntington Beach 92649',
  related: [
    '/residential-roofing/flat-roofing/replacement/',
    '/residential-roofing/flat-roofing/',
    '/service-areas/orange-county/huntington-beach/',
  ], // shown as "Related services" here, and this project is linked back from them
  // An H2 above the paragraph at each position below (they describe the paragraphs, nothing is added to the story)
  headings: {
    1: 'What the tear-off uncovered',
    2: 'Rotted deck rebuilt first',
    3: 'A white cap sheet on every flat section',
    4: 'Flat roofing in Huntington Beach',
  },
  // The photo after each chapter (index in `photos`)
  chapterPhotos: { 1: 2, 2: 1, 3: 7 },
  // The wipe: the straight-down tear-off photo (4) gives way to the straight-down finished roof shot from the same side (14)
  reveal: { before: 3, after: 13 },
  place: 'Huntington Beach, CA 92649',
  // Map pin on /projects/: the center of the ZIP code, not the home's address, so the client's address stays private
  geo: [33.7275, -118.0441],
  // Photo slider and gallery: the tear-off first, then the finished roof
  photos: [
    photo(1, 'The old flat roof torn off around the clay tile hip roof, with a ladder at the front and the crew working below'),
    photo(2, 'The side of the roof by the palms, where the tear-off uncovered rotted deck boards at the edge'),
    photo(3, 'The back edge above the patio, where water had rotted the deck through to the rafters'),
    photo(4, 'Straight down on the torn-off roof, with the clay tile hip roof in the middle, before the new roof went on'),
    photo(5, 'The finished roof: a new white cap sheet across the whole flat roof, laid in rows around the clay tile hip roof'),
    photo(6, 'The new white flat roof from the front corner, with the cap sheet run out to every edge'),
    photo(7, 'The front of the new flat roof, with the laps running in even rows out to the edge'),
    photo(8, 'Looking across the finished roof from the side, with the tile hip roof in the middle'),
    photo(9, 'The new cap sheet finished up against the base of the tile hip roof'),
    photo(10, 'The new roof from the back corner, white all the way around the tile roof'),
    photo(11, 'Straight down on the finished roof, with the clay tile hip roof in the center'),
    photo(12, 'The front of the home with the new white flat roof along the street side'),
    photo(13, 'The whole roof from above: white cap sheet on every flat section around the tile roof'),
    photo(14, 'The finished roof straight down, from the same side as the tear-off photo'),
  ],
  paragraphs: [
    'This flat roof replacement in Huntington Beach 92649 replaced the large flat roof that wraps around a clay tile hip roof on a single-story home. Our roofers tore the old flat roof off down to the deck, rebuilt the rotted decking the tear-off uncovered, and installed a new white cap sheet across every flat section.',
    'Taking the old roof off showed how far the water had gone. Along the back edge above the patio and down the side by the palms, the deck had rotted through to the rafters, damage that stayed hidden under the old roof until it came off.',
    'Those sections were rebuilt before anything new went on, because a new roof is only as solid as the deck under it. A full tear-off is the only way to find damage like this; a new layer over the old roof would have covered it up.',
    'The new white cap sheet went on in long rows, each lap overlapping the one before it, out to every edge of the roof and up against the base of the tile hip roof where the two roofs meet. From above, the finished roof reads as one clean white surface around the tile. Our [flat roof replacement](/residential-roofing/flat-roofing/replacement/) page explains how we build these roofs.',
    'Have a flat roof in [Huntington Beach](/service-areas/orange-county/huntington-beach/) or elsewhere in [Orange County](/service-areas/orange-county/)? Our roofers handle [flat roof replacement](/residential-roofing/flat-roofing/replacement/) and [flat roof repair](/residential-roofing/flat-roofing/repair/), and every job starts with a free roof evaluation and a written scope and price before any work. [Contact us](/contact-us/) to book yours.',
  ],
};
