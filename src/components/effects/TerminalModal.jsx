import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Minimize2, Maximize2, CornerDownLeft, Sparkles, ExternalLink } from 'lucide-react';

const HELP_COMMANDS = [
  { cmd: 'help', desc: 'List all available terminal commands' },
  { cmd: 'whoami', desc: 'Display Barath\'s engineering bio and background' },
  { cmd: 'hardware', desc: 'Display ECE hardware, FPGA & embedded systems matrix' },
  { cmd: 'projects', desc: 'List all flagship and deployed projects with links' },
  { cmd: 'skills', desc: 'Display full technology matrix (Web, AI, Hardware)' },
  { cmd: 'stats', desc: 'Show developer statistics and metrics' },
  { cmd: 'contact', desc: 'Get direct communication and social links' },
  { cmd: 'clear', desc: 'Clear the terminal output screen' },
  { cmd: 'exit', desc: 'Close this developer console' },
];

const TerminalModal = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState([
    {
      type: 'output',
      content: (
        <div className="space-y-1.5 text-zinc-300">
          <p className="text-primary-light font-bold">
            Welcome to Barath R.'s Developer Console [v2.6.4]
          </p>
          <p className="text-xs text-zinc-400">
            Type <span className="text-secondary font-mono font-semibold">help</span> to view available commands, or <span className="text-secondary font-mono font-semibold">projects</span> to inspect recent builds.
          </p>
        </div>
      ),
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const trimmed = inputVal.trim().toLowerCase();
      if (!trimmed) return;

      setCmdHistory((prev) => [trimmed, ...prev]);
      setHistoryIdx(-1);

      const userCmdEntry = { type: 'input', content: trimmed };
      let responseEntry;

      switch (trimmed) {
        case 'help':
          responseEntry = {
            type: 'output',
            content: (
              <div className="space-y-1 my-2">
                <p className="text-secondary font-semibold text-xs">AVAILABLE COMMANDS:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1">
                  {HELP_COMMANDS.map((item) => (
                    <div key={item.cmd} className="flex items-baseline gap-2 text-xs">
                      <span className="text-primary-light font-mono font-bold w-16">{item.cmd}</span>
                      <span className="text-zinc-400">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ),
          };
          break;

        case 'whoami':
        case 'about':
          responseEntry = {
            type: 'output',
            content: (
              <div className="space-y-1.5 text-xs text-zinc-300 my-2 leading-relaxed">
                <p>
                  <strong className="text-white">Barath R.</strong> — Electronics & Communication Engineering undergrad at{' '}
                  <span className="text-primary-light">Rajalakshmi Institute of Technology, Chennai</span>.
                </p>
                <p className="text-zinc-400">
                  Full-stack software developer, AI systems enthusiast, and embedded electronics builder. Specializing in high-performance client-side web tools, 3D interactive interfaces (Three.js/R3F), and hardware-software IoT integrations.
                </p>
                <p className="text-secondary">✦ Webmaster & Core Member for IETE Student Forum RIT</p>
                <p className="text-accent">✦ Core Team & Lead Developer for Energize 2026 Hackathon</p>
              </div>
            ),
          };
          break;

        case 'projects':
          responseEntry = {
            type: 'output',
            content: (
              <div className="space-y-2 my-2 text-xs">
                <p className="text-secondary font-semibold">FEATURED & PRODUCTION PROJECTS:</p>
                <div className="space-y-1.5">
                  {[
                    { name: 'iCreatePDF', url: 'https://icreatepdf.online', desc: '100% Client-Side PDF suite (Next.js, WASM, 37+ tools)' },
                    { name: 'Solar Tracker 3D', url: 'https://solar-tracker-pi-jade.vercel.app', desc: 'Real-time 3D Telemetry & IoT Dashboard (Three.js, Supabase)' },
                    { name: 'IETE-RIT Official Portal', url: 'https://iete-rit.vercel.app', desc: 'Official Student Forum Portal (React, 3D Globe, GSAP)' },
                    { name: 'QRLoop Analytics', url: 'https://qrloop-eight.vercel.app', desc: 'Dynamic QR Generator & Scan Analytics Platform' },
                    { name: 'Energize 2026', url: 'https://energize2026.vercel.app', desc: 'Hackathon 3D Digital Twin & Sound Architecture' },
                    { name: 'Medical Advisor Chatbot', url: 'https://medicode4.netlify.app', desc: 'NLP-powered Symptom Triage Healthcare Assistant' },
                  ].map((p) => (
                    <div key={p.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 rounded bg-white/5 border border-white/5">
                      <div>
                        <span className="text-white font-bold">{p.name}</span>
                        <span className="text-zinc-400 block text-[11px]">{p.desc}</span>
                      </div>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary-light hover:underline inline-flex items-center gap-1 font-mono text-[11px] shrink-0"
                      >
                        Visit <ExternalLink size={10} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ),
          };
          break;

        case 'hardware':
          responseEntry = {
            type: 'output',
            content: (
              <div className="space-y-2.5 my-2 text-xs">
                <p className="text-secondary font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  ECE HARDWARE & EMBEDDED SYSTEMS STACK:
                </p>
                <div className="space-y-1.5 text-zinc-300">
                  <p>
                    <span className="text-primary-light font-bold">FPGA & RTL Design:</span> Verilog HDL, Altera Quartus Prime, ModelSim, FSM Architecture, RTL Synthesis, Clock Dividers, Timing Constraints
                  </p>
                  <p>
                    <span className="text-secondary font-bold">Microcontrollers & SoC:</span> Arduino (Uno, Nano, Mega), ESP32 (Wi-Fi/BLE), Raspberry Pi, Embedded C, GPIO/PWM, Timer Interrupts
                  </p>
                  <p>
                    <span className="text-accent font-bold">Hardware Protocols:</span> UART, I2C, SPI Bus, MQTT IoT Telemetry, ESP-NOW, RS-232, Serial Stream Buffering
                  </p>
                  <p>
                    <span className="text-primary-light font-bold">Sensors & Actuators:</span> GPS Modules (NEO-6M), IR Sensors, Ultrasonic Transducers, LDR / Solar Photovoltaics, Stepper/Servo Motors, Relay Drivers, ADC/DAC
                  </p>
                  <p>
                    <span className="text-secondary font-bold">Lab Instrumentation:</span> Digital Oscilloscope (DSO), Multimeter Diagnostics, Proteus Simulation, Multisim Circuit Analysis, Breadboard Prototyping
                  </p>
                </div>
              </div>
            ),
          };
          break;

        case 'skills':
          responseEntry = {
            type: 'output',
            content: (
              <div className="space-y-2 my-2 text-xs">
                <p className="text-secondary font-semibold">ENGINEERING SKILLSET:</p>
                <div className="space-y-1 text-zinc-300">
                  <p><span className="text-primary-light font-bold">Languages:</span> JavaScript (ESNext), TypeScript, Python, C, Verilog HDL, SQL</p>
                  <p><span className="text-primary-light font-bold">Frontend:</span> React.js, Next.js 16, Three.js, React Three Fiber, GSAP, Tailwind CSS</p>
                  <p><span className="text-primary-light font-bold">Backend & DB:</span> Node.js, Express, Flask, Supabase, Firebase, REST APIs</p>
                  <p><span className="text-primary-light font-bold">AI / ML & Data:</span> Machine Learning Models, Tesseract OCR, NLP, Data Pipelines</p>
                  <p><span className="text-primary-light font-bold">IoT & Hardware:</span> Arduino, ESP32, Altera FPGA, Digital Logic Design, GPS/IR Sensors</p>
                </div>
              </div>
            ),
          };
          break;

        case 'stats':
          responseEntry = {
            type: 'output',
            content: (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-2 text-xs">
                <div className="p-2 rounded bg-white/5 text-center">
                  <p className="text-lg font-bold text-white">56+</p>
                  <p className="text-zinc-400 text-[10px]">GitHub Repos</p>
                </div>
                <div className="p-2 rounded bg-white/5 text-center">
                  <p className="text-lg font-bold text-secondary">37+</p>
                  <p className="text-zinc-400 text-[10px]">Client-Side Tools</p>
                </div>
                <div className="p-2 rounded bg-white/5 text-center">
                  <p className="text-lg font-bold text-primary-light">8+</p>
                  <p className="text-zinc-400 text-[10px]">Live Deployments</p>
                </div>
                <div className="p-2 rounded bg-white/5 text-center">
                  <p className="text-lg font-bold text-green-400">100%</p>
                  <p className="text-zinc-400 text-[10px]">Private Client-side WASM</p>
                </div>
              </div>
            ),
          };
          break;

        case 'contact':
          responseEntry = {
            type: 'output',
            content: (
              <div className="space-y-1 my-2 text-xs text-zinc-300">
                <p className="text-secondary font-semibold">GET IN TOUCH:</p>
                <p>Email: <a href="mailto:barath5727@gmail.com" className="text-primary-light underline">barath5727@gmail.com</a></p>
                <p>LinkedIn: <a href="https://www.linkedin.com/in/barath-r-12773432b/" target="_blank" rel="noreferrer" className="text-primary-light underline">linkedin.com/in/barath-r-12773432b</a></p>
                <p>GitHub: <a href="https://github.com/barath0508" target="_blank" rel="noreferrer" className="text-primary-light underline">github.com/barath0508</a></p>
              </div>
            ),
          };
          break;

        case 'clear':
          setHistory([]);
          setInputVal('');
          return;

        case 'exit':
        case 'quit':
          onClose();
          setInputVal('');
          return;

        default:
          responseEntry = {
            type: 'output',
            content: (
              <p className="text-xs text-red-400 my-1">
                command not found: '{trimmed}'. Type <span className="text-secondary font-mono underline cursor-pointer" onClick={() => setInputVal('help')}>help</span> for available commands.
              </p>
            ),
          };
          break;
      }

      setHistory((prev) => [...prev, userCmdEntry, responseEntry]);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(nextIdx);
      setInputVal(cmdHistory[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx] || '');
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md">
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-2xl max-h-[82vh] flex flex-col rounded-2xl border border-primary/30 bg-[#070b19]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(124,58,237,0.2)] overflow-hidden"
          >
            {/* Terminal Titlebar */}
            <div className="flex items-center justify-between px-4 py-3 bg-surface/80 border-b border-primary/20 select-none">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors flex items-center justify-center"
                    aria-label="Close"
                  />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-1.5 ml-3 text-xs font-mono text-zinc-400">
                  <Terminal size={13} className="text-secondary" />
                  <span>barath@portfolio: ~</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-block text-[10px] font-mono text-zinc-500">
                  ESC to close
                </span>
                <button
                  onClick={onClose}
                  className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div
              className="p-5 flex-1 overflow-y-auto font-mono text-xs space-y-3 min-h-[320px] max-h-[500px]"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((item, idx) => (
                <div key={idx}>
                  {item.type === 'input' ? (
                    <div className="flex items-center gap-2 text-zinc-400">
                      <span className="text-secondary font-bold">barath@dev:~$</span>
                      <span className="text-white font-semibold">{item.content}</span>
                    </div>
                  ) : (
                    <div>{item.content}</div>
                  )}
                </div>
              ))}

              {/* Active Prompt Input Row */}
              <div className="flex items-center gap-2 text-zinc-300 pt-1">
                <span className="text-secondary font-bold shrink-0">barath@dev:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleCommand}
                  className="flex-1 bg-transparent text-white outline-none border-none font-mono text-xs focus:ring-0 p-0"
                  autoFocus
                  spellCheck={false}
                  placeholder="type 'help', 'projects', 'skills'..."
                />
              </div>

              <div ref={bottomRef} />
            </div>

            {/* Terminal Quick Hint Bar */}
            <div className="px-4 py-2 bg-surface/50 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500 overflow-x-auto gap-2">
              <div className="flex items-center gap-2">
                <span>Quick:</span>
                {['help', 'hardware', 'projects', 'skills', 'whoami', 'stats', 'clear'].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => {
                      setInputVal(cmd);
                      setTimeout(() => {
                        inputRef.current?.focus();
                      }, 50);
                    }}
                    className="px-2 py-0.5 rounded bg-white/5 hover:bg-primary/20 text-zinc-400 hover:text-primary-light transition-colors"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
              <span className="hidden sm:inline">Press Enter ↵</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TerminalModal;
