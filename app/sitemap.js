import { ALL_PATHS } from '@/data/content';
import { SITE_URL } from '@/data/site';

// /sitemap.xml: every page, so search engines can find them all
export default function sitemap() {
  return ALL_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : path.split('/').filter(Boolean).length === 1 ? 0.8 : 0.6,
  }));
}
