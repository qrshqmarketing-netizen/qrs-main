// Shared search settings: whether this copy of the site may be indexed, and link-preview (Open Graph / Twitter) tags.
// Next.js replaces a parent's openGraph object instead of merging it, so pages spread these in.

import { BUSINESS } from '@/data/site';

// Only the live site (SITE_URL) should appear in search results. Copies elsewhere ask search engines to stay away:
// - On Vercel: production deployments are the live site (qualityroofingspecialists.com is connected); preview
//   deployments are kept out. Any other address serving a build, like the deployment's own *.vercel.app URL, gets
//   an X-Robots-Tag: noindex header (next.config.mjs), and every page's canonical tag points at SITE_URL.
// - On any other host: set the environment variable SITE_NOINDEX=true on staging or preview servers.
const onVercel = Boolean(process.env.VERCEL_ENV);
export const ALLOW_INDEXING = process.env.SITE_NOINDEX !== 'true' && (!onVercel || process.env.VERCEL_ENV === 'production');

// Analytics (Google Analytics gtag.js and Clarity, app/layout.js) run only where the site is indexable and on a production
// build, so local `npm run dev` sessions and previews don't show up as visits in GA4 or Clarity.
export const LOAD_TRACKING = ALLOW_INDEXING && process.env.NODE_ENV === 'production';

export const OG_IMAGE = { url: '/og-image.jpg', width: 1200, height: 630, alt: 'Aerial view of residential roofs' };

export const openGraphBase = {
  locale: 'en_US',
  type: 'website',
  siteName: BUSINESS.name,
  images: [OG_IMAGE],
};

export const twitterBase = {
  card: 'summary_large_image',
  images: [OG_IMAGE.url],
};
