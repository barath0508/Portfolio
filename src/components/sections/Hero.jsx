import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Mail, ArrowDown, Terminal, Code2, Cpu, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  'Software Engineer',
  'Full Stack Developer',
  'AI & IoT Enthusiast',
  'Embedded Engineer',
];

const useTypewriter = (texts, speed = 75, pause = 2200) => {
  const [display, setDisplay] = useState('');
  const [idx, setIdx]         = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    let t;
    if (!deleting) {
      if (display.length < current.length) {
        t = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), speed);
      } else {
        t = setTimeout(() => setDeleting(true), pause);
      }
    } else {
      if (display.length > 0) {
        t = setTimeout(() => setDisplay(display.slice(0, -1)), speed / 2);
      } else {
        setDeleting(false);
        setIdx((idx + 1) % texts.length);
      }
    }
    return () => clearTimeout(t);
  }, [display, idx, deleting, texts, speed, pause]);

  return display;
};

// ── Orbiting visual ─────────────────────────────────────────────────────────
const HeroVisual = () => {
  const techItems = [
    { label: 'React', color: '#61dafb' },
    { label: 'Python', color: '#ffd43b' },
    { label: 'Node.js', color: '#68a063' },
    { label: 'Arduino', color: '#00979d' },
    { label: 'Flask',  color: '#ffffff' },
    { label: 'Firebase', color: '#ffca28' },
  ];

  return (
    <div className="relative w-[340px] h-[340px] flex items-center justify-center select-none">
      {/* Background glow blob */}
      <div
        className="absolute inset-[10%] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, rgba(6,182,212,0.12) 55%, transparent 100%)',
          filter: 'blur(20px)',
          animation: 'glow-pulse 3s ease-in-out infinite',
        }}
      />

      {/* Orbit ring 1 */}
      <div className="orbit-ring" style={{ width: '100%', height: '100%', animation: 'spin 18s linear infinite' }} />
      {/* Orbit ring 2 */}
      <div className="orbit-ring" style={{ width: '78%', height: '78%', animation: 'spin 12s linear infinite reverse', borderColor: 'rgba(6,182,212,0.15)' }} />

      {/* Orbiting tech badges */}
      {techItems.map((item, i) => {
        const angle = (i / techItems.length) * 360 - 90;
        const rad   = (angle * Math.PI) / 180;
        const r     = 47; // % from center
        const cx    = 50 + r * Math.cos(rad);
        const cy    = 50 + r * Math.sin(rad);
        return (
          <div
            key={item.label}
            className="absolute px-2.5 py-1 rounded-md glass text-[10px] font-mono font-bold shadow-lg z-10"
            style={{
              left: `${cx}%`, top: `${cy}%`,
              transform: 'translate(-50%, -50%)',
              color: item.color,
              borderColor: `${item.color}30`,
              animation: `float ${5 + i * 0.6}s ease-in-out ${i * 0.4}s infinite`,
            }}
          >
            {item.label}
          </div>
        );
      })}

      {/* Centre card */}
      <div className="relative z-20 w-36 h-36 rounded-2xl glass flex flex-col items-center justify-center gap-2 border-glow" style={{ borderColor: 'rgba(124,58,237,0.3)' }}>
        <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
          <Code2 className="text-primary-light" size={24} />
        </div>
        <span className="text-white font-display font-bold text-sm">Barath R</span>
        <span className="text-zinc-500 text-[10px] text-center leading-tight">ECE · Dev · AI/IoT</span>
      </div>
    </div>
  );
};

