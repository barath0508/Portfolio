import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Analytics } from '@vercel/analytics/react';
import GlobalBackground from './components/effects/GlobalBackground';
import TerminalModal from './components/effects/TerminalModal';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';
import { Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);

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
    const intervals = [100, 500, 1000, 2000, 3000].map((time) =>
      setTimeout(() => ScrollTrigger.refresh(), time)
    );

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    // Global Terminal Shortcut (Ctrl+K or Cmd+K) and Custom Event
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };

    const handleOpenTerminal = () => setTerminalOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-terminal', handleOpenTerminal);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      intervals.forEach(clearTimeout);
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-terminal', handleOpenTerminal);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-zinc-100 overflow-x-hidden relative selection:bg-primary/30 selection:text-white">
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

      {/* Interactive Developer Terminal Modal */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Floating Quick CLI Trigger Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setTerminalOpen(true)}
          aria-label="Open Developer Terminal"
          className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full glass border border-secondary/30 text-secondary hover:border-secondary/60 hover:bg-secondary/15 hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all duration-300 shadow-xl backdrop-blur-xl"
        >
          <Terminal size={16} className="group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-xs font-mono font-bold hidden sm:inline">CLI</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-zinc-300 hidden md:inline">
            Ctrl+K
          </span>
        </button>
      </div>

      <Analytics />
    </div>
  );
}

export default App;
