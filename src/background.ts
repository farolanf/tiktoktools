import { MessageType, SpeechMessage } from './lib/message';
import { getConfig, defaultConfig } from './lib/config';
import { LiveEvents } from './lib/live-events';

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
