'use client';

// The hero logo's randomized entrance (owner, October 29 2026). This inline script sits right after the wordmark and runs while the page is
// still being parsed, before the first paint: it gives every piece (the mark's three shapes and the seven letters of QUALITY, each marked
// data-wm) its own random start (direction, distance, spin, size), delay and speed, in a <style> it adds to <head>, and puts `hg-wm-in` on
// <html> (which has suppressHydrationWarning) so the CSS animation (HomeGradient.css, "Hero logo") plays. Every load is different. Nothing
// for reduced motion: the logo is simply there. As with ThemeScript, a client re-render gets an inert text/plain copy.
const CODE = `(function(){try{
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var r=function(a,b){return a+Math.random()*(b-a)},css='',n=document.querySelectorAll('.hg-wordmark [data-wm]').length;
for(var i=0;i<n;i++){var a=Math.random()*6.2832,d=r(.45,1.25);
css+='.hg-wordmark [data-wm="'+i+'"]{--wx:'+(Math.cos(a)*d).toFixed(2)+'em;--wy:'+(Math.sin(a)*d*.7).toFixed(2)+'em;--wr:'+r(-70,70).toFixed(0)+'deg;--ws:'+r(.25,.8).toFixed(2)+';--wd:'+r(0,.75).toFixed(2)+'s;--wt:'+r(.85,1.35).toFixed(2)+'s}';}
var s=document.createElement('style');s.id='hg-wm-random';s.textContent=css;document.head.appendChild(s);
document.documentElement.classList.add('hg-wm-in');
}catch(e){}})();`;

export default function WordmarkScript() {
  return <script suppressHydrationWarning type={typeof window === 'undefined' ? undefined : 'text/plain'} dangerouslySetInnerHTML={{ __html: CODE }} />;
}
