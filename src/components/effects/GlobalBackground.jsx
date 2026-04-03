import React, { useEffect, useRef } from 'react';

const GlobalBackground = () => {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);

  // Particle network system — violet/purple palette
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(true); }
      reset(initial = false) {
        this.x = Math.random() * canvas.width;
        this.y = initial ? Math.random() * canvas.height : canvas.height + 20;
        this.size = Math.random() * 1.8 + 0.4;
        this.speedY = -(Math.random() * 0.5 + 0.1);
        this.speedX = (Math.random() - 0.5) * 0.25;
        this.opacity = Math.random() * 0.55 + 0.1;
        this.fadeSpeed = Math.random() * 0.0025 + 0.0008;
        this.pulse = Math.random() * Math.PI * 2;
        // violet, indigo, or cyan
        const r = Math.random();
        if (r < 0.5) this.color = '124, 58, 237';       // violet
        else if (r < 0.8) this.color = '129, 140, 248';  // indigo/accent
        else this.color = '6, 182, 212';                  // cyan
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.pulse += 0.018;
        this.opacity -= this.fadeSpeed;
        if (this.opacity <= 0 || this.y < -10) this.reset();
      }
      draw() {
        const glowOpacity = this.opacity * (0.7 + 0.3 * Math.sin(this.pulse));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${glowOpacity})`;
        ctx.shadowColor = `rgba(${this.color}, ${glowOpacity * 0.6})`;
        ctx.shadowBlur = this.size * 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Initialise 70 particles spread across the screen
    for (let i = 0; i < 70; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124, 58, 237, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      particles.forEach(p => { p.update(); p.draw(); });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Cursor glow tracker
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const handleMove = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursor.style.opacity = '1';
    };
    const handleLeave = () => { cursor.style.opacity = '0'; };
    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <>
      {/* Mesh Gradient Background */}
      <div className="mesh-gradient" />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ opacity: 0.45 }}
      />

      {/* Ambient gradient orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
      </div>

      {/* Grid overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none grid-overlay" style={{ opacity: 0.25 }} />

      {/* Scrolling watermark text */}
      <div className="fixed top-1/2 -translate-y-1/2 left-0 right-0 z-0 pointer-events-none overflow-hidden opacity-[0.015] select-none flex will-change-transform">
        <div
          className="whitespace-nowrap flex font-display font-black text-[12vw] tracking-tighter text-white animate-marquee leading-none"
          style={{ width: 'max-content' }}
        >
          <span className="px-10">BARATH</span>
          <span className="px-10" style={{ WebkitTextStroke: '1px white', color: 'transparent' }}>DEV</span>
          <span className="px-10">CODE</span>
          <span className="px-10" style={{ WebkitTextStroke: '1px white', color: 'transparent' }}>BUILD</span>
          <span className="px-10">BARATH</span>
          <span className="px-10" style={{ WebkitTextStroke: '1px white', color: 'transparent' }}>DEV</span>
          <span className="px-10">CODE</span>
          <span className="px-10" style={{ WebkitTextStroke: '1px white', color: 'transparent' }}>BUILD</span>
        </div>
      </div>

      {/* Cursor glow */}
      <div ref={cursorRef} className="cursor-glow hidden md:block" style={{ opacity: 0 }} />
    </>
  );
};

export default GlobalBackground;
