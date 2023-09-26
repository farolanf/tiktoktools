import sample from 'lodash/sample';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { say } from '../lib/speech';
import { MessageType, LiveEventType, sendMessage } from '../lib/message';
import Stack from 'react-bootstrap/Stack';
import BsForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LiveEvents from './LiveEvents';
import Announcer from './Announcer';
import { useConfig, useCountries, useVoices } from '../lib/hooks';
import VoicesSelector from './VoicesSelector';

const Container = styled(Stack)`
  padding: 32px;
`;

export const Form = styled(BsForm)`
  width: 800px;
`;

export default function Options() {
  const [config, setConfig] = useConfig()

  const voices = useVoices()

  const [randomVoiceText, setRandomVoiceText] = useState(
    'Terima kasih Jenny atas hadiah mawarnya!'
  );

  const [sayText, setSayText] = useState('Halo, apa kabar?');

  const testVoice = (voiceName?: string) => say(randomVoiceText, voiceName);

  const onTestRandomVoice = (e) => {
    e.preventDefault();
    testVoice();
  };

  const onUpdateSayVoiceName = (sayVoiceName) => {
    setConfig({
      ...config,
      sayVoiceName,
    });
  };

  const onSayIt = (e) => {
    e.preventDefault();
    const voiceName = config.sayVoiceName || sample(voices)?.voiceName;
    say(sayText, voiceName);
  };

  const onAddLike = () => {
    sendMessage({
      type: MessageType.LIVE_EVENT,
      eventType: LiveEventType.LIKE,
      username: 'jenny',
    });
  };

  const onAddRose = () => {
    sendMessage({
      type: MessageType.LIVE_EVENT,
      eventType: LiveEventType.GIFT,
      username: 'jenny',
      gift: 'rose',
    });
  };

  const onChangeVoices = voiceNames => {
    setConfig({
      ...config,
      voiceNames,
    })
  }

  return (
    <Container gap={3} className="align-items-start">
      <LiveEvents />
      <Announcer />
      <VoicesSelector
        voiceNames={config.voiceNames}
        testVoiceText={randomVoiceText}
        onChange={onChangeVoices}
      />
      <Form onSubmit={onTestRandomVoice}>
        <Form.Group controlId="formGroupVoiceTest" className="mb-3">
          <Form.Label>Test Voices</Form.Label>
          <Form.Control
            type="text"
            className="mb-2"
            value={randomVoiceText}
            onChange={(e) => setRandomVoiceText(e.target.value)}
            onFocus={(e) => {
              e.target.setSelectionRange(0, e.target.value.length);
            }}
          />
          <Stack gap={2} className="align-items-start">
            <Button type="submit" variant="primary">
              Test Ramdom Voice
            </Button>
          </Stack>
        </Form.Group>
      </Form>
      <Form onSubmit={onSayIt}>
        <Form.Group controlId="formGroupSayText" className="mb-3">
          <Form.Label>Say Text</Form.Label>
          <Form.Select
            value={config.sayVoiceName}
            className="mb-2"
            onChange={(e) => onUpdateSayVoiceName(e.target.value)}
          >
            <option>Random Voice</option>
            {voices.map((voice) => (
              <option key={voice.voiceName} value={voice.voiceName}>
                {voice.voiceName} {voice.lang}
              </option>
            ))}
          </Form.Select>
          <Form.Control
            type="text"
            className="mb-2"
            value={sayText}
            onChange={(e) => setSayText(e.target.value)}
            onFocus={(e) => {
              e.target.setSelectionRange(0, e.target.value.length);
            }}
          />
          <Stack gap={2} className="align-items-start">
            <Button type="submit" variant="primary">
              Say It
            </Button>
          </Stack>
        </Form.Group>
      </Form>
      <Form.Group controlId="formGroupRate">
        <Form.Label>Rate</Form.Label>
        <Stack direction="horizontal">
          <Form.Range
            min="100"
            max="5000"
            value={Math.floor(config.rate * 1000)}
            onChange={(e) =>
              setConfig({ ...config, rate: e.target.value / 1000 })
            }
            style={{ width: 300 }}
          />
          <span className="ms-1">{config.rate.toFixed(1)}</span>
        </Stack>
      </Form.Group>
      <Form.Group controlId="formGroupPitch">
        <Form.Label>Pitch</Form.Label>
        <Stack direction="horizontal">
          <Form.Range
            min="0"
            max="2000"
            value={Math.floor(config.pitch * 1000)}
            onChange={(e) =>
              setConfig({ ...config, pitch: e.target.value / 1000 })
            }
            style={{ width: 300 }}
          />
          <span className="ms-1">{config.pitch.toFixed(1)}</span>
        </Stack>
      </Form.Group>
      <Form.Group controlId="formGroupVolume">
        <Form.Label>Volume</Form.Label>
        <Stack direction="horizontal">
          <Form.Range
            min="0"
            max="1000"
            value={Math.floor(config.volume * 1000)}
            onChange={(e) =>
              setConfig({ ...config, volume: e.target.value / 1000 })
            }
            style={{ width: 300 }}
          />
          <span className="ms-1">{Math.floor(config.volume * 100)}</span>
        </Stack>
      </Form.Group>
      <Form.Group controlId="formGroupLiveEventTest">
        <Form.Label>Live Event Test</Form.Label>
        <Stack gap={2}>
          <Button type="button" variant="outline-secondary" onClick={onAddLike}>
            Add Like
          </Button>
          <Button type="button" variant="outline-secondary" onClick={onAddRose}>
            Add Rose
          </Button>
        </Stack>
      </Form.Group>
    </Container>
  );
}
