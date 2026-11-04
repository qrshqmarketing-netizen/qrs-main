'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import BrandLogo from '@/components/ui/BrandLogo';
import SiteLink from '@/components/ui/SiteLink';
import { MoonIcon, PhoneIcon, SunIcon } from '@/components/ui/icons';
import { HEADER_CTA, HEADER_MENU, HEADER_MORE } from '@/data/navigation';
import { isFocusPath, isLandingPath } from '@/lib/landing';
import { PHONE, TEL } from '@/data/site';
import { LANGS, isHomePath, langOf, t } from '@/lib/lang';
import './Header.css';

// The header: one solid bar split by hairlines: the logo, the main menu (HEADER_MENU in data/navigation.js: six flat hub links since November 4 2026; formerly Services, Service Areas,
// Credentials and Roofing 101 open a dropdown on hover, focus or click, Services as a wide panel of every service page), the phone number,
// the gold "Get Pro Advice" cell, the theme switch and a two-line menu button.
// The menu button drops a small panel from the bar with the rest of the site (HEADER_MORE; below 1240px the main links are at the top of it).
// It stays in the page flow, above the hero. The proof marquee sits under each hero instead (ProofBar strip; owner, October 28 2026).
// /start/ shows only the logo, the theme switch and the phone. Escape, the backdrop or a link closes the panel.
const isCurrent = (pathname, href) => href !== '/' && pathname.startsWith(href);

