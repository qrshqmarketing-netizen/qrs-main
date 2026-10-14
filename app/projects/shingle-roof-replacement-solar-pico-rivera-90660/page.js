import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { PICO_RIVERA_PROJECT as page } from '@/data/pages/pico-rivera-project';

export const metadata = projectMetadata(page);

export default function PicoRiveraProjectPage() {
  return <ProjectDetail page={page} />;
}
