import { MessageType, sendMessage } from './lib/message';
import './content/say-keystrokes';

sendMessage({ type: MessageType.ACTIVATE });
