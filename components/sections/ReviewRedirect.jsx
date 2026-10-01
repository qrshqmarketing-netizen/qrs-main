'use client';

import { useEffect, useState } from 'react';

export default function ReviewRedirect({ location, platform, url }) {
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    let redirected = false;
    let fallbackTimer;

    const redirect = () => {
      if (redirected) return;
      redirected = true;
      window.location.replace(url);
    };

    fallbackTimer = window.setTimeout(redirect, 1800);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'review_outbound_click',
      review_location: location,
      review_platform: platform.toLowerCase(),
      link_url: url,
      link_domain: new URL(url).hostname,
      outbound: true,
      eventCallback: () => {
        window.clearTimeout(fallbackTimer);
        redirect();
      },
      eventTimeout: 1500,
    });
    setRedirecting(true);

    return () => window.clearTimeout(fallbackTimer);
  }, [location, platform, url]);

  return (
    <main className="container section" aria-live="polite">
      <h1>{redirecting ? 'Opening your review page…' : 'Preparing your review page…'}</h1>
      <p>
        If you aren’t redirected, <a href={url}>continue to {platform} to leave a review for our {location} team</a>.
      </p>
    </main>
  );
}
