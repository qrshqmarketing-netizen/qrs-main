import Image from 'next/image';
import { TRUST_LOGOS } from '@/data/site';
import './TrustLogos.css';

// The review and trust profiles under the home hero (owner, November 2 2026): Google, BBB and Yelp logos side by side, each linking to its profile
// (data/site.js TRUST_LOGOS; a logo without `href` shows without a link). The logos are transparent; in the dark theme they sit on light tiles so
// the dark lettering stays readable.
export default function TrustLogos() {
  return (
    <section className="trust-logos" aria-label="Find our reviews and accreditation">
      <div className="container">
        <ul>
          {TRUST_LOGOS.map((t) => {
            const inner = (
              <>
                <span className="tl-logo">
                  <Image src={t.logo} alt={`${t.name} logo`} width={t.width} height={t.height} sizes="200px" />
                </span>
                <span className="tl-label">{t.label}</span>
              </>
            );
            return (
              <li key={t.id}>
                {t.href ? (
                  <a className="tl-item" href={t.href} target="_blank" rel="noopener" title={`${t.name} (opens in a new tab)`}>
                    {inner}
                  </a>
                ) : (
                  <span className="tl-item">{inner}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
