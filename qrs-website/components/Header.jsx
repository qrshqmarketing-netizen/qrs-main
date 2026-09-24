'use client';

import { useEffect, useState } from 'react';
import { BrandMark } from './Icons';

const LINKS = [
  ['#services', 'Services'],
  ['#process', 'How It Works'],
  ['#why', 'Why QRS'],
  ['#roof-check', '$199 Roof Check'],
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  return (
    <header className="site-header">
      <div className="container nav">
        <a className="brand" href="#top" aria-label="Quality Roofing Specialists home">
          <BrandMark />
          <span className="brand-name">Quality Roofing Specialists<small>DETAIL-FIRST ROOFING</small></span>
        </a>

        <nav className={`navlinks${open ? ' mobile-open' : ''}`} id="navlinks">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>

        <a className="btn btn-gold nav-cta" href="#roof-check">Start a Roof Check</a>
        <button
          className="menu-btn"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="navlinks"
          onClick={() => setOpen((v) => !v)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
