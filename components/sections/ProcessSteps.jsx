import Image from 'next/image';
import Rich from '@/components/ui/Rich';
import './ProcessSteps.css';

// Numbered steps with optional bullet lists, beside a photo (or scene art) that stays in view while scrolling.
// steps: [{ title, text, bullets? }]
export default function ProcessSteps({ heading = 'Our Process', subheading, steps = [], scene = 'scene-inspect', image, imageAlt = '', tone }) {
  return (
    <section className={'process-block' + (tone === 'white' ? ' process-block-white' : '')}>
      <div className="container process-block-grid">
        <div className="process-block-copy">
          <h2>{heading}</h2>
          {subheading && <p className="process-block-sub">{subheading}</p>}
          <ol className="process-list">
            {steps.map((step, i) => (
              <li key={step.title}>
                <h3>
                  <span className="process-num" aria-hidden="true">{i + 1}</span>
                  {step.title}
                </h3>
                <p>
                  <Rich text={step.text} />
                </p>
                {step.bullets?.length > 0 && (
                  <ul>
                    {step.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </div>
        <div className="process-block-visual">
          {image ? (
            <div className="process-block-media">
              <Image src={image} alt={imageAlt} fill sizes="(min-width: 901px) 420px, 100vw" />
            </div>
          ) : (
            <div className={`process-block-media art ${scene}`} aria-hidden="true" />
          )}
        </div>
      </div>
    </section>
  );
}
