import React, { ReactElement, useEffect, useState } from 'react';

export interface IDialogOption {
    width?: string;
    height?: string;
    headerTitle?: string;
    confirmFn?: () => void | Promise<void>;
}

export interface IDialogProps {
    isOpen: boolean;
    content: ReactElement;
    options?: IDialogOption;
}

export const useDialog = () => {
    const [isOpen, setIsOpen] = useState<IDialogProps['isOpen']>(false);
    const [content, setContent] = useState<React.ReactElement>(<></>);
    const [options, setOptions] = useState<IDialogOption | undefined>({});

    useEffect(() => {
        if (isOpen) {
            document.body.style.cssText = `overflow: hidden; top: -${window.scrollY}px`;
            return () => {
                const scrollY = document.body.style.top;
                document.body.style.cssText = `overflow: unset; top: "";`;
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            };
        }
    }, [isOpen]);

    const openDialog = () => {
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
    };

    const setDialogProps = (sets: IDialogProps) => {
        setIsOpen(sets.isOpen);
        setContent(sets.content);
        setOptions(sets.options);
    };

    return { isOpen, content, options, openDialog, closeDialog, setDialogProps };
};
