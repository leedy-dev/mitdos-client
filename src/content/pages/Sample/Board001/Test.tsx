import { Button } from "@mui/material";
import React, { useState } from 'react';
import apiClient from "src/services/lib/mitdAxios";

function Test(props) {
    const [images, setImages] = useState<{ korFile: File, engFile: File, chiFile: File, jpnFile: File }>();

    const onSubmit = () => {
        const submitFormData = new FormData();

        submitFormData.append('images', images.korFile);
        submitFormData.append('images', images.engFile);
        submitFormData.append('images', images.chiFile);
        submitFormData.append('images', images.jpnFile);

        submitFormData.append('homepageContent', new Blob([JSON.stringify(contents)], {type: 'application/json'}));

        apiClient.post("http://localhost:8080/api/homepage/homepageContent", submitFormData)
            .then(r => console.log(r));
    }

    return (
        <div>
            <input type={'file'} onChange={e => setImages({ ...images, korFile: e.target.files[0] })} /><br/><br/>
            <input type={'file'} onChange={e => setImages({ ...images, engFile: e.target.files[0] })} /><br/><br/>
            <input type={'file'} onChange={e => setImages({ ...images, chiFile: e.target.files[0] })} /><br/><br/>
            <input type={'file'} onChange={e => setImages({ ...images, jpnFile: e.target.files[0] })} /><br/><br/>
            <Button onClick={onSubmit}>SUBMIT</Button>
        </div>
    );
}

export default Test;


const contents = {
    "contentDate": {
        "alwaysYn": true,
        "endDate": "2022-01-12",
        "startDate": "2022-01-12",
        "endTime": "00:00:00",
        "startTime": "00:00:00"
    },
    "contentOpenYn": true,
    "contentType": "PRODUCTION",
    "cost": {
        "chiText": "string",
        "engText": "string",
        "jpnText": "string",
        "korText": "string"
    },
    "description": {
        "chiText": "string",
        "engText": "string",
        "jpnText": "string",
        "korText": "string"
    },
    "options": [
        {
            "name": {
                "chiText": "string1",
                "engText": "string1",
                "jpnText": "string1",
                "korText": "string1"
            },
            "description": {
                "chiText": "string1",
                "engText": "string1",
                "jpnText": "string1",
                "korText": "string1"
            },
            "textType": "TEXT",
            "index": 1
        },
        {
            "name": {
                "chiText": "string2",
                "engText": "string2",
                "jpnText": "string2",
                "korText": "string2"
            },
            "text": {
                "chiText": "string2",
                "engText": "string2",
                "jpnText": "string2",
                "korText": "string2"
            },
            "textType": "TEXT",
            "index": 2
        },
        {
            "name": {
                "chiText": "string3",
                "engText": "string3",
                "jpnText": "string3",
                "korText": "string3"
            },
            "description": {
                "chiText": "string3",
                "engText": "string3",
                "jpnText": "string3",
                "korText": "string3"
            },
            "textType": "TEXT",
            "index": 3
        }
    ],
    "onlineReserveYn": true,
    "reserveType": "FACILITIES",
    "salesDate": {
        "alwaysYn": true,
        "endDate": "2022-01-12",
        "startDate": "2022-01-12",
        "endTime": "00:00:00",
        "startTime": "00:00:00"
    },
    "specialDate": {
        "alwaysYn": true,
        "endDate": "2022-01-12",
        "startDate": "2022-01-12",
        "startTime": "24:00:00",
        "endTime": "24:00:00"
    },
    "specialType": "SPECIAL",
    "specialYn": true,
    "subTitle": {
        "chiText": "string",
        "engText": "string",
        "jpnText": "string",
        "korText": "string"
    },
    "title": {
        "chiText": "string",
        "engText": "string",
        "jpnText": "string",
        "korText": "string"
    },
    "urlLink": "string"
};