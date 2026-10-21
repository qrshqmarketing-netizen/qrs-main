import Image from 'next/image';
import Mark from '@/components/ui/Mark';
import './HomeNav.css';

// A full-width photo band with one heading and a two-column checklist (after publicstorage.com's "After 50 years, you learn what people
// want." band): what every job comes with, in a few words each. Only facts the site already states. image: { src, position }.
export default function CheckBand({ heading, items, image }) {
  return (
    <section className="cb" aria-labelledby="cb-title" data-no-reveal="">
      <Image className="cb-photo" src={image.src} alt="" fill sizes="100vw" quality={60} loading="lazy" style={{ objectPosition: image.position }} />
      <div className="cb-inner">
        <h2 id="cb-title">
          <Mark text={heading} />
        </h2>
        <ul className="cb-list">
          {items.map((item) => (
            <li key={item}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="1" y="1" width="22" height="22" rx="6" />
                <path d="m7 12.4 3.3 3.2L17.2 8.6" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
