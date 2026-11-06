// Header menus and footer links.
// Menu links with `urgent: true` get a red dot (emergency pages).
// Links starting with # jump to a section: on pages without that section they go to the home page's section.

import { citiesIn, cityPath, REGIONS, regionPath } from './locations';
import { PHONE, PRIVACY_POLICY_URL, TEL } from './site';

// Keep the broad service hubs and the highest-intent services easy to reach from one menu.
export const SERVICES_MENU = {
  title: 'Roofing Services',
  links: [
    { label: 'Residential Roofing', href: '/residential-roofing/' },
    { label: 'Commercial Roofing', href: '/commercial-roofing/' },
    { label: 'Roof Repair', href: '/roof-repair/' },
    { label: 'Roof Replacement', href: '/roof-replacement/' },
    { label: 'Roof Inspection', href: '/roof-inspection/' },
    { label: 'Emergency & Storm Damage', href: '/roof-repair/emergency/', urgent: true },
    { label: 'Roof Maintenance Plans', href: '/roof-maintenance-plans/' },
    { label: 'Roof Financing', href: '/roof-financing/' },
  ],
};

export const RESIDENTIAL_MENU = {
  // First tab: shown first when the menu opens
  groups: [
    {
      id: 'mega-shingle',
      label: 'Shingle Roofing',
      all: { label: 'All Shingle Roofing', href: '/residential-roofing/shingle-roofing/' },
      links: [
        { label: 'Roof Replacement', note: 'Full tear-off', href: '/residential-roofing/shingle-roofing/replacement/' },
        { label: 'Roof Repairs', href: '/residential-roofing/shingle-roofing/repair/' },
        { label: 'New Installations', href: '/residential-roofing/shingle-roofing/installation/' },
        { label: 'Inspections', href: '/roof-inspection/#shingle-roofs' },
      ],
    },
    {
      id: 'mega-tile',
      label: 'Tile Roofing',
      all: { label: 'All Tile Roofing', href: '/residential-roofing/tile-roofing/' },
      links: [
        { label: 'Roof Replacement', note: 'New tile roof', href: '/residential-roofing/tile-roofing/replacement/' },
        { label: 'Roof Repairs', href: '/residential-roofing/tile-roofing/repair/' },
        { label: 'Lift & Relay', note: 'Reset & re-paper', href: '/residential-roofing/tile-roofing/lift-and-relay/' },
        { label: 'Slate Tile Roofing', href: '/residential-roofing/tile-roofing/slate/' },
        { label: 'Concrete Tile Roofing', href: '/residential-roofing/tile-roofing/concrete/' },
        { label: 'Inspections', href: '/roof-inspection/#tile-roofs' },
      ],
    },
    {
      id: 'mega-flat',
      label: 'Flat Roofing',
      all: { label: 'All Flat Roofing', href: '/residential-roofing/flat-roofing/' },
      links: [
        { label: 'Roof Replacement', note: 'Full tear-off', href: '/residential-roofing/flat-roofing/replacement/' },
        { label: 'Roof Repairs', href: '/residential-roofing/flat-roofing/repair/' },
        { label: 'New Installations', href: '/residential-roofing/flat-roofing/installation/' },
        { label: 'Torch Down Roofing', href: '/residential-roofing/flat-roofing/torch-down/' },
        { label: 'Inspections', href: '/roof-inspection/#flat-roofs' },
      ],
    },
    // mega-metal (Metal Roofing) hidden for now (owner, November 2 2026)
  ],
  // Residential specialties are separate from the roof-material categories.
  hub: {
    title: 'All Residential Roofing',
    note: 'Every roof type and service we offer',
    href: '/residential-roofing/',
  },
  specialties: [
    {
      title: 'HOA & Multi-Family',
      note: 'Roofing for multi-family and multi-tenant properties',
      href: '/residential-roofing/hoa-multi-family/',
    },
    {
      title: 'Attic Ventilation',
      note: 'Vents and airflow for your attic',
      href: '/residential-roofing/attic-ventilation/',
    },
    {
      title: 'Cool Roofing',
      note: 'Cool roof shingles and reflective cap sheets',
      href: '/residential-roofing/cool-roofing/',
    },
  ],
  // Box on the right (wide screens only)
  promo: {
    title: 'Not sure what you need?',
    text: 'Start with a roofer-led inspection. Photo-documented, no pressure.',
    cta: { label: 'Get Pro Advice', href: '#roof-check' },
  },
};

