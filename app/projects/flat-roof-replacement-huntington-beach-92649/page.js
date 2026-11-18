import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { HUNTINGTON_BEACH_FLAT_PROJECT as page } from '@/data/pages/huntington-beach-flat-project';

export const metadata = projectMetadata(page);

export default function HuntingtonBeach92649ProjectPage() {
  return <ProjectDetail page={page} />;
}
