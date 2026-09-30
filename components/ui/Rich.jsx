import { RICH_TOKEN } from '@/lib/richText';
import SiteLink from './SiteLink';

const PRODUCT_BRANDS = new Set([
  'HardShell',
  'TotalShield',
  'FlatGuard',
  'LockSeam',
  'LeakRescue',
  'RoofScan 360',
  'SecondLife',
  'RoofCare Plan',
  'ReserveReady',
]);
const PRODUCT_BRAND_PATTERN = new RegExp(`(${[...PRODUCT_BRANDS].sort((a, b) => b.length - a.length).join('|')})`, 'g');

function renderBrand(name, key, registeredMark) {
  return (
    <em className="product-brand" key={key}>
      {name}
      {registeredMark && <sup aria-label="registered trademark">®</sup>}
    </em>
  );
}

function renderText(text, keyPrefix, registeredMark = true) {
  const out = [];
  let last = 0;
  let index = 0;
  for (const match of text.matchAll(PRODUCT_BRAND_PATTERN)) {
    if (match.index > last) out.push(text.slice(last, match.index));
    out.push(renderBrand(match[0], `${keyPrefix}${index++}`, registeredMark));
    last = match.index + match[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.length ? out : text;
}

// Text from the data/ files can contain simple Markdown:
//   [words](/tile-roofing/)  → a link      **words** → bold      *words* → italic

export function renderRich(text, keyPrefix = 'r', registeredMark = true) {
  if (typeof text !== 'string') return text;
  const out = [];
  let last = 0;
  let n = 0;
  for (const m of text.matchAll(RICH_TOKEN)) {
    if (m.index > last) out.push(...renderText(text.slice(last, m.index), `${keyPrefix}plain${n}-`, registeredMark));
    const key = `${keyPrefix}${n++}`;
    out.push(
      m[1] !== undefined ? (
        <SiteLink className="text-link" href={m[2]} key={key}>{renderRich(m[1], `${key}-`, registeredMark)}</SiteLink>
      ) : m[3] !== undefined ? (
        <strong key={key}>{m[3]}</strong>
      ) : (
        PRODUCT_BRANDS.has(m[4]) ? renderBrand(m[4], key, registeredMark) : <em key={key}>{m[4]}</em>
      )
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(...renderText(text.slice(last), `${keyPrefix}plain${n}-`, registeredMark));
  return out;
}

export default function Rich({ text, registeredMark = true }) {
  return renderRich(text, 'r', registeredMark);
}
