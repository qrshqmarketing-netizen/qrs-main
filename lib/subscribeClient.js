// Browser side of the article newsletter (lib/newsletter.js): the footer box and the forms' checkbox call this. The server saves the address as
// pending and emails a confirmation link; nothing else happens until it is clicked.
export const NEWSLETTER_LABEL = 'Email me QRS’s latest roofing news and new articles.';

export async function subscribeNewsletter({ email, name = '', source = 'footer', website = '' }, options = {}) {
  const res = await fetch('/api/subscribe/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: String(email || '').trim(), name, source, website }),
    ...options,
  });
  let data = {};
  try {
    data = await res.json();
  } catch {}
  return { ok: res.ok && data.ok !== false, error: data.error || '' };
}
