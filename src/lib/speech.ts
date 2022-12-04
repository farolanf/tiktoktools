export function say(text: string) {
  chrome.runtime.sendMessage({ type: 'speech', text });
}
