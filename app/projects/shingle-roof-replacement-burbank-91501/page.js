import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { BURBANK_PROJECT as page } from '@/data/pages/burbank-project';

export const metadata = projectMetadata(page);

export default function BurbankProjectPage() {
  return <ProjectDetail page={page} />;
}
