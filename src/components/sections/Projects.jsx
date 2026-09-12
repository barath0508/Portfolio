import React, { useRef, useState, useLayoutEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Github,
  ExternalLink,
  Brain,
  HeartPulse,
  Cpu,
  Zap,
  FileText,
  Sun,
  QrCode,
  Globe,
  Info,
  Sparkles,
  ArrowUpRight,
  Radio,
} from 'lucide-react';
import ProjectDetailModal from './ProjectDetailModal';

// Project Thumbnails
import icreatepdfImg from '../../assets/projects/icreatepdf.jpg';
import solarTrackerImg from '../../assets/projects/solar-tracker.jpg';
import ietePortalImg from '../../assets/projects/iete-rit.jpg';
import qrloopImg from '../../assets/projects/qrloop.jpg';
import flashespImg from '../../assets/projects/flashesp.jpg';
import healthlinkImg from '../../assets/projects/healthlink.jpg';
import conformalAntennaImg from '../../assets/projects/conformal-antenna.jpg';
import energizeHackathonImg from '../../assets/projects/energize-hackathon.png';
import aiAdvisorImg from '../../assets/projects/ai-advisor.png';
import medicalChatbotImg from '../../assets/projects/medical-chatbot.png';
import iotMonitoringImg from '../../assets/projects/iot-monitoring.png';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ['All', 'Flagship & Web', '3D & IoT', 'AI / ML', 'Hardware & Systems'];

