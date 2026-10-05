// Which articles to show on a page: the home page gets the newest, a service or city page gets the ones closest to its topic.
import { PUBLISHED_POSTS } from '@/data/blog/posts';

// What each part of the site is about, most important first (the words match `topics` on the posts in data/blog/posts.js).
// The first pattern that matches a page address wins; endings like /repair/ add a topic.
const PAGE_TOPICS = [
  [/^\/residential-roofing\/tile-roofing\/lift-and-relay/, ['tile', 'underlayment', 'restoration', 'repair', 'leak']],
  [/^\/residential-roofing\/tile-roofing/, ['tile', 'underlayment', 'leak']],
  [/^\/residential-roofing\/shingle-roofing/, ['shingle', 'leak', 'storm']],
  [/^\/residential-roofing\/flat-roofing/, ['flat', 'leak', 'restoration']],
  [/^\/residential-roofing\/metal-roofing/, ['metal', 'leak']],
  [/^\/residential-roofing\/attic-ventilation/, ['maintenance', 'shingle', 'inspection']],
  [/^\/residential-roofing\/hoa/, ['maintenance', 'insurance', 'replacement']],
  [/^\/residential-roofing\/?$/, ['replacement', 'repair', 'maintenance', 'tile', 'shingle']],
  [/^\/commercial-roofing\/tpo-roofing/, ['tpo', 'commercial', 'flat', 'replacement']],
  [/^\/commercial-roofing/, ['commercial', 'leak', 'maintenance', 'flat']],
  [/^\/roof-repair\/emergency/, ['emergency', 'storm', 'leak', 'insurance', 'repair']],
  [/^\/roof-repair/, ['repair', 'leak', 'emergency', 'storm']],
  [/^\/roof-replacement/, ['replacement', 'restoration', 'insurance']],
  [/^\/roof-inspection/, ['inspection', 'maintenance', 'leak', 'storm']],
  [/^\/roof-maintenance/, ['maintenance', 'inspection', 'storm']],
  [/^\/roof-financing/, ['replacement', 'restoration']],
  [/^\/service-areas/, ['storm', 'maintenance', 'repair', 'leak']],
];
const ENDING_TOPICS = [
  [/\/repair\/$/, ['repair', 'leak']],
  [/\/replacement\/$/, ['replacement', 'restoration']],
  [/\/installation\/$/, ['replacement']],
  [/\/maintenance\/$/, ['maintenance', 'inspection']],
];

const topicsFor = (path) => {
  const base = PAGE_TOPICS.find(([pattern]) => pattern.test(path))?.[1] || [];
  const extra = ENDING_TOPICS.filter(([pattern]) => pattern.test(path)).flatMap(([, t]) => t);
  const commercial = path.startsWith('/commercial-roofing') ? ['commercial'] : []; // commercial pages show commercial articles first
  return [...new Set([...commercial, ...extra, ...base])];
};

// Newest first; an article with a picture comes before one without, so a card never shows placeholder art while a pictured article is available
const newestFirst = (a, b) => Boolean(b.image) - Boolean(a.image) || b.datePublished.localeCompare(a.datePublished);

// The newest articles
export const latestArticles = (limit = 3) => [...PUBLISHED_POSTS].sort(newestFirst).slice(0, limit);

// The articles closest to a page: a shared topic scores more the earlier it comes in the page's list, an article that lists the page
// in its `related` scores most, and ties go to the newest. A page with few matches is filled up with the newest articles.
export function articlesFor(path, limit = 3) {
  const topics = topicsFor(path);
  const scored = [...PUBLISHED_POSTS].sort(newestFirst).map((post) => {
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
