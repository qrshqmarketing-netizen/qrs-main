// The functions' connection to the project's own database (Supabase's web API, PostgREST), with the secret key Supabase gives every Edge Function.
// `env` is Deno.env.toObject() in a function and a plain object in the tests; `fetchFn` is fetch (or a stand-in in the tests).

export function makeDb(env, fetchFn = fetch) {
  const url = (env.SUPABASE_URL || '').replace(/\/+$/, '');
  let key = env.SUPABASE_SERVICE_ROLE_KEY || '';
  try {
    const keys = JSON.parse(env.SUPABASE_SECRET_KEYS || '{}'); // {"default":"sb_secret_..."}
    key = keys.default || Object.values(keys)[0] || key;
  } catch {}
  const headers = (extra = {}) => ({ apikey: key, ...(key.startsWith('eyJ') && { Authorization: `Bearer ${key}` }), ...extra });

  async function request(path, { method = 'GET', body, prefer, timeout = 8000 } = {}) {
    if (!url || !key) throw new Error('Supabase is not configured');
    const res = await fetchFn(`${url}/rest/v1/${path}`, {
      method,
      headers: headers({ ...(body !== undefined && { 'Content-Type': 'application/json' }), ...(prefer && { Prefer: prefer }) }),
      ...(body !== undefined && { body: JSON.stringify(body) }),
      signal: AbortSignal.timeout(timeout),
    });
    if (!res.ok) throw new Error(`Supabase ${res.status}: ${(await res.text()).slice(0, 300)}`);
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  }

  const rpc = (name, args) => request(`rpc/${name}`, { method: 'POST', body: args });

  // true when this key has used more than `max` hits in the last `seconds`. A broken limiter never blocks a visitor.
  async function rateLimited(key, max, seconds) {
    try {
      return Boolean(await rpc('rate_limited', { p_key: key, p_max: max, p_seconds: seconds }));
    } catch (err) {
      console.error('[rate limit]', err.message);
      return false;
    }
  }

  return { url, configured: Boolean(url && key), keyKind: !key ? 'missing' : key.startsWith('sb_secret_') ? 'secret key' : key.startsWith('eyJ') ? 'legacy key' : 'unrecognized', request, rpc, rateLimited };
}
