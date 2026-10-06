'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from './api';

// The dashboard's login (one shared password, lib/adminAuth.js). `ready` is false until ADMIN_PASSWORD is set on the server.
export default function LoginForm({ ready }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const res = await adminApi('/api/admin/login', { password });
    setBusy(false);
    if (res.ok) router.refresh();
    else setError(res.error || 'Could not log in.');
  };

  return (
    <div className="adm-wrap adm-login">
      <h1>Team dashboard</h1>
      <p className="adm-help">Quality Roofing Specialists. Log in to edit the blog articles.</p>
      {!ready && (
        <div className="adm-msg warn">
          The dashboard isn't set up yet. In Vercel, add <strong>ADMIN_PASSWORD</strong> (at least 12 characters) next to the Supabase settings, then redeploy.
        </div>
      )}
      <form className="adm-card" onSubmit={submit}>
        <div className="adm-field">
          <label htmlFor="adm-password">Password</label>
          <input id="adm-password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required autoFocus />
        </div>
        {error && <div className="adm-msg bad" role="alert">{error}</div>}
        <button className="adm-btn adm-btn-primary" type="submit" disabled={busy || !password}>
          {busy ? 'Logging in…' : 'Log in'}
        </button>
      </form>
    </div>
  );
}
