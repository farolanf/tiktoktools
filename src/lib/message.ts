export enum MessageType {
  ACTIVATE,
  SPEECH,
  GET_VOICES,
  RELOAD_CONFIG,
  LIVE_EVENT,
}

export enum LiveEventType {
  LIKE,
  GIFT,
  FOLLOW,
}

export interface LiveEventBasicMessage {
  type: MessageType.LIVE_EVENT;
  eventType: LiveEventType;
  username: string;
}

export interface LiveEventGiftMessage {
  type: MessageType.LIVE_EVENT;
  eventType: LiveEventType.GIFT;
  username: string;
  gift: string;
  count?: number;
}

export type LiveEventMessage = {
  type: MessageType.LIVE_EVENT;
  eventType: LiveEventType;
  username: string;
  gift?: string;
  count?: number;
};

export interface SpeechMessage {
  type: MessageType.SPEECH;
  text: string;
  voiceName?: string;
}

interface ReloadConfigMessage {
  type: MessageType.RELOAD_CONFIG;
}

interface ActivateMessage {
  type: MessageType.ACTIVATE;
}

interface GetVoicesMessage {
  type: MessageType.GET_VOICES;
}

interface GetVoicesResponse {
  voices: chrome.tts.TtsVoice[];
}

export function sendMessage(message: LiveEventGiftMessage): Promise<void>;
export function sendMessage(message: LiveEventBasicMessage): Promise<void>;
export function sendMessage(message: LiveEventMessage): Promise<void>;
export function sendMessage(message: SpeechMessage): Promise<void>;
export function sendMessage(message: ReloadConfigMessage): Promise<void>;
export function sendMessage(message: ActivateMessage): Promise<void>;

export function sendMessage(
  message: GetVoicesMessage
): Promise<GetVoicesResponse>;

export function sendMessage(message: any): any {
  return chrome.runtime.sendMessage(message);
}
