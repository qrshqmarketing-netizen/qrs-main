'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { adminApi } from './api';

// A lead's follow-up: the status as a row of choices and the team's notes, saved to the leads table (app/api/admin/leads). A status choice saves
// at once; the notes save with the button.
export default function LeadEditor({ id, status: initialStatus, notes: initialNotes, statuses }) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [notes, setNotes] = useState(initialNotes);
  const [saved, setSaved] = useState(initialNotes);
  const [message, setMessage] = useState(null);
  const [busy, setBusy] = useState(false);

  const save = async (patch) => {
    setBusy(true);
    setMessage(null);
    const res = await adminApi('/api/admin/leads', { id, ...patch });
    setBusy(false);
    if (!res.ok) {
      setMessage({ kind: 'bad', text: res.error || 'Could not save.' });
      return false;
    }
    setMessage({ kind: 'ok', text: 'Saved.' });
    router.refresh();
    return true;
  };
  const choose = async (next) => {
    const before = status;
    setStatus(next);
    if (!(await save({ status: next }))) setStatus(before);
  };
  const saveNotes = async () => {
    if (await save({ notes })) setSaved(notes);
  };

  return (
    <aside className="adm-card adm-follow" aria-label="Follow-up">
      <h2>Follow-up</h2>
      <fieldset className="adm-choices" disabled={busy}>
        <legend>Status</legend>
        {statuses.map((s) => (
          <label key={s.id} className={`adm-choice s-${s.id}` + (status === s.id ? ' on' : '')}>
            <input type="radio" name="status" value={s.id} checked={status === s.id} onChange={() => choose(s.id)} />
            <span>{s.label}</span>
          </label>
        ))}
      </fieldset>
      <div className="adm-field">
        <label htmlFor="lead-notes">Notes</label>
        <textarea id="lead-notes" rows={7} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Calls, the visit date, the price sent…" maxLength={5000} />
      </div>
      <button className="adm-btn adm-btn-primary adm-btn-block" type="button" onClick={saveNotes} disabled={busy || notes === saved}>
        {busy ? 'Saving…' : 'Save notes'}
      </button>
      {message && (
        <div className={`adm-msg ${message.kind}`} role="status">
          {message.text}
        </div>
      )}
    </aside>
  );
}
