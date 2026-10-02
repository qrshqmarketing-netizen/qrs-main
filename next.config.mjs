import { REDIRECTS } from './data/redirects.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Page URLs end with a slash (/shingle-roofing/), matching the links in the menus
  trailingSlash: true,
  // Search engines index the site only at its live address (SITE_URL in data/site.js). The same build served at any
  // other host, like the deployment's *.vercel.app URL, tells them to skip it.
  async headers() {
    return [{ source: '/:path*', missing: [{ type: 'host', value: 'qualityroofingspecialists\\.com' }], headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] }];
  },
  // Old WordPress addresses → their new pages (permanent redirects, see data/redirects.js)
  async redirects() {
    return [
      // www.qualityroofingspecialists.com → the same page on qualityroofingspecialists.com (SITE_URL), so there's one copy
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www\\.qualityroofingspecialists\\.com' }],
        destination: 'https://qualityroofingspecialists.com/:path*',
        permanent: true,
      },
      ...REDIRECTS.map(([source, destination]) => ({ source, destination, permanent: true })),
    ];
  },
};

export default nextConfig;
