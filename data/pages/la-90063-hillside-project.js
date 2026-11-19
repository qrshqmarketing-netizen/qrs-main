// Project page: a two-story hillside home in Los Angeles 90063 re-roofed in Mystic Gray architectural shingles with a torch-applied flat section
// finished to match (owner, November 19 2026; the owner's name for the place is "Los Angeles 90063"). A different house from the many-hips job in
// east-los-angeles-project.js (same ZIP). Facts from the job's WhatsApp group (November 6-19 2026), read as data: about 20 squares (18 of shingles,
// 2 of flat roof), one layer torn off, standard and low pitch, Mystic Gray shingles, charcoal drip edge, closed-cut valleys, the flat section to
// match the shingles, the main house only (no garage), delivery couldn't reach the house on the hill so the crew picked up materials, work paused
// for rain, finished November 18, progress photos throughout, permit posted and the city inspection booked. Not on the page: the street address,
// client and staff names, prices, the underlayment brand (to confirm with the owner), gutters (not a listed service), the inspection result (not
// in the chat yet). 19 of the 32 WhatsApp photos (no date or location data), in job order: deck, underlayment, finished; the phone watermark is
// cropped out of the underlayment photo. No plate is readable. Photos in public/images/projects/hillside-shingle-roof-replacement-los-angeles-90063/
// (WebP, 1800px). The map pin is near the middle of the ZIP code, set a little apart from the other 90063 project so the two pins don't overlap.
import { mediaUrl } from '@/lib/media';

const DIR = 'projects/hillside-shingle-roof-replacement-los-angeles-90063/hillside-shingle-los-angeles-90063-';
const photo = (n, alt) => ({ src: mediaUrl(`${DIR}${String(n).padStart(2, '0')}.webp`), alt });

export const LA_90063_HILLSIDE_PROJECT = {
  path: '/projects/hillside-shingle-roof-replacement-los-angeles-90063/',
  keyword: 'hillside shingle roof replacement in Los Angeles',
  title: 'Hillside Shingle Roof Replacement in Los Angeles 90063',
  metaTitle: 'Hillside Shingle Roof Replacement in Los Angeles 90063',
  description:
    'Hillside shingle roof replacement in Los Angeles 90063: torn off to the deck, damaged sheathing replaced, Mystic Gray shingles and a matching flat roof.',
  image: mediaUrl(`${DIR}08.webp`), // the finished home from above the garden, the new gray roof over both stories (photo 8 in `photos`)
  imageAlt: 'Aerial view of a two-story hillside home in Los Angeles 90063 with a new Mystic Gray architectural shingle roof',
  // Short name for the "Recent projects" links on the pages this project is listed under (`related`)
  label: 'Hillside shingle roof, Los Angeles 90063',
  related: [
    '/residential-roofing/shingle-roofing/replacement/',
    '/residential-roofing/shingle-roofing/',
    '/residential-roofing/flat-roofing/torch-down/',
    '/service-areas/la-county/vernon/',
  ], // shown as "Related services" here, and this project is linked back from them
  // An H2 above the paragraph at each position below (they describe the paragraphs, nothing is added to the story)
  headings: {
    1: 'Down to the deck, and a new deck where it needed one',
    2: 'Mystic Gray shingles and a flat roof to match',
    3: 'Supplying a home on a hill',
    4: 'Permitted and photographed at every stage',
    5: 'Roofing in Los Angeles 90063',
  },
  // The photo after each chapter (index in `photos`)
  chapterPhotos: { 1: 3, 2: 15, 3: 10, 4: 6 },
  // The wipe: the bare deck from straight above gives way to the finished roof from the same spot
  reveal: { before: 0, after: 18 },
  place: 'Los Angeles, CA 90063',
  // Map pin on /projects/: near the middle of the ZIP code (not the home's address), a little apart from the other 90063 project
  geo: [34.0462, -118.1832],
  // Photo slider and gallery, in job order: the deck, the underlayment, the finished roof
  photos: [
    photo(1, 'Straight down on the house mid-job, the old roof off down to the wood deck and new sheathing in the lighter sections'),
    photo(2, 'The deck from above the back yard, the old roof gone and new boards set in where the old ones were damaged'),
    photo(3, 'New sheathing set into the deck beside a plumbing vent, the joints cut clean between old and new'),
    photo(4, 'Roofers re-sheathing the porch roof, opened down to the rafters'),
    photo(5, 'The porch roof from the side, its rafters exposed while the new deck goes on'),
    photo(6, 'The back of the house with the low roof stripped to the deck and ready for the new roof'),
    photo(7, 'New underlayment fastened across the deck before the shingles went on'),
    photo(8, 'Aerial view of a two-story hillside home in Los Angeles 90063 with a new Mystic Gray architectural shingle roof'),
    photo(9, 'The finished roof from above the street side, both stories and the porch roof in gray shingles'),
    photo(10, 'The house from the corner, the terraced garden and stairway below the new roof'),
    photo(11, 'The finished roof from straight above, its slopes, vents and the low roof at the back'),
    photo(12, 'The back of the house, where the low flat section is finished to match the shingles'),
    photo(13, 'The roof from above the side yard, the shingles run down to the eaves on every slope'),
    photo(14, 'The roof from the back corner, the flat section beside the shingles'),
    photo(15, 'A capped hip on the new shingle roof'),
    photo(16, 'A closed-cut valley, the shingles of one slope cut in a clean line over the other'),
    photo(17, 'Where the porch roof meets the wall of the house, flashed along its length'),
    photo(18, 'Another closed-cut valley, the courses running straight to the cut line'),
    photo(19, 'Straight-down view of the finished roof from the same spot as the bare deck'),
  ],
  paragraphs: [
    'This hillside shingle roof replacement in Los Angeles 90063 covered a two-story home high on a slope, with a terraced garden and a long stairway down to the street: about 20 squares of roof, roughly 2,000 square feet, 18 squares of it shingles and 2 a low flat section at the back. The job was the main house.',
    'There was one layer of old roofing, and our roofers took it off down to the wood deck. With the deck bare, every damaged section of sheathing was cut out and replaced with new boards before anything covered it. Over the front porch, the roof was opened down to the rafters and re-sheathed. New underlayment then went down over the whole deck.',
    'The new roof is architectural shingles in Mystic Gray, one of the cool roof colors we offer, with a charcoal drip edge along the eaves. The valleys are closed-cut: the shingles of one slope run through the valley and the other slope is cut in a clean line over them. The low flat section at the back got a torch-applied roof finished to match the shingles, so the whole house reads as one roof. Read more about [torch down roofing](/residential-roofing/flat-roofing/torch-down/).',
    'A house this high on a hill is not easy to supply: the delivery truck could not set materials at the house, so our crew picked up the materials themselves and brought them up the hill. When rain came through, the work paused and picked up again once the weather cleared, and the roof was finished on November 18.',
    'Progress photos came in at every stage, from the bare deck to the finished roof, and the permit was posted on site with a ladder set and secured for the city inspector, booked as soon as the roof was done.',
    'Have a hillside home in Los Angeles 90063 or nearby? Our roofers handle [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/) and [shingle roof repair](/residential-roofing/shingle-roofing/repair/) from our [Vernon office](/service-areas/la-county/vernon/), and homeowners can request a [free roof evaluation](/contact-us/) to start.',
  ],
};
