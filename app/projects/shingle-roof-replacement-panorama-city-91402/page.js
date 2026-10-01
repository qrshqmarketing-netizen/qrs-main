import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { PANORAMA_CITY_PROJECT as page } from '@/data/pages/panorama-city-project';

export const metadata = projectMetadata(page);

export default function PanoramaCityProjectPage() {
  return <ProjectDetail page={page} />;
}
