import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { GARDEN_GROVE_PROJECT as page } from '@/data/pages/garden-grove-project';

export const metadata = projectMetadata(page);

export default function GardenGroveProjectPage() {
  return <ProjectDetail page={page} />;
}
