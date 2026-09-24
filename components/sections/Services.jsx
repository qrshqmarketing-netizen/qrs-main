import ServicesCarousel from './ServicesCarousel';
import './Services.css';

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <ServicesCarousel />

        <div className="svc-about">
          <h2>The QRS Standard</h2>
          <p>
            At Quality Roofing Specialists, we believe roofing should be detail-first. With 30+ years of roofing
            experience, our crews bring the same care to every roof replacement, roof repair, tile lift &amp; relay and
            flat or shingle roof &mdash; with clear scopes, no pressure and no mystery pricing.
          </p>
          <p>
            Before any work starts, you get a written scope and price. We document what we find with photos, explain it
            in plain English and back our installs with a lifetime workmanship warranty. Straightforward, honest work
            from a local roofing team across Los Angeles and Orange County.
          </p>
          <p>Not sure what your roof needs? Start with our roofer-led $199 Roof Check.</p>
          <a className="btn btn-gold" href="#roof-check">Get Pro Advice</a>
        </div>
      </div>
    </section>
  );
}
