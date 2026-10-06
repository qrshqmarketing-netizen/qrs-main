import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';
import './QrsStandard.css';
import Mark from '@/components/ui/Mark';

const ABOUT = [
  'At Quality Roofing Specialists, we believe roofing should be detail-first. As a licensed, bonded and insured California contractor since 2020, our crews bring the same care to every [roof replacement](/roof-replacement/), roof repair, [tile lift & relay](/residential-roofing/tile-roofing/lift-and-relay/) and [flat](/residential-roofing/flat-roofing/) or [shingle roof](/residential-roofing/shingle-roofing/) — with clear scopes, no pressure and no mystery pricing.',
  'Before any work starts, you get a written scope and price. We document what we find with photos, explain it in plain English and back our installs with a 10-year workmanship warranty. Straightforward, honest work from a local roofing team across [Southern California](/service-areas/).',
  'Not sure what your roof needs? Start with a free roof evaluation.',
];

// "The QRS Standard" — home page only, sits above the Services carousel (see app/page.js). ABOUT: two paragraphs (the columns), then the line above the button.
export default function QrsStandard() {
  return (
    <section className="section qrs-standard">
      <div className="container">
        <h2>The QRS <Mark text="__Standard__" /></h2>
        {/* The two paragraphs sit side by side from tablet width; the call-to-action line and button stay centered below */}
        <div className="qs-cols">
          {ABOUT.slice(0, 2).map((p) => (
            <p key={p}>
              <Rich text={p} />
            </p>
          ))}
        </div>
        <p className="qs-cta-line">
          <Rich text={ABOUT[2]} />
        </p>
        <SiteLink className="btn btn-gold" href="#roof-check">Get Pro Advice</SiteLink>
      </div>
    </section>
  );
}
