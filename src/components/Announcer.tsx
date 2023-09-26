import { Form } from "./Options"
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import VoiceSelector from "./VoiceSelector";
import { Announcement } from '../lib/config';
import { useConfig } from "../lib/hooks";
import { useEffect, useRef, useState } from "react";
import { isSpeaking } from "../lib/speech";
import { say } from "../background/speech";

type AnnouncerProps = {
    testVoiceText: string
}

type AnnouncementProps = {
    announcement: Announcement
    testVoiceText: string
    onChange: (announcement: Announcement) => void
}

function Announcement(props: AnnouncementProps) {
    const onChange = changes => {
        props.onChange({
            ...props.announcement,
            ...changes,
        })
    }

    const volume = props.announcement.volume ?? 1
    const rate = props.announcement.rate ?? 1
    const pitch = props.announcement.pitch ?? 1

    return (
        <div style={{ paddingLeft: 16 }}>
            <Form.Group>
                <Form.Label>Text</Form.Label>
                <Form.Control
                    type="text"
                    className="mb-2"
                    value={props.announcement.text}
                    onChange={(e) => onChange({ text: e.target.value })}
                />
            </Form.Group>

            <VoiceSelector
                voiceName={props.announcement.voiceName}
                testVoiceText={props.testVoiceText}
                onChange={voiceName => onChange({ voiceName })}
            />

            <Form.Group controlId="formGroupRate">
                <Form.Label>Rate</Form.Label>
                <Stack direction="horizontal">
                    <Form.Range
                        min="100"
                        max="5000"
                        value={Math.floor(rate * 1000)}
                        onChange={(e) =>
                            onChange({ rate: e.target.value / 1000 })
                        }
                        style={{ width: 300 }}
                    />
                    <span className="ms-1">{rate.toFixed(1)}</span>
                </Stack>
            </Form.Group>
            <Form.Group controlId="formGroupPitch">
                <Form.Label>Pitch</Form.Label>
                <Stack direction="horizontal">
                    <Form.Range
                        min="0"
                        max="2000"
                        value={Math.floor(pitch * 1000)}
                        onChange={(e) =>
                            onChange({ pitch: e.target.value / 1000 })
                        }
                        style={{ width: 300 }}
                    />
                    <span className="ms-1">{pitch?.toFixed(1)}</span>
                </Stack>
            </Form.Group>
            <Form.Group controlId="formGroupVolume">
                <Form.Label>Volume</Form.Label>
                <Stack direction="horizontal">
                    <Form.Range
                        min="0"
                        max="1000"
                        value={Math.floor(volume * 1000)}
                        onChange={(e) =>
                            onChange({ volume: e.target.value / 1000 })
                        }
                        style={{ width: 300 }}
                    />
                    <span className="ms-1">{Math.floor(volume * 100)}</span>
                </Stack>
            </Form.Group>
        </div>
    )
}

export default function Announcer(props: AnnouncerProps) {
    const [running, setRunning] = useState(false)
    const [config, setConfig] = useConfig()

    const currentRef = useRef({ timer: null, config })

    currentRef.current.config = config

    useEffect(() => {
        if (!running) return

        async function run() {
            const { config } = currentRef.current

            if (!await isSpeaking()) {
                const i = Math.floor(Math.random() * config.announcements.length)
                const ann = config.announcements[i]
                say(ann.text, ann.voiceName, {
                    volume: ann.volume,
                    rate: ann.rate,
                    pitch: ann.pitch,
                })
            }

            currentRef.current.timer = setTimeout(run, 200)
        }

        run()

        return () => {
            clearTimeout(currentRef.current.timer)
        }
    }, [running])

    const onAdd = () => {
        setConfig({
            ...config,
            announcements: [
                ...config.announcements,
                {
                    text: '',
                }
            ]
        })
    }

    const onChange = idx => (announcement) => {
        setConfig({
            ...config,
            announcements: config.announcements.map((val, i) => i == idx ? announcement : val)
        })
    }

    return (
        <>
            <label style={{ fontWeight: 'bold' }}>Announcements</label>
            <Button
                type="button"
                variant={running ? 'danger' : 'primary'}
                onClick={() => setRunning(!running)}
            >
                {running ? 'Stop' : 'Run'}
            </Button>
            {config.announcements.map((announcement, i) => (
                <div
                    key={i}
                >
                    <label>#{i + 1}</label>
                    <Announcement
                        announcement={announcement}
                        testVoiceText={props.testVoiceText}
                        onChange={onChange(i)}
                    />
                </div>
            ))}
            <Button
                type="button"
                variant="secondary"
                onClick={onAdd}
            >
                Add
            </Button>
        </>
    )
}