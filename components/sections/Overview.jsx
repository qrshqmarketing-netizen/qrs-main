import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';
import './Overview.css';

// Heading on the left and large intro copy on the right (or both centered), over a faint clay-tile pattern
export default function Overview({ heading = 'Overview', paragraphs = [], id, center, cta }) {
  return (
    <section className={'overview tile-pattern' + (center ? ' overview-center' : '')} id={id}>
      <div className="container overview-grid">
        <h2>{heading}</h2>
        <div className="overview-body">
          {paragraphs.map((p) => (
            <p key={p}>
              <Rich text={p} />
            </p>
          ))}
          {cta && (
            <SiteLink className="btn btn-gold overview-cta" href={cta.href}>
              {cta.label} <span className="arrow">→</span>
            </SiteLink>
          )}
        </div>
      </div>
    </section>
  );
}
