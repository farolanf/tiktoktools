import { MessageType, sendMessage } from './message';

export function say(text: string, voiceName?: string, options?: { volume?: number, rate?: number, pitch?: number }) {
  sendMessage({ type: MessageType.SPEECH, text, voiceName, ...options });
}

export async function isSpeaking() {
  return await new Promise<boolean>((r) => chrome.tts.isSpeaking(r))
}