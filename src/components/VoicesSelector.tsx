import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { say } from '../lib/speech';
import { Form } from "./Options"
import { useCountries, useVoices } from '../lib/hooks';

type VoicesSelectorProps = {
    voiceNames: string[]
    testVoiceText: string
    onChange: (voiceNames: string[]) => void
}

export const VoiceRow = styled.div`
  display: flex;
  align-items: center;
`;

export const TestButton = styled(Button)``;

export default function VoicesSelector(props: VoicesSelectorProps) {
    const [filteredVoices, setFilteredVoices] = useState<chrome.tts.TtsVoice[]>(
        []
    );
    const [country, setCountry] = useState<string>();
    const [voiceRowState, setVoiceRowState] = useState<
        {
            editMode: boolean;
        }[]
    >(props.voiceNames.map((_v) => ({ editMode: false })));

    const voices = useVoices()

    const countries = useCountries(voices)

    useEffect(() => {
        setVoiceRowState(
            props.voiceNames.map((_voice, i) => ({
                editMode: voiceRowState[i]?.editMode || false,
            }))
        );
    }, [props.voiceNames]);

    useEffect(() => {
        setFilteredVoices(
            country
                ? voices.filter((voice) => voice.lang && voice.lang.endsWith(country))
                : voices
        );
    }, [voices, country]);

    const testVoice = (voiceName?: string) => say(props.testVoiceText, voiceName);

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

    const onChangeVoice = (idx, voiceName) => {
        props.onChange(props.voiceNames.map((val, i) => i == idx ? voiceName : val))
    }

    const onAddVoice = () => {
        props.onChange([...props.voiceNames, filteredVoices[0].voiceName!])
    };

    const onRemoveVoice = (i: number) => () => {
        const voices = props.voiceNames.slice()
        voices.splice(i, 1)
        props.onChange(voices)
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
                        {props.voiceNames.map(renderVoiceRow)}
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
    )
}