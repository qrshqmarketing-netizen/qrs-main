// POST (multipart, field "file"): uploads a picture from the dashboard to the Supabase Storage bucket `site-images` (scripts/supabase-storage.sql) and
// answers with its public address. Needs the dashboard login and a request from this site's own pages. The picture is checked by its real bytes
// (JPEG, PNG, WebP or AVIF, up to 4 MB) and always gets a new file name.
import { isAdmin, sameOrigin } from '@/lib/adminAuth';
import { BUCKET, MAX_BYTES, publicUrl, sniffImage, uploadName } from '@/lib/imageUpload';
import { dbConfigured, dbHeaders, dbSettings } from '@/lib/supabase';

const fail = (status, error) => Response.json({ ok: false, error }, { status });

export async function POST(request) {
  if (!(await sameOrigin())) return fail(403, 'Not allowed.');
  if (!(await isAdmin())) return fail(401, 'Your session ended. Log in again.');
  if (!dbConfigured()) return fail(503, 'Supabase is not connected yet.');
  let file;
  try {
    file = (await request.formData()).get('file');
  } catch {
    return fail(400, 'Bad request.');
  }
  if (!file || typeof file === 'string' || !file.size) return fail(400, 'Choose a picture first.');
  if (file.size > MAX_BYTES) return fail(413, 'That picture is over 4 MB. Make it smaller (a WebP of 200 to 400 KB is ideal) and try again.');
  const bytes = new Uint8Array(await file.arrayBuffer());
  const kind = sniffImage(bytes);
  if (!kind) return fail(415, 'Only JPEG, PNG, WebP or AVIF pictures can be uploaded.');
  const path = `blog/${uploadName(file.name, kind.ext)}`;
  const { url, key } = dbSettings();
  try {
    const res = await fetch(`${url}/storage/v1/object/${BUCKET}/${path}`, {
      method: 'POST',
      headers: dbHeaders(key, { 'Content-Type': kind.type, 'Cache-Control': 'max-age=31536000', 'x-upsert': 'false' }),
      body: bytes,
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) {
      const detail = (await res.text().catch(() => '')).slice(0, 200);
      console.error('[admin upload]', res.status, detail);
      return fail(/not found|bucket/i.test(detail) ? 503 : 502, /not found|bucket/i.test(detail) ? 'The picture bucket does not exist yet. In Supabase, open the SQL Editor and run scripts/supabase-storage.sql.' : `Supabase said: ${detail || res.status}`);
    }
  } catch (err) {
    console.error('[admin upload]', err);
    return fail(502, 'Could not reach Supabase. Try again in a moment.');
  }
  return Response.json({ ok: true, url: publicUrl(url, path) });
}
