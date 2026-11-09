import { emailFromToken } from '@/lib/drips';
import { BUSINESS, PHONE, TEL } from '@/data/site';
import '@/components/home/QrsHome.css';
import '../search/search.css';

// The page behind the unsubscribe link in the campaign emails (lib/drips.js). A button confirms it (so a mail scanner opening the link can't
// unsubscribe anyone), then it confirms. Noindex.
export const metadata = { title: 'Unsubscribe', robots: { index: false, follow: false } };

export default async function UnsubscribePage({ searchParams }) {
  const { t = '', done } = (await searchParams) || {};
  const email = emailFromToken(t);
  return (
    <main id="top" className="qh srch">
      <section className="qh-hero srch-hero" aria-labelledby="un-h1">
        <div className="qh-wrap">
          <h1 id="un-h1">{done ? 'You’re unsubscribed' : 'Unsubscribe'}</h1>
          {!email ? (
            <p className="srch-count">That link isn’t valid. To stop our emails, reply to any of them with “unsubscribe”, or call {PHONE}.</p>
          ) : done ? (
            <p className="srch-count">{email} won’t get any more of these emails from {BUSINESS.name}. If you ever need a roofer, we’re at {PHONE}.</p>
          ) : (
            <>
              <p className="srch-count">Stop the roof-care emails from {BUSINESS.name} to {email}?</p>
              <form className="srch-form" method="post" action={`/api/unsubscribe/?t=${encodeURIComponent(t)}&from=page`}>
                <button type="submit">Unsubscribe</button>
              </form>
            </>
          )}
          <p className="srch-count">
            <a href={TEL} style={{ color: '#fff' }}>{PHONE}</a>
          </p>
        </div>
      </section>
    </main>
  );
}
