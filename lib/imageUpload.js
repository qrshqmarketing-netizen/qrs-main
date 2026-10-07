// The checks and names for pictures uploaded in the dashboard (app/api/admin/upload/route.js). No imports besides node:crypto, so it is tested on its own.
import { randomBytes } from 'node:crypto';

export const BUCKET = 'site-images';
export const MAX_BYTES = 4 * 1024 * 1024; // under the 4.5 MB request limit on Vercel (the bucket itself allows 5 MB)

// What the file really is, from its first bytes (the name and the type the browser sent can say anything). null when it isn't a picture we accept.
export function sniffImage(bytes) {
  const b = bytes;
  if (b.length > 12 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return { type: 'image/jpeg', ext: 'jpg' };
  if (b.length > 12 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return { type: 'image/png', ext: 'png' };
  if (b.length > 12 && String.fromCharCode(...b.slice(0, 4)) === 'RIFF' && String.fromCharCode(...b.slice(8, 12)) === 'WEBP') return { type: 'image/webp', ext: 'webp' };
  if (b.length > 12 && String.fromCharCode(...b.slice(4, 12)) === 'ftypavif') return { type: 'image/avif', ext: 'avif' };
  return null;
}

// A new file name every time (words from the original name + random letters), so a replaced picture never shows an old cached copy
export function uploadName(original, ext) {
  const base = String(original || 'picture').replace(/\.[^.]*$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 50) || 'picture';
  return `${base}-${randomBytes(3).toString('hex')}.${ext}`;
}

export const publicUrl = (supabaseUrl, path) => `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${path}`;
