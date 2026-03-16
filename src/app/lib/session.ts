import { v4 as uuidv4 } from "uuid";

export interface StorySession {
  sessionId: string;
  storyHistory: string[];
  selectedUniverses: string[];
  emotions: string[];
}

// In-memory store for story sessions
const sessions = new Map<string, StorySession>();

export function createSession(): StorySession {
  const sessionId = uuidv4();
  const newSession: StorySession = {
    sessionId,
    storyHistory: [],
    selectedUniverses: [],
    emotions: []
  };
  sessions.set(sessionId, newSession);
  return newSession;
}

export function getSession(sessionId: string): StorySession | undefined {
  return sessions.get(sessionId);
}

export function updateSession(
  sessionId: string, 
  newStoryChunk: string, 
  selectedUniverse?: string, 
  emotion?: string
): StorySession {
  const session = sessions.get(sessionId);
  
  if (!session) {
    throw new Error(`Session with ID ${sessionId} not found`);
  }

  session.storyHistory.push(newStoryChunk);
  
  if (selectedUniverse) {
    session.selectedUniverses.push(selectedUniverse);
  }
  
  if (emotion) {
    session.emotions.push(emotion);
  }

  sessions.set(sessionId, session);
  return session;
}
