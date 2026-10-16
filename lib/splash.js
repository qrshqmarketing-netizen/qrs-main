// The opening splash on a first visit to the home page (components/widgets/Splash.jsx, components/ui/SplashScript.jsx, Splash.css).
// The decision is made by a small script in <head> before the first paint, so the splash is up from the very first frame and runs on CSS
// alone (no waiting for React). It shows only when the visitor's first page on the site is the home page (any page marks the visit as
// seen), never for search crawlers, Lighthouse, automated browsers or reduced motion, never on a link to a part of the page (#...) or the
// pop-up preview (?promo). ?splash on the home page shows it again; ?splash=hold keeps it up until window.__qrsSplashGo(0) is called (for design
// checks). Any scroll, key or tap skips it.
// Timing: the mark wipes in, the name and the gold line follow, then at HOLD_MS after the first frame the panel lifts away (LIFT_MS) and
// the hero's headline rises in. `splash-on` stays on <html> until the panel is gone, `splash-out` while the hero settles (not plain `splash`:
// that is the panel's own class).
export const SPLASH_KEY = 'qrs-splash';
export const SPLASH_DONE_EVENT = 'qrs:splash-done';
const HOLD_MS = 1500, LIFT_MS = 950, FAST_MS = 400, SETTLE_MS = 1500;
const BOT = 'bot|crawl|spider|slurp|google|bing|duckduck|baidu|yandex|facebookexternalhit|lighthouse|headlesschrome|pagespeed';

// The <head> script (kept in one string so SplashScript can inline it)
export const SPLASH_CODE = `(function(){try{
var d=document.documentElement,l=location,w=window,ls=w.localStorage,seen=ls.getItem('${SPLASH_KEY}'),force=/[?&]splash(=|&|$)/.test(l.search);
if(!seen)ls.setItem('${SPLASH_KEY}','1');
if(l.pathname!=='/'||(seen&&!force)||l.hash||/[?&]promo/.test(l.search)||navigator.webdriver||/${BOT}/i.test(navigator.userAgent)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
d.classList.add('splash-on');
var out=0,fin=function(){d.classList.remove('splash-on','splash-fast');w.__qrsSplashDone=1;w.dispatchEvent(new Event('${SPLASH_DONE_EVENT}'));setTimeout(function(){d.classList.remove('splash-out')},${SETTLE_MS});},
go=function(fast){if(out)return;out=1;['wheel','touchstart','keydown','pointerdown'].forEach(function(e){w.removeEventListener(e,skip,true)});d.classList.add('splash-out');if(fast)d.classList.add('splash-fast');setTimeout(fin,fast?${FAST_MS}:${LIFT_MS});},
skip=function(){go(1)};
['wheel','touchstart','keydown','pointerdown'].forEach(function(e){w.addEventListener(e,skip,{capture:true,passive:true})});
w.__qrsSplashGo=go;
if(/[?&]splash=hold/.test(l.search))return;
requestAnimationFrame(function(){setTimeout(function(){go(0)},${HOLD_MS})});
setTimeout(function(){go(1)},${HOLD_MS + 4000});
}catch(e){}})();`;

// Run `callback` once the splash is gone (at once when there is none). Returns a cleanup function for useEffect.
export function afterSplash(callback) {
  if (typeof window === 'undefined') return () => {};
  if (!document.documentElement.classList.contains('splash-on')) {
    callback();
    return () => {};
  }
  const handler = () => callback();
  window.addEventListener(SPLASH_DONE_EVENT, handler, { once: true });
  return () => window.removeEventListener(SPLASH_DONE_EVENT, handler);
}
