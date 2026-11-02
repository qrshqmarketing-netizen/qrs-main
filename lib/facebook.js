// Facebook Page feed helpers (components/loc/FacebookFeed.jsx, app/api/facebook-check). The token as pasted in Vercel may carry extra text
// copied from Facebook's answer (quotes, brackets, the rest of the JSON): keep just the token itself (Facebook tokens start with EAA and are
// letters and digits), and the digits of the Page ID.
export const cleanToken = (raw = '') => (String(raw).match(/EAA[A-Za-z0-9]+/) || [String(raw).trim()])[0];
export const cleanPageId = (raw = '') => (String(raw).match(/\d{5,}/) || [String(raw).trim()])[0];
