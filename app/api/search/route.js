import { searchSite } from '@/lib/siteSearch';
import { clientIp, searchLimited, spammyQuery } from '@/lib/searchGuard';

// Instant suggestions for the header's search box (components/layout/HeaderSearch.jsx): the top results for ?q=, as JSON. Read-only, nothing
// stored; it searches the site's own page index (lib/siteSearch.js). The full list is the /search/ page.
export async function GET(request) {
  const headers = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' };
  if (searchLimited('api', clientIp(request.headers))) return Response.json({ results: [], total: 0, error: 'too many requests' }, { status: 429, headers: { ...headers, 'Retry-After': '60' } });
  const q = (new URL(request.url).searchParams.get('q') || '').slice(0, 120);
  if (spammyQuery(q)) return Response.json({ results: [], total: 0 }, { headers });
  const { results, total } = await searchSite(q, { limit: 6 });
  return Response.json({ results, total }, { headers });
}
