import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Mail } from 'lucide-react';

const NAV_LINKS = [
  { name: 'About',     href: '#about' },
  { name: 'Skills',    href: '#skills' },
  { name: 'Projects',  href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact',   href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection]  = useState('hero');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Highlight active section based on scroll
  useEffect(() => {
    const sections = NAV_LINKS.map(l => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.35 }
    );
    sections.forEach(id => {
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled
          ? 'bg-background/85 backdrop-blur-xl border-b border-primary/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo / Name */}
        <a
          href="#hero"
          onClick={(e) => scrollTo(e, '#hero')}
          className="font-display font-black text-xl md:text-2xl tracking-tight text-white group flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-sm text-primary-light font-bold group-hover:bg-primary/30 transition-colors">
            B
          </span>
          <span className="group-hover:text-primary-light transition-colors">Barath</span>
          <span className="text-primary-light group-hover:text-white transition-colors">R</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ name, href }) => (
            <a
              key={name}
              href={href}
              onClick={(e) => scrollTo(e, href)}
              className={`text-sm font-medium tracking-wide transition-colors relative group ${
                activeSection === href.slice(1)
                  ? 'text-primary-light'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {name}
              <span
                className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ${
                  activeSection === href.slice(1) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </a>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/barath0508"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg border border-white/10 text-zinc-400 hover:text-primary-light hover:border-primary/30 hover:bg-primary/8 transition-all duration-300"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="mailto:barath5727@gmail.com"
            className="px-5 py-2.5 bg-primary text-white font-semibold text-sm rounded-lg hover:bg-primary-dark hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
          >
            <Mail size={15} />
            Hire Me
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 text-zinc-300 hover:text-white transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="absolute top-full left-0 right-0 bg-background/96 backdrop-blur-xl border-b border-primary/10 px-6 py-6 flex flex-col gap-5 md:hidden"
          >
            {NAV_LINKS.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                onClick={(e) => scrollTo(e, href)}
                className={`text-base font-display font-semibold transition-colors ${
                  activeSection === href.slice(1) ? 'text-primary-light' : 'text-zinc-300 hover:text-white'
                }`}
              >
                {name}
              </a>
            ))}
            <a
              href="mailto:barath5727@gmail.com"
              className="mt-2 px-5 py-3 bg-primary text-white font-bold text-sm rounded-lg text-center hover:bg-primary-dark transition-colors"
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
