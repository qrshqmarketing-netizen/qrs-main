---
name: visual-annotations
description: Design or audit the above-the-fold area of a QRS page so the deciding facts (free roof evaluation, written price first, warranty, license) are visible at a glance, using only owner-confirmed claims. Use when building a new page hero, landing page or offer card, or when asked why a page doesn't convert.
---

# Visual annotations for QRS pages

People decide in the first screen whether to call. Put the few facts that decide it **on the screen, as short visual marks**, not buried in paragraphs. Every mark must be true and confirmed by the owner.

## The confirmed attributes (use only these)

Ranked by how much they move a homeowner or client to act:

| Rank | Attribute | Where it applies | Source |
|---|---|---|---|
| 1 | **Free roof evaluation** (roofer-led, under an hour, drone shows the areas of concern) | homes only | owner interview 2026-10-12 |
| 2 | **Written price before any work** ("we price it right the first time") | all | owner, `data/site.js` |
| 3 | **10-year workmanship warranty** | installs/replacements only (repairs carry manufacturers' warranties) | owner 2026-10-01 |
| 4 | **CSLB #1061942**, licensed, bonded and insured, since 2020 | all | `BUSINESS.license`, `licenseSince` |
| 5 | **Permits pulled** | all | owner 2026-10-01 |
| 6 | Tarps, magnetic nail sweeps, landscaping protection, daily cleanup | all | owner 2026-09-24, 2026-10-12 |
| 7 | Manufacturer certifications (Owens Corning, IKO, GAF, CertainTeed Master Craftsman, Polyglass Premio Pro) | credentials, replacement pages | logos supplied by the owner (`/credentials/`) |
| 8 | Roofer-led **commercial roof survey** | commercial, HOA, contractors | owner 2026-10-05 |

The sets in use are `HERO_ANNOTATIONS` in `data/site.js` (`home`, `commercial`), shown by `Hero.jsx` as the check-mark row under the buttons.

## Honesty rules (never break)

- **Never** show a review count, total or "X+ reviews". Stars or "5-star reviews on Google" without a number are fine.
- **Never** call the commercial survey free or give it a price.
- **Never** show a response time ("same day", "within 24 hours"), "6,000 roofs", "30+ years", BBB anything, coatings or roof certifications.
- No guarantees, no "leak-free", no "lowest price". Price matching is confirmed but say "we can match a written bid" only where the page explains it.
- A badge or logo appears only for credentials the owner gave us the logo for.
- A new attribute needs the owner's confirmation first (see the memory note on confirmed site claims).

## Page archetypes and their centerpiece

| Page type | Centerpiece (first screen) | Annotation set |
|---|---|---|
| Home | El Niño offer card with the request (PromoCard, `promo-home`) | home |
| Residential service (repair, replacement, tile, shingle, flat) | Hero keyword H1 + outcome, then Get Pro Advice / Call | home |
| Commercial, HOA, contractors | Hero + survey request | commercial |
| City / county | Hero "X roofing" + outcome | home |
| Landing (El Niño) | Two columns: offer left, quick form right | the card's own lines |
| Blog, careers, legal | No annotations (`annotations={false}` or skipped by path) | none |

## Rules for the marks

1. **3 to 4 marks, 2 to 5 words each.** Nouns and numbers, no sentences.
2. Place them **next to the action** (under the buttons), so the fact answers the hesitation at the moment of clicking.
3. One visual language: gold check (✓ in `var(--font-glyph)`, never the web font), muted text, wraps on phones, one per line at 390px.
4. The first mark is the strongest offer for that audience (free evaluation for homes; survey for clients).
5. Don't repeat a mark that the headline already says.
6. Keep the first 100 words of copy carrying the page keyword (SEO rule); the marks don't count toward it.

## Audit format

When asked to audit a page, answer with:

1. **Centerpiece**: what fills the first screen at 1440×900 and 390×800, and whether it is the action.
2. **Table**: Element | Current | Problem | Recommended annotation.
3. **First 2% of tokens**: what an AI agent or screen reader meets first in the HTML (today: the header menu precedes `<main>`).
4. **Fixes, in priority order**, each with the file to change.

Check both themes and 390px after any change.
