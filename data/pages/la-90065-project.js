// Project page: a partial shingle roof replacement on a single-story home in Northeast Los Angeles 90065, plus its detached garage (owner,
// November 24 2026, from the owner's outline of the job chat and 17 drone photos of the finished roof). Facts from the outline: about 15 squares
// on the main house plus the garage roof, one layer torn off, standard pitch with a small low-slope section, two days on site, the wing that
// carries the solar array left untouched (tie-ins at the ridgeline, the rest of the roof photographed for the homeowner at their request),
// Owens Corning shingles in the closest available match to the existing brown, DeckDefense synthetic underlayment with ice and water
// protection, peel-and-stick membrane on the low-pitch section, low-profile O'Hagin vents, a black adjustable spark arrestor on the chimney,
// color-matched drip edge, California-cut valleys, damaged plywood and a 1x12 board replaced with same-day approval, a missing fastener
// delivery sorted the same day, accessories finished on site to match, materials carried up by hand. Not on the page: the address, names,
// prices, a homeowner quote (the outline had none; add a real one if the owner sends it), the job's dates. The photos are all of the finished
// roof (no before or during shots were sent), so there is no before-and-after wipe; a car's plate is blurred in photo 1. Photos in
// public/images/projects/partial-shingle-roof-replacement-los-angeles-90065/ (WebP, 1024px, the size they came in). The map pin is the
// center of the ZIP code.
import { mediaUrl } from '@/lib/media';

const DIR = 'projects/partial-shingle-roof-replacement-los-angeles-90065/partial-shingle-los-angeles-90065-';
const photo = (n, alt) => ({ src: mediaUrl(`${DIR}${String(n).padStart(2, '0')}.webp`), alt });

