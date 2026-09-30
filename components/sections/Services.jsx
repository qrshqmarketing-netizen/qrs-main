import ServicesCarousel from './ServicesCarousel';
import './Services.css';

// Services carousel. `pattern` (home page only) adds the tile-texture background. `compact`/`cta`: see ServicesCarousel.
export default function Services({ title, items, pattern = true, compact = false, cta = true, slider = false, id = 'services' }) {
  return (
    <section className={'section services' + (pattern ? ' tile-pattern' : '') + (slider ? ' svc-marquee' : '')} id={id}>
      <div className="container">
        <ServicesCarousel title={title} items={items} idPrefix={id} compact={compact} cta={cta} slider={slider} />
      </div>
    </section>
  );
}
