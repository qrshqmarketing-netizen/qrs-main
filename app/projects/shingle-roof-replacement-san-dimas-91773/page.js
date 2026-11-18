import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { SAN_DIMAS_PROJECT as page } from '@/data/pages/san-dimas-project';

export const metadata = projectMetadata(page);

export default function SanDimas91773ProjectPage() {
  return <ProjectDetail page={page} />;
}
