import { PROOF_POINTS } from '@/data/site';
import './ProofBar.css';

// `onDark`: nested in the home hero (Hero.jsx), sitting directly on the photo instead of its own white bar
export default function ProofBar({ onDark = false }) {
  return (
    <section className={'proofbar' + (onDark ? ' on-dark' : '')}>
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
