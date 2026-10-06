// Where the blog articles live. The articles are rows of the Supabase `posts` table (scripts/supabase-posts.sql), edited in the dashboard at
// /admin/; the articles in data/blog/posts.js are the fallback for when Supabase isn't set up, can't be reached while the site builds, or has no
// published article yet. Server-side only.
//
// The site stays pre-built (fast, and the same for search engines): pages read the published articles through a cached request tagged
// "posts", which the dashboard refreshes after every save (revalidateTag in lib/adminActions.js), and which also refreshes itself hourly.
import { cache } from 'react';
import { BLOG_POSTS as FILE_POSTS } from '@/data/blog/posts';
import { dbConfigured, dbRequest } from '@/lib/supabase';

export const POSTS_TAG = 'posts';
export const HOME_SLOTS = 3; // the featured spots on the home page's article grid

// ---------- rows <-> articles ----------

const blank = (v) => (v === undefined || v === null || v === '' ? undefined : v);

// A table row as the article the site pages use (the shape described at the top of data/blog/posts.js), plus status and homeSlot
export const fromRow = (r) => ({
  slug: r.slug,
  title: r.title,
  keyword: r.keyword,
  topics: r.topics || [],
  metaTitle: r.meta_title,
  metaDescription: r.meta_description,
  datePublished: r.date_published,
  dateModified: blank(r.date_modified),
  excerpt: r.excerpt || '',
  image: blank(r.image),
  imageAlt: blank(r.image_alt),
  cardImage: blank(r.card_image),
  heroImage: blank(r.hero_image),
  intro: r.intro || [],
  sections: r.sections || [],
  faqs: r.faqs || [],
  closing: blank(r.closing),
  related: r.related || [],
  author: blank(r.author),
  noindex: r.noindex ? true : undefined,
  status: r.status,
  homeSlot: r.home_slot || null,
});

const orNull = (v) => (v === undefined || v === null || v === '' ? null : v);

export const toRow = (p) => ({
  slug: p.slug,
  title: p.title,
  keyword: p.keyword,
  topics: p.topics || [],
  meta_title: p.metaTitle,
  meta_description: p.metaDescription,
  date_published: p.datePublished,
  date_modified: orNull(p.dateModified),
  excerpt: p.excerpt || '',
  image: orNull(p.image),
  image_alt: orNull(p.imageAlt),
  card_image: orNull(p.cardImage),
  hero_image: orNull(p.heroImage),
  intro: p.intro || [],
  sections: p.sections || [],
  faqs: p.faqs || [],
  closing: p.closing || null,
  related: p.related || [],
  author: orNull(p.author),
  noindex: Boolean(p.noindex),
  status: p.status === 'published' ? 'published' : 'draft',
  home_slot: p.homeSlot || null,
});

// ---------- what the site shows ----------

let warned = false;

async function readPublished() {
  if (!dbConfigured()) return FILE_POSTS;
  try {
    const rows = await dbRequest('posts?select=*&status=eq.published&order=date_published.desc,created_at.desc', {
      fetchOptions: { next: { tags: [POSTS_TAG], revalidate: 3600 } },
    });
    return rows.length ? rows.map(fromRow) : FILE_POSTS;
  } catch (err) {
    if (!warned) console.error('[posts] could not read the articles from Supabase:', err.message);
    warned = true;
    // The table isn't there yet (scripts/supabase-posts.sql not run): the same as not being set up, so the site keeps showing the files
    if (/42P01|PGRST205|does not exist/.test(err.message)) return FILE_POSTS;
    // While the site builds, fall back to the files so the build never fails because of the database. Afterwards, throwing makes Next keep
    // serving the page it already has instead of replacing it with an older copy of the articles.
    if (process.env.NEXT_PHASE === 'phase-production-build') return FILE_POSTS;
    throw err;
  }
}

// Every published article, newest first (an article marked noindex is included: it is listed on the blog index but kept out of search)
export const getBlogPosts = cache(readPublished);
// The ones search engines and AI assistants should know about
export const getPublishedPosts = async () => (await getBlogPosts()).filter((p) => !p.noindex);
export const getPost = async (slug) => (await getBlogPosts()).find((p) => p.slug === slug);
// The newest article with a picture (else the newest): its thumbnail sits beside the blog index's hero heading
export async function getLatestPost() {
  const posts = [...(await getPublishedPosts())].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
  return posts.find((p) => p.image) || posts[0];
}

