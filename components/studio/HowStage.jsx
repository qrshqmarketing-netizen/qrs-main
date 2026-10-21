'use client';

import { useEffect, useRef, useState } from 'react';
import { BUSINESS, OFFICES } from '@/data/site';
import './HowStage.css';

// The 3D stage of "How we work" (StudioHowWeWork.jsx; owner, October 20 2026: it replaces the section's four AI photos). A navy stage with a faint
// blueprint grid, a WebGL scene from howEngine.js (Three.js, fetched only when the stage is within 400px of the screen) and glass HTML cards and
// labels on top. `stations` lists the principles this stage shows (desktop: one stage for all four, the camera flying between them as `active`
// changes; phones: one stage per principle). The labels with data-anchor follow their 3D points (moved by the engine); the rest are fixed cards.
// The scene runs only while the stage is on screen and the tab is visible, and is torn down when the stage is far off screen (so phones never
// hold more than a couple of WebGL contexts); reduced motion draws still frames. Without WebGL the cards show on the drawn backdrop.
// Everything here is decorative (aria-hidden): the principles' text is in the list beside it. Every fact is one the site already states.
const OFFICE_POINTS = OFFICES.map((o) => ({ lon: o.geo.longitude, lat: o.geo.latitude }));
const NEXT_STEPS = ['Repair', 'Monitor', 'Maintain', 'Replace'];

const Tag = ({ anchor, children, className = '' }) => (
  <span className="hw-anchor" data-anchor={anchor}>
    <span className={'hw-tag ' + className}>{children}</span>
  </span>
);

const Check = () => (
  <svg className="hw-check" viewBox="0 0 20 20" aria-hidden="true">
    <circle cx="10" cy="10" r="9" />
    <path d="m6 10.4 2.7 2.6L14.2 7.4" />
  </svg>
);

