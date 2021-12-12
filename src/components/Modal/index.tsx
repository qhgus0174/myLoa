import React, { useContext } from 'react';
import { IPortalOption, IPortalProperty } from '@common/types/types';
import styled from '@emotion/styled';
import { widthMedia } from '@style/device';
import { FlexArticle } from '@style/common';
import Button from '@components/Button/Button';
import { ModalActionContext } from '@context/ModalContext';

const BasicModal = ({ children, options }: IPortalProperty) => {
    const { closeModal } = useContext(ModalActionContext);
    return (
        <ModalInner direction="column" width={options?.width} height={options?.height}>
            {options?.headerTitle && (
                <ModalHeader height={options?.height || '1'}>
                    {options.headerTitle}
                    {options.isHeaderClose && <Button onClick={closeModal}>닫기</Button>}
                </ModalHeader>
            )}
            <ModalContent isHeader={options?.headerTitle || ''}>{children}</ModalContent>
        </ModalInner>
    );
};

const ModalInner = styled(FlexArticle)<Pick<IPortalOption, 'width' | 'height'>>`
    z-index: 2;

    position: relative;

    padding-left: 3rem;
    padding-right: 3rem;
    padding-top: 1rem;
    padding-bottom: 2rem;

    ${widthMedia.phone} {
        padding-left: 2rem;
        padding-right: 2rem;
        padding-top: 0.5rem;
        padding-bottom: 1rem;
    }

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
    overflow-y: auto;

    max-height: 90vh;
    max-width: 95vw;

    ${widthMedia.smallDesktop} {
        max-height: 90vh;
        max-width: 85vw;
    }

    ${widthMedia.phone} {
        max-height: 80vh;
        max-width: 80vw;
    }
`;

const ModalHeader = styled.header<{ height: string }>`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 80px;
    font-size: 1.3em;
    font-weight: 500;

    justify-content: space-between;
`;

const ModalContent = styled.section<{ isHeader: string }>`
    box-sizing: border-box;
    height: ${props => (props.isHeader ? `calc(100% - 80px)` : `100%`)};

    ${widthMedia.smallDesktop} {
        max-height: 75vh;
        overflow-y: auto;
    }
`;

export default BasicModal;
