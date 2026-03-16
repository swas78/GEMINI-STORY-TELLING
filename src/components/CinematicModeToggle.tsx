import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { useEffect } from "react";

interface CinematicModeToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export default function CinematicModeToggle({ enabled, onToggle }: CinematicModeToggleProps) {
  
  // Keyboard Shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input (though we don't have any here)
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      if (e.key.toLowerCase() === 'c') {
        onToggle(!enabled);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, onToggle]);

  return (
    <button
      onClick={() => onToggle(!enabled)}
      className={`fixed top-8 left-8 z-50 flex items-center gap-3 px-5 py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500 backdrop-blur-md border ${
        enabled 
          ? "bg-indigo-900/40 text-indigo-100 border-indigo-400/30" 
          : "bg-black/40 text-white/60 border-white/10 hover:bg-black/60 hover:text-white"
      }`}
    >
      <motion.div
        animate={enabled ? { rotate: [0, 5, -5, 0] } : {}}
        transition={enabled ? { repeat: Infinity, duration: 4 } : {}}
      >
        {enabled ? <Play size={16} className="fill-indigo-300" /> : <Pause size={16} />}
      </motion.div>
      <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold">
        {enabled ? "Cinematic Mode: On" : "Cinematic Mode: Off"}
      </span>
      <span className="ml-2 hidden md:inline-flex items-center justify-center px-1.5 py-0.5 rounded border border-current text-[8px] opacity-50 font-sans tracking-widest">
        C
      </span>
    </button>
  );
}
