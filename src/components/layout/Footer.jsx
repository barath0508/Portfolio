import React from 'react';
import { Github, Mail, Linkedin, Heart, ArrowUp, Code2 } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    if (window.lenis) window.lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-primary/10 bg-carbon/60 backdrop-blur-md">
      <div className="container mx-auto px-6 md:px-12 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <a href="#hero" className="font-display font-black text-xl text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center text-xs text-primary-light font-bold">B</span>
              <span>Barath <span className="text-primary-light">R</span></span>
            </a>
            <p className="text-xs text-zinc-500 max-w-xs text-center md:text-left">
              Building at the intersection of software, AI, and hardware.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { href: 'https://github.com/barath0508', icon: <Github size={18} />, label: 'GitHub' },
              { href: 'mailto:barath5727@gmail.com', icon: <Mail size={18} />, label: 'Email' },
              { href: '#', icon: <Linkedin size={18} />, label: 'LinkedIn' },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2.5 rounded-lg border border-white/10 text-zinc-500 hover:text-primary-light hover:border-primary/30 hover:bg-primary/8 transition-all duration-300"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/20 text-zinc-400 hover:text-primary-light hover:border-primary/40 hover:bg-primary/8 text-sm font-medium transition-all duration-300 group"
          >
            Back to top
            <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-600 text-xs">
          <p>© 2026 Barath R. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Crafted with <Heart size={11} className="text-primary-light fill-primary-light" /> using React + GSAP + Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