// ---------- what the dashboard does (never cached) ----------

const NO_CACHE = { cache: 'no-store' };
const enc = encodeURIComponent;

export async function adminListPosts() {
  const rows = await dbRequest('posts?select=slug,title,status,date_published,date_modified,home_slot,image,card_image,noindex,updated_at&order=date_published.desc,created_at.desc', { fetchOptions: NO_CACHE });
  return rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    status: r.status,
    datePublished: r.date_published,
    dateModified: r.date_modified,
    homeSlot: r.home_slot,
    hasImage: Boolean(r.image || r.card_image),
    noindex: r.noindex,
    updatedAt: r.updated_at,
  }));
}

export async function adminGetPost(slug) {
  const rows = await dbRequest(`posts?select=*&slug=eq.${enc(slug)}&limit=1`, { fetchOptions: NO_CACHE });
  return rows[0] ? fromRow(rows[0]) : null;
}

// Gives the spot to this article: whoever held it loses it (each spot holds one article)
async function freeHomeSlot(slot, exceptSlug) {
  if (!slot) return;
  await dbRequest(`posts?home_slot=eq.${Number(slot)}&slug=neq.${enc(exceptSlug)}`, { method: 'PATCH', body: { home_slot: null }, prefer: 'return=minimal', fetchOptions: NO_CACHE });
}

// Create ({ create: true }: fails when the address is taken) or update an article. An article's address never changes after it is created.
export async function adminSavePost(post, { create = false } = {}) {
  await freeHomeSlot(post.homeSlot, post.slug);
  const row = toRow(post);
  if (create) {
    try {
      await dbRequest('posts', { method: 'POST', body: row, prefer: 'return=minimal', fetchOptions: NO_CACHE });
    } catch (err) {
      if (/Supabase 409/.test(err.message)) throw new Error('An article with this address (slug) already exists.');
      throw err;
    }
    return;
  }
  const { slug, ...changes } = row;
  const done = await dbRequest(`posts?slug=eq.${enc(slug)}`, { method: 'PATCH', body: changes, prefer: 'return=representation', fetchOptions: NO_CACHE });
  if (!done?.length) throw new Error('That article no longer exists.');
}

export const adminDeletePost = (slug) => dbRequest(`posts?slug=eq.${enc(slug)}`, { method: 'DELETE', prefer: 'return=minimal', fetchOptions: NO_CACHE });

export async function adminSetHomeSlot(slug, slot) {
  await freeHomeSlot(slot, slug);
  await dbRequest(`posts?slug=eq.${enc(slug)}`, { method: 'PATCH', body: { home_slot: slot || null }, prefer: 'return=minimal', fetchOptions: NO_CACHE });
}

export async function adminSetStatus(slug, status) {
  await dbRequest(`posts?slug=eq.${enc(slug)}`, { method: 'PATCH', body: { status: status === 'published' ? 'published' : 'draft' }, prefer: 'return=minimal', fetchOptions: NO_CACHE });
}

// Copies the articles in data/blog/posts.js into the table, as published. An article that is already in the table is left alone, so this
// can never overwrite an edit. Keeps their newest-first order. Returns how many were added and how many were already there.
export async function adminImportFilePosts() {
  const base = Date.now();
  const rows = FILE_POSTS.map((p, i) => ({ ...toRow({ ...p, status: 'published' }), created_at: new Date(base - i * 1000).toISOString() }));
  const added = await dbRequest('posts?on_conflict=slug', { method: 'POST', body: rows, prefer: 'resolution=ignore-duplicates,return=representation', fetchOptions: NO_CACHE });
  return { added: added?.length || 0, alreadyThere: rows.length - (added?.length || 0) };
}

// For the setup check: is the table there, and how many articles does it hold? (a count only)
export async function postsTableStatus() {
  if (!dbConfigured()) return 'not configured';
  try {
    const rows = await dbRequest('posts?select=slug,status', { fetchOptions: NO_CACHE });
    return `ok: ${rows.length} articles, ${rows.filter((r) => r.status === 'published').length} published`;
  } catch (err) {
    return /42P01|does not exist|PGRST205/.test(err.message) ? 'table missing: run scripts/supabase-posts.sql' : `error: ${err.message.slice(0, 120)}`;
  }
}
