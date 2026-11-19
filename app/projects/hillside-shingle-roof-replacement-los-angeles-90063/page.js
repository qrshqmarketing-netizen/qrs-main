import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { LA_90063_HILLSIDE_PROJECT as page } from '@/data/pages/la-90063-hillside-project';

export const metadata = projectMetadata(page);

export default function LosAngeles90063HillsideProjectPage() {
  return <ProjectDetail page={page} />;
}
