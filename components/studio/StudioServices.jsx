'use client';

import Image from 'next/image';
import { useState } from 'react';
import CircledWord from '@/components/ui/HandCircle';
import Mark from '@/components/ui/Mark';
import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';

// Services in two parts. First the two main kinds of work as large photo cards; then the roofing systems as a long, light list: hovering (or focusing)
// a row shows its photo beside the list on desktop, and on phones each row is just its name, a line and an arrow.
// items: [{ title, text, href, image }]. categories: [{ title, text, href, image }].
export default function StudioServices({ categories, items }) {
  const [active, setActive] = useState(0);
  return (
    <section className="st-section st-services" id="services">
      <div className="container">
        <div className="st-split st-head">
          <p className="st-label">Services</p>
          <h2><Mark text="Roofing for every __home__ and building we work on" /></h2>
        </div>

        <div className="st-cats">
          {categories.map((c, i) => (
            <SiteLink className="st-cat" href={c.href} key={c.title}>
              <Image src={c.image} alt="" fill sizes="(min-width: 901px) 50vw, 100vw" quality={60} />
              <span className="st-cat-body">
                <b><CircledWord variant={i}>{c.title.split(' ')[0]}</CircledWord> {c.title.split(' ').slice(1).join(' ')}</b>
                <span>{c.text}</span>
                <i className="st-round" aria-hidden="true"><ArrowRight /></i>
              </span>
            </SiteLink>
          ))}
        </div>

        <div className="st-systems" id="roofing-systems">
          <p className="st-label">Roofing systems</p>
          <ul className="st-rows">
            {items.map((s, i) => (
              <li key={s.title} className={i === active ? 'on' : ''} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
                <SiteLink href={s.href}>
                  <span className="st-row-n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="st-row-t">
                    <b><Rich text={s.title} /></b>
                    <span>{s.text}</span>
                  </span>
                  <i aria-hidden="true"><ArrowRight /></i>
                </SiteLink>
              </li>
            ))}
          </ul>
          <div className="st-preview" aria-hidden="true">
            {items.map((s, i) => (
              <Image key={s.image} src={s.image} alt="" fill sizes="(min-width: 901px) 40vw, 0px" quality={60} className={i === active ? 'on' : ''} loading="lazy" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
