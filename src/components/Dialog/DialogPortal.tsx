import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { DialogActionContext, DialogStateContext } from '@context/DialogContext';
import Dialog from '@components/Dialog';
import { IPortalOption } from '@common/types/types';
import styled from '@emotion/styled';
import { heightMedia, widthMedia } from '@style/device';
import { Dimmer } from '@style/common/modal';

const DialogPortal = () => {
    const { isOpen, content, options } = useContext(DialogStateContext);
    const { closeDialog } = useContext(DialogActionContext);

    return createPortal(
        isOpen && (
            <Dimmer
                tabIndex={-1}
                onClick={() => {
                    closeDialog();
                }}
            >
                <DialogInner
                    tabIndex={0}
                    width={options?.width}
                    height={options?.height}
                    onClick={e => {
                        e.stopPropagation();
                    }}
                >
                    <Dialog options={options}>{content}</Dialog>
                </DialogInner>
            </Dimmer>
        ),
        document.getElementById('modal-root') as HTMLElement,
    );
};

const DialogInner = styled.section<Pick<IPortalOption, 'width' | 'height'>>`
    background-color: #ffffff;
    box-sizing: border-box;
    border-radius: 4px;
    overflow: hidden; //각을 없앴을 때 내부 영역이 튀어나오는걸 방지
    outline: none;
    box-shadow: 5px 10px 10px 1px rgba(0, 0, 0, 0.3);
    width: 100%;
    background-color: ${props => props.theme.colors.main};
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    max-width: 25vw;
    height: 25vh;

    ${widthMedia.desktop} {
        max-width: 40vw;
        height: 20vh;
    }

    ${widthMedia.tablet} {
        max-width: 55vw;
        height: 25vh;
    }

    ${widthMedia.phone} {
        max-width: 100vw;
        width: 400px;
        height: 190px;
    }

    ${heightMedia.small} {
        height: 190px;
        max-height: 55vh;
    }
`;

export default DialogPortal;
