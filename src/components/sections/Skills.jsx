import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    title: 'Programming',
    icon: '💻',
    color: 'primary',
    skills: ['Python', 'JavaScript', 'C'],
  },
  {
    title: 'Frontend',
    icon: '🎨',
    color: 'accent',
    skills: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'GSAP'],
  },
  {
    title: 'Backend',
    icon: '⚙️',
    color: 'secondary',
    skills: ['Node.js', 'Flask', 'REST APIs'],
  },
  {
    title: 'Database',
    icon: '🗄️',
    color: 'primary',
    skills: ['Firebase', 'Firestore'],
  },
  {
    title: 'AI / ML & Data',
    icon: '🤖',
    color: 'accent',
    skills: ['Machine Learning', 'OCR (Tesseract)', 'NLP Basics', 'Data Processing'],
  },
  {
    title: 'IoT & Hardware',
    icon: '🔌',
    color: 'secondary',
    skills: ['Arduino', 'GPS Sensors', 'IR Sensors', 'IoT Design', 'Real-time Data'],
  },
  {
    title: 'Tools & Others',
    icon: '🛠️',
    color: 'primary',
    skills: ['Git & GitHub', 'UI/UX Design', 'Postman', 'VS Code'],
  },
];

const COLOR_MAP = {
  primary:   { border: 'rgba(124,58,237,0.22)', hover: 'rgba(124,58,237,0.30)', pill: 'tech-pill' },
  secondary: { border: 'rgba(6,182,212,0.22)',  hover: 'rgba(6,182,212,0.30)',  pill: 'tech-pill tech-pill-cyan' },
  accent:    { border: 'rgba(129,140,248,0.22)', hover: 'rgba(129,140,248,0.30)', pill: 'tech-pill' },
};

const SkillCard = ({ category }) => {
  const [hovered, setHovered] = useState(false);
  const c = COLOR_MAP[category.color];

  return (
    <div
      className="skills-card glass rounded-2xl p-6 shimmer-card transition-all duration-300"
      style={{ borderColor: hovered ? c.hover : c.border, borderWidth: '1px', borderStyle: 'solid' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card header */}
      <div className="flex items-center gap-3 mb-5">
        <span
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ background: hovered ? 'rgba(124,58,237,0.18)' : 'rgba(255,255,255,0.04)', transition: 'background 0.3s' }}
        >
          {category.icon}
        </span>
        <h3 className="font-display font-bold text-white text-base">{category.title}</h3>
      </div>

      {/* Skill pills */}
      <div className="flex flex-wrap gap-2">
        {category.skills.map(skill => (
          <span key={skill} className={c.pill}>{skill}</span>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills-heading', {
        opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.skills-heading', start: 'top 85%' },
      });

      gsap.from('.skills-card', {
        opacity: 0, y: 40, scale: 0.94,
        duration: 0.65, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.skills-grid', start: 'top 78%' },
      });

      gsap.from('.skills-marquee', {
        opacity: 0, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: '.skills-marquee', start: 'top 90%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // All skills flat list for marquee
  const allSkills = SKILL_CATEGORIES.flatMap(c => c.skills);

  return (
    <section id="skills" ref={sectionRef} className="py-28 px-6 md:px-12 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Heading */}
        <div className="skills-heading text-center mb-16">
          <span className="inline-block text-xs font-mono font-semibold tracking-widest text-secondary uppercase mb-4 px-4 py-1.5 rounded-full border border-secondary/20 bg-secondary/8">
            &lt; what i know /&gt;
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white">
            Skills &{' '}
            <span style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Technologies
            </span>
          </h2>
          <p className="text-zinc-500 text-base mt-4 max-w-xl mx-auto">
            A diverse toolkit spanning full-stack development, AI, and embedded systems.
          </p>
        </div>

        {/* Skills grid */}
        <div className="skills-grid grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SKILL_CATEGORIES.map(cat => (
            <SkillCard key={cat.title} category={cat} />
          ))}
        </div>

        {/* Scrolling skills marquee */}
        <div className="skills-marquee mt-16 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(90deg, #05091a, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(-90deg, #05091a, transparent)' }} />
          <div className="flex gap-4 animate-marquee" style={{ width: 'max-content' }}>
            {[...allSkills, ...allSkills].map((skill, i) => (
              <span
                key={i}
                className="whitespace-nowrap px-5 py-2.5 rounded-full border border-primary/15 text-zinc-500 text-sm font-mono bg-carbon/60"
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
