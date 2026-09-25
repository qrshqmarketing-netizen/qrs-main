import { REDIRECTS } from './data/redirects.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Page URLs end with a slash (/shingle-roofing/), matching the links in the menus
  trailingSlash: true,
  // Old WordPress addresses → their new pages (permanent redirects, see data/redirects.js)
  async redirects() {
    return REDIRECTS.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