export default function Header() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const pathname = usePathname();
  // Spanish home page (/es/): the menus in Spanish (data/i18n/es.js); the language switcher shows on the two home pages only (owner, November 3 2026)
  const lang = langOf(pathname || '/');
  const T = (x, v) => t(lang, x, v);
  const showLang = isHomePath(pathname || '');
  const requestPage = isFocusPath(pathname); // /start/ and the ad landing pages: logo, theme switch and phone only (lib/landing.js)
  const landing = isLandingPath(pathname);
  const button = useRef(null);
  const [drop, setDrop] = useState(null); // the open dropdown's label in the bar
  const bar = useRef(null);
  const leave = useRef(null);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
  }, [open]);

  // A new page closes the panel and any dropdown
  useEffect(() => {
    setOpen(false);
    setDrop(null);
  }, [pathname]);

  // A dropdown closes on Escape (focus back on its button) and on a click outside the bar
  useEffect(() => {
    if (!drop) return undefined;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      bar.current?.querySelector(`[data-drop="${drop}"]`)?.focus();
      setDrop(null);
    };
    const onDown = (e) => { if (!bar.current?.contains(e.target)) setDrop(null); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onDown); };
  }, [drop]);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  }, []);

  // Frosted glass once the page has scrolled (owner, October 29 2026): data-scrolled on the header, styled at the end of Header.css
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  const close = () => { setOpen(false); setDrop(null); };
  const hoverOpen = (label) => { clearTimeout(leave.current); setDrop(label); };
  const hoverClose = () => { clearTimeout(leave.current); leave.current = setTimeout(() => setDrop(null), 160); };
  const inMenu = (item) => isCurrent(pathname, item.href) || item.groups?.some((g) => g.links.some((l) => isCurrent(pathname, l.href.split('#')[0])));
  const link = (l, className) => {
    const on = isCurrent(pathname, l.href);
    return (
      <SiteLink className={className + (on ? ' on' : '')} href={l.href} prefetch={false} aria-current={on ? 'page' : undefined} onClick={close}>
        {l.urgent && <i className="hd-urgent" aria-hidden="true" />}
        {T(l.label)}
      </SiteLink>
    );
  };

  return (
    <>
      <header
        lang={lang === 'es' ? LANGS.es.code : undefined}
        data-scrolled={scrolled ? '' : undefined}
        className={'site-header' + (open ? ' is-open' : '') + (requestPage ? ' is-start' : '') + (landing ? ' is-lp' : '')}
      >
      <div className="hd-backdrop" onClick={close} aria-hidden="true"></div>
      <div className="hd-bar">
        <div className="hd-brand">
          <BrandLogo variant="adaptive" preload tagline />
        </div>
        {!requestPage && (
          <nav className="hd-links" aria-label={T('Main')} ref={bar}>
            {HEADER_MENU.map((item) =>
              item.groups ? (
                <div className={'hd-dd' + (drop === item.label ? ' is-open' : '')} key={item.label} onMouseEnter={() => hoverOpen(item.label)} onMouseLeave={hoverClose}>
                  <button
                    type="button"
                    className={'hd-link hd-dd-btn' + (inMenu(item) ? ' on' : '')}
                    data-drop={item.label}
                    aria-expanded={drop === item.label}
                    aria-controls={`hdDrop-${item.label.replace(/\W+/g, '')}`}
                    onClick={() => setDrop((d) => (d === item.label ? null : item.label))}
                  >
                    {T(item.label)}
                    <svg className="hd-chev" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <div className={'hd-drop' + (item.mega ? ' hd-mega' : '')} id={`hdDrop-${item.label.replace(/\W+/g, '')}`} inert={drop !== item.label}>
                    {item.groups.map((g) => (
                      <div className="hd-drop-col" key={g.title}>
                        <p className="hd-drop-title">{T(g.title)}</p>
                        <ul>
                          {g.links.map((l) => (
                            <li key={l.href + l.label}>{link(l, 'hd-drop-link')}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <span key={item.href}>{link(item, 'hd-link')}</span>
              ),
            )}
          </nav>
        )}
        <div className="hd-actions">
          <a className="hd-cell hd-phone" href={TEL} aria-label={T('Call {phone}', { phone: PHONE })}>
            <PhoneIcon />
            <span>{PHONE}</span>
          </a>
          {!requestPage && (
            <SiteLink className="hd-cell hd-cta" href={HEADER_CTA.href} onClick={close}>
              {T(HEADER_CTA.label)}
            </SiteLink>
          )}
          {showLang && (
            <SiteLink
              className="hd-cell hd-lang"
              href={LANGS[lang === 'es' ? 'en' : 'es'].home}
              hrefLang={LANGS[lang === 'es' ? 'en' : 'es'].code}
              lang={LANGS[lang === 'es' ? 'en' : 'es'].code}
              aria-label={lang === 'es' ? 'View in English' : 'Ver en español'}
              title={lang === 'es' ? 'View in English' : 'Ver en español'}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.2 3.6 8.5s-1.2 6.1-3.6 8.5M12 3.5C9.6 5.9 8.4 8.7 8.4 12s1.2 6.1 3.6 8.5" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
              <span>{LANGS[lang === 'es' ? 'en' : 'es'].short}</span>
            </SiteLink>
          )}
          <button
            className="hd-cell hd-theme"
            type="button"
            aria-label={T(`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`)}
            aria-pressed={theme === 'dark'}
            title={T(`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`)}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          {!requestPage && (
            <button
              className="hd-cell hd-menu"
              type="button"
              ref={button}
              aria-label={T(open ? 'Close menu' : 'Open menu')}
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
          <nav aria-label={T('Menu')}>
            <ul className="hd-primary">
              {HEADER_MENU.map((item, i) => (
                <li key={item.label} style={{ '--n': i }}>
                  {item.groups ? (
                    <details className="hd-acc">
                      <summary className="hd-row hd-row-big">{T(item.label)}</summary>
                      {item.groups.map((g) => (
                        <div className="hd-acc-group" key={g.title}>
                          <p className="hd-drop-title">{T(g.title)}</p>
                          <ul>
                            {g.links.map((l) => (
                              <li key={l.href + l.label}>{link(l, 'hd-acc-link')}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </details>
                  ) : (
                    link(item, 'hd-row hd-row-big')
                  )}
                </li>
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
              {T(HEADER_CTA.label)} <span className="arrow">→</span>
            </SiteLink>
          </div>
        </div>
      )}
      </header>
    </>
  );
}
