import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

// Fallback to empty string for build times, but will throw an error at runtime if used and missing
const genAI = new GoogleGenerativeAI(apiKey || "");

export interface StoryGenerationContext {
  prompt?: string;
  previousStory?: string;
  selectedUniverse?: string;
  emotion?: string;
}

export async function generateCinematicStory(context: StoryGenerationContext) {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set.");
  }

  // Using gemini-1.5-flash as it is fast, highly capable, and excellent for structured JSON output
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const promptText = `You are a master interactive storyteller mapping out an infinite, branching cinematic universe.
You weave immersive narratives, adapting to user choices and emotional reactions. 

Here is the context for the next chapter:
${context.prompt ? `- Initial Subject/Prompt: ${context.prompt}` : ""}
${context.previousStory ? `- Previous Story Content: ${context.previousStory}` : ""}
${context.selectedUniverse ? `- User's Selected Path/Choice: ${context.selectedUniverse}` : ""}
${context.emotion ? `- User's Emotion/Reaction to previous events: ${context.emotion}` : ""}

Storytelling Instructions:
Write 3-4 paragraphs of cinematic, engaging storytelling. 
IMPORTANT: Dynamically adjust the tone based on the user's emotion. 
- If emotion is 'scared', make the story darker, with a suspenseful horror tone.
- If emotion is 'happy', use optimistic, bright storytelling.
- If emotion is 'angry', make it a conflict-driven story with faster pacing.
- If emotion is 'love', focus on deep emotional character interactions and warmth.

Output your response COMPLETELY AND STRICTLY in JSON format with the following exact keys and types:

{
  "chapterTitle": "String - A very short, evocative title for this chapter",
  "story": "String - The narrative text (3-4 paragraphs)",
  "sceneImagePrompt": "String - A highly detailed visual description of the main scene for an AI image generator (include lighting, mood, color palette)",
  "musicMood": "String - Single word or short phrase describing the soundtrack mood (e.g. suspenseful, epic, somber, calm)",
  "voiceTone": "String - Single word or short phrase for a narrator (e.g. dramatic, whispered, urgent)",
  "universeChoices": ["Choice 1", "Choice 2", "Choice 3"] // Exactly 3 distinct, radically different branching choices for what happens next.
}`;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: promptText }] }],
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const responseText = result.response.text();
    const parsedData = JSON.parse(responseText);

    return parsedData;
  } catch (error) {
    console.error("Error generating story with Gemini:", error);
    throw new Error("Failed to generate story content.");
  }
}
