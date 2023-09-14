import uniq from 'lodash/uniq';
import sortBy from 'lodash/sortBy';
import sample from 'lodash/sample';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { say } from '../lib/speech';
import { MessageType, LiveEventType, sendMessage } from '../lib/message';
import { getConfig, updateConfig, defaultConfig } from '../lib/config';
import Stack from 'react-bootstrap/Stack';
import BsForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LiveEvents from './LiveEvents';

const Container = styled(Stack)`
  padding: 32px;
`;

export const Form = styled(BsForm)`
  width: 800px;
`;

const VoiceRow = styled.div`
  display: flex;
  align-items: center;
`;

const TestButton = styled(Button)``;

export default function Options() {
  const [config, setConfig] = useState(defaultConfig);
  const [voices, setVoices] = useState<chrome.tts.TtsVoice[]>([]);
  const [filteredVoices, setFilteredVoices] = useState<chrome.tts.TtsVoice[]>(
    []
  );
  const [country, setCountry] = useState<string>();
  const [countries, setCountries] = useState<
    {
      code: string;
      name: string;
    }[]
  >([]);
  const [voiceRowState, setVoiceRowState] = useState<
    {
      editMode: boolean;
    }[]
  >(defaultConfig.voiceNames.map((_v) => ({ editMode: false })));
  const [randomVoiceText, setRandomVoiceText] = useState(
    'Terima kasih Jenny atas hadiah mawarnya!'
  );
  const [sayText, setSayText] = useState('Halo, apa kabar?');

  const countryName = (code): string =>
    new Intl.DisplayNames(['en'], { type: 'region' }).of(code)!;

  useEffect(() => {
    sendMessage({ type: MessageType.GET_VOICES }).then((response) => {
      setVoices(response.voices);
    });
    getConfig().then((result) => setConfig(result));
  }, []);

  useEffect(() => {
    setCountries(
      sortBy(
        uniq(
          voices
            .filter((voice) => voice.lang)
            .map((voice) => voice.lang!.split('-')[1])
        ).map((code) => ({
          code,
          name: countryName(code),
        })),
        (x) => x.name
      )
    );
  }, [voices]);

  useEffect(() => {
    setFilteredVoices(
      country
        ? voices.filter((voice) => voice.lang && voice.lang.endsWith(country))
        : voices
    );
  }, [voices, country]);

  useEffect(() => {
    updateConfig(config).then(() => {
      sendMessage({ type: MessageType.RELOAD_CONFIG });
    });
  }, [config]);

  useEffect(() => {
    setVoiceRowState(
      config.voiceNames.map((_voice, i) => ({
        editMode: voiceRowState[i]?.editMode || false,
      }))
    );
  }, [config.voiceNames]);

  const testVoice = (voiceName?: string) => say(randomVoiceText, voiceName);

  const onTestRandomVoice = (e) => {
    e.preventDefault();
    testVoice();
  };

  const onEditVoice = (i: number) => () => {
    const states = voiceRowState.slice();
    states[i].editMode = true;
    setVoiceRowState(states);
  };

  const onEndEditVoice = (i: number) => () => {
    const states = voiceRowState.slice();
    states[i].editMode = false;
    setVoiceRowState(states);
  };

  const onChangeVoice = (i, voiceName) => {
    const voiceNames = config.voiceNames.slice();
    voiceNames[i] = voiceName;
    setConfig({
      ...config,
      voiceNames,
    });
  };

  const onAddVoice = () => {
    setConfig({
      ...config,
      voiceNames: config.voiceNames.concat(filteredVoices[0].voiceName!),
    });
  };

  const onRemoveVoice = (i: number) => () => {
    const voiceNames = config.voiceNames.slice();
    voiceNames.splice(i, 1);
    setConfig({
      ...config,
      voiceNames,
    });
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

  const renderVoiceRow = (voiceName, i) => (
    <VoiceRow key={i} className="mb-2">
      <Form.Select
        value={voiceName}
        onChange={(e) => onChangeVoice(i, e.target.value)}
        onFocus={onEditVoice(i)}
        onBlur={onEndEditVoice(i)}
      >
        <option></option>
        {(voiceRowState[i]?.editMode ? filteredVoices : voices).map((voice) => (
          <option key={voice.voiceName} value={voice.voiceName}>
            {voice.voiceName} {voice.lang}
          </option>
        ))}
      </Form.Select>
      <TestButton
        type="button"
        variant="outline-primary"
        className="ms-1"
        onClick={() => testVoice(voiceName)}
      >
        Test
      </TestButton>
      <Button
        type="button"
        variant="outline-danger"
        className="ms-1"
        onClick={onRemoveVoice(i)}
      >
        Remove
      </Button>
    </VoiceRow>
  );

  return (
    <Container gap={3} className="align-items-start">
      <LiveEvents />
      <Form>
        <Form.Group controlId="formGroupVoice" className="mb-3">
          <Form.Label>Voices</Form.Label>
          <Stack gap={2} className="align-items-start">
            <Form.Select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option>All Countries</option>
              {countries.map(({ code, name }) => (
                <option key={code} value={code}>
                  {code} - {name}
                </option>
              ))}
            </Form.Select>
            <div>
              {config.voiceNames.map(renderVoiceRow)}
              <Button
                type="button"
                variant="outline-secondary"
                onClick={onAddVoice}
              >
                Add
              </Button>
            </div>
          </Stack>
        </Form.Group>
      </Form>
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
