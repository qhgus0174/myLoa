import React, { useContext } from 'react';
import { DialogActionContext } from '@context/DialogContext';
import { SpinnerContext } from '@context/SpinnerContext';
import Button from '@components/Button/Button';
import { IPortalProperty } from '@common/types/types';
import styled from '@emotion/styled';

const Dialog = ({ children, options }: IPortalProperty) => {
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

const DialogBody = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 50%;
`;

const DialogBottom = styled.footer`
    display: flex;
    justify-content: flex-end;
    flex-basis: 20%;

    button {
        margin-right: 3.5%;
    }
`;

export default Dialog;
