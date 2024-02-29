import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
// material ui
import { styled, TextField } from "@mui/material";
// components
import ListTable from "src/components/ListTable";
import Modal from "src/components/Modal";
import NoticeSnackbar from "src/components/NoticeSnackbar";
import TableFilter from "src/components/TableFilter";
import BoardDetail from "src/content/pages/Sample/Board001/BoardDetail";
// data
import { deleteBoard, getBoardWithPaging } from "src/services/sample/boardApi";
import { ColorState, ModalState, SnackbarState } from "src/models/states/stateModel";
import { BoardData, PagingInfo, BoardSearchData } from "src/models/datas/dataModel";


function BoardListPageWithComponents() {
    // render
    const [render, setRender] = useState(0);

    // navigate
    const navigate = useNavigate();

    // Modal | Snackbar
    const [modalState, setModalState] = useState<ModalState>({ open: false })
    const [snackbarState, setSnackbarState] = useState<SnackbarState>({ open: false });
    // close modal | snackbar
    const onCloseModal = () => { setModalState({ ...modalState, open: false }); }
    const onCloseSnackbar = () => { setSnackbarState({ ...snackbarState, open: false }); }

    // search
    const [search, setSearch] = useState<BoardSearchData>({ title: '' });

    // filter
    const [expanded, setExpanded] = useState(false);

    // remove rows
    const onClickRemove = () => {
        if(selectedRows.length === 0) {
            setSnackbarState({ open: true, content: '데이터를 선택하세요.', type: 'error' });
        } else {
            setModalState({ open: true, title: 'REMOVE', content: '삭제하시겠습니까?', type: 'confirm', onConfirm: handleRemoveRows });
        }
    }

    // handle remove rows
    const handleRemoveRows = async () => {
        await selectedRows.map(row => {
            deleteBoard(row.id)
                .then(() => { setSnackbarState({ open: true, content: 'SUCCESS', type: 'success' }); setRender(Math.random())})
                .catch(error => { setModalState({ open: true, title: 'FAIL', content: error.message, type: 'alert' }); });
        })
        onCloseModal();
    }

    // handle click row - set detail
    const [detail, setDetail] = useState<BoardData>();
    const detailRows = [
        {id: 'createDate', name: '접수일', secondId: '처리일자', secondName: '처리일자'},
        {id: 'createdBy', name: '작성자', secondId: '담당자', secondName: '담당자'},
        {id: '문의유형', name: '문의유형'},
        {id: 'title', name: '제목'},
        {id: 'content', name: '내용', html: true}
    ]
    const onClickRow = (e, row) => {
        setDetail(row);
    }

    /* table (s) */
    // data
    const [rows, setRows] = useState<BoardData[]>([]);
    const columns = [
        { id: 'title', name: 'title' },
        { id: 'createdBy', name: 'writer' },
        { id: 'createDate', name: 'date' },
    ];

    // select
    const [selectedRows, setSelectedRows] = useState<BoardData[]>([]);

    // paging state
    const [pagingInfo, setPagingInfo] = useState<PagingInfo>
    ({
        size: 10,
        page: 0,
        sort: 'id,desc',
        totalPages: 0,
        totalElements: 0,
    });

    // table buttons
    const tableButtons: ({ onClick?: any; color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"; text: string })[] = [
        { text: 'add', color: 'primary', onClick: () => {navigate('/sample/board001/edit', {state: { mode: 'add' } })} },
        { text: 'remove', color: 'error', onClick: onClickRemove }
    ]
    /* table (e) */

    /* get Board Api */
    useEffect(() => {
        getBoardWithPaging({
            // paging & sort
            size: pagingInfo.size, page: pagingInfo.page, sort: pagingInfo.sort,
            // search
            title: search.title,
        })
            .then((response: { data?: { content?: BoardData[] } & PagingInfo })  => {
                const responseData = response.data;
                setRows([...responseData.content]);
                setPagingInfo(p => ({ ...p, totalPages: responseData.totalPages, totalElements: responseData.totalElements }));
            })
            .catch(error => {
                setModalState({
                    open: true,
                    title: 'ERROR',
                    content: error.message,
                    type: 'alert'
                });
            });
    }, [search, render, pagingInfo.size, pagingInfo.page, pagingInfo.sort]);

    return (
        <>
            {/* Filter */}
            <TableFilter
                expanded={expanded}
                handleFilterExpand={() => setExpanded(!expanded)}
                title={`리스트 총 ${pagingInfo.totalElements}건`}
            >
                <FilterDetailDiv>
                    <TextField label={'Title'} value={search.title} onChange={e => setSearch({ ...search, title: e.target.value })} />
                </FilterDetailDiv>
            </TableFilter>

            {/* TableContainer */}
            <ListTable
                data={rows}
                columns={columns}
                onClickRow={onClickRow}
                // onDoubleClickRow={() => alert('onDoubleClickRow')}
                buttons={tableButtons}
                tableApi={{
                    pagingInfo: pagingInfo,
                    handleChangePage: setPagingInfo,
                    selectedRows: selectedRows,
                    handleSelectRows: setSelectedRows,
                }}
            />

            {/* Detail */}
            {detail &&
                <BoardDetail
                    data={detail}
                    rows={detailRows}
                    title={'문의 내용'}
                />
            }

            {/* Modal | Snackbar */}
            <Modal open={modalState.open} onClose={onCloseModal} title={modalState.title} type={modalState.type} onConfirm={modalState.onConfirm}>
                {modalState.content}
            </Modal>
            <NoticeSnackbar open={snackbarState.open} onClose={onCloseSnackbar} title={snackbarState.title} type={snackbarState.type}>
                {snackbarState.content}
            </NoticeSnackbar>
        </>
    );
}

/* styled (s) */
const FilterDetailDiv = styled('div')`
    display: 'flex';
    alignItems: 'center';
`
/* styled (e) */

export default BoardListPageWithComponents;