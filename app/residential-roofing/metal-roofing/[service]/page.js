import { redirect } from 'next/navigation';
import { serviceParams } from '@/components/templates/sectionPages';
import { METAL } from '@/data/content';

// Metal roofing is hidden for now (owner, November 2 2026): see ../page.js. The standing seam and metal roof repair addresses go to the
// residential hub until the pages return (restore the SectionService render from git history).
export const dynamicParams = false;
export const generateStaticParams = () => serviceParams(METAL);

export default function MetalRoofingServicePage() {
  redirect('/residential-roofing/');
}
