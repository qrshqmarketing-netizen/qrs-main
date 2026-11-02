// Setup check for the Facebook feeds on the Woodland Hills and Vernon pages (components/loc/FacebookFeed.jsx): for each Page, whether its
// variables are set and what the Graph API answers. Only with the x-leads-diagnostic header (the LEADS_SHEET_SECRET); never returns a token.
import { cleanPageId, cleanToken } from '@/lib/facebook';

export const dynamic = 'force-dynamic';

const FEEDS = {
  'woodland-hills': ['FACEBOOK_PAGE_ID', 'FACEBOOK_PAGE_TOKEN'],
  vernon: ['FACEBOOK_VERNON_PAGE_ID', 'FACEBOOK_VERNON_PAGE_TOKEN'],
};

export async function POST(request) {
  const secret = (process.env.LEADS_SHEET_SECRET || '').trim();
  if (!secret || request.headers.get('x-leads-diagnostic') !== secret) return Response.json({ ok: false, error: 'not allowed' }, { status: 401 });
  const out = {};
  for (const [page, [idVar, tokenVar]] of Object.entries(FEEDS)) {
    const rawToken = process.env[tokenVar] || '';
    const id = cleanPageId(process.env[idVar] || '');
    const token = cleanToken(rawToken);
    const r = { [idVar]: id ? `set (${id.length} chars)` : 'MISSING', [tokenVar]: token ? `set (${token.length} chars${rawToken.trim() !== token ? ', extra text around it ignored' : ''})` : 'MISSING' };
    if (id && token) {
      try {
        const res = await fetch(`https://graph.facebook.com/v26.0/${encodeURIComponent(id)}/posts?fields=message,full_picture,permalink_url,created_time&limit=3&access_token=${encodeURIComponent(token)}`, { cache: 'no-store' });
        const data = await res.json().catch(() => ({}));
        r.status = res.status;
        r.posts = Array.isArray(data?.data) ? data.data.length : 0;
        // Facebook's message can repeat the token: anything token-like is blanked out
        if (data?.error) r.error = `${data.error.type || ''} ${data.error.code || ''}: ${data.error.message || ''}`.replace(/EAA[A-Za-z0-9]+/g, '[token]').replace(/[A-Za-z0-9_-]{40,}/g, '[hidden]').slice(0, 200).trim();
      } catch (e) {
        r.error = `request failed: ${e.message}`;
      }
    }
    out[page] = r;
  }
  return Response.json({ ok: true, ...out });
}
