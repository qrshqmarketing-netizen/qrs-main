import LocationPage from '@/components/templates/LocationPage';
import { LOCATION_PAGES } from '@/data/locationPages';
import { cityPath, findCity, LOCATIONS } from '@/data/locations';
import { pageMetadata } from '@/lib/pages';

// One page per city in data/locations.js, at /service-areas/<region>/<city>/, with copy from data/locationPages.js.
// Other addresses (including a city under the wrong region) show the 404 page.
export const dynamicParams = false;
export const generateStaticParams = () => LOCATIONS.map((l) => ({ region: l.region, city: l.slug }));

export async function generateMetadata({ params }) {
  const { city } = await params;
  const page = LOCATION_PAGES[city];
  return pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: cityPath(city) });
}

export default async function CityPage({ params }) {
  const { city } = await params;
  const location = findCity(city);
  return <LocationPage location={location} page={LOCATION_PAGES[city]} index={LOCATIONS.indexOf(location)} />;
}
