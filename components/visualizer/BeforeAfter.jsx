'use client';

import { useState } from 'react';

// Two pictures on top of each other with a handle to drag: the visitor's own photo (before) and the preview (after). A range input drives it, so it
// works with a finger, a mouse and the arrow keys.
export default function BeforeAfter({ before, after, alt }) {
  const [at, setAt] = useState(55);
  return (
    <div className="viz-ba" style={{ '--at': `${at}%` }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after} alt={`${alt}: new roof preview`} />
      <div className="viz-ba-before">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={before} alt={`${alt}: your photo`} />
      </div>
      <span className="viz-ba-tag before">Your photo</span>
      <span className="viz-ba-tag after">New roof</span>
      <span className="viz-ba-bar" aria-hidden="true"><i /></span>
      <input type="range" min="0" max="100" value={at} onChange={(e) => setAt(+e.target.value)} aria-label="Slide to compare your photo with the new roof" />
    </div>
  );
}
