import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';
import { FAQS } from '@/data/faqs';
import './Faq.css';
import Mark from '@/components/ui/Mark';

// FAQ accordion. The home page uses data/faqs.js; other pages pass their own questions. `limit` (the sub pages, October 21 2026: less on each
// page): only the first questions show, all closed, and the rest open under "Show N more questions"; every answer stays in the HTML (and in the
// FAQPage structured data), so nothing is lost for search.
const item = (faq, open) => (
  <details className="faq-item" open={open} key={faq.q}>
    <summary>{faq.q}</summary>
    <p>
      <Rich text={faq.a} />
    </p>
  </details>
);

export default function Faq({
  id = 'faq',
  heading = 'Frequently Asked __Questions__',
  sub = 'Straight answers to the questions homeowners ask us most.',
  faqs = FAQS,
  cta = true,
  limit,
}) {
  const titleId = `${id}Title`;
  return (
    <section className="faq" id={id} aria-labelledby={titleId}>
      <div className="container">
        <h2 id={titleId}><Mark text={heading} /></h2>
        {sub && <p className="faq-sub">{sub}</p>}
        <div className="faq-list">{(limit ? faqs.slice(0, limit) : faqs).map((faq, i) => item(faq, !limit && i === 0))}</div>
        {limit && faqs.length > limit && (
          <details className="faq-more">
            <summary>
              Show {faqs.length - limit} more question{faqs.length - limit > 1 ? 's' : ''}
            </summary>
            <div className="faq-list">{faqs.slice(limit).map((faq) => item(faq, false))}</div>
          </details>
        )}
        {cta && (
          <div className="faq-cta">
            <SiteLink className="btn btn-gold" href="#roof-check">Get Pro Advice</SiteLink>
          </div>
        )}
      </div>
    </section>
  );
}
