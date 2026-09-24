import EstimateForm from './EstimateForm';
import './RoofCheck.css';

// Left-hand card: the $199 Roof Check for homes, or a roof survey request for commercial properties
const OFFERS = {
  home: {
    eyebrow: 'Roofer-led roof check',
    price: '$199',
    heading: 'Before you talk replacement.',
    text: 'Get a roofer to look at your roof before a salesperson tries to sell you one.',
    points: [
      { title: 'Roofer first.', text: 'Condition-focused visit — not a pitch.' },
      { title: 'Photo documentation.', text: 'See what we see, in plain English.' },
      { title: 'Clear next step.', text: 'Repair, monitor, maintain or replace.' },
      { title: 'Pay after the visit.', text: 'No deposit to start the inspection.' },
    ],
  },
  commercial: {
    eyebrow: 'Commercial, HOA & partner projects',
    heading: 'Start with a roofer-led roof survey.',
    text: 'Tell us about the building or project and we’ll start with a roofer’s look at the roof, not a sales pitch.',
    points: [
      { title: 'Roofer first.', text: 'Condition-focused survey of the roof.' },
      { title: 'Photo documentation.', text: 'Photos you can share with owners and tenants.' },
      { title: 'Written scope & price.', text: 'Before any work starts.' },
      { title: 'Clear next step.', text: 'Repair, maintain or replace, in plain English.' },
    ],
  },
};

// Roof Check card + estimate request form. Every page has one, so "Get Pro Advice" always has a target.
// tone="white" drops the pale blue background when the section above is also pale blue.
export default function RoofCheck({ tone, offer = 'home' }) {
  const o = OFFERS[offer];
  return (
    <section className={'section check' + (tone === 'white' ? ' check-white' : '')} id="roof-check">
      <div className="container check-grid">
        <aside className="check-card">
          <div className="eyebrow">{o.eyebrow}</div>
          {o.price && <div className="price">{o.price}</div>}
          <h2>{o.heading}</h2>
          <p>{o.text}</p>
          <div className="check-points">
            {o.points.map((point) => (
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
