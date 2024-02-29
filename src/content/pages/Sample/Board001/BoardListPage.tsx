import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
// material ui
import { FilterAlt } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Checkbox,
    MenuItem,
    Pagination,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableContainerProps,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import Modal from "src/components/Modal";
import NoticeSnackbar from "src/components/NoticeSnackbar";
import { ModalState, SnackbarState } from "src/models/states/stateModel";
// components
import { deleteBoard, getBoardWithPaging } from "src/services/sample/boardApi";
// data
import { BoardData, BoardSearchData, PagingInfo } from "src/models/datas/dataModel";
import styled from "@emotion/styled";

/* styled (s) */
const CustomTableRow = styled(TableRow)`
    cursor: pointer;
    &:hover {
        background-color: #5e6e8f;
    }
    &:active {
        background-color: #223763;
    }
`

const DetailDiv = styled('div')`
    display: flex;
    justify-content: space-between;
`

const DetailTableContainer = styled.div<TableContainerProps>`
    margin-top: 30px;
    width: 48.5%;
`

const FilterDiv = styled('div')`
    padding-bottom: 20px;
    font-weight: bold;
`;

const TableHeaderFooter = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
`

const TablePaper = styled(Paper)`
    max-height: 695px;
    overflow: auto;
`
/* styled (e) */

function BoardListPage() {
    // render
    const [render, setRender] = useState(0);

    // navigate
    const navigate = useNavigate();

    // Modal | Snackbar
    const [modalState, setModalState] = useState<ModalState>({ open: false })
    const [snackbarState, setSnackbarState] = useState<SnackbarState>({ open: false });

    // data
    const [rows, setRows] = useState<BoardData[]>([]);
    const [detail, setDetail] = useState<BoardData>(null);

    // set data no
    const dataNo = idx => {
        return pagingInfo.page * pagingInfo.size + idx + 1;
    }

    // search
    const [search, setSearch] = useState<BoardSearchData>({ title: '' });

    // filter
    const [expanded, setExpanded] = useState(false);

    /* pagination (s) */
    // size type convert
    const sizeToInteger = size => {
        return parseInt(size.toString(), 10);
    }
    // paging state
    const [pagingInfo, setPagingInfo] = useState<PagingInfo>
    ({
        size: 10,
        page: 0,
        sort: 'id,desc',
        totalPages: 0,
        totalElements: 0,
    });

    const handleChangePage = (e, page) => {
        setPagingInfo({ ...pagingInfo, page: page-1 })
    }
    /* pagination (e) */

    /* get Board Api */
    useEffect(() => {
        getBoardWithPaging({
            // paging & sort
            size: pagingInfo.size, page: pagingInfo.page, sort: pagingInfo.sort,
            // search
            title: search.title
        })
            .then((response: { data?: { content?: BoardData[] } & PagingInfo })  => {
                setCheckboxState({ all: false })
                const responseData = response.data;
                setRows([...responseData.content]);
                setPagingInfo(p => ({ ...p, totalPages: responseData.totalPages, totalElements: responseData.totalElements }));
            })
            .catch(error => {
                setModalState({
                    open: true,
                    title: 'ERROR',
                    content: <><p>{error.message}</p><p>데이터를 불러오지 못하였습니다.</p></>,
                    type: 'alert'
                });
            });
    }, [search, render, pagingInfo.size, pagingInfo.page, pagingInfo.sort]);

    // set Checkbox State
    useEffect(() => {
        rows.map(row => {
            checkboxState[row.id] = false;
        })
    }, [rows]);

    /* handle select row */
    const [checkboxState, setCheckboxState] = useState({ all: false });
    const handleChangeCheckbox = e => {
        const { name, checked } = e.target;

        if(name !== "all") {
            const checkState = { ...checkboxState };
            // validate all checked
            let isAllChecked = true;
            for (const key in checkState) {
                if(key === name && !checked) {
                    isAllChecked = false;
                    break;
                }
                if(key !== 'all' && key !== name && !checkState[key]) {
                    isAllChecked = false;
                    break;
                }
            }
            // set all
            checkState['all'] = isAllChecked;
            checkState[name] = checked;
            setCheckboxState(checkState);
        } else {
            const checkState = { ...checkboxState };
            for (const key in checkState) {
                checkState[key] = checked;
            }
            setCheckboxState(checkState);
        }

        // select
        const selectValue = [];
        for (const key in checkboxState) {
            if(key !== 'all') {
                if(name === 'all') {
                    if(checked) selectValue.push(key);
                }
            } else if((key === name && checked) || (checkboxState[key] && key !== name)) {
                selectValue.push(key);
            }
        }
    } // handleChangeCheckbox

    // remove rows
    const onClickRemove = () => {
        if(rows.filter(row => (checkboxState[row.id])).length === 0) {
            setSnackbarState({ open: true, content: '데이터를 선택하세요.', type: 'error' });
        } else {
            setModalState({ open: true, title: 'REMOVE', content: '삭제하시겠습니까?', type: 'confirm', onConfirm: handleRemoveRows });
        }
    }

    const handleRemoveRows = async () => {
        const selectedRows = [];
        // get selected row's id
        rows.map(row => {checkboxState[row.id] && selectedRows.push(row)});
        // delete board api
        await selectedRows.map(row => {
            deleteBoard(row.id)
                .then(() => { setSnackbarState({ open: true, content: 'SUCCESS', type: 'success' }); setRender(Math.random()); })
                .catch(error => { setModalState({ open: true, title: 'FAIL', content: error.message, type: 'alert' }); });
        })
        setModalState({ open: false });
    }

    return (
        <>
            {/* Filter */}
            <FilterDiv style={{ maxWidth: expanded ? '100%' : '20%' }}>
                <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
                    <AccordionSummary expandIcon={<FilterAlt />}>
                        문의내역 총 {pagingInfo.totalElements}건
                    </AccordionSummary>
                    <AccordionDetails>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <TextField label={'Title'} value={search.title} onChange={e => setSearch({ ...search, title: e.target.value })} />
                        </div>
                    </AccordionDetails>
                </Accordion>
            </FilterDiv>

            {/* TableContainer */}
            <TableContainer component={TablePaper}>
                <TableHeaderFooter>
                    <TableHeaderFooter>
                        {/* Select Count */}
                        <span style={{padding: '0 10px 0 10px'}}>문의리스트</span>
                        <Select value={pagingInfo.size} onChange={e => setPagingInfo({ ...pagingInfo, page:0, size: sizeToInteger(e.target.value) })}>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                        </Select>
                        {/* Pagination */}
                        <Pagination
                            page={pagingInfo.page+1}
                            count={pagingInfo.totalPages}
                            boundaryCount={1}
                            siblingCount={3}
                            onChange={handleChangePage}
                        />
                    </TableHeaderFooter>
                    <div>
                        <Button onClick={() => navigate('/sample/board001/edit', {state: { mode: 'add' } })}>ADD</Button>
                        <Button color={'error'} onClick={onClickRemove}>REMOVE</Button>
                    </div>
                </TableHeaderFooter>

                {/* List Table */}
                <Table aria-label={"list table"} stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell padding={'checkbox'}>
                                <Checkbox
                                    name={'all'} checked={checkboxState['all'] || false}
                                    onChange={handleChangeCheckbox}
                                />
                            </TableCell>
                            <TableCell sx={{ width: 1/20 }} scope={'col'} align={'center'}>No</TableCell>
                            <TableCell sx={{ width: 1/2 }} scope={'col'} align={'center'}>Title</TableCell>
                            <TableCell sx={{ width: 1/4}} scope={'col'} align={'center'}>writer</TableCell>
                            <TableCell sx={{ width: 1/5 }} scope={'col'} align={'center'}>date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, idx) => (
                            <CustomTableRow key={idx} onClick={() => setDetail({ ...row })}>
                                <TableCell padding={'checkbox'}>
                                    <Checkbox
                                        name={row.id.toString()}
                                        checked={checkboxState[row.id] || false}
                                        onChange={handleChangeCheckbox}
                                    />
                                </TableCell>
                                <TableCell scope={'row'} align={'center'}>{dataNo(idx)}</TableCell>
                                <TableCell scope={'row'} align={'center'}>{row.title}</TableCell>
                                <TableCell scope={'row'} align={'center'}>{row.createdBy}</TableCell>
                                <TableCell scope={'row'} align={'center'}>{row.createdDate}</TableCell>
                            </CustomTableRow>
                        ))}
                    </TableBody>
                </Table>
                <TableHeaderFooter>
                    <TableHeaderFooter>
                        {/* Select Count */}
                        <span style={{padding: '0 10px 0 10px'}}>문의리스트</span>
                        <Select value={pagingInfo.size} onChange={e => setPagingInfo({ ...pagingInfo, size: sizeToInteger(e.target.value) })}>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                        </Select>
                        {/* Pagination */}
                        <Pagination
                            page={pagingInfo.page+1}
                            count={pagingInfo.totalPages}
                            boundaryCount={1}
                            siblingCount={3}
                            onChange={handleChangePage}
                        />
                    </TableHeaderFooter>
                </TableHeaderFooter>
            </TableContainer>

            {/* Detail */}
            {detail &&
                <DetailDiv>
                    {/* Detail Table */}
                    <DetailTableContainer component={Paper}>
                        <TableHeaderFooter>
                            <span style={{padding: '10px 10px 10px 10px'}}>문의 내용</span>
                            <Button onClick={() => navigate('/sample/board001/edit', {state: { mode: 'edit', data: detail } })}>EDIT</Button>
                        </TableHeaderFooter>
                        <Table aria-label={"detail table"} stickyHeader size={'small'}>
                            <TableBody>
                                <TableRow>
                                    <TableCell variant={'head'} scope={'row'} align={'center'}>접수일</TableCell>
                                    <TableCell scope={'row'}>{detail.createdDate}</TableCell>
                                    <TableCell variant={'head'} scope={'row'} align={'center'}>처리일자</TableCell>
                                    <TableCell variant={'footer'} scope={'row'}>처리일자</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant={'head'} scope={'row'} align={'center'}>작성자</TableCell>
                                    <TableCell scope={'row'}>{detail.createdBy}</TableCell>
                                    <TableCell variant={'head'} scope={'row'} align={'center'}>담당자</TableCell>
                                    <TableCell variant={'footer'} scope={'row'}>담당자</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant={'head'} scope={'row'} align={'center'}>문의유형</TableCell>
                                    <TableCell colSpan={3} scope={'row'}>문의유형</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant={'head'} scope={'row'} align={'center'}>제목</TableCell>
                                    <TableCell colSpan={3} scope={'row'}>{detail.title}</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell variant={'head'} scope={'row'} align={'center'}>내용</TableCell>
                                    <TableCell colSpan={3} scope={'row'}>
                                        <div dangerouslySetInnerHTML={{__html: detail.content}} style={{ height: '95px', overflow: 'auto' }} />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </DetailTableContainer>

                    {/* Answer Table */}
                    <DetailTableContainer component={Paper}>
                        <TableHeaderFooter>
                            <span style={{padding: '10px 10px 10px 10px'}}>담당자 답변 처리</span>
                        </TableHeaderFooter>
                        <Table aria-label={"answer table"} stickyHeader size={'small'}>
                            <TableBody>
                                <TableRow>
                                    <TableCell variant={'head'} scope={'row'} align={'center'}>문의유형</TableCell>
                                    <TableCell colSpan={3} scope={'row'}>문의유형</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant={'head'} scope={'row'} align={'center'}>템플릿</TableCell>
                                    <TableCell colSpan={3} scope={'row'}>템플릿</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant={'head'} scope={'row'} align={'center'}>답변</TableCell>
                                    <TableCell colSpan={3} scope={'row'}>
                                        <TextField fullWidth multiline rows={5}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant={'head'} scope={'row'} align={'center'}>파일</TableCell>
                                    <TableCell colSpan={3} scope={'row'}>파일</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </DetailTableContainer>
                </DetailDiv>
            }
            {/* Modal | Snackbar */}
            <Modal open={modalState.open} onClose={() => setModalState({ open: false })} title={modalState.title} type={modalState.type} onConfirm={modalState.onConfirm}>
                {modalState.content}
            </Modal>
            <NoticeSnackbar open={snackbarState.open} onClose={() => setSnackbarState({ open: false })} title={snackbarState.title} type={snackbarState.type}>
                {snackbarState.content}
            </NoticeSnackbar>
        </>
    );
}

export default BoardListPage;