import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { SAN_BERNARDINO_PROJECT as page } from '@/data/pages/san-bernardino-project';

export const metadata = projectMetadata(page);

export default function SanBernardinoProjectPage() {
  return <ProjectDetail page={page} />;
}
