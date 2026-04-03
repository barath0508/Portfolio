import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Analytics } from '@vercel/analytics/react';
import GlobalBackground from './components/effects/GlobalBackground';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    window.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger periodically for the first few seconds
    // to account for dynamic image loading and layout shifts
    const intervals = [100, 500, 1000, 2000, 3000].map(time => 
      setTimeout(() => ScrollTrigger.refresh(), time)
    );

    // Also refresh on window load
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      intervals.forEach(clearTimeout);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-zinc-100 overflow-x-hidden relative">
      <GlobalBackground />
      <Navbar />
      <main className="relative z-10 flex flex-col w-full">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
