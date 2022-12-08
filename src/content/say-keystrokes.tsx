import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import debounce from 'lodash/debounce';
import styled from 'styled-components';
import { MessageType, sendMessage } from '../lib/message';

const rootEl = document.createElement('div');
rootEl.id = 'ttt-root';
rootEl.style.zIndex = '10000';
document.body.append(rootEl);

const root = createRoot(document.getElementById('ttt-root'));
root.render(<App />);

const Container = styled.div`
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  color: black;
  background-color: white;
  padding: 2px 5px;
  font-size: 14px;
`;

function App() {
  const [text, setText] = useState('');
  const currentRef = useRef<{ text: string; setText: (text: string) => void }>({
    text,
    setText,
  });

  currentRef.current = {
    text,
    setText,
  };

  const say = useCallback(
    debounce(() => {
      const { text, setText } = currentRef.current;
      // sendMessage({ type: MessageType.SPEECH, text });
      setText('');
    }, 250),
    []
  );

  useEffect(() => {
    const handler = (e) => {
      if (/^[A-Z]/.test(e.key)) return;
      setText(text + e.key);
      say();
    };
    window.addEventListener('keyup', handler);
    return () => window.removeEventListener('keyup', handler);
  });

  return (
    <Container>
      <span>{text}</span>
    </Container>
  );
}
