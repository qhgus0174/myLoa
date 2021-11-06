import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { DialogActionContext, DialogStateContext } from '@context/DialogContext';
import Dialog from '@components/Dialog';
import { IDialogOption } from '@hooks/useDialog';
import { heightMedia, widthMedia } from '@style/device';

export interface IDialog {
    children: React.ReactNode;
    options?: IDialogOption;
}

const DialogPortal = () => {
    const { isOpen, content, options } = useContext(DialogStateContext);
    const { closeDialog } = useContext(DialogActionContext);

    return createPortal(
        isOpen && (
            <DialogDimmer
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
            </DialogDimmer>
        ),
        document.getElementById('modal-root') as HTMLElement,
    );
};

const DialogDimmer = styled.div`
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

const DialogInner = styled.div<Pick<IDialogOption, 'width' | 'height'>>`
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
    }

    ${widthMedia.tablet} {
        max-width: 55vw;
        height: 25vh;
    }

    ${widthMedia.phone} {
        max-width: 90vw;
        height: 30vh;
    }

    ${heightMedia.small} {
        height: 45vh;
        max-height: 55vh;
    }
`;

export default DialogPortal;
