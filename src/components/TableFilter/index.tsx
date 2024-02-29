import { FilterAlt } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, styled } from "@mui/material";
import React, { ReactNode } from 'react';

/* style (s) */
interface FilterDivProps {
    expanded?: string;
}

const FilterDiv = styled('div')<FilterDivProps>`
    max-width: ${props => props.expanded === 'true' ? '100%' : '20%'};
    padding-bottom: 20px;
    font-weight: bold;
`;
/* style (e) */

interface TableFilterProps {
    expanded: boolean;
    handleFilterExpand: any;
    children?: ReactNode;
    title?: string;
}

function TableFilter(props: TableFilterProps) {
    const { expanded, handleFilterExpand, children, title } = props;

    return (
        <FilterDiv expanded={expanded.toString()}>
            <Accordion expanded={expanded} onChange={handleFilterExpand}>
                <AccordionSummary expandIcon={<FilterAlt />}>
                    {title}
                </AccordionSummary>
                <AccordionDetails>
                    {children}
                </AccordionDetails>
            </Accordion>
        </FilterDiv>
    );
}

export default TableFilter;