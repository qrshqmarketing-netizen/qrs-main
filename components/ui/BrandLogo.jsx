import Image from 'next/image';
import Link from 'next/link';
import { BUSINESS } from '@/data/site';
import './BrandLogo.css';

// The official QRS logo (owner, November 5 2026; replaces the gold mark with QUALITY set as text): the gold roof mark with "QUALITY", "ROOFING"
// and "SPECIALISTS" (public/images/logo/qrs-logo-official-v2.webp, from the owner's PNG, saved in assets/originals/qrs-logo-official-2026-11-05.png).
// Its "ROOFING" is black, so on dark backgrounds the white-text copy (qrs-logo-official-white-v2.webp, the black recolored to white) shows instead:
// `variant` 'dark' (the footer) always uses it; 'adaptive' (the header) uses the black version on the light bar and the white one in the dark
// theme and over a photo hero (Header.css). The logo is sized by the link's font-size (height 2.1em). Always links to /. `tagline` is no longer used
// (the words are in the logo).
export default function BrandLogo({ variant = 'adaptive', preload = false }) {
  const label = `${BUSINESS.shortName} homepage`;
  return (
    <Link className={`brand brand-${variant === 'dark' ? 'on-dark' : 'adaptive'}`} href="/" aria-label={label} title={`Go to the ${BUSINESS.shortName} homepage.`}>
      {variant !== 'dark' && (
        <Image className="brand-img brand-img-light" src="/images/logo/qrs-logo-official-v2.webp" alt="" width={581} height={164} preload={preload} unoptimized />
      )}
      <Image className="brand-img brand-img-dark" src="/images/logo/qrs-logo-official-white-v2.webp" alt="" width={581} height={164} unoptimized />
    </Link>
  );
}
