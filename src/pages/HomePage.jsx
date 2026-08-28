import HeroSection from '../components/HeroSection';
import ServicesGrid from '../components/ServicesGrid';
import FeaturesSection from '../components/FeaturesSection';
import NewsSection from '../components/NewsSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <FeaturesSection />
      <NewsSection />
      <CTASection />
      <Footer />
    </>
  );
}
