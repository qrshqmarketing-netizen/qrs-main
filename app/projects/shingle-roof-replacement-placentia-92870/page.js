import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { PLACENTIA_PROJECT as page } from '@/data/pages/placentia-project';

export const metadata = projectMetadata(page);

export default function PlacentiaProjectPage() {
  return <ProjectDetail page={page} />;
}
