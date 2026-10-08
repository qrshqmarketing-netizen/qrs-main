import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { HACIENDA_HEIGHTS_PROJECT as page } from '@/data/pages/hacienda-heights-project';

export const metadata = projectMetadata(page);

export default function HaciendaHeightsProjectPage() {
  return <ProjectDetail page={page} />;
}
