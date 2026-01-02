/**
 * SCRIPTEEZE - Main Application
 * A creator-first social media agency landing page
 */

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Components
import Hero from './components/Hero/Hero';
import Philosophy from './components/Philosophy/Philosophy';
import Services from './components/Services/Services';
import Experience from './components/Experience/Experience';
import Team from './components/Team/Team';
import IdealClient from './components/IdealClient/IdealClient';
import FinalCTA from './components/FinalCTA/FinalCTA';
import Footer from './components/Footer/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin);

const App: React.FC = () => {
  useEffect(() => {
    // Smooth scroll polyfill for Safari
    document.documentElement.style.scrollBehavior = 'smooth';

    // Initialize any global animations or effects here
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      // Set GSAP defaults for consistent animations
      gsap.defaults({
        ease: 'power3.out',
        duration: 0.8,
      });
    }

    // Cleanup
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <main className="app" id="app">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Philosophy / Trust Section */}
      <Philosophy />

      {/* 3. Services Section */}
      <Services />

      {/* 4. Experience / Authority Section */}
      <Experience />

      {/* 5. Team / Creators Section */}
      <Team />

      {/* 6. Ideal Client Section */}
      <IdealClient />

      {/* 7. Final CTA Section */}
      <FinalCTA />

      {/* 8. Footer */}
      <Footer />
    </main>
  );
};

export default App;
