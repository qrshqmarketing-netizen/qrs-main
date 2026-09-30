import Image from 'next/image';
import QuoteTrigger from '@/components/ui/QuoteTrigger';
import SiteLink from '@/components/ui/SiteLink';
import { PhoneIcon } from '@/components/ui/icons';
import { PHONE, TEL } from '@/data/site';
import './FinalCta.css';

const TRUST = ['Licensed, bonded & insured', '10-year workmanship warranty', '270 five-star Google reviews'];

// Closing call to action above the footer: white copy over a darkened job-site photo, the main button plus a
// call button, and a short trust row. Pages can change the words and the main button (cta.style: 'gold', or
// 'plum' for a "call now" button — the separate call button is then left out). trust={false} hides the trust row.
export default function FinalCta({
  heading = 'Detail-First Roofing',
  text = 'At QRS, there’s no pressure, no mystery scope and no surprises — ever. Start with a roofer-led roof check today!',
  cta = { label: 'Get Pro Advice', href: '#roof-check' },
  trust = true,
}) {
  const isCall = cta.href.startsWith('tel:');
  return (
    <section className="final">
      <Image
        className="cta-scene"
        src="/images/cta-shingle-reroof-crew-drone-view.webp"
        fill
        sizes="100vw"
        alt="Aerial view of a QRS crew installing a new shingle roof"
      />
      <div className="container final-inner">
        <h2>{heading}</h2>
        <p>{text}</p>
        <div className="final-actions">
          <SiteLink className={`btn btn-${cta.style || 'gold'}`} href={cta.href}>
            {isCall && <PhoneIcon />}
            {cta.label}
            {!isCall && <span className="arrow">→</span>}
          </SiteLink>
          {!isCall && (
            <a className="btn btn-light" href={TEL}>
              <PhoneIcon />
              Call {PHONE}
            </a>
          )}
          {!isCall && <QuoteTrigger />}
        </div>
        {trust && (
          <ul className="final-trust">
            {TRUST.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
