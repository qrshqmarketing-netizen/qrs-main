import Link from 'next/link';

// Links to other pages use Next.js <Link> (fast page changes).
// Anchors on this page (#services), phone and outside links stay plain <a>.
export default function SiteLink({ href, ...props }) {
  if (href.startsWith('/')) {
    // No prefetching while most menu pages aren't built yet
    return <Link href={href} prefetch={false} {...props} />;
  }
  return <a href={href} {...props} />;
}