export const COMMERCIAL_MENU = {
  services: {
    title: 'Commercial Services',
    links: [
      { label: 'Roof Repair', href: '/commercial-roofing/repair/' },
      { label: 'Roof Replacement', href: '/commercial-roofing/replacement/' },
      { label: 'TPO Roofing', href: '/commercial-roofing/tpo-roofing/' },
      { label: 'Inspection & Maintenance', href: '/commercial-roofing/maintenance/' },
      { label: 'Emergency & Storm Damage', href: '/roof-repair/emergency/', urgent: true },
    ],
  },
  buildings: {
    title: 'Commercial Buildings',
    href: '/commercial-roofing/',
    links: [
      { label: 'Office Buildings', href: '/commercial-roofing/office-buildings/' },
      { label: 'Retail', href: '/commercial-roofing/retail/' },
      { label: 'Churches', href: '/commercial-roofing/churches/' },
      { label: 'Industrial', href: '/commercial-roofing/industrial/' },
      { label: 'Shops', href: '/commercial-roofing/shops/' },
      { label: 'Warehouses', href: '/commercial-roofing/warehouses/' },
      { label: 'Malls', href: '/commercial-roofing/malls/' },
    ],
  },
  partner: {
    title: 'Contractors & White-Label',
    text: 'Roofing crews for contractors, builders and property management clients, under our name or yours.',
    cta: 'Partner with us',
    href: '/contractors/',
  },
};

// Service areas, grouped by county with a curated set of city pages.
export const LOCATIONS_MENU = {
  regions: REGIONS.map((r) => {
    const featuredCities = {
      'la-county': ['los-angeles', 'santa-monica', 'pasadena', 'long-beach'],
      'orange-county': ['huntington-beach', 'newport-beach'],
      'santa-clara-county': ['san-jose'],
    }[r.slug] || [];

    return {
      title: r.name,
      href: regionPath(r.slug),
      links: citiesIn(r.slug)
        .filter((city) => featuredCities.includes(city.slug))
        .map((city) => ({ label: city.city, href: cityPath(city.slug) })),
    };
  }),
  all: {
    title: 'All Service Areas',
    text: 'See every city we serve and check your ZIP code on the map.',
    cta: 'View the map',
    href: '/service-areas/',
  },
};

export const ABOUT_MENU = {
  about: {
    title: 'About QRS',
    href: '/about-us/',
    links: [
      { label: 'Why QRS', href: '/about-us/' },
      { label: 'Give a Review', href: '/reviews/' },
      { label: 'Our Guarantee', href: '/about-us/#guarantee' },
      { label: 'Roofing Blog', href: '/blog/' },
    ],
  },
  careers: {
    title: 'Careers',
    text: 'Join a detail-first crew doing roofing across Southern California.',
    cta: 'See roofing jobs',
    href: '/careers/',
  },
};

export const HEADER_CTA = { label: 'Get Pro Advice', href: '#roof-check' };

