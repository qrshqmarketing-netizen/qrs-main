import FinalCta from '@/components/sections/FinalCta';
import Hero from '@/components/sections/Hero';
import Overview from '@/components/sections/Overview';
import ProcessSteps from '@/components/sections/ProcessSteps';
import RoofCheck from '@/components/sections/RoofCheck';
import WhyChoose from '@/components/sections/WhyChoose';
import JsonLd from '@/components/ui/JsonLd';
import { pageJsonLd } from '@/lib/structuredData';
import { LOCATION_CTA } from './shared';

// A service page (e.g. /tile-roofing/lift-and-relay/). Content shape: see data/services/*.js.
// crumbs: breadcrumb trail; eyebrow: section label above the H1; scenes: [heroArt, processArt] placeholder
// art until photos exist. actions: hero buttons (Hero); finalCta: the closing call to action (FinalCta props).
export default function ServicePage({ page, crumbs, eyebrow, scenes = [], offer, actions, finalCta = LOCATION_CTA }) {
  const [heroScene = 'scene-shingle', processScene = heroScene] = scenes;
  const schema = pageJsonLd({
    path: crumbs.at(-1).href,
    title: page.metaTitle,
    description: page.metaDescription,
    crumbs,
    service: { name: page.title, type: page.keyword, category: eyebrow },
    image: page.image,
  });
  return (
    <main id="top">
      <JsonLd data={schema} />
      <Hero
        crumbs={crumbs}
        eyebrow={eyebrow}
        title={page.title}
        intro={page.hero.intro}
        image={page.image}
        imageAlt={page.imageAlt}
        {...(actions && { actions })}
      />
      <Overview paragraphs={page.overview.paragraphs} />
      <ProcessSteps
        heading={page.process.heading}
        subheading={page.process.subheading}
        steps={page.process.steps}
        scene={processScene}
        image={page.process.image}
        imageAlt={page.process.imageAlt}
      />
      <WhyChoose heading={page.why.heading} intro={page.why.intro} points={page.why.points} />
      <RoofCheck tone="white" offer={offer} />
      <FinalCta {...finalCta} />
    </main>
  );
}
