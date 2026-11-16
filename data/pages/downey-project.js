// Project page: single-family home in Downey 90241 re-roofed in gray architectural shingles, with a white torch-down flat roof on the low section
// where its roofs meet (from the owner's drone photos, November 17 2026; all show the finished roof).
// Photos in public/images/projects/shingle-roof-replacement-torch-down-downey-90241/ (WebP, 1500-1800px long side). The map pin is the center of the
// ZIP code. The owner named no shingle or membrane brand for this job, so the page doesn't either. The address has "shingle" but not "flat", so the
// project counts as a shingle job on the roof-type pages (data/projectPages.js); it reaches the torch-down page through `related`.
import { mediaUrl } from '@/lib/media';

const DIR = 'projects/shingle-roof-replacement-torch-down-downey-90241/shingle-torch-down-downey-90241-';
const photo = (n, alt) => ({ src: mediaUrl(`${DIR}${String(n).padStart(2, '0')}.webp`), alt });

export const DOWNEY_PROJECT = {
  path: '/projects/shingle-roof-replacement-torch-down-downey-90241/',
  keyword: 'shingle roof replacement in Downey',
  title: 'Shingle Roof Replacement With a Torch-Down Flat Roof in Downey 90241',
  metaTitle: 'Shingle Roof Replacement in Downey 90241',
  description:
    'Shingle roof replacement in Downey 90241: a single-family home re-roofed in gray architectural shingles, with a white torch-down flat roof where its roofs meet.',
  image: mediaUrl(`${DIR}02.webp`), // the whole roof from above at an angle, with the white torch-down section in the middle; also the first photo in `photos`
  imageAlt: 'Angled aerial view of a single-family home in Downey with a new gray shingle roof and a white torch-down section where two roofs meet',
  // Short name for the "Recent projects" links on the pages this project is listed under (`related`)
  label: 'Shingle roof with torch-down, Downey 90241',
  related: [
    '/residential-roofing/shingle-roofing/replacement/',
    '/residential-roofing/flat-roofing/torch-down/',
    '/residential-roofing/shingle-roofing/',
    '/service-areas/la-county/',
  ], // shown as "Related services" here, and this project is linked back from them
  // An H2 above the paragraph at each position below (they describe the paragraphs, nothing is added to the story)
  headings: {
    1: 'New shingles on every wing',
    2: 'Torch-down where the roofs meet',
    3: 'Vents, pipes and the chimney',
    4: 'Roofing in Downey and southeast Los Angeles County',
  },
  // The photo after each chapter (index in `photos`)
  chapterPhotos: { 1: 1, 2: 4, 3: 2, 4: 3 },
  place: 'Downey, CA 90241',
  // Map pin on /projects/: the center of the ZIP code, not the home's address, so the client's address stays private
  geo: [33.9416, -118.1306],
  // Photo slider and gallery, in the order shown
  photos: [
    photo(2, 'Angled aerial view of a single-family home in Downey with a new gray shingle roof and a white torch-down section where two roofs meet'),
    photo(5, 'The finished roof from above the front of the house: gray shingles on every wing, capped ridges and box vents'),
    photo(4, 'The new shingle roof from the side yard, with the box vents, a pipe flashing and the brick chimney at the back'),
    photo(3, 'The roof from above the back yard, with its wings around a small courtyard and the white torch-down section near the front'),
    photo(1, 'Close view of the white torch-down flat roof set between two shingle slopes, with a flashed vent pipe and the shingles lapped onto it'),
  ],
  paragraphs: [
    'This shingle roof replacement in Downey 90241 covered a single-family home whose roof has several wings around a small courtyard. Our roofers re-roofed every slope in new gray architectural shingles and built a white torch-down flat roof on the low section where two of the roofs meet.',
    'The home has gable roofs running in different directions, joined by hips and valleys. Every slope is finished in the same shingles, laid in even courses from the eave up, with the ridges and hips capped to match and a clean metal edge along the eaves.',
    'Between two of the roofs there is a low, nearly flat section where water collects before it drains. Shingles are the wrong roof for a spot like that, so it got a torch-down flat roof: a white cap sheet fused to the layer below it, carried up under the shingles on both sides. Our [torch down roof installation](/residential-roofing/flat-roofing/torch-down/) page explains how these roofs are built.',
    'The roof has box vents, plumbing pipes and a brick chimney. Each vent and pipe sits on its own flashing set into the shingle courses, including the pipe that comes up through the torch-down section, and the chimney is flashed into the new shingles.',
    'Own a home in Downey, Pico Rivera, Whittier or elsewhere in southeast Los Angeles County? Our roofers handle [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/) and flat roof sections like this one across [Los Angeles County](/service-areas/la-county/). Homeowners can request a [free roof evaluation](/contact-us/) to start.',
  ],
};
