import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect } from 'react';
import { GraduationCap, Layers, Zap, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: '3+',    label: 'Projects Built',        icon: <Code2 size={20} className="text-primary-light" /> },
  { value: '2nd',   label: 'Year ECE Student',       icon: <GraduationCap size={20} className="text-secondary" /> },
  { value: '10+',   label: 'Technologies Learned',   icon: <Layers size={20} className="text-accent" /> },
  { value: '∞',     label: 'Curiosity to Build',     icon: <Zap size={20} className="text-primary-light" /> },
];

const About = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from('.about-heading', {
        opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-heading', start: 'top 85%' },
      });

      // Left text block
      gsap.from('.about-text-block', {
        opacity: 0, x: -40, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-text-block', start: 'top 82%' },
      });

      // Stats stagger
      gsap.from('.about-stat', {
        opacity: 0, y: 30, scale: 0.9,
        duration: 0.7, stagger: 0.12, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.about-stats', start: 'top 80%' },
      });

      // Right decorative card
      gsap.from('.about-card', {
        opacity: 0, x: 40, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-card', start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-28 px-6 md:px-12 relative overflow-hidden">
      {/* Section label */}
      <div className="container mx-auto max-w-7xl">
        <div className="about-heading text-center mb-16">
          <span className="inline-block text-xs font-mono font-semibold tracking-widest text-primary-light uppercase mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/8">
            &lt; about me /&gt;
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white">
            Who I{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #a78bfa, #06b6d4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}
            >
              Am
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Bio */}
          <div className="about-text-block space-y-6">
            <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
              Hi, I'm <span className="text-primary-light font-semibold">Barath R</span> — a second-year 
              Electronics and Communication Engineering student at{' '}
              <span className="text-secondary font-semibold">Rajalakshmi Institute of Technology</span>.
            </p>
            <p className="text-zinc-400 text-base leading-relaxed">
              I have a strong passion for building real-world technology solutions. My work spans{' '}
              <span className="text-primary-light font-semibold">full-stack web development</span>,{' '}
              <span className="text-accent font-semibold">AI-powered systems</span>, and{' '}
              <span className="text-secondary font-semibold">IoT applications</span> — 
              areas where software meets hardware to solve practical problems.
            </p>
            <p className="text-zinc-400 text-base leading-relaxed">
              I enjoy the challenge of turning ideas into functional products, whether it's a web app that 
              predicts GPA using machine learning, a medical chatbot powered by NLP, or an IoT prototype 
              that collects and visualises real-time sensor data.
            </p>

            {/* Key traits */}
            <div className="flex flex-wrap gap-3 pt-2">
              {['Problem Solver', 'Quick Learner', 'Team Player', 'Creative Thinker'].map(trait => (
                <span key={trait} className="tech-pill">{trait}</span>
              ))}
            </div>

            <a
              href="mailto:barath5727@gmail.com"
              id="about-contact-cta"
              className="inline-flex items-center gap-2 mt-2 px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary-light text-sm font-semibold hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
            >
              Let's Connect →
            </a>
          </div>

          {/* Right — Stats grid + decorative card */}
          <div className="space-y-6">
            {/* Stats grid */}
            <div className="about-stats grid grid-cols-2 gap-4">
              {STATS.map(({ value, label, icon }) => (
                <div
                  key={label}
                  className="about-stat glass rounded-xl p-5 flex flex-col gap-3 shimmer-card hover:-translate-y-1 transition-transform duration-300 cursor-default"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    {icon}
                  </div>
                  <div>
                    <p className="text-3xl font-display font-black text-white leading-none">{value}</p>
                    <p className="text-xs text-zinc-500 mt-1">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* About decorative card */}
            <div className="about-card glass rounded-2xl p-6 border border-primary/15 relative overflow-hidden">
              {/* Subtle gradient accent */}
              <div className="absolute top-0 right-0 w-28 h-28 rounded-full" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)' }} />
              <h3 className="font-display font-bold text-white text-lg mb-2 relative z-10">Currently focused on</h3>
              <ul className="space-y-2 relative z-10">
                {[
                  '🤖 Building AI-powered web apps',
                  '📡 Exploring advanced IoT systems',
                  '⚛️ Deepening React & full-stack skills',
                  '🔍 Learning ML & data engineering',
                ].map(item => (
                  <li key={item} className="text-zinc-400 text-sm flex items-start gap-2">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
