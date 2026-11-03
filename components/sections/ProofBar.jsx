import { PROOF_POINTS } from '@/data/site';
import { t, tCount } from '@/lib/lang';
import ProofMarquee from './ProofMarquee';
import './ProofBar.css';

// The four proof points. `strip`: the slim navy marquee above the shared header (ProofMarquee.jsx); `onDark`: sitting directly on a photo
// instead of its own white bar; neither: a white band.
// `lang`: 'es' on the Spanish home page (data/i18n/es.js)
export default function ProofBar({ onDark = false, strip = false, lang = 'en' }) {
  const label = t(lang, 'Why homeowners and clients choose QRS');
  if (strip) {
    const points = PROOF_POINTS.map((p) => ({ ...p, title: tCount(lang, p.title), text: t(lang, p.text) }));
    return (
      <section className="proofbar proofbar-strip" aria-label={label}>
        <ProofMarquee points={points} label={label} />
      </section>
    );
  }
  return (
    <section className={'proofbar' + (onDark ? ' on-dark' : '') + (strip ? ' proofbar-strip' : '')} aria-label="Why homeowners and clients choose QRS">
      <div className="container proof-grid">
        {PROOF_POINTS.map((point) => (
          <div className="proof-item" key={point.title}>
            <b>{point.title}</b>
            <span>{point.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
