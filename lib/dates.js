// Plain-English date formatting shared across the site (footer, legal page, structured data, AI-facing text)

export const formatDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

// "Tuesday, October 14, 2026" (a visitor's preferred visit date, in the lead email and the confirmation email)
export const formatDay = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
