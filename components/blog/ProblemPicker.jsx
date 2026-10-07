'use client';

import { useEffect, useRef, useState } from 'react';
import Rich from '@/components/ui/Rich';
import './PostVisuals.css';

// "Which fix fits which problem": pick the problem and see the temporary option and what to know about it. Without script (or before it has loaded)
// every problem is shown with its answer, one under the other. head: ['Problem', 'Temporary option', 'What to know']; rows from the article's table.
export default function ProblemPicker({ head, rows }) {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const refs = useRef([]);
  useEffect(() => setReady(true), []);
  const onKey = (e) => {
    const next = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? (active + 1) % rows.length : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? (active + rows.length - 1) % rows.length : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };
  return (
    <div className="pp">
      <div className="pp-chips" role="tablist" aria-label={head[0]} onKeyDown={onKey}>
        {rows.map((row, i) => (
          <button
            key={row[0]}
            ref={(el) => (refs.current[i] = el)}
            type="button"
            role="tab"
            className={'pp-chip' + (i === active ? ' is-on' : '')}
            id={`pp-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`pp-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
          >
            {row[0]}
          </button>
        ))}
      </div>
      {rows.map((row, i) => (
        <div className="pp-panel" key={row[0]} role="tabpanel" id={`pp-panel-${i}`} aria-labelledby={`pp-tab-${i}`} hidden={ready && i !== active}>
          {!ready && <p className="pp-solo">{row[0]}</p>}
          <div className="pp-col pp-fix">
            <p className="pp-label">{head[1]}</p>
            <p className="pp-big"><Rich text={row[1]} /></p>
          </div>
          <div className="pp-col pp-know">
            <p className="pp-label">{head[2]}</p>
            <p className="pp-note"><Rich text={row[2]} /></p>
          </div>
        </div>
      ))}
    </div>
  );
}
