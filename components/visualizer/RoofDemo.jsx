'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import './Visualizer.css';

// The animated example on the home page: a finished roof photo that changes color every few seconds, with a light sweep each time and the manufacturer and
// color named underneath, only while it is on screen (and not at all for reduced motion, which shows the first color). It is an illustration of the idea (the
// real tool recolors the visitor's own photo), and says so.
const DEMO = [
  { name: 'Charcoal', hex: '#2f3033' },
  { name: 'Warm Brown', hex: '#7a5b45' },
  { name: 'Slate Gray', hex: '#6f7378' },
  { name: 'Sandstone', hex: '#b39a79' },
];
const SRC = '/images/shingle-roof-inspection-overhead.webp';
// The roof's outline in that photo (percent of its width and height), so only the roof changes color, not the lawn, the cars or the driveway
const ROOF = 'polygon(16.4% 13.9%,36.5% 11.5%,48.4% 13.5%,49% 2.8%,76.8% 1.5%,76.8% 37.8%,58.9% 38.2%,58.9% 89.6%,37.2% 92.7%,16.7% 89.9%)';

export default function RoofDemo() {
  const [i, setI] = useState(0);
  const [run, setRun] = useState(false);
  const box = useRef(null);

  useEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return undefined;
    let timer;
    const io = new IntersectionObserver(([entry]) => {
      clearInterval(timer);
      if (!entry.isIntersecting) return;
      timer = setInterval(() => {
        setRun(false);
        requestAnimationFrame(() => {
          setRun(true);
          setI((n) => (n + 1) % DEMO.length);
        });
      }, 3400);
    }, { threshold: 0.35 });
    io.observe(el);
    return () => {
      clearInterval(timer);
      io.disconnect();
    };
  }, []);

  const color = DEMO[i];
  return (
    <div className={'viz-demo' + (run ? ' run' : '')} ref={box} role="img" aria-label={`Example: a roof shown in ${color.name}`}>
      <Image src={SRC} alt="" fill sizes="(min-width: 901px) 48vw, 100vw" quality={60} />
      <div className="viz-demo-tint" style={{ backgroundColor: color.hex, clipPath: ROOF }} />
      <div className="viz-demo-scan" />
      <span className="viz-demo-tag">Example preview</span>
      <div className="viz-demo-cap">
        <span className="viz-demo-chip">Roof color · {color.name}</span>
        <span className="viz-demo-dots" aria-hidden="true">
          {DEMO.map((d, n) => (
            <i key={d.name} className={n === i ? 'on' : ''} style={{ background: d.hex }} />
          ))}
        </span>
      </div>
    </div>
  );
}
