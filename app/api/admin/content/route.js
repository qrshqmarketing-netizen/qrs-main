// POST { action, ... }: the site text edited in the dashboard (lib/contentStore.js). Needs the dashboard login and a request from this site's
// own pages. Actions: saveFaqs { text } (the Q:/A: format), resetFaqs.
import { revalidateTag } from 'next/cache';
import { isAdmin, sameOrigin } from '@/lib/adminAuth';
import { knownPaths } from '@/lib/adminActions';
import { textToFaqs } from '@/lib/articleFormat';
import { CONTENT_TAG, adminResetHomeFaqs, adminSaveHomeFaqs } from '@/lib/contentStore';
import { dbConfigured } from '@/lib/supabase';

const fail = (status, error, extra = {}) => Response.json({ ok: false, error, ...extra }, { status });
const refresh = () => revalidateTag(CONTENT_TAG, { expire: 0 });

export async function POST(request) {
  if (!(await sameOrigin())) return fail(403, 'Not allowed.');
  if (!(await isAdmin())) return fail(401, 'Your session ended. Log in again.');
  if (!dbConfigured()) return fail(503, 'Supabase is not connected yet.');
  if (Number(request.headers.get('content-length')) > 200_000) return fail(413, 'That is too much text for one save.');
  let body;
  try {
    body = await request.json();
  } catch {
    return fail(400, 'Bad request.');
  }
  try {
    switch (body?.action) {
      case 'saveFaqs': {
        const faqs = textToFaqs(body.text);
        const problems = [];
        if (faqs.length < 3) problems.push('Keep at least 3 questions.');
        if (faqs.length > 20) problems.push('Keep it to 20 questions or fewer.');
        faqs.forEach((f, i) => {
          if (!f.a) problems.push(`Question ${i + 1} ("${f.q.slice(0, 50)}") has no answer.`);
          if (f.q.length > 200) problems.push(`Question ${i + 1} is too long.`);
          if (f.a.length > 2000) problems.push(`The answer to question ${i + 1} is too long.`);
        });
        const text = faqs.map((f) => `${f.q}\n${f.a}`).join('\n');
        const odd = [...text.matchAll(/\]\(\s*([^)\s]*)\s*\)/g)].map((m) => m[1]).filter((href) => !/^(\/|https:\/\/|mailto:|tel:|#)/i.test(href));
        if (odd.length) problems.push(`These links aren't allowed (a link has to start with /, https://, mailto: or tel:): ${[...new Set(odd)].join(', ')}`);
        const known = await knownPaths();
        const missing = [...new Set([...text.matchAll(/\]\((\/[^)#?\s]*)\)/g)].map((m) => m[1]))].filter((p) => !p.startsWith('/images/') && !known.has(p.endsWith('/') ? p : `${p}/`));
        if (missing.length) problems.push(`These links go to pages that don't exist: ${missing.join(', ')}`);
        if (problems.length) return fail(422, 'This can\'t be saved yet.', { problems });
        const warnings = /\bsubs\b|subcontractor/i.test(text) ? ['Wording rule: say "crews", not "subs" or "subcontractors".'] : [];
        await adminSaveHomeFaqs(faqs);
        refresh();
        return Response.json({ ok: true, count: faqs.length, warnings });
      }
      case 'resetFaqs':
        await adminResetHomeFaqs();
        refresh();
        return Response.json({ ok: true });
      default:
        return fail(400, 'Unknown action.');
    }
  } catch (err) {
    console.error('[admin content]', err);
    return fail(/42P01|PGRST205|does not exist/.test(err.message) ? 503 : 500, /42P01|PGRST205|does not exist/.test(err.message) ? 'The site_content table does not exist yet. In Supabase, open the SQL Editor and run scripts/supabase-content.sql.' : `Supabase said: ${String(err.message).slice(0, 200)}`);
  }
}
