import Rich from '@/components/ui/Rich';
import './QrsStandard.css';

const ABOUT = [
  'At Quality Roofing Specialists, we believe roofing should be detail-first. With 30+ years of roofing experience, our crews bring the same care to every [roof replacement](/roof-replacement/), roof repair, [tile lift & relay](/tile-roofing/lift-and-relay/) and [flat](/flat-roofing/) or [shingle roof](/shingle-roofing/) — with clear scopes, no pressure and no mystery pricing.',
  'Before any work starts, you get a written scope and price. We document what we find with photos, explain it in plain English and back our installs with a lifetime workmanship warranty. Straightforward, honest work from a local roofing team across [Southern California](/service-areas/).',
  'Not sure what your roof needs? Start with our roofer-led $199 Roof Check.',
];

// "The QRS Standard" — home page only, sits above the Services carousel (see app/page.js)
export default function QrsStandard() {
  return (
    <section className="section qrs-standard">
      <div className="container">
        <h2>The QRS Standard</h2>
        {ABOUT.map((p) => (
          <p key={p}>
            <Rich text={p} />
          </p>
        ))}
        <a className="btn btn-gold" href="#roof-check">Get Pro Advice</a>
      </div>
    </section>
  );
}
