'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import AdminIcon from './AdminIcons';
import { adminApi } from './api';

// The Users page (/admin/users/, app/api/admin/users): requests waiting for approval at the top (Approve / Decline), then every account in a
// table (name and email, access, last login, added) with Edit and Delete, a search box, and "New user". Adding and editing open the same form in
// a dialog: name, email, access (Admin: can use the dashboard; No access: the account exists but can't log in) and a password (required for a
// new user; when editing, a blank password keeps the old one). Delete asks first. Your own row can't be deleted or lose its access.
const day = (iso) => (iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'America/Los_Angeles' }) : '–');
const ROLE_LABEL = { admin: 'Admin', pending: 'No access', '': 'No access' };

export default function UsersManager({ users, me, minPassword = 10, openNew = false }) {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [editing, setEditing] = useState(openNew ? {} : null); // null: closed; {}: new user; a user: edit
  const [busy, setBusy] = useState('');
  const [message, setMessage] = useState(null);
  const pending = users.filter((u) => u.role === 'pending' && !u.lastSignIn);
  const list = useMemo(() => {
    const words = q.trim().toLowerCase();
    return users.filter((u) => !words || `${u.name} ${u.email}`.toLowerCase().includes(words));
  }, [users, q]);
  const admins = users.filter((u) => u.role === 'admin').length;

  const run = async (body, done) => {
    setBusy(`${body.action}:${body.id || ''}`);
    setMessage(null);
    const res = await adminApi('/api/admin/users', body);
    setBusy('');
    if (!res.ok) {
      setMessage({ kind: 'bad', text: res.error || 'Could not save.' });
      return false;
    }
    setMessage({ kind: 'ok', text: done });
    router.refresh();
    return true;
  };
  const label = (u) => u.name || u.email;
  const remove = (u) => window.confirm(`Delete the account of ${label(u)}? They will no longer be able to log in.`) && run({ action: 'delete', id: u.id }, `The account of ${label(u)} was deleted.`);

  return (
    <>
      <div className="adm-toolbar">
        <div className="adm-search adm-search-inline">
          <AdminIcon name="search" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search users" aria-label="Search users" />
        </div>
        <button className="adm-btn adm-btn-primary" type="button" onClick={() => setEditing({})}>
          <AdminIcon name="plus" /> New user
        </button>
      </div>

      {message && (
        <div className={`adm-msg ${message.kind}`} role="status">
          {message.text}
        </div>
      )}

      {pending.length > 0 && (
        <section className="adm-card">
          <h2>
            Waiting for approval <span className="adm-num">{pending.length}</span>
          </h2>
          <ul className="adm-people">
            {pending.map((u) => (
              <li className="adm-person" key={u.id}>
                <span className="adm-avatar" aria-hidden="true">{label(u).slice(0, 1).toUpperCase()}</span>
                <span className="adm-person-text">
                  <b>{u.name || u.email.split('@')[0]}</b>
                  <small>{u.email}</small>
                </span>
                <span className="adm-person-meta">Asked {day(u.createdAt)}</span>
                <span className="adm-person-actions">
                  <button className="adm-btn adm-btn-primary" type="button" disabled={Boolean(busy)} onClick={() => run({ action: 'approve', id: u.id }, `${label(u)} can now log in.`)}>
                    Approve
                  </button>
                  <button className="adm-btn adm-btn-danger" type="button" disabled={Boolean(busy)} onClick={() => remove(u)}>
                    Decline
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="adm-table-wrap" aria-label="All users">
        <table className="adm-leads adm-users">
          <thead>
            <tr>
              <th scope="col">User</th>
              <th scope="col">Access</th>
              <th scope="col">Last login</th>
              <th scope="col">Added</th>
              <th scope="col">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((u) => (
              <tr key={u.id}>
                <td data-label="User">
                  <span className="adm-user-cell">
                    <span className="adm-avatar" aria-hidden="true">{label(u).slice(0, 1).toUpperCase()}</span>
                    <span>
                      <b>
                        {u.name || u.email.split('@')[0]}
                        {u.id === me && <em> (you)</em>}
                      </b>
                      <small>{u.email}</small>
                    </span>
                  </span>
                </td>
                <td data-label="Access">
                  <span className={`adm-role r-${u.role || 'none'}`}>{ROLE_LABEL[u.role] || 'No access'}</span>
                </td>
                <td data-label="Last login">{u.lastSignIn ? day(u.lastSignIn) : 'Never'}</td>
                <td data-label="Added">{day(u.createdAt)}</td>
                <td className="adm-row-actions">
                  <button className="adm-icon-btn" type="button" onClick={() => setEditing(u)} aria-label={`Edit ${label(u)}`} title="Edit">
                    <AdminIcon name="edit" />
                  </button>
                  {u.id !== me && (
                    <button className="adm-icon-btn adm-danger" type="button" disabled={Boolean(busy)} onClick={() => remove(u)} aria-label={`Delete ${label(u)}`} title="Delete">
                      <AdminIcon name="trash" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && (
          <div className="adm-tile adm-empty">
            <p>{users.length ? 'No users match the search.' : 'No accounts yet. Add the first one with New user.'}</p>
          </div>
        )}
      </section>
      <p className="adm-note adm-users-foot">
        {users.length} account{users.length === 1 ? '' : 's'}, {admins} with dashboard access. People can also ask for an account at /admin/register/.
      </p>

      {editing && (
        <UserDialog
          user={editing.id ? editing : null}
          me={me}
          minPassword={minPassword}
          busy={Boolean(busy)}
          onClose={() => setEditing(null)}
          onSave={async (fields) => {
            const ok = editing.id
              ? await run({ action: 'update', id: editing.id, user: fields }, `${fields.name || label(editing)} was saved.`)
              : await run({ action: 'create', user: fields }, `${fields.name} was added.`);
            if (ok) setEditing(null);
            return ok;
          }}
        />
      )}
    </>
  );
}

// The add / edit form, in a native dialog (Escape and the backdrop close it; focus stays inside while it is open)
function UserDialog({ user, me, minPassword, busy, onClose, onSave }) {
  const ref = useRef(null);
  const editing = Boolean(user);
  const self = editing && user.id === me;
  const [f, setF] = useState({ name: user?.name || '', email: user?.email || '', role: user?.role === 'admin' || !editing ? 'admin' : 'pending', password: '' });
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));

  useEffect(() => {
    const d = ref.current;
    d?.showModal();
    const onCancel = (e) => {
      e.preventDefault();
      onClose();
    };
    d?.addEventListener('cancel', onCancel);
    return () => d?.removeEventListener('cancel', onCancel);
  }, [onClose]);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (f.name.trim().length < 2) return setError('Type a name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) return setError('Type a valid email address.');
    if ((!editing || f.password) && f.password.length < minPassword) return setError(`Use a password of at least ${minPassword} characters.`);
    const fields = { name: f.name.trim(), email: f.email.trim(), role: f.role };
    if (f.password) fields.password = f.password;
    if (editing) {
      if (fields.name === user.name) delete fields.name;
      if (fields.email === user.email) delete fields.email;
      if (fields.role === (user.role || 'pending')) delete fields.role;
      if (!Object.keys(fields).length) return onClose();
    }
    await onSave(fields);
  };

  return (
    <dialog className="adm-dialog" ref={ref} onClick={(e) => e.target === ref.current && onClose()} aria-labelledby="adm-user-title">
      <form className="adm-dialog-card" onSubmit={submit} noValidate>
        <div className="adm-dialog-head">
          <h2 id="adm-user-title">{editing ? `Edit ${user.name || user.email}` : 'New user'}</h2>
          <button className="adm-icon-btn" type="button" onClick={onClose} aria-label="Close">
            <AdminIcon name="plus" className="adm-ico adm-x" />
          </button>
        </div>
        <div className="adm-field">
          <label htmlFor="uf-name">Name</label>
          <input id="uf-name" value={f.name} onChange={set('name')} autoComplete="off" maxLength={80} autoFocus />
        </div>
        <div className="adm-field">
          <label htmlFor="uf-email">Email</label>
          <input id="uf-email" type="email" value={f.email} onChange={set('email')} autoComplete="off" autoCapitalize="none" spellCheck={false} maxLength={200} />
        </div>
        <fieldset className="adm-choices" disabled={self}>
          <legend>Access</legend>
          {[
            ['admin', 'Admin', 'Can use the dashboard'],
            ['pending', 'No access', 'Account kept, can’t log in'],
          ].map(([id, name, hint]) => (
            <label key={id} className={'adm-choice adm-choice-wide' + (f.role === id ? ' on' : '')}>
              <input type="radio" name="role" value={id} checked={f.role === id} onChange={set('role')} />
              <span>
                <b>{name}</b> <small>{hint}</small>
              </span>
            </label>
          ))}
          {self && <p className="adm-hint">You can’t change your own access.</p>}
        </fieldset>
        <div className="adm-field">
          <label htmlFor="uf-pass">{editing ? 'New password' : 'Password'}</label>
          <input id="uf-pass" type={show ? 'text' : 'password'} value={f.password} onChange={set('password')} autoComplete="new-password" placeholder={editing ? 'Leave blank to keep the current one' : ''} />
          <p className="adm-hint">At least {minPassword} characters. Share it with the person privately; they can log in right away.</p>
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
        <div className="adm-form-actions">
          <button className="adm-btn adm-btn-primary" type="submit" disabled={busy}>
            {busy ? 'Saving…' : editing ? 'Save changes' : 'Add user'}
          </button>
          <button className="adm-btn" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
}
