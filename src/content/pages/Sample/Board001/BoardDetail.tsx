import React from 'react';
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainerProps,
    TableRow
} from "@mui/material";
import styled from "@emotion/styled";

/* styled (s) */
const DetailDiv = styled('div')`
    display: flex;
    justify-content: space-between;
`

const DetailTableContainer = styled.div<TableContainerProps>`
    margin-top: 30px;
    width: 48.5%;
`
const TableHeaderFooter = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
`

const TitleSpan = styled('span')`
    padding: 10px 10px 10px 10px;
`

const DetailContent = styled('div')`
    max-height: 95px;
    overflow: auto;
`
/* styled (e) */

interface BoardDetailProps {
    data: any;
    rows: { id: string, name: string, html?: boolean, secondId?: string, secondName?: string }[];
    title?: string;
    button?: string;
    onClickButton?: any;
}

function BoardDetail(props: BoardDetailProps) {
    const { data, rows, title, button, onClickButton } = props;

    return (
        <DetailDiv>
            <DetailTableContainer component={Paper}>
                <TableHeaderFooter>
                    <TitleSpan>{title}</TitleSpan>
                    {button && <Button onClick={onClickButton}>{button}</Button>}
                </TableHeaderFooter>
                <Table aria-label={'detail table'} stickyHeader size={'small'}>
                    <TableBody>
                        {
                            rows.map(row => (
                                row.secondId ?
                                    <TableRow key={row.id}>
                                        <TableCell variant={'head'} scope={'row'} align={'center'}>{row.name}</TableCell>
                                        <TableCell scope={'row'}>{data[row.id]}</TableCell>
                                        <TableCell variant={'head'} scope={'row'} align={'center'}>{row.secondName}</TableCell>
                                        <TableCell scope={'row'}>{data[row.secondId] || row.secondId}</TableCell>
                                    </TableRow>
                                    :
                                    <TableRow key={row.id}>
                                        <TableCell variant={'head'} scope={'row'} align={'center'}>{row.name}</TableCell>
                                        <TableCell colSpan={3} scope={'row'}>
                                            {row.html ?
                                                <DetailContent dangerouslySetInnerHTML={{__html: data[row.id]}} />
                                                :
                                                data[row.id]
                                            }
                                        </TableCell>
                                    </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </DetailTableContainer>
        </DetailDiv>
    );
}

export default BoardDetail;