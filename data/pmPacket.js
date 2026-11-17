// The property manager roof packet (owner, November 17 2026): a two-page PDF lead magnet on /commercial-roofing/property-managers/
// (components/sections/PmPacket.jsx). The PDF is the owner's file, kept as given at public/files/qrs-property-manager-roofing-packet-v2.pdf
// (a new file name if it ever changes: images and files are cached). A request posts to app/api/pm-packet/route.js, which saves it as a lead
// (source "pm-packet", shown as "Property manager packet" in the CRM, the sheet and the lead email) and emails the PDF (lib/pmPacket.js).
export const PM_PACKET_FILE = '/files/qrs-property-manager-roofing-packet-v2.pdf';
export const PM_PACKET_FILENAME = 'QRS-Property-Manager-Roofing-Packet.pdf';

// "Buildings you manage": the choices the form offers and the API accepts
export const PM_BUILDING_COUNTS = ['1', '2 to 5', '6 to 20', 'More than 20'];

export const PM_PACKET = {
  heading: 'Get the property manager roof __packet__',
  lede: 'A two-page PDF you can forward to owners and your vendor team. It explains how our Portfolio Roof Assessment works and gives your accounts payable team the vendor details they ask for.',
  pages: ['Portfolio Roof Assessment', 'Vendor Information Sheet'],
  caption: 'PDF, 2 pages',
  points: [
    ['How the assessment works', ', from your building list to a photo report you can send to owners'],
    ['A 5-year roof budget outlook', ' that ranks every roof by condition and priority'],
    ['What happens when a tenant reports a leak', ', step by step'],
    ['A vendor information sheet', ' with license, warranty and the documents we provide for onboarding'],
  ],
  formTitle: 'Email me the packet',
  formIntro: 'We send the PDF to your inbox. A roofer follows up only if you want to schedule an assessment.',
  button: 'Email me the packet',
  doneTitle: 'Packet sent',
  doneText: 'Check your inbox for an email from Quality Roofing Specialists with the PDF. If it isn’t there in a few minutes, look in your spam folder.',
  doneNext: 'Ready to schedule an assessment? Reply to that email with your building list, or call us.',
  download: 'Download the PDF now',
  alt: 'Rather talk to a roofer now?',
};

// The email that carries the packet (lib/pmPacket.js)
export const PM_PACKET_EMAIL = {
  subject: 'Your property manager roof packet from Quality Roofing Specialists',
  intro: 'Here is the property manager roof packet you asked for. It is attached as a PDF, and you can also download it here:',
  inside: [
    'Page 1: how our Portfolio Roof Assessment works, from your building list to a photo report you can send to owners, with a 5-year roof budget outlook.',
    'Page 2: our vendor information sheet, what happens when a tenant reports a leak, and how we work on occupied buildings.',
  ],
  next: 'Ready to schedule an assessment? Reply to this email with your building list (addresses, roof types if known, and any active leaks or tenant complaints), or call us at {phone}.',
  notYou: 'You’re getting this email because this address was entered to request our property manager roof packet. If that wasn’t you, you can ignore it.',
};
