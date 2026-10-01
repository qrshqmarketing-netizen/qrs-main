import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { SAN_PEDRO_FULL_ROOF_PROJECT as page } from '@/data/pages/san-pedro-full-roof-project';

export const metadata = projectMetadata(page);

export default function SanPedroFullRoofProjectPage() {
  return <ProjectDetail page={page} />;
}
