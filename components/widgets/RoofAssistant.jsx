'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, CloseIcon, RefreshIcon } from '@/components/ui/icons';
import { ANSWERS, CHAT_ENDPOINT, CHAT_MAX_CHARS, SITE_CHAT_ENDPOINT, CHIP_PROMPTS, CONTACT_ANSWERS, CONTACT_RE, FALLBACK_ANSWER, GREETING, STARTERS } from '@/data/assistant';
import { PHONE, TEL } from '@/data/site';
import { currentAttribution } from '@/lib/attribution';
import { ASSISTANT_EVENT, ASSISTANT_STATE_EVENT } from '@/lib/events';
import { session } from '@/lib/storage';
import './RoofAssistant.css';

const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// Built-in answers (used when no AI endpoint is set, or it fails). `saved`: the backend has this chat's contact details.
function localReply(text, saved) {
  if (CONTACT_RE.test(text)) return { html: saved ? CONTACT_ANSWERS.saved : CONTACT_ANSWERS.notSaved, chips: [] };
  const t = text.toLowerCase();
  const hit = ANSWERS.find((entry) => entry.match.test(t));
  if (hit) return { html: hit.answer, chips: hit.chips === null ? STARTERS : hit.chips };
  return { html: FALLBACK_ANSWER, chips: STARTERS };
}

let nextId = 0;

