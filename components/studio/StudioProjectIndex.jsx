'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import './StudioProjectIndex.css';

// The work named in a project's title: the words before the last " in " ("Round Flat Roof Replacement in Hollywood Hills West 90046")
const workOf = (title) => {
  const at = title.lastIndexOf(' in ');
  return at > 0 ? title.slice(0, at) : title;
};

// More projects as hairline rows (name and place, what was done, how many job photos, an arrow), adapted from the featured-projects list on fluid.glass. With a mouse, the
// hovered row's cover photo floats beside the pointer and follows it with a little lag (one fixed frame, transform only, drawn only while the list is
// hovered); the other rows fade back. On touch screens each row shows a small thumbnail instead. Every row is a plain link to the project page.
// projects: [{ path, title, label, image, photos (how many) }], trimmed by StudioProjects so the page doesn't send whole project files.
export default function StudioProjectIndex({ projects }) {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const preview = useRef(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0, frame: 0 });

  useEffect(() => () => cancelAnimationFrame(pos.current.frame), []);

  const follow = () => {
    const p = pos.current;
    p.x += (p.tx - p.x) * 0.18;
    p.y += (p.ty - p.y) * 0.18;
    if (preview.current) preview.current.style.transform = `translate3d(${p.x.toFixed(1)}px,${p.y.toFixed(1)}px,0)`;
    p.frame = Math.abs(p.tx - p.x) + Math.abs(p.ty - p.y) > 0.5 ? requestAnimationFrame(follow) : 0;
  };

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const p = pos.current;
    const box = preview.current?.getBoundingClientRect();
    // The photo sits to the right of the pointer, centered on it vertically
    p.tx = e.clientX + 28;
    p.ty = e.clientY - (box?.height || 0) / 2;
    if (!hover) {
      p.x = p.tx;
      p.y = p.ty;
      setHover(true);
    }
    if (!p.frame) p.frame = requestAnimationFrame(follow);
  };

  return (
    <div className={'spi' + (hover ? ' is-hover' : '')} onPointerMove={onMove} onPointerLeave={() => setHover(false)}>
      <p className="st-label spi-label">More projects</p>
      <ul className="spi-list">
        {projects.map((p, i) => (
          <li key={p.path}>
            <SiteLink className={'spi-row' + (i === active ? ' on' : '')} href={p.path} onPointerEnter={() => setActive(i)} onFocus={() => setActive(i)}>
              <span className="spi-thumb" aria-hidden="true">
                <Image src={p.image} alt="" fill sizes="72px" quality={60} loading="lazy" />
              </span>
              <span className="spi-name">{p.label}</span>
              <span className="spi-tags">
                <span>{workOf(p.title)}</span>
                {p.photos > 1 && <span>{p.photos} photos</span>}
              </span>
              <ArrowRight />
            </SiteLink>
          </li>
        ))}
      </ul>
      <div className="spi-preview" ref={preview} aria-hidden="true">
        {projects.map((p, i) => (
          <span className={'spi-pv' + (i === active ? ' on' : '')} key={p.path}>
            <Image src={p.image} alt="" fill sizes="380px" quality={60} loading="lazy" />
          </span>
        ))}
      </div>
    </div>
  );
}
