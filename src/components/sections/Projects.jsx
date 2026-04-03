import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect } from 'react';
import { Github, ExternalLink, Brain, HeartPulse, Cpu, Zap } from 'lucide-react';

// Project Thumbnails
import aiAdvisorImg from '../../assets/projects/ai-advisor.png';
import medicalChatbotImg from '../../assets/projects/medical-chatbot.png';
import iotMonitoringImg from '../../assets/projects/iot-monitoring.png';
import energizeHackathonImg from '../../assets/projects/energize-hackathon.png';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 'energize-2026-hackathon',
    image: energizeHackathonImg,
    icon: <Zap size={26} />,
    iconColor: '#06b6d4',
    iconBg: 'rgba(6,182,212,0.18)',
    title: 'Energize 2026',
    subtitle: 'Event Website',
    description:
      'A premium, high-performance website built for an upcoming hackathon. Features a highly optimized 3D Digital Twin dashboard using Three.js, GSAP-driven micro-animations, magnetic hover effects, and a custom audio-player initialization pattern.',
    tags: ['React', 'Three.js', 'GSAP', 'Tailwind'],
    tagClass: 'tech-pill tech-pill-cyan',
    github: 'https://github.com/barath0508',
    demo: 'https://energize2026.vercel.app',
    badge: 'Event · 3D Web',
    badgeColor: 'rgba(6,182,212,0.15)',
    badgeBorder: 'rgba(6,182,212,0.25)',
    accentGradient: 'linear-gradient(135deg, rgba(6,182,212,0.14) 0%, rgba(124,58,237,0.05) 100%)',
  },
  {
    id: 'ai-academic-advisor',
    image: aiAdvisorImg,
    icon: <Brain size={26} />,
    iconColor: '#a78bfa',
    iconBg: 'rgba(124,58,237,0.18)',
    title: 'AI Academic Advisor',
    subtitle: 'for College Students',
    description:
      'A web application that analyses student marksheets using OCR, predicts GPA with machine learning, recommends electives based on performance trends, and identifies scholarship eligibility using AI and data analytics.',
    tags: ['React.js', 'Flask', 'Python', 'ML', 'OCR (Tesseract)', 'Firebase'],
    tagClass: 'tech-pill',
    github: 'https://github.com/barath0508',
    demo: null,
    badge: 'AI · Web',
    badgeColor: 'rgba(124,58,237,0.2)',
    badgeBorder: 'rgba(124,58,237,0.3)',
    accentGradient: 'linear-gradient(135deg, rgba(124,58,237,0.18) 0%, rgba(129,140,248,0.06) 100%)',
  },
  {
    id: 'medical-advisor-chatbot',
    image: medicalChatbotImg,
    icon: <HeartPulse size={26} />,
    iconColor: '#67e8f9',
    iconBg: 'rgba(6,182,212,0.18)',
    title: 'Medical Advisor Chatbot',
    subtitle: 'NLP-powered Guidance',
    description:
      'A web-based conversational chatbot that provides basic medical guidance using natural language processing and machine learning. Users can describe symptoms and receive preliminary advisories and suggestions.',
    tags: ['Python', 'NLP', 'Flask', 'Node.js', 'HTML/CSS', 'ML'],
    tagClass: 'tech-pill tech-pill-cyan',
    github: 'https://github.com/barath0508',
    demo: 'https://medicode4.netlify.app',
    badge: 'NLP · Healthcare',
    badgeColor: 'rgba(6,182,212,0.15)',
    badgeBorder: 'rgba(6,182,212,0.25)',
    accentGradient: 'linear-gradient(135deg, rgba(6,182,212,0.14) 0%, rgba(129,140,248,0.05) 100%)',
  },
  {
    id: 'iot-monitoring',
    image: iotMonitoringImg,
    icon: <Cpu size={26} />,
    iconColor: '#a78bfa',
    iconBg: 'rgba(129,140,248,0.18)',
    title: 'IoT Smart Monitoring',
    subtitle: 'Real-time Sensor Systems',
    description:
      'A suite of IoT-based prototypes built with Arduino and various sensors (GPS, IR, etc.) for real-time data collection, automation, and environmental monitoring applications — bridging embedded hardware with cloud dashboards.',
    tags: ['Arduino', 'C', 'GPS', 'IR Sensors', 'Firebase', 'IoT Design'],
    tagClass: 'tech-pill',
    github: 'https://github.com/barath0508',
    demo: 'https://mini-project25.netlify.app',
    badge: 'IoT · Hardware',
    badgeColor: 'rgba(129,140,248,0.15)',
    badgeBorder: 'rgba(129,140,248,0.25)',
    accentGradient: 'linear-gradient(135deg, rgba(129,140,248,0.15) 0%, rgba(124,58,237,0.05) 100%)',
  },
];

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`project-card projects-card glass rounded-2xl overflow-hidden flex flex-col h-full`}
      style={{ animationDelay: `${index * 0.15}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      id={`project-card-${project.id}`}
    >
      {/* Card Visual / Thumbnail */}
      <div className="project-image-container">
        <img
          src={project.image}
          alt={project.title}
          className="project-image"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
        
        {/* Floating badge over image */}
        <div className="absolute top-4 right-4 z-20">
          <span
            className="text-[10px] font-mono font-bold px-3 py-1.5 rounded-full backdrop-blur-md border shadow-lg"
            style={{ background: project.badgeColor, borderColor: project.badgeBorder, color: 'white' }}
          >
            {project.badge}
          </span>
        </div>
      </div>

      <div className="p-7 pt-5 flex flex-col flex-1 gap-5">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 shadow-inner overflow-hidden relative"
              style={{ background: project.iconBg, color: project.iconColor }}
            >
              <div className="absolute inset-0 bg-white/5" />
              <div className="relative z-10 transition-transform duration-500" style={{ transform: hovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1)' }}>
                {project.icon}
              </div>
            </div>
            <div>
              <h3 className="font-display font-black text-white text-xl leading-tight tracking-tight group-hover:text-primary-light transition-colors">{project.title}</h3>
              <p className="text-zinc-500 text-xs mt-0.5 font-medium">{project.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-zinc-400 text-sm leading-relaxed flex-1">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className={project.tagClass}>{tag}</span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-1">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            id={`${project.id}-github-link`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-zinc-400 text-xs font-semibold hover:text-primary-light hover:border-primary/35 hover:bg-primary/8 transition-all duration-300"
          >
            <Github size={14} /> View Code
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/15 border border-primary/25 text-primary-light text-xs font-semibold hover:bg-primary/25 transition-all duration-300"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-heading', {
        opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.projects-heading', start: 'top 85%' },
      });

      gsap.from('.projects-card', {
        opacity: 0, y: 50, scale: 0.93,
        duration: 0.75, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.projects-grid', start: 'top 78%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-28 px-6 md:px-12 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(124,58,237,0.06) 0%, transparent 70%)' }} />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Heading */}
        <div className="projects-heading text-center mb-16">
          <span className="inline-block text-xs font-mono font-semibold tracking-widest text-primary-light uppercase mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/8">
            &lt; my work /&gt;
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white">
            Featured{' '}
            <span style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Projects
            </span>
          </h2>
          <p className="text-zinc-500 text-base mt-4 max-w-xl mx-auto">
            Real-world solutions at the crossroads of web, AI, and embedded systems.
          </p>
        </div>

        {/* Project cards grid */}
        <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* More work CTA */}
        <div className="mt-14 text-center">
          <a
            href="https://github.com/barath0508"
            target="_blank"
            rel="noopener noreferrer"
            id="view-all-github-btn"
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl border border-primary/25 text-zinc-300 text-sm font-semibold hover:bg-primary/10 hover:text-primary-light hover:border-primary/45 transition-all duration-300"
          >
            <Github size={18} />
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
