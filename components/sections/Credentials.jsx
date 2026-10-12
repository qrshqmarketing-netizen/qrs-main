import Image from 'next/image';
import Mark from '@/components/ui/Mark';
import { ArrowRight } from '@/components/ui/icons';
import './Credentials.css';

// The credentials page's body (copy in data/pages/credentials.js): the license card, the manufacturer certification logos and what we do on every job. A manufacturer with no logo file yet shows its name in a clean card.
export default function Credentials({ page }) {
  const { license, manufacturers, standards } = page;
  return (
    <>
      <section className="cr-section">
        <div className="container cr-license">
          <div>
            <h2><Mark text={license.heading} /></h2>
            <p className="cr-lead">{license.text}</p>
            <a className="cr-link" href={license.verify.href} target="_blank" rel="noopener">
              {license.verify.label} <ArrowRight />
            </a>
          </div>
          <dl className="cr-facts">
            {license.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="cr-section cr-wash">
        <div className="container">
          <h2><Mark text={manufacturers.heading} /></h2>
          <p className="cr-lead">{manufacturers.intro}</p>
          <ul className="cr-logos">
            {manufacturers.items.map((m) => (
              <li key={m.id} className="cr-logo-card">
                <span className="cr-logo">
                  {m.logo ? (
                    <Image src={m.logo} alt={`${m.name}${m.program ? ` ${m.program}` : ''} logo`} width={m.width || 400} height={m.height || 200} sizes="220px" />
                  ) : (
                    <span className="cr-wordmark">{m.name}</span>
                  )}
                </span>
                {m.logo && <b>{m.name}</b>}
                {m.program && <span className="cr-program">{m.program}</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cr-section">
        <div className="container">
          <h2><Mark text={standards.heading} /></h2>
          <ul className="cr-standards">
            {standards.items.map((s, i) => (
              <li key={s.title}>
                <span className="cr-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
