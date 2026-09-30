import Image from 'next/image';
import './PartnerLogos.css';

export default function PartnerLogos({ heading, intro, items }) {
  return (
    <section className="partner-logos section tile-pattern" aria-labelledby="partner-logos-heading">
      <div className="container">
        <div className="section-head center">
          <h2 id="partner-logos-heading">{heading}</h2>
          {intro && <p>{intro}</p>}
        </div>
        <div className="partner-logos-grid">
          {items.map((item) => (
            <div className="partner-logo-card" key={item.name}>
              <Image
                src={item.image}
                width={item.width}
                height={item.height}
                sizes="(max-width: 620px) 78vw, 320px"
                alt={item.imageAlt}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
