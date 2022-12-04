import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { say } from '../lib/speech';
import { MessageType } from '../constants';
import { sendMessage } from '../lib/message';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

const Container = styled.div`
  padding: 8px;
  border: 2px solid red;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const DropdownMenu = styled(Dropdown.Menu)`
  max-height: 600px;
  overflow: hidden auto;
`;

export default function Options() {
  const [voices, setVoices] = useState<chrome.tts.TtsVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState('');

  useEffect(() => {
    sendMessage({ type: MessageType.GetVoices }).then((response) => {
      setVoices(response.voices);
    });
  }, []);

  const sayTest = () => {
    console.log('sayTest');
    say('terima kasih jenny atas hadiah mawarnya!');
  };

  return (
    <Container>
      <Button variant="primary" onClick={sayTest}>
        Say it
      </Button>
      <h2>Voices</h2>
      <Dropdown>
        <Dropdown.Toggle>
          {selectedVoice || '-- Select voice --'}
        </Dropdown.Toggle>
        <DropdownMenu>
          {voices.map((voice) => (
            <Dropdown.Item
              key={voice.voiceName}
              onClick={() => setSelectedVoice(voice.voiceName!)}
            >
              {voice.voiceName}
            </Dropdown.Item>
          ))}
        </DropdownMenu>
      </Dropdown>
    </Container>
  );
}
