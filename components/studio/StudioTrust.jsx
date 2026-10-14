import Mark from '@/components/ui/Mark';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import { CREDENTIALS_PAGE } from '@/data/pages/credentials';
import { BUSINESS, OFFICES, PHONE, TEL } from '@/data/site';
import { formatDate } from '@/lib/dates';

// Three home page sections added after a comparison with the owner's reference royalroofing.com (October 2026): "Why QRS" (four numbered reasons),
// the credentials strip (the license facts; no manufacturer logos on the home page, owner's choice) and "Giving back". Every fact here is one the site already states and the owner
// confirmed (data/site.js, the credentials page, the About page); nothing new is claimed. Styles: the "trust" block in Studio.css.

const office = (n) => (n === 1 ? 'one office' : `${n} offices`);

const REASONS = [
  {
    title: 'Family-owned and local',
    text: `QRS is a family-owned, woman-owned and locally owned business, with ${office(OFFICES.length)} across Southern California and one phone number that reaches them all.`,
  },
  {
    title: 'A roofer looks first, and it’s in writing',
    text: 'A trained in-house roofer looks at your roof, with drone footage of the areas of concern, and you get a written scope and price before any work starts.',
  },
  {
    title: 'Certified with the manufacturers we install',
    text: 'Owens Corning, IKO, GAF, CertainTeed and Polyglass: their roofing systems go on the way the manufacturer’s instructions say they should.',
    href: CREDENTIALS_PAGE.path,
  },
  {
    title: 'Licensed, permitted and warrantied',
    text: `A licensed, bonded and insured California contractor (CSLB #${BUSINESS.license}). We pull the permits, tarp the landscaping, sweep for nails every day, and back installs with a 10-year workmanship warranty.`,
  },
];

// "Why QRS": a label and heading at the left, the four reasons as numbered hairline rows at the right, then the two buttons
export function StudioWhy() {
  return (
    <section className="st-section st-why" aria-labelledby="why-qrs">
      <div className="container st-split">
        <p className="st-label">Why QRS</p>
        <div>
          <h2 id="why-qrs"><Mark text="Four things you get on every __roof__ we take on" /></h2>
          <ol className="st-why-list">
            {REASONS.map((r, i) => (
              <li key={r.title}>
                <span className="st-why-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                  {r.href && (
                    <SiteLink className="st-link" href={r.href}>
                      See our credentials <ArrowRight />
                    </SiteLink>
                  )}
                </div>
              </li>
            ))}
          </ol>
          <div className="st-why-actions">
            <SiteLink className="btn btn-gold" href="#roof-check">
              Get Pro Advice <span className="arrow">→</span>
            </SiteLink>
            <a className="btn btn-dark" href={TEL}>
              Call {PHONE}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// The credentials strip: the license and warranty facts, linking to /credentials/ (the manufacturer logos stay on that page: no logos on the home page)
export function StudioCredentials() {
  return (
    <section className="st-section st-creds" aria-labelledby="qrs-credentials">
      <div className="container">
        <div className="st-split st-head">
          <p className="st-label">Credentials</p>
          <h2 id="qrs-credentials"><Mark text="Licensed, insured and __certified__" /></h2>
        </div>
        <dl className="st-creds-facts">
          <div>
            <dt>CSLB license</dt>
            <dd>#{BUSINESS.license}</dd>
          </div>
          <div>
            <dt>Licensed since</dt>
            <dd>{formatDate(BUSINESS.licenseSince)}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>Licensed, bonded and insured</dd>
          </div>
          <div>
            <dt>Workmanship</dt>
            <dd>10-year warranty on installs</dd>
          </div>
        </dl>
        <SiteLink className="st-link" href={CREDENTIALS_PAGE.path}>
          See all our credentials <ArrowRight />
        </SiteLink>
      </div>
    </section>
  );
}

// "Giving back": the About page's own words about the community work, with a link there
export function StudioGiving({ text }) {
  return (
    <section className="st-section st-give" aria-labelledby="qrs-giving">
      <div className="container st-split">
        <p className="st-label">Community</p>
        <div>
          <h2 id="qrs-giving"><Mark text="Giving back where we __work__" /></h2>
          <p className="st-give-text">{text}</p>
          <SiteLink className="st-link" href="/about-us/">
            More about QRS <ArrowRight />
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
