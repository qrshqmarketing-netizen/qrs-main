import { redirect } from 'next/navigation';

export const dynamicParams = false;
export const generateStaticParams = () => [];

export default function MetalRoofingServicePage() {
  redirect('/residential-roofing/');
}
