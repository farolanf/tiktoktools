import { MessageType } from '../constants';

interface MessageBase {
  type: MessageType;
}

interface SpeechMessage extends MessageBase {
  type: MessageType.Speech;
  text: string;
}

interface GetVoicesMessage extends MessageBase {
  type: MessageType.GetVoices;
}

interface GetVoicesResponse {
  voices: chrome.tts.TtsVoice[];
}

export function sendMessage(message: SpeechMessage): Promise<void>;

export function sendMessage(
  message: GetVoicesMessage
): Promise<GetVoicesResponse>;

export function sendMessage(message: any): any {
  return chrome.runtime.sendMessage(message);
}
