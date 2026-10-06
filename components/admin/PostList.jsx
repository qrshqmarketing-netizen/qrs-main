'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from './api';

const SPOTS = [1, 2, 3];
const day = (iso) => (iso ? new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }) : '');

// The dashboard home: the home page's featured spots, the list of articles, and the one-time import. `problem` explains why the list is empty
// when Supabase isn't ready.
export default function PostList({ posts, problem }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null); // { kind: 'ok' | 'bad', text, list }

  const run = async (body, done) => {
    setBusy(true);
    setMessage(null);
    const res = await adminApi('/api/admin/posts', body);
    setBusy(false);
    if (res.ok) {
      if (done) setMessage({ kind: 'ok', text: done(res) });
      router.refresh();
    } else if (res.status === 401) {
      router.refresh();
    } else {
      setMessage({ kind: 'bad', text: res.error || 'That did not work.', list: res.problems });
    }
  };

  const logout = async () => {
    await adminApi('/api/admin/logout', {});
    router.refresh();
  };

  const published = posts.filter((p) => p.status === 'published' && !p.noindex);
  const holder = (spot) => posts.find((p) => p.homeSlot === spot);
  const chooseSpot = (spot, slug) => {
    const current = holder(spot);
    if (!slug) {
      if (current) run({ action: 'homeSlot', slug: current.slug, slot: null }, () => `Spot ${spot} now shows the newest article.`);
    } else run({ action: 'homeSlot', slug, slot: spot }, () => `Spot ${spot} saved. The home page is updating.`);
  };

  const publish = (post, status) =>
    run({ action: 'status', slug: post.slug, status }, () => (status === 'published' ? `"${post.title}" is published.` : `"${post.title}" is now a draft and off the site.`));

  return (
    <div className="adm-wrap">
      <div className="adm-bar">
        <h1>Blog articles</h1>
        <nav>
          <Link className="adm-btn adm-btn-primary" href="/admin/new">New article</Link>
          <a className="adm-btn" href="/" target="_blank" rel="noopener">View the site</a>
          <button className="adm-btn" type="button" onClick={logout}>Log out</button>
        </nav>
      </div>

      {message && (
        <div className={`adm-msg ${message.kind}`} role="status">
          {message.text}
          {message.list?.length > 0 && <ul>{message.list.map((p) => <li key={p}>{p}</li>)}</ul>}
        </div>
      )}
      {problem && <div className="adm-msg bad">{problem}</div>}

      {!problem && (
        <section className="adm-card" aria-labelledby="adm-home">
          <h2 id="adm-home">Featured on the home page</h2>
          <p className="adm-help">The home page shows three articles. Pick which ones, in order. A spot left on "Newest" shows the newest article that isn't already picked.</p>
          <div className="adm-slots">
            {SPOTS.map((spot) => (
              <div className="adm-field" key={spot}>
                <label htmlFor={`spot-${spot}`}>Spot {spot}</label>
                <select id={`spot-${spot}`} value={holder(spot)?.slug || ''} disabled={busy} onChange={(e) => chooseSpot(spot, e.target.value)}>
                  <option value="">Newest (automatic)</option>
                  {published.map((p) => (
                    <option key={p.slug} value={p.slug}>{p.title}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="adm-card" aria-labelledby="adm-articles">
        <h2 id="adm-articles">All articles ({posts.length})</h2>
        {!problem && posts.length === 0 && (
          <div className="adm-msg warn">
            No articles in the database yet. Press <strong>Import the articles from the site files</strong> below to copy the existing ones in. It never overwrites anything.
          </div>
        )}
        {posts.length > 0 && (
          <table className="adm-table">
            <thead>
              <tr>
                <th>Article</th>
                <th>Status</th>
                <th>Date</th>
                <th>Home page</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.slug}>
                  <td>
                    <Link className="t" href={`/admin/posts/${p.slug}`}>{p.title}</Link>
                    <span className="s">/blog/{p.slug}/{p.noindex ? ' · hidden from search' : ''}{p.hasImage ? '' : ' · no image yet'}</span>
                  </td>
                  <td><span className={`adm-chip ${p.status === 'published' ? 'pub' : 'draft'}`}>{p.status === 'published' ? 'Published' : 'Draft'}</span></td>
                  <td>{day(p.datePublished)}{p.dateModified && p.dateModified !== p.datePublished ? <span className="s">Updated {day(p.dateModified)}</span> : null}</td>
                  <td>{p.homeSlot ? `Spot ${p.homeSlot}` : ''}</td>
                  <td>
                    <Link href={`/admin/posts/${p.slug}`}>Edit</Link>
                    {' · '}
                    {p.status === 'published' ? (
                      <>
                        <a href={`/blog/${p.slug}/`} target="_blank" rel="noopener">View</a>
                        {' · '}
                        <button className="adm-btn" type="button" disabled={busy} onClick={() => publish(p, 'draft')}>Unpublish</button>
                      </>
                    ) : (
                      <>
                        <Link href={`/admin/preview/${p.slug}`} target="_blank">Preview</Link>
                        {' · '}
                        <button className="adm-btn" type="button" disabled={busy} onClick={() => publish(p, 'published')}>Publish</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!problem && (
          <div className="adm-actions">
            <button
              className="adm-btn"
              type="button"
              disabled={busy}
              onClick={() => run({ action: 'import' }, (r) => `Imported ${r.added} article${r.added === 1 ? '' : 's'}${r.alreadyThere ? ` (${r.alreadyThere} were already there and were left alone)` : ''}.`)}
            >
              Import the articles from the site files
            </button>
            <span className="adm-hint">Safe to press any time: an article that is already here is never overwritten.</span>
          </div>
        )}
      </section>
    </div>
  );
}
