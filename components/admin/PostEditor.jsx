'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkPost, formToPost, slugify } from '@/lib/articleFormat';
import { adminApi } from './api';

const FORMAT_HELP = `## A section heading

A paragraph. It can have [a link](/roof-repair/) and **bold** words.

### A subheading

> A highlighted note.

- A bullet
- Another bullet

1. A numbered step
2. The next step

- [ ] A checklist item

| Column A | Column B |
| --- | --- |
| A cell | Another cell |`;

function Field({ id, label, hint, children }) {
  return (
    <div className="adm-field">
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && <span className="adm-hint">{hint}</span>}
    </div>
  );
}

// The article editor (new, or an existing article). The body is plain text in the format listed under "How to write the body", turned into the
// structured article by lib/articleFormat.js. The panel at the bottom runs the site's content rules while you type.
export default function PostEditor({ initial, isNew }) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [keepDate, setKeepDate] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null); // { kind, text, list }

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setDirty(true);
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (key === 'title' && isNew && !slugTouched) next.slug = slugify(value);
      return next;
    });
  };

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (e) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const { post, stray } = useMemo(() => formToPost(form), [form]);
  const checks = useMemo(() => checkPost(post), [post]);
  const published = form.status === 'published';

  const save = async (status) => {
    setBusy(true);
    setMessage(null);
    const res = await adminApi('/api/admin/posts', { action: 'save', create: isNew, keepDate, form: { ...form, status, homeSlot: status === 'published' ? form.homeSlot : '' } });
    setBusy(false);
    if (res.ok) {
      setDirty(false);
      setForm((f) => ({ ...f, status, homeSlot: status === 'published' ? f.homeSlot : '' }));
      setMessage({ kind: 'ok', text: status === 'published' ? 'Saved and published. The site is updating.' : 'Saved as a draft.', list: res.warnings });
      if (isNew) router.replace(`/admin/posts/${res.slug}`);
      else router.refresh();
    } else if (res.status === 401) {
      setMessage({ kind: 'bad', text: 'Your session ended. Your text is still here: open /admin/ in a new tab, log in, then come back and save again.' });
    } else {
      setMessage({ kind: 'bad', text: res.error || 'That did not save.', list: res.problems });
    }
  };

  const remove = async () => {
    if (!window.confirm(`Delete "${form.title}" for good? It is removed from the site and can't be brought back.`)) return;
    setBusy(true);
    const res = await adminApi('/api/admin/posts', { action: 'delete', slug: form.slug });
    setBusy(false);
    if (res.ok) {
      setDirty(false);
      router.push('/admin');
      router.refresh();
    } else setMessage({ kind: 'bad', text: res.error || 'Could not delete.' });
  };

  const over = (value, max) => (value.length > max ? ' over' : '');

  return (
    <div className="adm-wrap">
      <div className="adm-bar">
        <h1>{isNew ? 'New article' : 'Edit article'}</h1>
        <nav>
          <Link className="adm-btn" href="/admin">All articles</Link>
          {!isNew && (published ? (
            <a className="adm-btn" href={`/blog/${form.slug}/`} target="_blank" rel="noopener">View on the site</a>
          ) : (
            <Link className="adm-btn" href={`/admin/preview/${form.slug}`} target="_blank">Preview the draft</Link>
          ))}
        </nav>
      </div>

      {message && (
        <div className={`adm-msg ${message.kind}`} role="status">
          {message.text}
          {message.list?.length > 0 && <ul>{message.list.map((p) => <li key={p}>{p}</li>)}</ul>}
        </div>
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        <section className="adm-card">
          <h2>The basics</h2>
          <Field id="title" label="Title (the page heading)">
            <input id="title" type="text" value={form.title} onChange={set('title')} />
          </Field>
          <div className="adm-grid two">
            <Field id="slug" label="Address (slug)" hint={isNew ? `The page will be /blog/${form.slug || '…'}/. It can't be changed after you save.` : 'Fixed once an article exists.'}>
              <input id="slug" type="text" value={form.slug} readOnly={!isNew} onChange={(e) => { setSlugTouched(true); set('slug')(e); }} />
            </Field>
            <Field id="keyword" label="Keyword" hint="The search this article is for. It has to appear in the title, meta title, meta description and the first 100 words.">
              <input id="keyword" type="text" value={form.keyword} onChange={set('keyword')} />
            </Field>
          </div>
          <div className="adm-grid two">
            <Field id="datePublished" label="Published date">
              <input id="datePublished" type="date" value={form.datePublished} onChange={set('datePublished')} />
            </Field>
            <Field id="homeSlot" label="Home page spot" hint={published ? 'Pick a spot to feature this article on the home page. Another article holding the spot loses it.' : 'Publish the article first to feature it.'}>
              <select id="homeSlot" value={form.homeSlot} onChange={set('homeSlot')} disabled={!published}>
                <option value="">Not featured</option>
                <option value="1">Spot 1</option>
                <option value="2">Spot 2</option>
                <option value="3">Spot 3</option>
              </select>
            </Field>
          </div>
        </section>

        <section className="adm-card">
          <h2>How it shows in Google</h2>
          <Field id="metaTitle" label="Meta title" hint={<span className={`adm-count${over(form.metaTitle, 60)}`}>{form.metaTitle.length} of about 60 characters</span>}>
            <input id="metaTitle" type="text" value={form.metaTitle} onChange={set('metaTitle')} />
          </Field>
          <Field id="metaDescription" label="Meta description" hint={<span className={`adm-count${over(form.metaDescription, 160)}`}>{form.metaDescription.length} of 160 characters</span>}>
            <textarea id="metaDescription" rows={3} value={form.metaDescription} onChange={set('metaDescription')} />
          </Field>
          <div className="adm-grid two">
            <Field id="topics" label="Topics" hint="Separated by commas, like: leak, repair, tile. They decide which pages show this as a related article.">
              <input id="topics" type="text" value={form.topics} onChange={set('topics')} />
            </Field>
            <Field id="related" label="Related service pages" hint="One address per line, like /roof-repair/. Shown under the article.">
              <textarea id="related" rows={3} value={form.related} onChange={set('related')} />
            </Field>
          </div>
        </section>

        <section className="adm-card">
          <h2>Card and picture</h2>
          <Field id="excerpt" label="Excerpt (the text on the article card)">
            <textarea id="excerpt" rows={3} value={form.excerpt} onChange={set('excerpt')} />
          </Field>
          <div className="adm-grid two">
            <Field id="image" label="Image" hint="The picture's address on the site, like /images/blog/roof-leak-source.webp. A picture that replaces a live one needs a new file name.">
              <input id="image" type="text" value={form.image} onChange={set('image')} />
              {form.image.startsWith('/images/') && <img className="adm-thumb" src={form.image} alt="" />}
            </Field>
            <Field id="imageAlt" label="Image description (alt text)">
              <textarea id="imageAlt" rows={3} value={form.imageAlt} onChange={set('imageAlt')} />
            </Field>
          </div>
          <Field id="cardImage" label="Stand-in card picture (optional)" hint="Only for the cards, until the article has its own image.">
            <input id="cardImage" type="text" value={form.cardImage} onChange={set('cardImage')} />
          </Field>
        </section>

        <section className="adm-card">
          <h2>The article</h2>
          <Field id="intro" label="Intro" hint="Paragraphs above the table of contents, with a blank line between them.">
            <textarea id="intro" rows={7} value={form.intro} onChange={set('intro')} />
          </Field>
          <details className="adm-details">
            <summary>How to write the body</summary>
            <pre>{FORMAT_HELP}</pre>
          </details>
          <Field id="body" label="Body" hint="Each section starts with a ## heading line. Each section becomes an entry in the table of contents.">
            <textarea id="body" className="mono" value={form.body} onChange={set('body')} spellCheck />
          </Field>
          <Field id="faqs" label="Frequently asked questions" hint="Q: the question, then A: the answer on the next line. A blank line between questions.">
            <textarea id="faqs" className="mono" rows={10} value={form.faqs} onChange={set('faqs')} />
          </Field>
          <div className="adm-grid two">
            <Field id="closingHeading" label="Closing section heading">
              <input id="closingHeading" type="text" value={form.closingHeading} onChange={set('closingHeading')} />
            </Field>
            <div />
          </div>
          <Field id="closingBody" label="Closing section">
            <textarea id="closingBody" className="mono" rows={9} value={form.closingBody} onChange={set('closingBody')} />
          </Field>
        </section>

        <section className="adm-card">
          <h2>More</h2>
          <div className="adm-grid two">
            <Field id="heroImage" label="Hero image (optional)">
              <input id="heroImage" type="text" value={form.heroImage} onChange={set('heroImage')} />
            </Field>
            <Field id="author" label="Author (optional)" hint="Leave empty to show the company as the author.">
              <input id="author" type="text" value={form.author} onChange={set('author')} />
            </Field>
          </div>
          <label className="adm-check">
            <input type="checkbox" checked={form.noindex} onChange={set('noindex')} />
            <span>Keep this article out of search results and the sitemap (it is still listed on the blog page).</span>
          </label>
          {!isNew && published && (
            <label className="adm-check">
              <input type="checkbox" checked={keepDate} onChange={(e) => setKeepDate(e.target.checked)} />
              <span>This is a small fix: don't change the article's "Updated" date.</span>
            </label>
          )}
        </section>

        <section className="adm-card adm-checks" aria-live="polite">
          <h2>Checks</h2>
          {stray && <p className="bad">There is text above the first "## Heading" in the body. It can't be shown: move it into the intro or under a heading.</p>}
          {checks.problems.length > 0 && (
            <>
              <h3>Fix before saving</h3>
              <ul className="bad">{checks.problems.map((p) => <li key={p}>{p}</li>)}</ul>
            </>
          )}
          <h3>Keyword rule (needed to publish)</h3>
          {form.keyword ? (
            checks.seo.length ? <ul className="bad">{checks.seo.map((p) => <li key={p}>{p}</li>)}</ul> : <p className="good">The keyword is in the title, meta title, meta description and the first 100 words.</p>
          ) : (
            <p>Add the keyword to check it.</p>
          )}
          {checks.warnings.length > 0 && (
            <>
              <h3>Worth a look</h3>
              <ul>{checks.warnings.map((p) => <li key={p}>{p}</li>)}</ul>
            </>
          )}
        </section>

        <div className="adm-actions">
          {published ? (
            <>
              <button className="adm-btn adm-btn-primary" type="button" disabled={busy} onClick={() => save('published')}>{busy ? 'Saving…' : 'Save changes'}</button>
              <button className="adm-btn" type="button" disabled={busy} onClick={() => save('draft')}>Unpublish (save as a draft)</button>
            </>
          ) : (
            <>
              <button className="adm-btn" type="button" disabled={busy} onClick={() => save('draft')}>{busy ? 'Saving…' : 'Save draft'}</button>
              <button className="adm-btn adm-btn-primary" type="button" disabled={busy} onClick={() => save('published')}>Save and publish</button>
            </>
          )}
          {!isNew && <button className="adm-btn adm-btn-danger" type="button" disabled={busy} onClick={remove}>Delete</button>}
          {dirty && <span className="adm-hint">You have unsaved changes.</span>}
        </div>
      </form>
    </div>
  );
}
