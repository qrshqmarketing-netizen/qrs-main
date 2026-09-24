'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CloseIcon, QrsMark } from '@/components/ui/icons';
import { ANSWERS, CHAT_ENDPOINT, CHIP_PROMPTS, FALLBACK_ANSWER, GREETING, STARTERS } from '@/data/assistant';
import { PHONE, TEL } from '@/data/site';
import { session } from '@/lib/storage';
import './RoofAssistant.css';

const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// Built-in answers (used when no AI endpoint is set, or it fails)
function localReply(text) {
  const t = text.toLowerCase();
  const hit = ANSWERS.find((entry) => entry.match.test(t));
  if (hit) return { html: hit.answer, chips: hit.chips === null ? STARTERS : hit.chips };
  return { html: FALLBACK_ANSWER, chips: STARTERS };
}

let nextId = 0;

// QRS Roof Assistant: floating chat bubble + panel (answers and settings in data/assistant.js)
export default function RoofAssistant() {
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false); // stops the pulse + red dot after the first visit
  const [teaser, setTeaser] = useState(false);
  const [messages, setMessages] = useState([]); // { id, role: 'bot' | 'me', html }
  const [chips, setChips] = useState([]);
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState('');

  const openRef = useRef(false);
  const busy = useRef(false);
  const started = useRef(false);
  const history = useRef([]);
  const logRef = useRef(null);
  const inputRef = useRef(null);
  const formRef = useRef(null);
  const bubbleRef = useRef(null);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // First visit this session: show the "Hi!" teaser after a few seconds
  useEffect(() => {
    if (session.get('qaSeen')) {
      setSeen(true);
      return;
    }
    const t = setTimeout(() => !openRef.current && setTeaser(true), 4000);
    return () => clearTimeout(t);
  }, []);

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
      const res = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.current }),
      });
      if (!res.ok) throw 0;
      const data = await res.json();
      if (!data.reply) throw 0;
      reply = { html: esc(String(data.reply)).replace(/\n/g, '<br>'), chips: [] };
    } catch {
      await new Promise((r) => setTimeout(r, 650 + Math.random() * 500));
      reply = localReply(question);
    }
    setTyping(false);
    add('bot', reply.html);
    history.current.push({ role: 'assistant', content: reply.html.replace(/<[^>]+>/g, '') });
    setChips(reply.chips);
    busy.current = false;
  }

  function openChat() {
    setOpen(true);
    setSeen(true);
    session.set('qaSeen', '1');
    if (!started.current) {
      started.current = true;
      add('bot', GREETING[0]);
      setTimeout(() => {
        add('bot', GREETING[1]);
        setChips(STARTERS);
      }, 450);
    }
    setTimeout(() => inputRef.current.focus({ preventScroll: true }), 230);
  }

  function closeChat() {
    setOpen(false);
    bubbleRef.current.focus({ preventScroll: true });
  }

  const onTeaserClick = (e) => {
    if (e.target.id === 'qaTeaserX') {
      setTeaser(false);
      setSeen(true);
      session.set('qaSeen', '1');
    } else openChat();
  };

  // Links in answers (data-qa-close) close the chat on phones so the page section is visible
  const onLogClick = (e) => {
    if (e.target.closest('[data-qa-close]') && window.matchMedia('(max-width:620px)').matches) closeChat();
  };

  const onInput = (e) => {
    setText(e.target.value);
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
    <div className={'qa' + (open ? ' open' : '') + (seen ? ' seen' : '')} id="qa">
      <div className="qa-teaser" id="qaTeaser" hidden={!teaser} onClick={onTeaserClick}>
        Hi! Questions about your roof? I can help.
        <button type="button" id="qaTeaserX" aria-label="Dismiss">&times;</button>
      </div>

      <section className="qa-panel" id="qaPanel" role="dialog" aria-modal="false" aria-labelledby="qaTitle" onKeyDown={(e) => e.key === 'Escape' && closeChat()}>
        <header className="qa-head">
          <span className="qa-avatar" aria-hidden="true">
            <svg viewBox="0 0 64 64">
              <QrsMark />
            </svg>
          </span>
          <div className="qa-title">
            <b id="qaTitle">QRS Roof Assistant</b>
            <span>Usually replies instantly</span>
          </div>
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
          <textarea id="qaInput" rows={1} placeholder="Ask about your roof…" autoComplete="off" ref={inputRef} value={text} onChange={onInput} onKeyDown={onInputKeyDown} />
          <button className="qa-send" type="submit" id="qaSend" aria-label="Send message" disabled={!text.trim()}>
            <ArrowRight />
          </button>
        </form>
        <div className="qa-foot">
          <span>AI assistant · answers may need confirming</span>
          <a href={TEL}>{PHONE}</a>
        </div>
      </section>

      <button
        className="qa-bubble"
        type="button"
        id="qaBubble"
        ref={bubbleRef}
        aria-label={open ? 'Close chat' : 'Chat with the QRS assistant'}
        aria-expanded={open}
        aria-controls="qaPanel"
        onClick={() => (open ? closeChat() : openChat())}
      >
        <svg className="qa-ic-open" viewBox="0 0 40 40" aria-hidden="true">
          <path d="M20 5C11.2 5 4 11.1 4 18.7c0 4.1 2.1 7.8 5.5 10.3L8 35l7.1-3.6c1.6.4 3.2.6 4.9.6 8.8 0 16-6.1 16-13.3S28.8 5 20 5Z" fill="#062d57" />
          <circle cx="13.5" cy="18.7" r="2.2" fill="#ffb82e" />
          <circle cx="20" cy="18.7" r="2.2" fill="#ffb82e" />
          <circle cx="26.5" cy="18.7" r="2.2" fill="#ffb82e" />
        </svg>
        <CloseIcon className="qa-ic-close" strokeWidth={2.8} />
        <span className="qa-dot" aria-hidden="true"></span>
      </button>
    </div>
  );
}
