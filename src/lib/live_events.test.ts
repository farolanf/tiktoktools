import { Gift, Gifts, giftCoins, LiveEvent, LiveEvents } from './live-events';
import {
  MessageType,
  LiveEventType,
  LiveEventLikeMessage,
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
      const msg: LiveEventLikeMessage = {
        type: MessageType.LIVE_EVENT,
        eventType: LiveEventType.LIKE,
        username: 'jenny',
      };
      const liveEvent = new LiveEvent(msg);
      expect(liveEvent.username).toBe('jenny');
      expect(liveEvent.likeCount).toBe(1);
      expect(liveEvent.gifts.gifts.size).toBe(0);
    });
    test('gift - initial value', () => {
      const msg: LiveEventGiftMessage = {
        type: MessageType.LIVE_EVENT,
        eventType: LiveEventType.GIFT,
        username: 'jenny',
        gift: 'rose',
      };
      const liveEvent = new LiveEvent(msg);
      expect(liveEvent.username).toBe('jenny');
      expect(liveEvent.likeCount).toBe(0);
      expect(liveEvent.gifts.gifts.size).toBe(1);
      expect(liveEvent.gifts.gifts.has('rose')).toBeTruthy();
    });
    test('add', () => {
      const likeMsg: LiveEventLikeMessage = {
        type: MessageType.LIVE_EVENT,
        eventType: LiveEventType.LIKE,
        username: 'jenny',
      };
      const giftMsg: LiveEventGiftMessage = {
        type: MessageType.LIVE_EVENT,
        eventType: LiveEventType.GIFT,
        username: 'jenny',
        gift: 'rose',
      };
      const liveEvent = new LiveEvent(likeMsg);
      liveEvent.add(giftMsg);
      expect(liveEvent.username).toBe('jenny');
      expect(liveEvent.likeCount).toBe(1);
      expect(liveEvent.gifts.gifts.size).toBe(1);
      expect(liveEvent.gifts.gifts.has('rose')).toBeTruthy();
    });
    test('add throws', () => {
      const likeMsg: LiveEventLikeMessage = {
        type: MessageType.LIVE_EVENT,
        eventType: LiveEventType.LIKE,
        username: 'jenny',
      };
      const giftMsg: LiveEventGiftMessage = {
        type: MessageType.LIVE_EVENT,
        eventType: LiveEventType.GIFT,
        username: 'jan',
        gift: 'rose',
      };
      const liveEvent = new LiveEvent(likeMsg);
      expect(() => liveEvent.add(giftMsg)).toThrow(
        'Invariant failed: Invalid username'
      );
    });
  });
  describe('LiveEvents', () => {
    test('add', () => {
      const likeMsg: LiveEventLikeMessage = {
        type: MessageType.LIVE_EVENT,
        eventType: LiveEventType.LIKE,
        username: 'jenny',
      };
      const giftMsg: LiveEventGiftMessage = {
        type: MessageType.LIVE_EVENT,
        eventType: LiveEventType.GIFT,
        username: 'jan',
        gift: 'rose',
      };
      const liveEvents = new LiveEvents();
      liveEvents.add(likeMsg);
      liveEvents.add(giftMsg);
      expect(liveEvents.liveEvents.size).toBe(2);
      expect(liveEvents.liveEvents.has('jenny')).toBeTruthy();
      expect(liveEvents.liveEvents.get('jenny').likeCount).toBe(1);
      expect(liveEvents.liveEvents.get('jenny').gifts.gifts.size).toBe(0);
      expect(liveEvents.liveEvents.has('jan')).toBeTruthy();
      expect(liveEvents.liveEvents.get('jan').likeCount).toBe(0);
      expect(liveEvents.liveEvents.get('jan').gifts.gifts.size).toBe(1);
      expect(
        liveEvents.liveEvents.get('jan').gifts.gifts.has('rose')
      ).toBeTruthy();
      liveEvents.add(giftMsg);
      expect(liveEvents.liveEvents.size).toBe(2);
      expect(liveEvents.liveEvents.has('jenny')).toBeTruthy();
      expect(liveEvents.liveEvents.get('jenny').likeCount).toBe(1);
      expect(liveEvents.liveEvents.get('jenny').gifts.gifts.size).toBe(0);
      expect(liveEvents.liveEvents.has('jan')).toBeTruthy();
      expect(liveEvents.liveEvents.get('jan').likeCount).toBe(0);
      expect(liveEvents.liveEvents.get('jan').gifts.gifts.size).toBe(1);
      expect(
        liveEvents.liveEvents.get('jan').gifts.gifts.has('rose')
      ).toBeTruthy();
      expect(
        liveEvents.liveEvents.get('jan').gifts.gifts.get('rose').count
      ).toBe(2);
    });
  });
});
