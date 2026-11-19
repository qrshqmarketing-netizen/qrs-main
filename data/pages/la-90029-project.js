// Project page: a two-story commercial building in Los Angeles 90029 (owner: a commercial project, November 19 2026) (the East Hollywood area, by the drone's GPS) with a new white cap sheet on its
// flat roof, wrapped up and over the parapet walls, including the stepped parapet on the street side (from the owner's drone photos, November 19
// 2026; one flight on June 11 2026, all of the finished roof). 12 of the 15 photos, in the order taken: left out a near-repeat of the back, a close
// view of the street with a person in it, and a close-up of the two curbs topped with plywood (their purpose isn't known, so the page doesn't
// describe them). No plate or house number is readable. No brand was named, so the page names none. Photos in
// public/images/projects/flat-roof-replacement-los-angeles-90029/ (WebP, 1800px). The map pin is the center of the ZIP code.
import { mediaUrl } from '@/lib/media';

const DIR = 'projects/flat-roof-replacement-los-angeles-90029/flat-los-angeles-90029-';
const photo = (n, alt) => ({ src: mediaUrl(`${DIR}${String(n).padStart(2, '0')}.webp`), alt });

export const LA_90029_PROJECT = {
  path: '/projects/flat-roof-replacement-los-angeles-90029/',
  keyword: 'commercial flat roof replacement in Los Angeles',
  title: 'Commercial Flat Roof Replacement in Los Angeles 90029',
  metaTitle: 'Commercial Flat Roof Replacement in Los Angeles 90029',
  description:
    'Commercial flat roof replacement in Los Angeles 90029: a two-story building with a new white cap sheet over its stepped parapet, skylights and vents sealed.',
  image: mediaUrl(`${DIR}01.webp`), // the building from above the side yard, the whole white roof and the stepped parapet in view; also the first photo
  imageAlt: 'Aerial view of a two-story commercial building in Los Angeles 90029 with a new white flat roof and a stepped parapet along the street',
  // Short name for the "Recent projects" links on the pages this project is listed under (`related`)
  label: 'Commercial flat roof, Los Angeles 90029',
  related: [
    '/commercial-roofing/replacement/',
    '/commercial-roofing/repair/',
    '/commercial-roofing/',
    '/service-areas/la-county/los-angeles/',
  ], // shown as "Related services" here, and this project is linked back from them
  // An H2 above the paragraph at each position below (they describe the paragraphs, nothing is added to the story)
  headings: {
    1: 'A white cap sheet, edge to edge',
    2: 'Parapet walls wrapped, not just met',
    3: 'Skylights, vents and pipes sealed',
    4: 'Commercial roofing in Los Angeles',
  },
  // The photo after each chapter (index in `photos`)
  chapterPhotos: { 1: 4, 2: 6, 3: 9 },
  place: 'Los Angeles, CA 90029',
  // Map pin on /projects/: the center of the ZIP code, not the building's address, so the client's address stays private
  geo: [34.0896, -118.2945],
  // Photo slider and gallery, in the order taken (one flight, June 11 2026)
  photos: [
    photo(1, 'Aerial view of a two-story commercial building in Los Angeles 90029 with a new white flat roof and a stepped parapet along the street'),
    photo(2, 'The building from the other corner, the white cap sheet run out to the parapet on every side'),
    photo(3, 'The back of the roof, with the cap sheet carried up the low parapet wall and over its top'),
    photo(4, 'The roof from above the side walkway, the skylights and vents set into the new white cap sheet'),
    photo(5, 'Looking across the roof from the back, the laps of the cap sheet running in long rows to the far wall'),
    photo(6, 'The street side of the roof, where the cap sheet climbs the stepped parapet'),
    photo(7, 'A corner of the stepped parapet up close, wrapped in the same white cap sheet as the roof'),
    photo(8, 'The cap sheet laps and the parapet edge up close, with a pipe sealed where it comes through'),
    photo(9, 'Two curb skylights, the older peaked skylights and a vent hood, each sealed into the new roof'),
    photo(10, 'The two peaked skylights and two curb skylights, the cap sheet carried up around each curb'),
    photo(11, 'Straight-down view of the whole roof, with the stepped parapet along the street side'),
    photo(12, 'Straight-down view from the other side, the white roof beside the neighbors’ older roofs'),
  ],
  paragraphs: [
    'This commercial flat roof replacement in Los Angeles 90029 covered a two-story commercial building in the East Hollywood area: one flat roof inside a parapet wall, with a stepped parapet along the street side. Our roofers covered the whole roof in a new white cap sheet, from wall to wall.',
    'The cap sheet runs in long rows across the roof, each lap over the one before it, out to the parapet walls on all four sides. From above it reads as one clean white surface beside the dark, older roofs next door, and a white surface reflects much of the sun instead of soaking it up, which helps keep the upper floor cooler.',
    'Where a flat roof meets a parapet wall is one of the places it most often leaks. Here the cap sheet turns up the inside of the walls and over their tops, including every step of the stepped parapet along the street, so the walls are sealed in the same white as the roof instead of ending at a seam at their base.',
    'The roof carries four skylights, two newer curb skylights and two older peaked ones, plus vent hoods and plumbing pipes. Each one is sealed where it comes through the cap sheet, with the sheet carried up around the skylight curbs. Our [commercial roof replacement](/commercial-roofing/replacement/) page explains how we plan and build these roofs.',
    'Own or manage a commercial building in East Hollywood, Silver Lake or elsewhere in [Los Angeles](/service-areas/la-county/los-angeles/)? Our roofers handle [commercial roof replacement](/commercial-roofing/replacement/) and [commercial roof repair](/commercial-roofing/repair/), and every job starts with a roofer-led roof survey and a written scope and price before any work. [Contact us](/contact-us/) to request yours.',
  ],
};
