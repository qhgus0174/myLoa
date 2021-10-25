import React from 'react';
import styled from '@emotion/styled';
import { IModal } from '@components/Modal/ModalPortal';

const BasicModal = ({ children, options }: IModal) => {
    return (
        <>
            {options?.headerTitle && <ModalHeader>{options.headerTitle}</ModalHeader>}
            <ModalContent>{children}</ModalContent>
        </>
    );
};

const ModalHeader = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    height: 20%;
    font-size: 1.6em;
    font-weight: 500;
    box-sizing: border-box;
`;

const ModalContent = styled.div`
    padding: 2.2rem;
    box-sizing: border-box;
    height: 100%;
    overflow-y: auto;
`;

export default BasicModal;
