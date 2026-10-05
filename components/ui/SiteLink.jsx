import Link from 'next/link';
import { ROOF_CHECK_HASH, START_PATH } from '@/data/start';
import { interactionTitle, labelFromChildren } from '@/lib/interactionTitle';
import SmartAnchor from './SmartAnchor';

// Links to other pages use Next.js <Link> (fast page changes).
// "#roof-check" (every Get Pro Advice / Request an Estimate link in the data files) opens the request steps at START_PATH.
// Other section links fall back to the home page when the section isn't on the current page.
// Phone, email and outside links stay plain <a>.
export default function SiteLink({ href, prefetch, title, children, target, ...props }) {
  const helpfulTitle = title || interactionTitle({ href, label: labelFromChildren(children), target });
  const linkProps = { ...props, title: helpfulTitle, target, children };
  if (href === ROOF_CHECK_HASH) return <Link href={START_PATH} prefetch={prefetch} {...linkProps} />;
  if (href.startsWith('/')) return <Link href={href} prefetch={prefetch} {...linkProps} />;
  if (href.startsWith('#') && href.length > 1) return <SmartAnchor href={href} {...linkProps} />;
  return <a href={href} {...linkProps} />;
}
