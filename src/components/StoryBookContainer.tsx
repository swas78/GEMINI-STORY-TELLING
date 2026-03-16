"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface StoryBookContainerProps {
  children: ReactNode;
}

export default function StoryBookContainer({ children }: StoryBookContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse values
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 150, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 150, mass: 0.5 });

  // Map mouse coordinates to rotation
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to center of container (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center perspective-[3000px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={containerRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative w-[90vw] max-w-[1300px] h-[80vh] max-h-[850px] flex shadow-[0_30px_60px_rgba(0,0,0,0.9)] before:absolute before:inset-0 before:z-[-10] before:bg-white/5 before:blur-[80px] transition-all duration-300 rounded-lg"
      >
        {/* Book Cover / Backing */}
        <div 
          className="absolute inset-x-[-8px] inset-y-[-10px] bg-[#0c0c0c] rounded-lg -z-20 border border-white/10 shadow-[inset_0_0_30px_rgba(0,0,0,1)]"
          style={{ transform: "translateZ(-20px)" }}
        />
        
        {/* Stacked Pages (Right side) - strictly dark variations for premium aesthetic */}
        <div className="absolute right-0 top-[2px] bottom-[2px] w-1/2 bg-[#1a1a1a] rounded-r-lg -z-10 shadow-[-2px_0_5px_rgba(0,0,0,0.5)] border-r border-r-white/5" style={{ transform: "translateZ(-15px)" }} />
        <div className="absolute right-0 top-[4px] bottom-[4px] w-1/2 bg-[#151515] rounded-r-lg -z-10 shadow-[-2px_0_5px_rgba(0,0,0,0.5)] border-r border-r-white/5" style={{ transform: "translateZ(-10px)" }} />
        <div className="absolute right-0 top-[6px] bottom-[6px] w-1/2 bg-[#111111] rounded-r-lg -z-10 shadow-[-2px_0_5px_rgba(0,0,0,0.5)] border-r border-r-white/5" style={{ transform: "translateZ(-5px)" }} />

        {/* Stacked Pages (Left side) - strictly dark variations for premium aesthetic */}
        <div className="absolute left-0 top-[2px] bottom-[2px] w-1/2 bg-[#1a1a1a] rounded-l-lg -z-10 shadow-[2px_0_5px_rgba(0,0,0,0.5)] border-l border-l-white/5" style={{ transform: "translateZ(-15px)" }} />
        <div className="absolute left-0 top-[4px] bottom-[4px] w-1/2 bg-[#151515] rounded-l-lg -z-10 shadow-[2px_0_5px_rgba(0,0,0,0.5)] border-l border-l-white/5" style={{ transform: "translateZ(-10px)" }} />
        <div className="absolute left-0 top-[6px] bottom-[6px] w-1/2 bg-[#111111] rounded-l-lg -z-10 shadow-[2px_0_5px_rgba(0,0,0,0.5)] border-l border-l-white/5" style={{ transform: "translateZ(-5px)" }} />

        {/* The Open Book Top Page */}
        <div className="absolute inset-0 bg-[#080808] text-white flex rounded-lg overflow-visible shadow-[inset_0_0_60px_rgba(0,0,0,0.8)] border border-white/5" style={{ transformStyle: "preserve-3d" }}>
          {/* Center Spine Shadow */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[80px] -translate-x-1/2 bg-[linear-gradient(to_right,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.9)_50%,rgba(0,0,0,0.2)_100%)] z-50 pointer-events-none mix-blend-multiply" />
          
          {children}
        </div>
      </motion.div>
    </div>
  );
}
