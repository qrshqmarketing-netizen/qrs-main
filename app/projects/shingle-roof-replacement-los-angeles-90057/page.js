import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { LA_90057_PROJECT as page } from '@/data/pages/la-90057-project';

export const metadata = projectMetadata(page);

export default function LosAngeles90057ProjectPage() {
  return <ProjectDetail page={page} />;
}
