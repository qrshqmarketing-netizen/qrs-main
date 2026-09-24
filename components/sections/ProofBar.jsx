import { PROOF_POINTS } from '@/data/site';
import './ProofBar.css';

export default function ProofBar() {
  return (
    <section className="proofbar">
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
