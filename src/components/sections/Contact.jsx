import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect } from 'react';
import { Mail, Github, Linkedin, MessageSquare, Send, MapPin, Clock } from 'lucide-react';

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
    description: 'Best way to reach me',
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
    description: 'Check out my code & projects',
  },
  {
    id: 'contact-linkedin',
    icon: <Linkedin size={22} />,
    label: 'LinkedIn',
    value: 'Connect with me',
    href: 'https://www.linkedin.com/in/barath-r-12773432b/',
    color: '#67e8f9',
    bg: 'rgba(6,182,212,0.12)',
    border: 'rgba(6,182,212,0.20)',
    description: 'Let\'s grow our network',
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
      className="group flex items-center gap-4 glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
      style={{
        borderColor: hovered ? link.border : 'rgba(255,255,255,0.06)',
        borderStyle: 'solid', borderWidth: '1px',
        boxShadow: hovered ? `0 12px 40px ${link.bg}` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
        style={{ background: hovered ? link.bg.replace('0.12', '0.22') : link.bg, color: link.color }}
      >
        {link.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-zinc-400 text-xs font-mono uppercase tracking-wider mb-0.5">{link.label}</p>
        <p className="text-white font-semibold text-sm truncate" style={{ color: hovered ? link.color : 'white', transition: 'color 0.3s' }}>
          {link.value}
        </p>
        <p className="text-zinc-600 text-xs mt-0.5">{link.description}</p>
      </div>
      <Send
        size={15}
        className="shrink-0 text-zinc-600 group-hover:text-primary-light transition-all duration-300"
        style={{ transform: hovered ? 'translate(3px, -3px)' : 'translate(0, 0)' }}
      />
    </a>
  );
};

const Contact = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-heading', {
        opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-heading', start: 'top 85%' },
      });

      gsap.from('.contact-intro', {
        opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-intro', start: 'top 85%' },
      });

      gsap.from('.contact-link-card', {
        opacity: 0, x: -30, duration: 0.6, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-links', start: 'top 80%' },
      });

      gsap.from('.contact-aside', {
        opacity: 0, x: 40, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-aside', start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-28 px-6 md:px-12 relative overflow-hidden">
      {/* BG gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(124,58,237,0.07) 0%, transparent 65%)' }} />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Heading */}
        <div className="contact-heading text-center mb-6">
          <span className="inline-block text-xs font-mono font-semibold tracking-widest text-primary-light uppercase mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/8">
            &lt; get in touch /&gt;
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white">
            Let&apos;s{' '}
            <span style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Connect
            </span>
          </h2>
        </div>

        {/* Subheading */}
        <p className="contact-intro text-zinc-400 text-base md:text-lg text-center max-w-2xl mx-auto mb-16 leading-relaxed">
          I&apos;m always open to exciting opportunities, collaborations, or just a great conversation about tech. 
          Feel free to reach out — I&apos;ll get back to you as soon as I can!
        </p>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Contact links */}
          <div className="lg:col-span-3 space-y-4 contact-links">
            {CONTACT_LINKS.map(link => (
              <div key={link.id} className="contact-link-card">
                <ContactCard link={link} />
              </div>
            ))}
          </div>

          {/* Aside — availability card + info */}
          <div className="contact-aside lg:col-span-2 space-y-5">
            {/* Availability card */}
            <div className="glass rounded-2xl p-6 border border-primary/15 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)' }} />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2.5 h-2.5 bg-green-400 rounded-full" style={{ animation: 'glow-pulse 2s ease-in-out infinite', boxShadow: '0 0 8px rgba(74,222,128,0.6)' }} />
                  <span className="text-green-400 text-sm font-semibold">Available for opportunities</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-zinc-400 text-sm">
                    <Clock size={14} className="text-primary-light shrink-0" />
                    <span>Response within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-zinc-400 text-sm">
                    <MapPin size={14} className="text-secondary shrink-0" />
                    <span>Chennai, Tamil Nadu, India</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-zinc-400 text-sm">
                    <MessageSquare size={14} className="text-accent shrink-0" />
                    <span>Open to internships & freelance</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick pitch card */}
            <div className="glass rounded-2xl p-6 border border-secondary/15">
              <h4 className="font-display font-bold text-white text-base mb-3">Looking for a developer?</h4>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                I bring a unique mix of <span className="text-primary-light font-semibold">web development</span>, <span className="text-accent font-semibold">AI integration</span>, and <span className="text-secondary font-semibold">IoT</span> expertise. Whether it's a web app, a smart sensor dashboard, or an AI-powered tool — I can build it.
              </p>
              <a
                href="mailto:barath5727@gmail.com"
                id="contact-email-cta"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-dark hover:shadow-[0_0_28px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <Mail size={15} />
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
