// function observeChat(container) {
//   const observer = new MutationObserver(function (mutationList, observer) {});
//   observer.observe(container);
// }

// observeChat(document.getElementById('some-chat-container'));

// chrome.runtime.onMessage.addListener(function (message) {
//   if (!message?.type) return;
//   switch (message.type) {
//     case 'voices':
//       console.log('voices', message.voices);
//       break;
//   }
// });

// window.addEventListener('load', () => {
//   chrome.runtime.sendMessage({ type: 'getVoices' });
// });
