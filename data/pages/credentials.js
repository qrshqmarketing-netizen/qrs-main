// Credentials page (/credentials/, app/credentials/page.js, layout components/sections/Credentials.jsx). Only owner-confirmed facts.
// Manufacturer programs: the five whose logos the owner supplied (October 2026: Owens Corning, IKO, GAF, CertainTeed Master Craftsman, Polyglass Premio Pro). Before publishing, confirm each program's exact name and level as the manufacturer
// words it, and put the logo file the manufacturer provides in public/images/badges/ (then set `logo` below). Manufacturers usually let only certified contractors
// show their logos. A card with no logo shows the name instead.
// CREDENTIALS_PUBLIC: false keeps the page out of search results, the sitemap, the AI files and the footer while it is reviewed; it still opens at its address.
import { BUSINESS } from '../site';
import { formatDate } from '@/lib/dates';

export const CREDENTIALS_PUBLIC = true;

export const CREDENTIALS_PAGE = {
  path: '/credentials/',
  keyword: 'roofing contractor credentials',
  metaTitle: 'Roofing Contractor Credentials: License & Certifications',
  metaDescription: `Our roofing contractor credentials: CSLB license #${BUSINESS.license}, licensed, bonded and insured, and our manufacturer certifications.`,
  hero: {
    heading: 'Roofing contractor credentials',
    intro: `Our roofing contractor credentials in one place: ${BUSINESS.legalName} is a licensed, bonded and insured California contractor (CSLB #${BUSINESS.license}, licensed since ${formatDate(BUSINESS.licenseSince)}), and certified with the roofing manufacturers whose systems we install.`,
    image: '/images/shingle-roof-installation-underlayment.webp',
    imageAlt: 'Roofers installing underlayment on a roof deck before the new shingles',
  },
  license: {
    heading: 'Licensed, bonded and __insured__',
    text: 'Our roofing contractor credentials start with the license. A California roofing contractor has to hold a license from the Contractors State License Board. Ours is current, and you can check it yourself on the board’s website.',
    facts: [
      { label: 'CSLB license', value: `#${BUSINESS.license}` },
      { label: 'Licensed since', value: formatDate(BUSINESS.licenseSince) },
      { label: 'Status', value: 'Licensed, bonded and insured' },
    ],
    verify: { label: 'Verify our license on the CSLB website', href: 'https://www.cslb.ca.gov/' },
  },
  manufacturers: {
    heading: 'Manufacturer __certifications__',
    intro: 'We are certified with the manufacturers whose roofing systems we install, so the work is done to their instructions.',
    items: [
      { id: 'owens-corning', name: 'Owens Corning', program: '', logo: '/images/badges/owens-corning.webp', width: 640, height: 562 },
      { id: 'iko', name: 'IKO', program: '', logo: '/images/badges/iko.webp', width: 596, height: 217 },
      { id: 'gaf', name: 'GAF', program: '', logo: '/images/badges/gaf.webp', width: 480, height: 480 },
      { id: 'certainteed', name: 'CertainTeed', program: 'Master Craftsman', logo: '/images/badges/certainteed.webp', width: 900, height: 506 },
      { id: 'polyglass', name: 'Polyglass', program: 'Premio Pro', logo: '/images/badges/polyglass.webp', width: 900, height: 163 },
    ],
  },
  standards: {
    heading: 'On every __job__',
    items: [
      { title: 'A 10-year workmanship warranty', text: 'Our installs are backed by a 10-year workmanship warranty (call for details). Roofing materials carry the manufacturer’s warranty, which depends on the product and its warranty tier.' },
      { title: 'Permits pulled', text: 'We pull the building permits when a roofing project needs one.' },
      { title: 'A roofer-led evaluation', text: 'A trained in-house roofer looks at your roof, in under an hour, with drone footage of the areas of concern, and you get a written scope and price before any work.' },
      { title: 'A clean site', text: 'Tarps over the landscaping, nail sweeps with a magnet, and cleanup at the end of every day.' },
    ],
  },
  faqs: [
    { q: 'Is Quality Roofing Specialists licensed?', a: `Yes. We are a licensed California contractor, CSLB license #${BUSINESS.license}, licensed since ${formatDate(BUSINESS.licenseSince)}. You can verify it on the Contractors State License Board website.` },
    { q: 'Are you bonded and insured?', a: 'Yes. We are licensed, bonded and insured as a California contractor.' },
    { q: 'Which roofing manufacturers are you certified with?', a: 'Owens Corning, IKO, GAF, CertainTeed (Master Craftsman) and Polyglass (Premio Pro).' },
    { q: 'What warranty comes with a new roof?', a: 'Our installs are backed by a 10-year workmanship warranty (call for details), and the roofing materials carry the manufacturer’s warranty, which depends on the product and its warranty tier. We go over yours with you at the final walkthrough.' },
  ],
};