// The header menu (owner, November 2 2026, after the reference roofing site's menu): eight items in the bar from 1280px, four of them with a
// dropdown. Services is a wide panel with every service page in six groups; the others are short lists. Below 1280px the same items are
// collapsible groups in the menu panel, followed by HEADER_MORE. Metal roofing and gutters stay out while hidden. Only link pages that exist.
const R = '/residential-roofing/';
const C = '/commercial-roofing/';
// The dropdown menu of November 2 2026, kept for when it returns (owner, November 4 2026: the bar is back to the six flat links below)
export const HEADER_DROPDOWNS = [
  {
    label: 'Services',
    href: '/residential-roofing/',
    mega: true,
    groups: [
      { title: 'Roof Repair', links: [
        { label: 'All Roof Repair', href: '/roof-repair/' },
        { label: 'Shingle Roof Repair', href: `${R}shingle-roofing/repair/` },
        { label: 'Tile Roof Repair', href: `${R}tile-roofing/repair/` },
        { label: 'Flat Roof Repair', href: `${R}flat-roofing/repair/` },
        { label: 'Emergency Roof Repair', href: '/roof-repair/emergency/', urgent: true },
      ] },
      { title: 'Roof Replacement', links: [
        { label: 'All Roof Replacement', href: '/roof-replacement/' },
        { label: 'Shingle Roof Replacement', href: `${R}shingle-roofing/replacement/` },
        { label: 'New Shingle Roof Installation', href: `${R}shingle-roofing/installation/` },
        { label: 'Tile Roof Replacement', href: `${R}tile-roofing/replacement/` },
        { label: 'Tile Lift & Relay', href: `${R}tile-roofing/lift-and-relay/` },
        { label: 'Flat Roof Replacement', href: `${R}flat-roofing/replacement/` },
        { label: 'New Flat Roof Installation', href: `${R}flat-roofing/installation/` },
        { label: 'Torch Down Roof Installation', href: `${R}flat-roofing/torch-down/` },
      ] },
      { title: 'Roof Types', links: [
        { label: 'Shingle Roofing', href: `${R}shingle-roofing/` },
        { label: 'Tile Roofing', href: `${R}tile-roofing/` },
        { label: 'Concrete Tile Roofing', href: `${R}tile-roofing/concrete/` },
        { label: 'Slate Tile Roofing', href: `${R}tile-roofing/slate/` },
        { label: 'Flat Roofing', href: `${R}flat-roofing/` },
        { label: 'Attic Ventilation', href: `${R}attic-ventilation/` },
        { label: 'Cool Roofing', href: `${R}cool-roofing/` },
      ] },
      { title: 'Inspections & Care', links: [
        { label: 'Roof Inspection', href: '/roof-inspection/' },
        { label: 'Roof Maintenance Plans', href: '/roof-maintenance-plans/' },
        { label: 'Roof Tune-Ups', href: '/roof-maintenance-plans/#tune-up' },
        { label: 'Roof Financing', href: '/roof-financing/' },
      ] },
      { title: 'Commercial', links: [
        { label: 'All Commercial Roofing', href: C },
        { label: 'Commercial Roof Repair', href: `${C}repair/` },
        { label: 'Commercial Roof Replacement', href: `${C}replacement/` },
        { label: 'TPO Roofing', href: `${C}tpo-roofing/` },
        { label: 'Commercial Roof Maintenance', href: `${C}maintenance/` },
        { label: 'Offices', href: `${C}office-buildings/` },
        { label: 'Retail Stores', href: `${C}retail/` },
        { label: 'Churches', href: `${C}churches/` },
        { label: 'Industrial', href: `${C}industrial/` },
        { label: 'Warehouses', href: `${C}warehouses/` },
        { label: 'Shopping Centers', href: `${C}malls/` },
        { label: 'Shops & Small Business', href: `${C}shops/` },
      ] },
      { title: 'Property Types', links: [
        { label: 'Residential Roofing', href: R },
        { label: 'HOA & Multi-Family', href: `${R}hoa-multi-family/` },
        { label: 'Property Managers', href: `${C}property-managers/` },
        { label: 'For Contractors', href: '/contractors/' },
      ] },
    ],
  },
  {
    label: 'Service Areas',
    href: '/service-areas/',
    groups: [
      { title: 'Counties', links: [
        { label: 'Los Angeles County', href: '/service-areas/la-county/' },
        { label: 'Orange County', href: '/service-areas/orange-county/' },
        { label: 'Riverside County', href: '/service-areas/riverside-county/' },
        { label: 'San Bernardino County', href: '/service-areas/san-bernardino-county/' },
        { label: 'Santa Clara County', href: '/service-areas/santa-clara-county/' },
      ] },
      { title: 'Our offices', links: [
        { label: 'West Hollywood', href: '/service-areas/la-county/west-hollywood/' },
        { label: 'Woodland Hills', href: '/service-areas/la-county/woodland-hills/' },
        { label: 'Vernon', href: '/service-areas/la-county/vernon/' },
        { label: 'San Jose', href: '/service-areas/santa-clara-county/san-jose/' },
        { label: 'All Service Areas', href: '/service-areas/' },
      ] },
    ],
  },
  { label: 'Projects', href: '/projects/' },
  {
    label: 'Credentials',
    href: '/credentials/',
    groups: [
      { title: 'Credentials', links: [
        { label: 'License, Bonding & Insurance', href: '/credentials/' },
        { label: 'Manufacturer Certifications', href: '/credentials/#certifications' },
        { label: 'Reviews', href: '/reviews/' },
        { label: 'Our Team', href: '/about-us/#team' },
      ] },
    ],
  },
  {
    label: 'Roofing 101',
    href: '/blog/',
    groups: [
      { title: 'Learn', links: [
        { label: 'Roofing Blog', href: '/blog/' },
        { label: 'Roofing FAQ', href: '/roofing-faq/' },
        { label: 'Roofing Glossary', href: '/roofing-glossary/' },
        { label: 'Roof Inspection Checklist', href: '/blog/what-does-a-roof-inspection-include/' },
        { label: 'Roof Insurance Claims', href: '/blog/roof-insurance-claims-california/' },
      ] },
      { title: 'Guides', links: [
        { label: 'Tile Roof Guide', href: '/blog/tile-roof-guide-southern-california/' },
        { label: 'Flat Roof Guide', href: '/blog/flat-roofs-los-angeles-guide/' },
        { label: 'Asphalt Shingle Guide', href: '/blog/asphalt-shingle-roof-guide/' },
        { label: 'Roof Replacement Guide', href: '/blog/roof-replacement-guide/' },
      ] },
    ],
  },
  { label: 'Financing', href: '/roof-financing/' },
  {
    label: 'About',
    href: '/about-us/',
    groups: [
      { title: 'Company', links: [
        { label: 'About QRS', href: '/about-us/' },
        { label: 'Our Team', href: '/about-us/#team' },
        { label: 'Reviews', href: '/reviews/' },
        { label: 'Careers', href: '/careers/' },
        { label: 'For Contractors', href: '/contractors/' },
        { label: 'Contact', href: '/contact-us/' },
      ] },
    ],
  },
];
// The rest of the site, under the menu groups in the menu panel below 1280px (from 1280px there is no menu button: every page is in the bar's dropdowns)
// The bar (owner, November 4 2026: back to the flat links of before November 2): six hub links, no dropdowns; everything else is in the
// menu panel (HEADER_MORE), which the ☰ button opens at every width
export const HEADER_MENU = [
  { label: 'Residential', href: '/residential-roofing/' },
  { label: 'Commercial', href: '/commercial-roofing/' },
  { label: 'Roof Repair', href: '/roof-repair/' },
  { label: 'Replacement', href: '/roof-replacement/' },
  { label: 'Service Areas', href: '/service-areas/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Contact', href: '/contact-us/' }, // owner, November 6 2026
];
export const HEADER_MORE = [
  { label: 'Emergency Repair', href: '/roof-repair/emergency/', urgent: true },
  { label: 'About QRS', href: '/about-us/' },
  { label: 'Reviews', href: '/reviews/' },
  { label: 'Credentials', href: '/credentials/' },
  { label: 'Maintenance Plans', href: '/roof-maintenance-plans/' },
  { label: 'Financing', href: '/roof-financing/' },
  { label: 'Roofing Blog', href: '/blog/' },
  { label: 'Careers', href: '/careers/' },
  { label: 'For Contractors', href: '/contractors/' },
];
// Kept for anything that still lists the old six bar links
export const HEADER_LINKS = HEADER_MENU.map(({ label, href }) => ({ label, href }));

