'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { adminApi } from './api';

// "Run now" on /admin/campaigns/: the same run as the daily 8 AM one (lib/drips.js runDrips), reported in a line
export default function CampaignRun() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const run = async () => {
    setBusy(true);
    setMsg(null);
    const r = await adminApi('/api/admin/campaigns', { action: 'run' });
    setBusy(false);
    if (!r.ok) return setMsg({ bad: true, text: r.error || r.skipped || 'The run did not finish.' });
    setMsg({ text: `Done: ${r.enrolled} added, ${r.sent} sent, ${r.completed} finished, ${r.stopped} stopped${r.unsubscribed ? `, ${r.unsubscribed} unsubscribed` : ''}${r.failed ? `, ${r.failed} failed` : ''}.${r.errors?.length ? ` Resend said: ${r.errors.join('; ')}` : ''}` });
    router.refresh();
  };
  return (
    <>
      <button className="adm-btn" type="button" disabled={busy} onClick={run}>
        {busy ? 'Running…' : 'Run now'}
      </button>
      {msg && <div className={'adm-msg adm-run-msg ' + (msg.bad ? 'bad' : 'ok')}>{msg.text}</div>}
    </>
  );
}
