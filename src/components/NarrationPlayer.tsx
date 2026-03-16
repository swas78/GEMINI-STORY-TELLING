"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

interface NarrationPlayerProps {
  audioUrl?: string;
  autoPlay?: boolean;
}

export default function NarrationPlayer({ audioUrl, autoPlay = false }: NarrationPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [randomHeights] = useState<number[]>(() => 
    typeof window !== 'undefined' ? Array.from({ length: 45 }, () => Math.random() * 24 + 4) : []
  );

  useEffect(() => {
    if (audioUrl) {
      // Create new audio instance for the incoming audio url
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.onended = () => setIsPlaying(false);
      
      if (autoPlay) {
        // Start playing automatically right as the chapter mounts
        audio.play()
          .then(() => setIsPlaying(true))
          .catch(e => console.error("Audio autoplay blocked by browser:", e));
      }
    }
    
    return () => {
      // Cleanup previous track when a new one comes in or component unmounts
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioUrl, autoPlay]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error("Audio playback failed", e));
    }
  };

  return (
    <div className="flex items-center gap-4 py-4 border-y border-zinc-200 dark:border-zinc-800 my-8">
      <button
        onClick={togglePlay}
        disabled={!audioUrl}
        className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors 
          ${audioUrl 
            ? 'border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black cursor-pointer' 
            : 'border-white/20 text-white/20 cursor-not-allowed'}`}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
      </button>
      
      <div className="flex-1 h-8 flex items-center justify-center gap-[3px]">
        {randomHeights.map((height, i) => (
          <motion.div
            key={i}
            className={`w-[3px] rounded-full origin-center ${audioUrl ? 'bg-black dark:bg-white' : 'bg-white/20'}`}
            initial={{ height: "4px" }}
            animate={{ 
              height: isPlaying 
                ? `${height}px` 
                : "4px" 
            }}
            transition={{
              duration: 0.15,
              repeat: isPlaying ? Infinity : 0,
              repeatType: "mirror",
              delay: i * 0.02
            }}
          />
        ))}
      </div>
      <span className="text-xs font-sans tracking-[0.2em] font-bold uppercase text-black dark:text-white">Narration</span>
    </div>
  );
}
