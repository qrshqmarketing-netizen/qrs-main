'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { PhoneIcon } from '@/components/ui/icons';
import SiteLink from '@/components/ui/SiteLink';
import { PHONE, TEL } from '@/data/site';
import { START_PATH } from '@/data/start';
import './MobileActionBar.css';

const HIDE_ON = [START_PATH, '/thank-you/'];
const SHOW_AFTER_PX = 480; // once the hero's own buttons have scrolled away

// Phones and small tablets: a slim bar fixed to the bottom with the two actions a visitor on a phone wants, call and get advice. It slides in
// after the hero has scrolled by, steps aside while the request form is on screen, and the other floating pieces (chat bubble, review pop-up,
// cookie notice) lift above it through --bar-h. Not shown from 901px up, where the header carries both actions.
export default function MobileActionBar() {
  const pathname = usePathname();
  const [past, setPast] = useState(false);
  const [formOnScreen, setFormOnScreen] = useState(false);
  const hidden = HIDE_ON.includes(pathname);
  const show = past && !formOnScreen && !hidden;

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setFormOnScreen(false);
    const form = document.getElementById('roof-check');
    if (!form || !('IntersectionObserver' in window)) return undefined;
    const watcher = new IntersectionObserver(([entry]) => setFormOnScreen(entry.isIntersecting), { threshold: 0.1 });
    watcher.observe(form);
    return () => watcher.disconnect();
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    const apply = () => root.style.setProperty('--bar-h', show && window.matchMedia('(max-width: 900px)').matches ? '68px' : '0px');
    apply();
    window.addEventListener('resize', apply);
    return () => {
      window.removeEventListener('resize', apply);
      root.style.setProperty('--bar-h', '0px');
    };
  }, [show]);

  if (hidden) return null;
  return (
    <div className={'mab' + (show ? ' show' : '')} aria-hidden={!show} inert={!show}>
      <a className="btn btn-plum" href={TEL} aria-label={`Call ${PHONE}`}>
        <PhoneIcon /> Call
      </a>
      <SiteLink className="btn btn-gold" href="#roof-check">
        Get Pro Advice <span className="arrow">→</span>
      </SiteLink>
    </div>
  );
}
