import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { LADERA_HEIGHTS_PROJECT as page } from '@/data/pages/ladera-heights-project';

export const metadata = projectMetadata(page);

export default function LaderaHeightsProjectPage() {
  return <ProjectDetail page={page} />;
}
