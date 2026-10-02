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
        { label: 'Inspections', href: '/roof-inspection/#flat-roofs' },
      ],
    },
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
    text: 'Roofing subcontracting for GCs, builders and property managers, under our name or yours.',
    cta: 'Partner with us',
    href: '/contractors/',
  },
};

// Service areas, grouped by county with a curated set of city pages.
export const LOCATIONS_MENU = {
  regions: REGIONS.map((r) => {
    const featuredCities = r.slug === 'la-county'
      ? ['los-angeles', 'santa-monica', 'pasadena', 'long-beach']
      : ['anaheim', 'irvine', 'huntington-beach', 'newport-beach'];

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
