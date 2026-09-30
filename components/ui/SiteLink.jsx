import Link from 'next/link';
import { interactionTitle, labelFromChildren } from '@/lib/interactionTitle';
import SmartAnchor from './SmartAnchor';

// Links to other pages use Next.js <Link> (fast page changes).
// Section links like #roof-check fall back to the home page when the section isn't on the current page.
// Phone, email and outside links stay plain <a>.
export default function SiteLink({ href, prefetch, title, children, target, ...props }) {
  const helpfulTitle = title || interactionTitle({ href, label: labelFromChildren(children), target });
  const linkProps = { ...props, title: helpfulTitle, target, children };
  if (href.startsWith('/')) return <Link href={href} prefetch={prefetch} {...linkProps} />;
  if (href.startsWith('#') && href.length > 1) return <SmartAnchor href={href} {...linkProps} />;
  return <a href={href} {...linkProps} />;
}
