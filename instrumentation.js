// Runs once when a server starts, before it handles requests (Next.js instrumentation). It adds the new articles from data/blog/posts.js to the
// Supabase `posts` table on the live site (lib/postsStore.js addNewFilePosts). This used to run inside the first page render, where its
// uncached database requests made pre-built pages fail with a 500 after every deploy (November 4 2026); here it is outside any render.
// Not awaited, so the server starts at once; any failure is logged and ignored.
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs' || process.env.VERCEL_ENV !== 'production') return;
  const { syncFilePostsOnce } = await import('./lib/postsStore');
  syncFilePostsOnce();
}
