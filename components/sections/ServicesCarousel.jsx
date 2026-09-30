import Image from 'next/image';
import SiteLink from '@/components/ui/SiteLink';
import { SERVICES } from '@/data/services';
import './Services.css';

// Sticky intro (heading + CTA) on the left, a photo-card grid on the right. compact: stack the heading
// above the cards instead (no sticky column) and let the cards run larger — for a short item list (e.g.
// just Residential + Commercial on the home page) rather than a long carousel-style list.
// items: [{ title, text, href, scene, image? }]; idPrefix keeps the heading id unique if a page has two of these.
// cta: set false to drop the "Get Pro Advice" button under the heading (e.g. the home page's compact section).
export default function ServicesCarousel({ title = 'Roofing Services', items = SERVICES, idPrefix = 'svc', compact = false, cta = true }) {
  const titleId = `${idPrefix}Title`;
  return (
    <div className={'svc-layout' + (compact ? ' svc-compact' : '')}>
      <div className="svc-intro">
        <div className="eyebrow">What We Offer</div>
        <h2 id={titleId}>{title}</h2>
        {cta && (
          <SiteLink className="btn btn-gold" href="#roof-check">
            Get Pro Advice <span className="arrow">→</span>
          </SiteLink>
        )}
      </div>

      <ul className="svc-grid" aria-labelledby={titleId}>
        {items.map((item) => (
          <li className="svc-card" key={item.href}>
            <SiteLink className="svc-card-link" href={item.href}>
              <div className={`svc-media art ${item.scene || 'scene-shingle'}`}>
                {item.image && <Image src={item.image} alt="" fill sizes="(min-width: 901px) 360px, (min-width: 621px) 46vw, 92vw" />}
                <div className="svc-caption">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            </SiteLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
