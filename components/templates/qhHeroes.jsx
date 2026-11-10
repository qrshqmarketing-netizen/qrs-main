import { QhHero, QhSurveyFrame } from '@/components/home/QrsSections';
import { RESIDENTIAL_TYPES } from '@/data/catalog';
import { cardFor } from '@/data/content';
import { heroOutcome } from '@/data/heroOutcomes';
import { HERO_ANNOTATIONS } from '@/data/site';
import { searchHeading } from '@/lib/headings';
import { OTHER_LABELS, VISUALS } from './QhServicePage';
import '@/components/home/QrsHome.css';

// The new-theme heroes (QhHero with each page's own animation) on the service and hub pages' earlier studio layouts and content (owner,
// November 10 2026: "revert to the previous content and meta data, but use the same hero"). The hero sits in a .qh-scope wrapper, so the
// new theme's styles (QrsHome.css, `:is(main.qh,main .qh-scope)`) reach only the hero. The H1 is the page's earlier one (searchHeading with
// its place), the line is the page's own hero.intro.

export function ServiceQhHero({ page, crumbs, offer, actions }) {
  const path = crumbs.at(-1).href;
  const commercial = offer === 'commercial';
  const links = (page.related || [])
    .map((href) => {
      const c = cardFor(href);
      const label = c?.title || RESIDENTIAL_TYPES.find((t) => t.href === href)?.label || OTHER_LABELS[href];
      return label && { label: label.replace(/\s*·.*$/, ''), href };
    })
    .filter(Boolean);
  let visual;
  try {
    visual = VISUALS[path]?.(page, links);
  } catch {
    visual = undefined; // a page whose earlier data lacks what its animation reads falls back to the photo frame
  }
  return (
    <div className="qh-scope">
      <QhHero
        crumbs={crumbs}
        title={searchHeading(page.h1 || page.title)}
        outcome={heroOutcome(path)}
        text={page.hero.intro}
        checks={page.heroNotes || HERO_ANNOTATIONS[commercial ? 'commercial' : 'home']}
        cta={commercial ? 'Request a roof survey' : 'Book a free roof evaluation'}
        actions={actions}
        badges
        visual={
          visual || (
            <QhSurveyFrame
              image={page.image}
              alt={page.imageAlt}
              chips={links.slice(0, 6)}
              card={commercial ? { title: 'Roofer-led roof survey', text: 'Photos, a written scope and price before any work.' } : { title: 'Free roof evaluation', text: 'Photos and a written price before any work.' }}
            />
          )
        }
      />
    </div>
  );
}

export function HubQhHero({ hub, crumbs, offer, actions, visual, image, imageAlt, cards = [] }) {
  const path = crumbs.at(-1).href;
  const commercial = offer === 'commercial';
  return (
    <div className="qh-scope">
      <QhHero
        crumbs={crumbs}
        title={searchHeading(hub.hero.heading)}
        outcome={heroOutcome(path)}
        text={hub.hero.intro}
        checks={hub.heroNotes || HERO_ANNOTATIONS[commercial ? 'commercial' : 'home']}
        cta={commercial ? 'Request a roof survey' : 'Book a free roof evaluation'}
        actions={actions}
        badges
        visual={
          visual || (
            <QhSurveyFrame
              image={image}
              alt={imageAlt}
              chips={cards.slice(0, 6).map((c) => ({ label: c.title.replace(/ Roofing$/, ''), href: c.href }))}
              card={commercial ? { title: 'Roofer-led roof survey', text: 'Photos, a written scope and price before any work.' } : { title: 'Free roof evaluation', text: 'Photos and a written price before any work.' }}
            />
          )
        }
      />
    </div>
  );
}
