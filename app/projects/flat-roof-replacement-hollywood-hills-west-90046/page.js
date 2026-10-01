import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { HOLLYWOOD_HILLS_PROJECT as page } from '@/data/pages/hollywood-hills-project';

export const metadata = projectMetadata(page);

export default function HollywoodHillsProjectPage() {
  return <ProjectDetail page={page} />;
}
