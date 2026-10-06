import { PROOF_POINTS } from '@/data/site';
import './ProofBar.css';

// The four proof points. `strip`: the slim navy band directly under every hero (Hero.jsx `stats`); `onDark`: sitting directly on a photo
// instead of its own white bar; neither: a white band.
export default function ProofBar({ onDark = false, strip = false }) {
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
