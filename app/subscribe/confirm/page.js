import { emailFromConfirmToken } from '@/lib/newsletter';
import { BUSINESS, PHONE, TEL } from '@/data/site';
import '@/components/home/QrsHome.css';
import '../../search/search.css';

// The page behind the confirmation link in the newsletter sign-up email (lib/newsletter.js). A button confirms it, so a mail scanner opening the
// link can't subscribe anyone. Noindex.
export const metadata = { title: 'Confirm your subscription', robots: { index: false, follow: false } };

export default async function ConfirmSubscriptionPage({ searchParams }) {
  const { t = '', done } = (await searchParams) || {};
  const email = emailFromConfirmToken(t);
  return (
    <main id="top" className="qh srch">
      <section className="qh-hero srch-hero" aria-labelledby="sub-h1">
        <div className="qh-wrap">
          <h1 id="sub-h1">{done ? 'You’re subscribed' : 'Confirm your subscription'}</h1>
          {!email ? (
            <p className="srch-count">That link isn’t valid. You can sign up again from the bottom of any page, or call {PHONE}.</p>
          ) : done ? (
            <p className="srch-count">{email} will get an email when {BUSINESS.name} publishes a new article. Every email has an unsubscribe link.</p>
          ) : (
            <>
              <p className="srch-count">Send the latest articles from {BUSINESS.name} to {email}?</p>
              <form className="srch-form" method="post" action={`/api/subscribe/confirm/?t=${encodeURIComponent(t)}`}>
                <button type="submit">Yes, subscribe me</button>
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
