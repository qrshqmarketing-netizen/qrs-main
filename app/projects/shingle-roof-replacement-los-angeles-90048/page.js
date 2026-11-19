import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { LA_90048_PROJECT as page } from '@/data/pages/la-90048-project';

export const metadata = projectMetadata(page);

export default function LosAngeles90048ProjectPage() {
  return <ProjectDetail page={page} />;
}