const PROJECTS = [
  {
    id: 'icreatepdf',
    image: icreatepdfImg,
    icon: <FileText size={24} />,
    iconColor: '#38bdf8',
    iconBg: 'rgba(56,189,248,0.16)',
    category: 'Flagship & Web',
    title: 'iCreatePDF',
    subtitle: '100% Client-Side PDF Suite',
    description:
      'A privacy-first document processing suite with 37+ tools running entirely in-browser via WebAssembly & modern web APIs. No files ever touch a remote server.',
    detailedDescription:
      'iCreatePDF is a production web application delivering 37+ PDF utilities running 100% client-side. Utilizing modern WebAssembly modules, canvas rendering engines, and Web Workers, users can merge, split, compress, reorder, convert, and protect documents with absolute zero network exposure.',
    tags: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'WebAssembly', 'Client-Side WASM'],
    tagClass: 'tech-pill tech-pill-cyan',
    github: 'https://github.com/barath0508/iCreatePDF',
    demo: 'https://icreatepdf.online',
    badge: '● Live · 37+ Tools',
    badgeColor: 'rgba(6,182,212,0.18)',
    badgeBorder: 'rgba(6,182,212,0.35)',
    highlights: [
      'Zero server uploads: 100% client-side privacy guarantee',
      'Over 37 document tools: Merge, split, compress, booklet imposition',
      'WebAssembly & Web Workers for sub-second in-memory processing',
      'Production deployment with custom domain (icreatepdf.online)',
    ],
  },
  {
    id: 'conformal-antenna-sih',
    image: conformalAntennaImg,
    icon: <Radio size={24} />,
    iconColor: '#f59e0b',
    iconBg: 'rgba(245,158,11,0.16)',
    category: 'Hardware & Systems',
    title: 'Conformal Helmet Antenna',
    subtitle: 'Smart India Hackathon 2026',
    description:
      'A flexible microstrip patch antenna array embedded into ballistic helmets for NSG CQB/CT operations, replacing bulky whip antennas with dual-band UHF + L-band connectivity.',
    detailedDescription:
      'Engineered for Smart India Hackathon 2026, this defense hardware solution embeds a flexible conformal microstrip patch antenna array directly onto ballistic combat helmets for NSG (National Security Guard) Close Quarter Battle and Counter-Terrorism operations. Features dual-band (UHF + L-band) support for simultaneous tactical voice radio and high-definition helmet-camera video streaming, backed by a specialized RF shielding layer that reduces user radiation exposure (SAR) while directing beam directivity upward and outward. Connected via a ruggedized coax interface that preserves the helmet’s ballistic integrity.',
    tags: ['RF & Antenna Design', 'Microstrip Patch Array', 'UHF + L-Band', 'EM Shielding', 'SIH 2026', 'Defense Tech'],
    tagClass: 'tech-pill tech-pill-cyan',
    github: 'https://github.com/barath0508',
    demo: null,
    badge: '● SIH 2026 · Defense RF',
    badgeColor: 'rgba(245,158,11,0.18)',
    badgeBorder: 'rgba(245,158,11,0.35)',
    highlights: [
      'Replaces bulky vest-mounted whip antennas prone to tactical snagging in CQB/CT operations',
      'Dual-band RF support: UHF (tactical radio comms) + L-band (helmet-camera video link)',
      'Integrated RF shielding layer minimizing user radiation exposure (SAR) to the head',
      'Directional radiation pattern engineered upward and outward for maximized link range',
      'Ruggedized coax interface seamlessly integrating without compromising helmet ballistic rating',
    ],
  },
  {
    id: 'solar-tracker-3d',
    image: solarTrackerImg,
    icon: <Sun size={24} />,
    iconColor: '#f59e0b',
    iconBg: 'rgba(245,158,11,0.16)',
    category: '3D & IoT',
    title: 'Solar Tracker 3D',
    subtitle: 'Real-time Telemetry & Simulation',
    description:
      'Interactive 3D solar tracking dashboard with Three.js / React Three Fiber, geospatial Leaflet mapping, and Supabase real-time telemetry pipelines.',
    detailedDescription:
      'Engineered a real-time IoT and 3D telemetry monitoring station that tracks solar array orientation, sun elevation angles, and kilowatt harvesting efficiency in real time with interactive 3D WebGL scenes and Supabase live channels.',
    tags: ['React', 'Three.js', 'React Three Fiber', 'Supabase', 'Leaflet', 'TypeScript'],
    tagClass: 'tech-pill',
    github: 'https://github.com/barath0508/Solar_Tracker',
    demo: 'https://solar-tracker-pi-jade.vercel.app',
    badge: '● Live · 3D WebGL',
    badgeColor: 'rgba(245,158,11,0.18)',
    badgeBorder: 'rgba(245,158,11,0.35)',
    highlights: [
      'Real-time 3D solar panel orientation rendering via R3F',
      'Supabase real-time telemetry streaming and database syncing',
      'Interactive solar azimuth & sun angle calculation',
      'Integrated geospatial mapping with Leaflet',
    ],
  },
  {
    id: 'iete-rit-portal',
    image: ietePortalImg,
    icon: <Globe size={24} />,
    iconColor: '#a78bfa',
    iconBg: 'rgba(124,58,237,0.18)',
    category: 'Flagship & Web',
    title: 'IETE-RIT Portal',
    subtitle: 'Official Student Forum Platform',
    description:
      'Official web platform for the IETE Student Forum at Rajalakshmi Institute of Technology. Features an interactive 3D digital globe, member directory, and events showcase.',
    detailedDescription:
      'Designed and deployed the official chapter portal for the Institution of Electronics and Telecommunication Engineers (IETE) at RIT. Includes interactive Three.js globe visualizations, GSAP-orchestrated timelines, upcoming workshops management, and executive team showcases.',
    tags: ['React', 'TypeScript', 'Three.js', 'GSAP', 'Tailwind CSS'],
    tagClass: 'tech-pill',
    github: 'https://github.com/barath0508/IETE-RIT',
    demo: 'https://iete-rit.vercel.app',
    badge: '● Official Portal',
    badgeColor: 'rgba(124,58,237,0.2)',
    badgeBorder: 'rgba(124,58,237,0.35)',
    highlights: [
      'Custom 3D globe visualization in Three.js',
      'GSAP micro-interactions and smooth page transitions',
      'Events, technical symposiums, and workshop showcase',
      'Official chapter portal for Rajalakshmi Institute of Technology',
    ],
  },
  {
    id: 'qrloop-analytics',
    image: qrloopImg,
    icon: <QrCode size={24} />,
    iconColor: '#10b981',
    iconBg: 'rgba(16,185,129,0.16)',
    category: 'Flagship & Web',
    title: 'QRLoop',
    subtitle: 'Dynamic QR & Scan Analytics',
    description:
      'Full-stack dynamic QR platform with custom style engines, scan redirection tracking, JWT authentication, rate limiting, and Supabase database.',
    detailedDescription:
      'Full-stack web application enabling creation of dynamically reprogrammable QR codes with real-time scan analytics (device type, referrer, timestamp). Features JWT auth, express-rate-limit protection, and custom canvas styling engine.',
    tags: ['React', 'Node.js', 'Express', 'Supabase', 'JWT', 'Analytics'],
    tagClass: 'tech-pill tech-pill-cyan',
    github: 'https://github.com/barath0508/QR',
    demo: 'https://qrloop-eight.vercel.app',
    badge: '● Full-Stack',
    badgeColor: 'rgba(16,185,129,0.18)',
    badgeBorder: 'rgba(16,185,129,0.35)',
    highlights: [
      'Dynamic QR redirection allowing target URL updates after printing',
      'Real-time scan geolocation and device telemetry',
      'Secure JWT authentication and express rate-limiting',
      'Custom color, logo, and dot-matrix QR styling canvas',
    ],
  },
  {
    id: 'energize-2026-hackathon',
    image: energizeHackathonImg,
    icon: <Zap size={24} />,
    iconColor: '#06b6d4',
    iconBg: 'rgba(6,182,212,0.18)',
    category: '3D & IoT',
    title: 'Energize 2026',
    subtitle: 'Event Platform & 3D Digital Twin',
    description:
      'A premium, high-performance website built for an upcoming hackathon. Features a highly optimized 3D Digital Twin dashboard using Three.js, GSAP micro-animations, and custom audio choreography.',
    detailedDescription:
      'Engineered as the flagship website for the Energize 2026 technical hackathon. Features an interactive 3D Digital Twin model, ambient Web Audio playback with persistent state, magnetic hover physics, and GSAP timeline choreography.',
    tags: ['React', 'Three.js', 'GSAP', 'Tailwind', 'Web Audio API'],
    tagClass: 'tech-pill tech-pill-cyan',
    github: 'https://github.com/barath0508/energize2026',
    demo: 'https://energize2026.vercel.app',
    badge: '● 3D Digital Twin',
    badgeColor: 'rgba(6,182,212,0.15)',
    badgeBorder: 'rgba(6,182,212,0.25)',
    highlights: [
      'Interactive 3D model rendering via Three.js',
      'GSAP scroll-triggered choreography and magnetic cursor physics',
      'Web Audio API state machine initialization',
      'Mobile-responsive cyberpunk glassmorphic aesthetic',
    ],
  },
  {
    id: 'ai-academic-advisor',
    image: aiAdvisorImg,
    icon: <Brain size={24} />,
    iconColor: '#a78bfa',
    iconBg: 'rgba(124,58,237,0.18)',
    category: 'AI / ML',
    title: 'AI Academic Advisor',
    subtitle: 'OCR & GPA Forecast Engine',
    description:
      'A web application that analyses student marksheets using OCR, predicts GPA with machine learning, recommends electives, and identifies scholarship eligibility.',
    detailedDescription:
      'An academic decision-support platform designed to help university students optimize course selection and academic milestones. Evaluates raw grade transcripts via OCR, trains predictive regression models for performance forecasting, and maps matching scholarships.',
    tags: ['React.js', 'Flask', 'Python', 'ML', 'OCR (Tesseract)', 'Firebase'],
    tagClass: 'tech-pill',
    github: 'https://github.com/barath0508',
    demo: null,
    badge: '● AI & ML',
    badgeColor: 'rgba(124,58,237,0.2)',
    badgeBorder: 'rgba(124,58,237,0.3)',
    highlights: [
      'Automated transcript digitisation using Tesseract OCR',
      'Predictive GPA regression modeling based on semester trends',
      'Personalized elective recommendations based on skill vectors',
      'Scholarship eligibility pattern matching algorithm',
    ],
  },
  {
    id: 'medical-advisor-chatbot',
    image: medicalChatbotImg,
    icon: <HeartPulse size={24} />,
    iconColor: '#67e8f9',
    iconBg: 'rgba(6,182,212,0.18)',
    category: 'AI / ML',
    title: 'Medical Advisor Chatbot',
    subtitle: 'NLP-powered Symptom Triage',
    description:
      'A conversational chatbot providing preliminary medical guidance. Analyzes user-described symptoms using natural language processing and rapid classification algorithms.',
    detailedDescription:
      'A web-based conversational assistant that guides patients through initial symptom evaluation. Uses NLP tokenization and classification models to match symptoms to potential conditions and output preliminary guidance.',
    tags: ['Python', 'NLP', 'Flask', 'Node.js', 'HTML/CSS', 'ML'],
    tagClass: 'tech-pill tech-pill-cyan',
    github: 'https://github.com/barath0508/AIML---Chatbot',
    demo: 'https://medicode4.netlify.app',
    badge: '● NLP Healthcare',
    badgeColor: 'rgba(6,182,212,0.15)',
    badgeBorder: 'rgba(6,182,212,0.25)',
    highlights: [
      'Natural Language Processing pipeline for symptom extraction',
      'Real-time conversational interface with triage logic',
      'Flask REST API backend coupled with lightweight frontend',
      'Fast, zero-latency inference for preliminary guidance',
    ],
  },
  {
    id: 'traffic-light-altera',
    image: iotMonitoringImg,
    icon: <Cpu size={24} />,
    iconColor: '#c084fc',
    iconBg: 'rgba(192,132,252,0.16)',
    category: 'Hardware & Systems',
    title: 'Altera FPGA Traffic FSM',
    subtitle: 'Verilog Digital Hardware Synthesis',
    description:
      'Hardware description implementation of an adaptive 4-way traffic junction finite state machine (FSM) synthesized in Verilog HDL with timing constraints.',
    detailedDescription:
      'A digital system design project synthesized for Altera FPGA architecture. Implements an adaptive 4-way traffic junction finite state machine (FSM) in Verilog HDL with hardware clock dividers, priority sensors, and emergency override mechanisms.',
    tags: ['Verilog HDL', 'Altera Quartus', 'FPGA', 'Digital Logic', 'Hardware FSM'],
    tagClass: 'tech-pill',
    github: 'https://github.com/barath0508/Traffic_Light_Altera',
    demo: null,
    badge: '● Hardware / Verilog',
    badgeColor: 'rgba(192,132,252,0.18)',
    badgeBorder: 'rgba(192,132,252,0.32)',
    highlights: [
      'Synthesized Finite State Machine (FSM) for 4-way junctions',
      'Configured clock division logic for realistic traffic intervals',
      'Simulated and verified with Altera Quartus and ModelSim',
      'Hardware level emergency vehicle priority override',
    ],
  },
  {
    id: 'roast-as-a-service',
    image: energizeHackathonImg,
    icon: <Sparkles size={24} />,
    iconColor: '#f43f5e',
    iconBg: 'rgba(244,63,94,0.16)',
    category: 'Flagship & Web',
    title: 'Roast as a Service',
    subtitle: 'AI Developer Entertainment',
    description:
      'Humorous AI developer tool generating clever, lighthearted code roasts and performance feedback with ultra-snappy reactive UI.',
    detailedDescription:
      'A viral developer utility built to generate satirical, sharp code roasts and witty code reviews based on user input. Optimized for instantaneous reactive feedback and social sharing.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Vercel Analytics'],
    tagClass: 'tech-pill tech-pill-cyan',
    github: 'https://github.com/barath0508/Roast-as-a-Serivice',
    demo: 'https://roast-as-a-serivice.vercel.app',
    badge: '● Live App',
    badgeColor: 'rgba(244,63,94,0.18)',
    badgeBorder: 'rgba(244,63,94,0.32)',
    highlights: [
      'Ultra-fast instantaneous reactive client feedback',
      'Snappy developer-oriented UI with rich humor engine',
      'Built with Vite, React, and deployed on Vercel',
    ],
  },
  {
    id: 'flashesp',
    image: flashespImg,
    icon: <Cpu size={24} />,
    iconColor: '#38bdf8',
    iconBg: 'rgba(56,189,248,0.16)',
    category: 'Hardware & Systems',
    title: 'FlashESP',
    subtitle: 'Web-based ESP32 Flasher & IDE',
    description:
      'Browser-based ESP32 firmware flasher using the Web Serial API and esptool-js with an integrated Monaco code editor and serial telemetry monitor.',
    detailedDescription:
      'FlashESP bridges hardware development directly into modern web browsers. Leveraging the Web Serial API and esptool-js, developers can compile, flash binary partitions to ESP32 DevKit boards, inspect serial baud rate telemetry, and edit firmware files in-browser via Monaco Editor without installing desktop driver toolchains.',
    tags: ['Next.js', 'TypeScript', 'Web Serial API', 'esptool-js', 'Monaco Editor', 'ESP32', 'Supabase'],
    tagClass: 'tech-pill tech-pill-cyan',
    github: 'https://github.com/barath0508/Esp_Flash_Tool',
    demo: null,
    badge: '● Hardware + Web',
    badgeColor: 'rgba(56,189,248,0.18)',
    badgeBorder: 'rgba(56,189,248,0.35)',
    highlights: [
      'Direct in-browser microcontroller flashing via Web Serial API & esptool-js',
      'Integrated Monaco Code Editor with syntax highlighting for C/C++ firmware',
      'Real-time serial baud rate monitoring and telemetry terminal log',
      'Engineered with Next.js, Radix UI, TypeScript, and Supabase cloud store',
    ],
  },
  {
    id: 'healthlink-gemini',
    image: healthlinkImg,
    icon: <HeartPulse size={24} />,
    iconColor: '#10b981',
    iconBg: 'rgba(16,185,129,0.16)',
    category: 'AI / ML',
    title: 'HealthLink',
    subtitle: 'Gemini AI Health & Donor Network',
    description:
      'Digital healthcare platform connecting emergency blood donors, hospitals, and patients, powered by Google Gemini GenAI triage and Supabase.',
    detailedDescription:
      'HealthLink is a unified digital healthcare coordination platform. Incorporates Google Generative AI (Gemini) for instant emergency triage assistance, dynamic blood donor geolocation mapping, verified hospital bed directories, and QR prescription tracking.',
    tags: ['React', 'TypeScript', 'Google Gemini AI', 'Supabase', 'QRCode', 'Tailwind CSS'],
    tagClass: 'tech-pill',
    github: 'https://github.com/barath0508/Health-Link',
    demo: null,
    badge: '● Gemini AI',
    badgeColor: 'rgba(16,185,129,0.18)',
    badgeBorder: 'rgba(16,185,129,0.35)',
    highlights: [
      'Integrated Google Gemini GenAI for emergency symptom triage and guidance',
      'Real-time blood donor and hospital availability mapping',
      'Dynamic QR code generation for medication and prescription verification',
      'Engineered with Vite, React, TypeScript, and Supabase database',
    ],
  },
  {
    id: 'esp32-attendance',
    image: iotMonitoringImg,
    icon: <Radio size={24} />,
    iconColor: '#a78bfa',
    iconBg: 'rgba(124,58,237,0.18)',
    category: 'Hardware & Systems',
    title: 'ESP32 Smart Attendance',
    subtitle: 'IoT Telemetry & Web Dashboard',
    description:
      'Automated campus attendance system utilizing ESP32 microcontrollers, Wi-Fi telemetry pipelines, and real-time cloud analytics dashboard.',
    detailedDescription:
      'An IoT smart attendance management station engineered with ESP32 Wi-Fi hardware modules. Transmits instant verification packets to cloud databases and renders real-time student check-in telemetry on a high-availability web dashboard.',
    tags: ['ESP32', 'IoT Telemetry', 'Vercel', 'Embedded C', 'Hardware'],
    tagClass: 'tech-pill',
    github: 'https://github.com/barath0508/esp32-attendance',
    demo: 'https://esp32-attendance.vercel.app',
    badge: '● Live IoT',
    badgeColor: 'rgba(124,58,237,0.2)',
    badgeBorder: 'rgba(124,58,237,0.35)',
    highlights: [
      'Automated wireless attendance capture via ESP32 Wi-Fi microcontrollers',
      'Real-time cloud database syncing with low latency',
      'Live responsive telemetry dashboard deployed on Vercel',
      'Hardware level debounce and LED status indicators',
    ],
  },
];

