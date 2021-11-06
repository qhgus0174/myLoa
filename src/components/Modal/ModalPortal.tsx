import React, { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { ModalActionContext, ModalStateContext } from '@context/ModalContext';
import BasicModal from '@components/Modal';
import { IModalOption, IModalProps } from '@hooks/useModal';
import { widthMedia, heightMedia } from '@style/device';

export interface IModal {
    children: React.ReactNode;
    options?: IModalOption;
}

const ModalPortal = () => {
    const { isOpen, content, options } = useContext(ModalStateContext);
    const { closeModal } = useContext(ModalActionContext);

    return createPortal(
        isOpen && (
            <ModalDimmer
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
            </ModalDimmer>
        ),
        document.getElementById('modal-root') as HTMLElement,
    );
};

const ModalDimmer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    box-sizing: border-box;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`;

const ModalInner = styled.div<Pick<IModalOption, 'width' | 'height'>>`
    padding-left: 2.2rem;
    padding-right: 2.2rem;
    padding-bottom: 1.5rem;
    background-color: #ffffff;
    box-sizing: content-box;
    border-radius: 4px;
    overflow: hidden; //각을 없앴을 때 내부 영역이 튀어나오는걸 방지
    outline: none;
    box-shadow: 5px 10px 10px 1px rgba(0, 0, 0, 0.3);
    width: 100%;
    background-color: ${props => props.theme.colors.main};
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
