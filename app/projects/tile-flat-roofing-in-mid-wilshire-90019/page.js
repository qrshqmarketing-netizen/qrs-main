import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { MID_WILSHIRE_PROJECT as page } from '@/data/pages/mid-wilshire-project';

export const metadata = projectMetadata(page);

export default function MidWilshireProjectPage() {
  return <ProjectDetail page={page} />;
}
