'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from './api';

// The dashboard's login (lib/adminAuth.js): email + password with Supabase Auth (`withEmail`), or the one shared password. `ready` is false until it is set up on the server.
export default function LoginForm({ ready, withEmail = false }) {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const res = await adminApi('/api/admin/login', withEmail ? { email, password } : { password });
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
        {withEmail && (
          <div className="adm-field">
            <label htmlFor="adm-email">Email</label>
            <input id="adm-email" name="email" type="email" autoComplete="username" autoCapitalize="none" autoCorrect="off" spellCheck={false} value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
          </div>
        )}
        <div className="adm-field">
          <label htmlFor="adm-password">Password</label>
          {/* "new-password" stops the browser from filling in an old saved password for this website (a wrong password would look like a broken login) */}
          <input id="adm-password" name="dashboard-password" type={show ? 'text' : 'password'} autoComplete={withEmail ? "current-password" : "new-password"} autoCapitalize="none" autoCorrect="off" spellCheck={false} value={password} onChange={(e) => setPassword(e.target.value)} required autoFocus={!withEmail} />
          <label className="adm-check" style={{ marginTop: 8 }}>
            <input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} />
            <span>Show what I typed</span>
          </label>
        </div>
        {error && <div className="adm-msg bad" role="alert">{error}</div>}
        <button className="adm-btn adm-btn-primary" type="submit" disabled={busy || !password || (withEmail && !email)}>
          {busy ? 'Logging in…' : 'Log in'}
        </button>
      </form>
    </div>
  );
}
