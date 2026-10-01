import SiteLink from '@/components/ui/SiteLink';
import Rich from '@/components/ui/Rich';
import ScrollParallaxImage from './ScrollParallaxImage';
import './CardGrid.css';

// Grid of page cards for hub pages. The title link stretches across the full card.
// cards: [{ title, text, href, scene, image? }]
export default function CardGrid({ id, heading, intro, cards = [], tone }) {
  return (
    <section className={'card-grid' + (tone === 'wash' ? ' card-grid-wash' : '')} id={id}>
      <div className="container">
        {(heading || intro) && (
          <div className="section-head">
            {heading && <h2>{heading}</h2>}
            {intro && <p>{intro}</p>}
          </div>
        )}
        <div className="cg-grid">
          {cards.map((card) => (
            <article className="cg-card" key={card.href}>
              <div className={`cg-media art ${card.scene || 'scene-shingle'}`}>
                {card.image && <ScrollParallaxImage src={card.image} sizes="(min-width: 901px) 380px, (min-width: 621px) 50vw, 100vw" />}
                <div className="cg-overlay">
                  <h3>
                    <SiteLink className="cg-link" href={card.href}><Rich text={card.title} /></SiteLink>
                  </h3>
                  {card.text && <p>{card.text}</p>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
