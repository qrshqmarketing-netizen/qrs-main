'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { CloseIcon, PhoneIcon } from '@/components/ui/icons';
import { SEASON_PROMO as promo } from '@/data/promo';
import { PHONE, TEL } from '@/data/site';
import { COOKIE_OK_EVENT, COOKIE_OK_KEY } from '@/lib/events';
import { local, session } from '@/lib/storage';
import PromoRain from './PromoRain';
import './SeasonPromo.css';

const FIRST_MS = 3000, EXIT_ARM_MS = 8000;
const FLICK_PX = 350, FLICK_MS = 300; // phones: an upward scroll this far this fast, once they're a screen down, reads as leaving
const PHOTO = '/images/season-promo-storm-over-los-angeles.webp'; // the card's background (SeasonPromo.css)

// Fetch the background photo a few seconds before the card can open, so it doesn't appear on an empty navy card
const preloadPhoto = () => {
  new Image().src = PHOTO;
};

// The El Niño season promo for the free roof evaluation (copy in data/promo.js): a centered modal over a dark overlay,
// at most once per visit. Preview it any time with ?promo (or ?promo=exit for the "before you go" version) on any page.
// - first visit: shortly after the cookie notice is accepted (the review toast waits while it's open)
// - later visits: on desktop when the pointer leaves through the top of the window; on phones and tablets when
//   they flick quickly back up the page (reaching for the address bar) or come back after switching tabs or apps
// Click outside, Esc or ✕ closes it (the exit version also has "No thanks"); once someone books from it, it never shows again.
export default function SeasonPromo() {
  const [view, setView] = useState(null); // 'card' | 'exit' | null
  const pathname = usePathname();
  const path = useRef(pathname);
  const closeRef = useRef(null);

  useEffect(() => {
    path.current = pathname;
    if (promo.exclude.some((p) => pathname.startsWith(p))) setView(null);
  }, [pathname]);

  const blocked = () =>
    !promo.active ||
    promo.exclude.some((p) => path.current.startsWith(p)) ||
    ['menu-open', 'rm-lock', 'cookie-open'].some((c) => document.body.classList.contains(c));

  // Preview: ?promo or ?promo=exit opens the card right away, whatever this browser has seen before
  useEffect(() => {
    const preview = new URLSearchParams(window.location.search).get('promo');
    if (preview !== null) setView(preview === 'exit' ? 'exit' : 'card');
  }, []);

  // First visit
  useEffect(() => {
    if (!promo.active || local.get('promoSeen')) return;
    let t;
    const show = () => {
      if (blocked()) {
        t = setTimeout(show, 2000);
        return;
      }
      local.set('promoSeen', '1');
      session.set('promoShown', '1');
      setView('card');
    };
    const start = () => {
      preloadPhoto();
      t = setTimeout(show, FIRST_MS);
    };
    if (local.get(COOKIE_OK_KEY)) start();
    else window.addEventListener(COOKIE_OK_EVENT, start, { once: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener(COOKIE_OK_EVENT, start);
    };
  }, []);

  // Exit intent
  useEffect(() => {
    if (!promo.active) return;
    let armed = false;
    const arm = setTimeout(() => {
      armed = true;
      if (!session.get('promoShown') && !local.get('promoClaimed')) preloadPhoto();
    }, EXIT_ARM_MS);
    const showExit = () => {
      if (!armed || session.get('promoShown') || local.get('promoClaimed') || blocked()) return;
      session.set('promoShown', '1');
      setView('exit');
    };

    // Mouse and trackpad: the pointer leaves through the top of the window
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const onOut = (e) => !e.relatedTarget && e.clientY <= 0 && showExit();
      document.addEventListener('mouseout', onOut);
      return () => {
        clearTimeout(arm);
        document.removeEventListener('mouseout', onOut);
      };
    }

    // Touch: a fast flick back up the page, or returning to the tab after leaving it
    let mark = { y: window.scrollY, t: Date.now() };
    const onScroll = () => {
      const y = window.scrollY, t = Date.now();
      if (y > mark.y || t - mark.t > FLICK_MS) mark = { y, t };
      else if (mark.y > window.innerHeight && mark.y - y > FLICK_PX) showExit();
    };
    const onVisible = () => document.visibilityState === 'visible' && showExit();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      clearTimeout(arm);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('promo-open', view !== null);
    if (!view) return;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e) => e.key === 'Escape' && setView(null);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [view]);

  if (!view) return null;

  const close = () => setView(null);

  // The button's link (data/promo.js) opens the request steps with the roof inspection picked; remember the claim and close the card
  const claim = () => {
    local.set('promoClaimed', '1');
    setView(null);
  };

  const isExit = view === 'exit';
  const heading = isExit ? promo.exit.heading : promo.heading;
  const text = isExit ? promo.exit.text : promo.text;

  return (
    <div className="promo-backdrop" onClick={close}>
      <div
        className="promo"
        role="dialog"
        aria-modal="true"
        aria-labelledby="promoTitle"
        onClick={(e) => e.stopPropagation()}
      >
        {promo.rain && <PromoRain />}
        <button className="promo-close" type="button" aria-label="Close" onClick={close} ref={closeRef}>
          <CloseIcon />
        </button>
        <div className="promo-eyebrow">{promo.eyebrow}</div>
        <p className={'promo-title' + (isExit ? ' promo-title-exit' : '')} id="promoTitle">
          {heading}
        </p>
        <p className="promo-text">{text}</p>
        <div className="promo-actions">
          <a className="btn btn-gold" href={promo.cta.href} onClick={claim}>
            {promo.cta.label}
          </a>
          {isExit ? (
            <button className="promo-skip" type="button" onClick={close}>
              No thanks
            </button>
          ) : (
            <a className="promo-call" href={TEL}>
              <PhoneIcon /> {PHONE}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
