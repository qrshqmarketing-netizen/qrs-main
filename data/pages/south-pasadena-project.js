// Project page: a single-story mid-century home in South Pasadena 91030, almost all flat roof around an open-air entry courtyard, with a white
// cap sheet on every flat section and a light gray shingle hip roof in the middle (from the owner's drone photos, November 18 2026, sent as
// "Pasadena, CA 91030"; 91030 is South Pasadena, and the owner chose that name). All 19 photos of the flight (DJI_0357-0375, August 5 2026), in
// the order taken (the owner pasted them in reverse). The house number painted on the curb is blurred in photos 8, 18 and 19. The shingle hip
// roof is described as it is, not as part of the job (the owner didn't say). No brand was named, so the page names none. Photos in
// public/images/projects/flat-roof-replacement-south-pasadena-91030/ (WebP, 1800px). The map pin is the center of the ZIP code.
import { mediaUrl } from '@/lib/media';

const DIR = 'projects/flat-roof-replacement-south-pasadena-91030/flat-south-pasadena-91030-';
const photo = (n, alt) => ({ src: mediaUrl(`${DIR}${String(n).padStart(2, '0')}.webp`), alt });

export const SOUTH_PASADENA_PROJECT = {
  path: '/projects/flat-roof-replacement-south-pasadena-91030/',
  keyword: 'flat roof replacement in South Pasadena',
  title: 'Flat Roof Replacement in South Pasadena 91030',
  metaTitle: 'Flat Roof Replacement in South Pasadena 91030',
  description:
    'Flat roof replacement in South Pasadena 91030: a mid-century home with a new white cap sheet around its entry courtyard, the rooftop unit, chimney and vents flashed.',
  image: mediaUrl(`${DIR}01.webp`), // the front of the home from above the driveway, the courtyard and the whole white roof in view; also the first photo
  imageAlt: 'Aerial view of a mid-century home in South Pasadena with a new white flat roof around an open entry courtyard',
  // Short name for the "Recent projects" links on the pages this project is listed under (`related`)
  label: 'Flat roof replacement, South Pasadena 91030',
  related: [
    '/residential-roofing/flat-roofing/replacement/',
    '/residential-roofing/flat-roofing/',
    '/residential-roofing/cool-roofing/',
    '/service-areas/la-county/pasadena/',
  ], // shown as "Related services" here, and this project is linked back from them
  // An H2 above the paragraph at each position below (they describe the paragraphs, nothing is added to the story)
  headings: {
    1: 'A white cap sheet, row by row',
    2: 'The rooftop unit, pipes and chimney',
    3: 'Edges, curves and the hip roof',
    4: 'Flat roofing in South Pasadena',
  },
  // The photo after each chapter (index in `photos`)
  chapterPhotos: { 1: 6, 2: 9, 3: 13 },
  place: 'South Pasadena, CA 91030',
  // Map pin on /projects/: the center of the ZIP code, not the home's address, so the client's address stays private
  geo: [34.1131, -118.158],
  // Photo slider and gallery, in the order taken
  photos: [
    photo(1, 'Aerial view of a mid-century home in South Pasadena with a new white flat roof around an open entry courtyard'),
    photo(2, 'The front of the roof: white cap sheet beside the courtyard and the light gray shingle hip roof in the middle'),
    photo(3, 'The hip roof from above the front, with the white flat roof all around it and the rooftop unit behind'),
    photo(4, 'The back corner from above, with the chimney and the lower roof beside the pool'),
    photo(5, 'The back of the house from above: the chimney, the rooftop unit and the lower roof over the curved back wall'),
    photo(6, 'The long flat roof along the side of the house, seen from above the pool'),
    photo(7, 'The flat roof at the back laid in long rows of cap sheet, with the rooftop unit and the hip roof behind'),
    photo(8, 'The cap sheet running around the courtyard opening and out to the front edge of the roof'),
    photo(9, 'The side of the house, with the long white flat roof running to the front and the garage'),
    photo(10, 'The rooftop air conditioning unit on its curb, with the cap sheet carried up around its base'),
    photo(11, 'The rooftop unit from the other side, its curb flashed into the new cap sheet'),
    photo(12, 'The brick chimney where the flat roof meets the hip roof, flashed along its base'),
    photo(13, 'The chimney up close, with white flashing along its base and the cap sheet carried around it'),
    photo(14, 'The lower roof beside the pool, its edge following the curve of the wall below'),
    photo(15, 'The shingle hip roof with its capped hips, a skylight dome and vents on their flashings'),
    photo(16, 'The flat roof meeting the shingles along the side, with vent pipes sealed where they come through'),
    photo(17, 'A corner of the hip roof, with the white flat roof wrapped around it'),
    photo(18, 'Straight-down view of the whole roof from above the street, with the courtyard and the pool'),
    photo(19, 'Straight-down view from the other side, the hip roof in the middle of the white flat roof'),
  ],
  paragraphs: [
    'This flat roof replacement in South Pasadena 91030 covered a single-story mid-century home that is almost all flat roof: one long, low roof over the house and garage, wrapped around an open-air courtyard at the front entry, with a small hip roof in light gray shingles in the middle. Our roofers installed a new white cap sheet across every flat section.',
    'The cap sheet runs in long rows across the roof, each lap over the one before it, out to the edges and around all four sides of the courtyard opening. A white surface reflects much of the sun instead of soaking it up, which suits a roof this size. Read more about [cool roofing](/residential-roofing/cool-roofing/).',
    'A flat roof most often leaks where something comes through it. The rooftop air conditioning unit sits on a curb with the cap sheet carried up around its base, every plumbing vent is sealed where it comes through the roof, and the brick chimney is flashed along its base where it meets the roof.',
    'At the back, a lower roof over a curved wall beside the pool follows that curve at its edge. In the middle, the flat roof meets the shingle hip roof on all four sides, a joint where the two kinds of roofing have to work together to shed water. Our [flat roof replacement](/residential-roofing/flat-roofing/replacement/) page explains how we build these roofs.',
    'Have a flat roof in South Pasadena, [Pasadena](/service-areas/la-county/pasadena/) or elsewhere in [Los Angeles County](/service-areas/la-county/)? Our roofers handle [flat roof replacement](/residential-roofing/flat-roofing/replacement/) and [flat roof repair](/residential-roofing/flat-roofing/repair/), and every job starts with a free roof evaluation and a written scope and price before any work. [Contact us](/contact-us/) to book yours.',
  ],
};
