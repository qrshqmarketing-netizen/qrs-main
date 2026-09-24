'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BUSINESS } from '@/data/site';
import './BrandLogo.css';

// Logo files in public/images/logo/ (the full-size original is assets/originals/qrs-logo.png)
const LOGOS = {
  regular: '/images/logo/qrs-logo.webp', // light backgrounds (footer)
  dark: '/images/logo/qrs-logo-dark.webp', // dark backgrounds (header): "ROOFING" in white
};

// The QRS logo, used in the header (dark version) and the footer (regular version).
// On the home page it scrolls to the top; on every other page it goes home.
// Served as-is (unoptimized) so the lossless file keeps its crisp edges.
export default function BrandLogo({ variant = 'regular', preload = false }) {
  const onHome = usePathname() === '/';
  const logo = <Image className="brand-logo" src={LOGOS[variant]} alt={BUSINESS.name} width={520} height={150} preload={preload} unoptimized />;
  return onHome ? (
    <a className="brand" href="#top">{logo}</a>
  ) : (
    <Link className="brand" href="/">{logo}</Link>
  );
}
