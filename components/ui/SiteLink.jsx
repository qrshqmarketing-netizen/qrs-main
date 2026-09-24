import Link from 'next/link';
import SmartAnchor from './SmartAnchor';

// Links to other pages use Next.js <Link> (fast page changes).
// Section links like #roof-check fall back to the home page when the section isn't on the current page.
// Phone, email and outside links stay plain <a>.
export default function SiteLink({ href, prefetch, ...props }) {
  if (href.startsWith('/')) return <Link href={href} prefetch={prefetch} {...props} />;
  if (href.startsWith('#') && href.length > 1) return <SmartAnchor href={href} {...props} />;
  return <a href={href} {...props} />;
}
