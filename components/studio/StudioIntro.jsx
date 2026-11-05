import Mark from '@/components/ui/Mark';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import Rich from '@/components/ui/Rich';
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
          {/* Bigger paragraph (owner, October 16 2026). The word-by-word GSAP reveal (WordReveal.jsx, kept in the code) was turned off for speed
              on November 5 2026: it loaded GSAP and ScrollTrigger, whose frame loop ran for as long as the page was open */}
          <div className="st-cols st-intro-reveal">
            {MORE.map(T).map((text) => (
              <p key={text}>
                <Rich text={text} />
              </p>
            ))}
          </div>
          <SiteLink className="st-link" href="/about-us/">
            {T('More about QRS')} <ArrowRight />
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
