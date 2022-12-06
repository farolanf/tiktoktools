import invariant from 'tiny-invariant';
import sortBy from 'lodash/sortBy';
import cloneDeep from 'lodash/cloneDeep';
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

  subtract(other: Gift) {
    invariant(this.id === other.id, 'Invalid id');
    this.count -= other.count;
    this.totalCoins -= other.totalCoins;
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

  subtract(other: Gifts) {
    this.gifts.forEach((gift) => {
      if (!other.gifts.has(gift.id)) return;
      const otherGift = other.gifts.get(gift.id);
      gift.subtract(otherGift);
    });
  }
}

export class LiveEvent {
  username: string;
  likeCount: number = 0;
  gifts = new Gifts();
  timestamp: number = Date.now();

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

  subtract(other: LiveEvent) {
    invariant(other.username === this.username, 'Invalid username');
    this.likeCount -= other.likeCount;
    this.gifts.subtract(other.gifts);
  }

  clone() {
    return cloneDeep(this);
  }
}

export class LiveEvents {
  liveEvents: LiveEvent[] = [];

  add(msg: LiveEventMessage) {
    let liveEvent = this.find(msg.username);
    if (liveEvent) {
      liveEvent.add(msg);
    } else {
      liveEvent = new LiveEvent(msg);
      this.liveEvents.push(liveEvent);
      this.liveEvents = sortBy(
        this.liveEvents,
        (liveEvent) => liveEvent.timestamp
      );
    }
  }

  find(username: string) {
    return this.liveEvents.find((liveEvent) => liveEvent.username === username);
  }
}

export function giftCoins(gift: string): number {
  switch (gift) {
    default:
      return 1;
  }
}
