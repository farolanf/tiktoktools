import { MessageType } from '../constants';

interface SpeechMessage {
  type: MessageType.Speech;
  text: string;
  voiceName?: string;
}

interface ReloadConfigMessage {
  type: MessageType.ReloadConfig;
}

interface GetVoicesMessage {
  type: MessageType.GetVoices;
}

interface GetVoicesResponse {
  voices: chrome.tts.TtsVoice[];
}

export function sendMessage(message: SpeechMessage): Promise<void>;
export function sendMessage(message: ReloadConfigMessage): Promise<void>;

export function sendMessage(
  message: GetVoicesMessage
): Promise<GetVoicesResponse>;

export function sendMessage(message: any): any {
  return chrome.runtime.sendMessage(message);
}
