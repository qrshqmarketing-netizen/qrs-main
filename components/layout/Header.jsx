'use client';

import { useEffect, useRef, useState } from 'react';
import BrandLogo from '@/components/ui/BrandLogo';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight, Caret, PhoneIcon } from '@/components/ui/icons';
import { ABOUT_MENU, COMMERCIAL_MENU, HEADER_CTA, LOCATIONS_MENU, NAV_LINKS, RESIDENTIAL_MENU } from '@/data/navigation';
import { PHONE, TEL } from '@/data/site';
import './Header.css';

// Wide screens show the full menu with hover dropdowns; smaller screens use the menu button
const isDesktop = () => window.matchMedia('(min-width:1200px)').matches;

// Menu links don't prefetch: there are dozens of them in the (hidden) dropdowns
const MenuLink = (props) => <SiteLink prefetch={false} {...props} />;

// Red dot on emergency links (`urgent: true` in data/navigation.js)
const UrgentDot = () => <i className="menu-urgent" aria-hidden="true" />;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // phone/tablet slide-down menu
  const [openItem, setOpenItem] = useState(null); // 'res' | 'com' | 'loc' | 'about' | null
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

  // Props for a dropdown (Residential / Commercial / Service Areas / About)
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

  const { groups, hub, feature, promo } = RESIDENTIAL_MENU;
  const { services, buildings, partner } = COMMERCIAL_MENU;

  return (
    <header className="site-header">
      <div className="container nav">
        <BrandLogo variant="dark" preload />

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
                        {group.all && (
                          <MenuLink className="mega-all" href={group.all.href}>
                            {group.all.label} <ArrowRight />
                          </MenuLink>
                        )}
                        <ul>
                          {group.links.map((link) => (
                            <li key={link.href}>
                              <MenuLink href={link.href}>
                                <span>
                                  {link.urgent && <UrgentDot />}
                                  {link.label}
                                </span>
                                {link.note && <small>{link.note}</small>}
                              </MenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                  {[feature, hub].map((item) => (
                    <MenuLink className="mega-link" href={item.href} key={item.href}>
                      <span>
                        <b>{item.title}</b>
                        <small>{item.note}</small>
                      </span>
                      <ArrowRight />
                    </MenuLink>
                  ))}
                </div>
                <aside className="mega-promo">
                  <b>{promo.title}</b>
                  <p>{promo.text}</p>
                  <SiteLink className="btn btn-gold" href={promo.cta.href}>{promo.cta.label}</SiteLink>
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
                  <MenuLink className="mega-card-head" href={buildings.href}>
                    <b>{buildings.title}</b> <ArrowRight />
                  </MenuLink>
                  <ul>
                    {buildings.links.map((link) => (
                      <li key={link.href}>
                        <MenuLink href={link.href}>{link.label}</MenuLink>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mega-card mega-card-list mega-card-single">
                  <b>{services.title}</b>
                  <ul>
                    {services.links.map((link) => (
                      <li key={link.href}>
                        <MenuLink href={link.href}>
                          {link.urgent && <UrgentDot />}
                          {link.label}
                        </MenuLink>
                      </li>
                    ))}
                  </ul>
                </div>
                <MenuLink className="mega-card" href={partner.href}>
                  <b>{partner.title}</b>
                  <span>{partner.text}</span>
                  <em>
                    {partner.cta} <ArrowRight />
                  </em>
                </MenuLink>
              </div>
            </div>
          </div>

          <div {...dropdown('loc')}>
            <button {...trigger('loc', 'megaLoc')}>
              Service Areas
              <Caret />
            </button>
            <div className="mega mega-loc" id="megaLoc" onClick={closeOnLink}>
              <div className="mega-inner">
                {LOCATIONS_MENU.regions.map((region) => (
                  <div className="mega-card mega-card-list" key={region.title}>
                    <MenuLink className="mega-card-head" href={region.href}>
                      <b>{region.title}</b> <ArrowRight />
                    </MenuLink>
                    <ul>
                      {region.links.map((link) => (
                        <li key={link.href}>
                          <MenuLink href={link.href}>{link.label}</MenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <MenuLink className="mega-card" href={LOCATIONS_MENU.all.href}>
                  <b>{LOCATIONS_MENU.all.title}</b>
                  <span>{LOCATIONS_MENU.all.text}</span>
                  <em>
                    {LOCATIONS_MENU.all.cta} <ArrowRight />
                  </em>
                </MenuLink>
              </div>
            </div>
          </div>

          <div {...dropdown('about')}>
            <button {...trigger('about', 'megaAbout')}>
              About
              <Caret />
            </button>
            <div className="mega mega-about" id="megaAbout" onClick={closeOnLink}>
              <div className="mega-inner">
                <div className="mega-card mega-card-list">
                  <MenuLink className="mega-card-head" href={ABOUT_MENU.about.href}>
                    <b>{ABOUT_MENU.about.title}</b> <ArrowRight />
                  </MenuLink>
                  <ul>
                    {ABOUT_MENU.about.links.map((link) => (
                      <li key={link.label}>
                        <MenuLink href={link.href}>{link.label}</MenuLink>
                      </li>
                    ))}
                  </ul>
                </div>
                <MenuLink className="mega-card" href={ABOUT_MENU.careers.href}>
                  <b>{ABOUT_MENU.careers.title}</b>
                  <span>{ABOUT_MENU.careers.text}</span>
                  <em>
                    {ABOUT_MENU.careers.cta} <ArrowRight />
                  </em>
                </MenuLink>
              </div>
            </div>
          </div>

          {NAV_LINKS.map((link) => (
            <MenuLink href={link.href} key={link.href}>{link.label}</MenuLink>
          ))}
        </nav>

        {/* Gold: book a Roof Check. Red: call now (the number shows on wide screens, an icon elsewhere). */}
        <div className="nav-actions">
          <SiteLink className="btn btn-gold nav-cta" href={HEADER_CTA.href}>{HEADER_CTA.label}</SiteLink>
          <a className="btn btn-red nav-call" href={TEL} aria-label={`Call ${PHONE}`}>
            <PhoneIcon />
            <span>{PHONE}</span>
          </a>
        </div>
        <button className="menu-btn" id="menuBtn" type="button" aria-label="Open menu" aria-expanded={menuOpen} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
