import { useEffect, useRef, useState } from "react"
import Stack from 'react-bootstrap/Stack';
import { Form } from "./Options"
import Button from 'react-bootstrap/Button';
import { isSpeaking, say } from '../lib/speech';

const API_URL = 'http://192.168.1.7:9003'

export default function LiveEvents() {
    const [userId, setUserId] = useState('')
    const [event, setEvent] = useState<any>()

    useEffect(() => {
        fetchInfo()
        fetchEvents()
    }, [])

    useEffect(() => {
        maybeSay(event)
    }, [event])

    async function fetchInfo() {
        await fetch(API_URL + '/info')
            .then(res => res.json())
            .then(json => {
                setUserId(json?.user_id ?? '')
            })
    }

    async function connect(e) {
        e.preventDefault()

        if (!userId || userId.trim() == '') return

        const fd = new FormData()
        fd.append('user_id', userId)

        return fetch(API_URL + '/live', {
            method: 'post',
            body: fd
        })
    }

    async function maybeSay(event) {
        if (event) {
            if (await isSpeaking()) {
                setTimeout(() => maybeSay(event), 200)
                return
            }
            switch (event.type) {
                case 'comment':
                    say(event.comment)
                    break
                case 'gift':
                    break
            }
        }
    }

    async function fetchEvents() {
        if (await isSpeaking()) {
            setTimeout(fetchEvents, 200)
            return
        }

        await fetch(API_URL + '/events')
            .then(res => res.json())
            .then(json => json[0] && setEvent(json[0]))

        setTimeout(fetchEvents, 200)
    }

    return (
        <>
            <Form onSubmit={connect}>
                <Form.Group controlId="formGroupLiveEventTest">
                    <Form.Label>User ID</Form.Label>
                    <Form.Control
                        type="text"
                        className="mb-2"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        onFocus={(e) => {
                            e.target.setSelectionRange(0, e.target.value.length);
                        }}
                    />
                    <Stack gap={2} className="align-items-start">
                        <Button type="submit" variant="primary" disabled={!userId}>
                            Connect
                        </Button>
                    </Stack>
                </Form.Group>
            </Form>
            <Form.Group controlId="formGroupLiveEventTest">
                <Form.Label>Live Events</Form.Label>
                {event?.type == 'comment' && <Form.Control
                    type="text"
                    className="mb-2"
                    value={`${event.user}: ${event.comment}`}
                    readOnly
                    style={{ width: 800 }}
                />}
            </Form.Group>
        </>
    )
}