import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';
import ScrollParallaxImage from './ScrollParallaxImage';
import './SplitFeature.css';

// Text beside a photo (or scene art). reverse puts the picture on the left.
export default function SplitFeature({ eyebrow, heading, subheading, paragraphs = [], cta, image, imageAlt = '', scene = 'scene-replace', reverse, tone }) {
  return (
    <section className={'split' + (reverse ? ' split-reverse' : '') + (tone === 'wash' ? ' split-wash' : '')}>
      <div className="container split-grid">
        <div className="split-copy">
          {eyebrow && <div className="eyebrow">{eyebrow}</div>}
          <h2>{heading}</h2>
          {subheading && <p className="split-sub">{subheading}</p>}
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
        <div className={`split-media art ${image ? '' : scene}`}>
          {image && <ScrollParallaxImage src={image} alt={imageAlt} sizes="(min-width: 901px) 540px, 100vw" />}
        </div>
      </div>
    </section>
  );
}
