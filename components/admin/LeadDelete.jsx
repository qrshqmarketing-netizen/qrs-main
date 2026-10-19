'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AdminIcon from './AdminIcons';
import { adminApi } from './api';

// The lead page's Delete button: asks first, deletes the row for good (app/api/admin/leads), then goes back to the list
export default function LeadDelete({ id, name }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const remove = async () => {
    if (!window.confirm(`Delete the lead from ${name}? This can’t be undone.`)) return;
    setBusy(true);
    const res = await adminApi('/api/admin/leads', { action: 'delete', id });
    setBusy(false);
    if (!res.ok) return window.alert(res.error || 'Could not delete.');
    router.push('/admin/leads/');
    router.refresh();
  };
  return (
    <button className="adm-btn adm-btn-danger" type="button" onClick={remove} disabled={busy}>
      <AdminIcon name="trash" /> {busy ? 'Deleting…' : 'Delete'}
    </button>
  );
}
