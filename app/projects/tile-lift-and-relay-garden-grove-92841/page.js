import ProjectDetail, { projectMetadata } from '@/components/templates/ProjectDetail';
import { GARDEN_GROVE_TILE_PROJECT as page } from '@/data/pages/garden-grove-tile-project';

export const metadata = projectMetadata(page);

export default function GardenGrove92841TileProjectPage() {
  return <ProjectDetail page={page} />;
}
