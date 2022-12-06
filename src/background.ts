import { MessageType, SpeechMessage } from './lib/message';
import { getConfig, defaultConfig } from './lib/config';
import { LiveEvent, LiveEvents } from './lib/live-events';

let config = defaultConfig;
const liveEvents = new LiveEvents();
let liveEvent: LiveEvent;

loadConfig();

setInterval(trySay, 250);

async function trySay() {
  if (liveEvent && (await new Promise((r) => chrome.tts.isSpeaking(r)))) return;

  if (liveEvent) {
    liveEvents.liveEvents[0].subtract(liveEvent);
    liveEvent = null;
    if (liveEvents.liveEvents[0].isEmpty()) {
      liveEvents.liveEvents.shift();
    }
  }

  if (!liveEvents.liveEvents.length) return;

  liveEvent = liveEvents.liveEvents[0].clone();
  say(getSayText(liveEvent));
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.type) {
    case MessageType.LIVE_EVENT:
      liveEvents.add(message);
      break;
    case MessageType.SPEECH:
      say(message.text, message.voiceName);
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

function getSayText(e: LiveEvent) {
  if (e.likeCount) {
    if (!e.gifts.isEmpty()) {
      if (e.gifts.totalCoins > 5) {
        return `wah! ${e.username}! terima kasih banget atas suka dan banyak hadiahnya!`;
      }
      return `terima kasih ${e.username} atas suka dan hadiahnya!`;
    }
    if (e.likeCount > 5) {
      return `wah! terima kasih ${e.username} atas sukanya!`;
    }
    return `terima kasih ${e.username} atas sukanya!`;
  } else if (!e.gifts.isEmpty()) {
    return `terima kasih ${e.username} atas hadiahnya!`;
  }
  return 'terima kasih!';
}

function say(text: string, voiceName?: string) {
  const pitch = randomPitch();
  const rate = randomRate();
  chrome.tts.speak(text, {
    enqueue: true,
    voiceName: voiceName || randomVoice(),
    pitch,
    rate,
    volume: config.volume,
  });
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
