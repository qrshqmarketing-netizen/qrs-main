import { CARE_PLAN } from '@/data/pages/carePlan';
import './PlanScope.css';

const { scope } = CARE_PLAN;

// What a Roof Care Plan visit covers, and what it plainly doesn't (data/pages/carePlan.js).
// Reuses RoofCheck.jsx's checkmark-row pattern, in a light-background "included" variant and a
// muted dash variant for "not included."
export default function PlanScope() {
  return (
    <section className="section plan-scope">
      <div className="container">
        <div className="section-head center">
          <h2>What’s Included — and What Isn’t</h2>
          <p>{scope.intro}</p>
        </div>
        <div className="ps-grid">
          <div className="ps-col">
            <h3>Every visit includes</h3>
            <div className="ps-points">
              {scope.included.map((point) => (
                <div key={point.title}>
                  <b aria-hidden="true">✓</b>
                  <span>
                    <strong>{point.title}.</strong> {point.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="ps-col">
            <h3>Not included</h3>
            <div className="ps-points ps-points-muted">
              {scope.excluded.map((text) => (
                <div key={text}>
                  <b aria-hidden="true">–</b>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
