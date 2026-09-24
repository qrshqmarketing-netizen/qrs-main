import { FAQS } from '@/data/faqs';
import './Faq.css';

export default function Faq() {
  return (
    <section className="faq" id="faq" aria-labelledby="faqTitle">
      <div className="container">
        <h2 id="faqTitle">Frequently Asked Questions</h2>
        <p className="faq-sub">Straight answers to the questions homeowners ask us most.</p>
        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <details className="faq-item" open={i === 0} key={faq.q}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
        <div className="faq-cta">
          <a className="btn btn-gold" href="#roof-check">Get Pro Advice</a>
        </div>
      </div>
    </section>
  );
}
