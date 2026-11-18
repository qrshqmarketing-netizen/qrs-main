import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { SOUTH_PASADENA_PROJECT as page } from '@/data/pages/south-pasadena-project';

export const metadata = projectMetadata(page);

export default function SouthPasadena91030ProjectPage() {
  return <ProjectDetail page={page} />;
}
