import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { WEST_HOLLYWOOD_FLAT_PROJECT as page } from '@/data/pages/west-hollywood-flat-project';

export const metadata = projectMetadata(page);

export default function WestHollywood90046ProjectPage() {
  return <ProjectDetail page={page} />;
}
