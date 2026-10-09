import Image from 'next/image';
import SiteLink from '@/components/ui/SiteLink';
import CircledWord from '@/components/ui/HandCircle';
import Rich from '@/components/ui/Rich';
import { ArrowRight } from '@/components/ui/icons';

// One photo card of a CardSlider: title at the top, line and round arrow at the bottom, the whole card is the link.
// card: { title, text, href, scene, image? }
// The card's title, with its first word circled by hand (a plain-text title only; titles with a product name or a link stay as they are)
function CardTitle({ title }) {
  const m = typeof title === 'string' && !/[*\[\]]/.test(title) ? /^([A-Za-z][A-Za-z'’-]{3,})(\s[\s\S]*)?$/.exec(title) : null;
  if (!m) return <Rich text={title} />;
  return (
    <>
      <CircledWord>{m[1]}</CircledWord>
      {m[2]}
    </>
  );
}

export default function SliderCard({ card }) {
  return (
    <li className="cs-slide">
      <SiteLink className={`cs-card art ${card.scene || 'scene-shingle'}`} href={card.href}>
        {card.image && <Image src={card.image} alt="" fill sizes="(min-width: 901px) 31vw, (min-width: 621px) 46vw, 82vw" quality={60} />}
        <span className="cs-top"><h3><CardTitle title={card.title} /></h3></span>
        <span className="cs-bottom">
          {card.text && <p>{card.text}</p>}
          <i className="cs-go" aria-hidden="true"><ArrowRight /></i>
        </span>
      </SiteLink>
    </li>
  );
}
