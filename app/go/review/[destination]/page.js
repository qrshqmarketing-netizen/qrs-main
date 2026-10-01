import { notFound } from 'next/navigation';
import { REVIEW_DESTINATIONS } from '@/data/pages/reviews';
import ReviewRedirect from '@/components/sections/ReviewRedirect';

const DESTINATIONS = REVIEW_DESTINATIONS.flatMap(({ location, links }) =>
  links.map(({ id, platform, href }) => [id, { location, platform, url: href }])
);

export const metadata = {
  title: 'Opening Review Page',
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return DESTINATIONS.map(([destination]) => ({ destination }));
}

export default async function ReviewRedirectPage({ params }) {
  const { destination } = await params;
  const review = DESTINATIONS.find(([id]) => id === destination)?.[1];
  if (!review) notFound();

  return <ReviewRedirect {...review} />;
}