// Footer: four short columns.
export const FOOTER = {
  columns: [
    {
      title: 'Company',
      links: [
        { label: 'About QRS', href: '/about-us/' },
        { label: 'Projects', href: '/projects/' },
        { label: 'Give a Review', href: '/reviews/' },
        { label: 'Roofing Blog', href: '/blog/' },
        { label: 'Roofing FAQ', href: '/roofing-faq/' },
        { label: 'Roofing Glossary', href: '/roofing-glossary/' },
        { label: 'Credentials', href: '/credentials/' },
        { label: 'Careers', href: '/careers/' },
        { label: 'Contractors', href: '/contractors/' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Residential Roofing', href: '/residential-roofing/' },
        { label: 'Commercial Roofing', href: '/commercial-roofing/' },
        { label: 'Roof Repair', href: '/roof-repair/' },
        { label: 'Roof Replacement', href: '/roof-replacement/' },
        { label: 'Maintenance Plans', href: '/roof-maintenance-plans/' },
        { label: 'Roof Financing', href: '/roof-financing/' },
      ],
    },
    {
      title: 'Service Areas',
      links: [
        { label: 'All Service Areas', href: '/service-areas/' },
        ...REGIONS.map((r) => ({ label: r.name, href: regionPath(r.slug) })),
      ],
    },
    {
      title: 'Contact',
      links: [
        { label: PHONE, href: TEL },
        { label: 'Contact Us', href: '/contact-us/' },
        { label: 'Get Pro Advice', href: '#roof-check' },
      ],
    },
  ],
  // Small print under the columns. Privacy shows once PRIVACY_POLICY_URL is set in data/site.js (the cookie notice links there too).
  legal: [
    ...(PRIVACY_POLICY_URL ? [{ label: 'Privacy Policy', href: PRIVACY_POLICY_URL }] : []),
    { label: 'Terms & Conditions', href: '/terms-and-conditions/' },
    { label: 'Accessibility Statement', href: '/accessibility-statement/' },
    { label: 'MCP', href: '/mcp/', newTab: true }, // the site's MCP server, for AI agents; opens in a new tab
  ],
};
