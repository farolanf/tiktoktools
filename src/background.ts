chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (!message?.type) return;
  switch (message.type) {
    case 'speech':
      chrome.tts.speak(message.text, {
        lang: 'id-ID',
        enqueue: true,
      });
      break;
    case 'getVoices':
      chrome.tts.getVoices(function (voices) {
        sendResponse({ type: 'voices', voices });
      });
      break;
    default:
      console.error('Unknown message', message);
  }
});
