import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';
import './FeatureBand.css';

// Heading, intro and a call to action beside a list of check-marked points.
// tone: 'navy' (default, e.g. white-label roofing on /contractors/) or 'light' (e.g. careers on the home page).
// points: [{ title, text, href? }]; a point with href links its title.
export default function FeatureBand({ id, eyebrow, heading, paragraphs = [], points = [], cta, tone = 'navy' }) {
  return (
    <section className={'band ' + (tone === 'light' ? 'band-light' : 'band-navy tile-pattern on-dark')} id={id}>
      <div className="container band-grid">
        <div className="band-copy">
          {eyebrow && <div className="eyebrow">{eyebrow}</div>}
          <h2>{heading}</h2>
          {paragraphs.map((p) => (
            <p key={p}>
              <Rich text={p} />
            </p>
          ))}
          {cta && (
            <SiteLink className="btn btn-gold" href={cta.href}>
              {cta.label} <span className="arrow">→</span>
            </SiteLink>
          )}
        </div>
        <ul className="band-points">
          {points.map((point) => (
            <li key={point.title}>
              <b>{point.href ? <SiteLink href={point.href}>{point.title}</SiteLink> : point.title}</b>
              <span>
                <Rich text={point.text} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
