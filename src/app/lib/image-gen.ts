// Helper to generate AI scene images

export async function generateSceneImage(prompt: string): Promise<string> {
  const hfApiKey = process.env.HUGGINGFACE_API_KEY;
  
  // Standard fallback placeholder image if key is missing or prompt is empty
  const fallbackUrl = "https://images.unsplash.com/photo-1531297121283-36c1e345ee33?auto=format&fit=crop&q=80&w=1000";

  if (!hfApiKey || !prompt) {
    console.warn("No HUGGINGFACE_API_KEY found or prompt empty, returning placeholder image.");
    return fallbackUrl;
  }

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        headers: {
          Authorization: `Bearer ${hfApiKey}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      throw new Error(`Image API returned ${response.status}: ${response.statusText}`);
    }

    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Return as Base64 Data URI to avoid file system race conditions in Next.js
    const base64Image = `data:${blob.type};base64,${buffer.toString('base64')}`;
    return base64Image;

  } catch (error) {
    console.error("Error generating scene image:", error);
    return fallbackUrl; // Graceful degradation
  }
}
