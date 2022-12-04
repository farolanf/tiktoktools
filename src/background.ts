chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message?.type) {
    case 'speech':
      chrome.tts.speak(message.text, {
        lang: 'id-ID',
        enqueue: true,
      });
      break;
    case 'getVoices':
      chrome.tts.getVoices().then((voices) => {
        sendResponse({ voices });
      });
      break;
    default:
      console.error('Unknown message', message);
  }
  return true;
});
