import { FormControlLabel, FormControlProps, FormLabel, Radio, RadioGroup } from "@mui/material";
import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled";

interface CodeRadioProps {
    localCodes: {codeId: string, codeName: string}[];
    handleEventChange?: any;
    name?: string;
    value?: string;
    label?: string;
    isRow?: boolean;
    fullWidth?: boolean;
    error?: boolean;
    disabled?: boolean;
    color?:  'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
    labelPlacement?: 'bottom' | 'end' | 'start' | 'top';
}

function CodeRadio(props: CodeRadioProps) {
    const { name, value, label, isRow, fullWidth, error, disabled, color, labelPlacement, localCodes, handleEventChange, ...rest } = props;

    const [radioValue, setRadioValue] = useState(value || '');
    const [items, setItems] = useState([]);

    const onChangeRadio = e => {
        setRadioValue(e.target.value);
        handleEventChange(e, name, e.target.value);
    }

    const makeItemList = () => {
        const itemList = [];
        if(!localCodes === false) {
            localCodes.map(item => {
                itemList.push(
                    <FormControlLabel
                        key={item.codeId}
                        value={item.codeId}
                        label={item.codeName}
                        disabled={disabled}
                        control={
                            <Radio color={color} checked={item.codeId === value} {...rest} />
                        }
                    />
                )
            });
        }
        setItems(itemList);
    }

    useEffect(() => { makeItemList() }, [localCodes, radioValue]);

    return (
        <FormControlStyled fullWidth={fullWidth} component="fieldset">
            {label ? (
                <FormLabel component="legend" color={color} error={error}>
                    {label}
                </FormLabel>
            ) : null}
            <RadioGroup
                aria-label={name}
                name={name}
                value={radioValue}
                onChange={onChangeRadio}
                row={isRow !== false}
            >
                {items}
            </RadioGroup>
        </FormControlStyled>
    );
}

export default CodeRadio;

const FormControlStyled = styled.div<FormControlProps>`
  height: 100%;
  min-width: 180px;
`;