'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// The Instant Quote (the side tab, the drawer and the roof-measuring and price code, about 20 KB compressed) isn't part of
// every page's first load. It's fetched once the page has settled and the browser is idle (not on data-saver connections),
// or right away when someone taps one of its buttons first: that tap is remembered and the drawer opens as soon as it's here.
const InstantQuote = dynamic(() => import('./InstantQuote'), { ssr: false });

export default function InstantQuoteLoader() {
  const [load, setLoad] = useState(false);
  const [opener, setOpener] = useState(null); // the button tapped before the drawer was ready
  const ready = useRef(false);

  useEffect(() => {
    const onClick = (e) => {
      if (ready.current) return; // the drawer is mounted and handles its own buttons
      const button = e.target.closest?.('[data-rm-open]');
      if (!button) return;
      e.preventDefault();
      setOpener(button);
      setLoad(true);
    };
    document.addEventListener('click', onClick);

    let idle, timer;
    const whenSettled = () => {
      if (navigator.connection?.saveData) return;
      if ('requestIdleCallback' in window) idle = requestIdleCallback(() => setLoad(true), { timeout: 4000 });
      else timer = setTimeout(() => setLoad(true), 2500);
    };
    if (document.readyState === 'complete') whenSettled();
    else window.addEventListener('load', whenSettled, { once: true });

    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('load', whenSettled);
      if ('requestIdleCallback' in window) cancelIdleCallback(idle);
      clearTimeout(timer);
    };
  }, []);

  return load ? <InstantQuote openFrom={opener} onReady={() => { ready.current = true; }} /> : null;
}
