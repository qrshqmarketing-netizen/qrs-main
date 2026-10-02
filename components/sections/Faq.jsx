import Rich from '@/components/ui/Rich';
import { FAQS } from '@/data/faqs';
import './Faq.css';

// FAQ accordion. The home page uses data/faqs.js; other pages pass their own questions.
export default function Faq({
  id = 'faq',
  heading = 'Frequently Asked Questions',
  sub = 'Straight answers to the questions homeowners ask us most.',
  faqs = FAQS,
  cta = true,
}) {
  const titleId = `${id}Title`;
  return (
    <section className="faq" id={id} aria-labelledby={titleId}>
      <div className="container">
        <h2 id={titleId}>{heading}</h2>
        {sub && <p className="faq-sub">{sub}</p>}
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <details className="faq-item" open={i === 0} key={faq.q}>
              <summary>{faq.q}</summary>
              <p>
                <Rich text={faq.a} />
              </p>
            </details>
          ))}
        </div>
        {cta && (
          <div className="faq-cta">
            <a className="btn btn-gold" href="#roof-check">Get Pro Advice</a>
          </div>
        )}
      </div>
    </section>
  );
}
