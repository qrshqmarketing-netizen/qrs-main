import { STEP_ICONS } from '@/components/ui/stepIcons';
import { PROCESS_STEPS } from '@/data/process';
import './Process.css';

export default function Process() {
  return (
    <section className="qrs-way" id="process">
      <div className="container">
        <h2>Roofing, The QRS Way</h2>
        <div className="steps">
          {PROCESS_STEPS.map((step, i) => (
            <div className="step" key={step.title}>
              <div className="step-label">Step {String(i + 1).padStart(2, '0')}</div>
              <div className="step-icon">
                <svg viewBox="0 0 64 64" aria-hidden="true">{STEP_ICONS[step.icon]}</svg>
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
