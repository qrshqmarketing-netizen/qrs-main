// Project page: shingle roof replacement under a solar array in Pico Rivera 90660 (from the owner's job photos, October 6 to 13, 2026: the array
// documented and measured, the old roof and its plank deck opened up, the panels taken down and stored, new sheathing, Owens Corning DeckDefense
// underlayment and flashed mounting points, new shingles, the array put back and checked). Its photos are in public/images/projects/
// shingle-roof-replacement-solar-pico-rivera-90660/ (a copy for the Supabase bucket is in upload-to-supabase/, see lib/media.js). The story says
// what the photos show; it doesn't say who did the electrical side of the solar work.
import { mediaUrl } from '@/lib/media';

const DIR = 'projects/shingle-roof-replacement-solar-pico-rivera-90660/solar-shingle-pico-rivera-90660-';
const photo = (n, alt) => ({ src: mediaUrl(`${DIR}${String(n).padStart(2, '0')}.webp`), alt });

export const PICO_RIVERA_PROJECT = {
  path: '/projects/shingle-roof-replacement-solar-pico-rivera-90660/',
  keyword: 'roof replacement under solar panels',
  metaTitle: 'Roof Replacement Under Solar Panels, Pico Rivera', // short enough for " | QRS" (owner, October 27 2026)
  title: 'Roof Replacement Under Solar Panels in Pico Rivera 90660',
  description:
    'Roof replacement under solar panels in Pico Rivera 90660: the array measured and stored, the deck made solid, flashed mounts and new shingles.',
  image: mediaUrl(`${DIR}33.webp`), // the finished roof with the array back on it
  imageAlt: 'The solar array back on the new brown shingle roof of a home in Pico Rivera, with the neighborhood behind it',
  // Map pin on /projects/: the center of the ZIP code, not the home's address, so the client's address stays private
  // Short name for the "Recent projects" links on the service pages this project is listed under (`related`)
  label: 'Roof replacement under solar, Pico Rivera 90660',
  related: ['/residential-roofing/shingle-roofing/replacement/', '/service-areas/la-county/'], // service and county pages: shown as "Related services" here, and this project is linked back from them
  // An H2 above the paragraph at each position below (they describe the paragraphs, nothing is added to the story)
  headings: {
    1: 'Measured and documented before anything came off',
    2: 'A plank deck with gaps, made solid again',
    3: 'Panels down, stored safe in the yard',
    4: 'New underlayment and flashed mounting points',
    5: 'New shingles, and the array back where it was',
    6: 'Roofing in Pico Rivera and the Gateway Cities',
  },
  // The photo after each chapter (index in `photos`): the marked array position, the gapped plank deck, the panels stored in the yard, the flashed
  // mounting points, the rails back on the new shingles
  chapterPhotos: { 1: 6, 2: 9, 3: 19, 4: 20, 5: 27 },
  place: 'Pico Rivera, CA 90660',
  geo: [33.989, -118.089],
  // Photo slider and gallery, in job order (October 6 to 13)
  photos: [
    photo(1, 'Aerial view at the start of the job: the solar array on the lower roof, with new sheathing going down around it and the neighborhood beyond'),
    photo(2, 'Straight-down view of the home: the solar array in the middle, new sheathing around it and the old plank deck still showing on the upper roof'),
    photo(3, 'The solar equipment on the side of the house: the meter, the disconnects and the conduit running up to the roof'),
    photo(4, 'A clamp meter reading taken at the solar circuit before the array came off'),
    photo(5, 'A tape measure from the roof vent to the edge of the array, recording where the panels sit before they come off'),
    photo(6, 'The edge of the array, with new sheathing laid over the old plank deck beside it'),
    photo(7, 'Chalk lines and a tape measure on the new sheathing, marking the array’s position on the roof'),
    photo(8, 'The array over the old dark shingles, with the junction box and wiring under the panels'),
    photo(9, 'The old roof deck: wide wood planks with gaps between them, next to a new sheet of OSB'),
    photo(10, 'A tape measure across the gaps in the old plank deck where the new sheathing meets it'),
    photo(11, 'A roofer measuring an open gap in the old plank deck beside the new sheathing'),
    photo(12, 'The first panels lifted off, with the rails, microinverters and wiring left on the old shingles'),
    photo(13, 'Panels coming off the array row by row, with new sheathing already down at the roof’s edge'),
    photo(14, 'The last panels on the rails, with the microinverters and cables exposed underneath'),
    photo(15, 'Rails and microinverters with only a few panels left on them'),
    photo(16, 'The old shingles where the array stood, with the original mounting points showing as they are torn off'),
    photo(17, 'The old shingles under the array coming off, with the original mounts and new sheathing along the edge'),
    photo(18, 'The array area stripped back toward the new sheathing, with the old mounting points still in place'),
    photo(19, 'The work area from above: the yard, the side passage and the rails set aside'),
    photo(20, 'The solar panels stacked flat on boards in the yard, under a blue tarp and kept clear of the work'),
    photo(21, 'The whole roof in Owens Corning DeckDefense synthetic underlayment, with new flashed mounting points set in rows'),
    photo(22, 'Underlayment across the roof and the new shingle bundles staged on the ridge'),
    photo(23, 'Rows of new flashed mounting points over the underlayment where the array will go back'),
    photo(24, 'The underlayment and mounting points down the length of the roof'),
    photo(25, 'Close view of the flashed mounting points set into the new underlayment'),
    photo(26, 'The solar junction box on the roof, with its wiring connected again'),
    photo(27, 'New brown shingles on the roof, with the rails and microinverters back on the new mounts'),
    photo(28, 'Rails running across the new shingles, each microinverter fixed in its place'),
    photo(29, 'The rails and microinverters in rows on the new shingle roof, ready for the panels'),
    photo(30, 'The full set of rails along the roof, wired and ready, beside the lower roof below'),
    photo(31, 'The panels back on the new roof, in the same rows as before'),
    photo(32, 'The finished array on the new shingle roof, seen from the side with the yard and the trees behind'),
    photo(33, 'The solar array back on the new brown shingle roof of a home in Pico Rivera, with the neighborhood behind it'),
    photo(34, 'The array and the new shingles from the ridge, with the street and the palms beyond'),
    photo(35, 'Looking down the new roof to the array, with the vents set into the shingles around it'),
    photo(36, 'The finished roof and array at the end of the job, with the neighborhood stretching away'),
    photo(37, 'A clamp meter reading at the solar circuit after the array was back on the roof'),
  ],
  paragraphs: [
    'This home in Pico Rivera 90660 had a solar array on a roof that was ready to be replaced. A roof replacement under solar panels is two jobs that have to fit together: the panels have to come off and go back exactly where they were, and the new roof underneath has to be built to last as long as the array sits on it. Our roofers took this roof from the old dark shingles to new brown shingles, and the array went back on top.',
    'Nothing came off before it was written down. The solar equipment on the side of the house was photographed, a reading was taken at the solar circuit, and the array’s position was measured from the roof vents and the edges of the roof, then marked on the deck, so the panels could go back in the same place.',
    'Opening the roof showed what the shingles had been hiding. The old roof was laid over wide wood planks with gaps between them, some of them open all the way through. Our roofers laid new OSB sheathing over the plank deck, so the new roof has a solid, continuous base under every shingle and under every mounting point.',
    'The panels came off the rails row by row, and the rails and microinverters came off after them. The panels were stacked flat on boards in the yard, under a tarp and away from the work, until the roof was ready for them. Then the old shingles where the array had stood came off, along with the original mounting points.',
    'With the deck solid, the whole roof went into Owens Corning DeckDefense synthetic underlayment. New mounting points went in at the measured spots, each one flashed into the roof before a single shingle was laid, because every bolt that holds a solar rail is a hole in the roof that has to stay dry.',
    'New brown shingles went on as part of our *TotalShield* Shingle System, around the vents and up to the ridge. The rails and microinverters went back on the new mounts, the wiring was connected again in the junction box, and the panels went back in their rows. A second reading at the solar circuit was taken once the array was back on the roof.',
    'Have solar panels and a roof that needs replacing in Pico Rivera, Whittier, Downey, Montebello or elsewhere in the Gateway Cities? Our roofers handle [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/) across [Los Angeles County](/service-areas/la-county/), and solar companies can [work with us](/contractors/) on the roof around their installs. Homeowners can request a [free roof evaluation](/contact-us/) anywhere in our service area.',
  ],
};
