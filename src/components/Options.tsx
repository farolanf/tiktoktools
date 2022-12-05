import uniq from 'lodash/uniq';
import sortBy from 'lodash/sortBy';
import sample from 'lodash/sample';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { say } from '../lib/speech';
import { MessageType } from '../constants';
import { sendMessage } from '../lib/message';
import { getConfig, updateConfig, defaultConfig } from '../lib/config';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Container = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: start;
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
  const [sayVoiceName, setSayVoiceName] = useState<string>();
  const [sayText, setSayText] = useState('Halo, apa kabar?');

  const countryName = (code): string =>
    new Intl.DisplayNames(['en'], { type: 'region' }).of(code)!;

  useEffect(() => {
    sendMessage({ type: MessageType.GetVoices }).then((response) => {
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
      sendMessage({ type: MessageType.ReloadConfig });
    });
  }, [config]);

  useEffect(() => {
    setVoiceRowState(
      config.voiceNames.map((_voice, i) => ({
        editMode: voiceRowState[i]?.editMode || false,
      }))
    );
  }, [config.voiceNames]);

  const onTestVoice = (voiceName?: string) => () => {
    say('terima kasih jenny atas hadiah mawarnya!', voiceName);
  };

  const onSayText = (text: string, voiceName?: string) => () => {
    say(text, voiceName || sample(voices)?.voiceName);
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
    console.log('set voice', voiceName);
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
        onClick={onTestVoice(voiceName)}
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
    <Container>
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
        <Form.Group controlId="formGroupVoiceTest" className="mb-3">
          <Form.Label>Test Voices</Form.Label>
          <Stack gap={2} className="align-items-start">
            <Button type="button" variant="primary" onClick={onTestVoice()}>
              Test Ramdom Voice
            </Button>
          </Stack>
        </Form.Group>
        <Form.Group controlId="formGroupSayText" className="mb-3">
          <Form.Label>Say Text</Form.Label>
          <Form.Control
            type="text"
            className="mb-2"
            value={sayText}
            onChange={(e) => setSayText(e.target.value)}
          />
          <Form.Select
            value={sayVoiceName}
            className="mb-2"
            onChange={(e) => setSayVoiceName(e.target.value)}
          >
            <option>Random Voice</option>
            {voices.map((voice) => (
              <option key={voice.voiceName} value={voice.voiceName}>
                {voice.voiceName} {voice.lang}
              </option>
            ))}
          </Form.Select>
          <Stack gap={2} className="align-items-start">
            <Button
              type="button"
              variant="primary"
              onClick={onSayText(sayText, sayVoiceName)}
            >
              Say It
            </Button>
          </Stack>
        </Form.Group>
      </Form>
    </Container>
  );
}
