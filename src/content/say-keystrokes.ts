import debounce from 'lodash/debounce';
import { MessageType, sendMessage } from '../lib/message';

let keystrokes = '';

const say = debounce(() => {
  sendMessage({ type: MessageType.SPEECH, text: keystrokes });
  keystrokes = '';
}, 250);

window.addEventListener('keyup', (e) => {
  keystrokes += e.key;
  say();
});
