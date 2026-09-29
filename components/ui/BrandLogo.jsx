import Image from 'next/image';
import Link from 'next/link';
import { BUSINESS } from '@/data/site';
import './BrandLogo.css';

// Logo files in public/images/logo/ (the full-size original is assets/originals/qrs-logo.png)
const LOGOS = {
  regular: '/images/logo/qrs-logo.webp', // light backgrounds (footer)
  dark: '/images/logo/qrs-logo-dark.webp', // dark backgrounds (header): "ROOFING" in white
};

// The QRS logo, used in the header (dark version) and the footer (regular version). Always links to /.
// Served as-is (unoptimized) so the lossless file keeps its crisp edges.
export default function BrandLogo({ variant = 'regular', preload = false }) {
  return (
    <Link className="brand" href="/">
      <Image className="brand-logo" src={LOGOS[variant]} alt={BUSINESS.name} width={520} height={150} preload={preload} unoptimized />
    </Link>
  );
}
