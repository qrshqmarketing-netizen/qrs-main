// The "focus" pages: the request steps (/start/) and the paid-ad landing pages (data/pages/landing.js). On these the header shows only the logo,
// the theme switch and the phone, the footer only its small print, and the chat bubble, Instant Quote tab and El Niño pop-up stay away, so
// nothing pulls a visitor off the form.
import { START_PATH } from '@/data/start';
import { PROMO_LANDING_PATH } from '@/data/promo';

export const LANDING_PATHS = ['/lp/residential/', '/lp/commercial/', PROMO_LANDING_PATH];
const norm = (p) => (p ? (p.endsWith('/') ? p : `${p}/`) : '');
export const isLandingPath = (path) => LANDING_PATHS.includes(norm(path));
export const isFocusPath = (path) => norm(path) === START_PATH || isLandingPath(path);
