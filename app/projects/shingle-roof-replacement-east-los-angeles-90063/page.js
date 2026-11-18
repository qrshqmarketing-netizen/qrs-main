import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { EAST_LOS_ANGELES_PROJECT as page } from '@/data/pages/east-los-angeles-project';

export const metadata = projectMetadata(page);

export default function EastLosAngeles90063ProjectPage() {
  return <ProjectDetail page={page} />;
}
