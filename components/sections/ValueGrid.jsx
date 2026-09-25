import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';
import './ValueGrid.css';

// Grid of short titled points (values, audiences, roles). Items can have an optional link.
// items: [{ title, text, link?: { label, href } }]
export default function ValueGrid({ id, heading, intro, items = [], columns = 4, tone, pattern = false }) {
  return (
    <section className={'value-grid' + (tone === 'wash' ? ' value-grid-wash' : '') + (pattern ? ' tile-pattern' : '')} id={id}>
      <div className="container">
        {(heading || intro) && (
          <div className="section-head center">
            {heading && <h2>{heading}</h2>}
            {intro && (
              <p>
                <Rich text={intro} />
              </p>
            )}
          </div>
        )}
        <div className={`vg-grid vg-cols-${columns}`}>
          {items.map((item, i) => (
            <div className="vg-item" key={item.title}>
              <span className="vg-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>
                <Rich text={item.text} />
              </p>
              {item.link && (
                <SiteLink className="vg-link" href={item.link.href}>
                  {item.link.label} <span className="arrow">→</span>
                </SiteLink>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
