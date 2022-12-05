import { MessageType } from './constants';
import { getConfig, defaultConfig } from './lib/config';

let config = defaultConfig;

function loadConfig() {
  getConfig().then((result) => (config = result));
}

loadConfig();

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.type) {
    case MessageType.Speech:
      chrome.tts.speak(message.text, {
        // lang: 'id-ID',
        enqueue: true,
        voiceName: config.voiceName,
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
