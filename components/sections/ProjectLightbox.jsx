'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, CloseIcon } from '@/components/ui/icons';
import './ProjectLightbox.css';

// Full-screen photo lightbox for the project bento grid (see ProjectGallery.jsx). `photos`: the flat list of
// projects that have a real photo; `index`: which one is open (null = closed). `caption`: a project → label function.
export default function ProjectLightbox({ photos, caption, index, onClose, onNavigate }) {
  const dialogRef = useRef(null);
  const open = index != null;
  const photo = open ? photos[index] : null;
  const prev = () => onNavigate((index - 1 + photos.length) % photos.length);
  const next = () => onNavigate((index + 1) % photos.length);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index]);

  if (!open) return null;

  // Rendered straight onto <body> so it always sits above everything, regardless of any ancestor section's
  // own stacking context (e.g. .tile-pattern's isolation:isolate)
  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={photo.title} onClick={onClose}>
      <div className="lightbox-inner" ref={dialogRef} tabIndex={-1} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="lightbox-close" aria-label="Close photo" onClick={onClose}>
          <CloseIcon />
        </button>

        <div className="lightbox-photo">
          <Image
            key={photo.image}
            src={photo.image}
            alt={photo.alt || photo.title}
            fill
            sizes="100vw"
            style={photo.position ? { objectPosition: photo.position } : undefined}
            priority
          />
        </div>

        {photos.length > 1 && (
          <>
            <button type="button" className="lightbox-nav lightbox-prev" aria-label="Previous photo" onClick={prev}>
              <ArrowLeft />
            </button>
            <button type="button" className="lightbox-nav lightbox-next" aria-label="Next photo" onClick={next}>
              <ArrowRight />
            </button>
          </>
        )}

        <div className="lightbox-caption">
          <div>
            <span>{caption(photo)}</span>
            <h3>{photo.title}</h3>
          </div>
          {photos.length > 1 && (
            <p className="lightbox-count">
              {index + 1} / {photos.length}
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
