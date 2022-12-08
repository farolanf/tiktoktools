import { loadConfig } from './background/config';
import { MessageType } from './lib/message';
import './background/speech';
import './background/live-events';

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.type) {
    case MessageType.RELOAD_CONFIG:
      loadConfig();
      break;
    case MessageType.ACTIVATE:
      onActivate();
      break;
  }
  return true;
});

async function onActivate() {
  const tab = await getCurrentTab();

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['src/content.js'],
  });

  chrome.action.setBadgeText({ text: 'ON', tabId: tab.id });
  chrome.action.setBadgeBackgroundColor({ color: 'green', tabId: tab.id });
}

async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  return tab;
}
