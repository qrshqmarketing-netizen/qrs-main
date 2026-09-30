import Image from 'next/image';
import SiteLink from '@/components/ui/SiteLink';
import Rich from '@/components/ui/Rich';
import './CardGrid.css';

// Grid of page cards for hub pages. The whole card is clickable through its title link.
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
                {card.image && <Image src={card.image} alt="" fill sizes="(min-width: 901px) 380px, (min-width: 621px) 50vw, 100vw" />}
                <div className="cg-overlay">
                  <h3>
                    <SiteLink className="cg-link" href={card.href}><Rich text={card.title} /></SiteLink>
                  </h3>
                  {card.text && <p>{card.text}</p>}
                </div>
              </div>
              <span className="btn btn-line cg-more" aria-hidden="true">
                More Info <span className="arrow">→</span>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
