import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { LA_90029_PROJECT as page } from '@/data/pages/la-90029-project';

export const metadata = projectMetadata(page);

export default function LosAngeles90029ProjectPage() {
  return <ProjectDetail page={page} />;
}
