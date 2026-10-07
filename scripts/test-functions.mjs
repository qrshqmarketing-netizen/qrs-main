// Local tests for the Supabase Edge Function code (supabase/functions/_shared) with stand-ins for the network: npm run functions:test
import assert from 'node:assert/strict';
import { handleChat } from '../supabase/functions/_shared/chat.js';
import { makeDb } from '../supabase/functions/_shared/db.js';
import { handleLead } from '../supabase/functions/_shared/leadHandler.js';
import { autoReplyContent as shared } from '../supabase/functions/_shared/autoReply.js';
import { autoReplyContent as site } from '../lib/autoReply.js';

import { fetchUser, isAdminUser, makeAuthToken, readAuthToken, sessionKey, supabaseLogin } from '../lib/adminSession.js';

import { sniffImage, uploadName, publicUrl } from '../lib/imageUpload.js';
import { textToFaqs, faqsToText } from '../lib/articleFormat.js';

let passed = 0;
const test = async (name, fn) => {
  await fn();
  passed++;
  console.log('ok  ', name);
};

// A fake network: records every call and answers by URL
function world(overrides = {}) {
  const calls = [];
  const hits = new Map();
  const f = async (url, opts = {}) => {
    const u = String(url);
    const body = opts.body ? JSON.parse(opts.body) : null;
    calls.push({ url: u, body, method: opts.method });
    const ok = (data, status = 200) => new Response(JSON.stringify(data), { status });
    if (overrides[u.split('?')[0]]) return overrides[u.split('?')[0]](body, opts);
    if (u.includes('/rpc/rate_limited')) {
      const n = (hits.get(body.p_key) || 0) + 1;
      hits.set(body.p_key, n);
      return ok(n > body.p_max);
    }
    if (u.includes('/rpc/assistant_search')) return ok([{ path: '/roof-repair/', name: 'Roof Repair', block: '### Roof Repair (/roof-repair/)\nLeaks traced to the source.', rank: 0.5 }]);
    if (u.includes('assistant_config')) return ok([]);
    if (u.includes('/rest/v1/')) return new Response('', { status: 201 });
    if (u.includes('api.resend.com')) return ok({ id: 'x' });
    if (u.includes('generativelanguage')) return ok({ candidates: [{ content: { parts: [{ text: 'We repair leaks. [[LEAD]]{"name":"Jo","phone":"310 555 0100"}' }] } }] });
    return new Response('', { status: 404 });
  };
  return { f, calls, hits };
}
const env = {
  SUPABASE_URL: 'https://x.supabase.co',
  SUPABASE_SECRET_KEYS: '{"default":"sb_secret_test"}',
  RESEND_API_KEY: 're_test',
  LEADS_FROM_EMAIL: 'QRS <leads@example.com>',
  GEMINI_API_KEY: 'g',
  LEADS_SHEET_SECRET: 'sheetsecret',
};
const ctxFor = (w, e = env) => {
  const pending = [];
  return { env: e, fetch: w.f, db: makeDb(e, w.f), waitUntil: (p) => pending.push(p), settle: () => Promise.all(pending) };
};
const post = (body, headers = {}) => new Request('https://x.test/fn', { method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://qualityroofingspecialists.com', ...headers }, body: JSON.stringify(body) });
const goodLead = { name: 'Jo Smith', phone: '(310) 555-0100', email: 'jo@example.com', zip: '90210', service: 'Roof repair', utm: { source: 'website', campaign: 'el-nino-2026' } };

await test('confirmation email wording is identical to the website version', () => {
  for (const lead of [
    { source: 'estimate-form', name: 'Jo', email: 'a@b.co', service: 'Roof repair', message: '' },
    { source: 'estimate-form', name: 'Jo', email: 'a@b.co', service: 'Commercial or HOA roofing', message: 'URGENT: water', preferredDate: '2026-10-14', preferredTime: 'Morning' },
    { source: 'instant-quote', name: '<b>x</b>', email: 'a@b.co', service: 'Roof replacement' },
  ]) assert.deepEqual(shared(lead), site(lead));
});

await test('lead: saves a row, emails the team, confirms to the visitor', async () => {
  const w = world();
  const ctx = ctxFor(w);
  const res = await handleLead(post(goodLead), ctx);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
  await ctx.settle();
  const row = w.calls.find((c) => c.url.endsWith('/rest/v1/leads')).body;
  assert.equal(row.name, 'Jo Smith');
  assert.equal(row.phone_digits, '3105550100');
  assert.equal(row.utm_campaign, 'el-nino-2026');
  const mails = w.calls.filter((c) => c.url.includes('resend'));
  assert.equal(mails.length, 2);
  assert.ok(mails[0].body.subject.startsWith('New lead from the website (Estimate form)'));
  assert.deepEqual(mails[1].body.to, ['jo@example.com']);
});

await test('lead: a second request from the same email gets no second confirmation', async () => {
  const w = world();
  for (let i = 0; i < 2; i++) {
    const ctx = ctxFor(w);
    await handleLead(post(goodLead), ctx);
    await ctx.settle();
  }
  assert.equal(w.calls.filter((c) => c.url.includes('resend') && c.body.to[0] === 'jo@example.com').length, 1);
});

await test('lead: bad input is refused, honeypot is silent, sixth request in 10 minutes is limited', async () => {
  const w = world();
  assert.equal((await handleLead(post({ ...goodLead, phone: '123' }), ctxFor(w))).status, 400);
  assert.equal((await handleLead(post({ ...goodLead, email: 'nope' }), ctxFor(w))).status, 400);
  const bot = await handleLead(post({ ...goodLead, website: 'http://spam' }), ctxFor(w));
  assert.equal(bot.status, 200);
  assert.equal(w.calls.filter((c) => c.url.endsWith('/rest/v1/leads')).length, 0);
  let last;
  for (let i = 0; i < 7; i++) last = await handleLead(post({ ...goodLead, email: '' }), ctxFor(w));
  assert.equal(last.status, 429);
});

await test('lead: not delivered anywhere answers 502, and a failing channel does not stop the others', async () => {
  const w = world({ 'https://x.supabase.co/rest/v1/leads': () => new Response('boom', { status: 500 }) });
  const res = await handleLead(post({ ...goodLead, email: '' }), ctxFor(w));
  assert.equal(res.status, 200); // email still went out
  const none = world({ 'https://x.supabase.co/rest/v1/leads': () => new Response('boom', { status: 500 }), 'https://api.resend.com/emails': () => new Response('no', { status: 500 }) });
  assert.equal((await handleLead(post({ ...goodLead, email: '' }), ctxFor(none))).status, 502);
});

await test('lead: diagnostic header returns channel results and config check', async () => {
  const w = world();
  const res = await handleLead(post({ ...goodLead, email: '' }, { 'x-leads-diagnostic': 'sheetsecret' }), ctxFor(w));
  const data = await res.json();
  assert.equal(data.channels.database, 'sent');
  const cfg = await (await handleLead(post({ configCheck: true }, { 'x-leads-diagnostic': 'sheetsecret' }), ctxFor(w))).json();
  assert.equal(cfg.settings.database, true);
  assert.equal(cfg.settings.databaseKey, 'secret key');
  const plain = await handleLead(post({ configCheck: true }), ctxFor(w));
  assert.equal(plain.status, 400); // without the header it is just an invalid lead
});

await test('CORS: the live site is allowed, other sites are not', async () => {
  const ok = await handleLead(new Request('https://x.test/fn', { method: 'OPTIONS', headers: { origin: 'https://qualityroofingspecialists.com' } }), ctxFor(world()));
  assert.equal(ok.status, 204);
  assert.equal(ok.headers.get('access-control-allow-origin'), 'https://qualityroofingspecialists.com');
  const bad = await handleLead(new Request('https://x.test/fn', { method: 'OPTIONS', headers: { origin: 'https://evil.example' } }), ctxFor(world()));
  assert.notEqual(bad.headers.get('access-control-allow-origin'), 'https://evil.example');
  const preview = await handleLead(new Request('https://x.test/fn', { method: 'OPTIONS', headers: { origin: 'https://qrs-abc.vercel.app' } }), ctxFor(world(), { ...env, ALLOWED_ORIGINS: 'https://qrs-*.vercel.app' }));
  assert.equal(preview.headers.get('access-control-allow-origin'), 'https://qrs-abc.vercel.app');
});

await test('chat: answers from Gemini with page content, hides the lead marker, saves the lead and logs', async () => {
  const w = world();
  const ctx = ctxFor(w);
  const res = await handleChat(post({ messages: [{ role: 'user', content: 'Do you fix leaks? I\'m Jo, 310-555-0100' }] }), ctx);
  const data = await res.json();
  assert.equal(data.reply, 'We repair leaks.');
  assert.equal(data.leadSaved, true);
  await ctx.settle();
  const gemini = w.calls.find((c) => c.url.includes('generativelanguage')).body;
  assert.match(gemini.systemInstruction.parts[0].text, /Leaks traced to the source/);
  assert.match(gemini.systemInstruction.parts[0].text, /QRS Roof Assistant/);
  assert.ok(w.calls.some((c) => c.url.endsWith('/rest/v1/leads') && c.body.source === 'Roof Assistant chat'));
  const log = w.calls.find((c) => c.url.endsWith('/rest/v1/assistant_chats')).body;
  assert.equal(log.question.includes('leaks'), true);
  assert.deepEqual(log.pages, ['/roof-repair/']);
});

await test('chat: no contact details, no lead; model down answers an error the widget can fall back on', async () => {
  const down = world({ 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent': () => new Response('x', { status: 500 }) });
  const ctx = ctxFor(down);
  const res = await handleChat(post({ messages: [{ role: 'user', content: 'hello' }] }), ctx);
  assert.equal(res.status, 502);
  assert.equal((await res.json()).leadSaved, false);
  const none = await handleChat(post({ messages: [{ role: 'user', content: 'hi' }] }), ctxFor(world(), { ...env, GEMINI_API_KEY: '' }));
  assert.equal(none.status, 503);
  assert.equal((await handleChat(post({ messages: [] }), ctxFor(world()))).status, 400);
});

await test('chat: rate limit after 30 messages', async () => {
  const w = world();
  let last;
  for (let i = 0; i < 31; i++) last = await handleChat(post({ messages: [{ role: 'user', content: 'roof?' }] }), ctxFor(w));
  assert.equal(last.status, 429);
});

await test('chat: works without a database (built-in prompt, no search, no log)', async () => {
  const w = world();
  const e = { ...env, SUPABASE_URL: '', SUPABASE_SECRET_KEYS: '' };
  const res = await handleChat(post({ messages: [{ role: 'user', content: 'roof repair?' }] }), ctxFor(w, e));
  assert.equal(res.status, 200);
  assert.equal(w.calls.some((c) => c.url.includes('/rest/v1/')), false);
});

await test('dashboard session: signed, expiring, tamper-proof', () => {
  const key = sessionKey('sb_secret_a');
  const token = makeAuthToken(key, 'user-1');
  assert.equal(readAuthToken(key, token), 'user-1');
  assert.equal(readAuthToken(sessionKey('sb_secret_b'), token), '');
  assert.equal(readAuthToken(key, token.replace('user-1', 'user-2')), '');
  assert.equal(readAuthToken(key, makeAuthToken(key, 'user-1', 60, Date.now() - 120000)), '');
  assert.equal(readAuthToken(key, '123.456'), '');
  assert.equal(readAuthToken(key, undefined), '');
});

await test('dashboard login: only Supabase accounts marked admin get in', async () => {
  const admin = { id: 'u1', app_metadata: { role: 'admin' } };
  const f = (user, status = 200) => async () => new Response(JSON.stringify({ user }), { status });
  const base = { url: 'https://x.supabase.co', publishableKey: 'sb_publishable_x', email: 'a@b.co', password: 'pw' };
  assert.equal((await supabaseLogin({ ...base, fetchFn: f(admin) })).ok, true);
  assert.equal((await supabaseLogin({ ...base, fetchFn: f({ id: 'u2', app_metadata: {} }) })).status, 403);
  assert.equal((await supabaseLogin({ ...base, fetchFn: f({}, 400) })).status, 401);
  assert.equal((await supabaseLogin({ ...base, fetchFn: async () => { throw new Error('down'); } })).status, 502);
  assert.equal(isAdminUser({ ...admin, banned_until: new Date(Date.now() + 1e6).toISOString() }), false);
  assert.equal((await fetchUser({ url: 'u', secretKey: 'k', uid: 'x', fetchFn: async () => new Response('', { status: 404 }) })).id, '');
  assert.equal(await fetchUser({ url: 'u', secretKey: 'k', uid: 'x', fetchFn: async () => new Response('', { status: 500 }) }), null);
});

await test('uploads: pictures are recognised by their bytes and get new names', () => {
  const pad = (a) => new Uint8Array([...a, ...new Array(20).fill(0)]);
  assert.equal(sniffImage(pad([0xff, 0xd8, 0xff, 0xe0])).ext, 'jpg');
  assert.equal(sniffImage(pad([0x89, 0x50, 0x4e, 0x47])).ext, 'png');
  assert.equal(sniffImage(new Uint8Array([...'RIFF', 0, 0, 0, 0, ...'WEBPVP8 '].map((c) => (typeof c === 'string' ? c.charCodeAt(0) : c)))).ext, 'webp');
  assert.equal(sniffImage(new TextEncoder().encode('<svg onload=alert(1)></svg>   ')), null);
  assert.equal(sniffImage(new TextEncoder().encode('#!/bin/sh\nrm -rf /   ')), null);
  const a = uploadName('My Roof Leak (1).PNG', 'png');
  assert.match(a, /^my-roof-leak-1-[0-9a-f]{6}\.png$/);
  assert.notEqual(a, uploadName('My Roof Leak (1).PNG', 'png'));
  assert.equal(publicUrl('https://x.supabase.co', 'blog/a.webp'), 'https://x.supabase.co/storage/v1/object/public/site-images/blog/a.webp');
});

await test('home FAQ text round-trips through the Q:/A: format', () => {
  const faqs = [{ q: 'Is it free?', a: 'Yes, see [pricing](/roof-repair/).' }, { q: 'Second?', a: 'Two lines\nbecome one.' }];
  assert.deepEqual(textToFaqs(faqsToText(faqs)).map((f) => f.q), ['Is it free?', 'Second?']);
  assert.equal(textToFaqs(faqsToText(faqs))[1].a, 'Two lines become one.');
});

console.log(`\n${passed} tests passed`);
