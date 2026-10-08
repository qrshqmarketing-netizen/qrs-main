import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { GRANADA_HILLS_PROJECT as page } from '@/data/pages/granada-hills-project';

export const metadata = projectMetadata(page);

export default function GranadaHillsProjectPage() {
  return <ProjectDetail page={page} />;
}
