import React, { useContext } from 'react';
import styled from '@emotion/styled';
import Button from '@components/Button/Button';
import { IModal } from '@components/Modal/ModalPortal';
import { ModalActionContext } from '@context/ModalContext';
import { SpinnerContext } from '@context/SpinnerContext';

const Dialog = ({ children, options }: IModal) => {
    const { closeModal } = useContext(ModalActionContext);
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
                        closeModal();
                    }}
                    color="main"
                >
                    확인
                </Button>
                <Button onClick={closeModal}>취소</Button>
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
