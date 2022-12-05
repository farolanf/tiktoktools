import { MessageType, sendMessage } from './message';

export function say(text: string, voiceName?: string) {
  sendMessage({ type: MessageType.SPEECH, text, voiceName });
}
