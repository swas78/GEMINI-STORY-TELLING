"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface BookPageProps {
  id: string; // Used to trigger AnimatePresence
  leftContent: ReactNode;
  rightContent: ReactNode;
  direction?: 'forward' | 'backward';
  pageLeft?: number | string;
  pageRight?: number | string;
  hidePageNumbers?: boolean;
}

const transitionSettings = { 
  duration: 1.4, 
  ease: [0.645, 0.045, 0.355, 1] as const // smooth easeInOutCubic
};

const leftVariants = {
  initial: (dir: 'forward' | 'backward') => ({
    rotateY: dir === 'forward' ? 180 : 0,
    zIndex: dir === 'forward' ? 20 : 0,
    opacity: 1,
  }),
  animate: (dir: 'forward' | 'backward') => ({
    rotateY: 0,
    zIndex: dir === 'forward' ? 20 : 0,
    opacity: 1,
    transition: transitionSettings
  }),
  exit: (dir: 'forward' | 'backward') => ({
    rotateY: dir === 'backward' ? 180 : 0,
    zIndex: dir === 'backward' ? 20 : 0,
    opacity: 1,
    transition: transitionSettings
  })
};

const rightVariants = {
  initial: (dir: 'forward' | 'backward') => ({
    rotateY: dir === 'backward' ? -180 : 0,
    zIndex: dir === 'backward' ? 20 : 0,
    opacity: 1,
  }),
  animate: (dir: 'forward' | 'backward') => ({
    rotateY: 0,
    zIndex: dir === 'backward' ? 20 : 0,
    opacity: 1,
    transition: transitionSettings
  }),
  exit: (dir: 'forward' | 'backward') => ({
    rotateY: dir === 'forward' ? -180 : 0,
    zIndex: dir === 'forward' ? 20 : 0,
    opacity: 1,
    transition: transitionSettings
  })
};

export default function BookPage({ id, leftContent, rightContent, direction = 'forward', pageLeft, pageRight, hidePageNumbers = false }: BookPageProps) {
  return (
    <div className="relative w-full h-full perspective-[2500px]">
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <motion.div
          key={id}
          custom={direction}
          className="absolute inset-0 flex w-full h-full transform-style-3d origin-center"
        >
          {/* Left Page Wrapper */}
          <motion.div 
            className="absolute left-0 top-0 bottom-0 w-1/2 origin-right"
            style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
            custom={direction}
            variants={leftVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="w-full h-full bg-[#0a0a0a] border-r border-white/5 overflow-hidden shadow-[-10px_0_30px_rgba(0,0,0,0.5)] text-white/90 flex flex-col relative">
              {/* Page Texture / Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)] pointer-events-none z-10" />
              
              {/* Spine Shadow on Left Page */}
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/60 to-transparent pointer-events-none z-20" />
              
              <div className="flex-1 w-full h-full p-8 md:p-12 lg:p-16 relative z-0">
                {leftContent}
              </div>

              {!hidePageNumbers && pageLeft && (
                <div className="absolute bottom-6 left-8 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs font-serif text-white/50 z-30 bg-[#0a0a0a]">
                  {pageLeft}
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Right Page Wrapper */}
          <motion.div 
            className="absolute right-0 top-0 bottom-0 w-1/2 origin-left"
            style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
            custom={direction}
            variants={rightVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="w-full h-full bg-[#0d0d0d] overflow-hidden shadow-[10px_0_30px_rgba(0,0,0,0.5)] text-white/90 flex flex-col relative">
              {/* Page Texture / Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)] pointer-events-none z-10" />
              
              {/* Spine Shadow on Right Page */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/60 to-transparent pointer-events-none z-20" />
              
              <div className="flex-1 w-full h-full p-8 md:p-12 lg:p-16 relative z-0 overflow-y-auto pb-24 custom-scrollbar">
                {rightContent}
              </div>

              {!hidePageNumbers && pageRight && (
                <div className="absolute bottom-6 right-8 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs font-serif text-white/50 z-30 bg-[#0d0d0d]">
                  {pageRight}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
