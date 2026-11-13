import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { GARDEN_GROVE_FLAT_PROJECT as page } from '@/data/pages/garden-grove-flat-project';

export const metadata = projectMetadata(page);

export default function GardenGroveFlatProjectPage() {
  return <ProjectDetail page={page} />;
}
