import ServicesCarousel from './ServicesCarousel';
import './Services.css';

// Services carousel. `pattern` (home page only) adds the tile-texture background.
export default function Services({ title, items, pattern = true }) {
  return (
    <section className={'section services' + (pattern ? ' tile-pattern' : '')} id="services">
      <div className="container">
        <ServicesCarousel title={title} items={items} />
      </div>
    </section>
  );
}
