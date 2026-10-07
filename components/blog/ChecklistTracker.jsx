'use client';

import { useEffect, useState } from 'react';
import Rich from '@/components/ui/Rich';
import { splitLead } from './lead';
import './PostVisuals.css';

// A checklist you can tick off: each item has a real checkbox, a ring shows how many are done, and the ticks are remembered on this device
// (localStorage, under `storageKey`, which names the article and the section). "Reset" clears them and "Print" prints the page. Nothing is sent
// anywhere. Items are the article's own checklist ("**Lead:** the rest"). Before the script runs, every box is simply unticked.
const R = 26;
const C = 2 * Math.PI * R;

export default function ChecklistTracker({ items, storageKey }) {
  const [done, setDone] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
      if (Array.isArray(saved)) setDone(saved.filter((i) => Number.isInteger(i) && i < items.length));
    } catch {}
    setReady(true);
  }, [storageKey, items.length]);

  const save = (next) => {
    setDone(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {}
  };
  const toggle = (i) => save(done.includes(i) ? done.filter((d) => d !== i) : [...done, i]);
  const count = ready ? done.length : 0;
  const all = count === items.length;

  return (
    <div className="ck">
      <div className="ck-top">
        <svg className="ck-ring" viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r={R} className="ck-ring-bg" />
          <circle cx="32" cy="32" r={R} className="ck-ring-fg" strokeDasharray={C} strokeDashoffset={C * (1 - count / items.length)} transform="rotate(-90 32 32)" />
        </svg>
        <div className="ck-count" role="status" aria-live="polite">
          <strong>{count} of {items.length}</strong>
          <span>{all ? 'All checked' : 'checked'}</span>
        </div>
        <div className="ck-actions">
          <button type="button" onClick={() => save([])} disabled={!count}>Reset</button>
          <button type="button" onClick={() => window.print()}>Print</button>
        </div>
      </div>
      <ul className="ck-list">
        {items.map((item, i) => {
          const { lead, rest } = splitLead(item);
          const on = ready && done.includes(i);
          return (
            <li key={item} className={on ? 'is-done' : undefined}>
              <label>
                <input type="checkbox" checked={on} onChange={() => toggle(i)} />
                <span className="ck-box" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M5 12.5l4.2 4.2L19 7" /></svg>
                </span>
                <span className="ck-text">
                  {lead && <strong>{lead}</strong>}
                  {rest && (
                    <span>
                      <Rich text={rest} />
                    </span>
                  )}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
