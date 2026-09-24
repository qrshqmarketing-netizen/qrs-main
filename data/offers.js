// The offer card beside the estimate form (components/sections/RoofCheck.jsx): the $199 Roof Check for homes,
// or a roof survey request for commercial properties. llms.txt and the OKF bundle describe the same offers.

export const OFFERS = {
  home: {
    eyebrow: 'Roofer-led roof check',
    price: '$199',
    heading: 'Before you talk replacement.',
    text: 'Get a roofer to look at your roof before a salesperson tries to sell you one.',
    points: [
      { title: 'Roofer first.', text: 'Condition-focused visit — not a pitch.' },
      { title: 'Photo documentation.', text: 'See what we see, in plain English.' },
      { title: 'Clear next step.', text: 'Repair, monitor, maintain or replace.' },
      { title: 'Pay after the visit.', text: 'No deposit to start the inspection.' },
    ],
  },
  commercial: {
    eyebrow: 'Commercial, HOA & partner projects',
    heading: 'Start with a roofer-led roof survey.',
    text: 'Tell us about the building or project and we’ll start with a roofer’s look at the roof, not a sales pitch.',
    points: [
      { title: 'Roofer first.', text: 'Condition-focused survey of the roof.' },
      { title: 'Photo documentation.', text: 'Photos you can share with owners and tenants.' },
      { title: 'Written scope & price.', text: 'Before any work starts.' },
      { title: 'Clear next step.', text: 'Repair, maintain or replace, in plain English.' },
    ],
  },
};
