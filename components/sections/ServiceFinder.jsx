import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import './ServiceFinder.css';

// Residential hub: each service with links to it for every roof type.
// rows: [{ id, title, text, links: [{ label, href }] }] — ids let other pages link to a row (#roof-replacement)
export default function ServiceFinder({ heading, intro, rows = [] }) {
  return (
    <section className="finder" id="services">
      <div className="container">
        <div className="section-head">
          <h2>{heading}</h2>
          {intro && <p>{intro}</p>}
        </div>
        <div className="finder-list">
          {rows.map((row) => (
            <div className="finder-row" id={row.id} key={row.id}>
              <div className="finder-copy">
                <h3>{row.title}</h3>
                <p>
                  <Rich text={row.text} />
                </p>
              </div>
              <ul className="chips finder-links">
                {row.links.map((link) => (
                  <li key={link.href}>
                    <SiteLink className="chip" href={link.href}>
                      {link.label} <ArrowRight />
                    </SiteLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
