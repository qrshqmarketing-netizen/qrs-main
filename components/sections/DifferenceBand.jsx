import { STEP_ICONS } from '@/components/ui/stepIcons';
import './DifferenceBand.css';

const POINTS = [
  {
    icon: 'roof-check',
    title: 'Roofer first. No pressure.',
    text: 'Every project starts with a roofer-led Roof Check, not a sales pitch. You get photos, plain-English answers and a clear next step.',
  },
  {
    icon: 'quote',
    title: 'Written scope & price',
    text: 'Before any work starts, you see exactly what’s included and what it costs. No mystery pricing and no surprises.',
  },
  {
    icon: 'walkthrough',
    title: 'Lifetime workmanship',
    text: 'Our installs are backed by a lifetime workmanship warranty, and we walk the finished roof with you before we call it done.',
  },
];

// Navy band with the three things that make QRS different
export default function DifferenceBand({ heading = 'The QRS Difference', points = POINTS }) {
  return (
    <section className="difference tile-pattern on-dark">
      <div className="container">
        <h2>{heading}</h2>
        <div className="difference-grid">
          {points.map((point) => (
            <div className="difference-item" key={point.title}>
              <svg className="difference-icon" viewBox="0 0 64 64" aria-hidden="true">
                {STEP_ICONS[point.icon]}
              </svg>
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
