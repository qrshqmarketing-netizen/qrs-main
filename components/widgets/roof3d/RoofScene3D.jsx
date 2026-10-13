'use client';

import { useEffect, useRef } from 'react';
import './RoofScene3D.css';

// A hero's 3D background (three.js), reacting to the mouse. scene="roof": the home page's Hollywood Hills West round flat roof at dusk (roofScene.js);
// scene="house": the Residential Roofing page's suburban street with a hip-roof shingle home (houseScene.js); scene="commercial": the Commercial
// Roofing page's flat-roof building on a street corner (commercialScene.js); scene="repair": the Roof Repair page's steep shingle roof mid-job,
// where hovering the roof lays the last shingle courses (repairScene.js); scene="replacement": the Roof Replacement page's courtyard home, where
// hovering the roof sweeps the old shingles into the new ones (replacementScene.js); scene="street": the Service Areas page's row of homes seen
// from the street, where pointing at a home drops a gold map pin over it (streetScene.js). three.js is fetched only after the page
// has loaded (it never delays the first paint); until the first frame, and without WebGL or with Data Saver, the hero's navy background shows.
// Pauses off screen; one still frame for reduced motion.
const ENGINES = {
  roof: () => import('./roofScene').then((m) => m.RoofSceneEngine),
  house: () => import('./houseScene').then((m) => m.HouseSceneEngine),
  commercial: () => import('./commercialScene').then((m) => m.CommercialSceneEngine),
  repair: () => import('./repairScene').then((m) => m.RepairSceneEngine),
  replacement: () => import('./replacementScene').then((m) => m.ReplacementSceneEngine),
  street: () => import('./streetScene').then((m) => m.StreetSceneEngine),
};

export default function RoofScene3D({ scene = 'roof' }) {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas || navigator.connection?.saveData) return undefined;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let engine = null;
    let cancelled = false;
    let watcher = null;
    let resizer = null;
    const onLost = () => host.classList.remove('is-live');

    const start = async () => {
      try {
        const Engine = await ENGINES[scene]();
        if (cancelled) return;
        const created = new Engine(canvas, { reducedMotion });
        if (!created.ok) return;
        engine = created;
        host.classList.add('is-live');
        canvas.addEventListener('scene3d-lost', onLost);
        if ('ResizeObserver' in window) {
          resizer = new ResizeObserver(() => engine?.resize());
          resizer.observe(host);
        }
        if ('IntersectionObserver' in window) {
          watcher = new IntersectionObserver(([entry]) => engine?.setVisible(entry.isIntersecting));
          watcher.observe(host);
        }
      } catch {
        // no 3D: the photo stays
      }
    };
    const later = () => ('requestIdleCallback' in window ? window.requestIdleCallback(start, { timeout: 2000 }) : setTimeout(start, 400));
    if (document.readyState === 'complete') later();
    else window.addEventListener('load', later, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('load', later);
      watcher?.disconnect();
      resizer?.disconnect();
      canvas.removeEventListener('scene3d-lost', onLost);
      engine?.destroy();
    };
  }, [scene]);

  return (
    <div className="roof3d" ref={hostRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
