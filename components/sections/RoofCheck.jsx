import EstimateForm from './EstimateForm';
import './RoofCheck.css';

const CHECK_POINTS = [
  { title: 'Roofer first.', text: 'Condition-focused visit — not a pitch.' },
  { title: 'Photo documentation.', text: 'See what we see, in plain English.' },
  { title: 'Clear next step.', text: 'Repair, monitor, maintain or replace.' },
  { title: 'Pay after the visit.', text: 'No deposit to start the inspection.' },
];

// $199 Roof Check card + estimate request form
export default function RoofCheck() {
  return (
    <section className="section check" id="roof-check">
      <div className="container check-grid">
        <aside className="check-card">
          <div className="eyebrow">Roofer-led roof check</div>
          <div className="price">$199</div>
          <h2>Before you talk replacement.</h2>
          <p>Get a roofer to look at your roof before a salesperson tries to sell you one.</p>
          <div className="check-points">
            {CHECK_POINTS.map((point) => (
              <div key={point.title}>
                <b>✓</b>
                <span>
                  <strong>{point.title}</strong> {point.text}
                </span>
              </div>
            ))}
          </div>
        </aside>

        <div className="form-card" id="estimate">
          <div className="eyebrow">Start here</div>
          <h2>Tell us what you need.</h2>
          <p className="lead">Two minutes. A clear next step. No pressure.</p>
          <EstimateForm />
        </div>
      </div>
    </section>
  );
}
