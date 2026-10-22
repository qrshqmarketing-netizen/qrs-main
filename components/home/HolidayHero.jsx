import Image from 'next/image';
import SiteLink from '@/components/ui/SiteLink';
import './HolidayHero.css';

// A seasonal home hero (owner, October 22 2026: the Halloween special): one full-width photo with the offer graphic centered on it, the whole
// graphic a link down to the estimate form at the bottom of the page (#roof-check → #estimate, SiteLink). The page's H1 (the keyword line)
// can sit as a small line at the top (`h1`); the home page now puts its H1 in the first section instead. The graphic's words are in its alt text.
// photo: { src, alt, position? }; graphic: { src, alt, width, height }
export default function HolidayHero({ h1, photo, graphic, href = '#roof-check' }) {
  return (
    <section className="hh" aria-label="Seasonal offer">
      <Image className="hh-photo" src={photo.src} alt={photo.alt} fill sizes="100vw" preload fetchPriority="high" quality={75} />
      {h1 && <h1 className="hh-h1">{h1}</h1>}
      <SiteLink className="hh-offer" href={href}>
        <Image src={graphic.src} alt={graphic.alt} width={graphic.width} height={graphic.height} sizes="(min-width: 901px) 640px, 88vw" quality={75} preload />
      </SiteLink>
    </section>
  );
}
