import Image from 'next/image';
import SiteLink from '@/components/ui/SiteLink';
import './Hero.css';

// Full-width photo hero (home page and city pages).
// `h1` picks which line is the page's H1 for search engines: the big headline ('title')
// or the small keyword line above it ('eyebrow'). Both look the same either way.
export default function Hero({
  eyebrow = 'Roof Repair & Replacement in Southern California',
  title = (
    <>
      Roofing built with <span>precision.</span>
    </>
  ),
  sub = 'Clear inspections. Straightforward estimates. Clean workmanship.',
  image = '/images/home-hero-drone-view.webp',
  imagePosition,
  label = 'QRS Southern California roofing',
  h1 = 'title',
}) {
  const Eyebrow = h1 === 'eyebrow' ? 'h1' : 'div';
  const Title = h1 === 'eyebrow' ? 'p' : 'h1';
  return (
    <section className="hero hero-photo" aria-label={label}>
      <div className="hero-roof-texture" aria-hidden="true">
        <Image src={image} alt="" fill preload sizes="100vw" style={imagePosition ? { objectPosition: imagePosition } : undefined} />
      </div>
      <div className="hero-glow" aria-hidden="true"></div>
      <div className="container hero-inner">
        <div className="hero-copy">
          <Eyebrow className="eyebrow">{eyebrow}</Eyebrow>
          <Title className="hero-title">{title}</Title>
          <p className="hero-sub">{sub}</p>
          <div className="hero-actions">
            <SiteLink className="btn btn-gold" href="#roof-check">
              Get Pro Advice <span className="arrow">→</span>
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}
