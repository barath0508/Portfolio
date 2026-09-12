import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, MapPin, Calendar, BookOpen, Award, Sparkles, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHTS = [
  { icon: <BookOpen size={16} className="text-primary-light" />, text: 'B.E. in Electronics & Communication Engineering' },
  { icon: <Award size={16} className="text-secondary" />, text: 'Webmaster & Core Member — IETE Student Forum RIT' },
  { icon: <Sparkles size={16} className="text-accent" />, text: 'Lead Platform Developer — Energize 2026 Hackathon' },
  { icon: <CheckCircle2 size={16} className="text-green-400" />, text: 'Hardware & Embedded Lab: Verilog HDL & Altera FPGA' },
];

const TIMELINE = [
  { year: '2024', label: 'Started ECE at RIT; mastered C, HTML, CSS & Modern JS', color: '#a78bfa' },
  { year: '2024', label: 'Built full-stack React SPAs, Flask REST backends & Firebase databases', color: '#818cf8' },
  { year: '2025', label: 'Engineered AI Academic Advisor (OCR + ML) & Medical Chatbot', color: '#06b6d4' },
  { year: '2025', label: 'Architected Energize 2026 3D Twin & deployed official IETE-RIT portal', color: '#a78bfa' },
  { year: '2026', label: 'Launched iCreatePDF (37+ WASM tools) & Solar Tracker 3D Telemetry', color: '#34d399' },
];

const Education = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.edu-heading', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.edu-heading', start: 'top 85%' },
      });

      gsap.from('.edu-card', {
        opacity: 0,
        x: -40,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.edu-card', start: 'top 80%' },
      });

      gsap.from('.edu-extra', {
        opacity: 0,
        x: 40,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.edu-extra', start: 'top 80%' },
      });

      gsap.from('.edu-highlight', {
        opacity: 0,
        x: -20,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.edu-highlights', start: 'top 82%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="py-28 px-6 md:px-12 relative overflow-hidden">
      {/* Background gradient accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 50%, rgba(6,182,212,0.06) 0%, transparent 65%)',
        }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Heading */}
        <div className="edu-heading text-center mb-16">
          <span className="inline-block text-xs font-mono font-semibold tracking-widest text-secondary uppercase mb-4 px-4 py-1.5 rounded-full border border-secondary/20 bg-secondary/8">
            &lt; academics &amp; leadership &gt;
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white">
            Education &amp;{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #a78bfa, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Milestones
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Main education card */}
          <div className="edu-card glass rounded-2xl overflow-hidden border border-white/5">
            {/* Top gradient bar */}
            <div className="h-1.5" style={{ background: 'linear-gradient(90deg, #7c3aed, #06b6d4, #10b981)' }} />
            <div className="p-7 sm:p-8">
              {/* Institution badge */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
                  <GraduationCap size={28} className="text-primary-light" />
                </div>
                <div>
                  <p className="text-primary-light text-xs font-mono font-semibold tracking-wider uppercase mb-0.5">
                    Affiliated to Anna University
                  </p>
                  <h3 className="text-white font-display font-bold text-lg sm:text-xl leading-tight">
                    Rajalakshmi Institute of Technology
                  </h3>
                </div>
              </div>

              {/* Degree */}
              <div className="mb-6 pb-6 border-b border-white/8">
                <h4 className="text-xl font-display font-black text-white mb-1.5">
                  B.E. Electronics &amp; Communication Engineering
                </h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Focusing on embedded microcontrollers, digital signal processing, hardware description languages (Verilog), and software engineering.
                </p>
              </div>

              {/* Meta info */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6 pb-6 border-b border-white/8">
                <div className="flex items-center gap-2.5 text-zinc-300 text-xs sm:text-sm">
                  <Calendar size={15} className="text-primary-light shrink-0" />
                  <span>2024 – 2028 <span className="text-secondary font-semibold">(2nd Year)</span></span>
                </div>
                <div className="flex items-center gap-2.5 text-zinc-300 text-xs sm:text-sm">
                  <MapPin size={15} className="text-secondary shrink-0" />
                  <span>Chennai, Tamil Nadu, India</span>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h4 className="font-display font-bold text-white text-sm mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-primary/20 flex items-center justify-center text-xs text-primary-light">✦</span>
                  Campus Roles &amp; Laboratory Focus
                </h4>
                <div className="edu-highlights space-y-3">
                  {HIGHLIGHTS.map(({ icon, text }) => (
                    <div key={text} className="edu-highlight flex items-center gap-3 text-zinc-300 text-xs sm:text-sm">
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        {icon}
                      </div>
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column: learning trajectory */}
          <div className="space-y-6">
            <div className="edu-extra glass rounded-2xl p-7 sm:p-8 border border-white/5">
              <h4 className="font-display font-bold text-white text-base mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-secondary/20 flex items-center justify-center text-xs text-secondary">🚀</span>
                Engineering Timeline &amp; Milestones
              </h4>
              <div className="space-y-5">
                {TIMELINE.map(({ year, label, color }, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="text-xs font-mono font-bold text-white px-2 py-0.5 rounded bg-white/5 border border-white/10 shrink-0">
                      {year}
                    </span>
                    <div className="flex items-start gap-3 flex-1 pt-0.5">
                      <div
                        className="w-2 h-2 rounded-full shrink-0 mt-1.5 shadow-[0_0_8px_currentColor]"
                        style={{ background: color, color: color }}
                      />
                      <span className="text-zinc-300 text-xs sm:text-sm leading-relaxed">{label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick quote / Philosophy card */}
            <div className="glass rounded-2xl p-6 border border-primary/20 relative overflow-hidden">
              <div className="text-xs font-mono text-primary-light uppercase tracking-wider mb-2">Core Mindset</div>
              <p className="text-zinc-300 text-sm italic leading-relaxed">
                "Software and hardware are two sides of the same coin. Deep understanding of both allows you to build systems that are not just fast and beautiful on screen, but engineered to perform."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
