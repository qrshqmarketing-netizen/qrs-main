// Project page: a row of attached townhomes in West Hollywood 90046 re-roofed with a Polyglass base sheet and a white granulated cap sheet
// (from the owner's drone photos, November 17 2026). All 18 photos are from one flight on June 26 2026 (3:00 to 3:02 PM) and are shown in the
// order they were taken; they show the job in progress (some roofs finished in white, the rest at the base sheet), so there is no before-and-after
// wipe. Photos in public/images/projects/townhome-flat-roof-replacement-west-hollywood-90046/ (WebP, 1800px long side), converted from the
// originals with no location data. No plate or house number is readable at that size. The map pin is the center of the ZIP code, not the
// building. The owner named Polyglass by the printing on the base sheet.
// Earlier photos added November 18 2026: 17 from the flight of June 25 2026 (9:21-9:23 AM, the day before), files 19-35, shown first: the old roof
// off down to the wood deck on the far roofs, new plywood in places and the base sheet going on. The rolls on the roof read "Elastoflex SA V"
// (Polyglass's self-adhered base sheet), so the page names it; it still says nothing about how the cap sheet was applied.
import { mediaUrl } from '@/lib/media';

const DIR = 'projects/townhome-flat-roof-replacement-west-hollywood-90046/flat-west-hollywood-90046-';
const photo = (n, alt) => ({ src: mediaUrl(`${DIR}${String(n).padStart(2, '0')}.webp`), alt });

