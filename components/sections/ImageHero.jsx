import Image from 'next/image';
import Breadcrumbs from './Breadcrumbs';
import './ImageHero.css';

// Big rounded photo with the page title over it (About page)
export default function ImageHero({ crumbs, eyebrow, title, image, imagePosition }) {
  return (
    <section className="image-hero">
      <div className="container">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className="image-hero-card on-dark">
          <Image src={image} alt="" fill preload sizes="(min-width: 1200px) 1180px, 100vw" style={imagePosition ? { objectPosition: imagePosition } : undefined} />
          <div className="image-hero-copy">
            {eyebrow && <div className="eyebrow">{eyebrow}</div>}
            <h1>{title}</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
