import { Button, MenuItem, Select } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from 'react';

interface EventTypeIF {
    createdBy: string;
    createdDate: string;
    data: string;
    id: string;
    isRead: boolean
    modifiedBy: string;
    modifiedDate: string;
    request: string;
    type: string;
}

function SseTest(props) {

    const userId = 'test';

    const [eventType, setEventType] = useState<string>('NOTICE');
    const [event, setEvent] = useState<EventTypeIF>(null);
    const [eventList, setEventList] = useState<{eventId: string, eventData: EventTypeIF }[]>([]);

const types = ['NOTICE', 'CHATBOT_CHECKIN', 'CHATBOT_CHECKOUT', 'CHATBOT_AMENITY', 'CHATBOT_INQUIRY']
    useEffect(() => {
        if (event !== null) {
            console.log(event);
            setEventList([...eventList, { eventId: event.id, eventData: event }]);
        }
    }, [event]);

    let eventSource;

    const connectStream = () => {
        eventSource = new EventSource(
            'http://localhost:8080/api/sample/sse-test/create-event-stream-by-user-id?userId=' + userId
        );
        eventSource.onopen = e => {
            console.log('open', e);
        }
        // eventSource.onmessage = e => {
        //     console.log('message', e);
        // }
        eventSource.onerror = e => {
            console.log('error', e);
        }
        eventSource.addEventListener('dummy', e => console.log('event', e));
        eventSource.addEventListener('sse', e => {
            console.log('event', e);
            setEvent(JSON.parse(e.data));
            
        });
    }

    const disconnectStream = async () => {
        if(eventSource) {
            await eventSource.close();
        }
        console.log('es', eventSource);
    }

    const getStreamState = () => {
        console.log('es', eventSource);
    }

    // const createEvent = async () => {
    //     const response = await axios.post('http://localhost:8080/api/sample/notice-message/create-event-by-user-id', { userId: 'test', type: eventType });
    // }
    const createEvent = async () => {
        const response = await axios.post('http://localhost:8080/api/sample/sse-test/create-event-by-user-id', {type: 'SYSTEM', request: 'EXCEL'});
    }

    const readEvent = async eventId => {
        await axios.get('http://localhost:8080/api/message/notice-message/read-event?eventId=' + eventId);
        console.log(eventId);
    }

    const getEventList = async () => {
        await axios.get('http://localhost:8080/api/message/notice-message/get-event-list');
    }

    useEffect(() => {
        console.log('eventSource', eventSource);
    }, [eventSource]);

    return (
        <div style={{ width: '50%' }}>
            <div>
                <Button onClick={connectStream}>CONNECT</Button>
                <Button onClick={disconnectStream}>DISCONNECT</Button>
                <Button onClick={getStreamState}>STATE</Button>
                <br />
                <Button onClick={getEventList}>EVENT LIST</Button>
            </div>
            <div>
                <Select value={eventType} onChange={e => setEventType(e.target.value)}>
                    {types.map(type =>
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    )}
                </Select>
                <Button onClick={createEvent}>CREATE EVENT</Button>
            </div>
            <div>
                <ul>
                    {eventList.map((evt, idx) =>
                        <h4
                            key={ idx }
                            style={{ cursor: !evt.eventData.isRead && 'pointer' }}
                            onClick={() => !evt.eventData.isRead && readEvent(evt.eventId)}
                        >
                            작성자: {evt.eventData.createdBy} <br/>
                            작성일: {evt.eventData.createdDate} <br/>
                            수정자: {evt.eventData.modifiedBy} <br/>
                            수정일: {evt.eventData.modifiedDate} <br/>
                            ID: {evt.eventData.id} <br/>
                            TYPE: {evt.eventData.type} <br/>
                            읽음여부: {evt.eventData.isRead ? 'O' : 'X'} <br/>
                            REQUEST: {evt.eventData.request} <br/>
                            DATA: {evt.eventData.data}
                        </h4>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default SseTest;