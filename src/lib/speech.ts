import { MessageType } from '../constants';
import { sendMessage } from './message';

export function say(text: string, voiceName?: string) {
  sendMessage({ type: MessageType.Speech, text, voiceName });
}
