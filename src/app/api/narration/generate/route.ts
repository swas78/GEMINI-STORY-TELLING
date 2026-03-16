import { NextResponse } from "next/server";
import { generateNarration } from "../../../lib/tts";

export async function POST(request: Request) {
  try {
    const { story, voiceTone } = await request.json();

    if (!story) {
      return NextResponse.json({ error: "Missing story text" }, { status: 400 });
    }

    const audioUrl = await generateNarration(story, voiceTone);
    return NextResponse.json({ audioUrl });
  } catch (error: unknown) {
    console.error("Narration generation error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to generate narration";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
