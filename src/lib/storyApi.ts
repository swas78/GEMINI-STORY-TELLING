export interface StoryRequestData {
  prompt?: string;
  previousStory?: string;
  selectedUniverse?: string;
  emotion?: string;
  sessionId?: string;
}

export interface StoryResponseData {
  success?: boolean;
  error?: string;
  chapterTitle: string;
  story: string;
  imageUrl: string;
  audioUrl: string;
  universeChoices: string[];
  musicMood: string;
  voiceTone: string;
  sessionState: {
    sessionId: string;
    storyHistory: string[];
    selectedUniverses: string[];
    emotions: string[];
  };
}

export async function generateStory(data: StoryRequestData): Promise<StoryResponseData> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 seconds timeout

  try {
    const res = await fetch("/api/story/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const responseData = await res.json();

    if (!res.ok || responseData.success === false) {
      throw new Error(responseData.error || "AI failed to generate the next chapter. Try again.");
    }

    return responseData;
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error("Network timeout. The AI is taking too long to respond.");
    }
    throw error;
  }
}
