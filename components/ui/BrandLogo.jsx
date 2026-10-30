import Image from 'next/image';
import Link from 'next/link';
import { BUSINESS } from '@/data/site';
import './BrandLogo.css';

// The QRS logo in the header and footer (owner, October 29 2026): the gold roof mark (public/images/logo/qrs-mark-gold.webp, trimmed from the
// owner's file) with the word QUALITY set as text to its right, in the site's font. `variant` sets the word's color: 'adaptive' (the header:
// navy on the light bar, white in the dark theme) or 'dark' (the footer: white). Always links to /. The earlier full logos (qrs-logo*.webp in
// public/images/logo/) are still used by emails and structured data. `tagline` adds "Roofing Specialists" in tiny letters under the word (the header).
export default function BrandLogo({ variant = 'adaptive', preload = false, tagline = false }) {
  return (
    <Link className={`brand brand-${variant === 'dark' ? 'on-dark' : 'adaptive'}`} href="/" aria-label={`${BUSINESS.shortName} homepage`} title={`Go to the ${BUSINESS.shortName} homepage.`}>
      <Image className="brand-mark" src="/images/logo/qrs-mark-gold.webp" alt="" width={175} height={92} preload={preload} unoptimized />
      <span className="brand-text" aria-hidden="true">
        <span className="brand-word">QUALITY</span>
        {tagline && <span className="brand-sub">Roofing Specialists</span>}
      </span>
    </Link>
  );
}
