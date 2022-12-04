import { useEffect } from 'react';

type AddListenerCallback = Parameters<
  typeof chrome.runtime.onMessage.addListener
>[0];

export function useChromeOnMessage(callback: AddListenerCallback) {
  useEffect(() => {
    chrome.runtime.onMessage.addListener(callback);
    return () => chrome.runtime.onMessage.removeListener(callback);
  }, []);
}
