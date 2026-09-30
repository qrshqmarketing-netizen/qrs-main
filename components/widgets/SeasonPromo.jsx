'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { CloseIcon, PhoneIcon } from '@/components/ui/icons';
import { SEASON_PROMO as promo } from '@/data/promo';
import { PHONE, TEL } from '@/data/site';
import { COOKIE_OK_EVENT, COOKIE_OK_KEY } from '@/lib/events';
import { local, session } from '@/lib/storage';
import './SeasonPromo.css';

const FIRST_MS = 3000, EXIT_ARM_MS = 8000;
const SERVICE = 'Roof inspection / roof check'; // estimate form option picked by the promo button (data/estimateOptions.js)

// The $199 Roof Check season promo (copy in data/promo.js): a centered modal over a dark overlay, at most once per visit.
// - first visit: shortly after the cookie notice is accepted (the review toast waits while it's open)
// - later visits, desktop only: when the pointer leaves through the top of the window
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
      t = setTimeout(show, FIRST_MS);
    };
    if (local.get(COOKIE_OK_KEY)) start();
    else window.addEventListener(COOKIE_OK_EVENT, start, { once: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener(COOKIE_OK_EVENT, start);
    };
  }, []);

  // Exit intent (mouse and trackpad only; phones have no reliable signal, so they never see it)
  useEffect(() => {
    if (!promo.active || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let armed = false;
    const arm = setTimeout(() => (armed = true), EXIT_ARM_MS);
    const onOut = (e) => {
      if (!armed || e.relatedTarget || e.clientY > 0) return;
      if (session.get('promoShown') || local.get('promoClaimed') || blocked()) return;
      session.set('promoShown', '1');
      setView('exit');
    };
    document.addEventListener('mouseout', onOut);
    return () => {
      clearTimeout(arm);
      document.removeEventListener('mouseout', onOut);
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

  // Pre-pick the Roof Check in the estimate form, then let the #roof-check link scroll to it
  const claim = () => {
    local.set('promoClaimed', '1');
    const select = document.getElementById('service');
    if (select) select.value = SERVICE;
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
        <button className="promo-close" type="button" aria-label="Close" onClick={close} ref={closeRef}>
          <CloseIcon />
        </button>
        <div className="promo-eyebrow">{promo.eyebrow}</div>
        <p className="promo-title" id="promoTitle">
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
