import StudioHeroSlider from './StudioHeroSlider';
import SiteLink from '@/components/ui/SiteLink';
import HandUnderline from '@/components/ui/HandUnderline';
import { PhoneIcon } from '@/components/ui/icons';
import { HOME_H1, PHONE, TEL } from '@/data/site';
import './Studio.css';

// The home page's studio-style hero: a full-height photo slider (the newest projects' covers), the keyword line as a small label (it is the page's
// H1), a large light headline at the bottom left, two buttons. The proof-point marquee sits directly under it (app/page.js).
// backdrop: an element drawn instead of (or over) the photos (the home page's 3D roof, RoofScene3D); the shade moves on top of it. With no `slides`
// there is no photo at all, just the navy background until the backdrop draws.
export default function StudioHero({ slides, backdrop }) {
  return (
    <section className="st-hero" aria-label="QRS Southern California roofing">
      {slides?.length > 0 && <StudioHeroSlider slides={slides} />}
      {backdrop}
      <div className="container st-hero-inner">
        <h1 className="st-kicker">{HOME_H1}</h1>
        <p className="st-hero-title">
          Come home to a roof you can <u>trust.<HandUnderline animate /></u>
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
