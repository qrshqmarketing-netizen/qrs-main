import { PROOF_POINTS } from '@/data/site';
import ProofMarquee from './ProofMarquee';
import './ProofBar.css';

// The four proof points. `strip`: the slim navy band directly under every hero (Hero.jsx `stats`), a horizontal marquee (ProofMarquee.jsx); `onDark`: sitting directly on a photo
// instead of its own white bar; neither: a white band.
export default function ProofBar({ onDark = false, strip = false }) {
  if (strip) {
    return (
      <section className="proofbar proofbar-strip" aria-label="Why homeowners and clients choose QRS">
        <ProofMarquee points={PROOF_POINTS} label="Why homeowners and clients choose QRS" />
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
