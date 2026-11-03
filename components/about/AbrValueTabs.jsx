'use client';

// The values as tabs (owner, November 3 2026: "a tabbed component without images"): numbered tabs at the left (a row of chips on phones), the
// chosen value's text at the right. Every panel stays in the HTML (the others are `hidden`), so all the values remain readable without JavaScript
// and for search engines. Arrow keys move between tabs, as the ARIA tabs pattern expects.
import { useId, useRef, useState } from 'react';

export default function AbrValueTabs({ values }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabs = useRef([]);
  const onKey = (e) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    let next = step ? (active + step + values.length) % values.length : e.key === 'Home' ? 0 : e.key === 'End' ? values.length - 1 : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };
  return (
    <div className="abr-vtabs">
      <div className="abr-vtab-list" role="tablist" aria-label="Our values" aria-orientation="vertical" onKeyDown={onKey}>
        {values.map((v, i) => (
          <button
            key={v.title}
            ref={(el) => (tabs.current[i] = el)}
            type="button"
            role="tab"
            id={`${id}-t${i}`}
            aria-selected={i === active}
            aria-controls={`${id}-p${i}`}
            tabIndex={i === active ? 0 : -1}
            className={i === active ? 'is-on' : undefined}
            onClick={() => setActive(i)}
          >
            <span className="abr-vnum">{String(i + 1).padStart(2, '0')}</span>
            {v.title}
          </button>
        ))}
      </div>
      {values.map((v, i) => (
        <div key={v.title} role="tabpanel" id={`${id}-p${i}`} aria-labelledby={`${id}-t${i}`} className="abr-vtab-panel" hidden={i !== active}>
          <span className="abr-vnum">{String(i + 1).padStart(2, '0')} / {String(values.length).padStart(2, '0')}</span>
          <h3>{v.title}</h3>
          <p>{v.text}</p>
        </div>
      ))}
    </div>
  );
}
