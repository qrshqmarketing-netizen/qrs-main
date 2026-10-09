import Image from 'next/image';
import SiteLink from '@/components/ui/SiteLink';
import Rich from '@/components/ui/Rich';
import { ArrowRight } from '@/components/ui/icons';

// One photo card of a CardSlider: title at the top, line and round arrow at the bottom, the whole card is the link.
// card: { title, text, href, scene, image? }
export default function SliderCard({ card }) {
  return (
    <li className="cs-slide">
      <SiteLink className={`cs-card art ${card.scene || 'scene-shingle'}`} href={card.href}>
        {card.image && <Image src={card.image} alt="" fill sizes="(min-width: 901px) 31vw, (min-width: 621px) 46vw, 82vw" quality={60} />}
        <span className="cs-top"><h3><Rich text={card.title} /></h3></span>
        <span className="cs-bottom">
          {card.text && <p>{card.text}</p>}
          <i className="cs-go" aria-hidden="true"><ArrowRight /></i>
        </span>
      </SiteLink>
    </li>
  );
}
