import Link from 'next/link';
import { ROOF_CHECK_HASH, START_PATH } from '@/data/start';
import { interactionTitle, labelFromChildren } from '@/lib/interactionTitle';
import SmartAnchor from './SmartAnchor';

// Links to other pages use Next.js <Link> (fast page changes).
// "#roof-check" (every Get Pro Advice / Request an Estimate link in the data files) scrolls to the estimate form at the bottom of the page
// (RoofCheck.jsx); a page without one (the legal pages, careers) opens the step-by-step form at START_PATH instead.
// Other section links fall back to the home page when the section isn't on the current page.
// Phone, email and outside links stay plain <a>.
export default function SiteLink({ href, prefetch, title, children, target, ...props }) {
  const helpfulTitle = title || interactionTitle({ href, label: labelFromChildren(children), target });
  const linkProps = { ...props, title: helpfulTitle, target, children };
  if (href === ROOF_CHECK_HASH) return <SmartAnchor href="#estimate" fallback={START_PATH} {...linkProps} />; // the form card itself, so phones land on the form
  if (href.startsWith('/')) return <Link href={href} prefetch={prefetch} {...linkProps} />;
  if (href.startsWith('#') && href.length > 1) return <SmartAnchor href={href} {...linkProps} />;
  return <a href={href} {...linkProps} />;
}
