'use client';

import { useState } from 'react';
import Rich from '@/components/ui/Rich';
import './PostVisuals.css';

// The shared frame of the roof diagrams (LayerDiagram.jsx, CommercialHotspots.jsx): a navy "blueprint" card holding an SVG scene with a numbered pin for
// each item, a colour legend, and a card for every item. Tapping a pin or a card highlights the other. Every item stays visible as text, so nothing
// depends on the script. items: [{ title, text }]; pins: one { x, y } (in scene units) or null per item; legend: [{ color, label }].
export default function Hotspots({ items, pins, width, height, label, legend = [], hint = 'Tap a number to see where it can go wrong.', children }) {
  const [active, setActive] = useState(0);
  return (
    <figure className="ld">
      <div className="ld-stage">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label} focusable="false">
          {children}
        </svg>
        {items.map((item, i) =>
          pins[i] ? (
            <button
              key={item.title}
              className={'ld-pin' + (i === active ? ' is-on' : '')}
              type="button"
              style={{ left: `${(pins[i].x / width) * 100}%`, top: `${(pins[i].y / height) * 100}%` }}
              aria-label={`Show ${i + 1}: ${item.title}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              {i + 1}
            </button>
          ) : null
        )}
      </div>
      {legend.length > 0 && (
        <ul className="ld-legend" aria-hidden="true">
          {legend.map((l) => (
            <li key={l.label}><i style={{ background: l.color }} />{l.label}</li>
          ))}
        </ul>
      )}
      <figcaption className="ld-hint">{hint}</figcaption>
      <ol className="ld-list">
        {items.map((item, i) => (
          <li key={item.title} className={i === active ? 'is-on' : undefined}>
            <button type="button" className="ld-card" onClick={() => setActive(i)} aria-pressed={i === active}>
              <span className="ld-n" aria-hidden="true">{i + 1}</span>
              <span className="ld-body">
                <strong>{item.title}</strong>
                {item.text && (
                  <span>
                    <Rich text={item.text} />
                  </span>
                )}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </figure>
  );
}
