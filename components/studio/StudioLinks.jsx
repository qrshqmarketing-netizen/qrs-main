import Mark from '@/components/ui/Mark';
import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import { cardFor } from '@/data/content';

// A home page section of plain links to service pages (owner, November 10 2026, from the home page search review): a label, a heading that
// names the work, one line, then each page as a hairline card with its own name and card line (data/content.js cardFor, so nothing is
// written twice), and an optional link to the hub. Used for the commercial and industrial pages and for the repair and replacement pages,
// which the home page did not link to. links: page addresses; a page that doesn't exist is skipped.
export default function StudioLinks({ id, label, heading, text, links = [], more, tinted = false }) {
  const cards = links.map(cardFor).filter(Boolean);
  if (!cards.length) return null;
  return (
    <section className={`st-section st-links${tinted ? ' tinted' : ''}`} id={id}>
      <div className="container">
        <div className="st-split st-head">
          <p className="st-label">{label}</p>
          <div>
            <h2><Mark text={heading} /></h2>
            {text && <p className="st-links-text"><Rich text={text} /></p>}
            {more && (
              <SiteLink className="st-link" href={more.href}>
                {more.label} <ArrowRight />
              </SiteLink>
            )}
          </div>
        </div>
        <ul className="st-links-grid">
          {cards.map((c) => (
            <li key={c.href}>
              <SiteLink href={c.href}>
                <b><Rich text={c.title} /></b>
                <span>{c.text}</span>
                <i aria-hidden="true"><ArrowRight /></i>
              </SiteLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
