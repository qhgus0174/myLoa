import React, { useContext } from 'react';
import styled from '@emotion/styled';
import Button from '@components/Button/Button';
import { IDialog } from '@components/Dialog/DialogPortal';
import { DialogActionContext } from '@context/DialogContext';
import { SpinnerContext } from '@context/SpinnerContext';

const Dialog = ({ children, options }: IDialog) => {
    const { closeDialog } = useContext(DialogActionContext);
    const { setSpinnerVisible } = useContext(SpinnerContext);

    return (
        <>
            <DialogBody>{children}</DialogBody>
            <DialogBottom>
                <Button
                    onClick={async () => {
                        setSpinnerVisible(true);
                        options?.confirmFn && (await options.confirmFn());
                        setSpinnerVisible(false);
                        closeDialog();
                    }}
                >
                    확인
                </Button>
                <Button onClick={closeDialog}>취소</Button>
            </DialogBottom>
        </>
    );
};

const DialogBody = styled.div`
    display: flex;
    flex-basis: 50%;
    justify-content: center;
    align-items: center;
`;

const DialogBottom = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-basis: 20%;
    button {
        margin-right: 3.5%;
    }
`;

export default Dialog;
