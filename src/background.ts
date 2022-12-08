import { loadConfig } from './background/config';
import { MessageType } from './lib/message';

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.type) {
    case MessageType.RELOAD_CONFIG:
      loadConfig();
      break;
  }
  return true;
});
