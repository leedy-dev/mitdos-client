import React, {ReactNode} from 'react';
import {ThemeProvider} from '@mui/material';
import {themeCreator} from './base';
import {StylesProvider} from '@mui/styles';
import {useSelector} from "react-redux";
import {selectTheme} from "src/features/config/configSlice";

type ThemeProps = {
    children: ReactNode;
};

const ThemeProviderWrapper = (props: ThemeProps) => {
    const themeName = useSelector(selectTheme)
    const theme = themeCreator(themeName);

    return (
        <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
        </StylesProvider>
    );
};

export default ThemeProviderWrapper;
