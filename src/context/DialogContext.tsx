import React, { createContext } from 'react';
import DialogPortal from '@components/Dialog/DialogPortal';
import { IDialogProps, useDialog } from '@hooks/useDialog';

interface IDialogAction {
    openDialog: () => void;
    closeDialog: () => void;
    setDialogProps: (e: IDialogProps) => void;
}

export const DialogStateContext = createContext<IDialogProps>({
    isOpen: false,
    content: <></>,
});

export const DialogActionContext = createContext<IDialogAction>({
    openDialog: () => {},
    closeDialog: () => {},
    setDialogProps: (e: IDialogProps) => {},
});

const DialogProvider = ({ children }: { children: React.ReactNode }) => {
    const { isOpen, content, options, openDialog, closeDialog, setDialogProps } = useDialog();

    return (
        <DialogActionContext.Provider value={{ openDialog, closeDialog, setDialogProps }}>
            <DialogStateContext.Provider value={{ isOpen, content, options }}>
                <DialogPortal />
                {children}
            </DialogStateContext.Provider>
        </DialogActionContext.Provider>
    );
};

export default DialogProvider;
