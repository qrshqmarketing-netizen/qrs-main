'use client';

import { useEffect, useRef } from 'react';
import SiteLink from '@/components/ui/SiteLink';

// Words that light up as the text scrolls through the screen (owner, October 16 2026: the home page's "Who we are" paragraph "reveal with gsap").
// The paragraphs are rendered here word by word (one span per word; [links](/path/) and **bold** kept), so the page's HTML already holds the
// whole text, links included, and nothing is rewritten in the browser. After the page has loaded, GSAP's ScrollTrigger (fetched only then, so
// it stays out of the first load) takes each word from faint to full, scrubbed to the scroll position between the paragraph entering the lower
// part of the screen and its last line reaching about two-thirds of the way down.
// SEO: the HTML is the plain text as written (the spans carry no styling until the script runs); words never go below 16% opacity; crawlers
// (and Lighthouse) and visitors who ask for reduced motion skip the effect, and without JavaScript the text is simply there.
const BOT = /bot|crawl|spider|slurp|google|bing|duckduck|baidu|yandex|facebookexternalhit|lighthouse|headlesschrome/i;

// "[words](/path/)" and "**words**" in the copy, the same marks as components/ui/Rich.jsx
const TOKEN = /\[([^\]]+)\]\(([^)]+)\)|\*\*(.+?)\*\*/g;
const words = (text, key) => text.split(/(\s+)/).map((part, i) => (/^\s+$/.test(part) || !part ? part : <span className="wr-w" key={`${key}-${i}`}>{part}</span>));

function RevealParagraph({ text }) {
  const out = [];
  let last = 0;
  let m;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(text))) {
    if (m.index > last) out.push(...words(text.slice(last, m.index), `t${last}`));
    if (m[1]) out.push(<SiteLink href={m[2]} key={`l${m.index}`}>{words(m[1], `l${m.index}`)}</SiteLink>);
    else out.push(<strong key={`b${m.index}`}>{words(m[3], `b${m.index}`)}</strong>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(...words(text.slice(last), `t${last}`));
  return <p>{out}</p>;
}

export default function WordReveal({ paragraphs, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || BOT.test(navigator.userAgent) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let cancelled = false;
    let cleanup = () => {};
    const start = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const tween = gsap.fromTo(
        el.querySelectorAll('.wr-w'),
        { opacity: 0.16 },
        { opacity: 1, ease: 'none', stagger: 0.08, scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 70%', scrub: 0.6 } }
      );
      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    };
    const later = () => !cancelled && start();
    if (document.readyState === 'complete') later();
    else window.addEventListener('load', later, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener('load', later);
      cleanup();
    };
  }, []);

  return (
    <div ref={ref} className={className} data-no-reveal="">
      {paragraphs.map((p) => (
        <RevealParagraph text={p} key={p} />
      ))}
    </div>
  );
}
