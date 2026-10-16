'use client';

import { useEffect, useRef, useState } from 'react';
import Mark from '@/components/ui/Mark';
import { BRAND_FILM } from '@/data/brandFilm';
import './StudioFilm.css';

// "QRS in a minute" (owner, October 16 2026): the brand film, recreated from zaro.ai's launch film (the owner's reference, analysed with ffmpeg)
// in QRS's words, colors and photos. It is rendered from scripts/brand-film/film.html (render.mjs + encode.sh) into public/videos/qrs-film.*
// (VP9 WebM first, H.264 MP4 for Safari), 62 seconds, with an original synthesized soundtrack (scripts/brand-film/music.mjs, royalty-free).
// No autoplay (owner's choice): the poster and a large play button; nothing is fetched until the visitor presses play, and then it plays with
// sound (the tap allows it), with Pause, Sound and Restart buttons. It pauses if it scrolls out of view and goes back to the play button at the end.
// Every claim in the film is one the site already makes; its name, description and files are in data/brandFilm.js (shared with the home page's
// VideoObject structured data and the AI files).
const { sources: SOURCES, poster: POSTER, description: DESCRIPTION, heading: HEADING, name: NAME, length: LENGTH } = BRAND_FILM;

const PlayIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg>;

export default function StudioFilm() {
  const frame = useRef(null);
  const video = useRef(null);
  const loaded = useRef(false);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const load = () => {
    const v = video.current;
    if (!v || loaded.current) return;
    loaded.current = true;
    for (const { src, type } of SOURCES) {
      const s = document.createElement('source');
      s.src = src;
      s.type = type;
      v.appendChild(s);
    }
    v.load();
  };

  useEffect(() => {
    const v = video.current;
    const el = frame.current;
    if (!v || !el) return undefined;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => { setStarted(false); v.currentTime = 0; };
    const onVolume = () => setMuted(v.muted);
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    v.addEventListener('ended', onEnded);
    v.addEventListener('volumechange', onVolume);
    // Pause when it scrolls out of view (it never starts on its own)
    const seen = new IntersectionObserver(([e]) => { if (!e.isIntersecting && !v.paused) v.pause(); }, { threshold: 0.15 });
    seen.observe(el);
    return () => {
      seen.disconnect();
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
      v.removeEventListener('ended', onEnded);
      v.removeEventListener('volumechange', onVolume);
      v.pause();
    };
  }, []);

  // Pressed by the visitor, so sound is allowed; a browser that still refuses it plays muted instead
  const play = () => {
    const v = video.current;
    if (!v) return;
    load();
    setStarted(true);
    v.play().catch(() => { v.muted = true; v.play().catch(() => {}); });
  };
  const toggle = () => { const v = video.current; if (!v) return; if (v.paused) play(); else v.pause(); };
  const sound = () => { const v = video.current; if (v) v.muted = !v.muted; };
  const restart = () => { const v = video.current; if (!v) return; v.currentTime = 0; play(); };

  return (
    <section className="st-section st-film" aria-labelledby="st-film-title">
      <div className="container">
        <div className="st-split st-head">
          <p className="st-label">{NAME}</p>
          <h2 id="st-film-title"><Mark text={HEADING} /></h2>
        </div>
        <div className={'st-film-frame' + (started ? ' is-started' : '')} ref={frame} data-no-reveal="">
          <video ref={video} playsInline preload="none" poster={POSTER} aria-describedby="st-film-desc" disablePictureInPicture onClick={started ? toggle : undefined} />
          <p id="st-film-desc" className="sr-only">{DESCRIPTION}</p>
          {!started && (
            <button type="button" className="st-film-play" onClick={play} aria-label={`Play the film, ${LENGTH}, with sound`}>
              <span className="st-film-play-icon"><PlayIcon /></span>
              <span className="st-film-play-text">Watch the film <small>{LENGTH} · sound on</small></span>
            </button>
          )}
          {started && (
            <div className="st-film-ctrl">
              <button type="button" className="st-film-btn" onClick={toggle} aria-label={playing ? 'Pause the film' : 'Play the film'}>
                {playing ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
                ) : (
                  <PlayIcon />
                )}
                <span>{playing ? 'Pause' : 'Play'}</span>
              </button>
              <button type="button" className="st-film-btn" onClick={sound} aria-pressed={muted} aria-label={muted ? 'Turn the sound on' : 'Turn the sound off'}>
                {muted ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" /><path d="m16 9 5 6m0-6-5 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" /><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                )}
                <span>{muted ? 'Sound on' : 'Mute'}</span>
              </button>
              <button type="button" className="st-film-btn st-film-re" onClick={restart} aria-label="Play the film from the start">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
