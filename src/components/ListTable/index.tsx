import {
    Button,
    Checkbox,
    MenuItem,
    Pagination,
    Paper,
    Select,
    styled,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import React, { useEffect, useState } from 'react';
import { PagingInfo } from "src/models/datas/dataModel";

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
const TableHeaderFooter = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
`

const TablePaper = styled(Paper)`
    max-height: 698px;
    overflow: auto;
`

const TableHeaderSpan = styled('span')`
    padding: 0 10px 0 10px;
`
/* styled (e) */

interface ListTableProps {
    data: any[];
    columns: { id: string, name: string }[];
    onClickRow?: any;
    onDoubleClickRow?: any;
    buttons?: {
        text: string;
        color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
        onClick?: any;
    }[];
    tableApi?: {
        pagingInfo?: PagingInfo,
        handleChangePage?: any,
        selectedRows?: any[],
        handleSelectRows?: any
    };
}

/**
 *  version 1.0
 *
 *  data(array): row data
 *  columns(object array): id - data name, name - column head name
 *  onClickRow: when a row is clicked
 *  onDoubleClickRow: when a row is double clicked
 *  buttons: set buttons on table (top - right)
 *  tableApi: functions
 *      - pagingInfo, handleChangePage: using pagination
 *      - selectedRows, handleSelectRows: checked row's data
 *
 */
function ListTable(props: ListTableProps) {
    // props
    const { data, columns, onClickRow, onDoubleClickRow, buttons, tableApi } = props;

    // rows
    const [rows, setRows] = useState<typeof data>([]);

    // size type convert (select)
    const sizeToInteger = size => {
        return parseInt(size.toString(), 10);
    }

    // set data no
    const dataNo = idx => {
        return tableApi.pagingInfo.page * tableApi.pagingInfo.size + idx + 1;
    }

    /* handle select rows (s) */
    const [checkboxState, setCheckboxState] = useState({ all: false });

    // set initial checkbox state
    useEffect(() => {
        setCheckboxState({ all: false });
        setRows(data);
    }, [tableApi.pagingInfo]);

    useEffect(() => {
        rows.map(dt => {
            checkboxState[dt.id] = false;
        });
    }, [rows]);

    const handleChangeCheckbox = e => {
        const { name, checked } = e.target;
        const all = 'all';

        if(name !== all) {
            const checkState = { ...checkboxState };
            // validate all checked
            let isAllChecked = true;
            for (const key in checkState) {
                if(key === name && !checked) {
                    isAllChecked = false;
                    break;
                }
                if(key !== all && key !== name && !checkState[key]) {
                    isAllChecked = false;
                    break;
                }
            }
            // set all
            checkState[all] = isAllChecked;
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
            if(key !== all) {
                if(name === all) {
                    if(checked) selectValue.push(key);
                }
            } else if((key === name && checked) || (checkboxState[key] && key !== name)) {
                selectValue.push(key);
            }
        }
    } // handleChangeCheckbox

    // set selected rows
    useEffect(() => {
        const selectedRows = [];
        rows.map(row => { checkboxState[row.id] && selectedRows.push(row) });
        tableApi.handleSelectRows(selectedRows);
    }, [checkboxState]);
    /* handle select rows (e) */

    return (
        <TableContainer component={TablePaper}>
            {/* Header */}
            <TableHeaderFooter>
                <TableHeaderFooter>
                    {/* Select Count */}
                    <TableHeaderSpan>LIST</TableHeaderSpan>
                    <Select value={tableApi. pagingInfo.size} onChange={e => tableApi.handleChangePage({ ...tableApi.pagingInfo, page:0, size: sizeToInteger(e.target.value) })}>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                    {/* Pagination */}
                    <Pagination
                        page={tableApi.pagingInfo.page+1}
                        count={tableApi.pagingInfo.totalPages}
                        boundaryCount={1}
                        siblingCount={3}
                        onChange={(e,page) => tableApi.handleChangePage({ ...tableApi.pagingInfo, page: page-1 })}
                    />
                </TableHeaderFooter>
                <div>
                    {buttons &&
                        buttons.map((btn, idx) => (
                            <Button key={idx} onClick={btn.onClick} color={btn.color || 'primary'}>{btn.text.toUpperCase()}</Button>
                    ))}
                </div>
            </TableHeaderFooter>

            {/* List */}
            <Table aria-label={"list table"} stickyHeader>
                {/* Head */}
                <TableHead>
                    <TableRow>
                        <TableCell padding={'checkbox'}>
                            <Checkbox
                                name={'all'} checked={checkboxState['all'] || false}
                                onChange={handleChangeCheckbox}
                            />
                        </TableCell>
                        <TableCell sx={{ width: 1/20 }}>No</TableCell>
                        {columns.map(col => (
                            <TableCell key={col.id} scope={'col'} align={'center'}>{col.name}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                {/* Body */}
                <TableBody>
                    {rows.length === 0
                        ?
                            <TableRow>
                                <TableCell colSpan={columns.length + 2} align={'center'}>
                                    [No Data]
                                </TableCell>
                            </TableRow>
                        : rows.map((row, idx) => (
                            <CustomTableRow key={idx} onClick={e => { onClickRow(e, row) }} onDoubleClick={onDoubleClickRow}>
                                <TableCell padding={'checkbox'}>
                                    <Checkbox
                                        name={row.id.toString()}
                                        checked={checkboxState[row.id] || false}
                                        onChange={handleChangeCheckbox}
                                    />
                                </TableCell>
                                <TableCell scope={'row'} align={'center'}>{dataNo(idx)}</TableCell>
                                {columns.map(col => (
                                    <TableCell key={col.id} scope={'row'} align={'center'}>{row[col.id]}</TableCell>
                                ))}
                            </CustomTableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Footer */}
            <TableHeaderFooter>
                <TableHeaderFooter>
                    {/* Select Count */}
                    <TableHeaderSpan>LIST</TableHeaderSpan>
                    <Select value={tableApi.pagingInfo.size}>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                    {/* Pagination */}
                    <Pagination
                        page={tableApi.pagingInfo.page+1}
                        count={tableApi.pagingInfo.totalPages}
                        boundaryCount={1}
                        siblingCount={3}
                        onChange={(e,page) => tableApi.handleChangePage({ ...tableApi.pagingInfo, page: page-1 })}
                    />
                </TableHeaderFooter>
            </TableHeaderFooter>
        </TableContainer>
    );
}

export default ListTable;