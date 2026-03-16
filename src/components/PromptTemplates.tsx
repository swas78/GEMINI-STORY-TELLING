"use client";

import { motion, Variants } from "framer-motion";
import { promptTemplates, PromptTemplate } from "@/data/promptTemplates";

interface PromptTemplatesProps {
  onSelectTemplate: (prompt: string) => void;
}

export default function PromptTemplates({ onSelectTemplate }: PromptTemplatesProps) {
  
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="w-full mt-16 max-w-5xl mx-auto">
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-white/40">Or start with a template</span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 px-4"
      >
        {promptTemplates.map((template: PromptTemplate) => (
          <motion.div
            key={template.id}
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectTemplate(template.prompt)}
            className="group relative cursor-pointer flex flex-col h-full bg-[#0a0a0a] border border-white/5 rounded-xl p-6 overflow-hidden transition-colors hover:border-indigo-500/30 shadow-lg"
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="text-3xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110 origin-left">
                {template.icon}
              </div>
              
              <h3 className="font-serif italic text-lg text-white/90 mb-2 group-hover:text-indigo-200 transition-colors">
                {template.title}
              </h3>
              
              <p className="font-sans text-sm text-white/50 leading-relaxed mb-6 flex-grow">
                {template.description}
              </p>
              
              <div className="mt-auto flex items-center text-[10px] font-sans tracking-widest uppercase text-indigo-400 group-hover:text-indigo-300 font-bold transition-colors">
                <span>Start Story</span>
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
