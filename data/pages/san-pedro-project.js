// Project page: multi-family shingle roof replacement in San Pedro. (The single-story San Pedro home is in san-pedro-full-roof-project.js.)
// Tear-off photos added November 18 2026 (owner: "only what is needed, just to show the deck work"): 5 of the 20 from the flight of
// August 19 2026 (DJI_0220, 0225, 0228, 0230, 0238), saved as san-pedro-tear-off-1..5.webp. The straight-down one (tear-off 5) pairs with the
// finished straight-down photo (3) in the before-and-after wipe. No plate or house number is readable.
export const SAN_PEDRO_PROJECT = {
  path: '/projects/shingle-roof-replacements-90731/',
  keyword: 'shingle roof replacement in San Pedro 90731',
  title: 'Multi-Family Shingle Roof Replacement in San Pedro 90731',
  description:
    'Shingle roof replacement in San Pedro 90731 on a two-story multi-family building: torn off to the deck, the deck repaired, new charcoal shingles on every hip.',
  image: '/images/projects/shingle-roof-replacements-90731/san-pedro-shingle-roof-replacement-3.webp', // also the first photo in `photos`
  imageAlt: 'Overhead drone view of the new charcoal shingle roof on a two-story multi-family building in San Pedro',
  // Map pin on /projects/: the center of the ZIP code, not the home's address, so the client's address stays private
  // Short name for the "Recent projects" links on the service pages this project is listed under (`related`)
  label: 'Multi-family shingle roof, San Pedro 90731',
  related: ['/residential-roofing/shingle-roofing/replacement/', '/residential-roofing/hoa-multi-family/', '/service-areas/la-county/los-angeles/'], // service and city pages: shown as "Related services" here, and this project is linked back from them
  // An H2 above the paragraph at each position below (they describe the paragraphs, nothing is added to the story)
  headings: { 1: 'Torn off to the deck', 2: 'Shingle roofing for homes and multi-family buildings in San Pedro' },
  // The photo after each chapter (index in `photos`)
  chapterPhotos: { 1: 2 },
  // The wipe: the straight-down tear-off photo gives way to the finished roof from the same spot
  reveal: { before: 4, after: 5 },
  place: 'San Pedro, CA 90731',
  geo: [33.7536, -118.2896],
  // Photo slider at the top of the page. Full-size originals: assets/originals/projects/
  photos: [
    { src: '/images/projects/shingle-roof-replacements-90731/san-pedro-tear-off-1.webp', alt: 'Roofers tearing the old shingles off the front building, with the two-story building behind it already stripped to the deck' },
    { src: '/images/projects/shingle-roof-replacements-90731/san-pedro-tear-off-2.webp', alt: 'The two-story multi-family building from the alley, its roof stripped down to the wood deck' },
    { src: '/images/projects/shingle-roof-replacements-90731/san-pedro-tear-off-3.webp', alt: 'The bare roof deck up close, with lighter sheets of plywood among the old ones and the vent openings ready for new vents' },
    { src: '/images/projects/shingle-roof-replacements-90731/san-pedro-tear-off-4.webp', alt: 'The crew pulling the old shingles off the front building and bagging the debris' },
    { src: '/images/projects/shingle-roof-replacements-90731/san-pedro-tear-off-5.webp', alt: 'Straight-down view mid tear-off: the two-story building down to the deck and the front building half stripped' },
    { src: '/images/projects/shingle-roof-replacements-90731/san-pedro-shingle-roof-replacement-3.webp', alt: 'Overhead drone view of the new charcoal shingle roof on a two-story multi-family building in San Pedro' },
    { src: '/images/projects/shingle-roof-replacements-90731/san-pedro-shingle-roof-replacement-1.webp', alt: 'Aerial view of the new charcoal shingle roof from the front of the building, with its gable vent and rooftop unit' },
    { src: '/images/projects/shingle-roof-replacements-90731/san-pedro-shingle-roof-replacement-4.webp', alt: 'Angled aerial view of the new shingle roof along the side of the two-story building' },
    { src: '/images/projects/shingle-roof-replacements-90731/san-pedro-shingle-roof-replacement-2.webp', alt: 'Aerial view of the new shingle roof above the building’s exterior stairs and arched upper porch' },
    { src: '/images/projects/shingle-roof-replacements-90731/san-pedro-shingle-roof-replacement-5.webp', alt: 'Low aerial view of the new shingle hip roof and exterior stairs along the side of the building' },
    { src: '/images/projects/shingle-roof-replacements-90731/san-pedro-shingle-roof-replacement-7.webp', alt: 'Aerial view along the length of the new shingle roof above the driveway' },
    { src: '/images/projects/shingle-roof-replacements-90731/san-pedro-shingle-roof-replacement-6.webp', alt: 'Close aerial view of the new shingle roof planes and ridge lines' },
  ],
  // Story placeholder from the photos (charcoal shingles, two-story multi-family building) until the project details come in
  paragraphs: [
    'For this shingle roof replacement in San Pedro 90731, QRS put a new charcoal shingle roof on a two-story multi-family building and the smaller building in front of it, covering every hip, ridge and gable of the roofline.',
    'Both roofs were torn off down to the wood deck, so nothing old was left under the new shingles. With the deck bare, our roofers could see every sheet of it, and the sections that needed it were replaced with new plywood before the new roof went on. The old vents came out with the shingles, leaving clean openings for the new ones.',
    'Our roofers handle [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/) for homes and [multi-family buildings](/residential-roofing/hoa-multi-family/) throughout the South Bay and the Palos Verdes Peninsula.',
    'For a roof like this, property owners can request a [free roof evaluation](/contact-us/) or explore our [Los Angeles County service area](/service-areas/la-county/).',
  ],
};
