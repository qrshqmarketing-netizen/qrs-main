// Google reviews shown in the reviews slider and the pop-up in the bottom-left corner.
// `color` is the avatar circle behind the first letter of the name. Use \n for a line break.
// `url` should be that reviewer's own Google Maps contributor link; when we don't have it yet, it falls
// back to the business's Google Maps listing (BUSINESS.mapUrl) so the link is still real, not made up.

import { BUSINESS } from './site';

export const GOOGLE_REVIEWS = [
  {
    name: 'Samuel Mcilwee',
    url: 'https://www.google.com/maps/contrib/115147678689801256373/reviews?hl=en',
    date: '2 months ago',
    color: '#1a73e8',
    text: 'Quality roofing specialist exceeded my expectations from start to finish. The crew showed up on time, explained everything clearly, and the quality of the work was outstanding. They were professional, honest, and left the property spotless when the job was done. It’s hard to find reliable contractor in LA, but these guys definitely earned my trust. I highly recommend them to anyone looking for quality roofing work. Five stars all the way!',
  },
  {
    name: 'Jose Linarez',
    url: 'https://www.google.com/maps/contrib/102718464346249352342/reviews?hl=en',
    date: 'a month ago',
    color: '#188038',
    text: 'I was looking to replace my shingles roof in Encino and contacted a few roofing companies in the neighborhood. Out of four roofers, Quality Roofing Specialist was the only one that worked with my budget as well as my schedule. Their work was fantastic, and we love the outcome. They exceeded my expectations. I will definitely recommend to friends.',
  },
  {
    name: 'Liron Yosef',
    url: 'https://www.google.com/maps/contrib/111665289099234876835/reviews?hl=en',
    date: '3 weeks ago',
    color: '#c5221f',
    text: 'Tony was very responsive when I called. The entire process was faster than I expected. With his continuous supervision the whole project went so smoothly and professionally, the place was cleaned up completely.\nI have a beautiful roof now :)',
  },
  {
    name: 'Kelsey Breadmont',
    url: 'https://www.google.com/maps/contrib/114865948403606358586/reviews?hl=en',
    date: '4 months ago',
    color: '#e37400',
    text: 'I was recommended this roofing company by a friend, and I’m really glad I went with them. I had a problem with water leaking into my attic from the flashing around the chimney, and the team was very helpful from the start. Tony was the roofer working with me, and he was always professional and friendly. He took care of resealing the flashing and chimney, which made the leak much better right away. He kept in touch with me after the work, and now we’re working on sealing the chimney even more to make sure everything is perfect. I feel confident that the team will get everything fixed up right. Based on my experience so far, I’d definitely give them five stars. Thanks to everyone there for their hard work!',
  },
  {
    name: 'Angel',
    url: 'https://www.google.com/maps/contrib/102028739882392972084/reviews?hl=en',
    date: '4 months ago',
    color: '#9334e6',
    text: 'We trusted Tony for a full roof replacement. They showed up early each day, worked efficiently, and kept us updated. I appreciated the patience in answering our concerns about materials and warranty. The new roof looks sharp and already makes the home feel more energy-efficient.',
  },
  {
    name: 'Stella Ink LA',
    url: 'https://www.google.com/maps/contrib/101679338833707223729/reviews?hl=en',
    date: 'a month ago',
    color: '#007b83',
    text: 'We had a great experience with Quality Roofing Specialist. Tony, the project manager, was awesome to work with. He kept us updated, answered all our questions, and made sure everything went smoothly. The crew did a great job, and the final result looks amazing. I would definitely recommend Tony and the whole team',
  },
  {
    name: 'Emilee Crowley',
    url: BUSINESS.mapUrl,
    date: '3 months ago',
    color: '#d81b60',
    text: 'We had an awesome experience with the crew of Quality Roofing. I called around to get quotes for a roof replacement and they gave me much better quote than the other roofing companies. Definitely within the budget and did a perfect job. No mess, they cleaned everything at the end',
  },
  {
    name: 'Noam Nahori',
    url: BUSINESS.mapUrl,
    date: '2 months ago',
    color: '#3949ab',
    text: 'We recently had our roof replaced by Quality Roofing Specialists, and the entire experience was excellent. The crew arrived on time every day, kept the property clean, and finished the project exactly as promised. The quality of the workmanship is outstanding, and the new roof looks amazing. If you’re looking for a reliable roofing contractor, I highly recommend this company.',
  },
  {
    name: 'Cynthia Pina',
    url: BUSINESS.mapUrl,
    date: '5 months ago',
    color: '#616161',
    text: 'Tony went above and beyond my expectations!! He was available immediately to inspect the roof and gave a great deal. He definitely worked with our budget. I highly recommend Quality Roofing for any roof repair you may need:)',
  },
];
