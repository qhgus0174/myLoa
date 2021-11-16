import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { ModalActionContext, ModalStateContext } from '@context/ModalContext';
import BasicModal from '@components/Modal';
import styled from '@emotion/styled';

const ModalPortal = () => {
    const { isOpen, content, options } = useContext(ModalStateContext);
    const { closeModal } = useContext(ModalActionContext);

    return createPortal(
        isOpen && (
            <ModalContainer>
                <Dimmer tabIndex={-1} onClick={closeModal}></Dimmer>
                <BasicModal options={options}>{content}</BasicModal>
            </ModalContainer>
        ),
        document.getElementById('modal-root') as HTMLElement,
    );
};
const Dimmer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
`;

const ModalContainer = styled.div`
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    box-sizing: content-box;
    border-radius: 4px;
    outline: none;

    z-index: 8888;
`;

export default ModalPortal;
