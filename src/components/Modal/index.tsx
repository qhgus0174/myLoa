import React from 'react';
import { IPortalOption, IPortalProperty } from '@common/types';
import styled from '@emotion/styled';
import { widthMedia } from '@style/device';
import { css } from '@emotion/react';
import { FlexDiv } from '@style/common';

const BasicModal = ({ children, options }: IPortalProperty) => {
    return (
        <ModalInner direction="column" width={options?.width} height={options?.height}>
            {options?.headerTitle && <ModalHeader height={options?.height || '1'}>{options.headerTitle}</ModalHeader>}
            <ModalContent isHeader={options?.headerTitle || ''}>{children}</ModalContent>
        </ModalInner>
    );
};

const ModalInner = styled(FlexDiv)<Pick<IPortalOption, 'width' | 'height'>>`
    z-index: 2;

    position: relative;
    padding-left: 3rem;
    padding-right: 3rem;
    padding-top: 1rem;
    padding-bottom: 2rem;
    box-sizing: content-box;
    border-radius: 4px;
    border: 1px solid ${props => props.theme.colors.mainInner};
    background-color: ${props => props.theme.colors.main};
    box-shadow: 5px 10px 10px 1px rgba(0, 0, 0, 0.3);

    overflow-x: hidden;
    overflow-y: auto;

    color: #c3c0c0;

    width: ${props => (props.width ? props.width : '65')}px;
    height: ${props => (props.height ? props.height : '60')}px;
    max-height: 90vh;
    overflow-y: auto;
    max-width: 95vw;
`;

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
