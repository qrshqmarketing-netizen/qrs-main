// Project page: Shingle Roof Replacement in Granada Hills 91344 (from the owner's job photos; they show the finished roof). Its photos are in the Supabase Storage bucket `site-images`
// under projects/shingle-roof-replacement-granada-hills-91344/ (lib/media.js), not in the site's files.
import { mediaUrl } from '@/lib/media';

export const GRANADA_HILLS_PROJECT = {
  path: '/projects/shingle-roof-replacement-granada-hills-91344/',
  keyword: 'shingle roof replacement in Granada Hills',
  title: 'Shingle Roof Replacement in Granada Hills 91344',
  description:
    "Shingle roof replacement in Granada Hills 91344: a single-story home with a many-sided hip roof re-roofed in new gray shingles, with its chimney, skylights and vents flashed.",
  image: mediaUrl('projects/shingle-roof-replacement-granada-hills-91344/shingle-granada-hills-91344-01.webp'), // also the first photo in `photos`
  imageAlt: "Aerial view of a single-story home in Granada Hills with a new gray shingle roof wrapped around a garden, with a brick chimney and two skylights",
  // Map pin on /projects/: the center of the ZIP code, not the property's address, so the client's address stays private
  // Short name for the "Recent projects" links on the service pages this project is listed under (`related`)
  label: 'Shingle roof replacement, Granada Hills 91344',
  related: ["/residential-roofing/shingle-roofing/replacement/", "/service-areas/la-county/los-angeles/"], // service and city pages: shown as "Related services" here, and this project is linked back from them
  // An H2 above the paragraph at each position below (they describe the paragraphs, nothing is added to the story)
  headings: { 1: "A roof with a lot of shape, finished clean", 2: "Skylights, a chimney and vents that stay watertight", 3: "One even gray roof over the whole house", 4: "Roofing for homes across the Valley" },
  place: 'Granada Hills, Los Angeles, CA 91344',
  geo: [34.2889, -118.5083],
  // Photo slider and gallery, in the order shown
  photos: [
    { src: mediaUrl('projects/shingle-roof-replacement-granada-hills-91344/shingle-granada-hills-91344-01.webp'), alt: "Aerial view of a single-story home in Granada Hills with a new gray shingle roof wrapped around a garden, with a brick chimney and two skylights" },
    { src: mediaUrl('projects/shingle-roof-replacement-granada-hills-91344/shingle-granada-hills-91344-02.webp'), alt: "The front of the home from above, with the new gray shingles, the chimney, skylights and pipe vents" },
    { src: mediaUrl('projects/shingle-roof-replacement-granada-hills-91344/shingle-granada-hills-91344-03.webp'), alt: "Angled view along the roof, with the new shingles, hips and ridges running clean and three skylights set into the roof" },
  ],
  paragraphs: [
    "For this shingle roof replacement in Granada Hills 91344, our roofers re-roofed a large single-story home that wraps around a garden, in new gray asphalt shingles, with its chimney, skylights and vents all built into the new roof.",
    "The roof has a lot of shape: hips, ridges and valleys running around the courtyard and over the garage. Each hip and ridge was finished on its own, so the lines run straight and the shingles lie even from the eave up to the ridge cap.",
    "Several things come up through this roof: a brick chimney, a group of skylights and a scattering of pipe vents and box vents. Each was flashed as part of our *TotalShield* Shingle System, since the points where something passes through a roof are where leaks most often start.",
    "From above, the finished roof is one even gray surface with no patchwork, and the same neat edge runs along every eave. It suits the house and sits well among the trees of the hillside around it.",
    "Own a home in Granada Hills, Northridge, Porter Ranch or elsewhere in the San Fernando Valley? Our roofers handle [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/) across [Los Angeles](/service-areas/la-county/los-angeles/), including homes with skylights, chimneys and complicated rooflines. Homeowners can request a [free roof evaluation](/contact-us/) anywhere in our [Los Angeles County service area](/service-areas/la-county/).",
  ],
};
