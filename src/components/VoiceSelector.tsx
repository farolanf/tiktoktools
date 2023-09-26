import React, { useState, useEffect } from 'react';
import Stack from 'react-bootstrap/Stack';
import { VoiceRow, TestButton } from './VoicesSelector';
import { say } from '../lib/speech';
import { Form } from "./Options"
import { useCountries, useVoices } from '../lib/hooks';

type VoiceSelectorProps = {
    voiceName: string
    volume?: number
    rate?: number
    pitch?: number
    testVoiceText: string
    onChange: (voiceName: string) => void
}

export default function VoiceSelector(props: VoiceSelectorProps) {
    const [filteredVoices, setFilteredVoices] = useState<chrome.tts.TtsVoice[]>(
        []
    );
    const [country, setCountry] = useState<string>();
    const [voiceRowState, setVoiceRowState] = useState<
        {
            editMode: boolean;
        }[]
    >([{ editMode: false }]);

    const voices = useVoices()

    const countries = useCountries(voices)

    useEffect(() => {
        setFilteredVoices(
            country
                ? voices.filter((voice) => voice.lang && voice.lang.endsWith(country))
                : voices
        );
    }, [voices, country]);

    const testVoice = (voiceName?: string) => say(props.testVoiceText, voiceName, {
        volume: props.volume,
        rate: props.rate,
        pitch: props.pitch,
    });

    const onEditVoice = () => {
        const states = voiceRowState.slice();
        states[0].editMode = true;
        setVoiceRowState(states);
    };

    const onEndEditVoice = () => {
        const states = voiceRowState.slice();
        states[0].editMode = false;
        setVoiceRowState(states);
    };

    const onChangeVoice = (voiceName) => {
        props.onChange(voiceName)
    }

    const renderVoiceRow = (voiceName, i) => (
        <VoiceRow key={i} className="mb-2">
            <Form.Select
                value={voiceName}
                onChange={(e) => onChangeVoice(e.target.value)}
                onFocus={onEditVoice}
                onBlur={onEndEditVoice}
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
        </VoiceRow>
    );

    return (
        <Form>
            <Form.Group controlId="formGroupVoice" className="mb-3">
                <Form.Label>Voice</Form.Label>
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
                        {renderVoiceRow(props.voiceName, 0)}
                    </div>
                </Stack>
            </Form.Group>
        </Form>
    )
}