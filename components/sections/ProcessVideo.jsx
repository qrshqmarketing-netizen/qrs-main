'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PROCESS_VIDEO } from '@/data/site';

// Placeholder frame that swaps in the YouTube player when clicked (set the video in data/site.js)
export default function ProcessVideo() {
  const [playing, setPlaying] = useState(false);
  const { embed, poster } = PROCESS_VIDEO;

  if (playing) {
    const src = embed + (embed.includes('?') ? '&' : '?') + 'autoplay=1';
    return (
      <div className="vid-frame" style={{ cursor: 'default' }}>
        <iframe src={src} title="QRS process video" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen></iframe>
      </div>
    );
  }

  return (
    <button className="vid-frame" id="vidFrame" type="button" aria-label="Play the QRS process video" onClick={() => embed && setPlaying(true)}>
      {poster && <Image src={poster} alt="" fill sizes="(min-width: 901px) 540px, 100vw" />}
      <span className="vid-play" aria-hidden="true"></span>
      <span className="vid-tag">QRS process video</span>
    </button>
  );
}
