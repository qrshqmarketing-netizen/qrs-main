// Plain-English date formatting shared across the site (footer, legal page, structured data, AI-facing text)

export const formatDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
