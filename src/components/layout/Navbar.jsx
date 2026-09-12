import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Mail, Terminal } from 'lucide-react';

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Highlight active section based on scroll
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.35 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target && window.lenis) window.lenis.scrollTo(target);
    else if (target) target.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const openTerminal = () => {
    window.dispatchEvent(new CustomEvent('open-terminal'));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/85 backdrop-blur-xl border-b border-primary/15 py-3 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo / Name */}
        <a
          href="#hero"
          onClick={(e) => scrollTo(e, '#hero')}
          className="font-display font-black text-xl md:text-2xl tracking-tight text-white group flex items-center gap-2.5"
        >
          <span className="w-8 h-8 rounded-xl bg-primary/20 border border-primary/35 flex items-center justify-center text-sm text-primary-light font-bold group-hover:bg-primary/30 group-hover:border-primary/60 transition-all shadow-sm">
            B
          </span>
          <span>
            Barath <span className="text-primary-light group-hover:text-secondary transition-colors">R</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ name, href }) => {
            const isActive = activeSection === href.slice(1);
            return (
              <a
                key={name}
                href={href}
                onClick={(e) => scrollTo(e, href)}
                className={`text-xs font-mono font-medium tracking-wider uppercase transition-colors relative py-1 ${
                  isActive ? 'text-primary-light font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {name}
                <span
                  className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 hover:w-full'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Right side actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* CLI Terminal Launcher */}
          <button
            onClick={openTerminal}
            aria-label="Open developer terminal"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-secondary/30 text-secondary text-xs font-mono font-medium hover:bg-secondary/10 transition-colors"
          >
            <Terminal size={13} />
            <span>CLI</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-white/10 text-zinc-400">Ctrl+K</span>
          </button>

          <a
            href="https://github.com/barath0508"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg border border-white/10 text-zinc-400 hover:text-primary-light hover:border-primary/30 hover:bg-primary/8 transition-all duration-300"
            aria-label="GitHub"
          >
            <Github size={17} />
          </a>
          <a
            href="mailto:barath5727@gmail.com"
            className="px-4 py-2 bg-primary text-white font-semibold text-xs rounded-lg hover:bg-primary-dark hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1.5"
          >
            <Mail size={14} />
            Hire Me
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={openTerminal}
            aria-label="Open CLI"
            className="p-2 rounded-lg border border-secondary/30 text-secondary"
          >
            <Terminal size={17} />
          </button>
          <button
            className="p-2 text-zinc-300 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-2xl border-b border-primary/20 px-6 py-6 flex flex-col gap-4 md:hidden shadow-2xl"
          >
            {NAV_LINKS.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                onClick={(e) => scrollTo(e, href)}
                className={`text-sm font-display font-semibold transition-colors ${
                  activeSection === href.slice(1) ? 'text-primary-light' : 'text-zinc-300 hover:text-white'
                }`}
              >
                {name}
              </a>
            ))}

            <div className="pt-2 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openTerminal();
                }}
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-secondary/30 text-secondary text-xs font-mono font-semibold bg-secondary/5"
              >
                <Terminal size={15} />
                Open Developer Terminal
              </button>
              <a
                href="mailto:barath5727@gmail.com"
                className="px-5 py-3 bg-primary text-white font-bold text-xs rounded-lg text-center hover:bg-primary-dark transition-colors"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
