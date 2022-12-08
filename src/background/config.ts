import { getConfig, defaultConfig } from '../lib/config';
import { MessageType } from '../lib/message';

const config = defaultConfig;

export function loadConfig() {
  return getConfig().then((result) => Object.assign(config, result));
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.type) {
    case MessageType.RELOAD_CONFIG:
      loadConfig();
      break;
  }
  return true;
});

export default config;
