import React, { useContext } from 'react';
import { ModalActionContext } from '@context/ModalContext';
import Button from '@components/Button/Button';
import { ButtonContainer } from '@style/common/modal';

interface IAddButton {
    onClickAdd: () => void;
    addClassName: string;
}

const AddButtonContainer = ({ onClickAdd, addClassName }: IAddButton) => {
    const { closeModal } = useContext(ModalActionContext);

    return (
        <ButtonContainer>
            <Button className={addClassName} onClick={onClickAdd}>
                추가
            </Button>
            <Button onClick={() => closeModal()}>닫기</Button>
        </ButtonContainer>
    );
};

export default AddButtonContainer;
