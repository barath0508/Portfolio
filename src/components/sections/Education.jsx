import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect } from 'react';
import { GraduationCap, MapPin, Calendar, BookOpen, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHTS = [
  { icon: <BookOpen size={15} className="text-primary-light" />, text: 'Electronics & Communication Engineering' },
  { icon: <Award size={15} className="text-secondary" />,        text: 'Active web developer & AI project builder' },
  { icon: <Award size={15} className="text-accent" />,           text: 'IoT & embedded systems enthusiast' },
];

const Education = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.edu-heading', {
        opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.edu-heading', start: 'top 85%' },
      });

      gsap.from('.edu-card', {
        opacity: 0, x: -40, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.edu-card', start: 'top 80%' },
      });

      gsap.from('.edu-extra', {
        opacity: 0, x: 40, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.edu-extra', start: 'top 80%' },
      });

      gsap.from('.edu-highlight', {
        opacity: 0, x: -20,
        duration: 0.6, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: '.edu-highlights', start: 'top 82%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="py-28 px-6 md:px-12 relative overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(6,182,212,0.05) 0%, transparent 65%)' }} />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Heading */}
        <div className="edu-heading text-center mb-16">
          <span className="inline-block text-xs font-mono font-semibold tracking-widest text-secondary uppercase mb-4 px-4 py-1.5 rounded-full border border-secondary/20 bg-secondary/8">
            &lt; education /&gt;
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white">
            My{' '}
            <span style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Background
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Main education card */}
          <div className="edu-card glass rounded-2xl overflow-hidden">
            {/* Top gradient bar */}
            <div className="h-1.5" style={{ background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }} />
            <div className="p-8">
              {/* Institution badge */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                  <GraduationCap size={28} className="text-primary-light" />
                </div>
                <div>
                  <p className="text-primary-light text-xs font-mono font-semibold tracking-wider uppercase mb-0.5">Currently studying at</p>
                  <h3 className="text-white font-display font-bold text-lg leading-tight">
                    Rajalakshmi Institute of Technology
                  </h3>
                </div>
              </div>

              {/* Degree */}
              <div className="mb-6 pb-6 border-b border-white/8">
                <h4 className="text-xl font-display font-black text-white mb-1">
                  B.E. Electronics &amp; Communication Engineering
                </h4>
                <p className="text-zinc-400 text-sm">Bachelor of Engineering · ECE Department</p>
              </div>

              {/* Meta info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2.5 text-zinc-400 text-sm">
                  <Calendar size={15} className="text-primary-light shrink-0" />
                  <span>2024 – Present <span className="text-zinc-600">(2nd Year)</span></span>
                </div>
                <div className="flex items-center gap-2.5 text-zinc-400 text-sm">
                  <MapPin size={15} className="text-secondary shrink-0" />
                  <span>Chennai, Tamil Nadu</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: highlights + learning path */}
          <div className="space-y-6">
            {/* Highlights */}
            <div className="edu-card glass rounded-2xl p-6">
              <h4 className="font-display font-bold text-white text-base mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center text-xs text-primary-light">✦</span>
                Academic Highlights
              </h4>
              <div className="edu-highlights space-y-3">
                {HIGHLIGHTS.map(({ icon, text }) => (
                  <div key={text} className="edu-highlight flex items-center gap-3 text-zinc-400 text-sm">
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                      {icon}
                    </div>
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Learning path */}
            <div className="edu-extra glass rounded-2xl p-6">
              <h4 className="font-display font-bold text-white text-base mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-secondary/20 flex items-center justify-center text-xs text-secondary">📚</span>
                Self-Learning Journey
              </h4>
              <div className="space-y-3">
                {[
                  { year: '2024', label: 'Started ECE + Learned HTML/CSS/JS', color: '#a78bfa' },
                  { year: '2024', label: 'Built first React projects & Flask APIs', color: '#818cf8' },
                  { year: '2025', label: 'Dived into AI/ML & IoT',               color: '#06b6d4' },
                  { year: '2025', label: 'Built AI Advisor & Medical Chatbot',    color: '#a78bfa' },
                  { year: '2026', label: 'Expanding to advanced DSA & cloud',     color: '#06b6d4' },
                ].map(({ year, label, color }, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-xs font-mono text-zinc-600 w-10 shrink-0">{year}</span>
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                      <span className="text-zinc-400 text-sm">{label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
