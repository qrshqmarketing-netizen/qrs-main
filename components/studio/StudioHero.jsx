import HeroParallax from '@/components/sections/HeroParallax';
import SiteLink from '@/components/ui/SiteLink';
import { PhoneIcon } from '@/components/ui/icons';
import { HOME_H1, PHONE, TEL } from '@/data/site';
import '@/components/sections/Hero.css'; // the photo layer's own styles (.hero-background, the slider)
import './Studio.css';

// The home page's studio-style hero: a full-height photo slider (the newest projects' covers), the keyword line as a small label (it is the page's
// H1), a large light headline at the bottom left, two buttons. The proof-point marquee sits directly under it (app/page.js).
export default function StudioHero({ slides }) {
  return (
    <section className="st-hero" aria-label="QRS Southern California roofing">
      <HeroParallax image={slides[0].src} imageAlt={slides[0].alt} slides={slides} />
      <div className="st-hero-shade" aria-hidden="true"></div>
      <div className="container st-hero-inner">
        <h1 className="st-kicker">{HOME_H1}</h1>
        <p className="st-hero-title">
          Come home to a roof you can <u>trust.</u>
        </p>
        <p className="st-hero-sub">Clear inspections. Straightforward estimates. Clean workmanship.</p>
        <div className="st-actions">
          <SiteLink className="btn btn-gold" href="#roof-check">Get Pro Advice</SiteLink>
          <a className="btn btn-line" href={TEL}>
            <PhoneIcon /> Call {PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}
