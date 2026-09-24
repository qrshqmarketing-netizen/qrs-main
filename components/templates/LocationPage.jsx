import Breadcrumbs from '@/components/sections/Breadcrumbs';
import Faq from '@/components/sections/Faq';
import FinalCta from '@/components/sections/FinalCta';
import Guarantee from '@/components/sections/Guarantee';
import Hero from '@/components/sections/Hero';
import LocalIntro from '@/components/sections/LocalIntro';
import NearbyAreas from '@/components/sections/NearbyAreas';
import Process from '@/components/sections/Process';
import ProofBar from '@/components/sections/ProofBar';
import RoofCheck from '@/components/sections/RoofCheck';
import ServiceArea from '@/components/sections/ServiceArea';
import Services from '@/components/sections/Services';
import Testimonials from '@/components/sections/Testimonials';
import WhyQrs from '@/components/sections/WhyQrs';
import { HOME, LOCATIONS_LINK } from '@/data/catalog';
import { cityPath } from '@/data/locations';

// Hero photos rotate across city pages until each city has its own
const PHOTOS = [
  { src: '/images/home-hero-drone-view.webp', position: 'center 40%' },
  { src: '/images/roof-drone-palms.webp', position: 'center 45%' },
];

// A city page (e.g. /locations/pasadena/): the home page's sections with local copy from data/locationPages.js
export default function LocationPage({ location, page, index = 0 }) {
  const { city, slug } = location;
  const photo = page.image ? { src: page.image } : PHOTOS[index % PHOTOS.length];
  const crumbs = [HOME, LOCATIONS_LINK, { label: city, href: cityPath(slug) }];
  return (
    <main id="top">
      <Hero
        eyebrow={`${city} Roofing · Roof Repair & Replacement`}
        title={page.hero.heading}
        sub={page.hero.sub}
        image={photo.src}
        imagePosition={photo.position}
        label={`QRS roofing in ${city}`}
      />
      <ProofBar />
      <div className="crumb-bar">
        <div className="container">
          <Breadcrumbs items={crumbs} />
        </div>
      </div>
      <LocalIntro city={city} heading={page.intro.heading} paragraphs={page.intro.paragraphs} neighborhoods={page.neighborhoods} considerations={page.considerations} />
      <Services title={`Roofing Services in ${city}`} about={false} />
      <Faq heading={`${city} Roofing FAQs`} sub={`Straight answers for ${city} homeowners.`} faqs={page.faqs} />
      <Process />
      <WhyQrs />
      <Testimonials />
      <RoofCheck />
      <ServiceArea heading={`Roofing Near ${city}`} sub={`${city} is one of the Los Angeles and Orange County cities we serve. Check your ZIP code or explore the map.`} focus={slug} />
      <Guarantee />
      <NearbyAreas city={city} nearby={page.nearby} />
      <FinalCta heading={page.final.heading} text={page.final.text} />
    </main>
  );
}
