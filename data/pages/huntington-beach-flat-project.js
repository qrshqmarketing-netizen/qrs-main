// Project page: a single-story home in Huntington Beach 92649 whose large flat roof, wrapped around a clay tile hip roof in the middle, was torn
// off and replaced with a white 3-ply roof (from the owner's drone photos, November 17 2026, sent over WhatsApp, so they carry no date or location).
// The story comes from the owner's write-up of the job chat (November 18 2026): an active leak, two soft spots, a single-layer old roof, flat roof
// only (the tile section stayed), 32 squares measured on site, Polyglass Elastoflex SA V self-adhered base sheet + a smooth middle layer + a
// torch-applied white cap sheet, 2 deck areas replaced, the new sheathing inspected November 9, the final booked November 18, up to 5 roofers,
// November 6-13, tarped for the weekend, the inspector checking the cap sheet's packaging, debris hauled and leftover material returned.
// Photos: 4 of the 21 tear-off photos (owner: few "before" photos), then all 10 finished ones, led by the straight-down shot (owner's pick,
// "16.09.16 (6)", file 14) and then the angled views. The in-progress photos (base sheet, smooth layer, new wood) weren't in the export; add them
// when the owner sends them. Photos in public/images/projects/flat-roof-replacement-huntington-beach-92649/ (WebP; tear-off photos 1600px, the
// rest 1800px). No plate or house number is readable. The map pin is the center of the ZIP code.
import { mediaUrl } from '@/lib/media';

const DIR = 'projects/flat-roof-replacement-huntington-beach-92649/flat-huntington-beach-92649-';
const photo = (n, alt) => ({ src: mediaUrl(`${DIR}${String(n).padStart(2, '0')}.webp`), alt });

export const HUNTINGTON_BEACH_FLAT_PROJECT = {
  path: '/projects/flat-roof-replacement-huntington-beach-92649/',
  keyword: 'white flat roof replacement',
  title: 'White Flat Roof Replacement Around a Clay Tile Roof, Huntington Beach 92649',
  metaTitle: 'White Flat Roof Replacement, Huntington Beach 92649',
  description:
    'White flat roof replacement in Huntington Beach 92649: an active leak, two damaged deck areas replaced, the new deck inspected and a 3-ply Polyglass roof.',
  image: mediaUrl(`${DIR}14.webp`), // the finished roof straight down, the owner's pick for the lead photo (photo 5 in `photos`)
  imageAlt: 'Straight-down aerial view of a home in Huntington Beach with a new white flat roof around a clay tile hip roof in the middle',
  // Short name for the "Recent projects" links on the pages this project is listed under (`related`)
  label: 'White flat roof replacement, Huntington Beach 92649',
  related: [
    '/residential-roofing/flat-roofing/replacement/',
    '/residential-roofing/flat-roofing/torch-down/',
    '/residential-roofing/flat-roofing/',
    '/service-areas/orange-county/huntington-beach/',
  ], // shown as "Related services" here, and this project is linked back from them
  // An H2 above the paragraph at each position below (they describe the paragraphs, nothing is added to the story)
  headings: {
    1: 'Two soft spots and one layer to tear off',
    2: 'Inspected before anything covered it',
    3: 'Three plies, one layer at a time',
    4: 'Measured on site, checked at the final',
    5: 'Flat roofing in Huntington Beach',
  },
  // The photo after each chapter (index in `photos`)
  chapterPhotos: { 1: 1, 2: 2, 3: 6, 4: 9 },
  // The wipe: the straight-down tear-off photo (4) gives way to the straight-down finished roof shot from the same side (5)
  reveal: { before: 3, after: 4 },
  place: 'Huntington Beach, CA 92649',
  // Map pin on /projects/: the center of the ZIP code, not the home's address, so the client's address stays private
  geo: [33.7275, -118.0441],
  // Photo slider and gallery: the tear-off first, then the finished roof, straight down first, then the angled views
  photos: [
    photo(1, 'The old flat roof torn off around the clay tile hip roof, with a ladder at the front and the crew working below'),
    photo(2, 'The side of the roof by the palms, where the tear-off reached the deck at the edge'),
    photo(3, 'The back edge above the patio, where water had damaged the deck'),
    photo(4, 'Straight down on the torn-off roof, with the clay tile hip roof in the middle, before the new roof went on'),
    photo(14, 'The finished roof straight down: white cap sheet on every flat section around the clay tile hip roof'),
    photo(5, 'The finished roof at an angle: the new white cap sheet laid in rows around the clay tile hip roof'),
    photo(6, 'The new white flat roof from the front corner, with the cap sheet run out to every edge'),
    photo(7, 'The front of the new flat roof, with the laps running in even rows out to the edge'),
    photo(8, 'Looking across the finished roof from the side, with the tile hip roof in the middle'),
    photo(9, 'The new cap sheet finished up against the base of the tile hip roof'),
    photo(10, 'The new roof from the back corner, white all the way around the tile roof'),
    photo(11, 'Straight down on the finished roof, with the clay tile hip roof in the center'),
    photo(12, 'The front of the home with the new white flat roof along the street side'),
    photo(13, 'The whole roof from above: white cap sheet on every flat section around the tile roof'),
  ],
  paragraphs: [
    'This white flat roof replacement in Huntington Beach 92649 started with an active leak inside the home. The house is single-story, with a large flat roof wrapped around a clay tile hip roof in the middle. The job was the flat roof only: the clay tile section stayed in place. Before any work started, the leak and a soft spot were marked on a photo, so the crew knew exactly where to look.',
    'There were two soft spots in the roof deck, a sign that water had gotten below the surface. The old flat roof was a single layer, so on the first day, November 6, our roofers tore it off cleanly down to the deck, replaced the two damaged areas of decking with new wood and tarped the roof for the weekend so the house stayed dry.',
    'On November 9 the city inspected the new sheathing and approved it before any membrane went down. A new roof is only as solid as the deck under it, and this way the inspector saw the new wood itself, not just the finished roof over it.',
    'On November 10 the crew set out to make the roof watertight by the end of the day and installed the base sheet, Polyglass Elastoflex SA V, which is self-adhered. On November 11 the base sheet was finished, the smooth middle layer went on and the torch work began on the white cap sheet. Our project manager asked for photos of the smooth layer before it was covered, so even the layers hidden under the finished roof are on record, and the progress photos were shared at every stage over the five working days. Up to five roofers were on site on the busiest day.',
    'The crew measured the roof section by section on site rather than relying on the estimate: 32 squares, or 3,164 square feet. Roofing finished on November 12 and 13, the final inspection was booked for November 18, and the inspector asked to see the cap sheet’s original packaging to confirm the white roof meets code. The debris was hauled away the day after the roof was done, and the leftover material went back to the supplier. Our [flat roof replacement](/residential-roofing/flat-roofing/replacement/) and [torch down roofing](/residential-roofing/flat-roofing/torch-down/) pages explain how we build these roofs.',
    'Have a leaking flat roof in [Huntington Beach](/service-areas/orange-county/huntington-beach/) or elsewhere in [Orange County](/service-areas/orange-county/)? Our roofers handle [flat roof replacement](/residential-roofing/flat-roofing/replacement/) and [flat roof repair](/residential-roofing/flat-roofing/repair/), and every job starts with a free roof evaluation and a written scope and price before any work. [Contact us](/contact-us/) to book yours.',
  ],
};
