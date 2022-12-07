import {
  MessageType,
  LiveEventType,
  LiveEventMessage,
  sendMessage,
} from './lib/message';

observeChat(document.getElementById('[data-e2e="chat-room"'));

function observeChat(container) {
  const observer = new MutationObserver(function (mutationList, observer) {
    mutationList.forEach((record) => {
      record.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          const msg = buildLiveEventMessage(node as HTMLElement);
          msg && sendMessage(msg);
        }
      });
    });
  });
  observer.observe(container, {
    childList: true,
    subtree: true,
  });
}

function buildLiveEventMessage(
  node: HTMLElement
): LiveEventMessage | undefined {
  if (isGenericChat(node)) {
    return;
  } else if (isLikeChat(node)) {
    return {
      type: MessageType.LIVE_EVENT,
      eventType: LiveEventType.LIKE,
      username: getUsername(node),
    };
  } else if (isGiftChat(node)) {
    return {
      type: MessageType.LIVE_EVENT,
      eventType: LiveEventType.GIFT,
      username: getUsername(node),
      gift: getGift(node),
      count: getGiftCount(node),
    };
  } else if (isFollowChat(node)) {
    return {
      type: MessageType.LIVE_EVENT,
      eventType: LiveEventType.FOLLOW,
      username: getUsername(node),
    };
  }
}

function getUsername(node: HTMLElement): string {
  return 'jenny';
}

function getGift(node: HTMLElement): string {
  return 'rose';
}

function getGiftCount(node: HTMLElement): number {
  return 1;
}

function isGenericChat(node: HTMLElement) {
  return node.getAttribute('data-e2e') === 'chat-message';
}

function isLikeChat(node: HTMLElement) {
  return classContains('StyledLikeMessageItem', node);
}

function isGiftChat(node: HTMLElement) {
  return classContains('something', node);
}

function isFollowChat(node: HTMLElement) {
  return node.getAttribute('data-e2e') === 'social-message';
}

function classContains(str: string, node: HTMLElement): boolean {
  return !![...node.classList.values()].find((cls) => cls.includes(str));
}
