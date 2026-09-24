import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';
import './WhyChoose.css';

// "Why Choose QRS for …?" — heading, intro, a grid of reasons and a call to action
export default function WhyChoose({ heading, intro, points = [], cta = { label: 'Get Your Estimate', href: '#roof-check' } }) {
  return (
    <section className="why-choose">
      <div className="container">
        <div className="section-head">
          <h2>{heading}</h2>
          {intro && (
            <p>
              <Rich text={intro} />
            </p>
          )}
        </div>
        <div className="why-choose-grid">
          {points.map((point) => (
            <div className="why-choose-item" key={point.title}>
              <span className="why-choose-check" aria-hidden="true">✓</span>
              <h3>{point.title}</h3>
              <p>
                <Rich text={point.text} />
              </p>
            </div>
          ))}
        </div>
        {cta && (
          <SiteLink className="btn btn-gold why-choose-cta" href={cta.href}>
            {cta.label} <span className="arrow">→</span>
          </SiteLink>
        )}
      </div>
    </section>
  );
}
