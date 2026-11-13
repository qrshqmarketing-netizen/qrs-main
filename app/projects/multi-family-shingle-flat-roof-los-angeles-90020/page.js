import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { LA_90020_PROJECT as page } from '@/data/pages/la-90020-project';

export const metadata = projectMetadata(page);

export default function LosAngeles90020ProjectPage() {
  return <ProjectDetail page={page} />;
}
