'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LEAD_STATUSES } from '@/lib/leadStatuses';
import AdminIcon from './AdminIcons';
import LeadCard, { when } from './LeadCard';
import { adminApi } from './api';

// The Leads page's working area (/admin/leads/): three views of the same leads, chosen at the top and kept in the address (?view=):
//   Cards   the AdFlux cards (LeadCard)
//   List    a table: name, status (change it in place), source, service, received, contact, edit and delete
//   Kanban  a column per status; drag a card to another column to move it (its status menu does the same without a mouse)
// Filters (search, source, service, received from/to, newest or oldest first, and status outside the Kanban) are in the address too, so a
// filtered view can be bookmarked or shared with the team. Changes save at once (app/api/admin/leads) and show before the server answers;
// a failed save puts the lead back and says why.
const VIEWS = [
  { id: 'cards', label: 'Cards', icon: 'cards' },
  { id: 'list', label: 'List', icon: 'list' },
  { id: 'kanban', label: 'Kanban', icon: 'kanban' },
];

export default function LeadsWorkspace({ leads: initial, view, filters, facets, counts }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [leads, setLeads] = useState(initial);
  const [message, setMessage] = useState(null);
  const [dragging, setDragging] = useState('');
  const [over, setOver] = useState('');
  const [q, setQ] = useState(filters.q);
  useEffect(() => setLeads(initial), [initial]);
  useEffect(() => setQ(filters.q), [filters.q]);

  // Change one or more filters in the address (an empty value removes it)
  const go = (changes) => {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(changes)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    const s = next.toString();
    router.replace(s ? `${pathname}?${s}` : pathname, { scroll: false });
  };
  const anyFilter = Boolean(filters.q || filters.source || filters.service || filters.from || filters.to || filters.status);

  const setStatus = async (lead, status) => {
    if (lead.status === status) return;
    const before = lead.status;
    setLeads((all) => all.map((l) => (l.id === lead.id ? { ...l, status } : l)));
    setMessage(null);
    const res = await adminApi('/api/admin/leads', { id: lead.id, status });
    if (!res.ok) {
      setLeads((all) => all.map((l) => (l.id === lead.id ? { ...l, status: before } : l)));
      setMessage({ kind: 'bad', text: res.error || 'Could not save.' });
    } else router.refresh();
  };
  const remove = async (lead) => {
    if (!window.confirm(`Delete the lead from ${lead.name || lead.phone || lead.email || 'this person'}? This can’t be undone.`)) return;
    const res = await adminApi('/api/admin/leads', { action: 'delete', id: lead.id });
    if (!res.ok) return setMessage({ kind: 'bad', text: res.error || 'Could not delete.' });
    setLeads((all) => all.filter((l) => l.id !== lead.id));
    setMessage({ kind: 'ok', text: 'The lead was deleted.' });
    router.refresh();
  };

  const statusMenu = (lead, label) => (
    <select className="adm-status-select" value={lead.status || 'new'} onChange={(e) => setStatus(lead, e.target.value)} aria-label={label || `Status of ${lead.name || 'this lead'}`}>
      {LEAD_STATUSES.map((s) => (
        <option key={s.id} value={s.id}>
          {s.label}
        </option>
      ))}
    </select>
  );

  return (
    <>
      <div className="adm-toolbar">
        <nav className="adm-segments adm-views" aria-label="View">
          {VIEWS.map((v) => (
            <button key={v.id} type="button" className={view === v.id ? 'on' : ''} aria-pressed={view === v.id} onClick={() => go({ view: v.id === 'cards' ? '' : v.id })}>
              <AdminIcon name={v.icon} /> {v.label}
            </button>
          ))}
        </nav>
        {view !== 'kanban' && (
          <nav className="adm-segments" aria-label="Lead status">
            {[{ id: '', label: 'All', count: counts?.total }, ...LEAD_STATUSES.map((s) => ({ ...s, count: counts?.counts[s.id] }))].map((t) => (
              <button key={t.id || 'all'} type="button" className={filters.status === t.id ? 'on' : ''} aria-pressed={filters.status === t.id} onClick={() => go({ status: t.id })}>
                {t.label}
                {t.count !== undefined && <span>{t.count}</span>}
              </button>
            ))}
          </nav>
        )}
      </div>

      <form
        className="adm-filters"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          go({ q: q.trim() });
        }}
      >
        <div className="adm-search adm-filter-search">
          <AdminIcon name="search" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} onBlur={() => q.trim() !== filters.q && go({ q: q.trim() })} placeholder="Search name, phone, email, ZIP" aria-label="Search leads" />
        </div>
        <label className="adm-filter">
          <span>Source</span>
          <select value={filters.source} onChange={(e) => go({ source: e.target.value })}>
            <option value="">All sources</option>
            {facets.sources.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="adm-filter">
          <span>Service</span>
          <select value={filters.service} onChange={(e) => go({ service: e.target.value })}>
            <option value="">All services</option>
            {facets.services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="adm-filter">
          <span>From</span>
          <input type="date" value={filters.from} max={filters.to || undefined} onChange={(e) => go({ from: e.target.value })} />
        </label>
        <label className="adm-filter">
          <span>To</span>
          <input type="date" value={filters.to} min={filters.from || undefined} onChange={(e) => go({ to: e.target.value })} />
        </label>
        <label className="adm-filter">
          <span>Order</span>
          <select value={filters.sort} onChange={(e) => go({ sort: e.target.value === 'asc' ? 'asc' : '' })}>
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </label>
        {anyFilter && (
          <button className="adm-link adm-filter-clear" type="button" onClick={() => go({ q: '', source: '', service: '', from: '', to: '', status: '' })}>
            Clear filters
          </button>
        )}
      </form>

      {message && (
        <div className={`adm-msg ${message.kind}`} role="status">
          {message.text}
        </div>
      )}
      <p className="adm-note">
        {leads.length} lead{leads.length === 1 ? '' : 's'}
        {anyFilter ? ' match the filters' : ''}.
      </p>

      {view === 'cards' && (
        <div className="adm-cards">
          {leads.map((lead) => (
            <LeadCard lead={lead} key={lead.id} />
          ))}
          {leads.length === 0 && <Empty />}
        </div>
      )}

      {view === 'list' && (
        <div className="adm-table-wrap">
          <table className="adm-leads">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
                <th scope="col">Source</th>
                <th scope="col">Service</th>
                <th scope="col">Received</th>
                <th scope="col">Contact</th>
                <th scope="col">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td data-label="Name">
                    <Link className="adm-lead-name" href={`/admin/leads/${lead.id}/`}>
                      {lead.name || lead.phone || lead.email || 'No name given'}
                    </Link>
                    {lead.zip && <small>ZIP {lead.zip}</small>}
                  </td>
                  <td data-label="Status">
                    <span className={`adm-status-pick s-${lead.status || 'new'}`}>{statusMenu(lead)}</span>
                  </td>
                  <td data-label="Source">{lead.source || '–'}</td>
                  <td data-label="Service">{lead.service || '–'}</td>
                  <td data-label="Received" suppressHydrationWarning>
                    {when(lead.created_at)}
                  </td>
                  <td data-label="Contact">
                    {lead.phone && <a href={`tel:${lead.phone.replace(/[^\d+]/g, '')}`}>{lead.phone}</a>}
                    {lead.email && <a href={`mailto:${lead.email}`}>{lead.email}</a>}
                  </td>
                  <td className="adm-row-actions">
                    <Link className="adm-icon-btn" href={`/admin/leads/${lead.id}/edit/`} aria-label={`Edit ${lead.name || 'lead'}`} title="Edit">
                      <AdminIcon name="edit" />
                    </Link>
                    <button className="adm-icon-btn adm-danger" type="button" onClick={() => remove(lead)} aria-label={`Delete ${lead.name || 'lead'}`} title="Delete">
                      <AdminIcon name="trash" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {leads.length === 0 && <Empty />}
        </div>
      )}

      {view === 'kanban' && (
        <div className="adm-board" aria-label="Leads by status">
          {LEAD_STATUSES.map((col) => {
            const items = leads.filter((l) => (l.status || 'new') === col.id);
            return (
              <section
                key={col.id}
                className={'adm-col' + (over === col.id ? ' is-over' : '')}
                aria-label={`${col.label}, ${items.length}`}
                onDragOver={(e) => {
                  if (!dragging) return;
                  e.preventDefault();
                  setOver(col.id);
                }}
                onDragLeave={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) setOver('');
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const lead = leads.find((l) => l.id === dragging);
                  setOver('');
                  setDragging('');
                  if (lead) setStatus(lead, col.id);
                }}
              >
                <h2 className={`adm-col-head s-${col.id}`}>
                  <span className="adm-status">{col.label}</span>
                  <span className="adm-num">{items.length}</span>
                </h2>
                <ul className="adm-col-list">
                  {items.map((lead) => (
                    <li
                      key={lead.id}
                      className={'adm-kcard' + (dragging === lead.id ? ' is-dragging' : '')}
                      draggable
                      onDragStart={(e) => {
                        setDragging(lead.id);
                        e.dataTransfer.effectAllowed = 'move';
                        e.dataTransfer.setData('text/plain', lead.id);
                      }}
                      onDragEnd={() => {
                        setDragging('');
                        setOver('');
                      }}
                    >
                      <div className="adm-kcard-top">
                        <Link href={`/admin/leads/${lead.id}/`} draggable={false}>
                          {lead.name || lead.phone || lead.email || 'No name given'}
                        </Link>
                        <AdminIcon name="grip" className="adm-ico adm-grip" />
                      </div>
                      <div className="adm-pills">
                        {lead.source && <span className="adm-pill">{lead.source}</span>}
                        {lead.service && <span className="adm-pill">{lead.service}</span>}
                      </div>
                      {lead.message && <p className="adm-kcard-text">{lead.message}</p>}
                      <div className="adm-kcard-foot">
                        <span className="adm-tile-when" suppressHydrationWarning>
                          <AdminIcon name="clock" /> {when(lead.created_at)}
                        </span>
                        {statusMenu(lead, `Move ${lead.name || 'this lead'} to`)}
                      </div>
                    </li>
                  ))}
                  {items.length === 0 && <li className="adm-col-empty">Drop a lead here</li>}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </>
  );
}

function Empty() {
  return (
    <div className="adm-tile adm-empty">
      <p>No leads here.</p>
    </div>
  );
}

