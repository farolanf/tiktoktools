import invariant from 'tiny-invariant';
import { LiveEventType, LiveEventMessage } from './message';

export class Gift {
  id: string;
  coins: number = 1;
  count: number = 0;
  totalCoins: number = 0;

  constructor(gift: string) {
    this.id = gift;
    this.coins = giftCoins(gift);
    this.add();
  }

  add() {
    this.count++;
    this.totalCoins += this.coins;
  }
}

export class Gifts {
  gifts = new Map<string, Gift>();

  add(id: string) {
    if (this.gifts.has(id)) {
      const gift = this.gifts.get(id)!;
      gift.add();
    } else {
      const gift = new Gift(id);
      this.gifts.set(id, gift);
    }
  }
}

export class LiveEvent {
  username: string;
  likeCount: number = 0;
  gifts = new Gifts();

  constructor(msg: LiveEventMessage) {
    this.username = msg.username;
    this.add(msg);
  }

  add(msg: LiveEventMessage) {
    invariant(msg.username === this.username, 'Invalid username');
    if (msg.eventType === LiveEventType.LIKE) {
      this.likeCount++;
    } else if (msg.eventType === LiveEventType.GIFT) {
      this.gifts.add(msg.gift);
    }
  }
}

export class LiveEvents {
  liveEvents = new Map<string, LiveEvent>();

  add(msg: LiveEventMessage) {
    if (this.liveEvents.has(msg.username)) {
      const liveEvent = this.liveEvents.get(msg.username)!;
      liveEvent.add(msg);
    } else {
      const liveEvent = new LiveEvent(msg);
      this.liveEvents.set(liveEvent.username, liveEvent);
    }
  }
}

export function giftCoins(gift: string): number {
  switch (gift) {
    default:
      return 1;
  }
}
