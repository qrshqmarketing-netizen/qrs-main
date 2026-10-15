'use client';

import { COOKIE_SETTINGS_EVENT } from '@/lib/consent';

// "Cookie settings" in the footer's small print: opens the cookie bar again at its settings (components/widgets/CookieNotice.jsx)
export default function CookieSettingsLink({ className }) {
  return (
    <button className={className} type="button" onClick={() => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))}>
      Cookie settings
    </button>
  );
}
