import Rich from '@/components/ui/Rich';
import { OfficeCard } from './Offices';
import './LocalIntro.css';

// City and region pages: local intro copy, the offices there (if any), the neighborhoods we serve and local roof considerations
export default function LocalIntro({ city, heading, paragraphs = [], offices = [], neighborhoods = [], considerations = [] }) {
  return (
    <section className="local-intro tile-pattern">
      <div className="container local-grid">
        <div className="local-copy">
          <div className="eyebrow">Local roofing · {city}</div>
          <h2>{heading}</h2>
          {paragraphs.map((p) => (
            <p key={p}>
              <Rich text={p} />
            </p>
          ))}
        </div>
        <aside className="local-aside">
          {offices.map((office) => (
            <OfficeCard office={office} cityLink={offices.length > 1} key={office.name} />
          ))}
          {neighborhoods.length > 0 && (
            <div className="local-card">
              <h3>Neighborhoods we serve in {city}</h3>
              <ul className="local-areas">
                {neighborhoods.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          )}
          {considerations.length > 0 && (
            <div className="local-card local-card-navy on-dark">
              <h3>Roof conditions we plan for</h3>
              <ul className="local-notes">
                {considerations.map((c) => (
                  <li key={c.title}>
                    <b>{c.title}</b>
                    <span>
                      <Rich text={c.text} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
