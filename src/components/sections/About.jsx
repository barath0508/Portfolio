import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Layers, Zap, Code2, Globe, Cpu, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: '56+', label: 'GitHub Repositories', icon: <Code2 size={20} className="text-primary-light" /> },
  { value: '37+', label: 'Client-Side Tools Built', icon: <Zap size={20} className="text-secondary" /> },
  { value: '8+', label: 'Live Deployed Systems', icon: <Globe size={20} className="text-accent" /> },
  { value: '3rd', label: 'Year ECE @ RIT Chennai', icon: <GraduationCap size={20} className="text-primary-light" /> },
];

const About = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from('.about-heading', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-heading', start: 'top 85%' },
      });

      // Left text block
      gsap.from('.about-text-block', {
        opacity: 0,
        x: -40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-text-block', start: 'top 82%' },
      });

      // Stats stagger
      gsap.from('.about-stat', {
        opacity: 0,
        y: 30,
        scale: 0.9,
        duration: 0.7,
        stagger: 0.12,
        ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.about-stats', start: 'top 80%' },
      });

      // Right decorative card
      gsap.from('.about-card', {
        opacity: 0,
        x: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-card', start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-28 px-6 md:px-12 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="about-heading text-center mb-16">
          <span className="inline-block text-xs font-mono font-semibold tracking-widest text-primary-light uppercase mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/8">
            &lt; profile &amp; journey &gt;
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white">
            Who I{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #a78bfa, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Am
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Bio */}
          <div className="about-text-block space-y-5">
            <p className="text-zinc-200 text-base md:text-lg leading-relaxed">
              Hi, I'm <span className="text-primary-light font-bold">Barath R</span> — a third-year Electronics and Communication Engineering undergraduate at{' '}
              <span className="text-secondary font-semibold">Rajalakshmi Institute of Technology, Chennai</span> with an intense drive for creating production-ready digital products.
            </p>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              My engineering philosophy thrives at the intersection of <span className="text-primary-light font-semibold">modern full-stack web software</span>, <span className="text-accent font-semibold">AI systems</span>, and <span className="text-secondary font-semibold">embedded hardware</span>. Whether designing 100% client-side privacy-first WebAssembly suites like <span className="text-white font-semibold">iCreatePDF</span> (37+ in-browser document tools), engineering 3D solar telemetry dashboards with Three.js and Supabase, or writing Verilog finite state machines for Altera FPGAs — I care deeply about end-to-end performance and seamless UX.
            </p>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              Beyond individual projects, I serve as Webmaster and Core Developer for the <span className="text-secondary font-semibold">IETE Student Forum RIT Chapter</span> and lead technical platform engineering for <span className="text-primary-light font-semibold">Energize 2026</span>.
            </p>

            {/* Key traits */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {[
                'Full-Stack Developer',
                'Next.js & TypeScript',
                'Three.js & 3D WebGL',
                'Embedded Verilog & IoT',
                'Fast Learner & Team Lead',
              ].map((trait) => (
                <span key={trait} className="tech-pill">
                  {trait}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="#contact"
                id="about-contact-cta"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary/15 border border-primary/30 rounded-xl text-primary-light text-sm font-semibold hover:bg-primary/25 hover:border-primary/50 transition-all duration-300 shadow-sm"
              >
                Let's Build Something Together →
              </a>
            </div>
          </div>

          {/* Right — Stats grid + decorative card */}
          <div className="space-y-6">
            {/* Stats grid */}
            <div className="about-stats grid grid-cols-2 gap-4">
              {STATS.map(({ value, label, icon }) => (
                <div
                  key={label}
                  className="about-stat glass rounded-2xl p-5 sm:p-6 flex flex-col gap-3 shimmer-card hover:-translate-y-1 transition-transform duration-300 cursor-default border border-white/5"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    {icon}
                  </div>
                  <div>
                    <p className="text-3xl sm:text-4xl font-display font-black text-white leading-none">
                      {value}
                    </p>
                    <p className="text-xs text-zinc-400 mt-1.5 font-medium">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* About decorative card */}
            <div className="about-card glass rounded-2xl p-6 border border-primary/20 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)',
                }}
              />
              <h3 className="font-display font-bold text-white text-base mb-3 relative z-10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Active Engineering Focus
              </h3>
              <ul className="space-y-2.5 relative z-10 text-xs sm:text-sm text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-primary-light font-bold">✦</span>
                  <span><strong>100% Client-Side Web Apps:</strong> WebAssembly, Web Workers, in-memory privacy architectures.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-secondary font-bold">✦</span>
                  <span><strong>3D Interactive Web:</strong> Real-time Three.js/R3F scenes, telemetry visualizers, and digital twins.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-accent font-bold">✦</span>
                  <span><strong>Hardware &amp; IoT:</strong> Verilog HDL digital design, Altera FPGAs, and cloud telemetry streams.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-primary-light font-bold">✦</span>
                  <span><strong>Campus Tech Leadership:</strong> Webmaster for IETE RIT and platform lead for Energize 2026.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
