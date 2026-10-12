'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Mark from '@/components/ui/Mark';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight, PhoneIcon } from '@/components/ui/icons';
import { ROOF_COLORS, ROOF_COLORS_COPY } from '@/data/roofColors';
import { PHONE, TEL } from '@/data/site';
import { paintRoof, prepareRoof } from './recolor';
import './RoofColors.css';

// The home page's shingle color section: a finished roof seen from above and the color swatches. Tapping a swatch repaints only the roof (recolor.js keeps the
// shingle texture and shading); "Original" shows the photo as it is. Until the visitor taps, the photo moves through a few colors on its own while it is on
// screen (not for reduced motion). Nothing is sent anywhere.
const SRC = '/images/shingle-roof-inspection-overhead.webp';
// The roof's outline in that photo, in percent of its width and height
const ROOF = [[16.4, 13.9], [36.5, 11.5], [48.4, 13.5], [49, 2.8], [76.8, 1.5], [76.8, 37.8], [58.9, 38.2], [58.9, 89.6], [37.2, 92.7], [16.7, 89.9]];
const DEMO = ['mojave', 'sierra-gray', 'sand-castle', 'night-sky'];
const ORIGINAL = { id: 'original', name: 'Original' };

export default function RoofColors() {
  const [picked, setPicked] = useState(null); // a color id, 'original', or null before the visitor taps
  const [auto, setAuto] = useState(0); // the demo's position before the visitor taps
  const [painted, setPainted] = useState({}); // color id → picture (made once per color)
  const [sweep, setSweep] = useState(0);
  const prep = useRef(null);
  const box = useRef(null);

  const currentId = picked || DEMO[auto];
  const current = ROOF_COLORS.find((c) => c.id === currentId) || ORIGINAL;

  // Prepare the photo once the section is near the screen, then paint the color on show
  useEffect(() => {
    const el = box.current;
    if (!el) return undefined;
    let cancelled = false;
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting || prep.current) return;
        io.disconnect();
        try {
          const p = await prepareRoof(SRC, ROOF);
          if (!cancelled) {
            prep.current = p;
            setPainted({});
          }
        } catch {}
      },
      { rootMargin: '300px' }
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!prep.current || current.id === 'original' || painted[current.id]) return;
    setPainted((m) => ({ ...m, [current.id]: paintRoof(prep.current, current.hex) }));
  }, [current, painted]);

  // The demo before the visitor taps: a new color every few seconds while on screen
  useEffect(() => {
    const el = box.current;
    if (picked || !el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let timer;
    const io = new IntersectionObserver(([entry]) => {
      clearInterval(timer);
      if (entry.isIntersecting) {
        timer = setInterval(() => {
          setAuto((n) => (n + 1) % DEMO.length);
          setSweep((n) => n + 1);
        }, 3200);
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => {
      clearInterval(timer);
      io.disconnect();
    };
  }, [picked]);

  const choose = (id) => {
    setPicked(id);
    setSweep((n) => n + 1);
    if (typeof window.gtag === 'function') window.gtag('event', 'roof_color_pick', { color: id });
  };

  const shown = current.id === 'original' ? '' : painted[current.id];
  return (
    <section className="st-section rc" id="shingle-colors">
      <div className="container rc-grid">
        <div className="rc-head">
          <p className="st-label">{ROOF_COLORS_COPY.label}</p>
          <h2><Mark text={ROOF_COLORS_COPY.heading} /></h2>
          <p className="rc-sub">{ROOF_COLORS_COPY.sub}</p>
        </div>

        <div className="rc-pick">
          <div className="rc-swatches" role="radiogroup" aria-label="Shingle colors">
            {[ORIGINAL, ...ROOF_COLORS].map((c) => (
              <button
                type="button"
                key={c.id}
                role="radio"
                aria-checked={currentId === c.id && Boolean(picked)}
                className={'rc-swatch' + (currentId === c.id ? ' on' : '') + (c.id === 'original' ? ' rc-original' : '')}
                onClick={() => choose(c.id)}
              >
                <i style={c.swatch ? { backgroundImage: `url(${c.swatch})` } : c.hex ? { background: c.hex } : undefined} />
                <span>{c.name}</span>
              </button>
            ))}
          </div>

          <div className="rc-actions">
            <SiteLink className="btn btn-gold" href="/start/?need=replacement">Book a free roof evaluation <ArrowRight /></SiteLink>
            <a className="btn btn-line" href={TEL}><PhoneIcon /> Call {PHONE}</a>
          </div>
          <p className="rc-note">{ROOF_COLORS_COPY.note}</p>
        </div>

        <div className="rc-photo" ref={box} role="img" aria-label={`A finished shingle roof seen from above${current.id === 'original' ? '' : `, shown in ${current.name}`}`}>
          <Image src={SRC} alt="" fill sizes="(min-width: 901px) 50vw, 100vw" quality={70} />
          {shown && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="rc-painted" key={current.id} src={shown} alt="" />
          )}
          <span className="rc-sweep" key={sweep} aria-hidden="true" />
          {(shown || current.id === 'original') && <span className="rc-chip">{current.id === 'original' ? 'Original roof' : current.name}</span>}
        </div>
      </div>
    </section>
  );
}
