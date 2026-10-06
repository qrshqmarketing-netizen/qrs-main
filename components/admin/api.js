// The dashboard pages' one way of talking to the server (app/api/admin/*)
export async function adminApi(url, body) {
  try {
    // The site's addresses end with a slash (trailingSlash in next.config.mjs); without it the request is redirected first
    const res = await fetch(url.endsWith('/') ? url : `${url}/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json().catch(() => ({}));
    return { ...data, ok: res.ok, status: res.status };
  } catch {
    return { ok: false, status: 0, error: 'Could not reach the site. Check your connection and try again.' };
  }
}
