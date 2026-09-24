import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProofBar from '@/components/ProofBar';
import Services from '@/components/Services';
import Process from '@/components/Process';
import WhyQRS from '@/components/WhyQRS';
import VideoReviews from '@/components/VideoReviews';
import RoofCheck from '@/components/RoofCheck';
import ServiceArea from '@/components/ServiceArea';
import Guarantee from '@/components/Guarantee';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <ProofBar />
        <Services />
        <Process />
        <WhyQRS />
        <VideoReviews />
        <RoofCheck />
        <ServiceArea />
        <Guarantee />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
