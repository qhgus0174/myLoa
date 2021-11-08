import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { ModalActionContext, ModalStateContext } from '@context/ModalContext';
import BasicModal from '@components/Modal';
import { IPortalOption } from '@common/types';
import styled from '@emotion/styled';
import { widthMedia, heightMedia } from '@style/device';
import { Dimmer } from '@style/common/modal';

const ModalPortal = () => {
    const { isOpen, content, options } = useContext(ModalStateContext);
    const { closeModal } = useContext(ModalActionContext);

    return createPortal(
        isOpen && (
            <Dimmer
                tabIndex={-1}
                onClick={() => {
                    closeModal();
                }}
            >
                <ModalInner
                    tabIndex={0}
                    width={options?.width}
                    height={options?.height}
                    onClick={e => {
                        e.stopPropagation();
                    }}
                >
                    <BasicModal options={options}>{content}</BasicModal>
                </ModalInner>
            </Dimmer>
        ),
        document.getElementById('modal-root') as HTMLElement,
    );
};

const ModalInner = styled.div<Pick<IPortalOption, 'width' | 'height'>>`
    padding-left: 2.2rem;
    padding-right: 2.2rem;
    padding-bottom: 1.5rem;
    box-sizing: content-box;
    border-radius: 4px;
    background-color: ${props => props.theme.colors.main};
    box-shadow: 5px 10px 10px 1px rgba(0, 0, 0, 0.3);
    outline: none;

    overflow: hidden; //각을 없앴을 때 내부 영역이 튀어나오는걸 방지

    width: 100%;
    max-width: ${props => (props.width ? props.width : '65')}vw;
    height: ${props => (props.height ? props.height : '60')}vh;

    ${widthMedia.desktop} {
        max-width: ${props => Number(props.width ? props.width : '70') * 1.5}vw;
    }

    ${widthMedia.tablet} {
        max-width: ${props => Number(props.width ? props.width : '70') * 2.2}vw;
        max-height: 90vh;
    }

    ${widthMedia.phone} {
        max-width: 100vw;
        max-height: 90vh;
    }

    ${heightMedia.small} {
        height: ${props => Number(props.height ? props.height : '70') * 1.5}vh;
        max-height: 90vh;
    }
`;

export default ModalPortal;