// QRS Roof Assistant: the chat panel (answers and settings in data/assistant.js). Since October 2026 there is no floating bubble or teaser: the
// header's chat button opens and closes it (ASSISTANT_EVENT, lib/events.js), and it reports open/closed back (ASSISTANT_STATE_EVENT). Phones get a
// bottom sheet, wider screens a panel under the header at the right.
export default function RoofAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]); // { id, role: 'bot' | 'me', html }
  const [chips, setChips] = useState([]);
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState('');

  const openRef = useRef(false);
  const busy = useRef(false);
  const started = useRef(false);
  const history = useRef([]);
  const leadSaved = useRef(false); // set once the backend saved this chat's contact details, so it saves one lead per chat
  const logRef = useRef(null);
  const inputRef = useRef(null);
  const formRef = useRef(null);
  const openerRef = useRef(null); // the header button that opened the chat (focus goes back to it)
  const router = useRouter();

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Tell the header whether the chat is open (its button shows it)
  useEffect(() => {
    window.dispatchEvent(new CustomEvent(ASSISTANT_STATE_EVENT, { detail: { open } }));
  }, [open]);

  // The header's chat button: open the chat, or close it if it is open
  useEffect(() => {
    const onToggle = (e) => {
      openerRef.current = e.detail?.opener || null;
      if (openRef.current) closeChat();
      else openChat();
    };
    window.addEventListener(ASSISTANT_EVENT, onToggle);
    return () => window.removeEventListener(ASSISTANT_EVENT, onToggle);
  });

  // Keep the newest message in view
  useEffect(() => {
    const log = logRef.current;
    log.scrollTop = log.scrollHeight;
  }, [messages, typing]);

  const add = (role, html) => setMessages((list) => [...list, { id: nextId++, role, html }]);

  async function ask(question, shown) {
    if (busy.current || !question.trim()) return;
    busy.current = true;
    setChips([]);
    add('me', esc(shown || question));
    history.current.push({ role: 'user', content: question });
    setTyping(true);
    let reply;
    try {
      if (!CHAT_ENDPOINT) throw 0;
      // The Supabase function first (NEXT_PUBLIC_CHAT_ENDPOINT); if it can't be reached or isn't ready, the site's own /api/chat/ answers.
      // No second try once the first one saved a lead (it would be saved twice); the built-in answers cover that case.
      const payload = JSON.stringify({ messages: history.current, leadSaved: leadSaved.current, utm: currentAttribution() });
      const send = async (url) => {
        const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload });
        return { res, data: await res.json().catch(() => ({})) };
      };
      let { res, data } = await send(CHAT_ENDPOINT).catch(() => ({ res: null, data: {} }));
      if ((!res || !res.ok || !data.reply) && !data?.leadSaved && res?.status !== 429 && CHAT_ENDPOINT !== SITE_CHAT_ENDPOINT) {
        ({ res, data } = await send(SITE_CHAT_ENDPOINT));
      }
      // The backend saves contact details even when the AI reply fails, and says so either way
      if (data.leadSaved) leadSaved.current = true;
      if (!res?.ok || !data.reply) throw 0;
      reply = { html: esc(String(data.reply)).replace(/\n/g, '<br>'), chips: [] };
    } catch {
      await new Promise((r) => setTimeout(r, 650 + Math.random() * 500));
      reply = localReply(question, leadSaved.current);
    }
    setTyping(false);
    add('bot', reply.html);
    history.current.push({ role: 'assistant', content: reply.html.replace(/<[^>]+>/g, '') });
    setChips(reply.chips);
    busy.current = false;
  }

  function showGreeting() {
    add('bot', GREETING[0]);
    setTimeout(() => {
      add('bot', GREETING[1]);
      setChips(STARTERS);
    }, 450);
  }

  function openChat() {
    setOpen(true);
    session.set('qaSeen', '1');
    if (!started.current) {
      started.current = true;
      showGreeting();
    }
    setTimeout(() => inputRef.current.focus({ preventScroll: true }), 230);
  }

  function closeChat() {
    setOpen(false);
    openerRef.current?.focus({ preventScroll: true });
  }

  // Clears the conversation (on screen, in memory and what's sent to the AI backend) and starts fresh
  function newChat() {
    busy.current = false;
    started.current = true;
    history.current = [];
    leadSaved.current = false;
    setTyping(false);
    setChips([]);
    setText('');
    setMessages([]);
    showGreeting();
    inputRef.current.focus({ preventScroll: true });
  }

  // Links in answers: data-qa-close links close the chat on phones so the page is visible.
  // Page links change pages without a reload; section links (#…) fall back to the home page's section.
  const onLogClick = (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    if (link.hasAttribute('data-qa-close') && window.matchMedia('(max-width:620px)').matches) closeChat();
    const href = link.getAttribute('href') || '';
    if (href.startsWith('/')) {
      e.preventDefault();
      router.push(href);
    } else if (href.length > 1 && href.startsWith('#') && !document.getElementById(href.slice(1))) {
      e.preventDefault();
      router.push('/' + href);
    }
  };

  const onInput = (e) => {
    setText(e.target.value.slice(0, CHAT_MAX_CHARS));
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  };

  const onInputKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formRef.current.requestSubmit();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    setText('');
    inputRef.current.style.height = '';
    ask(value);
  };

  return (
    <div className={'qa' + (open ? ' open' : '')} id="qa">

      <section className="qa-panel" id="qaPanel" role="dialog" aria-modal="false" aria-labelledby="qaTitle" onKeyDown={(e) => e.key === 'Escape' && closeChat()}>
        <header className="qa-head">
          <span className="qa-avatar" aria-hidden="true">
            <Image src="/icon-192.png" alt="" width={32} height={32} />
          </span>
          <div className="qa-title">
            <b id="qaTitle">QRS Roof Assistant</b>
            <span>Usually replies instantly</span>
          </div>
          <button className="qa-new" type="button" id="qaNew" aria-label="Start a new chat" onClick={newChat}>
            <RefreshIcon />
          </button>
          <button className="qa-x" type="button" id="qaClose" aria-label="Close chat" onClick={closeChat}>
            <CloseIcon />
          </button>
        </header>

        <div className="qa-log" id="qaLog" aria-live="polite" ref={logRef} onClick={onLogClick}>
          {messages.map((m) => (
            // Bot answers are trusted HTML from data/assistant.js; visitor text is escaped first
            <div className={'qa-msg ' + m.role} key={m.id} dangerouslySetInnerHTML={{ __html: m.html }} />
          ))}
          {typing && (
            <div className="qa-msg bot qa-typing" aria-label="Assistant is typing">
              <i></i><i></i><i></i>
            </div>
          )}
        </div>
        <div className="qa-chips" id="qaChips">
          {chips.map((label) => (
            <button type="button" className="qa-chip" key={label} onClick={() => ask(CHIP_PROMPTS[label] || label, label)}>
              {label}
            </button>
          ))}
        </div>

        <form className="qa-form" id="qaForm" ref={formRef} onSubmit={onSubmit}>
          <label htmlFor="qaInput" className="sr-only">Message</label>
          <textarea id="qaInput" rows={1} maxLength={CHAT_MAX_CHARS} placeholder="Ask about your roof…" autoComplete="off" ref={inputRef} value={text} onChange={onInput} onKeyDown={onInputKeyDown} />
          {text.length >= CHAT_MAX_CHARS - 100 && <span className="qa-count" aria-live="polite">{CHAT_MAX_CHARS - text.length} left</span>}
          <button className="qa-send" type="submit" id="qaSend" aria-label="Send message" disabled={!text.trim()}>
            <ArrowRight />
          </button>
        </form>
        <p className="qa-consent">
          By sharing your phone or email here, you agree QRS may contact you about your request by phone, text or email. <a href="/privacy-policy/">Privacy Policy</a>
        </p>
        <div className="qa-foot">
          <span>AI assistant · answers may need confirming</span>
          <a href={TEL}>{PHONE}</a>
        </div>
      </section>

    </div>
  );
}
