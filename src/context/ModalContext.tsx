import React, { createContext } from 'react';
import { useModal } from '@hooks/useModal';
import ModalPortal from '@components/Modal/ModalPortal';
import { IPortalProps } from '@common/types';

interface IModalAction {
    openModal: () => void;
    closeModal: () => void;
    setModalProps: (e: IPortalProps) => void;
}

export const ModalStateContext = createContext<IPortalProps>({
    isOpen: false,
    content: <></>,
});

export const ModalActionContext = createContext<IModalAction>({
    openModal: () => {},
    closeModal: () => {},
    setModalProps: (e: IPortalProps) => {},
});

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const { isOpen, content, options, openModal, closeModal, setModalProps } = useModal();

    return (
        <ModalActionContext.Provider value={{ openModal, closeModal, setModalProps }}>
            <ModalStateContext.Provider value={{ isOpen, content, options }}>
                <ModalPortal />
                {children}
            </ModalStateContext.Provider>
        </ModalActionContext.Provider>
    );
};

export default ModalProvider;
