'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from './api';

// The dashboard's site text page: the home page's FAQ as plain text (Q: question, A: answer, a blank line between), saved to the database.
export default function ContentEditor({ initial, saved, problem }) {
  const router = useRouter();
  const [text, setText] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  const run = async (body, done) => {
    setBusy(true);
    setMessage(null);
    const res = await adminApi('/api/admin/content', body);
    setBusy(false);
    if (res.ok) {
      setMessage({ kind: 'ok', text: done(res), list: res.warnings });
      router.refresh();
    } else if (res.status === 401) router.refresh();
    else setMessage({ kind: 'bad', text: res.error || 'That did not work.', list: res.problems });
  };

  return (
    <div className="adm-wrap">
      <div className="adm-bar">
        <h1>Home page FAQ</h1>
        <nav>
          <Link className="adm-btn" href="/admin">Back to the articles</Link>
          <a className="adm-btn" href="/#faq" target="_blank" rel="noopener">View on the site</a>
        </nav>
      </div>
      {message && (
        <div className={`adm-msg ${message.kind}`} role="status">
          {message.text}
          {message.list?.length > 0 && <ul>{message.list.map((p) => <li key={p}>{p}</li>)}</ul>}
        </div>
      )}
      {problem && <div className="adm-msg bad">{problem}</div>}
      {!problem && (
        <section className="adm-card">
          <p className="adm-help">
            The questions and answers on the home page. {saved ? 'This is the saved copy.' : 'Nothing is saved yet, so this is the copy from the site files; saving it makes the dashboard the one place to edit it.'} Write
            each one as <strong>Q:</strong> the question, then <strong>A:</strong> the answer, with a blank line between questions. An answer can have a [link](/roof-repair/) and **bold** words. The first
            question starts open.
          </p>
          <div className="adm-field">
            <label htmlFor="faqs">Questions and answers</label>
            <textarea id="faqs" className="mono" rows={24} value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <div className="adm-actions">
            <button className="adm-btn adm-btn-primary" type="button" disabled={busy || !text.trim()} onClick={() => run({ action: 'saveFaqs', text }, (r) => `Saved ${r.count} questions. The home page is updating.`)}>
              {busy ? 'Saving…' : 'Save'}
            </button>
            {saved && (
              <button className="adm-btn" type="button" disabled={busy} onClick={() => confirm('Go back to the copy in the site files?') && run({ action: 'resetFaqs' }, () => 'Back to the copy in the site files.')}>
                Go back to the site files' copy
              </button>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
