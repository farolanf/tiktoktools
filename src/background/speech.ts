import config from './config';
import { MessageType } from '../lib/message';

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.type) {
    case MessageType.SPEECH:
      say(message.text, message.voiceName, {
        volume: message.volume,
        rate: message.rate,
        pitch: message.pitch,
      });
      break;
    case MessageType.GET_VOICES:
      chrome.tts.getVoices()
        .then((voices) => {
          const uniq: chrome.tts.TtsVoice[] = []
          voices.forEach(v => !uniq.some(u => u.voiceName == v.voiceName) && uniq.push(v))
          return uniq
        })
        .then((voices) => sendResponse({ voices }));
      break;
  }
  return true;
});

export function say(text: string, voiceName?: string, options?: { volume?: number, rate?: number, pitch?: number }) {
  const pitch = randomPitch();
  const rate = randomRate();
  chrome.tts.speak(text, {
    enqueue: true,
    voiceName: voiceName || randomVoice(),
    pitch: options?.pitch ?? pitch,
    rate: options?.rate ?? rate,
    volume: options?.volume ?? config.volume,
  });
}

function randomPitch() {
  return Math.min(config.pitch + Math.random() * 0.2, 2.0);
}

function randomRate() {
  return Math.min(config.rate + Math.random() * 0.2, 5.0);
}

function randomVoice() {
  const i = Math.floor(Math.random() * config.voiceNames.length);
  return config.voiceNames[i];
}
