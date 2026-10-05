'use client';

import { useEffect, useRef, useState } from 'react';
import { AUDIENCE_FILTERS, TOPIC_FILTERS } from '@/lib/blogFilters';
import { PostCard } from './PostCards';
import './PostCards.css';

const PAGE_SIZE = 9;
const find = (filters, key) => filters.find((f) => f.key === key);

function Chips({ label, allLabel, filters, value, onPick, enabled }) {
  return (
    <div className="pc-group" role="group" aria-label={label}>
      <span className="pc-group-label" aria-hidden="true">{label}</span>
      <div className="pc-chips">
        <button type="button" className="pc-chip" aria-pressed={value === 'all'} onClick={() => onPick('all')}>
          {allLabel}
        </button>
        {filters.map((f) => (
          <button type="button" key={f.key} className="pc-chip" aria-pressed={value === f.key} disabled={!enabled(f)} onClick={() => onPick(f.key)}>
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Blog index: filters (who it is for, what it covers), the article cards and the page buttons. Every card is in the page's HTML
// (the ones not on screen are `hidden`), so all the articles stay links for search engines and without JavaScript. The newest
// article is already large in the hero, so it joins the list only when a filter is on. The address keeps the choice
// (/blog/?audience=commercial&topic=storm&page=2) so it can be shared. posts: from app/blog/page.js
export default function BlogBrowser({ posts = [], heading }) {
  const [audience, setAudience] = useState('all');
  const [topic, setTopic] = useState('all');
  const [page, setPage] = useState(1);
  const [synced, setSynced] = useState(false);
  const top = useRef(null);

  // Start from the choice in the address
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (find(AUDIENCE_FILTERS, query.get('audience'))) setAudience(query.get('audience'));
    if (find(TOPIC_FILTERS, query.get('topic'))) setTopic(query.get('topic'));
    const n = parseInt(query.get('page'), 10);
    if (n > 1) setPage(n);
    setSynced(true);
  }, []);

  // Keep the address in step with it
  useEffect(() => {
    if (!synced) return;
    const query = new URLSearchParams();
    if (audience !== 'all') query.set('audience', audience);
    if (topic !== 'all') query.set('topic', topic);
    if (page > 1) query.set('page', String(page));
    const search = query.toString();
    window.history.replaceState(null, '', window.location.pathname + (search ? `?${search}` : '') + window.location.hash);
  }, [synced, audience, topic, page]);

  const a = find(AUDIENCE_FILTERS, audience);
  const t = find(TOPIC_FILTERS, topic);
  const filtering = Boolean(a || t);
  const fits = (post, wantA = a, wantT = t) => (!wantA || wantA.matches(post.topics)) && (!wantT || wantT.matches(post.topics));
  const shown = posts.filter((post) => fits(post) && (filtering || !post.featured));
  const pages = Math.max(1, Math.ceil(shown.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const first = (current - 1) * PAGE_SIZE;
  const onPage = new Set(shown.slice(first, first + PAGE_SIZE).map((post) => post.slug));

  // A filter is offered when some article has it, and it can be added to the other filter that is on
  const audiences = AUDIENCE_FILTERS.filter((f) => posts.some((post) => f.matches(post.topics)));
  const topics = TOPIC_FILTERS.filter((f) => posts.some((post) => f.matches(post.topics)));

  const pick = (setFilter) => (key) => {
    setFilter(key);
    setPage(1);
  };
  const clear = () => {
    setAudience('all');
    setTopic('all');
    setPage(1);
  };
  const goTo = (n) => {
    setPage(n);
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' }));
  };

  return (
    <section className="post-cards tile-pattern">
      <div className="container">
        {heading && (
          <div className="section-head">
            <h2>{heading}</h2>
          </div>
        )}
        {posts.length > 1 && (
          <div className="pc-filters pc-controls" ref={top}>
            <Chips
              label="Show"
              allLabel="All"
              filters={audiences}
              value={audience}
              onPick={pick(setAudience)}
              enabled={(f) => posts.some((post) => fits(post, f, t))}
            />
            <Chips
              label="Topic"
              allLabel="All topics"
              filters={topics}
              value={topic}
              onPick={pick(setTopic)}
              enabled={(f) => posts.some((post) => fits(post, a, f))}
            />
          </div>
        )}
        {posts.length > 1 && (
          <p className="pc-status pc-controls" aria-live="polite">
            {shown.length
              ? `Showing ${first + 1}–${Math.min(first + PAGE_SIZE, shown.length)} of ${shown.length} articles`
              : 'No articles match these filters yet.'}
            {filtering && (
              <button type="button" className="pc-clear" onClick={clear}>
                Clear filters
              </button>
            )}
          </p>
        )}
        <div className="pc-grid">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} hidden={!onPage.has(post.slug)} />
          ))}
        </div>
        {pages > 1 && (
          <nav className="pc-pages pc-controls" aria-label="Blog pages">
            <button type="button" className="pc-page pc-page-step" onClick={() => goTo(current - 1)} disabled={current === 1}>
              Previous
            </button>
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <button
                type="button"
                key={n}
                className="pc-page"
                aria-label={`Page ${n}`}
                aria-current={n === current ? 'page' : undefined}
                onClick={() => goTo(n)}
              >
                {n}
              </button>
            ))}
            <button type="button" className="pc-page pc-page-step" onClick={() => goTo(current + 1)} disabled={current === pages}>
              Next
            </button>
          </nav>
        )}
        {/* Without JavaScript the buttons do nothing, so show every article */}
        <noscript>
          <style>{'.pc-card[hidden]{display:flex}.pc-controls{display:none}'}</style>
        </noscript>
      </div>
    </section>
  );
}
