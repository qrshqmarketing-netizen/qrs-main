// Project page: commercial flat roof replacement on a single-story commercial building in Westminster 92683 (from the owner's drone photos:
// the tear-off on September 14, 2026 and the new roof going on on September 17). The old gray cap sheet came off down to the plank deck, new
// plywood went in where the deck needed it, and the new roof is a torch-applied modified bitumen system: a Polyglass base sheet under a white
// granulated cap sheet, flashed at the curbs, vents and parapet walls. It is not TPO. The client's name is kept off the page: the building's sign is
// blurred in photos 4 and 10, and the photos where it is large were left out. Photos in public/images/projects/
// commercial-flat-roof-replacement-westminster-92683/, in time order, metadata stripped. No photo shows the roof fully finished yet.
import { mediaUrl } from '@/lib/media';

const DIR = 'projects/commercial-flat-roof-replacement-westminster-92683/commercial-flat-roof-westminster-92683-';
const photo = (n, alt) => ({ src: mediaUrl(`${DIR}${String(n).padStart(2, '0')}.webp`), alt });

export const WESTMINSTER_COMMERCIAL_PROJECT = {
  path: '/projects/commercial-flat-roof-replacement-westminster-92683/',
  keyword: 'commercial flat roof replacement',
  title: 'Commercial Flat Roof Replacement in Westminster 92683',
  description:
    'Commercial flat roof replacement in Westminster 92683: torn off to the deck, a new base sheet and a white cap sheet flashed at every curb and wall.',
  image: mediaUrl(`${DIR}14.webp`), // the cleanest finished view: rows of new white cap sheet along the parapet edge (owner's pick, October 28)
  imageAlt: 'Rows of new white cap sheet with sealed laps along the parapet edge of a commercial flat roof in Westminster',
  // Short name for the "Recent projects" links on the pages this project is listed under (`related`)
  label: 'Commercial flat roof replacement, Westminster 92683',
  related: ['/commercial-roofing/replacement/', '/commercial-roofing/warehouses/', '/service-areas/orange-county/'], // shown as "Related services" here, and this project is linked back from them
  // An H2 above the paragraph at each position below (they describe the paragraphs, nothing is added to the story)
  headings: {
    1: 'Torn off while the loading yard kept working',
    2: 'Down to the deck, and the deck made sound',
    3: 'A base sheet, then a white cap sheet',
    4: 'Flashed at every curb, vent and wall',
    5: 'Commercial roofing in Westminster and Orange County',
  },
  // The photo after each chapter (index in `photos`): the last of the old roof coming off, the bare plank deck with new plywood, the rows of
  // white cap sheet from above, the curbs and base sheet along the front wall
  chapterPhotos: { 1: 2, 2: 1, 3: 3, 4: 17 },
  // The same view of the building on the tear-off day and with the new cap sheet on
  reveal: { before: 0, after: 7, heading: 'From tear-off to a white roof' },
  place: 'Westminster, CA 92683',
  // Map pin on /projects/: the center of the ZIP code, not the building's address, so the client's address stays private
  geo: [33.752, -117.993],
  // Photo slider and gallery, in time order (September 14: tear-off; September 17: the new roof going on)
  photos: [
    photo(1, 'Tear-off day: the old roof stripped across most of the building, with torn base sheet over the wood deck and the skylights and AC units still in place'),
    photo(2, 'Close view of the stripped roof: the bare plank deck, a new sheet of plywood in the corner and piles of torn base sheet by the AC unit'),
    photo(3, 'Roofers tearing off the last section of the old gray cap sheet by the turbine vents, with the loading yard busy below'),
    photo(4, 'Straight-down view of the new white cap sheet in long rows, around the turbine vents, vent pipes and rooftop units'),
    photo(5, 'Rows of white cap sheet with sealed laps across the roof, with the AC units and rolls of cap sheet ready for the details'),
    photo(6, 'The angled end of the building from above, the white cap sheet carried to the roof edge'),
    photo(7, 'The new white cap sheet across the whole flat roof of a single-story commercial building in Westminster, with the loading yard and street around it'),
    photo(8, 'The building from the same spot as on the tear-off day, now under the new white cap sheet, with roofers at the far corner'),
    photo(9, 'The full length of the roof in white cap sheet, with the neighborhood beside the building'),
    photo(10, 'The side of the building with the white cap sheet finished to the roof edge above the wall'),
    photo(11, 'A parapet corner wrapped in white cap sheet, with flashing pieces laid out on the roof'),
    photo(12, 'Concrete blocks and flashing metal set on a protective sheet on the new roof, beside a propane tank and pieces of cap sheet'),
    photo(13, 'Two roofers flashing the parapet edge, with an AC unit and cut pieces of cap sheet nearby'),
    photo(14, 'Long rows of white cap sheet along the side wall, each lap sealed'),
    photo(15, 'The laps of the white cap sheet running toward a rooftop AC unit'),
    photo(16, 'Two roofers detailing the corner of the roof, with an AC unit and the staging sheet beside them'),
    photo(17, 'Roofers at the parapet corner finishing the edge, with a delivery truck in the yard below'),
    photo(18, 'A roofer walking the new cap sheet, with the exhaust curbs flashed and the black base sheet still showing along the front by the rooftop units'),
    photo(19, 'Straight-down view of the whole building with the white cap sheet on almost all of the roof and roofers still at work'),
  ],
  paragraphs: [
    'This commercial flat roof replacement in Westminster 92683 was on a long, single-story commercial building with a busy loading yard. Our roofers took the old gray cap sheet off down to the deck and built a new torch-applied modified bitumen roof: a base sheet, then a white granulated cap sheet, flashed at every rooftop unit, vent and wall.',
    'The tear-off went section by section. While the old roof came off down to the wood deck, the vans kept loading in the yard below.',
    'With the old roof off, the plank deck was in plain view. Where a section of the deck needed it, new plywood went in, so the new roof went down on a sound, continuous base.',
    'A Polyglass base sheet went down first, then the white cap sheet, torched in long rows with every lap sealed. The white surface reflects much of the sun that a dark roof soaks up, which matters on a building this size. Our guide to [torch-down roofing](/blog/torch-down-roofing-app-vs-sbs/) explains how these systems are built.',
    'A flat roof usually leaks where something goes through it or meets it, so the details got the most time. The cap sheet was carried up the parapet walls and around the corners, the AC curbs, exhaust curbs, vent pipes and turbine vents were flashed, and materials were staged on a protective sheet instead of on the new roof.',
    'Own or manage a commercial building in Westminster, Garden Grove, Fountain Valley, [Huntington Beach](/service-areas/orange-county/huntington-beach/) or elsewhere in [Orange County](/service-areas/orange-county/)? Our roofers handle [commercial roof replacement](/commercial-roofing/replacement/) and [warehouse roofing](/commercial-roofing/warehouses/) with a written scope and price before any work. [Contact us](/contact-us/) to set up a roof survey.',
  ],
};
