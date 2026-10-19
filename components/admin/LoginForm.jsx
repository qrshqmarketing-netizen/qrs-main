'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthCard from './AuthCard';
import { adminApi } from './api';

// The dashboard's login (lib/adminAuth.js): a personal account (email + password; `accounts`) or the shared team password (`teamPassword`).
// When both work, the account form shows first with a switch to the team password. `ready` is false until either is set up on the server.
export default function LoginForm({ ready, accounts = false, teamPassword = false }) {
  const router = useRouter();
  const [useTeam, setUseTeam] = useState(!accounts && teamPassword);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const res = await adminApi('/api/admin/login', useTeam ? { password } : { email, password });
    setBusy(false);
    if (res.ok) router.refresh();
    else setError(res.error || 'Could not log in.');
  };
  const switchTo = (team) => {
    setUseTeam(team);
    setError('');
    setPassword('');
  };

  return (
    <AuthCard title="Log in" text="Welcome back. Log in to the Quality Roofing Specialists team dashboard." tab="login" canRegister={accounts}>
      {!ready && (
        <div className="adm-msg warn">
          The dashboard isn't set up yet. In Vercel, connect Supabase (<strong>SUPABASE_URL</strong> and <strong>SUPABASE_SECRET_KEY</strong>) or add <strong>ADMIN_PASSWORD</strong> (at least 8 characters), then redeploy.
        </div>
      )}
      <form onSubmit={submit} noValidate>
        {!useTeam && (
          <div className="adm-field">
            <label htmlFor="adm-email">Email</label>
            <input id="adm-email" name="email" type="email" autoComplete="username" autoCapitalize="none" autoCorrect="off" spellCheck={false} value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
          </div>
        )}
        <div className="adm-field">
          <label htmlFor="adm-password">{useTeam ? 'Team password' : 'Password'}</label>
          {/* The team password uses "new-password" so the browser doesn't fill in an old saved password for this website */}
          <input id="adm-password" name={useTeam ? 'team-password' : 'password'} type={show ? 'text' : 'password'} autoComplete={useTeam ? 'new-password' : 'current-password'} autoCapitalize="none" autoCorrect="off" spellCheck={false} value={password} onChange={(e) => setPassword(e.target.value)} required autoFocus={useTeam} />
          <label className="adm-check">
            <input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} />
            <span>Show what I typed</span>
          </label>
        </div>
        {error && (
          <div className="adm-msg bad" role="alert">
            {error}
          </div>
        )}
        <button className="adm-btn adm-btn-primary adm-btn-block" type="submit" disabled={busy || !ready || !password || (!useTeam && !email)}>
          {busy ? 'Logging in…' : 'Log in'}
        </button>
      </form>
      {accounts && teamPassword && (
        <p className="adm-auth-alt">
          <button className="adm-link" type="button" onClick={() => switchTo(!useTeam)}>
            {useTeam ? 'Log in with your email instead' : 'Use the team password instead'}
          </button>
        </p>
      )}
      {accounts && (
        <p className="adm-auth-foot">
          New to the team? <Link href="/admin/register/">Create an account</Link>
        </p>
      )}
    </AuthCard>
  );
}
