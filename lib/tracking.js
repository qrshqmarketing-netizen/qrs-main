// Events for Google Analytics 4 (GA_ID in data/site.js, loaded with gtag.js in app/layout.js). Safe to call anywhere in
// the browser: when gtag.js isn't loaded (local dev, Vercel previews) the events just wait in window.dataLayer.

// The same call as the gtag() in Google's snippet: gtag.js reads the `arguments` objects pushed to window.dataLayer,
// so this works even before the snippet has defined its own gtag()
export function gtag() {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

export const trackEvent = (event, params = {}) => gtag('event', event, params);

// A lead reached the business (GA4's recommended "generate_lead" event); mark it as a key event in GA4.
// lead_source tells the forms apart.
export const trackLead = (leadSource) => trackEvent('generate_lead', { lead_source: leadSource });

// The estimate form opens /thank-you/ after a delivered request and the event fires there (LeadConversion), so the
// conversion and the thank-you page view land together. The note lives in sessionStorage for this one hop.
const LEAD_KEY = 'qrs-lead';
export function rememberLead(leadSource) {
  try {
    sessionStorage.setItem(LEAD_KEY, leadSource);
    return true;
  } catch {
    return false; // storage blocked: the caller reports the lead itself
  }
}
export function takeRememberedLead() {
  try {
    const source = sessionStorage.getItem(LEAD_KEY);
    sessionStorage.removeItem(LEAD_KEY);
    return source;
  } catch {
    return null;
  }
}
