// Site text that lives in the Supabase `site_content` table (scripts/supabase-content.sql) and is edited in the dashboard at /admin/content/.
// Today that is the home page's FAQ (key `home_faqs`: a list of { q, a }). The files in data/ are the starting copy and the fallback, exactly
// like the articles (lib/postsStore.js): with no Supabase, no table or no saved row, the site shows the file's version. Server-side only.
//
// Pages read it through a cached request tagged "content", which the dashboard refreshes after every save and which also refreshes itself hourly.
import { cache } from 'react';
import { FAQS as FILE_FAQS } from '@/data/faqs';
import { dbConfigured, dbRequest } from '@/lib/supabase';

export const CONTENT_TAG = 'content';
export const HOME_FAQS_KEY = 'home_faqs';

const validFaqs = (v) => Array.isArray(v) && v.length > 0 && v.every((f) => f && typeof f.q === 'string' && typeof f.a === 'string' && f.q.trim());

async function readHomeFaqs() {
  if (!dbConfigured()) return FILE_FAQS;
  try {
    const rows = await dbRequest(`site_content?key=eq.${HOME_FAQS_KEY}&select=value`, { fetchOptions: { next: { tags: [CONTENT_TAG], revalidate: 3600 } } });
    return validFaqs(rows?.[0]?.value) ? rows[0].value : FILE_FAQS;
  } catch (err) {
    // Never throw (November 4 2026): a failed read used to make the home page answer with a 500 when it had no cached copy. Not set up yet,
    // unreachable or a hiccup: the files' copy (the dashboard copy returns with the next hourly refresh).
    if (!/42P01|PGRST205|does not exist/.test(err.message)) console.error('[content] could not read the home FAQs from Supabase:', err.message);
    return FILE_FAQS;
  }
}

// The home page's questions and answers
export const getHomeFaqs = cache(readHomeFaqs);

// ---------- the dashboard (never cached) ----------

// { faqs, saved }: what the editor starts with, and whether a saved copy exists (else it is the files' copy)
export async function adminGetHomeFaqs() {
  const rows = await dbRequest(`site_content?key=eq.${HOME_FAQS_KEY}&select=value`, { fetchOptions: { cache: 'no-store' } });
  const saved = validFaqs(rows?.[0]?.value);
  return { faqs: saved ? rows[0].value : FILE_FAQS, saved };
}

export const adminSaveHomeFaqs = (faqs) =>
  dbRequest('site_content?on_conflict=key', {
    method: 'POST',
    body: [{ key: HOME_FAQS_KEY, value: faqs, updated_at: new Date().toISOString() }],
    prefer: 'resolution=merge-duplicates,return=minimal',
  });

// Back to the files' copy
export const adminResetHomeFaqs = () => dbRequest(`site_content?key=eq.${HOME_FAQS_KEY}`, { method: 'DELETE' });
