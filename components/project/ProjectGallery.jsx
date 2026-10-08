'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const MorphSlider = dynamic(() => import('@/components/sections/MorphSlider'), { ssr: false });

// The photos of a project in three views, switched by the buttons above them: Detail (an editorial layout: a full-width photo, a row of three, an
// asymmetric pair, ...), Grid (an even masonry) and Slider (the cross-fading slider). All photos are real images in the page in every view but Slider
// (they are the same elements, only laid out differently), and each opens a full-screen viewer (arrows, Escape, swipe). photos: [{ src, alt }].
const ROWS = ['full', 'trio', 'duo', 'full', 'duo-flip', 'trio', 'full'];
const NEED = { full: 1, trio: 3, duo: 2, 'duo-flip': 2 };

function layout(count) {
  const rows = [];
  let at = 0;
  for (let r = 0; at < count; r++) {
    let type = ROWS[r % ROWS.length];
    const left = count - at;
    if (left < NEED[type]) type = left === 2 ? 'duo' : 'full';
    rows.push({ type, from: at, to: at + NEED[type] });
    at += NEED[type];
  }
  return rows;
}

export default function ProjectGallery({ photos, name }) {
  const [view, setView] = useState('detail');
  const [open, setOpen] = useState(-1);
  const closeRef = useRef(null);
  const rows = layout(photos.length);

  const move = useCallback((d) => setOpen((i) => (i < 0 ? i : (i + d + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (open < 0) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(-1);
      else if (e.key === 'ArrowRight') move(1);
      else if (e.key === 'ArrowLeft') move(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('rm-lock');
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('rm-lock');
    };
  }, [open, move]);

  const cell = (i, sizes, cls = '') => (
    <button type="button" className={`pd-photo ${cls}`} key={photos[i].src} onClick={() => setOpen(i)} aria-label={`Open photo ${i + 1} of ${photos.length}`}>
      <Image src={photos[i].src} alt={photos[i].alt} fill sizes={sizes} quality={70} loading={i < 2 ? 'eager' : 'lazy'} />
    </button>
  );

  let touchX = 0;
  return (
    <section className="pd-gallery" aria-label={`${name}: photos`}>
      <div className="container">
        <div className="pd-views" role="group" aria-label="Photo view">
          {[
            ['detail', 'Detail'],
            ['grid', 'Grid'],
            ['slider', 'Slider'],
          ].map(([id, label]) => (
            <button type="button" key={id} className={view === id ? 'on' : ''} aria-pressed={view === id} onClick={() => setView(id)}>
              {label}
            </button>
          ))}
          <span className="pd-count">{photos.length} photos</span>
        </div>

        {view === 'detail' && (
          <div className="pd-detail">
            {rows.map((row) => (
              <div className={`pd-row pd-${row.type}`} key={row.from}>
                {Array.from({ length: row.to - row.from }, (_, k) => row.from + k).map((i) =>
                  cell(i, row.type === 'full' ? '(min-width: 1540px) 1500px, 100vw' : row.type === 'trio' ? '(min-width: 901px) 33vw, 100vw' : '(min-width: 901px) 58vw, 100vw')
                )}
              </div>
            ))}
          </div>
        )}

        {view === 'grid' && <div className="pd-grid">{photos.map((_, i) => cell(i, '(min-width: 901px) 33vw, (min-width: 621px) 50vw, 100vw'))}</div>}

        {view === 'slider' && (
          <div className="pd-slider">
            <MorphSlider items={photos.map((p) => ({ image: p.src, caption: p.alt }))} transition="fade" radius={14} autoplay loop captionBelowOnMobile aria-label="Project photos" />
          </div>
        )}
      </div>

      {open >= 0 && (
        <div className="pd-lightbox" role="dialog" aria-modal="true" aria-label={`${name}: photo ${open + 1} of ${photos.length}`} onClick={() => setOpen(-1)}
          onTouchStart={(e) => (touchX = e.touches[0].clientX)} onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - touchX; if (Math.abs(dx) > 50) move(dx < 0 ? 1 : -1); }}>
          <div className="pd-lb-img" onClick={(e) => e.stopPropagation()}>
            <Image src={photos[open].src} alt={photos[open].alt} fill sizes="100vw" quality={80} priority />
          </div>
          <p className="pd-lb-cap" onClick={(e) => e.stopPropagation()}>
            <b>{String(open + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</b> {photos[open].alt}
          </p>
          <button type="button" className="pd-lb-btn pd-lb-close" ref={closeRef} onClick={() => setOpen(-1)} aria-label="Close">×</button>
          <button type="button" className="pd-lb-btn pd-lb-prev" onClick={(e) => { e.stopPropagation(); move(-1); }} aria-label="Previous photo">‹</button>
          <button type="button" className="pd-lb-btn pd-lb-next" onClick={(e) => { e.stopPropagation(); move(1); }} aria-label="Next photo">›</button>
        </div>
      )}
    </section>
  );
}
