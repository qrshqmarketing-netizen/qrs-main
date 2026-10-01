import { findCity } from '@/data/locations';
import MorphSlider from './MorphSlider';
import './ProjectCarousel.css';

// Where a real project is ("Bungalow Heaven, Pasadena"); stand-ins have no place, so they show their label instead
const place = (p, city) => (p.city ? [p.area, findCity(p.city)?.city || city].filter(Boolean).join(', ') : '');

// WebGL "morph" gallery of roofing project photos (city pages and the Projects page). projects: see data/projects.js.
// Only entries with a real photo are shown (the slider has no placeholder-art fallback).
export default function ProjectCarousel({ city, heading, sub, projects = [], id = 'projects', pattern = false }) {
  const photos = projects.filter((p) => p.image);
  if (!photos.length) return null;

  const caption = (p) => {
    const where = place(p, city);
    return where ? `${where} — ${p.title}` : p.title;
  };

  return (
    <section className={'gallery' + (pattern ? ' tile-pattern' : '')} id={id}>
      <div className="container">
        <div className="section-head">
          <h2>{heading}</h2>
          {sub && <p>{sub}</p>}
        </div>
        <div className="project-carousel-frame">
          <MorphSlider
            items={photos.map((p) => ({ image: p.image, caption: caption(p), href: p.href }))}
            transition="melt"
            intensity={0.55}
            aberration={0.35}
            drift={0.4}
            radius={5}
            autoplay
            loop
          />
        </div>
      </div>
    </section>
  );
}
