chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request?.msg === "speech") {
    chrome.tts.speak(request.text, {
      lang: "id-ID",
      enqueue: true,
      voiceName: "Anna",
    });
  }
});
