import Image from 'next/image';
import CircledWord from '@/components/ui/HandCircle';
import Mark from '@/components/ui/Mark';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import { SERVICE_CATEGORIES } from '@/data/serviceCategories';
import '@/components/studio/Studio.css';

// The two kinds of work (residential and commercial) as the home page's large photo cards, under a heading that names the place. Used on the city and
// county pages (components/templates/LocationPage.jsx, RegionPage.jsx). heading: a string, `__word__` underlines a word by hand.
export default function ServiceCategories({ place, heading }) {
  return (
    <section className="st-section st-services" id="services">
      <div className="container">
        <div className="st-split st-head">
          <p className="st-label">Services</p>
          <h2><Mark text={heading || `Residential and commercial roofing in __${place}__`} /></h2>
        </div>
        <div className="st-cats">
          {SERVICE_CATEGORIES.map((c, i) => (
            <SiteLink className="st-cat" href={c.href} key={c.title}>
              <Image src={c.image} alt="" fill sizes="(min-width: 901px) 50vw, 100vw" quality={60} loading="lazy" />
              <span className="st-cat-body">
                <b><CircledWord variant={i}>{c.title.split(' ')[0]}</CircledWord> {c.title.split(' ').slice(1).join(' ')}</b>
                <span>{c.text}</span>
                <i className="st-round" aria-hidden="true"><ArrowRight /></i>
              </span>
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  );
}
