'use client';

import { useEffect, useRef, useState } from 'react';
import Rich from '@/components/ui/Rich';
import './PostVisuals.css';

// Small pictures for the roof-type tabs; any other first-column word gets a plain dot
const ICONS = {
  shingle: <path d="M3 8h18M3 13h18M3 18h18M8 3v5M15 8v5M8 13v5M15 18v3" />,
  tile: <path d="M3 18c0-5 4-8 4.5-8S12 13 12 18M12 18c0-5 4-8 4.5-8S21 13 21 18M3 18h18" />,
  flat: <path d="M2 14h20M7 14v3M17 14v3M12 14v-4M9 10h6" />,
};
const iconFor = (label) => ICONS[label.toLowerCase().split(' ')[0]] || <circle cx="12" cy="12" r="3" />;

// "Lifted or missing shingles, creased tabs, exposed nails" -> short bullets (split at commas, first letter capitalised)
const bullets = (text) => text.split(/,\s+/).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).filter(Boolean);

// A table whose first column is a choice (roof type) as tabs: one tab per row, and in each panel the other columns as short bullet lists.
// Without script (or before it has loaded) every panel is shown one under the other, so nothing is hidden from search engines or readers.
// head: ['Roof type', 'Common storm damage', 'What a roofer checks']; rows: [['Shingle', '…', '…'], ...]
export default function RoofTypeTabs({ head, rows }) {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const refs = useRef([]);
  useEffect(() => setReady(true), []);

  const onKey = (e) => {
    const next = e.key === 'ArrowRight' ? (active + 1) % rows.length : e.key === 'ArrowLeft' ? (active + rows.length - 1) % rows.length : e.key === 'Home' ? 0 : e.key === 'End' ? rows.length - 1 : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div className="rtt">
      <div className="rtt-tabs" role="tablist" aria-label={head[0]} onKeyDown={onKey}>
        {rows.map((row, i) => (
          <button
            key={row[0]}
            ref={(el) => (refs.current[i] = el)}
            className={'rtt-tab' + (i === active ? ' is-on' : '')}
            type="button"
            role="tab"
            id={`rtt-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`rtt-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">{iconFor(row[0])}</svg>
            {row[0]}
          </button>
        ))}
      </div>
      {rows.map((row, i) => (
        <div className="rtt-panel" key={row[0]} role="tabpanel" id={`rtt-panel-${i}`} aria-labelledby={`rtt-tab-${i}`} hidden={ready && i !== active}>
          {!ready && <p className="rtt-solo">{row[0]}</p>}
          {head.slice(1).map((label, c) => (
            <div className="rtt-col" key={label}>
              <p className="rtt-label">{label}</p>
              <ul>
                {bullets(row[c + 1]).map((text) => (
                  <li key={text}>
                    <Rich text={text} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
