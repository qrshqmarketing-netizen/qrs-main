import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { WHITE_FLAT_PROJECT as page } from '@/data/pages/white-flat-roof-project';

export const metadata = projectMetadata(page);

export default function WhiteFlatProjectPage() {
  return <ProjectDetail page={page} />;
}
