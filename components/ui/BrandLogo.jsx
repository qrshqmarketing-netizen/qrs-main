'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BUSINESS } from '@/data/site';
import { QrsMark } from './icons';
import './BrandLogo.css';

// Logo mark + business name, used in the header and footer.
// On the home page it scrolls to the top; on every other page it goes home.
export default function BrandLogo() {
  const onHome = usePathname() === '/';
  const content = (
    <>
      <span className="brand-mark">
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <QrsMark />
        </svg>
      </span>
      <span className="brand-name">
        {BUSINESS.name}
        <small>{BUSINESS.tagline}</small>
      </span>
    </>
  );
  const label = `${BUSINESS.name} home`;
  return onHome ? (
    <a className="brand" href="#top" aria-label={label}>{content}</a>
  ) : (
    <Link className="brand" href="/" aria-label={label}>{content}</Link>
  );
}
