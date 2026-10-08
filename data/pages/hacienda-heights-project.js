// Project page: Shingle Roof Replacement in Hacienda Heights 91745 (from the owner's job photos; they show the finished roof). Its photos are in the Supabase Storage bucket `site-images`
// under projects/shingle-roof-replacement-hacienda-heights-91745/ (lib/media.js), not in the site's files.
import { mediaUrl } from '@/lib/media';

export const HACIENDA_HEIGHTS_PROJECT = {
  path: '/projects/shingle-roof-replacement-hacienda-heights-91745/',
  keyword: 'shingle roof replacement in Hacienda Heights',
  title: 'Shingle Roof Replacement in Hacienda Heights 91745',
  description:
    "Shingle roof replacement in Hacienda Heights 91745: a large single-story home re-roofed in new light gray shingles, with every vent set in and the hips and valleys finished clean.",
  image: mediaUrl('projects/shingle-roof-replacement-hacienda-heights-91745/shingle-hacienda-heights-91745-01.webp'), // also the first photo in `photos`
  imageAlt: "Aerial view of a large single-story home in Hacienda Heights with a new light gray shingle roof, white box vents and clean ridge caps",
  // Map pin on /projects/: the center of the ZIP code, not the property's address, so the client's address stays private
  // Short name for the "Recent projects" links on the service pages this project is listed under (`related`)
  label: 'Shingle roof replacement, Hacienda Heights 91745',
  related: ["/residential-roofing/shingle-roofing/replacement/", "/service-areas/la-county/"], // service and city pages: shown as "Related services" here, and this project is linked back from them
  // An H2 above the paragraph at each position below (they describe the paragraphs, nothing is added to the story)
  headings: { 1: "Hips, ridges and valleys, finished clean", 2: "Vents set across the roof", 3: "One light, even roof over the whole house", 4: "Roofing across the San Gabriel Valley" },
  place: 'Hacienda Heights, CA 91745',
  geo: [33.993, -117.969],
  // Photo slider and gallery, in the order shown
  photos: [
    { src: mediaUrl('projects/shingle-roof-replacement-hacienda-heights-91745/shingle-hacienda-heights-91745-01.webp'), alt: "Aerial view of a large single-story home in Hacienda Heights with a new light gray shingle roof, white box vents and clean ridge caps" },
    { src: mediaUrl('projects/shingle-roof-replacement-hacienda-heights-91745/shingle-hacienda-heights-91745-03.webp'), alt: "The home from the corner, with its new light gray shingle roof of many hips and valleys, and the yard behind it" },
    { src: mediaUrl('projects/shingle-roof-replacement-hacienda-heights-91745/shingle-hacienda-heights-91745-05.webp'), alt: "Angled view along the roof, with the ridge caps, valleys and box vents set into the new shingles" },
    { src: mediaUrl('projects/shingle-roof-replacement-hacienda-heights-91745/shingle-hacienda-heights-91745-07.webp'), alt: "Close view of the new shingles, a ridge cap and the box vents and pipe vents across the slope" },
    { src: mediaUrl('projects/shingle-roof-replacement-hacienda-heights-91745/shingle-hacienda-heights-91745-02.webp'), alt: "Close view of the new light gray shingles and a hip, with a pipe vent and box vents set into the roof" },
    { src: mediaUrl('projects/shingle-roof-replacement-hacienda-heights-91745/shingle-hacienda-heights-91745-08.webp'), alt: "The roof from above, with a hip and valley running clean through the new shingles and a vent near the ridge" },
    { src: mediaUrl('projects/shingle-roof-replacement-hacienda-heights-91745/shingle-hacienda-heights-91745-04.webp'), alt: "Overhead view of the front of the home, with its new shingles and its row of white box vents" },
    { src: mediaUrl('projects/shingle-roof-replacement-hacienda-heights-91745/shingle-hacienda-heights-91745-06.webp'), alt: "The long section of roof, with its even shingle courses, ridge cap and white box vents" },
    { src: mediaUrl('projects/shingle-roof-replacement-hacienda-heights-91745/shingle-hacienda-heights-91745-09.webp'), alt: "Straight-down view of the whole roof, an L-shaped run of new light gray shingles with its vents across the slopes" },
    { src: mediaUrl('projects/shingle-roof-replacement-hacienda-heights-91745/shingle-hacienda-heights-91745-10.webp'), alt: "Another overhead view of the roof, showing the hips, valleys and vents against the yard and patio" },
    { src: mediaUrl('projects/shingle-roof-replacement-hacienda-heights-91745/shingle-hacienda-heights-91745-11.webp'), alt: "Top-down view of the whole roof, with its hips, valleys and white vents laid out across the home" },
  ],
  paragraphs: [
    "For this shingle roof replacement in Hacienda Heights 91745, our roofers re-roofed a large single-story home with many hips and valleys in new light gray asphalt shingles, with every vent set into the new roof.",
    "A roof this wide has a lot of lines to get right. The ridges and hips are capped in a straight, even run, the valleys are cleanly formed, and the shingles lie in even courses across every slope, so the roof reads as one neat surface from above.",
    "New vents are set across the roof, with box vents along the slopes and pipe vents at the plumbing stacks. Each was flashed as part of our *TotalShield* Shingle System, since the points where something passes through a roof are where leaks most often start.",
    "The finished roof is a soft, light gray that reflects the Southern California sun, with edges that stay crisp around the house, the patio and the yard behind it.",
    "Own a home in Hacienda Heights, La Puente, Rowland Heights or elsewhere in the San Gabriel Valley? Our roofers handle [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/) across [Los Angeles County](/service-areas/la-county/). Homeowners can request a [free roof evaluation](/contact-us/) anywhere in our service area.",
  ],
};
