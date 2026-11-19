// Project page: a single-story home and its detached garage in Garden Grove 92840, Orange County, re-roofed in brown architectural shingles.
// The tear-off photos came first (October 2026); the page stayed switched off until the finished photos arrived (owner, November 18 2026,
// sent as "another Garden Grove 92840 project": the drone GPS and the yard show it is this same house, flight of August 10 2026, DJI_0561-0580).
// Photos: 4 tear-off photos, then all 20 finished ones in the order taken (files 17-36). The older garage close-ups (13-16) were dropped: the
// new flight covers the garage. A partial house number on the curb is blurred in photo 19. The low flat roof over the back room (tan before
// the job) was redone in a white cap sheet as part of the job (owner, November 18 2026). No brand was named, so the page names none. Photos in public/images/projects/shingle-roof-replacement-garden-grove-92840/ (WebP, 1800px). The map pin is the center of
// the ZIP code.
import { mediaUrl } from '@/lib/media';

const DIR = 'projects/shingle-roof-replacement-garden-grove-92840/shingle-garden-grove-92840-';
const photo = (n, alt) => ({ src: mediaUrl(`${DIR}${String(n).padStart(2, '0')}.webp`), alt });

export const GARDEN_GROVE_PROJECT = {
  path: '/projects/shingle-roof-replacement-garden-grove-92840/',
  keyword: 'house and garage roof replacement in Garden Grove',
  title: 'House and Garage Roof Replacement in Garden Grove 92840',
  metaTitle: 'House and Garage Roof Replacement in Garden Grove 92840',
  description:
    'House and garage roof replacement in Garden Grove 92840: old shingles stripped to the deck, new brown architectural shingles, the chimney and vents flashed.',
  image: mediaUrl(`${DIR}18.webp`), // the whole main roof from above the front yard, with the chimney and the backyard (photo 6 in `photos`)
  imageAlt: 'Aerial view of a single-story home in Garden Grove with a new brown architectural shingle roof, a brick chimney and the backyard behind it',
  // Short name for the "Recent projects" links on the pages this project is listed under (`related`)
  label: 'House and garage roof replacement, Garden Grove 92840',
  related: [
    '/residential-roofing/shingle-roofing/replacement/',
    '/residential-roofing/shingle-roofing/',
    '/residential-roofing/attic-ventilation/',
    '/residential-roofing/flat-roofing/replacement/',
    '/service-areas/orange-county/',
  ], // shown as "Related services" here, and this project is linked back from them
  // An H2 above the paragraph at each position below (they describe the paragraphs, nothing is added to the story)
  headings: {
    1: 'Old shingles off, the deck covered as the work moved',
    2: 'The chimney, vents and mounts',
    3: 'Where the roofs meet, and the flat roof',
    4: 'The garage, roofed to match',
    5: 'Shingle roofing in Garden Grove',
  },
  // The photo after each chapter (index in `photos`)
  chapterPhotos: { 1: 2, 2: 15, 3: 17, 4: 8 },
  // The wipe: the overhead tear-off photo (1) gives way to the finished property from the same spot (23)
  reveal: { before: 0, after: 22 },
  place: 'Garden Grove, CA 92840',
  // Map pin on /projects/: the center of the ZIP code, not the home's address, so the client's address stays private
  geo: [33.7803, -117.94],
  // Photo slider and gallery: the tear-off first, then the finished roofs in the order taken
  photos: [
    photo(10, 'Overhead view of the backyard and the home with its old shingles stripped in sections and blue tarps over the opened areas'),
    photo(9, 'Overhead view of the roof mid tear-off, with the old brown shingles coming off and the roof deck exposed beside the backyard'),
    photo(11, 'Roofers working across the roof as the old shingles come off, beside the brick chimney and a turbine vent'),
    photo(12, 'Close aerial view of the tear-off, with old shingles stripped in patches around the chimney and the TV and satellite mounts'),
    photo(17, 'The front of the house from above the driveway, the new brown shingles running down to the eaves'),
    photo(18, 'The whole main roof from above the front yard: new brown shingles, a straight ridge cap and the brick chimney'),
    photo(19, 'The back of the house, with the chimney and the white flat roof over the back room beside the patio'),
    photo(20, 'The detached garage with its new brown shingle roof, beside the backyard'),
    photo(21, 'The garage roof from above the driveway, with a straight ridge cap and clean edges'),
    photo(22, 'The garage from the corner, its new shingles running down to the eave'),
    photo(23, 'The back of the house from above the side yard: the chimney, the white flat roof and vents set into the new shingles'),
    photo(24, 'The side of the house, with the gable end and the vents along the back slope'),
    photo(25, 'The front of the house from above the side yard, with the small front gable and the vents on their flashings'),
    photo(26, 'Pipe boots, a box vent and the metal flashing where the front gable meets the main roof, beside the ridge cap'),
    photo(27, 'The satellite dish and a vent on the rear slope, beside the small roof that meets the main roof'),
    photo(28, 'The brick chimney flashed at its base, with the new shingles laid around it'),
    photo(29, 'The new white cap sheet on the flat roof over the back room, where it meets the shingles beside the chimney'),
    photo(30, 'The chimney and the edge where the white flat roof meets the shingles, up close'),
    photo(31, 'The ridge cap and the pipe boots on the front slope, above the front yard'),
    photo(32, 'The back slope and its ridge cap, down to the eave above the backyard'),
    photo(33, 'The garage roof straight down, with the ridge cap across the middle'),
    photo(34, 'The garage roof straight down from the other side'),
    photo(35, 'Straight-down view of the whole property: the house, the garage, the white flat roof and the backyard'),
    photo(36, 'Straight-down view from the other side, with the house, the flat roof and the backyard'),
  ],
  paragraphs: [
    'This house and garage roof replacement in Garden Grove 92840 covered a single-story home and its detached garage. The old brown shingles were worn out, so our roofers stripped both roofs down to the deck and installed new brown architectural shingles, with straight ridge lines and clean edges on every roof of the property. The low flat roof over the back room was redone too, in a white cap sheet.',
    'The job started with the tear-off. Our roofers worked across the roof in sections, pulling the old shingles down to the deck and clearing the debris as they went. Blue tarps covered the opened areas while the work moved on, so the exposed roof was protected from one section to the next.',
    'This roof carries a brick chimney, several vents and plumbing pipes, and the mounts for a TV antenna and a satellite dish, and every one of them is a spot where a shingle roof can let water in. Stripping the roof to the deck is what lets each one be dealt with properly, as part of our *TotalShield* Shingle System, instead of being roofed over: the chimney is flashed at its base, and the box vents and pipe boots each sit on their own flashing, set into the new shingle courses. Read more about [attic ventilation](/residential-roofing/attic-ventilation/).',
    'Where the small gable over the front of the house meets the main roof, a run of metal flashing carries water past the joint. At the back, the low flat roof over the back room beside the patio, tan and worn before the job, was redone in a white cap sheet, turned up where it meets the shingles so the two kinds of roofing work together to shed water. A white surface reflects much of the sun instead of soaking it up. Read more about [flat roof replacement](/residential-roofing/flat-roofing/replacement/).',
    'The detached garage got the same brown shingles, with a straight ridge cap and crisp edges, so the house and the garage match from the backyard, where both roofs are always in view.',
    'Own a home in Garden Grove or elsewhere in north Orange County? Our roofers handle [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/) and [shingle roof repair](/residential-roofing/shingle-roofing/repair/) across [Orange County](/service-areas/orange-county/). Homeowners can request a [free roof evaluation](/contact-us/) to start.',
  ],
};