export const WEST_HOLLYWOOD_FLAT_PROJECT = {
  path: '/projects/townhome-flat-roof-replacement-west-hollywood-90046/',
  keyword: 'townhome flat roof replacement',
  title: 'Townhome Flat Roof Replacement in West Hollywood 90046',
  metaTitle: 'Townhome Flat Roof Replacement in West Hollywood 90046',
  description:
    'Townhome flat roof replacement in West Hollywood 90046: a row of attached townhomes re-roofed with a Polyglass base sheet and a white cap sheet, every AC curb, skylight and vent flashed.',
  image: mediaUrl(`${DIR}12.webp`), // the row at an angle with the white cap sheet finished on the near roofs (photo 12 in `photos`)
  imageAlt: 'Aerial view of a row of townhomes in West Hollywood with new white flat roofs, rooftop AC units and skylights, and a roofer working along the edge',
  // Short name for the "Recent projects" links on the pages this project is listed under (`related`)
  label: 'Townhome flat roofs, West Hollywood 90046',
  related: [
    '/residential-roofing/flat-roofing/replacement/',
    '/residential-roofing/flat-roofing/',
    '/residential-roofing/hoa-multi-family/',
    '/service-areas/la-county/west-hollywood/',
  ], // shown as "Related services" here, and this project is linked back from them
  // An H2 above the paragraph at each position below (they describe the paragraphs, nothing is added to the story)
  headings: {
    1: 'Down to the deck first',
    2: 'A Polyglass base sheet on every roof',
    3: 'A white cap sheet with sealed laps',
    4: 'Every AC curb, skylight and vent flashed',
    5: 'Materials up by lift, one roof at a time',
    6: 'Flat roofing in West Hollywood',
  },
  // The photo after each chapter (index in `photos`)
  chapterPhotos: { 1: 5, 2: 32, 3: 27, 4: 25, 5: 18 },
  place: 'West Hollywood, CA 90046',
  // Map pin on /projects/: the center of the ZIP code, not the building's address, so the client's address stays private
  geo: [34.1074, -118.3653],
  // Photo slider and gallery, in the order the photos were taken (June 25 2026, then June 26 2026)
  photos: [
    photo(19, 'Angled view down the row from the end unit: base sheet on the near roofs, the crew at work and bare deck on the far roofs'),
    photo(20, 'The row from above the parking lot, with base sheet on the near roofs and rolls staged beside the AC units'),
    photo(21, 'The row from the courtyard side, with the scissor lift and the debris chute running down from the roof edge'),
    photo(22, 'Looking down on the middle roofs: base sheet on, the skylight curbs and AC units ready for flashing, roofers at work'),
    photo(23, 'The roofs from above the courtyard: bare wood deck on the far roof, base sheet on the rest, the debris chute at the edge'),
    photo(24, 'The far roofs down to the bare deck, with new sheets of plywood beside the slatted opening and rolls ready to go'),
    photo(25, 'Angled view from the far end: two roofs down to the deck, the base sheet starting across them and the lift in the courtyard'),
    photo(26, 'The far end from above the parking lot, where the bare deck meets the base sheet between two roofs'),
    photo(27, 'The two end roofs at an angle, the old roofing gone down to the deck and rolls of base sheet laid out'),
    photo(28, 'Straight down on the two far roofs: bare deck, the skylights, the AC units and the first runs of base sheet'),
    photo(29, 'The middle roofs with base sheet on, roofers working at a skylight curb and the deck still bare on the far roof'),
    photo(30, 'The middle and near roofs, the base sheet run around every AC unit, pipe and skylight'),
    photo(31, 'The end roof from above the parking lot, base sheet on and a roofer at work by the AC unit'),
    photo(32, 'Looking down the row from above the parking lot to the bare deck on the far roof'),
    photo(33, 'The far end roof with the scissor lift alongside, the old roof off down to the deck'),
    photo(34, 'Straight-down view of the whole row: base sheet on most roofs, the far ones down to the bare deck'),
    photo(35, 'The whole row straight down from the other side, above the courtyard and the scissor lift'),
    photo(1, 'Angled view down the row of townhomes from one end: the near roofs finished in white cap sheet, the crew at work on the far roofs'),
    photo(2, 'The row from the side, with the scissor lift that brought the materials up and a roofer working at the edge of a finished white roof'),
    photo(3, 'Looking down on three townhome roofs: white cap sheet on the finished ones, black base sheet next door, tools set out by the AC units'),
    photo(4, 'The two roofs still at the base sheet stage, with their twin skylights and AC units, and the crew laying white cap sheet next door'),
    photo(5, 'The same roofs a moment later, with rolls of base sheet and cap sheet staged by the skylights and the scissor lift in front'),
    photo(6, 'The end of the row from above the parking lot: black Polyglass base sheet on the nearest roofs, white cap sheet farther along'),
    photo(7, 'Down the length of the row from the end unit, with a ladder and rolls on the base sheet and the finished white roofs beyond'),
    photo(8, 'The corner of the row above the side walkway, with the base sheet run out to the roof edge and around the AC curbs'),
    photo(9, 'Straight down on two roofs: the AC units on their curbs, the twin skylights and a roofer crossing the base sheet'),
    photo(10, 'Looking down the middle of the row, where the white cap sheet meets the black base sheet and the crew lays the next rows'),
    photo(11, 'Two finished roofs in white cap sheet, with a roofer sealing a lap beside the AC unit'),
    photo(12, 'The row of townhomes at an angle, with the white cap sheet finished on the near roofs and a roofer working along the edge'),
    photo(13, 'A close view of the white cap sheet laps, a skylight curb and a roofer working next to the AC unit'),
    photo(14, 'A roofer at a skylight curb while the white cap sheet goes on over the base sheet beside the open slatted section'),
    photo(15, 'Polyglass base sheet on the roof, with a roofer laying white cap sheet along the edge and another at the skylight'),
    photo(16, 'A close view of the Polyglass base sheet, the rolls ready to go, the flashed curbs under the two AC units and new pipe flashings'),
    photo(17, 'Straight-down view of the whole row, with the finished roofs in white and the rest at the base sheet stage'),
    photo(18, 'The same row straight down from the other side, with the scissor lift in the walkway and the crew at work across the roofs'),
  ],
  paragraphs: [
    'This townhome flat roof replacement in West Hollywood 90046 covered a row of attached townhomes, each with its own flat roof, rooftop AC unit, skylight and open slatted sections over the terraces. Our roofers re-roofed them with a Polyglass base sheet and a white granulated cap sheet, working across the row one roof at a time.',
    'The day before, the old roofing came off down to the wood deck, one roof at a time, and the debris went down a chute into the courtyard instead of past anyone’s door. With the deck bare, new sheets of plywood went in where it needed them before anything covered it.',
    'Every roof got a black Polyglass base sheet first, Elastoflex SA V, a self-adhered sheet, run across the roof, out to the edges and up around the curbs. It is the first layer of the new roof, and the photos show it in place on the roofs the crew had not yet finished, with the rolls staged beside the skylights.',
    'The white cap sheet went on over the base sheet in long rows, each overlapping the one before it, and our roofers sealed every lap by hand. The finished roofs read as one clean white surface from above, with no loose edges at the parapets or around the slatted openings. Our [flat roof replacement](/residential-roofing/flat-roofing/replacement/) page explains how we build these roofs.',
    'A flat roof leaks most often where something goes through it, and these roofs have a lot: an AC unit on a curb, a skylight, plumbing vents and the edges of the slatted openings on every home. Each AC curb was flashed in metal, each skylight curb was wrapped, and the pipe vents got new flashings before the cap sheet went on around them.',
    'With homes side by side and a walkway between the buildings, the crew brought the rolls and tools up with a scissor lift from the walkway instead of carrying them through anyone’s home. The roofs were finished one after another, so in the photos the finished white roofs sit beside the ones still at the base sheet stage.',
    'Own a townhome or manage a row of them in West Hollywood or nearby? Our roofers handle [flat roof replacement](/residential-roofing/flat-roofing/replacement/) for [HOA and multi-family](/residential-roofing/hoa-multi-family/) properties, with a written scope and price before any work, from our office in [West Hollywood](/service-areas/la-county/west-hollywood/). [Contact us](/contact-us/) to start with a roof evaluation.',
  ],
};
