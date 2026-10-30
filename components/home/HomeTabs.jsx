'use client';

import Image from 'next/image';
import { useState } from 'react';
import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';

// The Residential section's roof types as tabs over one panel (HomeGradient.css, "Residential"). Every panel is in the HTML; the ones not
// chosen are `hidden`, so all the copy and links stay crawlable and work without JavaScript (the first one shows).
export default function HomeTabs({ items }) {
  const [active, setActive] = useState(0);
  const onKey = (e) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    const next = (active + step + items.length) % items.length;
    setActive(next);
    document.getElementById(`hg-tab-${next}`)?.focus();
  };
  return (
    <>
      <div className="hg-tabs" role="tablist" aria-label="Roof types" onKeyDown={onKey}>
        {items.map((t, i) => (
          <button
            key={t.tab}
            id={`hg-tab-${i}`}
            type="button"
            role="tab"
            className="hg-tab"
            aria-selected={i === active}
            aria-controls={`hg-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            style={{ '--hg-c': t.color }}
          >
            <i aria-hidden="true" />
            {t.tab}
          </button>
        ))}
      </div>
      {items.map((t, i) => (
        <div key={t.tab} id={`hg-panel-${i}`} role="tabpanel" aria-labelledby={`hg-tab-${i}`} className="hg-panel" hidden={i !== active}>
          <div className={'hg-panel-copy' + (i === active ? ' hg-panel-in' : '')}>
            <h3>{t.title}</h3>
            <p>
              <Rich text={t.text} />
            </p>
            <ul className="hg-check">
              {t.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <SiteLink className="hg-arrow" href={t.href}>
              {t.link} <span aria-hidden="true">→</span>
            </SiteLink>
          </div>
          <div className="hg-panel-media">
            <Image src={t.image} alt={t.imageAlt} fill sizes="(min-width: 901px) 50vw, 100vw" quality={60} loading="lazy" />
          </div>
        </div>
      ))}
    </>
  );
}
