'use client';

import Link from 'next/link';
import { useState } from 'react';
import AuthCard from './AuthCard';
import { adminApi } from './api';

// Asking for a dashboard account (app/api/admin/register): name, email and a password of `min` characters or more. The account then waits for
// an admin to approve it on the Team page; the answer is the same whether or not the email already had an account.
export default function RegisterForm({ ready, min = 10 }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const res = await adminApi('/api/admin/register', { name, email, password });
    setBusy(false);
    if (res.ok) {
      setDone(res.message);
      setPassword('');
    } else setError(res.error || 'Could not send the request.');
  };

  return (
    <AuthCard title="Create an account" text="Ask for access to the team dashboard. An admin approves every new account." tab="register" canRegister>
      {!ready && <div className="adm-msg warn">Accounts aren't set up yet: the site needs its Supabase settings in Vercel.</div>}
      {done ? (
        <div className="adm-done" role="status">
          <span className="adm-done-mark" aria-hidden="true">✓</span>
          <p>{done}</p>
          <Link className="adm-btn adm-btn-block" href="/admin/">
            Back to log in
          </Link>
        </div>
      ) : (
        <form onSubmit={submit} noValidate>
          <div className="adm-field">
            <label htmlFor="adm-name">Your name</label>
            <input id="adm-name" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required autoFocus maxLength={80} />
          </div>
          <div className="adm-field">
            <label htmlFor="adm-email">Work email</label>
            <input id="adm-email" name="email" type="email" autoComplete="email" autoCapitalize="none" autoCorrect="off" spellCheck={false} value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="adm-field">
            <label htmlFor="adm-password">Password</label>
            <input id="adm-password" name="new-password" type={show ? 'text' : 'password'} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={min} aria-describedby="adm-password-hint" />
            <p className="adm-hint" id="adm-password-hint">
              At least {min} characters.
            </p>
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
          <button className="adm-btn adm-btn-primary adm-btn-block" type="submit" disabled={busy || !ready || !name || !email || password.length < min}>
            {busy ? 'Sending…' : 'Request access'}
          </button>
        </form>
      )}
      <p className="adm-auth-foot">
        Already have an account? <Link href="/admin/">Log in</Link>
      </p>
    </AuthCard>
  );
}
