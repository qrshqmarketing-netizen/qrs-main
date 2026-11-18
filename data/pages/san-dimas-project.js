// Project page: a single-story home on a corner lot in San Dimas 91773 re-roofed in light gray architectural shingles (from the owner's drone
// photos, November 18 2026; the flight is from September 22 2026, GPS in San Dimas). Only 2 of the photos the owner sent are from this job
// (DJI_0604 and 0610); the other 18 were taken in East Los Angeles 90063 and are on their own page (east-los-angeles-project.js), the owner's
// choice. The street sign at the corner is blurred in photo 1. The brown flat roof over the patio is not described: the owner didn't say it was
// part of the job. No brand was named, so the page names none. Photos in public/images/projects/shingle-roof-replacement-san-dimas-91773/
// (WebP, 1800px). The map pin is the center of the ZIP code. Add the rest of the flight (DJI_0605-0609) here when the owner sends it.
import { mediaUrl } from '@/lib/media';

const DIR = 'projects/shingle-roof-replacement-san-dimas-91773/shingle-san-dimas-91773-';
const photo = (n, alt) => ({ src: mediaUrl(`${DIR}${String(n).padStart(2, '0')}.webp`), alt });

export const SAN_DIMAS_PROJECT = {
  path: '/projects/shingle-roof-replacement-san-dimas-91773/',
  keyword: 'shingle roof replacement in San Dimas',
  title: 'Shingle Roof Replacement in San Dimas 91773',
  metaTitle: 'Shingle Roof Replacement in San Dimas 91773',
  description:
    'Shingle roof replacement in San Dimas 91773: a single-story corner-lot home and its side wing re-roofed in light gray architectural shingles, every vent flashed.',
  image: mediaUrl(`${DIR}01.webp`), // the house from above the side yard, both roofs and the chimney in view; also the first photo in `photos`
  imageAlt: 'Aerial view of a single-story home in San Dimas with a new light gray architectural shingle roof over the house and the wing beside the driveway',
  // Short name for the "Recent projects" links on the pages this project is listed under (`related`)
  label: 'Shingle roof replacement, San Dimas 91773',
  related: [
    '/residential-roofing/shingle-roofing/replacement/',
    '/residential-roofing/shingle-roofing/',
    '/residential-roofing/attic-ventilation/',
    '/service-areas/la-county/',
  ], // shown as "Related services" here, and this project is linked back from them
  // An H2 above the paragraph at each position below (they describe the paragraphs, nothing is added to the story)
  headings: {
    1: 'Two roofs, one shingle',
    2: 'Vents, pipes and the chimney',
    3: 'Roofing in San Dimas',
  },
  // The photo after each chapter (index in `photos`)
  chapterPhotos: { 1: 1 },
  place: 'San Dimas, CA 91773',
  // Map pin on /projects/: the center of the ZIP code, not the home's address, so the client's address stays private
  geo: [34.1072, -117.8167],
  // Photo slider and gallery, in the order taken
  photos: [
    photo(1, 'Aerial view of a single-story home in San Dimas with a new light gray architectural shingle roof over the house and the wing beside the driveway'),
    photo(2, 'Straight-down view of the property: the main roof and the side wing meeting in a valley, with the vents and pipes on one slope'),
  ],
  paragraphs: [
    'This shingle roof replacement in San Dimas 91773 covered a single-story home on a corner lot: the main roof over the house and the wing beside the driveway. Our roofers re-roofed both in new light gray architectural shingles, so the whole house reads as one roof from the street.',
    'The two roofs meet in a valley where the side wing joins the house, and the shingles are cut cleanly along it. Every slope is laid in even courses from the eave up, and the ridges are capped in matching shingles.',
    'One slope of the main roof carries most of its vents and plumbing pipes, and each one sits on its own flashing, set into the shingle courses. The brick chimney at the end of the house rises through the new roof. Read more about [attic ventilation](/residential-roofing/attic-ventilation/).',
    'Own a home in San Dimas or elsewhere in the San Gabriel Valley? Our roofers handle [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/) and [shingle roof repair](/residential-roofing/shingle-roofing/repair/) across [Los Angeles County](/service-areas/la-county/). Homeowners can request a [free roof evaluation](/contact-us/) to start.',
  ],
};
