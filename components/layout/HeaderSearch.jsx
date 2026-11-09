'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from '@/lib/sitePath';
import SiteLink from '@/components/ui/SiteLink';

// The header's search (owner, November 9 2026): a magnifier cell in the bar opens a search bar under it. Typing shows up to six instant
// suggestions from /api/search/ (the site's own page index, lib/siteSearch.js), arrow keys move through them, Enter opens the chosen one or the
// full results page (/search/?q=). It is a plain GET form, so without JavaScript Enter still opens the results page. Escape, a new page or a
// click outside closes it.
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="m15.5 15.5 5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export default function HeaderSearch({ onOpen }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [hits, setHits] = useState([]);
  const [active, setActive] = useState(-1);
  const input = useRef(null);
  const box = useRef(null);
  const button = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (open) {
      onOpen?.();
      setTimeout(() => input.current?.focus(), 30);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
      }
    };
    const onDown = (e) => {
      if (!box.current?.contains(e.target) && !button.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  // Suggestions, a moment after typing stops
  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) {
      setHits([]);
      return undefined;
    }
    const ctrl = new AbortController();
    const timer = setTimeout(() => {
      fetch(`/api/search/?q=${encodeURIComponent(term)}`, { signal: ctrl.signal })
        .then((r) => (r.ok ? r.json() : { results: [] }))
        .then((d) => {
          setHits(d.results || []);
          setActive(-1);
        })
        .catch(() => {});
    }, 160);
    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [q]);

  const onKeyDown = (e) => {
    if (!hits.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, hits.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, -1));
    } else if (e.key === 'Enter' && active >= 0) {
      e.preventDefault();
      router.push(hits[active].path);
      setOpen(false);
    }
  };

  return (
    <>
      <button
        ref={button}
        type="button"
        className={'hd-cell hd-search' + (open ? ' on' : '')}
        aria-label={open ? 'Close search' : 'Search the site'}
        aria-expanded={open}
        aria-controls="hdSearch"
        title="Search"
        onClick={() => setOpen((o) => !o)}
      >
        <SearchIcon />
      </button>
      <div className={'hd-search-box' + (open ? ' is-open' : '')} id="hdSearch" ref={box} inert={!open}>
        <form action="/search/" method="get" role="search" onSubmit={() => setOpen(false)}>
          <SearchIcon />
          <label className="sr-only" htmlFor="hdSearchQ">
            Search the site
          </label>
          <input
            ref={input}
            id="hdSearchQ"
            name="q"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search roof repair, tile, your city…"
            autoComplete="off"
            role="combobox"
            aria-expanded={hits.length > 0}
            aria-controls="hdSearchList"
            aria-activedescendant={active >= 0 ? `hdHit${active}` : undefined}
          />
          <button type="submit">Search</button>
        </form>
        {hits.length > 0 && (
          <ul className="hd-search-hits" id="hdSearchList" role="listbox">
            {hits.map((h, i) => (
              <li key={h.path} id={`hdHit${i}`} role="option" aria-selected={i === active}>
                <SiteLink href={h.path} prefetch={false} className={i === active ? 'on' : undefined} onClick={() => setOpen(false)}>
                  <b>{h.title}</b>
                  <small>{h.group}</small>
                </SiteLink>
              </li>
            ))}
            <li className="hd-search-all">
              <SiteLink href={`/search/?q=${encodeURIComponent(q.trim())}`} prefetch={false} onClick={() => setOpen(false)}>
                See all results for “{q.trim()}”
              </SiteLink>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
