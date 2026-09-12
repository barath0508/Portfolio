import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Github,
  Mail,
  ArrowDown,
  Terminal,
  Code2,
  Cpu,
  Sparkles,
  ExternalLink,
  Layers,
  Flame,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  'Full-Stack Developer',
  'Next.js & TypeScript Builder',
  'AI & ML Engineer',
  '3D Web & IoT Developer',
  'ECE Undergrad @ RIT',
];

const useTypewriter = (texts, speed = 70, pause = 2000) => {
  const [display, setDisplay] = useState('');
  const [idx, setIdx] = useState(0);
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
        t = setTimeout(() => {
          setDeleting(false);
          setIdx((prev) => (prev + 1) % texts.length);
        }, 100);
      }
    }
    return () => clearTimeout(t);
  }, [display, idx, deleting, texts, speed, pause]);

  return display;
};

// ── Orbiting visual ─────────────────────────────────────────────────────────
const HeroVisual = () => {
  const techItems = [
    { label: 'Next.js', color: '#ffffff' },
    { label: 'TypeScript', color: '#38bdf8' },
    { label: 'Three.js', color: '#06b6d4' },
    { label: 'Python', color: '#ffd43b' },
    { label: 'Supabase', color: '#34d399' },
    { label: 'Verilog', color: '#f43f5e' },
    { label: 'WASM', color: '#a78bfa' },
    { label: 'Tailwind', color: '#38bdf8' },
  ];

  return (
    <div className="relative w-[360px] h-[360px] flex items-center justify-center select-none">
      {/* Background glow blob */}
      <div
        className="absolute inset-[10%] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(124,58,237,0.3) 0%, rgba(6,182,212,0.15) 55%, transparent 100%)',
          filter: 'blur(25px)',
          animation: 'glow-pulse 3s ease-in-out infinite',
        }}
      />

      {/* Orbit ring 1 */}
      <div
        className="orbit-ring"
        style={{ width: '100%', height: '100%', animation: 'spin 22s linear infinite' }}
      />
      {/* Orbit ring 2 */}
      <div
        className="orbit-ring"
        style={{
          width: '78%',
          height: '78%',
          animation: 'spin 15s linear infinite reverse',
          borderColor: 'rgba(6,182,212,0.2)',
        }}
      />

      {/* Orbiting tech badges */}
      {techItems.map((item, i) => {
        const angle = (i / techItems.length) * 360 - 90;
        const rad = (angle * Math.PI) / 180;
        const r = 47; // % from center
        const cx = 50 + r * Math.cos(rad);
        const cy = 50 + r * Math.sin(rad);
        return (
          <div
            key={item.label}
            className="absolute px-2.5 py-1 rounded-md glass text-[10px] font-mono font-bold shadow-lg z-10"
            style={{
              left: `${cx}%`,
              top: `${cy}%`,
              transform: 'translate(-50%, -50%)',
              color: item.color,
              borderColor: `${item.color}35`,
              animation: `float ${5 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
            }}
          >
            {item.label}
          </div>
        );
      })}

      {/* Centre card */}
      <div
        className="relative z-20 w-40 h-40 rounded-2xl glass flex flex-col items-center justify-center gap-2 border-glow"
        style={{ borderColor: 'rgba(124,58,237,0.4)' }}
      >
        <div className="w-12 h-12 rounded-xl bg-primary/25 border border-primary/40 flex items-center justify-center">
          <Code2 className="text-primary-light" size={24} />
        </div>
        <span className="text-white font-display font-bold text-sm">Barath R</span>
        <span className="text-primary-light font-mono text-[10px] text-center leading-tight">
          ECE • Full-Stack • AI
        </span>
        <div className="flex items-center gap-1 text-[9px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span>Building Real Tech</span>
        </div>
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

      tl.from('.hero-badge', { opacity: 0, y: -20, scale: 0.85, duration: 0.7, ease: 'back.out(1.5)' })
        .from('.hero-name-1', { opacity: 0, x: -50, duration: 0.8, ease: 'power4.out' }, '-=0.2')
        .from('.hero-name-2', { opacity: 0, x: -50, duration: 0.8, ease: 'power4.out' }, '-=0.55')
        .from('.hero-role', { opacity: 0, y: 18, duration: 0.6, ease: 'power3.out' }, '-=0.35')
        .from('.hero-bio', { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out' }, '-=0.2')
        .from('.hero-cta', { opacity: 0, y: 20, scale: 0.92, duration: 0.5, stagger: 0.12, ease: 'back.out(1.5)' }, '-=0.3')
        .from('.hero-stats-row', { opacity: 0, y: 15, duration: 0.5, ease: 'power2.out' }, '-=0.2')
        .from('.hero-socials', { opacity: 0, x: -15, duration: 0.5, ease: 'power2.out' }, '-=0.2')
        .from('.hero-visual', { opacity: 0, x: 50, scale: 0.88, duration: 1.1, ease: 'power3.out' }, '<-0.9');

      // Subtle parallax on scroll
      gsap.to('.hero-content-left', {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Scroll arrow bounce
      gsap.to('.scroll-indicator', {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.3,
        ease: 'sine.inOut',
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

  const openTerminal = () => {
    window.dispatchEvent(new CustomEvent('open-terminal'));
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="min-h-screen relative flex items-center justify-center pt-24 pb-16 px-6 md:px-12 overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* ── LEFT — Text ── */}
        <div className="hero-content-left text-left">
          {/* Status badge */}
          <div className="hero-badge inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass border border-primary/20 text-xs sm:text-sm font-medium text-zinc-300">
            <span
              className="w-2 h-2 bg-green-400 rounded-full"
              style={{ animation: 'glow-pulse 2s ease-in-out infinite' }}
            />
            <span>Available for internships & freelance</span>
            <Sparkles size={13} className="text-primary-light ml-1" />
          </div>

          {/* Name */}
          <h1 className="font-display font-black leading-none tracking-tighter mb-4">
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
          <div className="hero-role flex items-center gap-2 mb-5 font-mono text-sm sm:text-base md:text-lg text-zinc-300">
            <Terminal size={17} className="text-secondary shrink-0" />
            <span className="text-secondary">&gt;&nbsp;</span>
            <span className="text-primary-light font-semibold">{role}</span>
            <span className="typing-cursor" />
          </div>

          {/* Bio */}
          <p className="hero-bio text-sm sm:text-base md:text-lg text-zinc-400 max-w-xl leading-relaxed mb-7">
            ECE undergraduate at <span className="text-secondary font-semibold">Rajalakshmi Institute of Technology</span> building at the frontier of{' '}
            <span className="text-primary-light font-semibold">full-stack web</span>,{' '}
            <span className="text-accent font-semibold">AI systems</span>, and{' '}
            <span className="text-secondary font-semibold">IoT hardware</span>. Creator of privacy-first client-side web suites and interactive 3D telemetry dashboards.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 mb-8">
            <a
              href="#projects"
              onClick={scrollToProjects}
              id="hero-view-projects-btn"
              className="hero-cta inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 bg-primary text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-primary-dark hover:shadow-[0_0_32px_rgba(124,58,237,0.45)] transition-all duration-300 uppercase tracking-wide"
            >
              <Code2 size={16} />
              View Projects
            </a>
            <button
              onClick={openTerminal}
              id="hero-open-cli-btn"
              className="hero-cta inline-flex items-center gap-2 px-5 py-3.5 sm:py-4 rounded-xl glass border border-secondary/30 text-secondary hover:border-secondary/60 hover:bg-secondary/10 transition-all duration-300 text-xs sm:text-sm font-mono font-semibold"
            >
              <Terminal size={15} />
              <span>Developer CLI</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-400">Ctrl+K</span>
            </button>
            <a
              href="mailto:barath5727@gmail.com"
              id="hero-hire-me-btn"
              className="hero-cta inline-flex items-center gap-2 px-5 py-3.5 sm:py-4 border border-primary/30 text-primary-light font-bold text-xs sm:text-sm rounded-xl hover:bg-primary/10 hover:border-primary/60 transition-all duration-300 uppercase tracking-wide"
            >
              <Mail size={16} />
              Contact
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hero-stats-row grid grid-cols-3 gap-3 p-3.5 rounded-2xl glass border border-white/5 max-w-lg mb-8">
            <div>
              <p className="text-xl sm:text-2xl font-display font-black text-white">56+</p>
              <p className="text-[11px] font-mono text-zinc-500">GitHub Repos</p>
            </div>
            <div className="border-x border-white/5 px-3">
              <p className="text-xl sm:text-2xl font-display font-black text-secondary">37+</p>
              <p className="text-[11px] font-mono text-zinc-500">Client Tools</p>
            </div>
            <div className="pl-1">
              <p className="text-xl sm:text-2xl font-display font-black text-primary-light">8+</p>
              <p className="text-[11px] font-mono text-zinc-500">Live Deployments</p>
            </div>
          </div>

          {/* Social links */}
          <div className="hero-socials flex items-center gap-4">
            <span className="text-zinc-600 text-xs font-mono">Connect:</span>
            {[
              { href: 'https://github.com/barath0508', icon: <Github size={17} />, label: 'GitHub' },
              { href: 'mailto:barath5727@gmail.com', icon: <Mail size={17} />, label: 'Email' },
              { href: 'https://www.linkedin.com/in/barath-r-12773432b/', icon: <ExternalLink size={17} />, label: 'LinkedIn' },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2.5 rounded-lg border border-white/8 text-zinc-400 hover:text-primary-light hover:border-primary/35 hover:bg-primary/8 transition-all duration-300"
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
      <div className="scroll-indicator absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-600 text-[11px] tracking-widest font-mono">
        <span>SCROLL</span>
        <ArrowDown size={14} />
      </div>
    </section>
  );
};

export default Hero;
