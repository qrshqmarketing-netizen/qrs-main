import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { WESTMINSTER_COMMERCIAL_PROJECT as page } from '@/data/pages/westminster-commercial-project';

export const metadata = projectMetadata(page);

export default function WestminsterCommercialProjectPage() {
  return <ProjectDetail page={page} />;
}
