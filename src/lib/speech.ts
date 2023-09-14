import { MessageType, sendMessage } from './message';

export function say(text: string, voiceName?: string) {
  sendMessage({ type: MessageType.SPEECH, text, voiceName });
}

export async function isSpeaking() {
  return await new Promise<boolean>((r) => chrome.tts.isSpeaking(r))
}