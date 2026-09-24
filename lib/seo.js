// Shared link-preview (Open Graph / Twitter) settings.
// Next.js replaces a parent's openGraph object instead of merging it, so pages spread these in.

import { BUSINESS } from '@/data/site';

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
