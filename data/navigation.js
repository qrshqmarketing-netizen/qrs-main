// Header menus and footer links.
// Menu links with `urgent: true` get a red dot (emergency pages).
// Links starting with # jump to a section: on pages without that section they go to the home page's section.

import { citiesIn, cityPath, REGIONS, regionPath } from './locations';
import { PHONE, PRIVACY_POLICY_URL, TEL } from './site';

// Roof Repair, Replacement, Inspection, Emergency and Maintenance Plans: shown in their own
// top-level "Services" menu (below), not nested under Residential, since they serve every roof type.
export const SERVICES_MENU = {
  title: 'Roofing Services',
  links: [
    { label: 'Roof Repair', href: '/roof-repair/' },
    { label: 'Roof Replacement', href: '/roof-replacement/' },
    { label: 'Roof Inspection', href: '/roof-inspection/' },
    { label: 'Emergency & Storm Damage', href: '/emergency-roof-repair/', urgent: true },
    { label: 'Roof Tune-Ups', href: '/roof-tune-ups/' },
    { label: 'Roof Maintenance Plans', href: '/roof-maintenance-plans/' },
  ],
};

export const RESIDENTIAL_MENU = {
  // First tab: shown first when the menu opens
  groups: [
    {
      id: 'mega-shingle',
      label: 'Shingle Roofing',
      all: { label: 'All Shingle Roofing', href: '/shingle-roofing/' },
      links: [
        { label: 'Roof Replacement', note: 'Full tear-off', href: '/shingle-roofing/replacement/' },
        { label: 'Roof Repairs', href: '/shingle-roofing/repairs/' },
        { label: 'New Installations', href: '/shingle-roofing/installation/' },
        { label: 'Inspections', href: '/shingle-roofing/inspection/' },
      ],
    },
    {
      id: 'mega-tile',
      label: 'Tile Roofing',
      all: { label: 'All Tile Roofing', href: '/tile-roofing/' },
      links: [
        { label: 'Roof Replacement', note: 'New tile roof', href: '/tile-roofing/replacement/' },
        { label: 'Roof Repairs', href: '/tile-roofing/repairs/' },
        { label: 'Lift & Relay', note: 'Reset & re-paper', href: '/tile-roofing/lift-and-relay/' },
        { label: 'Slate Tile Roofing', href: '/tile-roofing/slate/' },
        { label: 'Concrete Tile Roofing', href: '/tile-roofing/concrete/' },
        { label: 'Inspections', href: '/tile-roofing/inspection/' },
      ],
    },
    {
      id: 'mega-flat',
      label: 'Flat Roofing',
      all: { label: 'All Flat Roofing', href: '/flat-roofing/' },
      links: [
        { label: 'Roof Replacement', note: 'Full tear-off', href: '/flat-roofing/replacement/' },
        { label: 'Roof Repairs', href: '/flat-roofing/repairs/' },
        { label: 'New Installations', href: '/flat-roofing/installation/' },
        { label: 'Inspections', href: '/flat-roofing/inspection/' },
      ],
    },
  ],
  // Links under the roof types
  hub: {
    title: 'All Residential Roofing',
    note: 'Every roof type and service we offer',
    href: '/residential-roofing/',
  },
  feature: {
    title: 'HOA & Multi-Family',
    note: 'Multi-family & multi-tenant properties',
    href: '/hoa-multi-family/',
  },
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
      { label: 'Emergency & Storm Damage', href: '/emergency-roof-repair/', urgent: true },
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

// Service areas, grouped by region (regions and cities come from data/locations.js)
export const LOCATIONS_MENU = {
  regions: REGIONS.map((r) => ({
    title: r.name,
    href: regionPath(r.slug),
    links: citiesIn(r.slug).map((l) => ({ label: l.city, href: cityPath(l.slug) })),
  })),
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
      { label: 'Customer Reviews', href: '/reviews/' },
      { label: 'Our Guarantee', href: '/about-us/#guarantee' },
      { label: 'Projects', href: '/projects/' },
      { label: 'Roofing Blog', href: '/blog/' },
      { label: 'Contact Us', href: '/contact-us/' },
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

// Footer: four short columns. Pages that dropped out of the header (Projects, Contractors) live here.
export const FOOTER = {
  columns: [
    {
      title: 'Company',
      links: [
        { label: 'About QRS', href: '/about-us/' },
        { label: 'Projects', href: '/projects/' },
        { label: 'Reviews', href: '/reviews/' },
        { label: 'Roofing Blog', href: '/blog/' },
        { label: 'Careers', href: '/careers/' },
        { label: 'Contractors', href: '/contractors/' },
        { label: 'MCP Server', href: '/mcp/' },
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
  ],
};
