import { ACCESSIBILITY_LINK, BLOG_LINK, blogPath, PRIVACY_LINK, TERMS_LINK } from '@/data/catalog';
import { BLOG_POSTS as FILE_POSTS } from '@/data/blog/posts';
import { ALL_PATHS, SECTIONS } from '@/data/content';
import LAST_MODIFIED from '@/data/lastModified.json';
import { SITE_URL } from '@/data/site';
import { getPublishedPosts } from '@/lib/postsStore';

const LEGAL = new Set([PRIVACY_LINK.href, TERMS_LINK.href, ACCESSIBILITY_LINK.href]);
const HUBS = new Set(SECTIONS.map((s) => s.href)); // roof-type and commercial hubs, which sit below the top level
// Last-modified dates: a blog post's own dateModified, else the date its text last changed (data/lastModified.json,
// kept current by scripts/lastmod.mjs before every build)
const lastModified = (postDates, path) => postDates.get(path) || LAST_MODIFIED[path]?.date;
// The blog pages come from lib/postsStore.js (the dashboard's articles), not from the fixed list in ALL_PATHS
const FILE_BLOG_PATHS = new Set([BLOG_LINK.href, ...FILE_POSTS.map((p) => blogPath(p.slug))]);

// /sitemap.xml: every page, so search engines can find them all. Top-level pages and hubs 0.8, the rest 0.6, legal 0.3.
export default async function sitemap() {
  const posts = await getPublishedPosts();
  const postDates = new Map(posts.map((p) => [blogPath(p.slug), p.dateModified || p.datePublished]));
  const paths = [...ALL_PATHS.filter((path) => !FILE_BLOG_PATHS.has(path)), ...(posts.length ? [BLOG_LINK.href, ...posts.map((p) => blogPath(p.slug))] : [])];
  return paths.map((path) => {
    const legal = LEGAL.has(path);
    const depth = path.split('/').filter(Boolean).length;
    const modified = lastModified(postDates, path);
    return {
      url: `${SITE_URL}${path}`,
      ...(modified && { lastModified: modified }),
      changeFrequency: legal ? 'yearly' : 'monthly',
      priority: path === '/' ? 1 : legal ? 0.3 : depth === 1 || HUBS.has(path) ? 0.8 : 0.6,
    };
  });
}
