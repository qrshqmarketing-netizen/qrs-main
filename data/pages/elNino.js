// The El Niño landing page (/el-nino-roof-check/, app/el-nino-roof-check/page.js): where the El Niño popup and the home page's El Niño card lead.
// The page is the promo card itself (components/widgets/PromoCard.jsx, copy in data/promo.js) with a quick request form beside it. The copy uses only what
// the site already says: a free roofer-led drone evaluation, photos, a written scope and price before any work. No price, no response time, no guarantee.
// The page is noindex (a campaign page, not something to find in search) and left out of the sitemap and the AI files.
import { PROMO_LANDING_PATH } from '../promo';

export const EL_NINO_PAGE = {
  path: PROMO_LANDING_PATH,
  keyword: 'El Niño roof inspection',
  metaTitle: 'Free El Niño Roof Inspection in Los Angeles & Orange County',
  metaDescription:
    'Book a free El Niño roof inspection in Los Angeles and Orange County: a roofer-led drone evaluation, photos and a written scope before any work.',
  hero: {
    text: 'Book your free El Niño roof inspection: a roofer looks at your whole roof with drone footage and shows you what we find, in plain English, before the storms arrive.',
    points: ['Free roofer-led drone evaluation', 'Photos of what we find', 'Written scope and price before any work'],
  },
};
