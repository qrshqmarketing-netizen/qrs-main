import CardSlider from '@/components/ui/CardSlider';
import SliderCard from '@/components/ui/SliderCard';
import '@/components/ui/CardSlider.css';
import './CardGrid.css';

// Row of page cards for hub pages, as a horizontal slider. The whole card is the link.
// cards: [{ title, text, href, scene, image? }]
export default function CardGrid({ id, heading, intro, cards = [], tone }) {
  return (
    <section className={'card-grid' + (tone === 'wash' ? ' card-grid-wash' : '')} id={id}>
      <div className="container">
        {(heading || intro) && (
          <div className="section-head">
            {heading && <h2>{heading}</h2>}
            {intro && <p>{intro}</p>}
          </div>
        )}
        <CardSlider label={heading}>
          {cards.map((card) => <SliderCard card={card} key={card.href} />)}
        </CardSlider>
      </div>
    </section>
  );
}
