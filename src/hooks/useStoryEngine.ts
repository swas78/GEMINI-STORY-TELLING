"use client";

import { useState } from "react";
import { generateStory, StoryResponseData } from "@/lib/storyApi";

export function useStoryEngine() {
  const [storyData, setStoryData] = useState<StoryResponseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<{ type: 'start' | 'choose', prompt?: string, selectedUniverse?: string, emotion?: string | null } | null>(null);

  const startStory = async (prompt: string) => {
    setLoading(true);
    setError(null);
    setLastAction({ type: 'start', prompt });
    try {
      const result = await generateStory({ prompt });
      setStoryData(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "AI failed to generate the next chapter. Try again.");
      } else {
        setError("AI failed to generate the next chapter. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const chooseUniverse = async (selectedUniverse: string, emotion?: string | null) => {
    if (!storyData?.sessionState?.sessionId) return;

    setLoading(true);
    setError(null);
    setLastAction({ type: 'choose', selectedUniverse, emotion });
    
    try {
      const result = await generateStory({
        selectedUniverse,
        emotion: emotion || undefined,
        sessionId: storyData.sessionState.sessionId,
      });
      setStoryData(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "AI failed to generate the next chapter. Try again.");
      } else {
        setError("AI failed to generate the next chapter. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const retry = async () => {
    if (!lastAction) return;
    if (lastAction.type === 'start' && lastAction.prompt) {
      await startStory(lastAction.prompt);
    } else if (lastAction.type === 'choose' && lastAction.selectedUniverse) {
      await chooseUniverse(lastAction.selectedUniverse, lastAction.emotion);
    }
  };

  return {
    storyData,
    loading,
    error,
    startStory,
    chooseUniverse,
    retry,
  };
}
