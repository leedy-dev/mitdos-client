import { InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled";
import { CustomFormControlProps } from "../../Props/customProps";

interface CodeSelectProps {
    localCodes: {codeId: string, codeName: string}[];
    handleEventChange?: any;
    id?: string;
    name?: string;
    value?: string;
    label?: string;
    error?: boolean;
    totalText?: string;
    fullWidth?: boolean;
    height?: string;
    defaultValue?: any;
}

function CodeSelect(props: CodeSelectProps) {
    const { localCodes, handleEventChange, id, name, value, label, error, totalText, fullWidth, height, defaultValue, ...rest } = props;

    const [selectValue, setSelectValue] = useState(value || '');

    const [items, setItems] = useState([]);

    const makeItemList = () => {
        const itemList = [];
        if (!localCodes === false) {
            localCodes.map(item => {
                itemList.push(
                    <MenuItem key={item.codeId} value={item.codeId}>
                        {item.codeName}
                    </MenuItem>
                )
            })
        }
        setItems(itemList);
    }

    useEffect(() => { makeItemList() }, [localCodes]);

    const handleChangeSelect = e => {
        setSelectValue(e.target.value);
        handleEventChange(e, id, e.target.value);
    }

    return (
        <FormControlStyled
            height={height}
            fullWidth={fullWidth}
            error={error || false}
            variant="outlined"
        >
            {label ? <InputLabel id={`${id}-label`}>{label}</InputLabel> : null}

            <Select
                id={id}
                name={name}
                labelId={`${id}-label`}
                value={selectValue}
                onChange={handleChangeSelect}
                label={label}
                {...rest}
            >
                {totalText ? (
                    <MenuItem value="total" key="-1">
                        {totalText}
                    </MenuItem>
                ) : null}
                {items}
            </Select>
        </FormControlStyled>
    );
}

export default CodeSelect;

const FormControlStyled = styled.div<CustomFormControlProps>`
  height: ${({ height }) => (height ? height : '100%')};
`;
