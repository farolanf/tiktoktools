import { Gift, Gifts, giftCoins, LiveEvent, LiveEvents } from './live-events';
import {
  MessageType,
  LiveEventType,
  LiveEventBasicMessage,
  LiveEventGiftMessage,
} from './message';

describe('live events', () => {
  describe('Gift', () => {
    test('initial value', () => {
      const id = 'rose';
      const gift = new Gift(id);
      expect(gift.id).toBe(id);
      expect(gift.coins).toBe(giftCoins(id));
      expect(gift.count).toBe(1);
      expect(gift.totalCoins).toBe(gift.coins);
    });
    test('add', () => {
      const id = 'rose';
      const gift = new Gift(id);
      gift.add();
      expect(gift.id).toBe(id);
      expect(gift.coins).toBe(giftCoins(id));
      expect(gift.count).toBe(2);
      expect(gift.totalCoins).toBe(gift.coins * 2);
    });
  });
  describe('Gifts', () => {
    test('add', () => {
      const id = 'rose';
      const gifts = new Gifts();
      gifts.add(id);
      expect(gifts.gifts.size).toBe(1);
      expect(gifts.gifts.has(id)).toBeTruthy();
      gifts.add(id);
      expect(gifts.gifts.size).toBe(1);
      expect(gifts.gifts.has(id)).toBeTruthy();
      expect(gifts.gifts.get(id).count).toBe(2);
    });
  });
  describe('LiveEvent', () => {
    test('like - initial value', () => {
      const msg = likeMessage('jenny');
      const liveEvent = new LiveEvent(msg);
      expect(liveEvent.username).toBe('jenny');
      expect(liveEvent.likeCount).toBe(1);
      expect(liveEvent.gifts.gifts.size).toBe(0);
    });
    test('gift - initial value', () => {
      const msg = giftMessage('jenny', 'rose');
      const liveEvent = new LiveEvent(msg);
      expect(liveEvent.username).toBe('jenny');
      expect(liveEvent.likeCount).toBe(0);
      expect(liveEvent.gifts.gifts.size).toBe(1);
      expect(liveEvent.gifts.gifts.has('rose')).toBeTruthy();
    });
    test('add', () => {
      const likeMsg = likeMessage('jenny');
      const giftMsg = giftMessage('jenny', 'rose');
      const liveEvent = new LiveEvent(likeMsg);
      liveEvent.add(giftMsg);
      expect(liveEvent.username).toBe('jenny');
      expect(liveEvent.likeCount).toBe(1);
      expect(liveEvent.gifts.gifts.size).toBe(1);
      expect(liveEvent.gifts.gifts.has('rose')).toBeTruthy();
    });
    test('add throws', () => {
      const likeMsg = likeMessage('jenny');
      const giftMsg = giftMessage('jan', 'rose');
      const liveEvent = new LiveEvent(likeMsg);
      expect(() => liveEvent.add(giftMsg)).toThrow(
        'Invariant failed: Invalid username'
      );
    });
    test('subtract', () => {
      const jennyLike = likeMessage('jenny');
      const jennyGiftRose = giftMessage('jenny', 'rose');
      const jennyGiftCar = giftMessage('jenny', 'car');
      const liveEvent = new LiveEvent(jennyLike);
      liveEvent.add(jennyGiftRose);
      const clone = liveEvent.clone();
      liveEvent.add(jennyLike);
      liveEvent.add(jennyLike);
      liveEvent.add(jennyGiftRose);
      liveEvent.add(jennyGiftRose);
      liveEvent.add(jennyGiftCar);
      liveEvent.subtract(clone);
      expect(liveEvent.likeCount).toBe(2);
      expect(liveEvent.gifts.gifts.size).toBe(2);
      expect(liveEvent.gifts.gifts.get('rose').count).toBe(2);
      expect(liveEvent.gifts.gifts.get('car').count).toBe(1);
    });
    test('isEmpty returns true', () => {
      const jennyLike = likeMessage('jenny');
      const jennyGiftRose = giftMessage('jenny', 'rose');
      const liveEvent = new LiveEvent(jennyLike);
      liveEvent.add(jennyGiftRose);
      const clone = liveEvent.clone();
      liveEvent.subtract(clone);
      expect(liveEvent.isEmpty()).toBeTruthy();
    });
    test('isEmpty returns false', () => {
      const jennyLike = likeMessage('jenny');
      const jennyGiftRose = giftMessage('jenny', 'rose');
      const liveEvent = new LiveEvent(jennyLike);
      liveEvent.add(jennyGiftRose);
      const clone = liveEvent.clone();
      liveEvent.add(jennyGiftRose);
      liveEvent.subtract(clone);
      expect(liveEvent.isEmpty()).toBeFalsy();
    });
    test('totalCoins', () => {
      const jennyLike = likeMessage('jenny');
      const jennyGiftRose = giftMessage('jenny', 'rose');
      const liveEvent = new LiveEvent(jennyLike);
      liveEvent.add(jennyGiftRose);
      liveEvent.add(jennyGiftRose);
      liveEvent.add(jennyLike);
      liveEvent.add(jennyGiftRose);
      expect(liveEvent.gifts.totalCoins).toBe(3);
    });
  });
  describe('LiveEvents', () => {
    test('add', () => {
      const likeMsg = likeMessage('jenny');
      const giftMsg = giftMessage('jan', 'rose');
      const liveEvents = new LiveEvents();
      liveEvents.add(likeMsg);
      liveEvents.add(giftMsg);
      expect(liveEvents.liveEvents.length).toBe(2);
      expect(liveEvents.find('jenny')).toBeTruthy();
      expect(liveEvents.find('jenny').likeCount).toBe(1);
      expect(liveEvents.find('jenny').gifts.gifts.size).toBe(0);
      expect(liveEvents.find('jan')).toBeTruthy();
      expect(liveEvents.find('jan').likeCount).toBe(0);
      expect(liveEvents.find('jan').gifts.gifts.size).toBe(1);
      expect(liveEvents.find('jan').gifts.gifts.has('rose')).toBeTruthy();
      liveEvents.add(giftMsg);
      expect(liveEvents.liveEvents.length).toBe(2);
      expect(liveEvents.find('jenny')).toBeTruthy();
      expect(liveEvents.find('jenny').likeCount).toBe(1);
      expect(liveEvents.find('jenny').gifts.gifts.size).toBe(0);
      expect(liveEvents.find('jan')).toBeTruthy();
      expect(liveEvents.find('jan').likeCount).toBe(0);
      expect(liveEvents.find('jan').gifts.gifts.size).toBe(1);
      expect(liveEvents.find('jan').gifts.gifts.has('rose')).toBeTruthy();
      expect(liveEvents.find('jan').gifts.gifts.get('rose').count).toBe(2);
    });
    test('add sorted', async () => {
      const msg1 = likeMessage('jenny');
      const msg2 = likeMessage('jan');
      const liveEvents = new LiveEvents();
      liveEvents.add(msg1);
      await new Promise((r) => setTimeout(r, 1));
      liveEvents.add(msg2);
      expect(liveEvents.liveEvents[0].username).toBe(msg1.username);
      expect(liveEvents.liveEvents[1].username).toBe(msg2.username);
    });
  });
});

function likeMessage(username: string): LiveEventBasicMessage {
  return {
    type: MessageType.LIVE_EVENT,
    eventType: LiveEventType.LIKE,
    username,
  };
}

function giftMessage(username: string, gift: string): LiveEventGiftMessage {
  return {
    type: MessageType.LIVE_EVENT,
    eventType: LiveEventType.GIFT,
    username,
    gift,
  };
}
