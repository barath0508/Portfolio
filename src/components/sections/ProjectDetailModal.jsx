import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, Cpu, Globe, Layers, Sparkles } from 'lucide-react';

const ProjectDetailModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-2xl border border-primary/25 bg-[#080d21] shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_50px_rgba(124,58,237,0.18)] overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 bg-surface/80">
            <div className="flex items-center gap-3">
              <span
                className="text-[11px] font-mono font-bold px-3 py-1 rounded-full border"
                style={{
                  background: project.badgeColor,
                  borderColor: project.badgeBorder,
                  color: project.iconColor || '#a78bfa',
                }}
              >
                {project.badge}
              </span>
              <span className="text-zinc-500 text-xs font-mono">•</span>
              <span className="text-zinc-400 text-xs font-medium">{project.category}</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Scrollable Content */}
          <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
            {/* Visual Header / Banner */}
            <div className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden border border-white/10 group">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080d21] via-[#080d21]/30 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-white drop-shadow-md">
                    {project.title}
                  </h3>
                  <p className="text-zinc-300 text-sm font-medium drop-shadow-sm">{project.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-primary-light mb-2">Overview</h4>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {project.detailedDescription || project.description}
              </p>
            </div>

            {/* Key Architectural Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-secondary flex items-center gap-1.5">
                  <Sparkles size={13} /> Key Architecture & Innovations
                </h4>
                <ul className="grid sm:grid-cols-2 gap-2.5">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 size={14} className="text-secondary shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
                <Layers size={13} /> Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-primary/10 border border-primary/20 text-primary-light"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Action Row */}
          <div className="px-6 py-4 bg-surface/90 border-t border-white/8 flex items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Close
            </button>

            <div className="flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/15 text-zinc-300 text-xs font-semibold hover:text-white hover:bg-white/5 transition-all"
                >
                  <Github size={14} /> View Code
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-dark shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all"
                >
                  <ExternalLink size={14} /> Launch Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
