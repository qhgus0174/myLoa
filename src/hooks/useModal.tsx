import { IPortalOption, IPortalProps } from '@common/types/types';
import React, { useEffect, useState } from 'react';

export const useModal = () => {
    const [isOpen, setIsOpen] = useState<IPortalProps['isOpen']>(false);
    const [content, setContent] = useState<React.ReactElement>(<></>);
    const [options, setOptions] = useState<IPortalOption | undefined>({});

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

    const setModalProps = (sets: IPortalProps) => {
        setIsOpen(sets.isOpen);
        setContent(sets.content);
        setOptions(sets.options);
    };

    return { isOpen, content, options, openModal, closeModal, setModalProps };
};
