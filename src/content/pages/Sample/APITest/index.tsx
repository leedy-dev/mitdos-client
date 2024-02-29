import React, { useRef, useState } from 'react';
import {
    Button,
    Container,
    MenuItem,
    Paper,
    Select,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField
} from "@mui/material";
import Modal from "src/components/Modal";
import NoticeSnackbar from "src/components/NoticeSnackbar";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import QuillEditor from "src/components/QuillEditor";
import apiClient from "src/services/lib/mitdAxios";

function APITest() {
    // Modal
    const [openModal, setOpenModal] = useState(false);
    const [modalState, setModalState] =
        useState<{title: string, content: any, type: 'alert' | 'confirm', onConfirm?: any}>({ title: '', content: '', type: 'alert' })

    // snackbar
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarState, setSnackbarState] =
        useState<{content: string, type: 'info' | 'success' | 'warning' | 'error', title?: string}>({ content: '', type: 'info' });

    // 문의 유형
    const [type, setType] = useState<{code: string, name: string}>({ code: '', name: '' });
    const types: typeof type[] = [
        { code: 'free', name: '자유' },
        { code: 'notice', name: '공지' },
        { code: 'faq', name: 'FAQ' },
    ];

    // Board
    const titleRef = useRef(null);
    const quillRef = useRef(null);
    const [title, setTitle] = useState('');

    /* Event */
    // onBlur
    const handleInputBlur = e => {
        const { name, value } = e.target;
        if(name === 'title') {
            setTitle(value);
        }
    }

    // onSubmit
    const handleSubmit = () => {
        const quillHTML = quillRef?.current?.editor.root.innerHTML;

        // 빈값 check
        if(title === ''){
            setOpenSnackbar(true);
            setSnackbarState({ ...snackbarState, type: 'warning', content: '제목을 입력하세요.' });
            titleRef.current.focus();
            return;
        }
        if(quillHTML === '<p><br></p>'){
            setOpenSnackbar(true);
            setSnackbarState({ ...snackbarState, type: 'warning', content: '내용을 입력하세요.' });
            return;
        }

        // FormData 변환
        const formData = new FormData();
        formData.append('homepageContent', new Blob([JSON.stringify({...data})], {type: 'application/json'}));

        apiClient.post('http://localhost:8080/api/homepage/homepage-content', formData)
            .then(response => console.log(response.data))
            .catch(() => {
                setSnackbarState({ ...snackbarState, type: 'error', content: '실패' });
                setOpenSnackbar(true);
            });
    }

    return (
        <>
            <PageTitleWrapper>
                <h2>게시판 등록</h2>
            </PageTitleWrapper>
            <Container maxWidth="lg">
                <TableContainer component={Paper}>
                    <Table aria-label={"answer table"} stickyHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell variant={'head'} scope={'row'} align={'center'}>문의유형</TableCell>
                                <TableCell colSpan={4} scope={'row'}>
                                    <Select value={type.code} displayEmpty onChange={e => setType({...type, code: e.target.value})}>
                                        <MenuItem value='' disabled>유형 선택</MenuItem>
                                        {types.map((t, i) => (
                                            <MenuItem key={i} value={t.code}>{t.name}</MenuItem>
                                        ))}
                                    </Select>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant={'head'} scope={'row'} align={'center'}>제목</TableCell>
                                <TableCell colSpan={4} scope={'row'}>
                                    <TextField
                                        inputRef={titleRef}
                                        name={'title'}
                                        fullWidth
                                        onBlur={handleInputBlur}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant={'head'} scope={'row'} align={'center'}>답변</TableCell>
                                <TableCell colSpan={4} scope={'row'}>
                                    <QuillEditor ref={quillRef} defaultValue={'add'} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Buttons>
                    <div>
                        <ControlButton type='submit' variant={'contained'} onClick={handleSubmit}>
                            등록
                        </ControlButton>
                    </div>
                </Buttons>
            </Container>

            {/* Modal | Snackbar */}
            <Modal open={openModal} onClose={() => setOpenModal(false)} title={modalState.title} type={modalState.type} onConfirm={modalState.onConfirm}>
                {modalState.content}
            </Modal>
            <NoticeSnackbar open={openSnackbar} onClose={() => setOpenSnackbar(false)} type={snackbarState.type} title={snackbarState.title}>
                {snackbarState.content}
            </NoticeSnackbar>
        </>
    );
}

export default APITest;

/* styled */
const ControlButton = styled(Button)`
    margin: 10px 10px 10px 10px;
`
const Buttons = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
`

export const data = {
    "contentDate": {
        "alwaysYn": true,
        "endDate": "2022-01-12",
        "startDate": "2022-01-12"
    },
    "contentOpenYn": true,
    "contentType": "PRODUCTION",
    "cost": {
        "chiText": "string",
        "engText": "string",
        "jpnText": "string",
        "korText": "string"
    },
    "createDate": "2022-01-12T09:16:00.062Z",
    "createUser": {
        "name": "string",
        "uid": "string"
    },
    "description": {
        "chiText": "string",
        "engText": "string",
        "jpnText": "string",
        "korText": "string"
    },
    "onlineReserveYn": true,
    "options": [
        {
            "name": "string1",
            "text": {
                "chiText": "string1",
                "engText": "string1",
                "jpnText": "string1",
                "korText": "string1"
            },
            "textType": "SAMPLE",
            "index": 1
        },
        {
            "name": "string2",
            "text": {
                "chiText": "string2",
                "engText": "string2",
                "jpnText": "string2",
                "korText": "string2"
            },
            "textType": "SAMPLE",
            "index": 2
        },
        {
            "name": "string3",
            "text": {
                "chiText": "string3",
                "engText": "string3",
                "jpnText": "string3",
                "korText": "string3"
            },
            "textType": "SAMPLE",
            "index": 3
        }
    ],
    "reserveType": "FACILITIES",
    "salesDate": {
        "alwaysYn": true,
        "endDate": "2022-01-12",
        "startDate": "2022-01-12"
    },
    "specialDate": {
        "alwaysYn": true,
        "endDate": "2022-01-12",
        "startDate": "2022-01-12"
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
    "updateDate": "2022-01-12T09:16:00.062Z",
    "updateUser": {
        "name": "string",
        "uid": "string"
    },
    "urlLink": "string"
}