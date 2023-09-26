import { useEffect, useState } from "react"
import Stack from 'react-bootstrap/Stack';
import { Form } from "./Options"
import Button from 'react-bootstrap/Button';
import { isSpeaking, say } from '../lib/speech';
import VoiceSelector from "./VoiceSelector";
import { getConfig, updateConfig, defaultConfig } from '../lib/config';

type AnnouncerProps = {
    testVoiceText: string
}

export default function Announcer(props: AnnouncerProps) {
    const [config, setConfig] = useState(defaultConfig);

    useEffect(() => {
        getConfig().then((result) => setConfig(result));
    }, [])

    const onChangeVoice = voice => {

    }

    return (
        <>
            <VoiceSelector
                voiceName={null}
                testVoiceText={props.testVoiceText}
                onChange={onChangeVoice}
            />
        </>
    )
}