export const LA_90065_PROJECT = {
  path: '/projects/partial-shingle-roof-replacement-los-angeles-90065/',
  keyword: 'partial shingle roof replacement',
  title: 'Partial Shingle Roof Replacement in Northeast Los Angeles 90065',
  metaTitle: 'Partial Shingle Roof Replacement in Northeast LA 90065',
  description:
    'Partial shingle roof replacement in Northeast LA 90065: Owens Corning shingles color-matched to the roof around a solar array, finished in two days.',
  image: mediaUrl(`${DIR}01.webp`), // the home from above the front corner: the new brown roof, the solar wing and the detached garage
  imageAlt: 'Aerial view of a single-story home in Northeast Los Angeles 90065 with a new brown shingle roof beside its solar panels',
  // Short name for the "Recent projects" links on the pages this project is listed under (`related`)
  label: 'Partial shingle roof, Northeast LA 90065',
  related: [
    '/residential-roofing/shingle-roofing/replacement/',
    '/residential-roofing/shingle-roofing/',
    '/residential-roofing/attic-ventilation/',
    '/service-areas/la-county/los-angeles/',
  ], // shown as "Related services" here, and this project is linked back from them
  // An H2 above the paragraph at each position below (they describe the paragraphs, nothing is added to the story)
  headings: {
    1: 'One layer off, and a sound deck under it',
    2: 'Underlayment, and extra protection where water drains slowly',
    3: 'Shingles matched to the roof that stayed',
    4: 'Low-profile vents and a spark arrestor',
    5: 'Two days, materials carried up by hand',
    6: 'Photos of the whole roof',
    7: 'Roofing in Northeast Los Angeles',
  },
  // The photo after each chapter (index in `photos`)
  chapterPhotos: { 1: 3, 2: 6, 3: 9, 4: 12, 5: 14, 6: 5 },
  place: 'Los Angeles, CA 90065',
  // Map pin on /projects/: the center of the ZIP code, not the home's address, so the client's address stays private
  geo: [34.1077, -118.2262],
  // Photo slider and gallery: the whole house, the main roof up close, the chimney, then the garage
  photos: [
    photo(1, 'Aerial view of a single-story home in Northeast Los Angeles 90065 with a new brown shingle roof beside its solar panels'),
    photo(2, 'The home from above the other front corner, the new shingles, the solar wing behind them and the chimney at the side'),
    photo(3, 'The front of the house from above the driveway, the new roof meeting the solar wing at the ridgeline'),
    photo(4, 'Straight down on the house: the new roof, the solar wing and the detached garage at the back'),
    photo(5, 'Straight down from the other side, the whole roof and the garage in one view'),
    photo(6, 'The house from above the street, the new roof and the solar panels side by side'),
    photo(7, 'The front slope up close, its shingle courses, a capped hip, a valley and two low-profile vents'),
    photo(8, 'A low-profile vent, a valley and the plumbing vents on their flashings beside the solar wing'),
    photo(9, 'A capped hip running up to the solar wing, with the vents set into the new courses'),
    photo(10, 'Where the new shingles meet the slope under the solar panels'),
    photo(11, 'The back slope with a low-profile vent and the plumbing vents, the chimney beyond'),
    photo(12, 'The brick chimney with its new black spark arrestor cap, the new shingles around its base'),
    photo(13, 'The chimney cap up close: a black adjustable flue guard with mesh sides'),
    photo(14, 'The detached garage re-roofed to match, its hips capped in the same shingles'),
    photo(15, 'The garage roof from above the yard, four slopes meeting at the top'),
    photo(16, 'Straight down on the garage roof, its hips and courses even'),
    photo(17, 'The garage roof from the back corner, the shingle courses running to the eaves'),
  ],
  paragraphs: [
    'This partial shingle roof replacement in Northeast Los Angeles 90065 covered about 15 squares on the main house, roughly 1,500 square feet, plus the roof of the detached garage. The wing of the house that carries the solar array stayed exactly as it was, so the new roof had to tie in to it at the ridgeline and blend with the shingles that stayed. Our roofers finished the work in two days.',
    'The house had one layer of old roofing, and it came off down to the wood deck. With the deck bare, the tear-off showed damaged decking: our roofers replaced the plywood and a 1x12 board, the homeowner approved the extra work the same day, and the job kept moving.',
    'New Owens Corning DeckDefense synthetic underlayment went over the deck, with ice and water protection. A synthetic underlayment resists tearing while the roof goes on and holds up to moisture better than old-style felt. Most of the roof is a standard pitch, but one small section is low-slope, where water drains slowly, so it got a peel-and-stick membrane for added waterproofing before the shingles.',
    'The homeowner wanted the new roof to blend with the shingles that stayed on the solar wing, so the new shingles are Owens Corning in the closest available match to the existing brown, with a drip edge in a matching color. A few accessories arrived in a color that didn’t match, and our roofers finished them on site to match the shingles. The valleys are California-cut, a clean, closed line where two slopes meet, and the ridgeline tie-ins next to the solar wing were made without touching it.',
    'Attic ventilation is now low-profile O’Hagin vents, which move air out of the attic while keeping the roofline sleek. The chimney got a black adjustable flue guard, a spark arrestor that helps keep embers in and debris and animals out, worth having on any home in fire-conscious Los Angeles. Read more about [attic ventilation](/residential-roofing/attic-ventilation/).',
    'There was limited access to the roof, so every bundle and roll was carried up by hand. On the first day our roofers tore off the old roof, repaired the deck, laid the underlayment and started the shingles. When a fastener delivery came up short, it was sorted out the same day. By the morning of the second day the shingles were finished, the vents and chimney cap were on and the site was cleaned up.',
    'At the homeowner’s request, our roofers photographed the parts of the roof that weren’t being replaced, including the ridgeline beside the solar panels, so there is a clear record of the rest of the roof. Progress photos came in through each workday, and a final set of completion photos went to the homeowner for their records.',
    'Need a roof replacement that works around your solar panels? Homeowners in Mount Washington, Glassell Park, Cypress Park and elsewhere in [Los Angeles](/service-areas/la-county/los-angeles/) can count on our roofers for [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/) and [shingle roof repair](/residential-roofing/shingle-roofing/repair/). Request a [free roof evaluation](/contact-us/) to start.',
  ],
};
