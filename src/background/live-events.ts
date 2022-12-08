import { say } from './speech';
import { MessageType } from '../lib/message';
import { LiveEvent, LiveEvents } from '../lib/live-events';

const liveEvents = new LiveEvents();
let liveEvent: LiveEvent;

setInterval(trySay, 250);

async function trySay() {
  if (liveEvent && (await new Promise((r) => chrome.tts.isSpeaking(r)))) return;

  if (liveEvent) {
    liveEvents.liveEvents[0].subtract(liveEvent);
    liveEvent = null;
    if (liveEvents.liveEvents[0].isEmpty()) {
      liveEvents.liveEvents.shift();
    }
  }

  if (!liveEvents.liveEvents.length) return;

  liveEvent = liveEvents.liveEvents[0].clone();
  say(getSayText(liveEvent));
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.type) {
    case MessageType.LIVE_EVENT:
      liveEvents.add(message);
      break;
  }
  return true;
});

function getSayText(e: LiveEvent) {
  if (e.likeCount) {
    if (!e.gifts.isEmpty()) {
      if (e.gifts.totalCoins > 5) {
        return `wah! ${e.username}! terima kasih banget atas suka dan banyak hadiahnya!`;
      }
      return `terima kasih ${e.username} atas suka dan hadiahnya!`;
    }
    if (e.likeCount > 5) {
      return `wah! terima kasih ${e.username} atas sukanya!`;
    }
    return `terima kasih ${e.username} atas sukanya!`;
  } else if (!e.gifts.isEmpty()) {
    return `terima kasih ${e.username} atas hadiahnya!`;
  }
  return 'terima kasih!';
}
