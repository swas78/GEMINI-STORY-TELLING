"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import HeroSection from "./HeroSection";

function IdeaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative w-full min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#13131c] via-[#0a0a0a] to-[#020202] text-white py-24 px-4 overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left Side: Museum Image */}
        <motion.div 
          style={{ y, opacity }}
          className="relative aspect-[3/4] w-full max-w-md mx-auto lg:max-w-none grayscale contrast-125 rounded-md overflow-hidden shadow-2xl shadow-black/50"
        >
          {/* Subtle dust particles */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay pointer-events-none z-10" />
          <img 
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop" 
            alt="Artistic abstract landscape" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 right-4 text-xs font-serif text-white/50 z-20">FIG 01. THE SPATIAL NARRATIVE</div>
        </motion.div>

        {/* Right Side: Text Block */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col justify-center"
        >
          <div className="font-sans text-xs tracking-[0.3em] uppercase text-white/50 mb-6 drop-shadow">The Concept</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic mb-8 leading-tight drop-shadow-md">
            Stories Should Not Be Linear
          </h2>
          <div className="prose prose-invert prose-lg font-serif text-white/70 leading-relaxed">
            <p className="drop-shadow-sm">
              Traditional storytelling confines the reader to a single track. In StoryVerse, the narrative evolves dynamically based on your decisions. Each choice is not just a branch, but a completely new dimension unfolding in real-time.
            </p>
            <p className="mt-6 drop-shadow-sm">
              You are no longer just an observer. You are the architect of the narrative flow.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MultiverseSection() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section ref={ref} className="relative w-full py-40 bg-[#050505] text-white flex flex-col items-center overflow-hidden">
      <div className="text-center mb-24 relative z-10 px-4">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic mb-6">Every Decision <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">Creates a Universe</span></h2>
        <p className="font-sans text-sm tracking-[0.2em] uppercase text-white/50">Explore the infinite branches of your choices</p>
      </div>

      {/* Abstract Animated Horizontal Multiverse Map */}
      <div className="relative w-full max-w-6xl overflow-x-auto pb-12 pt-4 px-8 hide-scrollbar cursor-grab active:cursor-grabbing">
        <div className="min-w-[1000px] flex items-center justify-between relative px-12 h-[300px]">
          
          {/* Intense central glow behind everything */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200px] bg-indigo-500/10 blur-[80px] pointer-events-none rounded-full" />
          
          {/* Main Connector Line (Background) */}
          <div className="absolute left-[8%] right-[8%] h-[1px] bg-white/10 top-1/2 -translate-y-1/2" />
          
          {/* Animated Light Beam */}
          <div className="absolute left-[8%] right-[8%] h-[1px] top-1/2 -translate-y-1/2 overflow-hidden">
             <motion.div 
              className="h-full w-[200px] bg-purple-400 blur-[2px]"
              animate={{ x: ["-100%", "500%"] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            />
          </div>

          {/* Node 1: Chapter End */}
          <div className="relative z-10 flex flex-col items-center group">
            <div className="absolute -top-10 text-xs font-sans tracking-widest text-white/40 whitespace-nowrap">Chapter End</div>
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5 }} className="w-4 h-4 rounded-full bg-white shadow-[0_0_15px_rgba(167,139,250,0.8)]" />
          </div>

          {/* Node 2: Decision Generator */}
          <div className="relative z-10 flex flex-col items-center group">
            <div className="absolute -bottom-10 text-xs font-sans tracking-widest text-white/40 whitespace-nowrap">Decision Gen</div>
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="w-6 h-6 rounded-full border border-indigo-400/40 bg-black flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-indigo-300/50" />
            </motion.div>
          </div>

          {/* The Split into 3 Universes */}
          <div className="relative z-10 flex flex-col items-center w-[200px]">
            {/* Split Lines SVG */}
            <svg className="absolute left-[-50px] top-1/2 -translate-y-1/2 w-[50px] h-[160px] stroke-white/20" fill="none">
              <path d="M 0 80 C 25 80, 25 0, 50 0" />
              <path d="M 0 80 L 50 80" />
              <path d="M 0 80 C 25 80, 25 160, 50 160" />
            </svg>

            {['Universe A', 'Universe B', 'Universe C'].map((uni, i) => (
              <motion.div 
                key={uni}
                initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                className={`py-2 px-6 rounded-full border border-white/20 bg-black/80 backdrop-blur-md relative group cursor-pointer hover:border-indigo-400/60 transition-colors ${i === 0 ? '-translate-y-[64px]' : i === 2 ? 'translate-y-[64px]' : 'my-4'}`}
              >
                <span className="font-sans text-[10px] tracking-[0.2em] text-white/70 group-hover:text-indigo-200 transition-colors uppercase">{uni}</span>
                <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 rounded-full blur-sm transition-opacity" />
              </motion.div>
            ))}

            {/* Merge Lines SVG */}
            <svg className="absolute right-[-50px] top-1/2 -translate-y-1/2 w-[50px] h-[160px] stroke-white/20" fill="none">
              <path d="M 0 0 C 25 0, 25 80, 50 80" />
              <path d="M 0 80 L 50 80" />
              <path d="M 0 160 C 25 160, 25 80, 50 80" />
            </svg>
          </div>

          {/* Node 3: Multiverse Viewer */}
          <div className="relative z-10 flex flex-col items-center group">
            <div className="absolute -top-12 text-xs font-sans tracking-widest text-white/40 whitespace-nowrap">Viewer Menu</div>
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.8 }} className="w-12 h-12 rounded-full border border-dashed border-purple-400/30 bg-black/50 flex items-center justify-center animate-[spin_15s_linear_infinite]">
              <div className="w-4 h-4 rounded-full border border-purple-300/50" />
            </motion.div>
          </div>

          {/* Node 4: User Selects + Continue */}
          <div className="relative z-10 flex flex-col items-center group">
            <div className="absolute -bottom-10 text-xs font-sans tracking-widest text-white/40 whitespace-nowrap shrink-0">User Selection</div>
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, delay: 1 }} className="w-6 h-6 rounded-full bg-white shadow-[0_0_20px_rgba(167,139,250,0.8)] relative flex items-center justify-center">
               <div className="absolute inset-0 rounded-full border border-white animate-ping" />
            </motion.div>
          </div>

          {/* End Point */}
          <div className="relative z-10 flex flex-col items-center group">
            <div className="absolute -top-10 text-xs font-sans tracking-widest text-white/40 whitespace-nowrap shrink-0">Next Chapter</div>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 1.2 }} className="w-2 h-2 rounded-full bg-indigo-400/40" />
          </div>

        </div>
      </div>
      
      {/* Scroll Hint */}
      <div className="text-[10px] font-sans tracking-[0.3em] text-white/20 uppercase mt-8 md:hidden">
        Scroll Horizontally
      </div>
    </section>
  );
}

