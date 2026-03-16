// Helper to generate AI Voice Narration Using Google Cloud TTS REST API

export async function generateNarration(text: string, voiceTone?: string): Promise<string> {
  const googleApiKey = process.env.GOOGLE_TTS_API_KEY;
  
  // A completely silent base64 MP3 as a placeholder buffer if TTS fails or key is missing
  const silentBase64Mp3 = "data:audio/mp3;base64,//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq";

  if (!googleApiKey || !text) {
    console.warn("No GOOGLE_TTS_API_KEY found or text empty, returning silent audio placeholder.");
    return silentBase64Mp3;
  }

  try {
    // Select voice based on tone loosely
    let voiceName = "en-US-Journey-D"; // Default Deep cinematic voice (Journey voices are great for narration)
    if (voiceTone?.toLowerCase().includes("whisper") || voiceTone?.toLowerCase().includes("scared")) {
      voiceName = "en-US-Journey-F"; // Softer
    }
    
    // Google TTS REST API Endpoint
    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${googleApiKey}`;
    
    const requestBody = {
      input: { text: text },
      voice: { languageCode: "en-US", name: voiceName },
      audioConfig: { 
        audioEncoding: "MP3",
        pitch: -2.0, // Slightly deeper for cinematic feel
        speakingRate: 0.9 // Slightly slower for dramatic effect
      }
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`TTS API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.audioContent) {
      // audioContent is already a base64 string of the MP3
      return `data:audio/mp3;base64,${data.audioContent}`;
    }
    
    return silentBase64Mp3;
  } catch (error) {
    console.error("Error generating narration audio:", error);
    return silentBase64Mp3; // Graceful degradation
  }
}
