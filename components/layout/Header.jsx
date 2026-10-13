'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import BrandLogo from '@/components/ui/BrandLogo';
import SiteLink from '@/components/ui/SiteLink';
import { MoonIcon, PhoneIcon, SunIcon } from '@/components/ui/icons';
import { HEADER_CTA, HEADER_LINKS, HEADER_MORE } from '@/data/navigation';
import { START_PATH } from '@/data/start';
import { PHONE, TEL } from '@/data/site';
import './Header.css';

// The header, modelled on thekithmore.com (the owner's reference): one slim bar split by hairlines: the logo, the main links (each one a hub page,
// HEADER_LINKS in data/navigation.js, no dropdowns), the phone number, the gold "Get Pro Advice" cell, the theme switch and a two-line menu button.
// The menu button drops a small panel from the bar with the rest of the site (HEADER_MORE; below 1240px the main links are at the top of it).
// Over a photo hero the bar is see-through with white type; once the hero has scrolled away (or the menu is open) it turns solid (data-solid).
// /start/ shows only the logo, the theme switch and the phone. Escape, the backdrop or a link closes the panel.
const HEROES = '.hero, .st-hero, .promo-home, .pd-hero';
const isCurrent = (pathname, href) => href !== '/' && pathname.startsWith(href);

export default function Header() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [past, setPast] = useState(false); // scrolled below the photo hero
  const pathname = usePathname();
  const requestPage = pathname === START_PATH;
  const button = useRef(null);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
  }, [open]);

  // A new page closes the panel
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  }, []);

  // Over a photo hero the bar is see-through (CSS, from the page itself); once the hero has scrolled up under it, it turns solid
  useEffect(() => {
    const update = () => {
      const hero = document.querySelector(HEROES);
      setPast(Boolean(hero) && hero.getBoundingClientRect().bottom < 72);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);

  // Escape closes the panel and puts the focus back on the menu button
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      button.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    if (nextTheme === 'dark') document.documentElement.dataset.theme = 'dark';
    else document.documentElement.removeAttribute('data-theme');
    try {
      window.localStorage.setItem('qrs-theme', nextTheme);
    } catch {
      // The current page still changes theme when browser storage is unavailable.
    }
    setTheme(nextTheme);
  };

  const close = () => setOpen(false);
  const link = (l, className) => {
    const on = isCurrent(pathname, l.href);
    return (
      <SiteLink className={className + (on ? ' on' : '')} href={l.href} prefetch={false} aria-current={on ? 'page' : undefined} onClick={close}>
        {l.urgent && <i className="hd-urgent" aria-hidden="true" />}
        {l.label}
      </SiteLink>
    );
  };

  return (
    <header className={'site-header' + (open ? ' is-open' : '') + (requestPage ? ' is-start' : '')} data-solid={past || open ? 'true' : undefined}>
      <div className="hd-backdrop" onClick={close} aria-hidden="true"></div>
      <div className="hd-bar">
        <div className="hd-brand">
          <BrandLogo variant="adaptive" preload />
        </div>
        {!requestPage && (
          <nav className="hd-links" aria-label="Main">
            {HEADER_LINKS.map((l) => (
              <span key={l.href}>{link(l, 'hd-link')}</span>
            ))}
          </nav>
        )}
        <div className="hd-actions">
          <a className="hd-cell hd-phone" href={TEL} aria-label={`Call ${PHONE}`}>
            <PhoneIcon />
            <span>{PHONE}</span>
          </a>
          {!requestPage && (
            <SiteLink className="hd-cell hd-cta" href={HEADER_CTA.href} onClick={close}>
              {HEADER_CTA.label}
            </SiteLink>
          )}
          <button
            className="hd-cell hd-theme"
            type="button"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-pressed={theme === 'dark'}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          {!requestPage && (
            <button
              className="hd-cell hd-menu"
              type="button"
              ref={button}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="hdPanel"
              onClick={() => setOpen((o) => !o)}
            >
              <span></span>
              <span></span>
            </button>
          )}
        </div>
      </div>
      {!requestPage && (
        <div className="hd-panel" id="hdPanel" inert={!open} data-lenis-prevent="">
          <nav aria-label="Menu">
            <ul className="hd-primary">
              {HEADER_LINKS.map((l, i) => (
                <li key={l.href} style={{ '--n': i }}>{link(l, 'hd-row hd-row-big')}</li>
              ))}
            </ul>
            <ul className="hd-more">
              {HEADER_MORE.map((l, i) => (
                <li key={l.href} style={{ '--n': i }}>{link(l, 'hd-row')}</li>
              ))}
            </ul>
          </nav>
          <div className="hd-panel-foot">
            <a href={TEL}>{PHONE}</a>
            <SiteLink className="btn btn-gold" href={HEADER_CTA.href} onClick={close}>
              {HEADER_CTA.label} <span className="arrow">→</span>
            </SiteLink>
          </div>
        </div>
      )}
    </header>
  );
}
