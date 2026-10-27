'use client';

import { useEffect, useRef, useState } from 'react';
import { PRIVACY_POLICY_URL } from '@/data/site';
import { COOKIE_SETTINGS_EVENT, currentConsent, saveConsent, storedConsent } from '@/lib/consent';
import { COOKIE_OK_EVENT, COOKIE_OK_KEY } from '@/lib/events';
import { local } from '@/lib/storage';
import { afterSplash } from '@/lib/splash';
import './CookieNotice.css';

// The cookie bar (owner, October 15 2026): the full width of the bottom of the screen, on a first visit until the visitor chooses.
// "Accept all", "Necessary only", or "Settings", which opens switches for each kind of cookie (lib/consent.js applies and saves them).
// The October 26 version that opened with the switches showing (about 612px tall on a phone) was taken back on October 27 after calls dropped.
// The footer's "Cookie settings" link opens it again at the settings. While it is up, body has `cookie-open` (the El Niño pop-up waits for it).

const KINDS = [
  { key: 'necessary', title: 'Necessary', text: 'Keep the site working: your light or dark theme, this cookie choice and the details a request form needs. Always on.', locked: true },
  { key: 'analytics', title: 'Analytics', text: 'Google Analytics counts which pages are visited and how people found us, Google Ads measures which ads bring visits and requests, and CallRail may show a tracking phone number so we know how callers found us.' },
  { key: 'clarity', title: 'Site improvement', text: 'Microsoft Clarity records clicks and scrolling (not what you type) so we can see where the site is hard to use.' },
];

export default function CookieNotice() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [choice, setChoice] = useState({ analytics: true, clarity: true });
  const panel = useRef(null);
  const fromLink = useRef(false); // opened from the footer link: move the focus to the first switch (not on a first visit)
  const bar = useRef(null);

  // First visit: show the bar after a moment, until a choice is saved
  useEffect(() => {
    setChoice(currentConsent());
    if (storedConsent()) return undefined;
    // On a first visit to the home page it waits for the opening splash to finish (lib/splash.js)
    let t;
    const stop = afterSplash(() => { t = setTimeout(() => setOpen(true), 1200); });
    return () => { stop(); clearTimeout(t); };
  }, []);

  // The footer link: open again, at the settings
  useEffect(() => {
    const show = () => {
      setChoice(currentConsent());
      fromLink.current = true;
      setSettings(true);
      setOpen(true);
    };
    window.addEventListener(COOKIE_SETTINGS_EVENT, show);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, show);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('cookie-open', open);
  }, [open]);

  // While the bar is up, its height is --cookie-h on <html>, so the chat bubble (RoofAssistant.css) rises above it instead of covering its buttons
  useEffect(() => {
    const root = document.documentElement;
    const el = bar.current;
    if (!open || !el || !('ResizeObserver' in window)) return undefined;
    const watch = new ResizeObserver(() => root.style.setProperty('--cookie-h', `${el.offsetHeight}px`));
    watch.observe(el);
    return () => {
      watch.disconnect();
      root.style.removeProperty('--cookie-h');
    };
  }, [open]);

  useEffect(() => {
    if (open && settings && fromLink.current) panel.current?.querySelector('input:not([disabled])')?.focus({ preventScroll: true });
  }, [open, settings]);

  if (!open) return null;

  const save = (next) => {
    saveConsent(next);
    local.set(COOKIE_OK_KEY, '1');
    window.dispatchEvent(new Event(COOKIE_OK_EVENT));
    setOpen(false);
    setSettings(false);
    fromLink.current = false;
  };

  return (
    <div className={'cookie' + (settings ? ' is-settings' : '')} role="region" aria-label="Cookie settings" ref={bar}>
      <div className="cookie-inner">
        {settings && (
          <fieldset className="cookie-kinds" ref={panel}>
            <legend>Choose which cookies we can use</legend>
            {KINDS.map((k) => (
              <label key={k.key} className="cookie-kind">
                <span className="cookie-kind-copy">
                  <b>{k.title}</b>
                  <span>{k.text}</span>
                </span>
                <input
                  type="checkbox"
                  role="switch"
                  checked={k.locked ? true : choice[k.key]}
                  disabled={k.locked}
                  onChange={(e) => setChoice({ ...choice, [k.key]: e.target.checked })}
                />
                <i className="cookie-switch" aria-hidden="true" />
              </label>
            ))}
          </fieldset>
        )}
        <div className="cookie-bar">
          <p>
            We use cookies to keep the site working and, with your OK, to understand how it’s used.
            {PRIVACY_POLICY_URL && (
              <>
                {' '}
                <a href={PRIVACY_POLICY_URL}>Privacy policy</a>
              </>
            )}
          </p>
          <div className="cookie-actions">
            {settings ? (
              <button className="cookie-btn cookie-line" type="button" onClick={() => save(choice)}>
                Save my choices
              </button>
            ) : (
              <button className="cookie-btn cookie-text" type="button" aria-expanded="false" onClick={() => setSettings(true)}>
                Settings
              </button>
            )}
            <button className="cookie-btn cookie-line" type="button" onClick={() => save({ analytics: false, clarity: false })}>
              Necessary only
            </button>
            <button className="cookie-btn cookie-ok" type="button" onClick={() => save({ analytics: true, clarity: true })}>
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
