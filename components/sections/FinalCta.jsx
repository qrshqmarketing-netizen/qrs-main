import Image from 'next/image';
import './FinalCta.css';

export default function FinalCta() {
  return (
    <section className="final">
      <div className="container">
        <div className="final-pin" aria-hidden="true">
          <svg viewBox="0 0 34 40">
            <path d="M17 1C8.7 1 2 7.6 2 15.8 2 27 17 39 17 39s15-12 15-23.2C32 7.6 25.3 1 17 1Z" fill="#fff" />
            <circle cx="17" cy="15.5" r="5.5" fill="#ffb82e" />
          </svg>
        </div>
        <h2>Detail-First Roofing</h2>
        <p>
          At QRS, there&rsquo;s no pressure, no mystery scope and no surprises &mdash; ever. Start with a roofer-led roof
          check today!
        </p>
        <a className="btn btn-gold" href="#roof-check">Get Pro Advice</a>
      </div>
      <Image
        className="cta-scene"
        src="/images/cta-section-background-new.webp"
        width={1758}
        height={895}
        sizes="100vw"
        alt="QRS roofing truck parked on a residential street in front of homes"
      />
    </section>
  );
}
