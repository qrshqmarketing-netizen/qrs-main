import Image from 'next/image';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import { plainText } from '@/lib/richText';
import HomeHead from './HomeHead';

// "Who we are" and the newest work in one section (after the case-study cards under digitalocean.com's hero): the belief statement and one
// line as a centered heading, then three finished projects as quiet cards (photo, place, the kind of work, the page's own short description) and
// one button to every project. projects: project page objects (data/pages/*-project.js), newest first.
const workOf = (title) => title.slice(0, title.lastIndexOf(' in ')) || title;
const placeOf = (place) => place.replace(/,?\s*CA\b/, '');

export default function HomeWork({ heading, text, projects, all }) {
  return (
    <section className="hc-section hc-work" aria-labelledby="hc-work-title">
      <div className="hc-wrap">
        <HomeHead id="hc-work-title" heading={heading} text={text} />
        <ul className="hc-cards">
          {projects.map((p) => (
            <li className="hc-card" key={p.path}>
              <div className="hc-card-photo">
                <Image src={p.image} alt={p.imageAlt || ''} fill sizes="(min-width: 901px) 340px, (min-width: 621px) 50vw, 100vw" quality={60} loading="lazy" />
              </div>
              <div className="hc-card-body">
                <p className="hc-small">{placeOf(p.place)}</p>
                <h3>
                  <SiteLink className="hc-stretch" href={p.path}>
                    {workOf(p.title)}
                  </SiteLink>
                </h3>
                <p>{plainText(p.description)}</p>
                <span className="hc-more" aria-hidden="true">
                  View the project <ArrowRight />
                </span>
              </div>
            </li>
          ))}
        </ul>
        {all && (
          <p className="hc-center">
            <SiteLink className="hc-pill" href={all.href}>
              {all.label} <ArrowRight />
            </SiteLink>
          </p>
        )}
      </div>
    </section>
  );
}
