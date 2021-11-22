import React, { createContext } from 'react';
import { useDialog } from '@hooks/useDialog';
import DialogPortal from '@components/Dialog/DialogPortal';
import { IPortalProps } from '@common/types';

interface IDialogAction {
    openDialog: () => void;
    closeDialog: () => void;
    setDialogProps: (e: IPortalProps) => void;
}

export const DialogStateContext = createContext<IPortalProps>({
    isOpen: false,
    content: <></>,
});

export const DialogActionContext = createContext<IDialogAction>({
    openDialog: () => {},
    closeDialog: () => {},
    setDialogProps: (e: IPortalProps) => {},
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
