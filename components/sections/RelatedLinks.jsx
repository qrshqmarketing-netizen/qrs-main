import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import './RelatedLinks.css';

// A short row of links to closely related pages. links: [{ label, href }]
export default function RelatedLinks({ heading = 'Related services', links = [] }) {
  if (!links.length) return null;
  return (
    <section className="related-links">
      <div className="container">
        <h2>{heading}</h2>
        <ul className="chips">
          {links.map((link) => (
            <li key={link.href}>
              <SiteLink className="chip" href={link.href}>
                {link.label} <ArrowRight />
              </SiteLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
