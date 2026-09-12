import React, { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Github, Linkedin, Send, MapPin, Clock, Copy, Check, MessageSquare, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_LINKS = [
  {
    id: 'contact-email',
    icon: <Mail size={22} />,
    label: 'Email',
    value: 'barath5727@gmail.com',
    href: 'mailto:barath5727@gmail.com',
    color: '#a78bfa',
    bg: 'rgba(124,58,237,0.12)',
    border: 'rgba(124,58,237,0.22)',
    description: 'Fastest way to reach me for opportunities',
  },
  {
    id: 'contact-github',
    icon: <Github size={22} />,
    label: 'GitHub',
    value: 'github.com/barath0508',
    href: 'https://github.com/barath0508',
    color: '#e2e8f0',
    bg: 'rgba(255,255,255,0.06)',
    border: 'rgba(255,255,255,0.10)',
    description: 'Explore 56+ open-source repositories',
  },
  {
    id: 'contact-linkedin',
    icon: <Linkedin size={22} />,
    label: 'LinkedIn',
    value: 'Barath R',
    href: 'https://www.linkedin.com/in/barath-r-12773432b/',
    color: '#67e8f9',
    bg: 'rgba(6,182,212,0.12)',
    border: 'rgba(6,182,212,0.20)',
    description: 'Connect professionally & network',
  },
];

const ContactCard = ({ link }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={link.href}
      id={link.id}
      target={link.href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="group flex items-center gap-4 glass rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 border border-white/5"
      style={{
        borderColor: hovered ? link.border : 'rgba(255,255,255,0.06)',
        boxShadow: hovered ? `0 12px 40px ${link.bg}` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
        style={{
          background: hovered ? link.bg.replace('0.12', '0.25') : link.bg,
          color: link.color,
        }}
      >
        {link.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-zinc-500 text-xs font-mono uppercase tracking-wider mb-0.5">{link.label}</p>
        <p
          className="text-white font-semibold text-sm sm:text-base truncate transition-colors"
          style={{ color: hovered ? link.color : 'white' }}
        >
          {link.value}
        </p>
        <p className="text-zinc-400 text-xs mt-0.5">{link.description}</p>
      </div>
      <Send
        size={16}
        className="shrink-0 text-zinc-500 group-hover:text-primary-light transition-all duration-300"
        style={{ transform: hovered ? 'translate(3px, -3px)' : 'translate(0, 0)' }}
      />
    </a>
  );
};

const Contact = () => {
  const sectionRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('barath5727@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-heading', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-heading', start: 'top 85%' },
      });

      gsap.from('.contact-intro', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-intro', start: 'top 85%' },
      });

      gsap.from('.contact-link-card', {
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-links', start: 'top 80%' },
      });

      gsap.from('.contact-aside', {
        opacity: 0,
        x: 40,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-aside', start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-28 px-6 md:px-12 relative overflow-hidden">
      {/* BG gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 60%, rgba(124,58,237,0.08) 0%, transparent 65%)',
        }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Heading */}
        <div className="contact-heading text-center mb-5">
          <span className="inline-block text-xs font-mono font-semibold tracking-widest text-primary-light uppercase mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/8">
            &lt; communication &gt;
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white">
            Let's{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #a78bfa, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Connect
            </span>
          </h2>
        </div>

        {/* Subheading */}
        <p className="contact-intro text-zinc-400 text-sm md:text-base text-center max-w-2xl mx-auto mb-16 leading-relaxed">
          Whether you have an internship opportunity, a project to collaborate on, or want to discuss full-stack web architectures and embedded systems — I'd love to hear from you.
        </p>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Contact links */}
          <div className="lg:col-span-3 space-y-4 contact-links">
            {CONTACT_LINKS.map((link) => (
              <div key={link.id} className="contact-link-card">
                <ContactCard link={link} />
              </div>
            ))}

            {/* Quick Email Copier */}
            <div className="glass rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Quick Copy Email</p>
                  <p className="text-zinc-500 text-xs font-mono">barath5727@gmail.com</p>
                </div>
              </div>
              <button
                onClick={copyEmail}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-xs font-mono flex items-center justify-center gap-2 transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-green-400" />
                    <span className="text-green-400 font-bold">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Aside — availability card + info */}
          <div className="contact-aside lg:col-span-2 space-y-5">
            {/* Availability card */}
            <div className="glass rounded-2xl p-6 sm:p-7 border border-primary/20 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-28 h-28 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)',
                }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-5">
                  <div
                    className="w-2.5 h-2.5 bg-green-400 rounded-full"
                    style={{
                      animation: 'glow-pulse 2s ease-in-out infinite',
                      boxShadow: '0 0 10px rgba(74,222,128,0.7)',
                    }}
                  />
                  <span className="text-green-400 text-sm font-bold tracking-wide">
                    Available for Opportunities
                  </span>
                </div>
                <div className="space-y-3.5">
                  <div className="flex items-center gap-3 text-zinc-300 text-xs sm:text-sm">
                    <Clock size={15} className="text-primary-light shrink-0" />
                    <span>Typical response time: &lt; 12 hours</span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-300 text-xs sm:text-sm">
                    <MapPin size={15} className="text-secondary shrink-0" />
                    <span>Chennai, Tamil Nadu, India (IST / UTC+5:30)</span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-300 text-xs sm:text-sm">
                    <MessageSquare size={15} className="text-accent shrink-0" />
                    <span>Open to internships, freelance &amp; research</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick pitch card */}
            <div className="glass rounded-2xl p-6 sm:p-7 border border-secondary/20">
              <h4 className="font-display font-bold text-white text-base mb-2.5 flex items-center gap-2">
                <Sparkles size={16} className="text-secondary" />
                Why Work With Me?
              </h4>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-5">
                I take concepts from zero to production quickly — combining <span className="text-primary-light font-semibold">modern frontend aesthetics</span>, <span className="text-accent font-semibold">WASM performance</span>, and <span className="text-secondary font-semibold">robust backends</span>.
              </p>
              <a
                href="mailto:barath5727@gmail.com"
                id="contact-email-cta"
                className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-primary text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-primary-dark hover:shadow-[0_0_28px_rgba(124,58,237,0.45)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <Mail size={16} />
                Send Me an Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
