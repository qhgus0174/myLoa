import React, { useContext } from 'react';
import { ModalActionContext } from '@context/ModalContext';
import Button from '@components/Button/Button';
import { ButtonContainer } from '@style/common/modal';

interface IEditButton {
    onClickEdit: () => void;
    addClassName?: string;
}

const EditButtonContainer = ({ onClickEdit, addClassName }: IEditButton) => {
    const { closeModal } = useContext(ModalActionContext);

    return (
        <ButtonContainer>
            <Button className={addClassName} onClick={onClickEdit}>
                수정
            </Button>
            <Button onClick={() => closeModal()}>닫기</Button>
        </ButtonContainer>
    );
};

export default EditButtonContainer;
