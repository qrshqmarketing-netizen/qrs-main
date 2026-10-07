'use client';

import { useEffect, useState } from 'react';
import Rich from '@/components/ui/Rich';
import './PostVisuals.css';

// "Repair, restore or replace?" as cards you can pick from: one card per option with the article's "Best when" line, and, when the table has a third
// column ("What it involves"), the picked card opens it. Pick the card that sounds like your roof. Without script every card shows all of its text.
// head: ['Option', 'Best when', 'What it involves'?]; rows: [['Repair', 'The damage is local...', '...'], ...]
export default function DecisionCards({ head, rows }) {
  const [picked, setPicked] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const onKey = (e) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(e.key)) return;
    e.preventDefault();
    const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1;
    setPicked((p) => (((p ?? (step > 0 ? -1 : 0)) + step + rows.length) % rows.length));
  };
  return (
    <div className="dc">
      <p className="dc-ask" id="dc-ask">Which of these sounds most like your roof? Tap a card.</p>
      <div className={`dc-grid dc-n${rows.length}`} role="radiogroup" aria-labelledby="dc-ask" onKeyDown={onKey}>
        {rows.map((row, i) => {
          const on = picked === i;
          return (
            <div
              key={row[0]}
              className={'dc-card' + (on ? ' is-on' : '')}
              role="radio"
              aria-checked={on}
              tabIndex={on || (picked === null && i === 0) ? 0 : -1}
              onClick={() => setPicked(i)}
              onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && (e.preventDefault(), setPicked(i))}
            >
              <span className="dc-mark" aria-hidden="true" />
              <p className="dc-name">{row[0]}</p>
              <p className="dc-label">{head[1]}</p>
              <p className="dc-text"><Rich text={row[1]} /></p>
              {row[2] && (
                <div className="dc-more" hidden={ready && !on}>
                  <p className="dc-label">{head[2]}</p>
                  <p className="dc-text"><Rich text={row[2]} /></p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
