// Shared search settings: whether this copy of the site may be indexed, and link-preview (Open Graph / Twitter) tags.
// Next.js replaces a parent's openGraph object instead of merging it, so pages spread these in.

import { BUSINESS, SITE_URL } from '@/data/site';

// Only the live site (SITE_URL) should appear in search results. Copies elsewhere ask search engines to stay away:
// - On Vercel: preview deployments, and production until the live domain is connected to the project.
// - On any other host: set the environment variable SITE_NOINDEX=true on staging or preview servers.
const bareHost = (host = '') => host.replace(/^www\./, '');
const onVercel = Boolean(process.env.VERCEL_ENV);
export const ALLOW_INDEXING =
  process.env.SITE_NOINDEX !== 'true' &&
  (!onVercel ||
    (process.env.VERCEL_ENV === 'production' &&
      bareHost(process.env.VERCEL_PROJECT_PRODUCTION_URL) === bareHost(new URL(SITE_URL).host)));

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
