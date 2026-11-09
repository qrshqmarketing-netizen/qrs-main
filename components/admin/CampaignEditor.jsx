'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LEAD_STATUSES } from '@/lib/leadStatuses';
import { adminApi } from './api';
import AdminIcon from './AdminIcons';

// A drip campaign's editor (/admin/campaigns/<id>/ and /admin/campaigns/new/; owner, November 9 2026; server side lib/drips.js). Name, which
// leads it is for (a lead status, Remarketing by default), on or off, and its emails in order: each waits a number of days after the one before
// (the first, after the lead is enrolled), with a subject and a message. In a message, a blank line starts a new paragraph,
// [words](/path/) is a link (links to this site get the campaign's utm tags), **words** is bold, and {first_name} and {phone} are filled in.
// Every email gets the company's name and address and an unsubscribe link at the bottom.
const AUDIENCES = LEAD_STATUSES.filter((s) => s.id !== 'spam');

export default function CampaignEditor({ campaign, me = '' }) {
  const router = useRouter();
  const [form, setForm] = useState(() => ({
    name: campaign.name || '',
    audience_status: campaign.audience_status || 'remarketing',
    active: Boolean(campaign.active),
    steps: (campaign.steps || []).map((s) => ({ delay_days: s.delay_days ?? 0, subject: s.subject || '', body: s.body || '' })),
  }));
  const [testTo, setTestTo] = useState(me);
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState('');
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setStep = (i, k, v) => setForm((f) => ({ ...f, steps: f.steps.map((s, j) => (j === i ? { ...s, [k]: v } : s)) }));
  const move = (i, d) =>
    setForm((f) => {
      const steps = [...f.steps];
      const [s] = steps.splice(i, 1);
      steps.splice(i + d, 0, s);
      return { ...f, steps };
    });

  const save = async (patch = {}) => {
    setBusy('save');
    setMsg(null);
    const res = await adminApi('/api/admin/campaigns', { action: 'save', id: campaign.id || null, campaign: { ...form, ...patch } });
    setBusy('');
    if (!res.ok) return setMsg({ bad: true, text: res.error || 'Could not save.' });
    if (patch.active !== undefined) set('active', patch.active);
    setMsg({ text: 'Saved.' });
    if (!campaign.id && res.id) router.replace(`/admin/campaigns/${res.id}/`);
    router.refresh();
  };

  const test = async (i) => {
    setBusy(`test${i}`);
    setMsg(null);
    const res = await adminApi('/api/admin/campaigns', { action: 'test', campaign: form, step: i, to: testTo });
    setBusy('');
    setMsg(res.ok ? { text: `Test of email ${i + 1} sent to ${testTo}.` } : { bad: true, text: res.error || 'Could not send the test.' });
  };

  const remove = async () => {
    if (!campaign.id || !window.confirm(`Delete “${form.name}”? Its send history goes with it. This can’t be undone.`)) return;
    const res = await adminApi('/api/admin/campaigns', { action: 'delete', id: campaign.id });
    if (!res.ok) return setMsg({ bad: true, text: res.error || 'Could not delete.' });
    router.push('/admin/campaigns/');
    router.refresh();
  };

  let day = 0;
  return (
    <div className="adm-campaign">
      <section className="adm-card">
        <div className="adm-form-grid">
          <div className="adm-field">
            <label htmlFor="cp-name">Campaign name</label>
            <input id="cp-name" value={form.name} maxLength={120} onChange={(e) => set('name', e.target.value)} />
            <p className="adm-hint">Also its utm_campaign tag on links to the site, as a slug.</p>
          </div>
          <div className="adm-field">
            <label htmlFor="cp-aud">Send to leads in</label>
            <select id="cp-aud" value={form.audience_status} onChange={(e) => set('audience_status', e.target.value)}>
              {AUDIENCES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            <p className="adm-hint">Leads in this status with an email are added on each daily run. A lead moved to another status stops getting the series.</p>
          </div>
        </div>
        <div className="adm-form-actions">
          <span className={'adm-chip ' + (form.active ? 'on' : '')}>{form.active ? 'Sending' : 'Paused'}</span>
          <button className="adm-btn" type="button" disabled={Boolean(busy)} onClick={() => save({ active: !form.active })}>
            {form.active ? 'Pause' : 'Start sending'}
          </button>
        </div>
      </section>

      {form.steps.map((s, i) => {
        day += Number(s.delay_days) || 0;
        return (
          <section className="adm-card adm-step" key={i}>
            <div className="adm-section-head">
              <h2>
                Email {i + 1} <span className="adm-hint">· day {day} after enrollment</span>
              </h2>
              <div className="adm-row-actions">
                <button className="adm-icon-btn" type="button" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up" title="Move up">
                  ↑
                </button>
                <button className="adm-icon-btn" type="button" disabled={i === form.steps.length - 1} onClick={() => move(i, 1)} aria-label="Move down" title="Move down">
                  ↓
                </button>
                <button className="adm-icon-btn" type="button" onClick={() => setForm((f) => ({ ...f, steps: f.steps.filter((_, j) => j !== i) }))} aria-label="Remove this email" title="Remove">
                  <AdminIcon name="trash" />
                </button>
              </div>
            </div>
            <div className="adm-form-grid">
              <div className="adm-field">
                <label htmlFor={`cp-d${i}`}>{i === 0 ? 'Days after the lead is added' : 'Days after the email before'}</label>
                <input id={`cp-d${i}`} type="number" min="0" max="365" value={s.delay_days} onChange={(e) => setStep(i, 'delay_days', e.target.value)} />
              </div>
              <div className="adm-field">
                <label htmlFor={`cp-s${i}`}>Subject</label>
                <input id={`cp-s${i}`} value={s.subject} maxLength={150} onChange={(e) => setStep(i, 'subject', e.target.value)} />
              </div>
            </div>
            <div className="adm-field">
              <label htmlFor={`cp-b${i}`}>Message</label>
              <textarea id={`cp-b${i}`} rows={10} value={s.body} maxLength={8000} onChange={(e) => setStep(i, 'body', e.target.value)} />
              <p className="adm-hint">A blank line starts a new paragraph. [Link words](/page/) makes a link, **words** is bold, {'{first_name}'} and {'{phone}'} are filled in. The company’s address and an unsubscribe link are added at the bottom.</p>
            </div>
            <div className="adm-form-actions">
              <button className="adm-btn" type="button" disabled={Boolean(busy) || !testTo} onClick={() => test(i)}>
                <AdminIcon name="mail" /> {busy === `test${i}` ? 'Sending…' : 'Send me a test'}
              </button>
            </div>
          </section>
        );
      })}

      {form.steps.length < 10 && (
        <button className="adm-btn" type="button" onClick={() => setForm((f) => ({ ...f, steps: [...f.steps, { delay_days: 7, subject: '', body: 'Hi {first_name},\n\n\n\nThe QRS team' }] }))}>
          <AdminIcon name="plus" /> Add an email
        </button>
      )}

      <section className="adm-card">
        <div className="adm-field">
          <label htmlFor="cp-to">Send tests to</label>
          <input id="cp-to" type="email" value={testTo} onChange={(e) => setTestTo(e.target.value)} placeholder="you@qualityroofingspecialists.com" />
        </div>
        <div className="adm-form-actions">
          <button className="adm-btn adm-btn-primary" type="button" disabled={Boolean(busy)} onClick={() => save()}>
            {busy === 'save' ? 'Saving…' : 'Save campaign'}
          </button>
          {campaign.id && (
            <button className="adm-btn adm-btn-danger" type="button" onClick={remove}>
              Delete
            </button>
          )}
        </div>
        {msg && <div className={'adm-msg ' + (msg.bad ? 'bad' : 'ok')}>{msg.text}</div>}
      </section>
    </div>
  );
}
