import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface CustomFormControlLabelProps {
  itemList: { codeId: string; codeName?: string }[];
  handleEventChange: any;
  name?: string;
  value?: any[] | boolean;
  totalText?: string;
  color?: 'default' | 'primary' | 'secondary';
  labelPlacement?: 'bottom' | 'end' | 'start' | 'top';
}

function CustomFormControlLabel(props: CustomFormControlLabelProps) {
  const { name, value, itemList, totalText, handleEventChange, color, labelPlacement, ...rest } = props;

  const [checkboxState, setCheckboxState] = useState<{all?: boolean}>({});

  // onChangeCheckbox
  const onChangeCheckbox = e => {
    const { id } = e.target;
    const state = e.target.checked;

    if (id !== 'all') {
      // not all
      const checkState: { all?: boolean } = { ...checkboxState };

      // validate checked
      let isAllChecked = true;
      for (const key in checkState) {
        if (key === id && !state) {
          isAllChecked = false;
          break;
        }
        if (key !== 'all' && key !== id && !checkState[key]) {
          isAllChecked = false;
          break;
        }
      }

      // set all
      checkState.all = isAllChecked;

      checkState[id] = state;
      setCheckboxState(checkState);
    } else {
      const checkState = { ...checkboxState };

      for (const key in checkState) {
        checkState[key] = state;
      }

      setCheckboxState(checkState);
    }

    const selectValue = [];
    for (const key in checkboxState) {
      if (key !== 'all') {
        if (id === 'all') {
          if (state) selectValue.push(key);
        }
      } else if ((key === id && state) || (checkboxState[key] && key !== id)) {
        selectValue.push(key);
      }
    }

    handleEventChange(e, name, selectValue);
  }; // onChangeCheckbox

  useEffect(() => {
    const values: any[] | boolean = value || [];

    if (itemList.length > 0) {
      const checkState = { ...checkboxState };
      itemList.map(item => {
        const ret =
          typeof values !== 'boolean' &&
          values.find(val => {
            return item.codeId === val;
          });

        checkState[item.codeId] = ret !== undefined;
      });

      if (!totalText === false) {
        const isAllChecked = Object.fromEntries(
          Object.entries(checkState).filter(([key, value]) => key !== 'all' && value === false),
        );

        checkState.all = typeof values !== 'boolean' && values.length > 0 && JSON.stringify(isAllChecked) === '{}';
      }
      setCheckboxState(checkState);
    }
  }, [itemList]);

  return (
    <>
      {totalText ? (
        <FormControlLabel
          key="all"
          name={name}
          checked={checkboxState.all || false}
          color={color}
          control={<Checkbox id="all" name={name} value="total" onChange={onChangeCheckbox} {...rest} />}
          label={totalText || ''}
          labelPlacement={labelPlacement || 'end'}
        />
      ) : null}
      {itemList.map(item => (
        <FormControlLabel
          key={item.codeId}
          name={name}
          checked={checkboxState[item.codeId] || false}
          color={color}
          label={item.codeName || ''}
          labelPlacement={labelPlacement || 'end'}
          onChange={onChangeCheckbox}
          control={<Checkbox id={item.codeId} name={name} value={item.codeId} {...rest} />}
        />
      ))}
    </>
  );
}

interface CodeCheckboxProps {
  localCodes: { codeId: string; codeName?: string }[];
  handleEventChange?: any;
  name?: string;
  value?: any[] | boolean;
  label?: string;
  totalText?: string;
  defaultValue?: any[];
  isRow?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  color?: 'default' | 'primary' | 'secondary';
  labelPlacement?: 'bottom' | 'end' | 'start' | 'top';
  onBlur?: any;
  onClick?: any;
}

function CodeCheckbox(props: CodeCheckboxProps) {
  const {
    name,
    value,
    label,
    totalText,
    defaultValue,
    isRow,
    error,
    fullWidth,
    handleEventChange,
    color,
    labelPlacement,
    localCodes,
    ...rest
  } = props;

  const [detailCodeList, setDetailCodeList] = useState([]);

  const makeItemList = () => {
    !localCodes === false && setDetailCodeList(localCodes);
  };

  const handleChangeCheckbox = (e, name, selectValues) => {
    handleEventChange(e, name, selectValues);
  };

  useEffect(() => {
    makeItemList();
  }, [localCodes]);

  return (
    <FormControlStyled fullWidth={fullWidth}>
      {label && (
        <FormLabel color={color === 'default' || !color === true ? 'primary' : color} error={error}>
          {label}
        </FormLabel>
      )}
      <FormGroup row={isRow !== false}>
        <CustomFormControlLabel
          value={value}
          name={name}
          itemList={detailCodeList}
          totalText={totalText}
          handleEventChange={handleChangeCheckbox}
          color={color}
          labelPlacement={labelPlacement}
          {...rest}
        />
      </FormGroup>
    </FormControlStyled>
  );
}

export default CodeCheckbox;

const FormControlStyled = styled(FormControl)`
  height: 100%;
  min-width: 180px;
`;
