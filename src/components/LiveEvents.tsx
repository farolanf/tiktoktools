import { useEffect, useRef, useState } from "react"
import Stack from 'react-bootstrap/Stack';
import { Form } from "./Options"
import Button from 'react-bootstrap/Button';
import { isSpeaking, say } from '../lib/speech';

const API_URL = 'http://192.168.1.7:9003'

const KURS = 15000
const COIN_RP = KURS / 200

const getRp = e => e.coins * e.count * COIN_RP

const sanitizeComment = str => str.replaceAll(/[^a-zA-Z0-9.,!? ]+/g, '')

const sayGift = e => {
    const coins = e.coins * e.count
    if (coins > 100) say(`wow! wooooww!! woooooooooooooowwwww!!!! terima kasih banyakk kakak ${e.user}!`)
    else if (coins > 50) say(`wow! terima kasih banyakk kakak ${e.user}`)
    else if (coins > 10) say(`terima kasih kakak ${e.user}`)
    else say(`makasih kak ${e.user}`)
}

export default function LiveEvents() {
    const [userId, setUserId] = useState('')
    const [event, setEvent] = useState<any>()
    const [comment, setComment] = useState('')
    const [gift, setGift] = useState('')
    const [totalRp, setTotalRp] = useState(0)
    const [connected, setConnected] = useState(false)

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
                setConnected(!!json?.user_id)
                setTotalRp(json?.total_rp ?? 0)
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
                    say(sanitizeComment(event.comment))
                    setComment(`${event.user}: ${event.comment}`)
                    break
                case 'gift':
                    sayGift(event)
                    setGift(`${event.user}: ${event.gift} x ${event.count} = ${event.coins * event.count} @${event.coins} = Rp${getRp(event)}`)
                    setTotalRp((total) => total + getRp(event))
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
                        onChange={(e) => {
                            setUserId(e.target.value)
                            setConnected(false)
                        }}
                        onFocus={(e) => {
                            e.target.setSelectionRange(0, e.target.value.length);
                        }}
                    />
                    <Stack gap={2} className="align-items-start">
                        <Button type="submit" variant="primary" disabled={!userId || connected}>
                            Connect
                        </Button>
                    </Stack>
                </Form.Group>
            </Form>
            <Form.Group controlId="formGroupLiveEventTest">
                <Form.Label>Live Events</Form.Label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Form.Label
                        style={{
                            marginRight: 8,
                            fontWeight: event?.type == 'comment' ? 700 : 400
                        }}
                    >
                        Comment
                    </Form.Label>
                    <Form.Control
                        type="text"
                        className="mb-2"
                        value={comment}
                        readOnly
                        style={{ width: 800 }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Form.Label
                        style={{
                            marginRight: 8,
                            fontWeight: event?.type == 'gift' ? 700 : 400
                        }}
                    >
                        Gift
                    </Form.Label>
                    <Form.Control
                        type="text"
                        className="mb-2"
                        value={gift}
                        readOnly
                        style={{ width: 800 }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Form.Label
                        style={{
                            marginRight: 8,
                            fontWeight: event?.type == 'gift' ? 700 : 400
                        }}
                    >
                        Total Rp
                    </Form.Label>
                    <Form.Control
                        type="text"
                        className="mb-2"
                        value={totalRp}
                        readOnly
                        style={{ width: 800 }}
                    />
                </div>
            </Form.Group>
        </>
    )
}