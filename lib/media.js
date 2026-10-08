// Where a photo is kept: mediaUrl('projects/<page-slug>/<file>.webp'). By default that is the site's own files (/images/<path>). Photos in the Supabase Storage
// bucket `site-images` (public) don't count toward Vercel's deployment storage, so once a folder of photos is uploaded there under the same paths, setting
// MEDIA_FROM_BUCKET=1 in Vercel and redeploying makes every mediaUrl() point at the bucket (next.config.mjs sets NEXT_PUBLIC_MEDIA_BASE at build time).
// next/image may load bucket photos (remotePatterns in next.config.mjs).
const BASE = process.env.NEXT_PUBLIC_MEDIA_BASE || '';
export const mediaUrl = (path) => (BASE ? `${BASE}/${path}` : `/images/${path}`);
