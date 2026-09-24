'use client';

import { useEffect, useRef, useState } from 'react';
import BrandLogo from '@/components/ui/BrandLogo';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight, Caret } from '@/components/ui/icons';
import { COMMERCIAL_MENU, HEADER_CTA, NAV_LINKS, RESIDENTIAL_MENU } from '@/data/navigation';
import './Header.css';

// Wide screens show the full menu with hover dropdowns; smaller screens use the menu button
const isDesktop = () => window.matchMedia('(min-width:1200px)').matches;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // phone/tablet slide-down menu
  const [openItem, setOpenItem] = useState(null); // 'res' | 'com' | null
  const [activeGroup, setActiveGroup] = useState(0); // roof type shown in the Residential menu
  const closeTimer = useRef(null);
  const triggers = useRef({});

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
  }, [menuOpen]);

  // Clicking anywhere outside a dropdown closes it
  useEffect(() => {
    const onClick = (e) => {
      if (!e.target.closest('.nav-item')) setOpenItem(null);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((open) => !open);
    setOpenItem(null);
  };

  // Any link in the menu closes the phone menu
  const onNavClick = (e) => {
    if (e.target.closest('a')) setMenuOpen(false);
  };

  // Props for a dropdown (Residential / Commercial)
  const dropdown = (key) => ({
    className: 'nav-item' + (openItem === key ? ' open' : ''),
    onMouseEnter: () => {
      if (!isDesktop()) return;
      clearTimeout(closeTimer.current);
      setOpenItem(key);
    },
    onMouseLeave: () => {
      if (!isDesktop()) return;
      closeTimer.current = setTimeout(() => setOpenItem((cur) => (cur === key ? null : cur)), 180);
    },
    onKeyDown: (e) => {
      if (e.key === 'Escape' && openItem === key) {
        setOpenItem(null);
        triggers.current[key]?.focus();
      }
    },
  });

  const trigger = (key, controls) => ({
    className: 'nav-trigger',
    type: 'button',
    'aria-expanded': openItem === key,
    'aria-controls': controls,
    ref: (el) => {
      triggers.current[key] = el;
    },
    onClick: () => setOpenItem((cur) => (cur === key ? null : key)),
  });

  // Clicking a link inside a dropdown closes it
  const closeOnLink = (e) => {
    if (e.target.closest('a')) setOpenItem(null);
  };

  // Roof-type tabs: hover/focus switches on desktop, tap opens/closes on phones
  const tabProps = (i) => ({
    className: 'mega-tab',
    type: 'button',
    'aria-expanded': activeGroup === i,
    onClick: () => {
      const toggle = !isDesktop();
      setActiveGroup((cur) => (toggle && cur === i ? null : i));
    },
    onMouseEnter: () => isDesktop() && setActiveGroup(i),
    onFocus: () => isDesktop() && setActiveGroup(i),
  });

  const { groups, feature, promo } = RESIDENTIAL_MENU;
  const { buildings, partner } = COMMERCIAL_MENU;

  return (
    <header className="site-header">
      <div className="container nav">
        <BrandLogo />

        <nav className={'navlinks' + (menuOpen ? ' mobile-open' : '')} id="navlinks" aria-label="Main" onClick={onNavClick}>
          <div {...dropdown('res')}>
            <button {...trigger('res', 'megaRes')}>
              Residential
              <Caret />
            </button>
            <div className="mega mega-res" id="megaRes" onClick={closeOnLink}>
              <div className="mega-inner">
                <div className="mega-types">
                  {groups.map((group, i) => (
                    <div className={'mega-group' + (activeGroup === i ? ' active' : '')} key={group.id}>
                      <button {...tabProps(i)} aria-controls={group.id}>
                        {group.label}
                        <Caret />
                      </button>
                      <div className="mega-list" id={group.id}>
                        <SiteLink className="mega-all" href={group.all.href}>
                          {group.all.label} <ArrowRight />
                        </SiteLink>
                        <ul>
                          {group.links.map((link) => (
                            <li key={link.href}>
                              <SiteLink href={link.href}>
                                <span>{link.label}</span>
                                {link.note && <small>{link.note}</small>}
                              </SiteLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                  <SiteLink className="mega-link" href={feature.href}>
                    <span>
                      <b>{feature.title}</b>
                      <small>{feature.note}</small>
                    </span>
                    <ArrowRight />
                  </SiteLink>
                </div>
                <aside className="mega-promo">
                  <b>{promo.title}</b>
                  <p>{promo.text}</p>
                  <a className="btn btn-gold" href={promo.cta.href}>{promo.cta.label}</a>
                </aside>
              </div>
            </div>
          </div>

          <div {...dropdown('com')}>
            <button {...trigger('com', 'megaCom')}>
              Commercial
              <Caret />
            </button>
            <div className="mega mega-com" id="megaCom" onClick={closeOnLink}>
              <div className="mega-inner">
                <div className="mega-card mega-card-list">
                  <SiteLink className="mega-card-head" href={buildings.href}>
                    <b>{buildings.title}</b> <ArrowRight />
                  </SiteLink>
                  <ul>
                    {buildings.links.map((link) => (
                      <li key={link.href}>
                        <SiteLink href={link.href}>{link.label}</SiteLink>
                      </li>
                    ))}
                  </ul>
                </div>
                <SiteLink className="mega-card" href={partner.href}>
                  <b>{partner.title}</b>
                  <span>{partner.text}</span>
                  <em>
                    {partner.cta} <ArrowRight />
                  </em>
                </SiteLink>
              </div>
            </div>
          </div>

          {NAV_LINKS.map((link) => (
            <SiteLink href={link.href} key={link.href}>{link.label}</SiteLink>
          ))}
        </nav>

        <a className="btn btn-gold nav-cta" href={HEADER_CTA.href}>{HEADER_CTA.label}</a>
        <button className="menu-btn" id="menuBtn" type="button" aria-label="Open menu" aria-expanded={menuOpen} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
