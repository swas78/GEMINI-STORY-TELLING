"use client";

import { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
  text?: string;
  speed?: number;
  className?: string; // Additional classes
  autoScroll?: boolean;
  onTypingComplete?: () => void;
  onTypingStart?: () => void;
}

export default function TypewriterText({ 
  text = '', 
  speed = 25, 
  className = '',
  autoScroll = false,
  onTypingComplete,
  onTypingStart
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const textContainerRef = useRef<HTMLDivElement>(null);
  
  // Track previous text securely so we can diff completion properly
  const previousTextRef = useRef<string | null>(null);

  useEffect(() => {
    setDisplayText('');
    previousTextRef.current = text;
    
    if (!text) return;
    if (onTypingStart) onTypingStart();

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
        
        // Auto scroll if cinematic mode is enabled
        if (autoScroll && textContainerRef.current) {
          // Scroll the nearest scrollable parent frame smoothly (usually the text column)
          textContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      } else {
        clearInterval(intervalId);
        if (onTypingComplete) onTypingComplete();
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed, autoScroll]); // Exclude onTyping callbacks so it doesn't restart repeatedly

  return (
    <div ref={textContainerRef} className={className}>
      {displayText}
      {/* Optional blinking cursor */}
      {displayText.length < text.length && (
        <span className="animate-pulse ml-0.5 border-r-2 border-white/50 inline-block h-[1em] translate-y-1" />
      )}
    </div>
  );
}
