export default function Hero() {
  return (
    <section className="hero hero-photo" aria-label="QRS Los Angeles roofing">
      <div className="hero-roof-texture" aria-hidden="true"></div>
      <div className="hero-glow" aria-hidden="true"></div>
      <div className="container hero-inner">
        <div className="hero-copy">
          <div className="eyebrow">Los Angeles Roofing · Roof Repair &amp; Replacement</div>
          <h1>Roofing built with <span>precision.</span></h1>
          <p className="hero-sub">
            Clear inspections. Straightforward estimates. Clean workmanship.
          </p>
          <div className="hero-actions">
            <a className="btn btn-gold" href="#roof-check">Start a Roof Check <span className="arrow">→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
