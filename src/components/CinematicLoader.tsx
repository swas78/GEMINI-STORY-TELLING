"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_MESSAGES = [
  "Generating the next universe...",
  "AI is crafting your story...",
  "Imagining the next scene...",
  "Building your cinematic chapter...",
  "Weaving text, audio, and visuals..."
];

export default function CinematicLoader() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <motion.div 
      key="loading-overlay"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]/90 backdrop-blur-md overflow-hidden"
    >
      {/* Subtle animated background glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute w-[400px] h-[400px] bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none" 
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Subtle spinning element */}
        <div className="w-20 h-20 mb-12 relative flex items-center justify-center">
          <div className="absolute inset-0 border-t-2 border-l-2 border-white/10 rounded-full animate-[spin_3s_linear_infinite]" />
          <div className="absolute inset-2 border-r-2 border-b-2 border-indigo-400/50 rounded-full animate-[spin_2s_linear_infinite_reverse]" />
          <div className="w-2 h-2 bg-indigo-300 rounded-full animate-pulse shadow-[0_0_15px_rgba(165,180,252,0.8)]" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={messageIndex}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.8 }}
            className="font-serif italic text-2xl md:text-3xl text-white/90 tracking-wider text-center"
          >
            {LOADING_MESSAGES[messageIndex]}
          </motion.div>
        </AnimatePresence>
        
        <div className="mt-8 font-sans text-[10px] tracking-[0.4em] uppercase text-white/30 animate-pulse">
          Please wait
        </div>
      </div>
    </motion.div>
  );
}
