'use client';

import { useRouter } from 'next/navigation';

// A link to a section like #roof-check. If that section isn't on the current page,
// it goes to `fallback` if given (the estimate form's link: /start/), else to the home page section (so header, footer and widget links work everywhere).
export default function SmartAnchor({ href, fallback, onClick, ...props }) {
  const router = useRouter();

  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    const id = href.slice(1);
    if (id && !document.getElementById(id)) {
      e.preventDefault();
      router.push(fallback || '/' + href);
    }
  };

  return <a href={href} onClick={handleClick} {...props} />;
}
