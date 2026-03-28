import HeroSection from '../components/HeroSection';
import StatsBar from '../components/StatsBar';
import ServicesGrid from '../components/ServicesGrid';
import FeaturesSection from '../components/FeaturesSection';
import NewsSection from '../components/NewsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <ServicesGrid />
      <FeaturesSection />
      <NewsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </>
  );
}
