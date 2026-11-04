import Mark from '@/components/ui/Mark';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import WordReveal from './WordReveal';
import { th } from '@/lib/langHome';

// The belief statement (owner, October 15 2026, after the story approach of maben.com.au: one confident first-person statement and one "learn more"
// link; the facts it used to list are now each said once, in "How we work", StudioHowWeWork.jsx). The lead is the About page's own line.
const LEAD = 'At QRS, a roofer should look at your roof before anyone tries to __sell__ you one.';
const MORE = [
  'That’s how every job starts: a free roof evaluation, photos of what we find and a written scope and price before any work begins. Every [roof replacement](/roof-replacement/), [roof repair](/roof-repair/), [tile lift & relay](/residential-roofing/tile-roofing/lift-and-relay/) and [flat](/residential-roofing/flat-roofing/) or [shingle roof](/residential-roofing/shingle-roofing/) across [Southern California](/service-areas/) gets the same care.',
];

// "Who we are": a small section label at the left, the large belief statement at the right, one quiet paragraph and one link.
// lang: 'es' on the Spanish home page (/es/), with the words from data/i18n/esHome.js
export default function StudioIntro({ lang = 'en' }) {
  const T = (x) => th(lang, x);
  return (
    <section className="st-section st-intro">
      <div className="container st-split">
        <p className="st-label">{T('Who we are')}</p>
        <div>
          <p className="st-lead"><Mark text={T(LEAD)} /></p>
          {/* Bigger, and each word lights up as it scrolls through (GSAP, WordReveal; owner, October 16 2026) */}
          <WordReveal className="st-cols st-intro-reveal" paragraphs={MORE.map(T)} />
          <SiteLink className="st-link" href="/about-us/">
            {T('More about QRS')} <ArrowRight />
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
