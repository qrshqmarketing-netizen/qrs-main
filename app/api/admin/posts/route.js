// POST { action, ... }: everything the dashboard changes about the articles. Needs the dashboard login and a request from this site's own
// pages. Actions: save (create or update from the editor's form), delete, status (publish or unpublish), homeSlot, import.
import { isAdmin, sameOrigin } from '@/lib/adminAuth';
import { knownPaths, refreshSite, today } from '@/lib/adminActions';
import { checkPost, formToPost } from '@/lib/articleFormat';
import { HOME_SLOTS, adminSyncFileImages, adminDeletePost, adminGetPost, adminImportFilePosts, adminSavePost, adminSetHomeSlot, adminSetStatus } from '@/lib/postsStore';
import { dbConfigured } from '@/lib/supabase';

const fail = (status, error, extra = {}) => Response.json({ ok: false, error, ...extra }, { status });
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export async function POST(request) {
  if (!(await sameOrigin())) return fail(403, 'Not allowed.');
  if (!(await isAdmin())) return fail(401, 'Your session ended. Log in again.');
  if (!dbConfigured()) return fail(503, 'Supabase is not connected yet.');
  if (Number(request.headers.get('content-length')) > 1_000_000) return fail(413, 'That is too much text for one save.');
  let body;
  try {
    body = await request.json();
  } catch {
    return fail(400, 'Bad request.');
  }
  try {
    switch (body?.action) {
      case 'save': {
        const { post, stray } = formToPost(body.form || {});
        const create = body.create === true;
        const { problems, seo, warnings } = checkPost(post, { knownPaths: await knownPaths() });
        if (stray) problems.push('There is text above the first "## Heading" in the body. Move it into the intro, or under a heading.');
        if (post.status === 'published' && seo.length) problems.push(...seo.map((s) => `To publish: ${s}`));
        if (post.homeSlot && (post.homeSlot < 1 || post.homeSlot > HOME_SLOTS)) problems.push('The home page spot has to be 1, 2 or 3.');
        if (post.homeSlot && post.status !== 'published') problems.push('Only a published article can have a home page spot.');
        if (problems.length) return fail(422, 'This can\'t be saved yet.', { problems });
        const existing = create ? null : await adminGetPost(post.slug);
        if (!create && !existing) return fail(404, 'That article no longer exists.');
        // "Updated" moves to today when a published article is edited, unless it is marked as a small fix
        post.dateModified = existing ? (existing.status === 'published' && post.status === 'published' && !body.keepDate ? today() : existing.dateModified) : undefined;
        await adminSavePost(post, { create });
        await refreshSite();
        return Response.json({ ok: true, slug: post.slug, status: post.status, warnings, dateModified: post.dateModified || null });
      }
      case 'delete': {
        if (!SLUG.test(body.slug || '')) return fail(400, 'Bad address.');
        await adminDeletePost(body.slug);
        await refreshSite();
        return Response.json({ ok: true });
      }
      case 'status': {
        const post = SLUG.test(body.slug || '') && (await adminGetPost(body.slug));
        if (!post) return fail(404, 'That article no longer exists.');
        const status = body.status === 'published' ? 'published' : 'draft';
        if (status === 'published') {
          const { problems, seo } = checkPost(post);
          if (problems.length || seo.length) return fail(422, 'This can\'t be published yet.', { problems: [...problems, ...seo] });
        }
        await adminSetStatus(post.slug, status);
        if (status === 'draft' && post.homeSlot) await adminSetHomeSlot(post.slug, null);
        await refreshSite();
        return Response.json({ ok: true });
      }
      case 'homeSlot': {
        const slot = body.slot ? Number(body.slot) : null;
        const post = SLUG.test(body.slug || '') && (await adminGetPost(body.slug));
        if (!post) return fail(404, 'That article no longer exists.');
        if (slot !== null && !(Number.isInteger(slot) && slot >= 1 && slot <= HOME_SLOTS)) return fail(400, 'The home page spot has to be 1, 2 or 3.');
        if (slot && post.status !== 'published') return fail(422, 'Only a published article can have a home page spot.');
        await adminSetHomeSlot(post.slug, slot);
        await refreshSite();
        return Response.json({ ok: true });
      }
      case 'import': {
        const result = await adminImportFilePosts();
        await refreshSite();
        return Response.json({ ok: true, ...result });
      }
      case 'syncImages': {
        const result = await adminSyncFileImages();
        await refreshSite();
        return Response.json({ ok: true, ...result });
      }
      default:
        return fail(400, 'Unknown action.');
    }
  } catch (err) {
    console.error('[admin] could not save:', err?.message || err);
    return fail(502, `Supabase said: ${String(err?.message || err).slice(0, 240)}`);
  }
}
