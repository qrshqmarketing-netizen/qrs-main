import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import { BUSINESS, OFFICES } from '@/data/site';

const LEAD =
  'At Quality Roofing Specialists, we believe roofing should be detail-first: clear scopes, no pressure and no mystery pricing, from a licensed, bonded and insured California contractor.';
const MORE = [
  'Before any work starts, you get a written scope and price. We document what we find with photos, explain it in plain English and back our installs with a 10-year workmanship warranty. Straightforward, honest work from a local roofing team across [Southern California](/service-areas/).',
  'Every [roof replacement](/roof-replacement/), roof repair, [tile lift & relay](/residential-roofing/tile-roofing/lift-and-relay/) and [flat](/residential-roofing/flat-roofing/) or [shingle roof](/residential-roofing/shingle-roofing/) gets the same care.',
];
const STATS = [
  { value: '10', unit: 'year', label: 'Workmanship warranty' },
  { value: String(OFFICES.length), unit: '', label: 'Southern California offices' },
  { value: String(new Date(BUSINESS.licenseSince).getUTCFullYear()), unit: '', label: 'Licensed California contractor since' },
];

// "The QRS standard": a small section label at the left, a large lead statement at the right, then two quiet paragraphs, three numbers and one link.
export default function StudioIntro() {
  return (
    <section className="st-section st-intro">
      <div className="container st-split">
        <p className="st-label">The QRS standard</p>
        <div>
          <p className="st-lead">{LEAD}</p>
          <div className="st-cols">
            {MORE.map((p) => (
              <p key={p}>
                <Rich text={p} />
              </p>
            ))}
          </div>
          <dl className="st-stats">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt>
                  {s.value}
                  {s.unit && <small>{s.unit}</small>}
                </dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
          <SiteLink className="st-link" href="#roof-check">
            Start with a free roof evaluation <ArrowRight />
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
