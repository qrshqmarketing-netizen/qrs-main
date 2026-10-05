import { REDIRECTS } from './data/redirects.js';

// Bump this (any new value, e.g. today's date) to clear every visitor's cached copy of the site once (see headers())
const CACHE_RESET = '2026-10-02';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Photos: served as AVIF where the browser can show it (about a third smaller than WebP), WebP otherwise. imageSizes adds finer
  // steps below the smallest device width, so a 230 px card photo gets a file near 450-580 px instead of jumping to 640.
  // `qualities` lists the quality settings the site uses (75 is the default; the small card photos use 60).
  images: {
    formats: ['image/avif', 'image/webp'],
    imageSizes: [32, 48, 64, 96, 128, 192, 256, 320, 384, 448, 512, 576],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    qualities: [60, 75],
    minimumCacheTTL: 2592000, // 30 days
  },
  // Page URLs end with a slash (/shingle-roofing/), matching the links in the menus
  trailingSlash: true,
  // Search engines index the site only at its live address (SITE_URL in data/site.js). The same build served at any
  // other host, like the deployment's *.vercel.app URL, tells them to skip it.
  async headers() {
    return [
      // Basic security headers on every response: no content-type sniffing, no framing by other sites, a short referrer, and
      // only this site may use the visitor's location (the Instant Quote's "use my location")
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self), payment=()' },
        ],
      },
      { source: '/:path*', missing: [{ type: 'host', value: 'qualityroofingspecialists\\.com' }], headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] },
      // Photos and logos in public/images: visitors keep them for 30 days instead of re-checking on every page view. A photo replaced
      // under the same file name shows up after that (or right away after a CACHE_RESET bump below); a new file name shows at once.
      { source: '/images/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }] },
      // Cache buster: a browser that hasn't seen this CACHE_RESET version yet is told once to drop everything it
      // cached for the site (old WordPress pages and files included), and gets a cookie so it only happens once.
      // Change CACHE_RESET to make every visitor's browser start fresh again.
      {
        source: '/:path*',
        missing: [{ type: 'cookie', key: 'qrs-cache-reset', value: CACHE_RESET }],
        headers: [
          { key: 'Clear-Site-Data', value: '"cache"' },
          { key: 'Set-Cookie', value: `qrs-cache-reset=${CACHE_RESET}; Path=/; Max-Age=31536000; SameSite=Lax; Secure` },
        ],
      },
    ];
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
