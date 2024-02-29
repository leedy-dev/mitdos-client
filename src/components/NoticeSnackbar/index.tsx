import { Alert, AlertTitle, Fade, Grow, Slide, Snackbar } from "@mui/material";
import React, { ReactNode } from 'react';

interface SnackbarProps {
    open: boolean;
    onClose: any;
    children?: ReactNode;
    type?: 'info' | 'success' | 'warning' | 'error';
    title?: string;
    transition?: string;
    autoHideDuration?: number;
    vertical?: 'top' | 'bottom';
    horizontal?: 'left' | 'center' | 'right';
}

function NoticeSnackbar(props: SnackbarProps) {
    const { open, onClose, type, title, children, transition, vertical, horizontal, autoHideDuration, ...rest } = props;

    // control
    const handleCloseSnackbar = () => {
        onClose();
    }

    // transition
    let trans = Fade;
    switch (transition) {
        case 'grow':
            trans = Grow;
            break;
        case 'slide':
            trans = Slide;
            break;
    }

    // color
    let color = '#2fb0e9';
    switch (type) {
        case 'success':
            color = '#3ec204';
            break;
        case 'warning':
            color = '#e7941a';
            break;
        case 'error':
            color = '#e71840';
            break;
    }

    return (
        <Snackbar
            open={open}
            onClose={handleCloseSnackbar}
            autoHideDuration={2000}
            anchorOrigin={{ vertical: vertical || 'bottom', horizontal: horizontal || 'center' }}
            TransitionComponent={trans}
            disableWindowBlurListener
            {...rest}
        >
            <Alert onClose={handleCloseSnackbar} severity={type} style={{ color: color }}>
                <AlertTitle>{title}</AlertTitle>
                {children}
            </Alert>
        </Snackbar>
    );
}

export default NoticeSnackbar;