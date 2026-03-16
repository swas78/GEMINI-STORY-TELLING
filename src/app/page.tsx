"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CinematicBackground from "@/components/CinematicBackground";
import StoryBookContainer from "@/components/StoryBookContainer";
import BookPage from "@/components/BookPage";
import SceneImage from "@/components/SceneImage";
import NarrationPlayer from "@/components/NarrationPlayer";
import EmotionReactions from "@/components/EmotionReactions";
import UniverseChoices from "@/components/UniverseChoices";
import MultiverseMap from "@/components/MultiverseMap";
import LandingPage from "@/components/landing/LandingPage";
import ErrorScreen from "@/components/ErrorScreen";
import TypewriterText from "@/components/TypewriterText";
import CinematicLoader from "@/components/CinematicLoader";
import BackgroundMusicPlayer from "@/components/BackgroundMusicPlayer";
import CinematicModeToggle from "@/components/CinematicModeToggle";
import { useStoryEngine } from "@/hooks/useStoryEngine";

export default function Home() {
  const [isExplored, setIsExplored] = useState(false);
  const [direction, setDirection] = useState<'forward'|'backward'>('forward');
  const [currentEmotion, setCurrentEmotion] = useState<string | null>(null);
  
  // Cinematic Mode States
  const [cinematicMode, setCinematicMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { storyData, loading, error, startStory, chooseUniverse, retry } = useStoryEngine();

  // Handle the initial generation from LandingPage
  const handleInitialGenerate = async (prompt: string) => {
    setIsExplored(true);
    setDirection('forward');
    await startStory(prompt);
  };

  // Handle choice selection from UniverseChoices
  const handleSelectUniverse = async (choiceId: string, choiceTitle?: string) => {
    setDirection('forward');
    // If choiceTitle isn't passed directly, try to find it in the current storyData choices
    const title = choiceTitle || storyData?.universeChoices?.find((c, i) => `generate-${i}` === choiceId) || choiceId;
    await chooseUniverse(title, currentEmotion);
    setCurrentEmotion(null); // Reset emotion after choice
  };

  // If we have entered the book but the story is still loading its first chapter, show a cover placeholder
  const isCover = !storyData && !loading && !error;

  const renderCover = () => ({
    left: (
      <div className="w-full h-full relative -m-8 md:-m-12 lg:-m-16 rounded overflow-hidden">
        <SceneImage 
          src="https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=1000&auto=format&fit=crop" 
          alt="Cover" 
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-8 text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans font-light tracking-[0.2em] mb-4 text-center">
            STORYVERSE
          </h1>
          <p className="text-sm md:text-base font-serif italic tracking-wider text-white/80">
            Cinematic Interactive Fiction
          </p>
        </div>
      </div>
    ),
    right: (
      <div className="w-full h-full flex flex-col justify-center max-w-lg mx-auto py-12">
        <div className="prose prose-lg font-serif italic text-white/80 leading-[1.8] whitespace-pre-wrap text-lg md:text-xl">
          Welcome to the Multiverse. Your journey begins here.
        </div>
        
        <div className="mt-auto pt-16 flex justify-between items-end">
          <div className="font-serif italic text-white/40">Awakening...</div>
        </div>
      </div>
    )
  });

  const renderStory = () => {
    // Format API choices for the UniverseChoices component
    const formattedChoices = storyData?.universeChoices?.map((choice, idx) => ({
      id: `generate-${idx}`,
      title: choice,
      preview: "Select this path to continue the story.",
      icon: idx % 2 === 0 ? ("sparkles" as const) : ("route" as const)
    })) || [];

    return {
      left: (
        <div className="w-full h-full flex flex-col">
          <div className="w-full aspect-[4/3] relative rounded overflow-hidden mb-6 flex-shrink-0 bg-zinc-900 border border-white/5">
            {storyData?.imageUrl && (
              <SceneImage src={storyData.imageUrl} alt={storyData?.chapterTitle || "Scene"} />
            )}
          </div>
          <div className="flex justify-between items-start font-serif italic text-sm text-white/50 border-b border-white/10 pb-4">
            <span className="max-w-[50%]">Chapter Scene</span>
            <span className="max-w-[50%] text-right lowercase">{storyData?.musicMood || 'Cinematic'}</span>
          </div>
          
          <div className="mt-12 flex-1 relative">
            <div className="absolute inset-0 overflow-y-auto pr-4 hide-scrollbar">
              <div className="prose prose-lg font-serif text-white/90 leading-[1.8]">
                {storyData?.story && (
                  <TypewriterText 
                    text={storyData.story} 
                    className="first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:mr-3 first-letter:float-left first-line:tracking-wide whitespace-pre-wrap"
                    autoScroll={cinematicMode}
                    onTypingStart={() => setIsTyping(true)}
                    onTypingComplete={() => setIsTyping(false)}
                  />
                )}
                {!storyData?.story && (
                  <p className="first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:mr-3 first-letter:float-left first-line:tracking-wide whitespace-pre-wrap">
                    ...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ),
      right: (
        <div className="w-full h-full flex flex-col max-w-md mx-auto relative pt-4">
          <h3 className="font-serif italic text-3xl font-bold text-center mb-12 text-white/90">
            {storyData?.chapterTitle || "The Ongoing Multiverse"}
          </h3>

          <div className="flex-1 flex flex-col transition-opacity duration-1000">
            <div className="mt-auto">
              <NarrationPlayer audioUrl={storyData?.audioUrl} autoPlay={cinematicMode} />
            </div>
            
            {/* Soft reveal choices and map buttons only when typing finishes in Cinematic Mode */}
            <div className={`transition-opacity duration-1000 ${cinematicMode && isTyping ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <div className="mt-4">
                <EmotionReactions selectedEmotion={currentEmotion} onSelectEmotion={setCurrentEmotion} />
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/10">
                <UniverseChoices choices={formattedChoices} onSelect={handleSelectUniverse} />
              </div>
            </div>
          </div>
        </div>
      )
    };
  };

  const content = isCover ? renderCover() : renderStory();

  return (
    <AnimatePresence mode="wait">
      {!isExplored ? (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full min-h-screen relative z-10"
        >
          {/* LandingPage triggers handleInitialGenerate from AI Search section */}
          <LandingPage onEnter={() => setIsExplored(true)} onGenerateStory={handleInitialGenerate} />
        </motion.div>
      ) : (
        <motion.main
          key="book"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="relative min-h-screen w-full text-zinc-100 flex items-center justify-center bg-[#050505] overflow-hidden"
        >
          <CinematicBackground />
          <BackgroundMusicPlayer mood={storyData?.musicMood} />
          <CinematicModeToggle enabled={cinematicMode} onToggle={setCinematicMode} />
          
          {/* Only show the book if we are not loading and there isn't an unhandled error */}
          {/* Note: In our priority chain: Loading covers everything. Error covers everything. Book is below both. */}
          <div className="relative z-10 w-full h-screen p-4 sm:p-8 md:p-12 lg:p-16 flex items-center justify-center">
            <StoryBookContainer>
              <BookPage
                id={storyData?.sessionState?.storyHistory?.length?.toString() || "init"}
                direction={direction}
                hidePageNumbers={isCover}
                leftContent={content.left}
                rightContent={content.right}
              />
            </StoryBookContainer>
          </div>

          {/* Render MultiverseMap if there is session state */}
          {storyData?.sessionState && !loading && !error && (
            <MultiverseMap session={storyData.sessionState} />
          )}

          {/* Priorities: 1. Loading, 2. Error */}
          <AnimatePresence>
            {loading ? (
              <CinematicLoader />
            ) : error ? (
              <ErrorScreen key="error-screen" message={error} onRetry={retry} />
            ) : null}
          </AnimatePresence>

        </motion.main>
      )}
    </AnimatePresence>
  );
}



