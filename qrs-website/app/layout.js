import 'leaflet/dist/leaflet.css';
import './globals.css';

export const metadata = {
  title: 'QRS | Quality Roofing Specialists',
  description:
    'Quality Roofing Specialists — detail-first roofing for Los Angeles and Orange County. Roof replacement, repair, tile, flat and shingle roofing.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
