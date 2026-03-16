"use client";

import { useEffect, useRef, useState } from "react";

const MOOD_MUSIC_MAP: Record<string, string> = {
  epic: "/music/epic.mp3",
  suspense: "/music/suspense.mp3",
  calm: "/music/calm.mp3",
  mysterious: "/music/mysterious.mp3",
  emotional: "/music/emotional.mp3"
};

const DEFAULT_VOLUME = 0.3;
const FADE_DURATION = 1000; // 1 second
const FADE_STEPS = 20;

interface BackgroundMusicPlayerProps {
  mood?: string;
}

export default function BackgroundMusicPlayer({ mood }: BackgroundMusicPlayerProps) {
  const currentTrackRef = useRef<string | null>(null);
  const audioRef1 = useRef<HTMLAudioElement | null>(null);
  const audioRef2 = useRef<HTMLAudioElement | null>(null);
  
  // Tracks which audio element is the active one (1 or 2)
  const activeAudioRef = useRef<1 | 2>(1);
  const fadeInterval1 = useRef<NodeJS.Timeout | null>(null);
  const fadeInterval2 = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Determine target track based on mood, default to calm
    const targetKey = mood && MOOD_MUSIC_MAP[mood] ? mood : "calm";
    const targetUrl = MOOD_MUSIC_MAP[targetKey];

    // If already playing the same track, do nothing
    if (currentTrackRef.current === targetUrl) return;

    // Initialization
    if (!audioRef1.current) {
      audioRef1.current = document.createElement("audio");
      audioRef1.current.loop = true;
      audioRef1.current.preload = "auto";
    }
    if (!audioRef2.current) {
      audioRef2.current = document.createElement("audio");
      audioRef2.current.loop = true;
      audioRef2.current.preload = "auto";
    }

    const currentAudio = activeAudioRef.current === 1 ? audioRef1.current : audioRef2.current;
    const nextAudio = activeAudioRef.current === 1 ? audioRef2.current : audioRef1.current;
    const currentFadeInterval = activeAudioRef.current === 1 ? fadeInterval1 : fadeInterval2;
    const nextFadeInterval = activeAudioRef.current === 1 ? fadeInterval2 : fadeInterval1;

    // Prepare Next Audio Track
    nextAudio.src = targetUrl;
    nextAudio.volume = 0;
    
    // Attempt play (may be blocked by browser autoplay policy on initial mount without interaction)
    nextAudio.play().catch(err => {
      console.log("Audio autoplay blocked or placeholder file invalid:", err);
    });

    // Clear any existing fade intervals
    if (currentFadeInterval.current) clearInterval(currentFadeInterval.current);
    if (nextFadeInterval.current) clearInterval(nextFadeInterval.current);

    // Fade Out Current Audio
    if (currentTrackRef.current && currentAudio.volume > 0) {
      const outStep = currentAudio.volume / FADE_STEPS;
      currentFadeInterval.current = setInterval(() => {
        if (currentAudio.volume - outStep > 0) {
          currentAudio.volume -= outStep;
        } else {
          currentAudio.volume = 0;
          currentAudio.pause();
          if (currentFadeInterval.current) clearInterval(currentFadeInterval.current);
        }
      }, FADE_DURATION / FADE_STEPS);
    }

    // Fade In Next Audio
    const inStep = DEFAULT_VOLUME / FADE_STEPS;
    nextFadeInterval.current = setInterval(() => {
      if (nextAudio.volume + inStep < DEFAULT_VOLUME) {
        nextAudio.volume += inStep;
      } else {
        nextAudio.volume = DEFAULT_VOLUME;
        if (nextFadeInterval.current) clearInterval(nextFadeInterval.current);
      }
    }, FADE_DURATION / FADE_STEPS);

    // Toggle active audio
    activeAudioRef.current = activeAudioRef.current === 1 ? 2 : 1;
    currentTrackRef.current = targetUrl;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mood]);

  useEffect(() => {
    // Save refs for cleanup
    const audio1 = audioRef1.current;
    const audio2 = audioRef2.current;
    
    return () => {
      if (fadeInterval1.current) clearInterval(fadeInterval1.current);
      if (fadeInterval2.current) clearInterval(fadeInterval2.current);
      if (audio1) {
        audio1.pause();
        audio1.src = "";
      }
      if (audio2) {
        audio2.pause();
        audio2.src = "";
      }
    };
  }, []);

  // Ensure early preload mounting visually invisible
  return (
    <div style={{ display: 'none' }}>
      <audio preload="auto" />
    </div>
  );
}
