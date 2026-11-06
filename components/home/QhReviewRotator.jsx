'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { GoogleLogo } from '@/components/ui/icons';
import { getLiveReviews } from '@/lib/liveReviews';
import { t } from '@/lib/lang';
import { sortReviewsFor } from '@/lib/reviewTopics';
import { usePathname } from '@/lib/sitePath';

const EVERY = 7000; // ms each review stays on screen

// Every quote about the same length (owner, November 6 2026: "keep the same character counts"): whole sentences up to about 150 characters,
// or the first sentence cut at a word with "…" when it runs longer than 165
const TARGET = 150;
const MAX = 165;
function quoteOf(text) {
  const full = String(text || '').replace(/\s+/g, ' ').trim();
  if (full.length <= MAX) return full;
  // a sentence end between 120 and 165 characters, else a cut at a word near 150
  let q = '';
  for (const s of full.split(/(?<=[.!?])\s+/)) {
    const next = q ? `${q} ${s}` : s;
    if (next.length > MAX) break;
    q = next;
  }
  if (q.length >= TARGET - 30) return q;
  return full.slice(0, TARGET).replace(/[\s,;:–—-]+\S*$/, '') + '…';
}
const shortName = (name = '') => {
  const [first, last] = name.trim().split(/\s+/);
  return last ? `${first} ${last[0]}.` : first;
};

// The review section's quotes, one at a time (owner, November 6 2026): the hand-picked reviews closest to the page's topic first, then, once the
// section nears the screen, the live 5-star Google reviews (one shared, uncached request, lib/liveReviews.js) with Google's credits: the
// reviewer's name linked to their profile and "View on Google Maps". Reviews that name a city or neighborhood are left out (`placeNames`: no place
// names on these pages). A new quote every 7 seconds while on screen, paused on hover and keyboard focus; arrows and dots move by hand; reduced
// motion: no automatic change.
export default function QhReviewRotator({ initial = [], placeNames = [], lang = 'en' }) {
  const T = (x, v) => t(lang, x, v);
  const pathname = usePathname();
  const [live, setLive] = useState(null);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const root = useRef(null);
  const placeRe = useMemo(
    () => (placeNames.length ? new RegExp(`\\b(${placeNames.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`) : null),
    [placeNames]
  );
  const reviews = useMemo(() => {
    const liveOnes = live ? sortReviewsFor(live.reviews, pathname).map((r) => ({ ...r, live: true })) : [];
    const all = [...initial, ...liveOnes].filter((r) => r.text && !(placeRe && placeRe.test(r.text)));
    const seen = new Set();
    return all.filter((r) => {
      const key = (r.name || '') + quoteOf(r.text).slice(0, 40);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [initial, live, pathname, placeRe]);

  // Fetch the live reviews when the section is about to scroll into view; track whether it is on screen
  useEffect(() => {
    const el = root.current;
    if (!el || !('IntersectionObserver' in window)) return;
    let asked = false;
    const watcher = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting && !asked && lang !== 'es') {
          asked = true;
          getLiveReviews('').then((data) => data && setLive(data));
        }
      },
      { rootMargin: '200px' }
    );
    watcher.observe(el);
    return () => watcher.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !visible || reviews.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => setI((n) => (n + 1) % reviews.length), EVERY);
    return () => clearTimeout(t);
  }, [i, paused, visible, reviews.length]);

  if (!reviews.length) return null;
  const at = i % reviews.length;
  const r = reviews[at];
  const go = (n) => setI((n + reviews.length) % reviews.length);
  return (
    <div
      className="qh-rot"
      ref={root}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <figure className="qh-rot-item" key={at} aria-live="polite">
        <blockquote>“{quoteOf(r.text)}”</blockquote>
        <figcaption>
          {r.live && r.photoUrl && <img className="qh-rot-photo" src={r.photoUrl} alt="" width="32" height="32" referrerPolicy="no-referrer" />}
          {r.live && r.profileUrl ? (
            <a href={r.profileUrl} target="_blank" rel="noopener">{shortName(r.name)}</a>
          ) : (
            <span>{shortName(r.name)}</span>
          )}
          <span className="qh-rot-src">
            <GoogleLogo className="g-logo-sm" /> {r.live ? 'Google Maps' : T(r.translated ? 'Google review, translated from English' : 'Google review')}
          </span>
          {r.live && r.reviewUrl && (
            <a className="qh-rot-maps" href={r.reviewUrl} target="_blank" rel="noopener">{T('View on Google Maps')}</a>
          )}
        </figcaption>
      </figure>
      {reviews.length > 1 && (
        <div className="qh-rot-nav">
          <button type="button" onClick={() => go(at - 1)} aria-label={T('Previous review')}>←</button>
          <ol>
            {reviews.map((rv, n) => (
              <li key={n}>
                <button type="button" className={n === at ? 'on' : undefined} onClick={() => go(n)} aria-label={T('Review {n} of {total}', { n: n + 1, total: reviews.length })} aria-current={n === at || undefined} />
              </li>
            ))}
          </ol>
          <button type="button" onClick={() => go(at + 1)} aria-label={T('Next review')}>→</button>
        </div>
      )}
    </div>
  );
}
