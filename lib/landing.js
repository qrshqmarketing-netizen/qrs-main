// The "focus" pages: the request steps (/start/) and the paid-ad landing pages (data/pages/landing.js). On these the header shows only the logo,
// the theme switch and the phone, the footer only its small print, and the chat bubble, Instant Quote tab and El Niño pop-up stay away, so
// nothing pulls a visitor off the form.
import { START_PATH } from '@/data/start';
import { PROMO_LANDING_PATH } from '@/data/promo';
import { QUOTE_PAGE_PATH } from '@/data/pages/freeRoofEstimate';

export const LANDING_PATHS = ['/lp/residential/', '/lp/commercial/', '/lp/emergency/', PROMO_LANDING_PATH];
const norm = (p) => (p ? (p.endsWith('/') ? p : `${p}/`) : '');
export const isLandingPath = (path) => LANDING_PATHS.includes(norm(path));
// The Free Online Roof Estimate page (/free-roof-estimate/) is a focus page too: the estimator is the page, so the header and footer are
// the limited ones and the side tab stays away (it would open a second copy of the same tool)
export const isQuotePath = (path) => norm(path) === QUOTE_PAGE_PATH;
export const isFocusPath = (path) => norm(path) === START_PATH || isQuotePath(path) || isLandingPath(path);
