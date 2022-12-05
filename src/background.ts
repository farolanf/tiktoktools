import { MessageType } from './constants';
import { getConfig, defaultConfig } from './lib/config';

let config = defaultConfig;

loadConfig();

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.type) {
    case MessageType.Speech:
      const pitch = randomPitch();
      const rate = randomRate();
      console.log('spech', { pitch, rate });
      chrome.tts.speak(message.text, {
        // lang: 'id-ID',
        enqueue: true,
        voiceName: message.voiceName || randomVoice(),
        pitch,
        rate,
      });
      break;
    case MessageType.GetVoices:
      chrome.tts.getVoices().then((voices) => sendResponse({ voices }));
      break;
    case MessageType.ReloadConfig:
      loadConfig();
      break;
    default:
      console.error('Unknown message', message);
  }
  return true;
});

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
