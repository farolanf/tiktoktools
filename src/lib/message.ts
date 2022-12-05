export enum MessageType {
  SPEECH,
  GET_VOICES,
  RELOAD_CONFIG,
  LIVE_EVENT,
}

export enum LiveEventType {
  LIKE,
  GIFT,
}

export interface LiveEventLikeMessage {
  type: MessageType.LIVE_EVENT;
  eventType: LiveEventType.LIKE;
  username: string;
}

export interface LiveEventGiftMessage {
  type: MessageType.LIVE_EVENT;
  eventType: LiveEventType.GIFT;
  username: string;
  gift: string;
}

export type LiveEventMessage = LiveEventLikeMessage | LiveEventGiftMessage;

export interface SpeechMessage {
  type: MessageType.SPEECH;
  text: string;
  voiceName?: string;
}

interface ReloadConfigMessage {
  type: MessageType.RELOAD_CONFIG;
}

interface GetVoicesMessage {
  type: MessageType.GET_VOICES;
}

interface GetVoicesResponse {
  voices: chrome.tts.TtsVoice[];
}

export function sendMessage(message: LiveEventLikeMessage): Promise<void>;
export function sendMessage(message: LiveEventGiftMessage): Promise<void>;
export function sendMessage(message: SpeechMessage): Promise<void>;
export function sendMessage(message: ReloadConfigMessage): Promise<void>;

export function sendMessage(
  message: GetVoicesMessage
): Promise<GetVoicesResponse>;

export function sendMessage(message: any): any {
  return chrome.runtime.sendMessage(message);
}
