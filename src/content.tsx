import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

const rootEl = document.createElement('div');
rootEl.id = 'tiktoktools-root';
rootEl.style.position = 'fixed';
rootEl.style.top = '0';
rootEl.style.left = '0';
rootEl.style.zIndex = '10000';
document.body.append(rootEl);

const root = createRoot(rootEl);
root.render(<App />);

chrome.runtime.onMessage.addListener(function (message) {
  if (!message?.type) return;
  switch (message.type) {
    case 'voices':
      console.log('voices', message.voices);
      break;
  }
});

window.addEventListener('load', () => {
  console.log('tiktoktools onload');
  // chrome.runtime.sendMessage({ type: 'getVoices' });
});
