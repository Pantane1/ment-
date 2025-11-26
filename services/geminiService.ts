import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
You are GPMentor, a friendly, encouraging, and highly technical mentor for young people learning to code.
Your goal is to help students (ages 14-25) debug code, understand complex concepts via analogies, and stay motivated.
When answering:
1. Be concise but helpful.
2. Use markdown for code blocks.
3. If a student is stuck, guide them with hints rather than just giving the answer immediately.
4. Keep the tone inspiring and "cool" - use occasional emojis but remain professional.
`;

export const getGeminiChat = (): Chat => {
  if (!chatSession) {
    const apiKey = process.env.API_KEY || ''; 
    if (!apiKey) {
      console.error("API Key is missing. Ensure process.env.API_KEY is set.");
    }
    
    const ai = new GoogleGenAI({ apiKey });
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (
  message: string,
  onChunk: (text: string) => void
): Promise<string> => {
  const chat = getGeminiChat();
  let fullResponse = "";

  try {
    const resultStream = await chat.sendMessageStream({ message });
    
    for await (const chunk of resultStream) {
        const c = chunk as GenerateContentResponse;
        const text = c.text;
        if (text) {
            fullResponse += text;
            onChunk(fullResponse);
        }
    }
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "I'm having a little trouble connecting to the network right now. Try again in a moment! 🤖";
  }

  return fullResponse;
};
