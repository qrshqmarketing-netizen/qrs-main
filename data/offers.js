// The offer card beside the estimate form (components/sections/RoofCheck.jsx): a free drone roof evaluation for
// homes, with the optional $199 Roof Check (a tune-up), or a roof survey request for commercial properties.
// llms.txt and the OKF bundle describe the same offers.

export const OFFERS = {
  home: {
    eyebrow: 'Free roof evaluation',
    price: 'Free',
    heading: 'Before you talk replacement.',
    text: 'We use drone footage to see the real condition of your roof. The evaluation costs nothing, and there’s no obligation.',
    points: [
      { title: 'No charge.', text: 'The drone roof evaluation is free.' },
      { title: 'Photo documentation.', text: 'See what we see, in plain English.' },
      { title: 'Clear next step.', text: 'Repair, monitor, maintain or replace.' },
      { title: 'Optional $199 Roof Check.', text: 'Only if you want it: a tune-up where we seal the vents, pipes and flashings.' },
      { title: 'Credited toward replacement.', text: 'The $199 counts toward the price if you move forward.' },
      { title: 'Pay after the visit.', text: 'No deposit for the Roof Check.' },
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
