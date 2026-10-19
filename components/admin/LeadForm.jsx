'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FOUND_US_OPTIONS, ROOF_TYPES, SERVICE_OPTIONS, VISIT_TIMES } from '@/data/estimateOptions';
import { LEAD_STATUSES } from '@/lib/leadStatuses';
import { adminApi } from './api';

// Add a lead by hand (/admin/leads/new/) or edit one (/admin/leads/<id>/edit/). The choices are the website's own (data/estimateOptions.js), and
// a value already on the lead that isn't one of them (an older form's wording) stays selectable. At least a name, a phone or an email is needed.
const FIELDS = ['name', 'phone', 'email', 'zip', 'address', 'service', 'roof_type', 'preferred_date', 'preferred_time', 'found_us', 'source', 'status', 'message', 'notes'];

const withCurrent = (options, current) => (current && !options.includes(current) ? [current, ...options] : options);

export default function LeadForm({ lead = null }) {
  const router = useRouter();
  const editing = Boolean(lead?.id);
  const [form, setForm] = useState(() => Object.fromEntries(FIELDS.map((k) => [k, lead?.[k] ?? (k === 'status' ? 'new' : '')])));
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const res = await adminApi('/api/admin/leads', editing ? { action: 'update', id: lead.id, lead: form } : { action: 'create', lead: form });
    setBusy(false);
    if (!res.ok) return setError(res.error || 'Could not save.');
    router.push(`/admin/leads/${editing ? lead.id : res.id}/`);
    router.refresh();
  };

  const text = (k, label, props = {}) => (
    <div className="adm-field">
      <label htmlFor={`lf-${k}`}>{label}</label>
      <input id={`lf-${k}`} value={form[k] || ''} onChange={set(k)} {...props} />
    </div>
  );
  const select = (k, label, options, empty = 'Not set') => (
    <div className="adm-field">
      <label htmlFor={`lf-${k}`}>{label}</label>
      <select id={`lf-${k}`} value={form[k] || ''} onChange={set(k)}>
        <option value="">{empty}</option>
        {withCurrent(options, lead?.[k]).map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );

  return (
    <form className="adm-lead-form" onSubmit={submit} noValidate>
      <section className="adm-card">
        <h2>Contact</h2>
        <div className="adm-form-grid">
          {text('name', 'Name', { autoComplete: 'off', maxLength: 120 })}
          {text('phone', 'Phone', { type: 'tel', autoComplete: 'off', maxLength: 40 })}
          {text('email', 'Email', { type: 'email', autoComplete: 'off', maxLength: 200 })}
          {text('zip', 'ZIP code', { inputMode: 'numeric', maxLength: 10 })}
        </div>
        {text('address', 'Address', { maxLength: 300 })}
      </section>
      <section className="adm-card">
        <h2>The job</h2>
        <div className="adm-form-grid">
          {select('service', 'What they need', SERVICE_OPTIONS)}
          {select('roof_type', 'Roof type', ROOF_TYPES)}
          {text('preferred_date', 'Preferred date', { type: 'date' })}
          {select('preferred_time', 'Preferred time', VISIT_TIMES)}
          {select('found_us', 'How they found us', FOUND_US_OPTIONS)}
          {text('source', 'Came in through', { placeholder: editing ? '' : 'Added in dashboard', maxLength: 80 })}
        </div>
        <div className="adm-field">
          <label htmlFor="lf-message">Their message</label>
          <textarea id="lf-message" rows={4} value={form.message || ''} onChange={set('message')} maxLength={5000} />
        </div>
      </section>
      <section className="adm-card">
        <h2>Follow-up</h2>
        <div className="adm-form-grid">
          <div className="adm-field">
            <label htmlFor="lf-status">Status</label>
            <select id="lf-status" value={form.status} onChange={set('status')}>
              {LEAD_STATUSES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="adm-field">
          <label htmlFor="lf-notes">Notes</label>
          <textarea id="lf-notes" rows={4} value={form.notes || ''} onChange={set('notes')} maxLength={5000} placeholder="Calls, the visit date, the price sent…" />
        </div>
      </section>
      {error && (
        <div className="adm-msg bad" role="alert">
          {error}
        </div>
      )}
      <div className="adm-form-actions">
        <button className="adm-btn adm-btn-primary" type="submit" disabled={busy}>
          {busy ? 'Saving…' : editing ? 'Save changes' : 'Add lead'}
        </button>
        <Link className="adm-btn" href={editing ? `/admin/leads/${lead.id}/` : '/admin/leads/'}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
