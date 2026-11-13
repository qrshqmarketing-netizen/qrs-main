// Project page: multi-family roof replacement in Los Angeles 90020 (from the owner's drone photos, November 13 2026): a building with a pitched
// roof around a central courtyard, re-roofed in Owens Corning shingles, with the flat roof along its edge done in a Polyglass system and carried
// up the parapet walls. All photos show the finished roof. Photos in public/images/projects/multi-family-shingle-flat-roof-los-angeles-90020/
// (WebP, 1800px long side). The client's address stays off the page: the map pin is the center of the ZIP code.
import { mediaUrl } from '@/lib/media';

const DIR = 'projects/multi-family-shingle-flat-roof-los-angeles-90020/multi-family-los-angeles-90020-';
const photo = (n, alt) => ({ src: mediaUrl(`${DIR}${String(n).padStart(2, '0')}.webp`), alt });

export const LA_90020_PROJECT = {
  path: '/projects/multi-family-shingle-flat-roof-los-angeles-90020/',
  keyword: 'multi-family roof replacement',
  title: 'Multi-Family Shingle & Flat Roof Replacement in Los Angeles 90020',
  metaTitle: 'Multi-Family Roof Replacement in Los Angeles 90020',
  description:
    'Multi-family roof replacement in Los Angeles 90020: new Owens Corning shingles around the courtyard and a Polyglass flat roof along the edges and parapet walls.',
  image: mediaUrl(`${DIR}04.webp`), // the whole roof from above, straight on; also the first photo in `photos`
  imageAlt: 'Aerial view of a multi-family building in Los Angeles with a new gray shingle roof around a courtyard tree and a white flat roof along the street side',
  // Short name for the "Recent projects" links on the pages this project is listed under (`related`)
  label: 'Multi-family shingle and flat roof, Los Angeles 90020',
  related: [
    '/residential-roofing/shingle-roofing/replacement/',
    '/residential-roofing/flat-roofing/replacement/',
    '/residential-roofing/hoa-multi-family/',
    '/residential-roofing/attic-ventilation/',
    '/service-areas/la-county/los-angeles/',
  ], // shown as "Related services" here, and this project is linked back from them
  // An H2 above the paragraph at each position below (they describe the paragraphs, nothing is added to the story)
  headings: {
    1: 'New shingles around the courtyard',
    2: 'A white flat roof along the edges',
    3: 'Every vent, pipe and skylight flashed',
    4: 'Multi-family roofing in Los Angeles',
  },
  // The photo after each chapter (index in `photos`)
  chapterPhotos: { 1: 2, 2: 7, 3: 5, 4: 3 },
  place: 'Los Angeles, CA 90020',
  // Map pin on /projects/: the center of the ZIP code, not the building's address, so the client's address stays private
  geo: [34.0667, -118.3085],
  // Photo slider and gallery, in the order shown
  photos: [
    photo(4, 'Aerial view of a multi-family building in Los Angeles with a new gray shingle roof around a courtyard tree and a white flat roof along the street side'),
    photo(10, 'Straight-down view of the finished roof: new shingles on every slope around the courtyard, with vents, pipes and skylights evenly placed'),
    photo(8, 'The building from above, with the new shingle roof wrapping the courtyard and the flat roof edge in white along the street'),
    photo(9, 'Angled aerial view of the new hip roof, its ridges and valleys running clean around the courtyard'),
    photo(11, 'Another angled view of the finished roof, with the white flat roof along the front edge and the neighboring buildings around it'),
    photo(7, 'Where the new shingle roof meets the white flat roof at a parapet corner, with a vent pipe on a flashed base'),
    photo(1, 'A close view of the white Polyglass flat roof carried up the parapet wall, with the new shingle roof beside it and a vent in the foreground'),
    photo(3, 'The white flat roof beside the new shingles, with sealed laps and a plumbing vent flashed through the membrane'),
    photo(5, 'Long rows of white membrane with sealed laps along the parapet, beside the new gray shingles'),
    photo(6, 'The white flat roof and parapet wall in full, with every lap and seam sealed along the edge'),
    photo(2, 'The white parapet and flat roof edge above the street, seen from the side of the new shingle roof'),
  ],
  paragraphs: [
    'This multi-family roof replacement in Los Angeles 90020 gave a building with two kinds of roof one clean, consistent finish. Our roofers re-roofed the pitched sections in new Owens Corning shingles and rebuilt the flat roof along the edges in a Polyglass system, carried up the parapet walls.',
    'The shingle roof is a hip roof that steps around an open courtyard, so it has a lot of ridges and valleys. The new shingles run in even courses from the eave up, the ridges and hips are finished clean, and the valleys flow into the courtyard side without a break in the pattern.',
    'The flat roof sits along the edge of the building, behind the parapet walls, and that is where water most often finds a way in. The Polyglass roof is white, laid in rows with sealed laps, and carried up the wall so the corner where roof meets parapet is covered as one piece. Our [flat roof replacement](/residential-roofing/flat-roofing/replacement/) page explains how we build these.',
    'A roof like this has a lot of things going through it, and every one is a place to seal. The plumbing vents, exhaust vents and box vents spread across the slopes and the skylights were each flashed into the new roof, so the roof drains clear of all of them and the attic can still breathe. Read more about [attic ventilation](/residential-roofing/attic-ventilation/).',
    'Own or manage a multi-family building in Los Angeles, Koreatown, Mid-Wilshire or nearby? Our roofers handle [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/) and [flat roof replacement](/residential-roofing/flat-roofing/replacement/) for [HOA and multi-family](/residential-roofing/hoa-multi-family/) properties across [Los Angeles](/service-areas/la-county/los-angeles/), with a written scope and price before any work. [Contact us](/contact-us/) to start with a roof evaluation.',
  ],
};
