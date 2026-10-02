// Events for Google Tag Manager (GTM_ID in data/site.js). Safe to call anywhere in the browser: when GTM isn't
// loaded (local dev, Vercel previews) the events just wait in window.dataLayer.

export function trackEvent(event, params = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

// A lead reached the business (GA4's recommended "generate_lead" event). In GTM, a Custom Event trigger on
// "generate_lead" can fire the GA4 event / conversion tags; lead_source tells the forms apart.
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
