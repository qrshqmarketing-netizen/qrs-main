// Blog thumbnails that already carry the article title in the picture (owner's designed thumbnails with headline text, and the
// "vs." comparison pictures with their labels along the bottom). Everywhere else the title is laid over the picture as real text
// (titleOverPicture): blog index cards, the blog hero's latest article, article rows on the site, and the article page's H1.
// Keyed by the picture's address, so a post that gets a new picture without text moves to the overlay by itself.
// New thumbnails should be plain photos (no text): the page writes the title on them.
const TITLED = new Set([
  '/images/blog/best-roof-for-solar-panels.webp',
  '/images/blog/how-to-choose-a-roofing-firm-near-me.webp',
  '/images/blog/how-to-stop-a-leaking-roof-now.webp',
  '/images/blog/how-to-vet-commercial-roofing-near-me.webp',
  '/images/blog/top-qualities-shingle-roofers-los-angeles-orange-county.webp',
  '/images/blog/commercial-roof-repair-company.webp',
  '/images/blog/how-to-choose-a-shingle-roofer-los-angeles.webp',
  '/images/blog/roof-drip-edge-flashing.webp',
  '/images/blog/roofing-permits-los-angeles.webp',
  '/images/blog/tile-roof-reset-vs-repair.webp',
  '/images/blog/how-to-choose-a-commercial-roofing-company-los-angeles.webp',
  '/images/blog/how-to-choose-a-roofer-los-angeles-ca.webp',
  '/images/blog/roof-warranty-explained.webp',
  '/images/blog/what-does-a-roof-inspection-include.webp',
  '/images/blog/best-roofer-los-angeles.webp',
  '/images/blog/tile-roofing-specialist-los-angeles.webp',
  '/images/blog/how-to-find-a-roof-leak.webp',
  '/images/blog/stop-a-roof-leak.webp',
  '/images/blog/tile-roof-guide-southern-california.webp',
  '/images/blog/flat-roofs-los-angeles-guide.webp',
  '/images/blog/asphalt-shingle-roof-guide.webp',
  '/images/blog/roof-replacement-guide.webp',
  '/images/blog/most-in-demand-commercial-roofing-tpo-epdm-metal.webp',
  '/images/blog/shingle-granules-in-gutter.webp',
  '/images/blog/asphalt-shingle-vs-tile-roof.webp',
  '/images/blog/tile-lift-and-relay-vs-new-tile-roof.webp',
  '/images/blog/clay-vs-concrete-tile-roof.webp',
  '/images/blog/metal-roof-vs-shingles.webp',
  '/images/blog/architectural-vs-3-tab-shingles.webp',
  '/images/blog/how-to-file-roof-insurance-claim-california.webp',
]);

// true when the title should be written over this picture (a picture exists and has no title of its own)
export const titleOverPicture = (src) => Boolean(src) && !TITLED.has(src);
