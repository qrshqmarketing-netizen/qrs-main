'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { LEAD_STATUSES } from '@/lib/leadStatuses';
import { adminApi } from './api';

// CSV lead import (owner, November 9 2026; /admin/leads/import/, server side importLeads in lib/adminLeads.js). The file is read in the browser
// (commas, semicolons or tabs; quoted fields with commas or line breaks; the BOM Excel adds), each column is mapped to a lead field (guessed
// from the column names, changeable), a status and a source are chosen for the whole file, a preview shows the first rows as they will be
// saved, and the rows go to the server 500 at a time. Duplicates (same email or phone as a lead already saved) are skipped unless unticked.

// The lead fields a column can go into. First and last name are joined into the name; city and state are added to the address.
const TARGETS = [
  ['', 'Don’t import'],
  ['name', 'Name'],
  ['first_name', 'First name'],
  ['last_name', 'Last name'],
  ['phone', 'Phone'],
  ['email', 'Email'],
  ['address', 'Address'],
  ['city', 'City (added to the address)'],
  ['state', 'State (added to the address)'],
  ['zip', 'ZIP'],
  ['service', 'Service'],
  ['roof_type', 'Roof type'],
  ['found_us', 'How they found us'],
  ['source', 'Source'],
  ['status', 'Status'],
  ['preferred_date', 'Preferred date (YYYY-MM-DD)'],
  ['message', 'Message'],
  ['notes', 'Notes'],
];
const GUESS = [
  ['first_name', /^(first|first ?name|given ?name|fname)$/],
  ['last_name', /^(last|last ?name|surname|family ?name|lname)$/],
  ['name', /^(name|full ?name|contact|contact ?name|customer|client|homeowner)$/],
  ['email', /e-?mail/],
  ['phone', /phone|mobile|cell|tel/],
  ['zip', /zip|postal/],
  ['city', /^city$/],
  ['state', /^(state|province)$/],
  ['address', /address|street/],
  ['service', /service|project|job ?type/],
  ['roof_type', /roof/],
  ['found_us', /found|referr|how.*hear/],
  ['source', /^(source|lead ?source|channel)$/],
  ['status', /status|stage/],
  ['preferred_date', /date/],
  ['notes', /note/],
  ['message', /message|comment|description|details/],
];
const guess = (header) => {
  const h = header.toLowerCase().trim().replace(/[_-]+/g, ' ');
  return GUESS.find(([, re]) => re.test(h))?.[0] || '';
};

// A small CSV reader: quoted fields ("a, b" and "say ""hi"""), line breaks inside quotes, and the delimiter guessed from the first line
function parseCsv(text) {
  const src = text.replace(/^﻿/, '');
  const first = src.split(/\r?\n/, 1)[0] || '';
  const delim = [',', ';', '\t'].map((d) => [d, first.split(d).length]).sort((a, b) => b[1] - a[1])[0][0];
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"' && src[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"' && field === '') quoted = true;
    else if (ch === delim) {
      row.push(field);
      field = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && src[i + 1] === '\n') i++;
      row.push(field);
      if (row.some((f) => f.trim())) rows.push(row);
      row = [];
      field = '';
    } else field += ch;
  }
  row.push(field);
  if (row.some((f) => f.trim())) rows.push(row);
  return rows;
}

const statusId = (v) => {
  const s = String(v || '').trim().toLowerCase();
  return LEAD_STATUSES.find((x) => x.id === s || x.label.toLowerCase() === s)?.id;
};

function mapRow(cells, mapping, rowNumber) {
  const out = { _row: rowNumber };
  const get = (field) => mapping.map((m, i) => (m === field ? String(cells[i] ?? '').trim() : '')).filter(Boolean);
  for (const [field] of TARGETS) {
    if (!field || ['first_name', 'last_name', 'city', 'state', 'status'].includes(field)) continue;
    const v = get(field).join(field === 'message' || field === 'notes' ? '\n' : ' ');
    if (v) out[field] = v;
  }
  const full = [get('first_name').join(' '), get('last_name').join(' ')].filter(Boolean).join(' ');
  if (!out.name && full) out.name = full;
  const place = [get('city').join(' '), get('state').join(' ')].filter(Boolean).join(', ');
  if (place) out.address = out.address ? `${out.address}, ${place}` : place;
  const st = statusId(get('status')[0]);
  if (st) out.status = st;
  return out;
}

