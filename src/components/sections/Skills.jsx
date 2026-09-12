import React, { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Code2, Layers, Zap, Radio, Wrench, ShieldCheck, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  // ── Hardware & Embedded (ECE Core) ──
  {
    domain: 'hardware',
    title: 'FPGA & Digital Logic',
    icon: <Cpu size={22} className="text-secondary" />,
    badge: 'Hardware / RTL',
    color: 'secondary',
    skills: [
      'Verilog HDL',
      'Altera Quartus Prime',
      'ModelSim',
      'Finite State Machines (FSM)',
      'RTL Synthesis',
      'Clock Dividers',
      'FPGA Timing Constraints',
      'Digital Combinational Logic',
    ],
  },
  {
    domain: 'hardware',
    title: 'Microcontrollers & SoC',
    icon: <Zap size={22} className="text-primary-light" />,
    badge: 'Embedded Systems',
    color: 'primary',
    skills: [
      'Arduino (Uno, Nano, Mega)',
      'ESP32 (Wi-Fi / BLE)',
      'Embedded C',
      'Raspberry Pi',
      'GPIO & PWM Control',
      'Hardware Interrupts',
      'Timer Configuration',
    ],
  },
  {
    domain: 'hardware',
    title: 'Embedded Protocols & Comms',
    icon: <Radio size={22} className="text-accent" />,
    badge: 'Hardware Interfacing',
    color: 'accent',
    skills: [
      'UART',
      'I2C Protocol',
      'SPI Bus',
      'MQTT IoT Protocol',
      'ESP-NOW',
      'Serial Telemetry Streaming',
      'RS-232 Communication',
    ],
  },
  {
    domain: 'hardware',
    title: 'Sensors, Actuators & Power',
    icon: <Sparkles size={22} className="text-secondary" />,
    badge: 'Peripherals',
    color: 'secondary',
    skills: [
      'GPS (NEO-6M)',
      'IR Sensors',
      'Ultrasonic Transducers',
      'LDR & Solar Photovoltaics',
      'Servo & Stepper Motors',
      'Relay Driver Modules',
      'ADC / DAC Conversion',
    ],
  },
  {
    domain: 'hardware',
    title: 'Lab Instrumentation & CAD',
    icon: <Wrench size={22} className="text-primary-light" />,
    badge: 'Lab Prototyping',
    color: 'primary',
    skills: [
      'Digital Oscilloscope (DSO)',
      'Digital Multimeter Diagnostics',
      'Proteus Simulation',
      'Breadboard Prototyping',
      'Multisim Circuit Analysis',
      'Soldering & Wire Harnessing',
    ],
  },

  // ── Software & Web Engineering ──
  {
    domain: 'software',
    title: 'Languages & Core',
    icon: <Code2 size={22} className="text-secondary" />,
    badge: 'Software',
    color: 'secondary',
    skills: ['TypeScript', 'JavaScript (ESNext)', 'Python', 'C', 'Verilog HDL', 'SQL'],
  },
  {
    domain: 'software',
    title: 'Frontend Frameworks',
    icon: <Layers size={22} className="text-primary-light" />,
    badge: 'UI & UX',
    color: 'primary',
    skills: ['Next.js 16', 'React.js', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'HTML5 / CSS3'],
  },
  {
    domain: 'software',
    title: '3D WebGL & Creative Tech',
    icon: <Sparkles size={22} className="text-accent" />,
    badge: '3D Graphics',
    color: 'accent',
    skills: ['Three.js', 'React Three Fiber (R3F)', 'WebGL Shaders', 'Leaflet GIS', 'Web Audio API'],
  },
  {
    domain: 'software',
    title: 'Backend & Cloud Data',
    icon: <Zap size={22} className="text-secondary" />,
    badge: 'Cloud & APIs',
    color: 'secondary',
    skills: ['Node.js', 'Express.js', 'Flask', 'Supabase Real-time', 'Firebase', 'RESTful APIs'],
  },
  {
    domain: 'software',
    title: 'Performance & WASM',
    icon: <ShieldCheck size={22} className="text-primary-light" />,
    badge: 'Client Privacy',
    color: 'primary',
    skills: ['WebAssembly (WASM)', 'Web Workers', 'In-Memory Client Processing', 'Vite', 'Turbopack'],
  },
  {
    domain: 'software',
    title: 'AI / Machine Learning',
    icon: <Sparkles size={22} className="text-accent" />,
    badge: 'Intelligence',
    color: 'accent',
    skills: ['Predictive ML Models', 'Tesseract OCR', 'NLP Symptom Classification', 'Data Preprocessing'],
  },
  {
    domain: 'software',
    title: 'DevOps & Tooling',
    icon: <Wrench size={22} className="text-secondary" />,
    badge: 'Ecosystem',
    color: 'secondary',
    skills: ['Git & GitHub', 'Vercel', 'Postman', 'VS Code', 'Altera Quartus', 'ModelSim'],
  },
];

