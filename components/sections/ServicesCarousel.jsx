import SiteLink from '@/components/ui/SiteLink';
import Rich from '@/components/ui/Rich';
import { SERVICES } from '@/data/services';
import ScrollParallaxImage from './ScrollParallaxImage';
import './Services.css';
import Mark from '@/components/ui/Mark';
import { unmark } from '@/lib/richText';

// Sticky intro (heading + CTA) on the left, a photo-card grid on the right. compact stacks the heading;
// slider switches to a continuous, full-width product rail for the homepage.
// items: [{ title, text, href, scene, image? }]; idPrefix keeps the heading id unique if a page has two of these.
// cta: set false to drop the "Get Pro Advice" button under the heading (e.g. the home page's compact section).
export default function ServicesCarousel({ title = 'Roofing __Services__', items = SERVICES, idPrefix = 'svc', compact = false, cta = true, slider = false }) {
  const titleId = `${idPrefix}Title`;
  const cards = (copy) => items.map((item) => (
    <li className="svc-card" key={`${copy ? 'copy-' : ''}${item.href}`}>
      <SiteLink className="svc-card-link" href={item.href} tabIndex={copy ? -1 : undefined}>
        <div className={`svc-media art ${item.scene || 'scene-shingle'}`}>
          {item.image && <ScrollParallaxImage src={item.image} sizes={slider ? '(min-width: 1200px) 260px, 230px' : '(min-width: 901px) 360px, (min-width: 621px) 46vw, 92vw'} />}
          <div className="svc-caption">
            <h3><Rich text={item.title} /></h3>
            <p>{item.text}</p>
          </div>
        </div>
      </SiteLink>
    </li>
  ));
  return (
    <div className={'svc-layout' + (compact ? ' svc-compact' : '') + (slider ? ' svc-slider-layout' : '')}>
      <div className="svc-intro">
        <div className="eyebrow">What We Offer</div>
        <h2 id={titleId}><Mark text={title} /></h2>
        {cta && (
          <SiteLink className="btn btn-gold" href="#roof-check">
            Get Pro Advice <span className="arrow">→</span>
          </SiteLink>
        )}
      </div>

      {slider ? (
        <div className="svc-marquee-viewport" role="region" aria-label={unmark(title)}>
          <div className="svc-marquee-track" role="group" aria-labelledby={titleId}>
            <ul className="svc-grid svc-marquee-group">{cards(false)}</ul>
            <ul className="svc-grid svc-marquee-group" aria-hidden="true">{cards(true)}</ul>
          </div>
        </div>
      ) : (
        <ul className="svc-grid" aria-labelledby={titleId}>{cards(false)}</ul>
      )}
    </div>
  );
}
