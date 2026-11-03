import QuoteTrigger from '@/components/ui/QuoteTrigger';
import SiteLink from '@/components/ui/SiteLink';
import { PhoneIcon } from '@/components/ui/icons';
import { PHONE, TEL } from '@/data/site';
import './FinalCta.css';
import Mark from '@/components/ui/Mark';
import { t } from '@/lib/lang';

const TRUST = ['CSLB licensed, bonded & insured', '10-year workmanship warranty (call for details)', 'Google customer reviews'];

// Closing call to action above the footer: white copy on a navy gradient that deepens toward the footer, where the page's closing
// gradient carries on into gold (owner, October 29 2026: the WebGL contour lines of October 28 were removed; the job-site photo, CtaParallax, is no longer used), the main button plus a
// call button, and a short trust row. It stays full width as it scrolls into view (owner, October 29 2026: no longer opens from an inset card; data-expand is off). Pages can change the words and the main button (cta.style: 'gold', or
// 'plum' for a "call now" button — the separate call button is then left out). trust={false} hides the trust row.
export default function FinalCta({
  heading = 'Detail-First __Roofing__',
  text = 'At QRS, there’s no pressure, no mystery scope and no surprises — ever. Start with a roofer-led roof check today!',
  cta = { label: 'Get Pro Advice', href: '#roof-check' },
  trust = true,
  lang = 'en', // 'es' on the Spanish home page: the default words in Spanish, and no Instant Quote button (the quote tool is English)
}) {
  const T = (x) => t(lang, x);
  const isCall = cta.href.startsWith('tel:');
  return (
    <section className="final">
      <div className="container final-inner">
        <h2><Mark text={T(heading)} /></h2>
        <p>{T(text)}</p>
        <div className="final-actions">
          <SiteLink className={`btn btn-${cta.style || 'gold'}`} href={cta.href}>
            {isCall && <PhoneIcon />}
            {T(cta.label)}
            {!isCall && <span className="arrow">→</span>}
          </SiteLink>
          {!isCall && (
            <a className="btn btn-light" href={TEL}>
              <PhoneIcon />
              {T('Call {phone}').replace('{phone}', PHONE)}
            </a>
          )}
          {!isCall && lang === 'en' && <QuoteTrigger />}
        </div>
        {trust && (
          <ul className="final-trust">
            {TRUST.map((item) => (
              <li key={item}>{T(item)}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
