'use client';

import { COOKIE_SETTINGS_EVENT } from '@/lib/consent';
import useLang from './useLang';

// "Cookie settings" in the footer's small print: opens the cookie bar again at its settings (components/widgets/CookieNotice.jsx)
export default function CookieSettingsLink({ className }) {
  const { tr } = useLang();
  return (
    <button className={className} type="button" onClick={() => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))}>
      {tr('Cookie settings')}
    </button>
  );
}
