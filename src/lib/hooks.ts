import uniq from 'lodash/uniq';
import sortBy from 'lodash/sortBy';
import { useState, useEffect } from 'react';
import { MessageType, sendMessage } from '../lib/message';
import { getConfig, updateConfig, defaultConfig, Config } from '../lib/config';

type AddListenerCallback = Parameters<
  typeof chrome.runtime.onMessage.addListener
>[0];

export function useChromeOnMessage(callback: AddListenerCallback) {
  useEffect(() => {
    chrome.runtime.onMessage.addListener(callback);
    return () => chrome.runtime.onMessage.removeListener(callback);
  }, []);
}

export function useConfig(): [Config, React.Dispatch<React.SetStateAction<Config>>] {
  const [config, setConfig] = useState(defaultConfig);

  useEffect(() => {
    getConfig().then((result) => setConfig(result));
  }, []);

  useEffect(() => {
    updateConfig(config).then(() => {
      sendMessage({ type: MessageType.RELOAD_CONFIG });
    });
  }, [config]);

  return [config, setConfig]
}

export function useVoices() {
  const [voices, setVoices] = useState<chrome.tts.TtsVoice[]>([]);

  useEffect(() => {
    sendMessage({ type: MessageType.GET_VOICES }).then((response) => {
      setVoices(response.voices);
    });
  }, []);

  return voices;
}

export function useCountries(voices: chrome.tts.TtsVoice[]) {
  const [countries, setCountries] = useState<
    {
      code: string;
      name: string;
    }[]
  >([]);

  const countryName = (code): string =>
    new Intl.DisplayNames(['en'], { type: 'region' }).of(code)!;

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

  return countries;
}