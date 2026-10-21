'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import HomeHead from './HomeHead';

// The services explorer (after digitalocean.com's product tabs): the kinds of work as tabs at the left (a row of chips on phones), the chosen tab's
// photo in the middle and its line and pages at the right. Every panel is in the HTML (the others `hidden`), so all the links stay crawlable.
// tabs: HOME_SERVICE_TABS (data/homeServices.js).
export default function HomeServices({ tabs, heading, text, all }) {
  const [on, setOn] = useState(0);
  const list = useRef(null);
  const pick = (i) => {
    setOn(i);
    list.current?.querySelectorAll('[role="tab"]')[i]?.focus();
  };
  const keys = (e) => {
    const n = tabs.length;
    const move = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (move) {
      e.preventDefault();
      pick((on + move + n) % n);
    } else if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      pick(e.key === 'Home' ? 0 : n - 1);
    }
  };
  return (
    <section className="hc-section hc-services" id="services" aria-labelledby="hc-services-title">
      <div className="hc-wrap">
        <HomeHead id="hc-services-title" heading={heading} text={text} />
        <div className="hc-tabs">
          <div className="hc-tablist" role="tablist" aria-label="Kinds of roofing work" aria-orientation="vertical" ref={list} onKeyDown={keys}>
            {tabs.map((t, i) => (
              <button
                key={t.label}
                type="button"
                role="tab"
                id={`hc-tab-${i}`}
                aria-controls={`hc-panel-${i}`}
                aria-selected={i === on}
                tabIndex={i === on ? 0 : -1}
                className={i === on ? 'on' : ''}
                onClick={() => setOn(i)}
              >
                {t.label}
              </button>
            ))}
          </div>
          {tabs.map((t, i) => (
            <div className="hc-panel" role="tabpanel" id={`hc-panel-${i}`} aria-labelledby={`hc-tab-${i}`} hidden={i !== on} key={t.label}>
              <div className="hc-panel-photo">
                <Image src={t.image} alt="" fill sizes="(min-width: 901px) 340px, 100vw" quality={60} loading="lazy" />
              </div>
              <div className="hc-panel-text">
                <h3>
                  <Rich text={t.title} />
                </h3>
                <p>
                  <Rich text={t.text} />
                </p>
                <p className="hc-small">Services</p>
                <ul>
                  {t.links.map((l) => (
                    <li key={l.href}>
                      <SiteLink href={l.href}>{l.label}</SiteLink>
                    </li>
                  ))}
                </ul>
                <SiteLink className="hc-more" href={t.href}>
                  More on {t.label} <ArrowRight />
                </SiteLink>
              </div>
            </div>
          ))}
        </div>
        {all && (
          <p className="hc-center">
            <SiteLink className="hc-pill" href={all.href}>
              {all.label} <ArrowRight />
            </SiteLink>
          </p>
        )}
      </div>
    </section>
  );
}
