import CommercialHotspots from '@/components/blog/CommercialHotspots';
import LayerDiagram from '@/components/blog/LayerDiagram';
import ResidentialHotspots from '@/components/blog/ResidentialHotspots';
import Mark from '@/components/ui/Mark';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import './ServiceStory.css';

// A roof illustration on a service page (data/roofDiagrams.js): the flat commercial roof or a home's shingle roof with a pin at each place leaks
// start, or the tile roof cross-section with a pin for each cause. Same studio layout as the service story: small label at the left, heading, a line of text, the
// interactive picture with its cards, and a link to the article it comes from.
const LABELS = {
  flat: 'A flat commercial roof: a parapet wall, a drain, a seam, a rooftop unit on its curb, a vent pipe, a skylight, a blistered patch of membrane and an open edge. Numbered pins mark where leaks tend to start.',
  home: 'The front of a house with a shingle roof: a chimney, a skylight, a vent pipe, a dormer with its valleys and step flashing, a lifted shingle, a nail pop and the drip edge. Numbered pins mark where leaks tend to start.',
  tile: 'Cross-section of a tile roof: tiles, underlayment, roof deck and rafters, with a vent pipe, its flashing and a valley. Numbered pins mark where each cause of a leak can start.',
};

export default function RoofDiagram({ diagram }) {
  if (!diagram) return null;
  return (
    <section className="st-section sv-diagram" aria-labelledby="sv-diagram-heading">
      <div className="container">
        <div className="sv-split sv-head">
          <p className="sv-label">{diagram.label}</p>
          <div>
            <h2 id="sv-diagram-heading"><Mark text={diagram.heading} /></h2>
            <p className="sv-text">{diagram.text}</p>
          </div>
        </div>
        <div className="sv-diagram-art">
          {diagram.kind === 'tile' ? (
            <LayerDiagram items={diagram.items} label={LABELS.tile} />
          ) : diagram.kind === 'home' ? (
            <ResidentialHotspots items={diagram.items} label={LABELS.home} />
          ) : (
            <CommercialHotspots items={diagram.items} label={LABELS.flat} />
          )}
        </div>
        {diagram.article && (
          <SiteLink className="sv-diagram-link" href={diagram.article.href}>
            {diagram.article.label} <ArrowRight />
          </SiteLink>
        )}
      </div>
    </section>
  );
}
