import { NextResponse } from "next/server";
import { generateCinematicStory } from "../../../lib/gemini";
import { generateSceneImage } from "../../../lib/image-gen";
import { generateNarration } from "../../../lib/tts";
import { createSession, getSession, updateSession } from "../../../lib/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, previousStory, selectedUniverse, emotion, sessionId } = body;

    // 1. Session Management
    // If no sessionId is provided, create a new one. Otherwise, fetch existing.
    let currentSession = sessionId ? getSession(sessionId) : createSession();
    if (!currentSession) currentSession = createSession();

    // Pass the actual accumulated story history to Gemini for context if it exists, otherwise fall back to prompt/previousStory
    const contextStory = currentSession.storyHistory.length > 0 
      ? currentSession.storyHistory.join("\n\n") 
      : previousStory;

    // 2. Generate Story Chapter using Gemini
    const storyData = await generateCinematicStory({
      prompt,
      previousStory: contextStory,
      selectedUniverse,
      emotion
    });

    // Run Image and Audio generation in parallel to reduce wait time
    // 3. Generate Scene Image using HuggingFace/Stability placeholder
    // 4. Generate Narration Audio using Google TTS placeholder
    const [imageUrl, audioUrl] = await Promise.all([
      generateSceneImage(storyData.sceneImagePrompt),
      generateNarration(storyData.story, storyData.voiceTone)
    ]);

    // 5. Update session story history
    const updatedSession = updateSession(
      currentSession.sessionId, 
      storyData.story, 
      selectedUniverse, 
      emotion
    );

    // 6. Return the fully unified JSON payload
    return NextResponse.json({
      success: true,
      chapterTitle: storyData.chapterTitle,
      story: storyData.story,
      imageUrl,
      audioUrl,
      universeChoices: storyData.universeChoices,
      musicMood: storyData.musicMood,
      voiceTone: storyData.voiceTone,
      sessionState: updatedSession
    });

  } catch (error: unknown) {
    console.error("Story generation pipeline error:", error);
    const errorMessage = error instanceof Error ? error.message : "AI failed to generate the next chapter. Try again.";
    
    // Fallback response format as requested
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage 
      },
      { status: 500 }
    );
  }
}