function Overlay({ station }) {
  if (station === 0)
    return (
      <>
        <Tag anchor="s0-drone" className="hw-tag-rec">
          <i className="hw-rec" /> Drone footage
        </Tag>
        <Tag anchor="s0-roof">Roof evaluation</Tag>
        <div className="hw-card hw-card-scope">
          <p className="hw-kicker">Written scope</p>
          <ul className="hw-rows">
            {['Drone footage of the areas of concern', 'Photos of what we find', 'Written scope and price'].map((row, i) => (
              <li key={row} style={{ '--d': `${0.5 + i * 0.55}s` }}>
                <Check /> {row}
              </li>
            ))}
          </ul>
          <p className="hw-chip hw-chip-gold">Before any work starts</p>
        </div>
      </>
    );
  if (station === 1)
    return (
      <>
        <Tag anchor="s1-flashing">
          <b>Chimney flashing</b> <small>Photo 1</small>
        </Tag>
        <Tag anchor="s1-boot">
          <b>Vent boot</b> <small>Photo 2</small>
        </Tag>
        <Tag anchor="s1-skylight">
          <b>Skylight</b> <small>Photo 3</small>
        </Tag>
        <div className="hw-card hw-card-next">
          <p className="hw-kicker">Your next step, in plain English</p>
          <ul className="hw-steps">
            {NEXT_STEPS.map((s, i) => (
              <li key={s} style={{ '--i': i }}>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  if (station === 2)
    return (
      <>
        {OFFICES.map((o, i) => (
          <Tag anchor={`s2-office-${i}`} key={o.name} className={'hw-tag-office ' + (['hw-tag-right', 'hw-tag-left', 'hw-tag-right'][i] || '')}>
            <b>{o.name}</b> <small>{o.address.city}</small>
          </Tag>
        ))}
        <div className="hw-card hw-card-local">
          <div className="hw-stats">
            <p>
              <b>12</b> crews
            </p>
            <p>
              <b>{OFFICES.length}</b> offices
            </p>
          </div>
          <ul className="hw-chips">
            {['English', 'Español', 'Tagalog'].map((l) => (
              <li key={l} className="hw-chip">
                {l}
              </li>
            ))}
          </ul>
          <p className="hw-fine">Family-owned · Woman-owned · Locally owned</p>
        </div>
      </>
    );
  return (
    <>
      <Tag anchor="s3-top">Shingles</Tag>
      <Tag anchor="s3-under">Underlayment</Tag>
      <Tag anchor="s3-deck">Deck</Tag>
      <div className="hw-card hw-card-backed">
        <p className="hw-kicker">Work that’s backed</p>
        <p className="hw-big">
          10-year workmanship warranty <small>(call for details)</small>
        </p>
        <ul className="hw-rows">
          {['Permits pulled', 'Landscaping tarped', 'Nail sweep every day'].map((row, i) => (
            <li key={row} style={{ '--d': `${0.5 + i * 0.45}s` }}>
              <Check /> {row}
            </li>
          ))}
        </ul>
        <p className="hw-fine">Licensed, bonded & insured · CSLB #{BUSINESS.license}</p>
      </div>
    </>
  );
}

export default function HowStage({ stations = [0, 1, 2, 3], active = stations[0], className = '' }) {
  const root = useRef(null);
  const ctl = useRef(null);
  const activeRef = useRef(active);
  const [mode, setMode] = useState('idle'); // idle (backdrop), live (WebGL running), fallback (no WebGL)
  const key = stations.join(',');

  useEffect(() => {
    activeRef.current = active;
    ctl.current?.setActive(active);
  }, [active]);

  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let disposed = false, booting = false, onScreen = false, canvas = null;

    const run = () => {
      if (!ctl.current) return;
      if (onScreen && document.visibilityState === 'visible') ctl.current.start();
      else ctl.current.stop();
    };
    const boot = async () => {
      if (ctl.current || booting) return;
      booting = true;
      try {
        const { createHowStage } = await import('./howEngine');
        if (disposed) return;
        canvas = document.createElement('canvas');
        canvas.className = 'hw-canvas';
        el.prepend(canvas);
        const stage = createHowStage({ canvas, root: el, stations, active: activeRef.current, offices: OFFICE_POINTS, still });
        if (!stage) {
          canvas.remove();
          canvas = null;
          setMode('fallback');
          return;
        }
        ctl.current = stage;
        setMode('live');
        run();
      } catch {
        canvas?.remove();
        canvas = null;
        if (!disposed) setMode('fallback');
      } finally {
        booting = false;
      }
    };
    const teardown = () => {
      ctl.current?.dispose();
      ctl.current = null;
      canvas?.remove();
      canvas = null;
      el.querySelectorAll('[data-anchor]').forEach((a) => (a.style.transform = ''));
      setMode((m) => (m === 'live' ? 'idle' : m));
    };

    // Near the screen: build the scene; far away again: tear it down (frees the WebGL context)
    // (several entries can arrive at once after a big scroll jump: the last one is the current state)
    const near = new IntersectionObserver((entries) => (entries[entries.length - 1].isIntersecting ? boot() : teardown()), { rootMargin: stations.length > 1 ? '400px 0px' : '120px 0px' }); // the stacked phone stages sit close together: keep fewer alive
    // On screen: draw; off screen or tab hidden: pause
    const seen = new IntersectionObserver((entries) => {
      onScreen = entries[entries.length - 1].isIntersecting;
      run();
    });
    near.observe(el);
    seen.observe(el);
    document.addEventListener('visibilitychange', run);
    return () => {
      disposed = true;
      near.disconnect();
      seen.disconnect();
      document.removeEventListener('visibilitychange', run);
      teardown();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return (
    <div className={`hw-stage hw-${mode} ${className}`} ref={root} aria-hidden="true">
      <div className="hw-backdrop" />
      {stations.map((s) => (
        <div key={s} className={`hw-group hw-s${s}` + (s === active ? ' on' : '')}>
          <Overlay station={s} />
        </div>
      ))}
    </div>
  );
}
