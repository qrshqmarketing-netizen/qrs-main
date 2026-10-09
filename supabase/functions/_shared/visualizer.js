// The Roof Visualizer's logic (the Edge Function supabase/functions/visualize and the website's own route app/api/visualize both run it). Two steps:
//   1. { action: 'subscribe', name, email, consent }  → saves the visitor as a lead (source "Roof Visualizer") and returns a signed pass (30 days).
//   2. { action: 'render', token, image, brand, color } → checks the pass, the photo and the choice, asks Gemini to recolor the roof in the photo, and
//      returns the new picture as a data URL. A few renders per visitor per day; the first one of the day also tells the team what they tried.
// Pure function of (request, ctx) with no Deno or Node calls, so the local tests can run it with stand-ins.
//   ctx: { env, fetch, catalog, rateLimited(key, max, seconds) → Promise<boolean>, deliverLead(lead) → Promise<{ delivered, configured }>, waitUntil(promise) }
import { leadAttribution } from './attribution.js';
import { clientIp, clip, corsHeaders, hashIp, json } from './util.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta';
const DEFAULT_IMAGE_MODEL = 'gemini-2.5-flash-image'; // an image-editing Gemini model; set GEMINI_IMAGE_MODEL to use another
const MAX_IMAGE_CHARS = 5_500_000; // base64 characters, about 4 MB (the page shrinks photos to about 1.5 MB first)
const PASS_DAYS = 30;
const RENDERS_PER_DAY = 8;
const IMAGE_RE = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/;

// ----- the signed pass (HMAC-SHA256), so the gate can't be skipped by calling the render step directly -----
const enc = new TextEncoder();
const b64url = (bytes) => btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const fromB64url = (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));

async function sign(secret, data) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return b64url(new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(data))));
}

export async function makePass(secret, { name, email }, now = Date.now()) {
  const body = b64url(enc.encode(JSON.stringify({ n: name, e: email, x: now + PASS_DAYS * 86400000 })));
  return `${body}.${await sign(secret, body)}`;
}

export async function readPass(secret, token, now = Date.now()) {
  const [body, sig, extra] = String(token || '').split('.');
  if (!body || !sig || extra !== undefined || body.length > 600) return null;
  const expected = await sign(secret, body);
  if (expected.length !== sig.length) return null;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  if (diff) return null;
  try {
    const p = JSON.parse(new TextDecoder().decode(fromB64url(body)));
    return p.x > now && EMAIL_RE.test(p.e || '') ? { name: String(p.n || ''), email: p.e } : null;
  } catch {
    return null;
  }
}

const secretOf = (env) => (env.VISUALIZER_SECRET || env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SECRET_KEYS || env.ADMIN_PASSWORD || '').trim();

// What to ask Gemini for. The photo is the first part; everything except the roof must stay exactly as it is.
export function buildPrompt(brand, color) {
  const who = brand.generic ? '' : `${brand.name} ${brand.line} `;
  const material =
    brand.kind === 'membrane'
      ? `a ${who}${brand.generic ? 'flat roof ' : ''}membrane in the color "${color.name}" (about ${color.hex}), with a smooth, realistic seamed roof surface`
      : `${who}asphalt shingles in the color "${color.name}" (about ${color.hex}), with realistic shingle texture, courses and scale for this camera distance`;
  return [
    'Edit this photo of a house. Replace only the roofing surface of the roof(s) in the photo so that it looks like a brand-new roof of',
    `${material}.`,
    'Keep everything else exactly as it is: the walls, windows, doors, gutters, fascia, chimney, skylights, vents, solar panels, trees, cars, sky, ground,',
    'lighting, shadows, camera angle and framing. Roof edges, ridges and valleys must follow the original shapes. Do not add text, logos or people.',
    'Return the edited photo only.',
  ].join(' ');
}

// A color's swatch picture (a file of the website, data/roofVisualizer.js), fetched to send with the photo; any problem just means the request goes without it
async function swatchPart(env, fetchFn, path) {
  if (!path || !path.startsWith('/')) return null;
  try {
    const res = await fetchFn(new URL(path, (env.SITE_URL || 'https://qualityroofingspecialists.com').replace(/\/+$/, '') + '/').href, { signal: AbortSignal.timeout(8000) });
    const mime = (res.headers.get('content-type') || '').split(';')[0];
    if (!res.ok || !/^image\/(jpeg|png|webp)$/.test(mime)) return null;
    const bytes = new Uint8Array(await res.arrayBuffer());
    if (bytes.length > 1_500_000) return null;
    let bin = '';
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    return { inlineData: { mimeType: mime, data: btoa(bin) } };
  } catch {
    return null;
  }
}

