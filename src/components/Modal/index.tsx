import React from 'react';
import { Close } from "@mui/icons-material";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    styled,
    Typography
} from "@mui/material";

interface ModalTitleProps {
    children: React.ReactNode;
    onClose: any;
}

const ModalTitle = (props: ModalTitleProps) => {
    const { children, onClose } = props;

    return (
        <DialogTitle>
            <Typography variant={"h5"}>{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label={"close"}
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Close/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

interface ModalActionsProps {
    onClose: any;
    type?: 'alert' | 'confirm';
    onConfirm?: any;
}

const ModalActions = (props: ModalActionsProps) => {
    const { onClose, type, onConfirm } = props;

    if (type === 'alert') {
        return (
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        )
    } else if (type === 'confirm') {
        return (
            <DialogActions>
                <Button onClick={onConfirm}>Confirm</Button>
                <Button color="secondary" onClick={onClose}>Close</Button>
            </DialogActions>
        )
    } else {
        return null;
    }
}

interface ModalProps {
    open: boolean;
    title?: string;
    onClose: any;
    onConfirm?: any;
    type?: 'alert' | 'confirm';
    children?: React.ReactNode;
    // dialog props
    maxWidth?: string;
    fullScreen?: boolean;
    draggable?: boolean;
    disableBackdropClick?: boolean;
    disableEscapeKeyDown?: boolean;
}

/**
 *  version 1.0
 *
 *  type(string): (undefined - 버튼 X) | ('alert' - Close 버튼) | ('confirm' - Confirm, Close 버튼)
 *  maxWidth('sm'): maxWidth ('xs' | 'sm' | 'md' | 'lg' | 'xl' | false | string)
 *  draggable(false): drag 가능 여부    ---------- 미완
 *  fullScreen(false): 화면 채우기(width, height 속성 X)
 *  disableBackdropClick(false): Dialog 바깥 클릭 시 끄기
 *  disableEscapeKeyDown(false): ESC 클릭 시 끄기
 */
function Modal(props: ModalProps) {
    const {open, title, onClose, onConfirm, type, children,
        // dialog props
        maxWidth, fullScreen, draggable, disableBackdropClick, disableEscapeKeyDown, ...rest} = props;

    const handleClose = (event, reason) => {
        if(disableBackdropClick){
            if(reason !== 'backdropClick') {
                onClose();
            }
        }else{
            onClose();
        }
    }

    const customProps = {};
    customProps['fullScreen'] = fullScreen;
    customProps['maxWidth'] = maxWidth;
    customProps['disableEscapeKeyDown'] = disableEscapeKeyDown;

    return (
        <Dialog
            open={open}
            onClose={(event, reason) => handleClose(event, reason)}
            scroll={"paper"}
            {...customProps}
            {...rest}
        >
            <ModalTitle onClose={onClose}>{title}</ModalTitle>
            <ModalContent dividers>{children}</ModalContent>
            <ModalActions type={type || 'alert'} onClose={onClose} onConfirm={onConfirm} />
        </Dialog>
    )
}

const ModalContent = styled(DialogContent)`
    min-width: 300px;
    padding: 10 10 10 10;
`;

export default Modal;