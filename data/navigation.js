// Header menus and footer links.
// Pages such as /shingle-roofing/ aren't built yet: add one by creating app/shingle-roofing/page.js.

import { PHONE, TEL } from './site';

export const RESIDENTIAL_MENU = {
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
        { label: 'Tune-Ups', href: '/shingle-roofing/tune-up/' },
        { label: 'Roof Care', href: '/shingle-roofing/roof-care/' },
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
        { label: 'Inspections', href: '/tile-roofing/inspection/' },
        { label: 'Tune-Ups', href: '/tile-roofing/tune-up/' },
        { label: 'Roof Care', href: '/tile-roofing/roof-care/' },
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
        { label: 'Tune-Ups', href: '/flat-roofing/tune-up/' },
        { label: 'Roof Care', href: '/flat-roofing/roof-care/' },
      ],
    },
    {
      id: 'mega-metal',
      label: 'Metal Roofing',
      all: { label: 'All Metal Roofing', href: '/metal-roofing/' },
      links: [
        { label: 'Standing Seam', href: '/metal-roofing/standing-seam/' },
        { label: 'Rain Gutters', href: '/rain-gutters/' },
      ],
    },
  ],
  // Link under the roof types
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
    title: 'Contractors',
    text: 'For businesses that work with QRS (B2B).',
    cta: 'Partner with us',
    href: '/contractors/',
  },
};

// Links after the Residential / Commercial dropdowns
export const NAV_LINKS = [
  { label: 'Contractors', href: '/contractors/' },
  { label: 'How It Works', href: '#process' },
  { label: 'Why QRS', href: '#why' },
  { label: 'Careers', href: '/careers/' },
];

export const HEADER_CTA = { label: 'Get Pro Advice', href: '#roof-check' };

export const FOOTER = {
  main: [
    { label: 'Home', href: '#top' },
    { label: 'About QRS', href: '#why' },
    { label: 'Start a Roof Check', href: '#roof-check' },
    { label: 'Our Guarantee', href: '#guarantee' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Privacy Policy', href: '#' },
  ],
  services: [
    { label: 'Roofing Services', href: '#services' },
    { label: 'Service Area', href: '#service-area' },
  ],
  roofTypes: {
    title: 'Roof Types',
    links: [
      { label: 'Tile', href: '#services' },
      { label: 'Shingle', href: '#services' },
      { label: 'Flat', href: '#services' },
      { label: 'Tile Lift & Relay', href: '#services' },
    ],
  },
  contact: {
    title: 'Get In Touch',
    links: [
      { label: 'How It Works', href: '#process' },
      { label: PHONE, href: TEL },
      { label: 'LA + Orange County', href: '#service-area' },
    ],
  },
};
