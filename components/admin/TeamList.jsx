'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { adminApi } from './api';

// The Team page's two lists (app/api/admin/team): requests waiting for approval (Approve / Decline) and the people with access (Suspend /
// Remove; never your own account). Declining or removing deletes the account and asks first.
const day = (iso) => (iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'America/Los_Angeles' }) : '');

export default function TeamList({ users, me }) {
  const router = useRouter();
  const [busy, setBusy] = useState('');
  const [message, setMessage] = useState(null);
  const pending = users.filter((u) => u.role === 'pending');
  const admins = users.filter((u) => u.role === 'admin');
  const others = users.filter((u) => !u.role);

  const act = async (user, action) => {
    const label = user.name || user.email;
    if ((action === 'remove' && !window.confirm(`Delete the account of ${label}? They will need to register again.`)) || (action === 'suspend' && !window.confirm(`Take dashboard access away from ${label}?`))) return;
    setBusy(user.id + action);
    setMessage(null);
    const res = await adminApi('/api/admin/team', { action, id: user.id });
    setBusy('');
    if (!res.ok) return setMessage({ kind: 'bad', text: res.error || 'Could not save.' });
    setMessage({ kind: 'ok', text: { approve: `${label} can now log in.`, suspend: `${label} no longer has access.`, remove: `The account of ${label} was deleted.` }[action] });
    router.refresh();
  };

  const row = (u, buttons) => (
    <li className="adm-person" key={u.id}>
      <span className="adm-avatar" aria-hidden="true">
        {(u.name || u.email).slice(0, 1).toUpperCase()}
      </span>
      <span className="adm-person-text">
        <b>
          {u.name || u.email.split('@')[0]}
          {u.id === me && <em> (you)</em>}
        </b>
        <small>{u.email}</small>
      </span>
      <span className="adm-person-meta">{u.role === 'pending' ? `Asked ${day(u.createdAt)}` : u.lastSignIn ? `Last login ${day(u.lastSignIn)}` : 'Not logged in yet'}</span>
      <span className="adm-person-actions">{buttons}</span>
    </li>
  );
  const button = (u, action, text, kind = '') => (
    <button className={`adm-btn ${kind}`} type="button" onClick={() => act(u, action)} disabled={Boolean(busy)}>
      {busy === u.id + action ? 'Saving…' : text}
    </button>
  );

  return (
    <>
      {message && (
        <div className={`adm-msg ${message.kind}`} role="status">
          {message.text}
        </div>
      )}
      <section className="adm-card">
        <h2>
          Waiting for approval <span className="adm-num">{pending.length}</span>
        </h2>
        {pending.length === 0 ? (
          <p className="adm-help">No requests right now.</p>
        ) : (
          <ul className="adm-people">{pending.map((u) => row(u, <>{button(u, 'approve', 'Approve', 'adm-btn-primary')}{button(u, 'remove', 'Decline', 'adm-btn-danger')}</>))}</ul>
        )}
      </section>
      <section className="adm-card">
        <h2>
          Has access <span className="adm-num">{admins.length}</span>
        </h2>
        {admins.length === 0 ? (
          <p className="adm-help">Nobody has a personal account yet. Approve a request above, or mark someone in Supabase with scripts/supabase-admin-users.sql.</p>
        ) : (
          <ul className="adm-people">{admins.map((u) => row(u, u.id === me ? null : <>{button(u, 'suspend', 'Suspend')}{button(u, 'remove', 'Remove', 'adm-btn-danger')}</>))}</ul>
        )}
      </section>
      {others.length > 0 && (
        <section className="adm-card">
          <h2>
            Other accounts <span className="adm-num">{others.length}</span>
          </h2>
          <p className="adm-help">Accounts in Supabase that aren’t dashboard users. Approve one to give it access.</p>
          <ul className="adm-people">{others.map((u) => row(u, <>{button(u, 'approve', 'Give access', 'adm-btn-primary')}</>))}</ul>
        </section>
      )}
    </>
  );
}
