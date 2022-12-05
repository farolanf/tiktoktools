import invariant from 'invariant';
import {
  MessageType,
  LiveEventType,
  LiveEventMessage,
  SpeechMessage,
} from './lib/message';
import { getConfig, defaultConfig } from './lib/config';

class Gift {
  id: string;
  coins: number = 1;
  count: number = 0;
  totalCoins: number = 0;

  constructor(gift: string) {
    this.id = gift;
    this.coins = giftCoins(gift);
    this.add();
  }

  add() {
    this.count++;
    this.totalCoins += this.coins;
  }
}

class Gifts {
  gifts = new Map<string, Gift>();

  add(id: string) {
    if (this.gifts.has(id)) {
      const gift = this.gifts.get(id)!;
      gift.add();
    } else {
      const gift = new Gift(id);
      this.gifts.set(id, gift);
    }
  }
}

class LiveEvent {
  username: string;
  likeCount: number = 0;
  gifts = new Gifts();

  constructor(msg: LiveEventMessage) {
    this.username = msg.username;
    this.add(msg);
  }

  add(msg: LiveEventMessage) {
    invariant(msg.username === this.username, 'Invalid username');
    if (msg.eventType === LiveEventType.LIKE) {
      this.likeCount++;
    } else if (msg.eventType === LiveEventType.GIFT) {
      this.gifts.add(msg.gift);
    }
  }
}

class LiveEvents {
  liveEvents = new Map<string, LiveEvent>();

  add(msg: LiveEventMessage) {
    if (this.liveEvents.has(msg.username)) {
      const liveEvent = this.liveEvents.get(msg.username)!;
      liveEvent.add(msg);
    } else {
      const liveEvent = new LiveEvent(msg);
      this.liveEvents.set(liveEvent.username, liveEvent);
    }
  }
}

let config = defaultConfig;
const liveEvents = new LiveEvents();

loadConfig();

setInterval(trySay, 200);

function trySay() {}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.type) {
    case MessageType.LIVE_EVENT:
      liveEvents.add(message);
      break;
    case MessageType.SPEECH:
      onSpeech(message);
      break;
    case MessageType.GET_VOICES:
      chrome.tts.getVoices().then((voices) => sendResponse({ voices }));
      break;
    case MessageType.RELOAD_CONFIG:
      loadConfig();
      break;
    default:
      console.error('Unknown message', message);
  }
  return true;
});

function onSpeech(msg: SpeechMessage) {
  const pitch = randomPitch();
  const rate = randomRate();
  chrome.tts.speak(msg.text, {
    enqueue: true,
    voiceName: msg.voiceName || randomVoice(),
    pitch,
    rate,
    volume: config.volume,
  });
}

function giftCoins(gift: string): number {
  switch (gift) {
    default:
      return 1;
  }
}

function randomPitch() {
  return 1 + Math.random() * 0.2;
}

function randomRate() {
  return 1.1 + Math.random() * 0.2;
}

function randomVoice() {
  const i = Math.floor(Math.random() * config.voiceNames.length);
  return config.voiceNames[i];
}

function loadConfig() {
  getConfig().then((result) => (config = result));
}