// ── Hero Section ─────────────────────────────────────────────────────────────
const Hero = () => {
  const containerRef = useRef(null);
  const role = useTypewriter(ROLES);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.25 });

      tl.from('.hero-badge',    { opacity: 0, y: -20, scale: 0.85, duration: 0.7, ease: 'back.out(1.5)' })
        .from('.hero-name-1',   { opacity: 0, x: -50, duration: 0.8, ease: 'power4.out' }, '-=0.2')
        .from('.hero-name-2',   { opacity: 0, x: -50, duration: 0.8, ease: 'power4.out' }, '-=0.55')
        .from('.hero-role',     { opacity: 0, y: 18, duration: 0.6, ease: 'power3.out' }, '-=0.35')
        .from('.hero-bio',      { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out' }, '-=0.2')
        .from('.hero-cta',      { opacity: 0, y: 20, scale: 0.92, duration: 0.5, stagger: 0.12, ease: 'back.out(1.5)' }, '-=0.3')
        .from('.hero-socials',  { opacity: 0, x: -15, duration: 0.5, ease: 'power2.out' }, '-=0.2')
        .from('.hero-visual',   { opacity: 0, x: 50, scale: 0.88, duration: 1.1, ease: 'power3.out' }, '<-0.9');

      // Magnetic effect for buttons
      const magneticBtns = document.querySelectorAll('.magnetic-btn');
      magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(btn, {
            x: x * 0.35,
            y: y * 0.35,
            duration: 0.4,
            ease: 'power2.out'
          });
        });

        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.3)'
          });
        });
      });

      // Subtle parallax on scroll
      gsap.to('.hero-content-left', {
        y: -60, ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top', end: 'bottom top', scrub: 1.5,
        },
      });

      // Scroll arrow bounce
      gsap.to('.scroll-indicator', {
        y: 8, repeat: -1, yoyo: true, duration: 1.3, ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = (e) => {
    e.preventDefault();
    const el = document.querySelector('#projects');
    if (el && window.lenis) window.lenis.scrollTo(el);
    else if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="min-h-screen relative flex items-center justify-center pt-20 pb-16 px-6 md:px-12 overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
        {/* ── LEFT — Text ── */}
        <div className="hero-content-left text-left">
          {/* Status badge */}
          <div className="hero-badge inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass border border-primary/20 text-sm font-medium text-zinc-300">
            <span className="w-2 h-2 bg-secondary rounded-full" style={{ animation: 'glow-pulse 2s ease-in-out infinite' }} />
            <span>Open to opportunities</span>
            <Sparkles size={13} className="text-primary-light ml-1" />
          </div>

          {/* Name */}
          <h1 className="font-display font-black leading-none tracking-tighter mb-5">
            <span className="hero-name-1 block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white">
              Barath
            </span>
            <span
              className="hero-name-2 block text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
              style={{
                backgroundImage: 'linear-gradient(135deg, #a78bfa 0%, #818cf8 45%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              R.
            </span>
          </h1>

          {/* Typewriter role */}
          <div className="hero-role flex items-center gap-2 mb-6 font-mono text-base md:text-lg text-zinc-300">
            <Terminal size={17} className="text-secondary shrink-0" />
            <span className="text-secondary">&gt;&nbsp;</span>
            <span className="text-primary-light">{role}</span>
            <span className="typing-cursor" />
          </div>

          {/* Bio */}
          <p className="hero-bio text-base md:text-lg text-zinc-400 max-w-lg leading-relaxed mb-9">
            Second-year <span className="text-primary-light font-semibold">ECE student</span> building real-world tech at the intersection of{' '}
            <span className="text-secondary font-semibold">web</span>,{' '}
            <span className="text-accent font-semibold">AI</span>, and{' '}
            <span className="text-primary-light font-semibold">IoT</span>. I love turning ideas into products that merge code and circuits.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-10">
            <a
              href="#projects"
              onClick={scrollToProjects}
              id="hero-view-projects-btn"
              className="hero-cta magnetic-btn inline-flex items-center gap-2 px-7 py-4 bg-primary text-white font-bold text-sm rounded-lg hover:bg-primary-dark hover:shadow-[0_0_32px_rgba(124,58,237,0.45)] transition-all duration-300 uppercase tracking-wide"
            >
              <Code2 size={16} />
              View Projects
            </a>
            <a
              href="mailto:barath5727@gmail.com"
              id="hero-hire-me-btn"
              className="hero-cta magnetic-btn inline-flex items-center gap-2 px-7 py-4 border border-primary/35 text-primary-light font-bold text-sm rounded-lg hover:bg-primary/10 hover:border-primary/60 transition-all duration-300 uppercase tracking-wide"
            >
              <Mail size={16} />
              Hire Me
            </a>
          </div>

          {/* Social links */}
          <div className="hero-socials flex items-center gap-4">
            <span className="text-zinc-600 text-sm">Find me:</span>
            {[
              { href: 'https://github.com/barath0508', icon: <Github size={18} />, label: 'GitHub' },
              { href: 'mailto:barath5727@gmail.com', icon: <Mail size={18} />, label: 'Email' },
              { href: '#', icon: <Cpu size={18} />, label: 'IoT Projects' },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2.5 rounded-lg border border-white/8 text-zinc-500 hover:text-primary-light hover:border-primary/35 hover:bg-primary/8 transition-all duration-300"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── RIGHT — Visual ── */}
        <div className="hero-visual hidden lg:flex items-center justify-center">
          <HeroVisual />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-600 text-[11px] tracking-widest">
        <span>SCROLL</span>
        <ArrowDown size={14} />
      </div>
    </section>
  );
};

export default Hero;
