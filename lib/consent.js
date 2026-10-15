// Cookie choices (owner, October 15 2026): the cookie bar (components/widgets/CookieNotice.jsx) lets a visitor accept all, keep only the
// necessary ones, or pick in its settings. Two optional kinds, each a script loaded in app/layout.js:
//   analytics: Google Analytics (which pages are visited, counted anonymously)
//   clarity:   Microsoft Clarity (clicks and scrolling, to see where the site is hard to use)
// Necessary storage (the theme, the cookie choice itself, the request form's campaign tags) is always on.
// The choice is saved in localStorage under CONSENT_KEY as {"analytics":bool,"clarity":bool,"at":"<date>"}. With no choice yet both are on
// (California's opt-out rule, and the way the site worked before the settings existed), except in a browser that sends Global Privacy Control,
// where both start off. The layout's inline scripts read the same key before Google Analytics or Clarity start (keep them in step).
// A script that isn't allowed is never fetched. A change applies at once: Google's consent mode is updated, Clarity is told to stop (and clear
// its cookies) or to start, and a script newly allowed is loaded on the spot (window.__qrsLoadTracking, defined in app/layout.js).

export const CONSENT_KEY = 'qrs-consent';
export const CONSENT_EVENT = 'qrs:consent'; // fired with the new choice
export const COOKIE_SETTINGS_EVENT = 'qrs:cookie-settings'; // the footer's "Cookie settings" link opens the bar's settings

const OLD_OK_KEY = 'cookieNoticeOk'; // the old "Got it" button: counts as accepting all

export function storedConsent() {
  try {
    const saved = JSON.parse(localStorage.getItem(CONSENT_KEY));
    if (saved && typeof saved === 'object') return saved;
    // The old "Got it" only dismissed a notice: it counts as accepting all, unless the browser sends Global Privacy Control (then the bar asks again)
    if (localStorage.getItem(OLD_OK_KEY) && navigator.globalPrivacyControl !== true) return { analytics: true, clarity: true, at: null };
  } catch {}
  return null;
}

// What applies now: the saved choice, or the default
export function currentConsent() {
  const saved = storedConsent();
  if (saved) return { analytics: saved.analytics !== false, clarity: saved.clarity !== false };
  const gpc = typeof navigator !== 'undefined' && navigator.globalPrivacyControl === true;
  return { analytics: !gpc, clarity: !gpc };
}

export function saveConsent({ analytics, clarity }) {
  const choice = { analytics: Boolean(analytics), clarity: Boolean(clarity), at: new Date().toISOString().slice(0, 10) };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(choice));
  } catch {}
  applyConsent(choice);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
  return choice;
}

// Tell the scripts already on the page
function applyConsent({ analytics, clarity }) {
  if (typeof window.gtag === 'function') window.gtag('consent', 'update', { analytics_storage: analytics ? 'granted' : 'denied' });
  if (!analytics) {
    // Remove Google Analytics' own cookies (_ga, _ga_<id>) for this site
    document.cookie.split(';').map((c) => c.split('=')[0].trim()).filter((n) => n === '_ga' || n.startsWith('_ga_')).forEach((n) => {
      const host = location.hostname.replace(/^www\./, '');
      for (const domain of ['', `; domain=${host}`, `; domain=.${host}`]) document.cookie = `${n}=; Max-Age=0; path=/${domain}`;
    });
  }
  if (typeof window.clarity === 'function') window.clarity('consent', Boolean(clarity)); // false stops recording and clears Clarity's cookies
  window.__qrsLoadTracking?.(); // starts a script that was off and is now allowed (app/layout.js)
}
