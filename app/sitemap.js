import { ACCESSIBILITY_LINK, blogPath, PRIVACY_LINK, TERMS_LINK } from '@/data/catalog';
import { PUBLISHED_POSTS } from '@/data/blog/posts';
import { ALL_PATHS, SECTIONS } from '@/data/content';
import LAST_MODIFIED from '@/data/lastModified.json';
import { SITE_URL } from '@/data/site';

const LEGAL = new Set([PRIVACY_LINK.href, TERMS_LINK.href, ACCESSIBILITY_LINK.href]);
const HUBS = new Set(SECTIONS.map((s) => s.href)); // roof-type and commercial hubs, which sit below the top level
// Last-modified dates: a blog post's own dateModified, else the date its text last changed (data/lastModified.json,
// kept current by scripts/lastmod.mjs before every build)
const POST_DATES = new Map(PUBLISHED_POSTS.map((p) => [blogPath(p.slug), p.dateModified]));
const lastModified = (path) => POST_DATES.get(path) || LAST_MODIFIED[path]?.date;

// /sitemap.xml: every page, so search engines can find them all. Top-level pages and hubs 0.8, the rest 0.6, legal 0.3.
export default function sitemap() {
  return ALL_PATHS.map((path) => {
    const legal = LEGAL.has(path);
    const depth = path.split('/').filter(Boolean).length;
    const modified = lastModified(path);
    return {
      url: `${SITE_URL}${path}`,
      ...(modified && { lastModified: modified }),
      changeFrequency: legal ? 'yearly' : 'monthly',
      priority: path === '/' ? 1 : legal ? 0.3 : depth === 1 || HUBS.has(path) ? 0.8 : 0.6,
    };
  });
}
