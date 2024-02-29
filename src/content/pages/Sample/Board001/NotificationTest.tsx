import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { createEvent, createEventStream } from "src/services/sample/notificationApi";

function NotificationTest(props) {


    const onClickBtn = () => {
        createEvent({
            userId: 'test',
            type: 'NOTICE'
        })
    }

    return (
        <div>
            <TextField type={'file'} onChange={e => console.log(e)} />
            <Button onClick={onClickBtn}>TEST</Button>
        </div>
    );
}

export default NotificationTest;