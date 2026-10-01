import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { SAN_PEDRO_PROJECT as page } from '@/data/pages/san-pedro-project';

export const metadata = projectMetadata(page);

export default function SanPedroProjectPage() {
  return <ProjectDetail page={page} />;
}
