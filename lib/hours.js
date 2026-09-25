// Business hours in plain English, from BUSINESS.hours in data/site.js: "Monday–Friday 8 am–7 pm"

const time = (t) => {
  const [h, m] = t.split(':').map(Number);
  return `${h % 12 || 12}${m ? `:${String(m).padStart(2, '0')}` : ''} ${h < 12 ? 'am' : 'pm'}`;
};
const dayRange = (days) => (days.length > 1 ? `${days[0]}–${days.at(-1)}` : days[0]);

// [{ days: 'Monday–Friday', time: '8 am–7 pm' }, ...]
export const hoursList = (hours) => hours.map((h) => ({ days: dayRange(h.days), time: `${time(h.opens)}–${time(h.closes)}` }));
export const hoursText = (hours) => hoursList(hours).map((h) => `${h.days} ${h.time}`).join('; ');
