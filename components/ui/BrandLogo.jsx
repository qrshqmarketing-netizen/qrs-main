import Image from 'next/image';
import Link from 'next/link';
import { BUSINESS } from '@/data/site';
import './BrandLogo.css';

// Logo files in public/images/logo/ (the full-size original is assets/originals/qrs-logo.png)
const LOGOS = {
  regular: '/images/logo/qrs-logo.webp', // light backgrounds (footer)
  dark: '/images/logo/qrs-logo-dark.webp', // dark backgrounds (footer): "ROOFING" in white
  'dark-sm': '/images/logo/qrs-logo-dark-sm.webp', // the same logo at 312 px wide, 12 KB, for the header (shown 30-40 px tall)
};
const SIZES = { 'dark-sm': { width: 312, height: 90 } }; // every other file is 520 x 150

// The QRS logo, used in the header (dark version) and the footer (regular version). Always links to /.
// Served as-is (unoptimized) so the lossless file keeps its crisp edges.
export default function BrandLogo({ variant = 'regular', preload = false }) {
  return (
    <Link className="brand" href="/" aria-label={`${BUSINESS.shortName} homepage`} title={`Go to the ${BUSINESS.shortName} homepage.`}>
      <Image className="brand-logo" src={LOGOS[variant]} alt={BUSINESS.name} width={SIZES[variant]?.width || 520} height={SIZES[variant]?.height || 150} preload={preload} unoptimized />
    </Link>
  );
}
