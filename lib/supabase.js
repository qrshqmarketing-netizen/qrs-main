// The website's connection to Supabase, shared by the lead channel (lib/leads.js) and the articles (lib/postsStore.js). Server-side only.
// Supabase's web API (PostgREST) takes and returns JSON, so no extra package is needed. The secret key stays on the server; the tables
// have row level security on with no policies, so nothing else can read or write them. The new sb_secret_... keys are not JWTs and go only
// in the `apikey` header; the older service_role key is a JWT and is also sent as the Bearer token.

const env = (name) => (process.env[name] || '').trim();

export const dbSettings = () => ({
  url: (env('SUPABASE_URL') || env('NEXT_PUBLIC_SUPABASE_URL')).replace(/\/+$/, ''),
  key: env('SUPABASE_SECRET_KEY') || env('SUPABASE_SERVICE_ROLE_KEY'),
});

// True when there is a project URL and a key that can write (a secret key; a publishable/anon key can't read the private tables)
export const dbConfigured = () => {
  const { url, key } = dbSettings();
  return Boolean(url && (key.startsWith('sb_secret_') || key.startsWith('eyJ')));
};

export const dbHeaders = (key, extra = {}) => ({
  apikey: key,
  ...(key.startsWith('eyJ') && { Authorization: `Bearer ${key}` }),
  ...extra,
});

// One call to the REST API, e.g. dbRequest('posts?status=eq.published&select=*'). Returns the parsed JSON (null when there is no body).
// `fetchOptions` is passed to fetch (cache and next.tags for the cached reads on the site, signal and so on). Throws with Supabase's own
// message when the answer isn't a success, so a missing table or a wrong key is easy to spot.
export async function dbRequest(path, { method = 'GET', body, prefer, fetchOptions = {} } = {}) {
  const { url, key } = dbSettings();
  if (!url || !key) throw new Error('Supabase is not configured');
  const res = await fetch(`${url}/rest/v1/${path}`, {
    method,
    headers: dbHeaders(key, { ...(body !== undefined && { 'Content-Type': 'application/json' }), ...(prefer && { Prefer: prefer }) }),
    ...(body !== undefined && { body: JSON.stringify(body) }),
    signal: fetchOptions.signal || AbortSignal.timeout(10000),
    ...fetchOptions,
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}
