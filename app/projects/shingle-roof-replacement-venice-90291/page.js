import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { VENICE_PROJECT as page } from '@/data/pages/venice-project';

export const metadata = projectMetadata(page);

export default function VeniceProjectPage() {
  return <ProjectDetail page={page} />;
}
