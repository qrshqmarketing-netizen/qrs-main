import ServicesCarousel from './ServicesCarousel';
import './CardCarousel.css';

// A photo-card carousel as its own section, e.g. "Roofing Types" on service pages.
// items: [{ title, text, href, scene, image? }]
export default function CardCarousel({ title, items, idPrefix, tone }) {
  return (
    <section className={'card-carousel' + (tone === 'wash' ? ' card-carousel-wash' : '')}>
      <div className="container">
        <ServicesCarousel title={title} items={items} idPrefix={idPrefix} />
      </div>
    </section>
  );
}
