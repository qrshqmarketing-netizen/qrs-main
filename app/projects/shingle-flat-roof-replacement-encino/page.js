import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { ENCINO_PROJECT as page } from '@/data/pages/encino-project';

export const metadata = projectMetadata(page);

export default function EncinoProjectPage() {
  return <ProjectDetail page={page} />;
}