function EmotionsSection() {
  const emojis = [
    { emoji: "🙂", label: "Joy" },
    { emoji: "😱", label: "Fear" },
    { emoji: "😡", label: "Anger" },
    { emoji: "❤️", label: "Love" },
    { emoji: "🤔", label: "Curiosity" }
  ];

  return (
    <section className="relative w-full py-32 bg-[#0a0a0a] text-white overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-serif italic mb-6">Emotion Driven Tone</h2>
        <p className="font-sans text-sm tracking-[0.2em] uppercase text-white/50 mb-20">Your reactions shape the narrative voice</p>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {emojis.map((item, i) => (
            <motion.div 
              key={item.label}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.2, y: -10 }}
              className="relative group cursor-pointer flex flex-col items-center"
            >
              <div className="text-6xl md:text-7xl filter grayscale hover:grayscale-0 transition-all duration-500 relative z-10">
                {item.emoji}
              </div>
              <span className="mt-4 font-sans text-xs tracking-[0.2em] uppercase text-white/0 group-hover:text-white/50 transition-colors duration-300">
                {item.label}
              </span>
              {/* Ripple */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-white/10 rounded-full scale-0 group-hover:animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] z-0 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="relative w-full py-40 bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />
        
        <h2 className="text-center text-3xl font-sans tracking-[0.3em] uppercase text-white/50 mb-32 bg-black py-4">How it Works</h2>

        <div className="space-y-32">
          {[
            { step: '01', title: 'Plant the Seed', desc: 'Provide an initial prompt or select a predefined world to begin the generation.' },
            { step: '02', title: 'Choose Your Path', desc: 'At crucial junctures, select a universe branch to steer the characters.' },
            { step: '03', title: 'Watch it Evolve', desc: 'Experience generating text, immersive audio narration, and bespoke visuals.' }
          ].map((item, i) => (
            <div key={item.step} className={`flex items-center w-full ${i % 2 === 0 ? 'flex-row-reverse' : ''}`}>
              <motion.div 
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className={`w-1/2 flex flex-col ${i % 2 === 0 ? 'pl-16 items-start text-left' : 'pr-16 items-end text-right'}`}
              >
                <div className="font-serif italic text-6xl text-white/10 mb-4">{item.step}</div>
                <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
                <p className="text-white/50 font-sans tracking-wide leading-relaxed max-w-sm">
                  {item.desc}
                </p>
              </motion.div>
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] border-4 border-black box-content" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ onEnter }: { onEnter: () => void }) {
  return (
    <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-[#1a1025] via-[#050505] to-[#050505] text-white py-32 overflow-hidden">
      {/* Background glow resembling an open book */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-30">
        <div className="w-[80vw] h-[40vh] bg-indigo-500/10 blur-[100px] rounded-[100%_100%_0_0]" />
        <div className="absolute bottom-0 w-[2px] h-1/2 bg-gradient-to-t from-purple-500/20 to-transparent" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center flex flex-col items-center"
      >
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif italic mb-12">
          Step Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Your Story</span>
        </h2>
        <motion.button
          onClick={onEnter}
          whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(129,140,248,0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-5 bg-white text-black rounded-full font-sans text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white/90"
        >
          Open StoryVerse
        </motion.button>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full py-12 bg-black border-t border-white/5 flex flex-col items-center text-center">
      <div className="font-serif italic text-xl mb-4 text-white">StoryVerse AI</div>
      <p className="font-sans text-xs tracking-widest uppercase text-white/40 mb-8">Built for creative storytelling</p>
      <div className="flex gap-8 font-sans text-xs tracking-wider text-white/50">
        <a href="#" className="hover:text-white transition-colors">Demo</a>
        <a href="#" className="hover:text-white transition-colors">GitHub</a>
        <a href="#" className="hover:text-white transition-colors">Docs</a>
      </div>
    </footer>
  );
}

import PromptTemplates from "@/components/PromptTemplates";

function AISearchSection({ onGenerateStory }: { onGenerateStory?: (prompt: string) => void }) {
  const [prompt, setPrompt] = useState("");

  const handleGenerate = () => {
    if (prompt.trim() && onGenerateStory) {
      onGenerateStory(prompt.trim());
    }
  };

  const handleSelectTemplate = (templatePrompt: string) => {
    if (onGenerateStory) {
      onGenerateStory(templatePrompt);
    }
  };

  return (
    <section className="relative w-full py-32 bg-[#020202] text-white flex flex-col items-center overflow-hidden border-t border-white/5">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(60,40,120,0.15)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_bottom,rgba(40,60,150,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 text-center relative z-10 w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6 leading-tight"
        >
          Create Your Own <br />
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-300">
            AI Story Universe
          </span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg md:text-xl font-sans text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Generate interactive stories with multiple story paths. Every choice creates a new universe of possibilities.
        </motion.p>

        {/* Feature Tags */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {['AI Generated', 'Branching Paths', 'Interactive'].map((tag) => (
            <div key={tag} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-sans tracking-wide text-white/70">
              <span className="text-indigo-400 text-base leading-none">✦</span> {tag}
            </div>
          ))}
        </motion.div>

        {/* Glassmorphism Input Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="w-full max-w-3xl mx-auto relative group mb-12"
        >
          {/* Animated border glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          
          <div className="relative w-full bg-[#0a0a0f]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-start shadow-2xl">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your story prompt... e.g., 'A detective in a cyberpunk city discovers a conspiracy that reaches the highest levels of government...'"
              className="w-full h-32 bg-transparent resize-none outline-none text-white/90 placeholder:text-white/30 font-sans text-sm md:text-base leading-relaxed"
              maxLength={500}
            />
            
            <div className="w-full flex justify-end mb-4">
              <span className="text-xs text-white/30 font-sans tracking-widest">{prompt.length} / 500</span>
            </div>

            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
              <span className="text-xs text-white/40 font-sans">Your prompt will generate a unique multiverse story</span>
              <button 
                onClick={handleGenerate}
                disabled={!prompt.trim()}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-sans text-sm font-medium transition-colors ${prompt.trim() ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]' : 'bg-white/10 text-white/30 cursor-not-allowed'}`}
              >
                <span>✦</span> Generate Story
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Prompt Templates Component */}
        <PromptTemplates onSelectTemplate={handleSelectTemplate} />
      </div>
    </section>
  );
}

export default function LandingPage({ onEnter, onGenerateStory }: { onEnter: () => void, onGenerateStory?: (prompt: string) => void }) {
  return (
    <div className="w-full min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans scroll-smooth overflow-x-hidden">
      <HeroSection onEnter={onEnter} />
      <IdeaSection />
      <MultiverseSection />
      <AISearchSection onGenerateStory={onGenerateStory} />
      <EmotionsSection />
      <HowItWorksSection />
      <CTASection onEnter={onEnter} />
      <Footer />
    </div>
  );
}
