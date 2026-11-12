'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { adminApi } from './api';

// The buttons at the end of a subscriber's row on /admin/subscribers/: stop the emails, send the confirmation again (pending only) or delete the row
export default function SubscriberActions({ email, status }) {
  const router = useRouter();
  const [busy, setBusy] = useState('');
  const [msg, setMsg] = useState('');
  const run = async (action, ask) => {
    if (ask && !window.confirm(ask)) return;
    setBusy(action);
    setMsg('');
    const r = await adminApi('/api/admin/subscribers', { action, email });
    setBusy('');
    if (!r.ok) return setMsg(r.error || 'That did not work.');
    if (action === 'resend') setMsg('Confirmation sent.');
    else router.refresh();
  };
  return (
    <span className="adm-row-actions">
      {status === 'pending' && (
        <button type="button" className="adm-link-btn" disabled={Boolean(busy)} onClick={() => run('resend')}>
          {busy === 'resend' ? 'Sending…' : 'Resend confirmation'}
        </button>
      )}
      {status !== 'unsubscribed' && (
        <button type="button" className="adm-link-btn" disabled={Boolean(busy)} onClick={() => run('unsubscribe', `Stop all emails to ${email}? This is the same as clicking the unsubscribe link, and it also stops the roof-care campaigns.`)}>
          {busy === 'unsubscribe' ? 'Saving…' : 'Unsubscribe'}
        </button>
      )}
      <button type="button" className="adm-link-btn" disabled={Boolean(busy)} onClick={() => run('delete', `Delete ${email} from the list for good? (If they unsubscribed, they stay blocked from our emails.)`)}>
        {busy === 'delete' ? 'Deleting…' : 'Delete'}
      </button>
      {msg && <small className="adm-hint">{msg}</small>}
    </span>
  );
}
