'use client';

import { useRouter } from 'next/navigation';

// A link to a section like #roof-check. If that section isn't on the current page,
// it goes to the home page section instead (so header, footer and widget links work everywhere).
export default function SmartAnchor({ href, onClick, ...props }) {
  const router = useRouter();

  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    const id = href.slice(1);
    if (id && !document.getElementById(id)) {
      e.preventDefault();
      router.push('/' + href);
    }
  };

  return <a href={href} onClick={handleClick} {...props} />;
}
