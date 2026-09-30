// Helpers for the simple Markdown in the data/ files: [words](/path/) makes a link and **words** makes bold.

export const RICH_TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|\*([^*\n]+)\*/g;

// Plain text (for structured data and counting words)
export const plainText = (text) => text.replace(RICH_TOKEN, (_, label, _href, bold, italic) => label ?? bold ?? italic);

// Standard Markdown with full web addresses (for llms.txt and the OKF bundle).
// Links to a spot on the same page, like [free roof evaluation](#roof-check), become plain text.
export const toMarkdown = (text, siteUrl) =>
  text.replace(RICH_TOKEN, (_, label, href, bold, italic) => {
    if (bold !== undefined) return `**${bold}**`;
    if (italic !== undefined) return `*${italic}*`;
    if (href.startsWith('#')) return label;
    return `[${label}](${href.startsWith('/') ? siteUrl + href : href})`;
  });
