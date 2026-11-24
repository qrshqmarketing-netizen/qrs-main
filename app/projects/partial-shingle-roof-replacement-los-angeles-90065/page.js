import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { LA_90065_PROJECT as page } from '@/data/pages/la-90065-project';

export const metadata = projectMetadata(page);

export default function LosAngeles90065ProjectPage() {
  return <ProjectDetail page={page} />;
}
