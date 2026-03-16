"use client";

import { motion } from "framer-motion";
import { Sparkles, Route, Zap } from "lucide-react";

interface UniverseChoice {
  id: string;
  title: string;
  preview: string;
  icon?: 'sparkles' | 'route' | 'zap';
}

interface UniverseChoicesProps {
  choices: UniverseChoice[];
  onSelect: (id: string) => void;
}

const icons = {
  sparkles: <Sparkles size={18} strokeWidth={1.5} />,
  route: <Route size={18} strokeWidth={1.5} />,
  zap: <Zap size={18} strokeWidth={1.5} />,
};

export default function UniverseChoices({ choices, onSelect }: UniverseChoicesProps) {
  if (!choices || choices.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-xs font-sans font-bold tracking-[0.2em] uppercase text-white/50 mb-6 border-b border-white/10 pb-3">
        Paths
      </h3>
      <div className="space-y-3">
        {choices.map((choice, i) => (
          <motion.button
            key={choice.id}
            onClick={() => onSelect(choice.id)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 + 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full group relative text-left p-5 border border-white/5 rounded hover:border-white/30 transition-all duration-500 overflow-hidden bg-[#111] shadow-none hover:bg-[#1a1a1a]"
          >
            <div className="relative z-10 flex items-start gap-5">
              <div className="p-3 border border-white/10 rounded-full group-hover:bg-white group-hover:text-black transition-colors duration-500 bg-[#1a1a1a] text-white/80">
                {icons[choice.icon || 'route']}
              </div>
              <div className="flex-1">
                <h4 className="font-serif text-xl italic text-white/90 mb-2 group-hover:tracking-wide transition-all duration-500">
                  {choice.title}
                </h4>
                <p className="font-sans text-sm text-white/50 leading-relaxed line-clamp-2">
                  {choice.preview}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-sans font-bold tracking-widest uppercase text-white/80 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500 delay-100">
                  <span>Turn Page</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
