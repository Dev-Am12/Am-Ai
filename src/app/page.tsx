import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsRow from "@/components/StatsRow";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" role="main">
        <HeroSection />
        <StatsRow />
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
