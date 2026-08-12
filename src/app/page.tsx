/**
 * SCRIPTEEZE - Main Application
 * A creator-first social media agency landing page
 */
'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Philosophy from '../components/Philosophy/Philosophy';
import Services from '../components/Services/Services';
import Experience from '../components/Experience/Experience';
import Team from '../components/Team/Team';
import IdealClient from '../components/IdealClient/IdealClient';
import Contact from '../components/Contact/Contact';
import FinalCTA from '../components/FinalCTA/FinalCTA';
import Footer from '../components/Footer/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

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
    <>
      <Header />

      <main className="app" id="app">
        <Hero />
        <Philosophy />
        <Services />
        <Experience />
        <Team />
        <IdealClient />
        <Contact />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
};

export default App;
