import { createRoot } from 'react-dom/client';
import { MessageType, sendMessage } from './lib/message';
import Popup from './components/Popup';

// sendMessage({ type: MessageType.ACTIVATE });

const root = createRoot(document.getElementById('root')!);
root.render(<Popup />);
