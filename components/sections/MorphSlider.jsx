'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import './MorphSlider.css';

// WebGL image slider with clean crossfade transitions (ogl + gsap powered).
// items: [{ image, caption? }]. captionBelowOnMobile: below 621px the caption shows as text under the slider (a sibling
// after it) instead of on the photo; give the slider its own size then, since its parent also holds the caption.
export default function MorphSlider({
  items = [],
  startIndex = 0,
  transition = 'fade',
  duration = 1.1,
  ease = 'power2.inOut',
  intensity = 0.55,
  scale = 2.4,
  aberration = 0.35,
  drift = 0.4,
  autoplay = false,
  autoplayDelay = 4,
  loop = true,
  radius = 16,
  overlayColor = '#000000',
  showCaptions = true,
  showControls = true,
  showIndicators = true,
  captionBelowOnMobile = false,
  className = '',
  ...props
}) {
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const draggedRef = useRef(false);
  const [index, setIndex] = useState(startIndex);
  const [hovering, setHovering] = useState(false);

  const optsRef = useRef();
  optsRef.current = { transition, duration, ease, intensity, scale, aberration, drift, overlayColor, loop };

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return undefined;
    const stage = containerRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cancelled = false;
    let engine = null;
    let watcher = null;

    // The engine (morphEngine.js: ogl + gsap) is fetched only once the slider is about to come into view
    const start = async () => {
      try {
        const { MorphEngine } = await import('./morphEngine');
        if (cancelled) return;
        engine = new MorphEngine(stage, {
          items,
          startIndex,
          reducedMotion,
          dprCap: 2,
          getOptions: () => optsRef.current,
          onIndexChange: setIndex,
        });
        engineRef.current = engine;
        setIndex(startIndex);
      } catch {
        // no WebGL engine: the slider area stays empty, as it does when WebGL is unavailable
      }
    };
    if ('IntersectionObserver' in window) {
      watcher = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          watcher.disconnect();
          start();
        }
      }, { rootMargin: '400px' });
      watcher.observe(stage);
    } else {
      start();
    }

    return () => {
      cancelled = true;
      watcher?.disconnect();
      engine?.destroy();
      engineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, startIndex]);

  const handleNext = useCallback(() => engineRef.current?.next(), []);
  const handlePrev = useCallback(() => engineRef.current?.prev(), []);

  useEffect(() => {
    if (!autoplay || hovering) return undefined;
    const id = setTimeout(() => engineRef.current?.next(), Math.max(autoplayDelay, 1) * 1000);
    return () => clearTimeout(id);
  }, [autoplay, autoplayDelay, hovering, index]);

  useEffect(() => {
    const stage = containerRef.current;
    const el = stage?.parentElement;
    if (!stage || !el) return undefined;
    let startX = 0;
    let width = 1;
    let active = false;

    const onDown = (e) => {
      if (!e.target.closest('.morph-slider-stage, .morph-slider-project-link')) return;
      draggedRef.current = false;
      const rect = stage.getBoundingClientRect();
      width = rect.width || 1;
      startX = e.clientX;
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      engineRef.current?.setPointer(px, 1 - py);
      active = engineRef.current?.beginDrag() ?? false;
      const captureTarget = e.target.closest('.morph-slider-project-link') || el;
      if (active && captureTarget.setPointerCapture) {
        try {
          captureTarget.setPointerCapture(e.pointerId);
        } catch {
          // ignore
        }
      }
    };
    const onMove = (e) => {
      if (!active) return;
      const ndx = (e.clientX - startX) / width;
      if (Math.abs(ndx) > 0.015) draggedRef.current = true;
      engineRef.current?.drag(ndx);
    };
    const onUp = () => {
      if (!active) return;
      active = false;
      engineRef.current?.endDrag();
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);

    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
    };
  }, []);

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    },
    [handleNext, handlePrev]
  );

  const hasCaptions = items.some((item) => item.caption);
  const activeLink = items[index]?.href;

  const captionBelow = captionBelowOnMobile && hasCaptions;

  return (
    <>
      <div
        className={`morph-slider${captionBelow ? ' has-caption-below' : ''} ${className}`.trim()}
        style={{
          borderRadius: `${radius}px`,
          '--ms-swap': `${(duration * 0.66).toFixed(3)}s`,
          '--ms-dot': `${(duration * 0.45).toFixed(3)}s`,
        }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        {...props}
      >
        <div ref={containerRef} className="morph-slider-stage" role="group" aria-roledescription="carousel" aria-label="Image slider" tabIndex={0} onKeyDown={onKeyDown} />

        {activeLink && (
          <Link
            className="morph-slider-project-link"
            href={activeLink}
            aria-label={`View project: ${items[index].caption || 'project details'}`}
            title={`View project: ${items[index].caption || 'project details'}`}
            onClick={(e) => {
              if (draggedRef.current) {
                e.preventDefault();
                draggedRef.current = false;
              }
            }}
          >
            <span className="morph-slider-project-link-label">View project <span aria-hidden="true">↗</span></span>
          </Link>
        )}

        {showCaptions && hasCaptions && (
          <div className="morph-slider-caption" aria-live="polite">
            {items.map((item, i) =>
              item.caption ? (
                <span key={i} aria-hidden={i === index ? undefined : true} className={`morph-slider-caption-text ${i === index ? 'is-active' : ''}`}>
                  {item.caption}
                </span>
              ) : null
            )}
          </div>
        )}

        {showControls && (
          <div className="morph-slider-controls">
            <button type="button" className="morph-slider-btn" aria-label="Previous slide" onClick={handlePrev}>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" className="morph-slider-btn" aria-label="Next slide" onClick={handleNext}>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}

        {showIndicators && (
          <div className="morph-slider-indicators" role="tablist" aria-label="Slides">
            {items.map((item, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to slide ${i + 1}`}
                className={`morph-slider-dot ${i === index ? 'is-active' : ''}`}
                onClick={() => {
                  const engine = engineRef.current;
                  if (!engine || i === index) return;
                  engine.goTo(i > index ? 1 : -1);
                }}
              />
            ))}
          </div>
        )}
      </div>
      {captionBelow && (
        <p className="morph-slider-caption-below" aria-live="polite">
          <span key={index}>{items[index]?.caption}</span>
        </p>
      )}
    </>
  );
}