async function askGemini(env, fetchFn, mime, data, prompt, swatch) {
  const key = (env.GEMINI_API_KEY || '').trim();
  if (!key) return { error: 'not configured', status: 503 };
  const model = (env.GEMINI_IMAGE_MODEL || DEFAULT_IMAGE_MODEL).trim();
  try {
    const res = await fetchFn(`${(env.GEMINI_BASE_URL || GEMINI_BASE).replace(/\/+$/, '')}/models/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      signal: AbortSignal.timeout(55000),
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: swatch ? `${prompt} The second image is a swatch of the shingle: match its color and texture.` : prompt }, { inlineData: { mimeType: mime, data } }, ...(swatch ? [swatch] : [])] }],
        generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
      }),
    });
    if (!res.ok) {
      console.error('[visualize] Gemini error', model, res.status, (await res.text().catch(() => '')).slice(0, 300));
      return { error: 'upstream error', status: 502 };
    }
    const out = await res.json();
    const parts = out.candidates?.[0]?.content?.parts || [];
    const img = parts.map((p) => p.inlineData || p.inline_data).find((d) => d?.data);
    if (!img) {
      console.error('[visualize] Gemini sent no image', out.candidates?.[0]?.finishReason, out.promptFeedback?.blockReason);
      return { error: 'no image', status: 502 };
    }
    return { image: `data:${img.mimeType || img.mime_type || 'image/png'};base64,${img.data}` };
  } catch (err) {
    console.error('[visualize] request to Gemini failed', err?.message || err);
    return { error: 'request failed', status: 502 };
  }
}

export async function handleVisualizer(request, ctx) {
  const { env, catalog } = ctx;
  const cors = corsHeaders(request, env);
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  if (request.method !== 'POST') return json({ ok: false, error: 'method not allowed' }, 405, cors);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'bad request' }, 400, cors);
  }
  if (clip(body?.website, 200)) return json({ ok: true, token: 'x' }, 200, cors); // the hidden field only bots fill in
  const ip = await hashIp(clientIp(request), env.IP_SALT || '');
  const secret = secretOf(env);
  if (!secret) return json({ ok: false, error: 'not configured' }, 503, cors);

  if (body?.action === 'subscribe') {
    if (await ctx.rateLimited(`viz-sub:${ip}`, 6, 600)) return json({ ok: false, error: 'too many requests' }, 429, cors);
    const name = clip(body?.name, 120);
    const email = clip(body?.email, 200).toLowerCase();
    if (name.length < 2) return json({ ok: false, error: 'Please enter your name.' }, 400, cors);
    if (!EMAIL_RE.test(email)) return json({ ok: false, error: 'Please enter a valid email address.' }, 400, cors);
    if (body?.consent !== true) return json({ ok: false, error: 'Please agree to receive emails to continue.' }, 400, cors);
    const page = clip(body?.page, 300);
    const result = await ctx.deliverLead({
      source: 'roof-visualizer',
      name,
      email,
      message: 'Signed up for the Roof Visualizer and agreed to receive emails from Quality Roofing Specialists, Inc.',
      page: page.startsWith('/') ? page : '',
      ...leadAttribution(body?.utm),
    });
    // With no lead channel set up at all (local development) the visitor still gets in; a configured system that failed to save them does not
    if (!result.delivered && result.configured) return json({ ok: false, error: 'not delivered' }, 502, cors);
    return json({ ok: true, token: await makePass(secret, { name, email }), name }, 200, cors);
  }

  if (body?.action === 'render') {
    const pass = await readPass(secret, body?.token);
    if (!pass) return json({ ok: false, error: 'pass', message: 'Please enter your name and email again.' }, 401, cors);
    const who = await hashIp(pass.email, env.IP_SALT || '');
    if ((await ctx.rateLimited(`viz-render:${who}`, RENDERS_PER_DAY, 86400)) || (await ctx.rateLimited(`viz-ip:${ip}`, 24, 86400))) {
      return json({ ok: false, error: 'limit', message: 'You’ve reached today’s limit of previews. Call us and we’ll show you more options.' }, 429, cors);
    }
    const brand = (catalog || []).find((b) => b.id === body?.brand);
    const color = brand?.colors.find((c) => c.id === body?.color);
    if (!brand || !color) return json({ ok: false, error: 'bad choice' }, 400, cors);
    const photo = IMAGE_RE.exec(typeof body?.image === 'string' && body.image.length <= MAX_IMAGE_CHARS ? body.image : '');
    if (!photo) return json({ ok: false, error: 'bad image', message: 'Please use a JPEG, PNG or WebP photo under 4 MB.' }, 400, cors);

    const out = await askGemini(env, ctx.fetch, photo[1], photo[2], buildPrompt(brand, color), await swatchPart(env, ctx.fetch, color.swatch));
    if (out.error) return json({ ok: false, error: out.error, message: 'We couldn’t make that preview. Please try again or use a clearer photo of the roof.' }, out.status, cors);

    // The first preview of the day tells the team what this person tried (one note a day per person, not one per picture)
    if (!(await ctx.rateLimited(`viz-note:${who}`, 1, 86400))) {
      ctx.waitUntil(
        Promise.resolve(
          ctx.deliverLead({
            source: 'roof-visualizer',
            name: pass.name,
            email: pass.email,
            message: `Tried ${brand.generic ? `the ${color.name} roof color` : `${brand.name} ${brand.line}, ${color.name}`} on their own roof photo in the Roof Visualizer.`,
            page: '/roof-visualizer/',
          })
        ).catch((err) => console.error('[visualize] note failed:', err?.message || err))
      );
    }
    return json({ ok: true, image: out.image, brand: brand.name, line: brand.line, generic: Boolean(brand.generic), color: color.name }, 200, cors);
  }
  return json({ ok: false, error: 'bad request' }, 400, cors);
}
