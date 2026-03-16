"use client";

import { motion } from "framer-motion";

const emotions = [
  { icon: "😀", label: "Happy" },
  { icon: "😱", label: "Scared" },
  { icon: "😡", label: "Angry" },
  { icon: "❤️", label: "Love" },
];

interface EmotionReactionsProps {
  selectedEmotion: string | null;
  onSelectEmotion: (emotion: string) => void;
}

export default function EmotionReactions({ selectedEmotion, onSelectEmotion }: EmotionReactionsProps) {
  return (
    <div className="mt-8">
      <h3 className="text-xs font-sans tracking-[0.2em] font-bold uppercase text-black dark:text-white mb-4">
        React to this chapter
      </h3>
      <div className="flex flex-wrap gap-3">
        {emotions.map((emo) => (
          <button
            key={emo.label}
            onClick={() => onSelectEmotion(emo.label)}
            className={`
              relative px-4 py-2 rounded-full border transition-all duration-300
              ${selectedEmotion === emo.label 
                ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black shadow-lg" 
                : "border-black/10 dark:border-white/10 hover:border-black/40 dark:hover:border-white/40 text-black/60 dark:text-white/60 bg-black/5 dark:bg-white/5"
              }
            `}
          >
            <span className="flex items-center gap-2 font-sans text-sm font-medium z-10 relative">
              <span className="text-lg">{emo.icon}</span>
              {emo.label}
            </span>
            {selectedEmotion === emo.label && (
              <motion.div
                layoutId="emotion-glow"
                className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[0_0_20px_rgba(255,255,255,0.4)] pointer-events-none"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
