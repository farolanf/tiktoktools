import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { say } from '../lib/speech';

const Container = styled.div`
  padding: 8px;
  border: 2px solid red;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Button = styled.button`
  padding: 6px 20px;
  background: gray;
  color: white;
`;

export default function Options() {
  const [voices, setVoices] = useState<chrome.tts.TtsVoice[]>();

  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'getVoices' }).then((response) => {
      setVoices(response.voices);
    });
  }, []);

  const sayTest = () => {
    say('terima kasih jenny atas hadiah mawarnya!');
  };

  return (
    <Container>
      <Button onClick={sayTest}>Say it</Button>
      <h2>Voices</h2>
      {voices?.map((voice) => (
        <div key={voice.voiceName}>Voice: {voice.voiceName}</div>
      ))}
    </Container>
  );
}
