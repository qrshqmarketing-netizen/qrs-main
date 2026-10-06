// What the dashboard's routes do after a change. Server-side only.
import { revalidateTag } from 'next/cache';
import { ALL_PATHS } from '@/data/content';
import { blogPath } from '@/data/catalog';
import { getBlogPosts, POSTS_TAG } from '@/lib/postsStore';

// Tells the site the articles changed: every page that shows articles (the blog, the home grid, the related-article cards, the sitemap)
// is rebuilt the next time someone asks for it, so a saved change is live within seconds. { expire: 0 }: nobody is served the old copy.
export const refreshSite = () => revalidateTag(POSTS_TAG, { expire: 0 });

// Every address on the site, for the editor's check for links to pages that don't exist
export async function knownPaths() {
  const posts = await getBlogPosts();
  return new Set(['/', '/start/', '/thank-you/', ...ALL_PATHS, ...posts.map((p) => blogPath(p.slug))]);
}

// Today in Los Angeles as YYYY-MM-DD (the site's "Updated" date)
export const today = () => new Date().toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' });
