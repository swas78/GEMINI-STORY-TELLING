"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const NUM_PARTICLES = 40;

const generateParticles = (count: number): Particle[] => {
  // Check for window to prevent issues during SSR
  if (typeof window === 'undefined') return [];
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));
};

export default function CinematicBackground() {
  const [particles] = useState<Particle[]>(generateParticles(NUM_PARTICLES));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
      {/* Dark Blurred Landscape */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 blur-2xl transform scale-125"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2000&auto=format&fit=crop')" }}
      />
      
      {/* Soft lighting glow behind the book */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-white opacity-10 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vh] bg-zinc-300 opacity-20 rounded-full blur-[100px]" />
      
      {/* Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-white rounded-full opacity-50 shadow-[0_0_15px_3px_rgba(255,255,255,0.9)]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: ["0%", "-100%"],
            x: ["0%", "10%", "-10%", "0%"],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_70%,rgba(0,0,0,1)_100%)]" />
    </div>
  );
}
