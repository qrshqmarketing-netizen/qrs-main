// Which articles to show on a page: the home page gets the ones featured in the dashboard (then the newest), a service or city page gets the
// ones closest to its topic. The articles come from lib/postsStore.js (Supabase, with the files in data/blog/posts.js as the fallback).
import { topicsFor } from '@/lib/pageTopics';
import { getPublishedPosts, HOME_SLOTS } from '@/lib/postsStore';

// Newest first; an article with a picture comes before one without, so a card never shows placeholder art while a pictured article is available
const newestFirst = (a, b) => Boolean(b.image) - Boolean(a.image) || b.datePublished.localeCompare(a.datePublished);

// The newest articles
export const latestArticles = async (limit = 3) => [...(await getPublishedPosts())].sort(newestFirst).slice(0, limit);

// The home page grid: the articles given a spot in the dashboard (spot 1 first), then the newest to fill the rest
export async function homeArticles(limit = HOME_SLOTS) {
  const posts = await getPublishedPosts();
  const featured = posts.filter((p) => p.homeSlot).sort((a, b) => a.homeSlot - b.homeSlot);
  const rest = [...posts].filter((p) => !p.homeSlot).sort(newestFirst);
  return [...featured, ...rest].slice(0, limit);
}

// The articles closest to a page: a shared topic scores more the earlier it comes in the page's list, an article that lists the page
// in its `related` scores most, and ties go to the newest. A page with few matches is filled up with the newest articles.
export async function articlesFor(path, limit = 3) {
  const topics = topicsFor(path);
  const scored = [...(await getPublishedPosts())].sort(newestFirst).map((post) => {
    let score = post.related?.includes(path) ? 10 : 0;
    (post.topics || []).forEach((t) => {
      const at = topics.indexOf(t);
      if (at > -1) score += topics.length - at;
    });
    return { post, score };
  });
  const picked = scored.filter((x) => x.score > 0).sort((a, b) => b.score - a.score).map((x) => x.post);
  const rest = scored.filter((x) => x.score === 0).map((x) => x.post);
  return [...picked, ...rest].slice(0, limit);
}

// "October 5, 2026"
export const articleDate = (iso) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
