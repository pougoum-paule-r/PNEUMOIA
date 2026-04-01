import React from 'react';
import Hero from './components/Hero';
import FeaturesGrid from './components/FeaturesGrid';
import StatsSection from './components/StatsSection';
import AboutSection from './components/AboutSection';
import TeamSection from './components/TeamSection';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import CtaSection from './components/CtaSection';

/**
 * Page d'accueil complète avec toutes les sections
 * Structure claire et responsive
 */
const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturesGrid />
      <StatsSection />
      <AboutSection />
      <TeamSection />
      <WhyChooseUs />
      <Testimonials />
      <CtaSection />
    </>
  );
};

export default HomePage;