'use client';

import Image from 'next/image';
import { useState } from 'react';
import SiteLink from '@/components/ui/SiteLink';
import Rich from '@/components/ui/Rich';

// The home page's services list (owner, November 6 2026, from the owner's homepage file): every service is a link to its page; hovering or focusing
// one swaps the photo beside the list and opens its line. The first is open at load. Every link and line is in the HTML.
export default function QrsHomeServices({ items }) {
  const [on, setOn] = useState(0);
  const current = items[on];
  return (
    <div className="qh-svc-body">
      <ul className="qh-svc-list">
        {items.map((item, i) => (
          <li key={item.href}>
            <SiteLink
              className={i === on ? 'on' : undefined}
              href={item.href}
              onMouseEnter={() => setOn(i)}
              onFocus={() => setOn(i)}
            >
              <span className="name">
                <Rich text={item.title} />
              </span>
              <span className="desc">{item.text}</span>
              <svg className="arr" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </SiteLink>
          </li>
        ))}
      </ul>
      <figure className="qh-svc-view">
        {items.map((item, i) => (
          <Image
            key={item.href}
            className={i === on ? 'on' : undefined}
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 861px) 45vw, 100vw"
            quality={70}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
        <figcaption>{current.caption}</figcaption>
      </figure>
    </div>
  );
}
