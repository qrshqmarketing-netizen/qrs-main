import Image from 'next/image';
import { BBB } from '@/data/site';

// The BBB Accredited Business seal (data/site.js BBB), always linking to our BBB business profile as BBB requires. `width` sets its size in px.
export default function BbbBadge({ width = 220, className = '' }) {
  return (
    <a className={`bbb-badge ${className}`.trim()} href={BBB.url} target="_blank" rel="noopener" title="View our BBB business profile (opens in a new tab)">
      <Image src={BBB.badge} alt="BBB Accredited Business: view our business profile" width={BBB.width} height={BBB.height} sizes={`${width}px`} style={{ width, height: 'auto' }} />
    </a>
  );
}
