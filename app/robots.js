import { SITE_URL } from '@/data/site';

// /robots.txt: allow search engines everywhere and point them to the sitemap
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
