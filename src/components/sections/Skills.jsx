import React, { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    title: 'Languages',
    icon: '⚡',
    color: 'secondary',
    skills: ['TypeScript', 'JavaScript (ESNext)', 'Python', 'C', 'Verilog HDL', 'SQL'],
  },
  {
    title: 'Frontend & UI',
    icon: '🎨',
    color: 'primary',
    skills: ['Next.js 16', 'React.js', 'Tailwind CSS', 'HTML5 / CSS3', 'GSAP', 'Framer Motion'],
  },
  {
    title: '3D & Creative Tech',
    icon: '🌐',
    color: 'accent',
    skills: ['Three.js', 'React Three Fiber', 'WebGL', 'Canvas API', 'Leaflet GIS', 'Web Audio API'],
  },
  {
    title: 'Backend & Cloud',
    icon: '⚙️',
    color: 'secondary',
    skills: ['Node.js', 'Express.js', 'Flask', 'Supabase', 'Firebase', 'RESTful APIs'],
  },
  {
    title: 'Performance & WASM',
    icon: '🚀',
    color: 'primary',
    skills: ['WebAssembly (WASM)', 'Web Workers', 'Client-side In-Memory Processing', 'Vite', 'Turbopack'],
  },
  {
    title: 'AI / ML & Vision',
    icon: '🤖',
    color: 'accent',
    skills: ['Machine Learning', 'Tesseract OCR', 'NLP Basics', 'Predictive Modeling', 'Data Pipelines'],
  },
  {
    title: 'Embedded & Hardware',
    icon: '🔌',
    color: 'secondary',
    skills: ['Arduino', 'Altera FPGA', 'Digital Logic FSM', 'GPS & IR Sensors', 'IoT Telemetry'],
  },
  {
    title: 'Tools & Ecosystem',
    icon: '🛠️',
    color: 'primary',
    skills: ['Git & GitHub', 'Vercel', 'Postman', 'VS Code', 'Altera Quartus', 'ModelSim'],
  },
];

const COLOR_MAP = {
  primary: { border: 'rgba(124,58,237,0.22)', hover: 'rgba(124,58,237,0.4)', pill: 'tech-pill' },
  secondary: { border: 'rgba(6,182,212,0.22)', hover: 'rgba(6,182,212,0.4)', pill: 'tech-pill tech-pill-cyan' },
  accent: { border: 'rgba(129,140,248,0.22)', hover: 'rgba(129,140,248,0.4)', pill: 'tech-pill' },
};

const SkillCard = ({ category }) => {
  const [hovered, setHovered] = useState(false);
  const c = COLOR_MAP[category.color] || COLOR_MAP.primary;

  return (
    <div
      className="skills-card glass rounded-2xl p-6 shimmer-card transition-all duration-300 flex flex-col justify-between"
      style={{ borderColor: hovered ? c.hover : c.border, borderWidth: '1px', borderStyle: 'solid' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>
        {/* Card header */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{
              background: hovered ? 'rgba(124,58,237,0.18)' : 'rgba(255,255,255,0.04)',
              transition: 'background 0.3s',
            }}
          >
            {category.icon}
          </span>
          <div>
            <h3 className="font-display font-bold text-white text-base">{category.title}</h3>
            <span className="text-[10px] font-mono text-zinc-500">{category.skills.length} competencies</span>
          </div>
        </div>

        {/* Skill pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {category.skills.map((skill) => (
            <span key={skill} className={c.pill}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skills-heading',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.skills-heading', start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.skills-card',
        { opacity: 0, y: 35, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.skills-grid', start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.skills-marquee',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.skills-marquee', start: 'top 90%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const allSkills = SKILL_CATEGORIES.flatMap((c) => c.skills);

  return (
    <section id="skills" ref={sectionRef} className="py-28 px-6 md:px-12 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Heading */}
        <div className="skills-heading text-center mb-16">
          <span className="inline-block text-xs font-mono font-semibold tracking-widest text-secondary uppercase mb-4 px-4 py-1.5 rounded-full border border-secondary/20 bg-secondary/8">
            &lt; technical stack &gt;
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white">
            Skills &{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #a78bfa, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Technologies
            </span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base mt-3 max-w-xl mx-auto">
            A comprehensive engineering toolkit spanning modern full-stack web applications, 3D WebGL scenes, AI models, and embedded digital logic.
          </p>
        </div>

        {/* Skills grid */}
        <div className="skills-grid grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SKILL_CATEGORIES.map((cat) => (
            <SkillCard key={cat.title} category={cat} />
          ))}
        </div>

        {/* Scrolling skills marquee */}
        <div className="skills-marquee mt-16 overflow-hidden relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, #05091a, transparent)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(-90deg, #05091a, transparent)' }}
          />
          <div className="flex gap-3 animate-marquee" style={{ width: 'max-content' }}>
            {[...allSkills, ...allSkills].map((skill, i) => (
              <span
                key={i}
                className="whitespace-nowrap px-4 py-2 rounded-full border border-primary/20 text-zinc-300 text-xs font-mono bg-carbon/80 shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
