// Project page: a row of attached townhomes in West Hollywood 90046 re-roofed with a Polyglass base sheet and a white granulated cap sheet
// (from the owner's drone photos, November 17 2026). All 18 photos are from one flight on June 26 2026 (3:00 to 3:02 PM) and are shown in the
// order they were taken; they show the job in progress (some roofs finished in white, the rest at the base sheet), so there is no before-and-after
// wipe. Photos in public/images/projects/townhome-flat-roof-replacement-west-hollywood-90046/ (WebP, 1800px long side), converted from the
// originals with no location data. No plate or house number is readable at that size. The map pin is the center of the ZIP code, not the
// building. The owner named Polyglass by the printing on the base sheet. Finished photos (July 2 2026) added November 19 2026; the gallery was
// then trimmed to 18 in date order (unused files removed); the cover is now a finished photo and the wipe pairs the straight-down shots.
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
  image: mediaUrl(`${DIR}37.webp`), // the finished row at an angle (July 2 2026)
  imageAlt: 'Aerial view of a row of townhomes in West Hollywood with new white flat roofs, rooftop AC units, skylights and slatted terraces',
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
    6: 'One clean white roof on every home',
    7: 'Flat roofing in West Hollywood',
  },
  // The photo after each chapter (index in `photos`)
  chapterPhotos: { 1: 1, 2: 9, 3: 8, 4: 15, 5: 5, 6: 10 },
  // The wipe: the straight-down shot mid tear-off (June 25) gives way to the finished row from the same spot (July 2)
  reveal: { before: 4, after: 13 },
  place: 'West Hollywood, CA 90046',
  // Map pin on /projects/: the center of the ZIP code, not the building's address, so the client's address stays private
  geo: [34.1074, -118.3653],
  // Photo slider and gallery, chronological and trimmed to the best of each phase (owner, November 19 2026): 5 from the tear-off (June 25),
  // 5 from the base sheet and cap sheet going on (June 26) and 8 of the finished roofs (July 2 2026)
  photos: [
    photo(19, 'Angled view down the row from the end unit: base sheet on the near roofs, the crew at work and bare deck on the far roofs'),
    photo(24, 'The far roofs down to the bare deck, with new sheets of plywood beside the slatted opening and rolls ready to go'),
    photo(27, 'The two end roofs at an angle, the old roofing gone down to the deck and rolls of base sheet laid out'),
    photo(28, 'Straight down on the two far roofs: bare deck, the skylights, the AC units and the first runs of base sheet'),
    photo(34, 'Straight-down view of the whole row: base sheet on most roofs, the far ones down to the bare deck'),
    photo(1, 'Angled view down the row of townhomes from one end: the near roofs finished in white cap sheet, the crew at work on the far roofs'),
    photo(6, 'The end of the row from above the parking lot: black Polyglass base sheet on the nearest roofs, white cap sheet farther along'),
    photo(10, 'Looking down the middle of the row, where the white cap sheet meets the black base sheet and the crew lays the next rows'),
    photo(13, 'A close view of the white cap sheet laps, a skylight curb and a roofer working next to the AC unit'),
    photo(16, 'A close view of the Polyglass base sheet, the rolls ready to go, the flashed curbs under the two AC units and new pipe flashings'),
    photo(36, 'The finished townhomes from above the courtyard gate, every roof in a new white cap sheet'),
    photo(37, 'The end of the row at an angle, the finished white roofs with their AC units, skylights and slatted terraces'),
    photo(38, 'The finished row from the corner, white cap sheet run out to every edge and around each AC unit'),
    photo(39, 'Straight-down view of the whole row finished in white, from above the courtyard'),
    photo(41, 'Twin skylights after the job, the cap sheet wrapped up their curbs and the pipes sealed beside them'),
    photo(42, 'Two AC units on their curbs, the cap sheet carried up around their bases and the refrigerant lines sealed'),
    photo(43, 'An AC unit beside a skylight, with the cap sheet laps sealed where the roof levels meet'),
    photo(44, 'A skylight between two slatted openings, the cap sheet turned up at its curb and at the edges of the openings'),
  ],
  paragraphs: [
    'This townhome flat roof replacement in West Hollywood 90046 covered a row of attached townhomes, each with its own flat roof, rooftop AC unit, skylight and open slatted sections over the terraces. Our roofers re-roofed them with a Polyglass base sheet and a white granulated cap sheet, working across the row one roof at a time.',
    'The day before, the old roofing came off down to the wood deck, one roof at a time, and the debris went down a chute into the courtyard instead of past anyone’s door. With the deck bare, new sheets of plywood went in where it needed them before anything covered it.',
    'Every roof got a black Polyglass base sheet first, Elastoflex SA V, a self-adhered sheet, run across the roof, out to the edges and up around the curbs. It is the first layer of the new roof, and the photos show it in place on the roofs the crew had not yet finished, with the rolls staged beside the skylights.',
    'The white cap sheet went on over the base sheet in long rows, each overlapping the one before it, and our roofers sealed every lap by hand. The finished roofs read as one clean white surface from above, with no loose edges at the parapets or around the slatted openings. Our [flat roof replacement](/residential-roofing/flat-roofing/replacement/) page explains how we build these roofs.',
    'A flat roof leaks most often where something goes through it, and these roofs have a lot: an AC unit on a curb, a skylight, plumbing vents and the edges of the slatted openings on every home. Each AC curb was flashed in metal, each skylight curb was wrapped, and the pipe vents got new flashings before the cap sheet went on around them.',
    'With homes side by side and a walkway between the buildings, the crew brought the rolls and tools up with a scissor lift from the walkway instead of carrying them through anyone’s home. The roofs were finished one after another, so in the photos the finished white roofs sit beside the ones still at the base sheet stage.',
    'A week later the row was finished: a white cap sheet on every roof, wrapped up the skylight and AC curbs and run out to the edges of the slatted terraces, so each home reads as one clean white roof from above. A white surface reflects much of the sun instead of soaking it up, which helps the top floor of a three-story townhome. Read more about [cool roofing](/residential-roofing/cool-roofing/).',
    'Own a townhome or manage a row of them in West Hollywood or nearby? Our roofers handle [flat roof replacement](/residential-roofing/flat-roofing/replacement/) for [HOA and multi-family](/residential-roofing/hoa-multi-family/) properties, with a written scope and price before any work, from our office in [West Hollywood](/service-areas/la-county/west-hollywood/). [Contact us](/contact-us/) to start with a roof evaluation.',
  ],
};
