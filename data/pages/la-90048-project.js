// Project page: a single-story home in Los Angeles 90048 (the Beverly Grove area, by the drone's GPS) re-roofed in gray architectural shingles, a
// roof of many hips and valleys with a brick-trimmed chimney (from the owner's drone photos, November 19 2026; one flight on June 22 2026, all of the
// finished roof). 10 of the 12 photos in the order taken: two close-ups with the drone's shadow on the roof were left out (the chimney and a valley,
// both shown in other photos). The street sign at the corner is blurred in photo 12 and a car's plate in photo 1. The small white section in the
// low spot between hips is described as it is (a white roofing sheet where the slopes meet, as on the East Los Angeles job). No brand was named, so
// the page names none. Photos in public/images/projects/shingle-roof-replacement-los-angeles-90048/ (WebP, 1800px). The map pin is the center of
// the ZIP code.
import { mediaUrl } from '@/lib/media';

const DIR = 'projects/shingle-roof-replacement-los-angeles-90048/shingle-los-angeles-90048-';
const photo = (n, alt) => ({ src: mediaUrl(`${DIR}${String(n).padStart(2, '0')}.webp`), alt });

export const LA_90048_PROJECT = {
  path: '/projects/shingle-roof-replacement-los-angeles-90048/',
  keyword: 'shingle roof replacement in Los Angeles 90048',
  title: 'Shingle Roof Replacement in Los Angeles 90048',
  metaTitle: 'Shingle Roof Replacement in Los Angeles 90048',
  description:
    'Shingle roof replacement in Los Angeles 90048: a home with many hips and valleys re-roofed in gray architectural shingles, its chimney and vents flashed.',
  image: mediaUrl(`${DIR}01.webp`), // the home from above the side yard, the whole new roof and the white chimney in view; also the first photo
  imageAlt: 'Aerial view of a single-story home in Los Angeles 90048 with a new gray architectural shingle roof and a white brick-trimmed chimney',
  // Short name for the "Recent projects" links on the pages this project is listed under (`related`)
  label: 'Shingle roof replacement, Los Angeles 90048',
  related: [
    '/residential-roofing/shingle-roofing/replacement/',
    '/residential-roofing/shingle-roofing/',
    '/residential-roofing/attic-ventilation/',
    '/service-areas/la-county/los-angeles/',
  ], // shown as "Related services" here, and this project is linked back from them
  // An H2 above the paragraph at each position below (they describe the paragraphs, nothing is added to the story)
  headings: {
    1: 'A roof of many hips and valleys',
    2: 'Metal in every valley',
    3: 'The chimney and the vents',
    4: 'Roofing in Los Angeles',
  },
  // The photo after each chapter (index in `photos`)
  chapterPhotos: { 1: 1, 2: 3, 3: 2 },
  place: 'Los Angeles, CA 90048',
  // Map pin on /projects/: the center of the ZIP code, not the home's address, so the client's address stays private
  geo: [34.0732, -118.3727],
  // Photo slider and gallery, in the order taken (one flight, June 22 2026)
  photos: [
    photo(1, 'Aerial view of a single-story home in Los Angeles 90048 with a new gray architectural shingle roof and a white brick-trimmed chimney'),
    photo(2, 'Straight down on the long back slope: even shingle courses, a capped ridge, two roof vents and the chimney at the eave'),
    photo(4, 'The chimney up close, flashed where it meets the roof, with a small shingled cricket on its uphill side'),
    photo(6, 'A metal valley where two slopes meet, the shingles cut cleanly along it'),
    photo(7, 'Where several hips meet: open metal valleys, a white roofing sheet in the low spot and the vents on their flashings'),
    photo(8, 'Capped hips around the low spot between the slopes, with plumbing vents sealed on their flashings'),
    photo(9, 'A valley running into a capped hip, with a plumbing vent on its flashing beside it'),
    photo(10, 'The roof over the side of the house, a capped hip and a roof vent set into the shingle courses'),
    photo(11, 'The whole roof from above the street side, its hips, valleys and vents in view'),
    photo(12, 'The roof from above the front corner, the courtyard and the chimney beside the new shingles'),
  ],
  paragraphs: [
    'This shingle roof replacement in Los Angeles 90048 covered a single-story home in the Beverly Grove area whose roof is a cluster of hips, valleys and slopes facing every direction. Our roofers re-roofed all of it in new gray architectural shingles, so the whole house reads as one roof from the street and from above.',
    'Every slope is laid in even courses from the eave up, and every hip and ridge is capped in matching shingles. Where several hips come together around a shallow low spot that is too flat for shingles to shed water, that spot is covered in a white roofing sheet instead, lapped under the shingles around it.',
    'A roof with this many valleys has a lot of lines for water to follow. Each valley is lined in metal, and the shingles are cut cleanly along both sides of it, so water runs straight down the valley instead of working under the shingle edges.',
    'The white chimney is flashed where it meets the roof, with a small shingled cricket on its uphill side so water turns around it instead of pooling against it. The roof vents and the plumbing vents each sit on their own flashing, set into the shingle courses. Read more about [attic ventilation](/residential-roofing/attic-ventilation/).',
    'Own a home in Beverly Grove, West Hollywood or elsewhere in [Los Angeles](/service-areas/la-county/los-angeles/)? Our roofers handle [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/) and [shingle roof repair](/residential-roofing/shingle-roofing/repair/), from our office in [West Hollywood](/service-areas/la-county/west-hollywood/). Homeowners can request a [free roof evaluation](/contact-us/) to start.',
  ],
};
