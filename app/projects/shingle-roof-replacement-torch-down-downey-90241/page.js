import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { DOWNEY_PROJECT as page } from '@/data/pages/downey-project';

export const metadata = projectMetadata(page);

export default function DowneyProjectPage() {
  return <ProjectDetail page={page} />;
}
