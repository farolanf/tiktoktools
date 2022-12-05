import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { say } from '../lib/speech';
import { MessageType } from '../constants';
import { sendMessage } from '../lib/message';
import { getConfig, updateConfig, defaultConfig } from '../lib/config';
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
  const [config, setConfig] = useState(defaultConfig);
  const [voices, setVoices] = useState<chrome.tts.TtsVoice[]>([]);

  useEffect(() => {
    sendMessage({ type: MessageType.GetVoices }).then((response) => {
      setVoices(response.voices);
    });
    getConfig().then((result) => setConfig(result));
  }, []);

  useEffect(() => {
    updateConfig(config).then(() => {
      sendMessage({ type: MessageType.ReloadConfig });
    });
  }, [config]);

  const sayTest = () => {
    say('terima kasih jenny atas hadiah mawarnya!');
  };

  const onClickVoice = (voice) => async () => {
    setConfig({ ...config, voiceName: voice.voiceName });
  };

  return (
    <Container>
      <Button variant="primary" onClick={sayTest}>
        Say it
      </Button>
      <h2>Voices</h2>
      <Dropdown>
        <Dropdown.Toggle>{config.voiceName}</Dropdown.Toggle>
        <DropdownMenu>
          {voices.map((voice) => (
            <Dropdown.Item
              key={voice.voiceName}
              active={voice.voiceName === config.voiceName}
              onClick={onClickVoice(voice)}
            >
              {voice.voiceName}
            </Dropdown.Item>
          ))}
        </DropdownMenu>
      </Dropdown>
    </Container>
  );
}
