import { NextResponse } from "next/server";
import { generateSceneImage } from "../../../lib/image-gen";

export async function POST(request: Request) {
  try {
    const { sceneImagePrompt } = await request.json();

    if (!sceneImagePrompt) {
      return NextResponse.json({ error: "Missing sceneImagePrompt" }, { status: 400 });
    }

    const imageUrl = await generateSceneImage(sceneImagePrompt);
    return NextResponse.json({ imageUrl });
  } catch (error: unknown) {
    console.error("Image generation error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to generate image";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