const ProjectCard = ({ project, onOpenDetails }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="project-card projects-card glass rounded-2xl overflow-hidden flex flex-col h-full group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      id={`project-card-${project.id}`}
    >
      {/* Card Visual / Thumbnail */}
      <div className="project-image-container relative overflow-hidden cursor-pointer" onClick={() => onOpenDetails(project)}>
        <img
          src={project.image}
          alt={project.title}
          className="project-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />

        {/* Floating badge over image */}
        <div className="absolute top-4 right-4 z-20">
          <span
            className="text-[10px] font-mono font-bold px-3 py-1.5 rounded-full backdrop-blur-md border shadow-lg"
            style={{
              background: project.badgeColor,
              borderColor: project.badgeBorder,
              color: project.iconColor || 'white',
            }}
          >
            {project.badge}
          </span>
        </div>

        {/* Quick view overlay button */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]"
        >
          <span className="px-4 py-2 rounded-lg bg-white/15 border border-white/25 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 shadow-xl">
            <Info size={14} /> View Details
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/10 shadow-inner overflow-hidden relative shrink-0"
              style={{ background: project.iconBg, color: project.iconColor }}
            >
              <div className="absolute inset-0 bg-white/5" />
              <div
                className="relative z-10 transition-transform duration-500"
                style={{ transform: hovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1)' }}
              >
                {project.icon}
              </div>
            </div>
            <div>
              <h3
                onClick={() => onOpenDetails(project)}
                className="font-display font-black text-white text-lg leading-tight tracking-tight group-hover:text-primary-light transition-colors cursor-pointer"
              >
                {project.title}
              </h3>
              <p className="text-zinc-500 text-xs mt-0.5 font-medium">{project.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className={project.tagClass || 'tech-pill'}>
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="text-[10px] font-mono text-zinc-500 self-center">
              +{project.tags.length - 4} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/5">
          <button
            onClick={() => onOpenDetails(project)}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white font-medium transition-colors"
          >
            <Info size={13} /> Details
          </button>

          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                id={`${project.id}-github-link`}
                aria-label="View source code"
                className="p-2 rounded-lg border border-white/10 text-zinc-400 hover:text-primary-light hover:border-primary/35 hover:bg-primary/8 transition-all duration-300"
              >
                <Github size={14} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary/15 border border-primary/30 text-primary-light text-xs font-semibold hover:bg-primary/25 hover:border-primary/50 transition-all duration-300"
              >
                <ExternalLink size={13} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-heading', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.projects-heading', start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-28 px-6 md:px-12 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(124,58,237,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Heading */}
        <div className="projects-heading text-center mb-10">
          <span className="inline-block text-xs font-mono font-semibold tracking-widest text-primary-light uppercase mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/8">
            &lt; verified builds &gt;
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white">
            Featured{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #a78bfa, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Projects
            </span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base mt-3 max-w-2xl mx-auto">
            Production web applications, client-side WebAssembly suites, 3D telemetry dashboards, and embedded digital hardware systems.
          </p>
        </div>

        {/* Category Filtering Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => {
            const count = cat === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.category === cat).length;
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-primary text-white border border-primary-light/40 shadow-[0_0_20px_rgba(124,58,237,0.4)]'
                    : 'bg-white/5 text-zinc-400 border border-white/10 hover:border-white/20 hover:text-zinc-200'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-black/30 text-white' : 'bg-white/10 text-zinc-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Project cards grid */}
        <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={setActiveModalProject}
            />
          ))}
        </div>

        {/* More work CTA */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <a
            href="https://github.com/barath0508"
            target="_blank"
            rel="noopener noreferrer"
            id="view-all-github-btn"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl border border-primary/30 text-zinc-300 text-xs sm:text-sm font-semibold hover:bg-primary/10 hover:text-primary-light hover:border-primary/50 transition-all duration-300"
          >
            <Github size={16} />
            Explore 56+ Repositories on GitHub
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};

export default Projects;
