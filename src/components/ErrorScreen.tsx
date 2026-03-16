"use client";

import { motion } from "framer-motion";
import { RefreshCcw, AlertTriangle } from "lucide-react";

interface ErrorScreenProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorScreen({ message, onRetry }: ErrorScreenProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md overflow-hidden"
    >
      {/* Cinematic subtle background glow for the error state */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-900/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative z-10 flex flex-col items-center text-center max-w-md px-6"
      >
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-8">
          <AlertTriangle className="text-red-400" size={32} strokeWidth={1.5} />
        </div>
        
        <h2 className="text-3xl font-serif italic text-red-100 mb-4">
          Something went wrong
        </h2>
        
        <p className="text-red-200/60 font-sans text-sm tracking-wide leading-relaxed mb-10">
          {message}
        </p>

        <motion.button
          onClick={onRetry}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/30 text-white rounded-full font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300"
        >
          <RefreshCcw size={16} className="text-red-400 group-hover:rotate-180 transition-transform duration-500" />
          <span>Retry Chapter</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