export default function LeadImport() {
  const [fileName, setFileName] = useState('');
  const [rows, setRows] = useState([]); // [header, ...data]
  const [mapping, setMapping] = useState([]);
  const [status, setStatus] = useState('new');
  const [source, setSource] = useState('CSV import');
  const [skipDuplicates, setSkipDuplicates] = useState(true);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const header = rows[0] || [];
  const data = rows.slice(1);
  const preview = useMemo(() => data.slice(0, 5).map((cells, i) => mapRow(cells, mapping, i + 2)), [data, mapping]);
  const mappedAny = mapping.some(Boolean);

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    setResult(null);
    setError('');
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return setError('That file is over 5 MB. Split it into smaller files.');
    const parsed = parseCsv(await file.text());
    if (parsed.length < 2) return setError('That file has no rows under its header line.');
    if (parsed.length > 10001) return setError('That file has more than 10,000 rows. Split it into smaller files.');
    setFileName(file.name);
    setRows(parsed);
    setMapping(parsed[0].map(guess));
  };

  const run = async () => {
    setBusy(true);
    setError('');
    setResult(null);
    const all = data.map((cells, i) => mapRow(cells, mapping, i + 2));
    let added = 0;
    const skipped = [];
    for (let i = 0; i < all.length; i += 500) {
      setProgress(`Importing rows ${i + 1}–${Math.min(i + 500, all.length)} of ${all.length}…`);
      const res = await adminApi('/api/admin/leads', { action: 'import', rows: all.slice(i, i + 500), status, source, skipDuplicates });
      if (!res.ok) {
        setBusy(false);
        setProgress('');
        setResult({ added, skipped });
        return setError(`${res.error || 'The import stopped.'} ${added ? `${added} leads were added before it stopped.` : ''}`);
      }
      added += res.added || 0;
      skipped.push(...(res.skipped || []));
    }
    setBusy(false);
    setProgress('');
    setResult({ added, skipped });
  };

  return (
    <div className="adm-import">
      <section className="adm-card">
        <h2>1. Choose a CSV file</h2>
        <p className="adm-hint">The first line must be the column names. Export from Excel or Google Sheets as “CSV”. Up to 10,000 rows.</p>
        <div className="adm-field">
          <label htmlFor="imp-file">CSV file</label>
          <input id="imp-file" type="file" accept=".csv,text/csv,text/plain" onChange={onFile} />
        </div>
        {fileName && (
          <p className="adm-hint">
            {fileName}: {data.length} {data.length === 1 ? 'row' : 'rows'}, {header.length} columns.
          </p>
        )}
      </section>

      {header.length > 0 && (
        <section className="adm-card">
          <h2>2. Match the columns</h2>
          <p className="adm-hint">We guessed from the column names. Each lead needs at least a name, a phone or an email.</p>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Column in your file</th>
                  <th>Example</th>
                  <th>Goes into</th>
                </tr>
              </thead>
              <tbody>
                {header.map((h, i) => (
                  <tr key={`${h}-${i}`}>
                    <td>{h || <em>(no name)</em>}</td>
                    <td className="adm-imp-example">{String(data.find((r) => String(r[i] || '').trim())?.[i] || '').slice(0, 60)}</td>
                    <td>
                      <select aria-label={`Field for ${h}`} value={mapping[i] || ''} onChange={(e) => setMapping((m) => m.map((v, j) => (j === i ? e.target.value : v)))}>
                        {TARGETS.map(([v, l]) => (
                          <option key={v} value={v}>
                            {l}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {header.length > 0 && (
        <section className="adm-card">
          <h2>3. Settings</h2>
          <div className="adm-form-grid">
            <div className="adm-field">
              <label htmlFor="imp-status">Status for every row</label>
              <select id="imp-status" value={status} onChange={(e) => setStatus(e.target.value)}>
                {LEAD_STATUSES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
              <p className="adm-hint">A Status column in the file wins where it has a known status.</p>
            </div>
            <div className="adm-field">
              <label htmlFor="imp-source">Source for every row</label>
              <input id="imp-source" value={source} maxLength={80} onChange={(e) => setSource(e.target.value)} />
              <p className="adm-hint">A Source column in the file wins where it has a value.</p>
            </div>
          </div>
          <label className="adm-check">
            <input type="checkbox" checked={skipDuplicates} onChange={(e) => setSkipDuplicates(e.target.checked)} /> Skip people already in your leads (same email or phone)
          </label>
        </section>
      )}

      {mappedAny && (
        <section className="adm-card">
          <h2>4. Preview and import</h2>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Row</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Address / ZIP</th>
                  <th>Status</th>
                  <th>Other</th>
                </tr>
              </thead>
              <tbody>
                {preview.map((r) => (
                  <tr key={r._row}>
                    <td>{r._row}</td>
                    <td>{r.name}</td>
                    <td>{r.phone}</td>
                    <td>{r.email}</td>
                    <td>{[r.address, r.zip].filter(Boolean).join(' ')}</td>
                    <td>{LEAD_STATUSES.find((s) => s.id === (r.status || status))?.label}</td>
                    <td className="adm-imp-example">{[r.service, r.roof_type, r.source, r.message, r.notes].filter(Boolean).join(' · ').slice(0, 80)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="adm-form-actions">
            <button className="adm-btn adm-btn-primary" type="button" disabled={busy || !data.length} onClick={run}>
              {busy ? 'Importing…' : `Import ${data.length} ${data.length === 1 ? 'row' : 'rows'}`}
            </button>
            {progress && <span className="adm-hint">{progress}</span>}
          </div>
        </section>
      )}

      {error && <div className="adm-msg bad">{error}</div>}
      {result && (
        <div className={'adm-msg ' + (result.added ? 'ok' : 'warn')}>
          <strong>{result.added} {result.added === 1 ? 'lead' : 'leads'} added.</strong> {result.skipped.length ? `${result.skipped.length} skipped:` : ''}
          {result.skipped.length > 0 && (
            <ul>
              {result.skipped.slice(0, 25).map((s) => (
                <li key={`${s.row}-${s.reason}`}>
                  Row {s.row}: {s.reason}
                </li>
              ))}
              {result.skipped.length > 25 && <li>…and {result.skipped.length - 25} more.</li>}
            </ul>
          )}
          <p>
            <Link className="adm-link" href="/admin/leads/">
              Go to the leads
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
