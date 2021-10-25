import React, { ReactElement, useEffect, useState } from 'react';

export interface IModalOption {
    width?: string;
    height?: string;
    headerTitle?: string;
    confirmFn?: () => void | Promise<void>;
}

export interface IModalProps {
    isOpen: boolean;
    type: 'basic' | 'dialog';
    content: ReactElement;
    options?: IModalOption;
}

export const useModal = () => {
    const [isOpen, setIsOpen] = useState<IModalProps['isOpen']>(false);
    const [type, setType] = useState<IModalProps['type']>('basic');
    const [content, setContent] = useState<React.ReactElement>(<></>);
    const [options, setOptions] = useState<IModalOption | undefined>({});

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

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const setModalProps = (sets: IModalProps) => {
        setIsOpen(sets.isOpen);
        setType(sets.type);
        setContent(sets.content);
        setOptions(sets.options);
    };

    return { isOpen, type, content, options, openModal, closeModal, setModalProps };
};
