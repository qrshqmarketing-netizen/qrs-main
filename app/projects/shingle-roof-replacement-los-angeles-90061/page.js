import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { LA_90061_PROJECT as page } from '@/data/pages/la-90061-project';

export const metadata = projectMetadata(page);

export default function LosAngeles90061ProjectPage() {
  return <ProjectDetail page={page} />;
}
