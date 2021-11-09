import React from 'react';
import { IPortalProperty } from '@common/types';
import styled from '@emotion/styled';
import { widthMedia } from '@style/device';

const BasicModal = ({ children, options }: IPortalProperty) => {
    return (
        <>
            {options?.headerTitle && <ModalHeader height={options?.height || '1'}>{options.headerTitle}</ModalHeader>}
            <ModalContent isHeader={options?.headerTitle || ''}>{children}</ModalContent>
        </>
    );
};

const ModalHeader = styled.div<{ height: string }>`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 80px;
    font-size: 1.3em;
    font-weight: 500;
`;

const ModalContent = styled.div<{ isHeader: string }>`
    box-sizing: border-box;
    height: ${props => (props.isHeader ? `calc(100% - 80px)` : `100%`)};

    ${widthMedia.smallDesktop} {
        max-height: 75vh;
        overflow-y: auto;
    }
`;

export default BasicModal;
