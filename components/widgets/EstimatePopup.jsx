'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from '@/lib/sitePath';
import StartStepper from '@/components/sections/StartStepper';
import { START_PATH } from '@/data/start';
import { PHONE, TEL } from '@/data/site';
import { isFocusPath } from '@/lib/landing';
import { langOf } from '@/lib/lang';
import { trackEvent } from '@/lib/tracking';
import './EstimatePopup.css';

// The estimate popup (owner, November 2 2026): every Get Pro Advice / Book a Free Roof Evaluation / Request an Estimate button on the site
// opens the step-by-step form of /start/ (StartStepper) in a popup instead of jumping to the form at the bottom of the page. It listens for
// clicks on any link to #estimate or #roof-check (what SiteLink renders for "#roof-check") and to /start/ (with ?need= / ?property=, which
// pre-answer the first steps), so the buttons, the header cell, the phone action bar and the links in the copy all open it without changes.
// Without JavaScript, or with a modifier key, the links work as before (the form at the bottom of the page, or /start/). Not on /start/ and
// the ad landing pages (their own form is the point of the page). The page's own form stays at the bottom for visitors who scroll there.
const TARGET = /(^|\/)#(estimate|roof-check)$/;

const parse = (a) => {
  const href = a.getAttribute('href') || '';
  if (TARGET.test(href)) return { need: '', property: '' };
  let url;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return null;
  }
  if (url.origin !== window.location.origin || url.pathname !== START_PATH) return null;
  return { need: url.searchParams.get('need') || '', property: url.searchParams.get('property') || '' };
};

export default function EstimatePopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState({ need: '', property: '', key: 0 });
  const panel = useRef(null);
  const opener = useRef(null);

  const close = useCallback(() => {
    setOpen(false);
    opener.current?.focus?.({ preventScroll: true });
  }, []);

  // Open on any estimate link click (capture phase, so it runs before the link's own scroll or page change)
  useEffect(() => {
    // Not on the Spanish home page (/es/): the steps are English there, so its buttons go to the Spanish form at the bottom of the page
    if (isFocusPath(pathname) || langOf(pathname) === 'es') return undefined;
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.('a[href]');
      if (!a || a.target === '_blank' || a.closest('.ep')) return;
      const found = parse(a);
      if (!found) return;
      e.preventDefault();
      e.stopPropagation();
      opener.current = a;
      setLink((prev) =>
        // keep the answers when the same kind of button is pressed again; a link that names a different need starts over
        prev.key && prev.need === found.need && prev.property === found.property ? prev : { ...found, key: prev.key + 1 },
      );
      setOpen(true);
      trackEvent('estimate_popup_open', { link_text: (a.textContent || '').trim().slice(0, 60), page_path: window.location.pathname });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [pathname]);

  // A new page closes it
  useEffect(() => setOpen(false), [pathname]);

  // While open: the page behind doesn't scroll (promo-open also pauses the smooth scrolling, StudioMotion.jsx), Escape closes, Tab stays inside
  useEffect(() => {
    if (!open) return undefined;
    document.body.classList.add('promo-open', 'ep-open');
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab' || !panel.current) return;
      const items = [...panel.current.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select,textarea,[tabindex]:not([tabindex="-1"])')].filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    const t = setTimeout(() => panel.current?.querySelector('.st-choice, .st-chip, input')?.focus({ preventScroll: true }), 60);
    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('promo-open', 'ep-open');
    };
  }, [open, close]);

  if (!link.key) return null; // nothing in the page until a button is pressed

  return (
    <div className={'ep' + (open ? ' is-open' : '')} hidden={!open}>
      <div className="ep-backdrop" onClick={close} aria-hidden="true" />
      <div className="ep-panel" role="dialog" aria-modal="true" aria-labelledby="ep-title" ref={panel} data-lenis-prevent>
        <button type="button" className="ep-close" onClick={close} aria-label="Close the request form">
          <span aria-hidden="true">×</span>
        </button>
        <StartStepper key={link.key} modal need={link.need} property={link.property} titleId="ep-title" />
        <p className="ep-call">
          Rather talk? <a href={`tel:${TEL}`}>Call {PHONE}</a>
        </p>
      </div>
    </div>
  );
}