const COLOR_MAP = {
  primary: { border: 'rgba(124,58,237,0.22)', hover: 'rgba(124,58,237,0.45)', pill: 'tech-pill' },
  secondary: { border: 'rgba(6,182,212,0.22)', hover: 'rgba(6,182,212,0.45)', pill: 'tech-pill tech-pill-cyan' },
  accent: { border: 'rgba(129,140,248,0.22)', hover: 'rgba(129,140,248,0.45)', pill: 'tech-pill' },
};

const SkillCard = ({ category }) => {
  const [hovered, setHovered] = useState(false);
  const c = COLOR_MAP[category.color] || COLOR_MAP.primary;

  return (
    <div
      className="skills-card glass rounded-2xl p-6 shimmer-card transition-all duration-300 flex flex-col justify-between border border-white/5"
      style={{ borderColor: hovered ? c.hover : c.border }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>
        {/* Card header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/10"
              style={{
                background: hovered ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.04)',
                transition: 'background 0.3s',
              }}
            >
              {category.icon}
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base">{category.title}</h3>
              <span className="text-[10px] font-mono text-zinc-500">{category.skills.length} competencies</span>
            </div>
          </div>
          <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-zinc-400">
            {category.badge}
          </span>
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
  const [domainFilter, setDomainFilter] = useState('all');

  const filteredCategories = SKILL_CATEGORIES.filter((cat) => {
    if (domainFilter === 'all') return true;
    return cat.domain === domainFilter;
  });

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const allSkills = SKILL_CATEGORIES.flatMap((c) => c.skills);

  return (
    <section id="skills" ref={sectionRef} className="py-28 px-6 md:px-12 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Heading */}
        <div className="skills-heading text-center mb-10">
          <span className="inline-block text-xs font-mono font-semibold tracking-widest text-secondary uppercase mb-4 px-4 py-1.5 rounded-full border border-secondary/20 bg-secondary/8">
            &lt; technical competencies &gt;
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white">
            Skills &amp;{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #a78bfa, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Hardware Engineering
            </span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base mt-3 max-w-2xl mx-auto">
            A comprehensive dual toolkit: modern full-stack web and 3D graphics on one side, paired with rigorous ECE hardware, FPGA digital logic, and embedded microcontrollers on the other.
          </p>
        </div>

        {/* Domain Filter Switcher */}
        <div className="flex items-center justify-center gap-2.5 mb-12">
          {[
            { id: 'all', label: 'All Disciplines', count: SKILL_CATEGORIES.length },
            { id: 'hardware', label: '🔌 Hardware & Embedded (ECE)', count: SKILL_CATEGORIES.filter((c) => c.domain === 'hardware').length },
            { id: 'software', label: '💻 Software & Web', count: SKILL_CATEGORIES.filter((c) => c.domain === 'software').length },
          ].map((tab) => {
            const isActive = domainFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setDomainFilter(tab.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-mono font-bold transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-primary text-white border border-primary-light/40 shadow-[0_0_25px_rgba(124,58,237,0.45)]'
                    : 'bg-white/5 text-zinc-400 border border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-black/30 text-white' : 'bg-white/10 text-zinc-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Hardware Spotlight Banner if Hardware filter or All is active */}
        {domainFilter === 'hardware' && (
          <div className="mb-10 p-6 rounded-2xl glass border border-secondary/30 relative overflow-hidden bg-gradient-to-r from-secondary/10 via-transparent to-primary/10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-secondary uppercase tracking-wider">
                  ECE Hardware &amp; Embedded Systems Focus
                </span>
                <h3 className="text-xl font-display font-black text-white mt-1">
                  Bridging Silicon &amp; Digital Circuits with Software
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                  Trained in synthesizable Verilog HDL design, Altera FPGA architectures (Quartus &amp; ModelSim), microcontrollers (ESP32 / Arduino), sensor buses (UART/SPI/I2C), and hardware diagnostics using digital oscilloscopes.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
                  Verilog FSM • Altera FPGA
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-secondary/15 border border-secondary/30 text-xs font-mono text-secondary font-bold">
                  ESP32 • IoT Telemetry
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Skills grid */}
        <div className="skills-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCategories.map((cat) => (
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
