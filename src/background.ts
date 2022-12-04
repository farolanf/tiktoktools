import { MessageType } from './constants';

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (!message?.type) return;
  switch (message.type) {
    case MessageType.Speech:
      chrome.tts.speak(message.text, {
        lang: 'id-ID',
        enqueue: true,
      });
      break;
    case MessageType.GetVoices:
      chrome.tts.getVoices().then((voices) => {
        sendResponse({ voices });
      });
      break;
    default:
      console.error('Unknown message', message);
  }
  return true;
});
