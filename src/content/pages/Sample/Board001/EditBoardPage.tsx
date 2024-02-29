import React, { useRef, useState } from 'react';
import {
    Button,
    Container, MenuItem,
    Paper,
    Select, styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "src/components/Modal";
import NoticeSnackbar from "src/components/NoticeSnackbar";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import QuillEditor from "src/components/QuillEditor";
import { createBoard, deleteBoard, updateBoard } from "src/services/sample/boardApi";

function EditBoardPage() {
    // router
    const navigate = useNavigate();
    const location = useLocation();

    // state
    const state: {mode?: 'add'|'edit', data?: any} = location.state;

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
        formData.append('board', new Blob([JSON.stringify({title: title, content: quillHTML})], {type: 'application/json'}));

        if (state.mode === 'add') {
            createBoard(formData)
                .then(() => navigate('/sample/board001'))
                .catch(() => {
                    setSnackbarState({ ...snackbarState, type: 'error', content: '실패' });
                    setOpenSnackbar(true);
                });
        } else {
            updateBoard(state.data.id, formData)
                .then(() => navigate('/sample/board001'))
                .catch(() => {
                    setSnackbarState({ ...snackbarState, type: 'error', content: '실패' });
                    setOpenSnackbar(true);
                });
        }
    }

    // remove
    const onClickRemove = () => {
        setOpenModal(true);
        setModalState({title: 'REMOVE', content: '삭제하시겠습니까?', type: 'confirm', onConfirm: removeData});
    }

    const removeData = () => {
        deleteBoard(state.data.id)
            .then(() => {
                setOpenSnackbar(true);
                setSnackbarState({ content: 'SUCCESS', type: 'success' });
                navigate('/sample/board001');
            })
            .catch(error => {setOpenModal(true); setModalState({ title: 'FAIL', content: error.message, type: 'alert' }); });
    }

    return (
        <>
            <PageTitleWrapper>
                <h2>{state.mode === 'add' ? '게시판 등록' : '게시판 수정'}</h2>
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
                                        {types.map(t => (
                                            <MenuItem key={t.code} value={t.code}>{t.name}</MenuItem>
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
                                        defaultValue={state.mode === 'add' ? '' : state.data.title}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant={'head'} scope={'row'} align={'center'}>답변</TableCell>
                                <TableCell colSpan={4} scope={'row'}>
                                    <QuillEditor ref={quillRef} defaultValue={state.mode === 'add' ? '' : state.data.content} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Buttons>
                    <div>
                        <ControlButton type='submit' variant={'contained'} onClick={handleSubmit}>
                            {state.mode === 'add' ? '등록' : '수정'}
                        </ControlButton>
                        <ControlButton variant={'contained'} color={'secondary'} onClick={() => navigate('/sample/board001')}>목록</ControlButton>
                    </div>
                    {state.mode === 'edit' && <ControlButton variant={'contained'} color={'error'} onClick={onClickRemove}>삭제</ControlButton>}
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

export default EditBoardPage;

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