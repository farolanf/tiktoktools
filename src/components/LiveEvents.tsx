import { useEffect, useRef, useState } from "react"
import { Form } from "./Options"

const API_URL = 'http://192.168.1.7:9003'

export default function LiveEvents() {
    const [events, setEvents] = useState([])
    const currentRef = useRef<any>()

    currentRef.current = { events }

    useEffect(() => {
        fetchEvents()
    }, [])

    async function fetchEvents() {
        fetch(API_URL + '/events')
            .then(res => res.json())
            .then(json => {
                const { events } = currentRef.current
                setEvents(events.concat(json))
                setTimeout(fetchEvents, 500)
            })
    }

    return (
        <Form.Group controlId="formGroupLiveEventTest">
            <Form.Label>Live Events</Form.Label>
            <textarea
                readOnly
                value={JSON.stringify(events, null, 4)}
                rows={20}
                style={{ width: 800 }}
            />
        </Form.Group>
    )
}