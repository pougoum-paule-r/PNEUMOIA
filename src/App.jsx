
// src/App.jsx
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import Hero from '../src/features/home/components/Hero';
import Feature from '../src/features/home/components/FeaturesGrid';
import StatsSection from '../src/features/home/components/StatsSection';
import CtaSection from '../src/features/home/components/CtaSection';
import TeamSection from '../src/features/home/components/TeamSection';
import WhyChooseUsSection from '../src/features/home/components/WhyChooseUs';
import TestimonialsSection from '../src/features/home/components/Testimonials';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      <div className="relative z-20 md:-mt-20 lg:-mt-35 pointer-events-none">
        {/* Les cartes redeviennent cliquables */}
        <div className="pointer-events-auto">
          <Feature />
        </div>
      </div>
      <StatsSection />
      {/* <AboutSection /> */}
      <WhyChooseUsSection />
      <TeamSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </div>
  );
}

export default App;