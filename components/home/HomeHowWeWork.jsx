'use client';

import { useRef, useState } from 'react';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import HowStage from '@/components/studio/HowStage';
import { PRINCIPLES } from '@/components/studio/StudioHowWeWork';
import HomeHead from './HomeHead';

// "How we work" in the home page's clean pattern (owner, October 22 2026; it was a pinned, scroll-driven section): a centered heading and line,
// then the services explorer's layout (HomeServices): the four principles as numbered tabs at the left (chips on phones) and, at the right,
// one 3D stage (HowStage, its camera flying to the chosen principle) above that principle's paragraph. Every paragraph is in the HTML (the
// others `hidden`); the stage is decorative. Words and facts are StudioHowWeWork's PRINCIPLES.
export default function HomeHowWeWork({ heading = 'How we __work__', text = 'What every job looks like, from the first look at your roof to the walk-through at the end.' }) {
  const [on, setOn] = useState(0);
  const list = useRef(null);
  const pick = (i) => {
    setOn(i);
    list.current?.querySelectorAll('[role="tab"]')[i]?.focus();
  };
  const keys = (e) => {
    const n = PRINCIPLES.length;
    const move = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (move) {
      e.preventDefault();
      pick((on + move + n) % n);
    }
  };
  return (
    <section className="hc-section hc-how" id="how-we-work" aria-labelledby="hc-how-title" data-no-reveal="">
      <div className="hc-wrap">
        <HomeHead id="hc-how-title" heading={heading} text={text} />
        <div className="hc-tabs">
          <div className="hc-tablist hc-how-list" role="tablist" aria-label="How we work" aria-orientation="vertical" ref={list} onKeyDown={keys}>
            {PRINCIPLES.map((p, i) => (
              <button key={p.title} type="button" role="tab" id={`hc-how-tab-${i}`} aria-controls={`hc-how-panel-${i}`} aria-selected={i === on} tabIndex={i === on ? 0 : -1} className={i === on ? 'on' : ''} onClick={() => setOn(i)}>
                <span className="hc-how-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                {p.title}
              </button>
            ))}
          </div>
          <div className="hc-how-body">
            <HowStage className="hc-how-stage" stations={[0, 1, 2, 3]} active={on} />
            {PRINCIPLES.map((p, i) => (
              <div className="hc-how-panel" role="tabpanel" id={`hc-how-panel-${i}`} aria-labelledby={`hc-how-tab-${i}`} hidden={i !== on} key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                {p.link && (
                  <SiteLink className="hc-more" href={p.link.href}>
                    {p.link.label} <ArrowRight />
                  </SiteLink>
                )}
              </div>
            ))}
          </div>
        </div>
        <p className="hc-center">
          <SiteLink className="hc-pill" href="#roof-check">
            Get Pro Advice <ArrowRight />
          </SiteLink>
        </p>
      </div>
    </section>
  );
}
