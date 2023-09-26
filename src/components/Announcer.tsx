import shuffle from "lodash/shuffle";
import { Form } from "./Options"
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import VoiceSelector from "./VoiceSelector";
import { Announcement } from '../lib/config';
import { useConfig } from "../lib/hooks";
import { useEffect, useRef, useState } from "react";
import { isSpeaking } from "../lib/speech";
import { say } from "../background/speech";

type AnnouncementProps = {
    announcement: Announcement
    onChange: (announcement: Announcement) => void
    onDelete: () => void
    onCopy: () => void
    onPaste: () => void
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
            <Form.Check
                type="checkbox"
                label="Active"
                id={`active-${props.announcement.id}`}
                checked={!!props.announcement.active}
                onChange={e => onChange({ active: e.target.checked })}
            />
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
                volume={props.announcement.volume}
                rate={props.announcement.rate}
                pitch={props.announcement.pitch}
                testVoiceText={props.announcement.text}
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
            <Button
                type="button"
                variant="danger"
                onClick={props.onDelete}
                style={{ marginRight: 8 }}
            >
                Delete
            </Button>
            <Button
                type="button"
                variant="secondary"
                onClick={props.onCopy}
                style={{ marginRight: 8 }}
            >
                Copy
            </Button>
            <Button
                type="button"
                variant="secondary"
                onClick={props.onPaste}
                disabled={!props.onPaste}
                style={{ marginRight: 8 }}
            >
                Paste
            </Button>
        </div>
    )
}

export default function Announcer() {
    const [running, setRunning] = useState(false)
    const [config, setConfig] = useConfig()
    const [copy, setCopy] = useState<Announcement>()

    const currentRef = useRef({
        timer: null,
        config,
        announcements: [],
    })

    currentRef.current.config = config

    useEffect(() => {
        currentRef.current.announcements = shuffle(config.announcements.filter(x => x.active))
    }, [config])

    useEffect(() => {
        if (!running) return

        async function run() {
            const { config } = currentRef.current

            if (!await isSpeaking()) {
                let announcements = currentRef.current.announcements

                if (!announcements.length) {
                    announcements = shuffle(config.announcements.filter(x => x.active))
                }

                if (announcements.length) {
                    const ann = announcements.shift()
                    currentRef.current.announcements = announcements
                    sayAnnouncement(ann)
                }
            }

            currentRef.current.timer = setTimeout(run, 200)
        }

        run()

        return () => {
            clearTimeout(currentRef.current.timer)
        }
    }, [running])

    function sayAnnouncement(ann) {
        ann && say(ann.text, ann.voiceName, {
            volume: ann.volume,
            rate: ann.rate,
            pitch: ann.pitch,
        })
    }

    const onAdd = () => {
        setConfig({
            ...config,
            announcements: [
                ...config.announcements,
                {
                    id: Date.now().toString(),
                    text: '',
                }
            ]
        })
    }

    const onChange = (announcement) => {
        setConfig({
            ...config,
            announcements: config.announcements.map(
                val => val.id === announcement.id ? announcement : val
            )
        })
    }

    const onDelete = (announcement) => () => {
        setConfig({
            ...config,
            announcements: config.announcements.filter(val => val.id !== announcement.id)
        })
    }

    const onPaste = id => () => {
        setConfig({
            ...config,
            announcements: config.announcements.map(val => val.id === id ? {
                ...val,
                voiceName: copy.voiceName,
                volume: copy.volume,
                rate: copy.rate,
                pitch: copy.pitch,
            } : val)
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
                    key={announcement.id}
                >
                    <label>#{i + 1}</label>
                    <Announcement
                        announcement={announcement}
                        onChange={onChange}
                        onDelete={onDelete(announcement)}
                        onCopy={() => setCopy(announcement)}
                        onPaste={copy && onPaste(announcement.id)}
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