import { notFound } from 'next/navigation';
import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { GARDEN_GROVE_PROJECT as page } from '@/data/pages/garden-grove-project';
import { SHOW_GARDEN_GROVE } from '@/data/pages/projects';

// Switched off (not found) until SHOW_GARDEN_GROVE in data/pages/projects.js is true
export const metadata = SHOW_GARDEN_GROVE ? projectMetadata(page) : { title: 'Page not found', robots: { index: false } };

export default function GardenGroveProjectPage() {
  if (!SHOW_GARDEN_GROVE) notFound();
  return <ProjectDetail page={page} />;
}
