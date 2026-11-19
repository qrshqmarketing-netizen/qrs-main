// Project page: a clay tile lift and relay on a two-story townhome in Garden Grove 92841 (from the owner's drone photos, November 18 2026; one
// flight on August 14 2026). Only DJI_0960-0973 are this job, all taken while the work was under way: the tiles lifted and stacked, new
// underlayment, new valley metal and pipe flashings. DJI_0974-0986, from the same flight, show another unit about 65 m north (the umbrella
// courtyard) with no work going on; the owner chose to leave them out. There are no finished photos yet, so there is no before-and-after wipe;
// add them (and a wipe) when the owner sends them. The truck's rear plate is pixelated in photo 3 (unreadable anyway). The underlayment's brand
// shows on the rolls but the owner named none, so the page names none. Photos in
// public/images/projects/tile-lift-and-relay-garden-grove-92841/ (WebP, 1800px). The map pin is the center of the ZIP code.
import { mediaUrl } from '@/lib/media';

const DIR = 'projects/tile-lift-and-relay-garden-grove-92841/tile-garden-grove-92841-';
const photo = (n, alt) => ({ src: mediaUrl(`${DIR}${String(n).padStart(2, '0')}.webp`), alt });

export const GARDEN_GROVE_TILE_PROJECT = {
  path: '/projects/tile-lift-and-relay-garden-grove-92841/',
  keyword: 'tile lift and relay in Garden Grove',
  title: 'Clay Tile Lift and Relay in Garden Grove 92841',
  metaTitle: 'Clay Tile Lift and Relay in Garden Grove 92841',
  description:
    'Clay tile lift and relay in Garden Grove 92841: a townhome’s tiles lifted and stacked, new underlayment, valley metal and pipe flashings, the same tiles set back.',
  image: mediaUrl(`${DIR}02.webp`), // the front of the unit over its garages, tiles stacked and roofers laying underlayment (photo 2 in `photos`)
  imageAlt: 'Roofers laying new underlayment on a townhome in Garden Grove, the clay tiles lifted and stacked on the roof to go back on',
  // Short name for the "Recent projects" links on the pages this project is listed under (`related`)
  label: 'Clay tile lift and relay, Garden Grove 92841',
  related: [
    '/residential-roofing/tile-roofing/lift-and-relay/',
    '/residential-roofing/tile-roofing/',
    '/residential-roofing/hoa-multi-family/',
    '/service-areas/orange-county/',
  ], // shown as "Related services" here, and this project is linked back from them
  // An H2 above the paragraph at each position below (they describe the paragraphs, nothing is added to the story)
  headings: {
    1: 'Tiles off, stacked to go back on',
    2: 'New underlayment, valleys and pipe flashings',
    3: 'The same tiles, back in place',
    4: 'Tile roofing in Garden Grove',
  },
  // The photo after each chapter (index in `photos`)
  chapterPhotos: { 1: 3, 2: 9, 3: 12 },
  place: 'Garden Grove, CA 92841',
  // Map pin on /projects/: the center of the ZIP code, not the home's address, so the client's address stays private
  geo: [33.7867, -117.9806],
  // Photo slider and gallery, in the order taken (all during the job)
  photos: [
    photo(1, 'The townhome from above the alley: clay tiles lifted and stacked, new underlayment going down and the crew at work'),
    photo(2, 'Roofers laying new underlayment on a townhome in Garden Grove, the clay tiles lifted and stacked on the roof to go back on'),
    photo(3, 'The roof from above the alley, with the work truck and the debris trailer parked by the garages'),
    photo(4, 'Looking along the roof: strips of new underlayment between stacks of old clay tiles set aside to go back on'),
    photo(5, 'The back of the roof, with tiles lifted around the chimney and roofers working across the slope'),
    photo(6, 'The rear slopes from above the back patio, with the valleys opened up where the slopes meet'),
    photo(7, 'The back of the unit from the corner, the opened valleys beside the attached roofs left as they were'),
    photo(8, 'The roof from the other side, tiles stacked along the stripped section and the alley beyond'),
    photo(9, 'Roofers laying underlayment and flashing beside the chimney, with stacks of tile ready to go back on'),
    photo(10, 'New pipe flashings set out on the deck beside stacks of old clay tiles and the opened valleys'),
    photo(11, 'A slope still in tile beside the opened valley, swept clean as the work moved along'),
    photo(12, 'A lower tile roof beside the work, between the stucco walls, waiting its turn'),
    photo(13, 'Straight-down view of the roof in sections: some stripped to the deck with new underlayment, others still in tile'),
    photo(14, 'Straight-down view from above the alley, the whole roof mid-job with the crew, the stacked tiles and the trailer'),
  ],
  paragraphs: [
    'This clay tile lift and relay in Garden Grove 92841 covered a two-story townhome in a row of attached units, with its garages on the alley. On a tile roof the clay tiles usually outlast the underlayment beneath them, so instead of new tile, our roofers lifted the tiles off, put a new underlayment on the deck and set the same tiles back in place: our *SecondLife* tile lift and relay.',
    'The work moved across the roof one section at a time. Our roofers lifted the tiles by hand and stacked them on the roof beside the spot they came from, took the old underlayment off down to the wood deck and hauled the debris to the trailer in the alley. The rest of the roof stayed in tile until its turn, and the attached roofs on either side were left as they were.',
    'New underlayment went down in overlapping runs over the deck. Where the slopes meet, the valleys were opened up and new valley metal laid in, and every plumbing vent got a new pipe flashing before any tile went back over it. These are the places where a tile roof most often lets water through to the layer underneath.',
    'Once a section was covered, the original clay tiles went back on in their courses, so the roof keeps the color and the weathered look of the rest of the row. That is what a lift and relay gives a townhome: a new waterproof layer underneath, without new tiles that would stand out next to the neighbors. Read more about [tile lift and relay](/residential-roofing/tile-roofing/lift-and-relay/).',
    'Have a clay tile roof in Garden Grove or elsewhere in [Orange County](/service-areas/orange-county/)? Our roofers handle [tile lift and relay](/residential-roofing/tile-roofing/lift-and-relay/), [tile roof repair](/residential-roofing/tile-roofing/repair/) and [tile roof replacement](/residential-roofing/tile-roofing/replacement/), and homeowners can request a [free roof evaluation](/contact-us/) to start. For townhome communities, see [HOA and multi-family roofing](/residential-roofing/hoa-multi-family/).',
  ],
};
