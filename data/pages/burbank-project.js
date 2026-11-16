// Project page: a hillside home in Burbank 91501 re-roofed in brown-blend architectural shingles, the house and its detached garage (from the
// owner's drone photos, November 17 2026; all show the finished roof). 14 of the 20 photos are used: the one with a readable license plate and
// house number, two with the drone operator in view and three centered on the home's flat roof (the owner didn't say it was part of the job,
// so the page doesn't claim it) are left out; the person behind the car in the garage photo is blurred.
// Photos in public/images/projects/shingle-roof-replacement-burbank-91501/ (WebP, 1500-1800px long side). The map pin is the center of the ZIP
// code. The owner named no shingle brand for this job, so the page doesn't either.
import { mediaUrl } from '@/lib/media';

const DIR = 'projects/shingle-roof-replacement-burbank-91501/shingle-burbank-91501-';
const photo = (n, alt) => ({ src: mediaUrl(`${DIR}${String(n).padStart(2, '0')}.webp`), alt });

export const BURBANK_PROJECT = {
  path: '/projects/shingle-roof-replacement-burbank-91501/',
  keyword: 'shingle roof replacement in Burbank',
  title: 'Shingle Roof Replacement on a Hillside Home in Burbank 91501',
  metaTitle: 'Shingle Roof Replacement in Burbank 91501',
  description:
    'Shingle roof replacement in Burbank 91501: a hillside home and its detached garage re-roofed in brown-blend architectural shingles, with the chimney, vents and pipes flashed.',
  image: mediaUrl(`${DIR}01.webp`), // the whole property from above the hillside; also the first photo in `photos`
  imageAlt: 'Aerial view of a hillside home in Burbank with a new brown shingle roof on the house and the detached garage, beside a pool',
  // Short name for the "Recent projects" links on the pages this project is listed under (`related`)
  label: 'Shingle roof replacement, Burbank 91501',
  related: [
    '/residential-roofing/shingle-roofing/replacement/',
    '/residential-roofing/shingle-roofing/',
    '/residential-roofing/attic-ventilation/',
    '/service-areas/la-county/burbank/',
  ], // shown as "Related services" here, and this project is linked back from them
  // An H2 above the paragraph at each position below (they describe the paragraphs, nothing is added to the story)
  headings: {
    1: 'New shingles on a long hillside roof',
    2: 'The chimney, vents and pipes',
    3: 'The detached garage',
    4: 'Roofing in Burbank',
  },
  // The photo after each chapter (index in `photos`)
  chapterPhotos: { 1: 6, 2: 9, 3: 13, 4: 1 },
  place: 'Burbank, CA 91501',
  // Map pin on /projects/: the center of the ZIP code, not the home's address, so the client's address stays private
  geo: [34.1996, -118.2981],
  // Photo slider and gallery, in the order shown
  photos: [
    photo(1, 'Aerial view of a hillside home in Burbank with a new brown shingle roof on the house and the detached garage, beside a pool'),
    photo(2, 'The same home from the other side: the new shingle roof on the long main house, the wing behind it and the detached garage'),
    photo(3, 'Straight-down view of the property, with new brown shingles on the house and the garage and the hillside along one edge'),
    photo(4, 'Straight-down view from the opposite direction, showing the main roof, the cross wing and the hip roof on the garage'),
    photo(10, 'The long main roof from above, with its ridge, box vents and the brick chimney at the edge'),
    photo(9, 'Straight-down view of the main roof: even courses of brown shingles, a capped ridge and four box vents in a row'),
    photo(7, 'Looking along the capped ridge of the main roof, with box vents on one slope and the brick chimney at the eave'),
    photo(12, 'The back slope of the main roof with box vents, a round vent, a flashed pipe and the brick chimney above the pool'),
    photo(13, 'Close view of the ridge where the roof steps down, capped in matching shingles, with box vents on the slope below'),
    photo(11, 'The brick chimney from above, with a shingled cricket behind it that sends water around both sides'),
    photo(8, 'A slope of new shingles with a box vent beside the capped hip ridge'),
    photo(14, 'A lower slope of the new roof with a box vent and flashed pipes, under the gable of the wing above it'),
    photo(6, 'The gable wing with new shingles, a capped ridge and two flashed vent pipes'),
    photo(5, 'The detached garage under its new hip roof, with capped hips and a small gable vent in matching shingles'),
  ],
  paragraphs: [
    'This shingle roof replacement in Burbank 91501 covered a home set against a hillside: a long main house, a wing behind it and a detached garage. Our roofers re-roofed all of it in new brown-blend architectural shingles, so every roof on the property matches.',
    'The main house has one long gable roof that steps down partway along, with a second gable wing crossing it at the back. Each slope is laid in even courses from the eave up, and the ridges, the step in the ridge and the hips are capped in matching shingles.',
    'A roof leaks at the things that come through it long before it leaks in the open field. Here the brick chimney has a shingled cricket behind it, a small peaked section that splits the water and sends it around both sides. The box vents, the round vent and the plumbing pipes each sit on their own flashing, set into the shingle courses. Read more about [attic ventilation](/residential-roofing/attic-ventilation/).',
    'The detached garage has a hip roof with a small gable vent at the front. It got the same shingles and the same capped hips as the house, so the two buildings read as one roof from the street and from the air.',
    'Own a home in [Burbank](/service-areas/la-county/burbank/), in the hills or on the flats? Our roofers handle [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/) and [shingle roof repair](/residential-roofing/shingle-roofing/repair/) across the city. Homeowners can request a [free roof evaluation](/contact-us/) to start.',
  ],
};
