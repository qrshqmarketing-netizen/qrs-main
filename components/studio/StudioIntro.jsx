import Mark from '@/components/ui/Mark';
import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';

// The belief statement (owner, October 15 2026, after the story approach of maben.com.au: one confident first-person statement and one "learn more"
// link; the facts it used to list are now each said once, in "How we work", StudioHowWeWork.jsx). The lead is the About page's own line.
const LEAD = 'At QRS, a roofer should look at your roof before anyone tries to __sell__ you one.';
const MORE = [
  'That’s how every job starts: a free roof evaluation, photos of what we find and a written scope and price before any work begins. Every [roof replacement](/roof-replacement/), [roof repair](/roof-repair/), [tile lift & relay](/residential-roofing/tile-roofing/lift-and-relay/) and [flat](/residential-roofing/flat-roofing/) or [shingle roof](/residential-roofing/shingle-roofing/) across [Southern California](/service-areas/) gets the same care.',
];

// "Who we are": a small section label at the left, the large belief statement at the right, one quiet paragraph and one link.
export default function StudioIntro() {
  return (
    <section className="st-section st-intro">
      <div className="container st-split">
        <p className="st-label">Who we are</p>
        <div>
          <p className="st-lead"><Mark text={LEAD} /></p>
          <div className="st-cols">
            {MORE.map((p) => (
              <p key={p}>
                <Rich text={p} />
              </p>
            ))}
          </div>
          <SiteLink className="st-link" href="/about-us/">
            More about QRS <ArrowRight />
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
